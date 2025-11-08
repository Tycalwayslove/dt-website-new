#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import SftpClient from 'ssh2-sftp-client'

const root = process.cwd()
const configPath = path.join(root, 'scripts', 'deploy.config.json')

function loadConfig() {
  if (!fs.existsSync(configPath)) {
    console.error(`[deploy] 配置文件未找到：${configPath}`)
    process.exit(1)
  }
  const raw = fs.readFileSync(configPath, 'utf-8')
  try {
    const json = JSON.parse(raw)
    if (!Array.isArray(json.targets) || json.targets.length === 0) {
      throw new Error('配置中缺少 targets')
    }
    return json.targets
  } catch (e) {
    console.error('[deploy] 配置解析失败：', e.message)
    process.exit(1)
  }
}

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { target: null, clean: false }
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--target' || a === '-t') {
      opts.target = args[i + 1] || null
      i++
    } else if (a === '--clean' || a === '-c') {
      opts.clean = true
    }
  }
  return opts
}

async function promptChooseTarget(targets) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  console.log('请选择要上传的目标服务器：')
  targets.forEach((t, idx) => {
    const auth = t.privateKeyPath ? '密钥' : t.password ? '密码' : '未知'
    console.log(
      `  [${idx + 1}] ${t.name} (${t.username}@${t.host}:${t.port || 22}, ${auth}) -> ${t.remoteDir}`
    )
  })
  const answer = await new Promise((resolve) => rl.question('输入序号并回车：', resolve))
  rl.close()
  const idx = Number(answer) - 1
  if (Number.isNaN(idx) || idx < 0 || idx >= targets.length) {
    console.error('[deploy] 输入有误，退出。')
    process.exit(1)
  }
  return targets[idx]
}

function resolvePath(p) {
  if (!p) return p
  if (p.startsWith('~')) {
    return path.join(process.env.HOME || process.env.USERPROFILE || '', p.slice(1))
  }
  return p
}

async function ensureRemoteDir(sftp, dir) {
  const exists = await sftp.exists(dir)
  if (!exists) {
    await sftp.mkdir(dir, true)
  }
}

async function cleanRemoteDir(sftp, dir) {
  const exists = await sftp.exists(dir)
  if (exists) {
    // 递归清理目录内容但保留目录本身
    const list = await sftp.list(dir)
    for (const item of list) {
      const remotePath = path.posix.join(dir, item.name)
      if (item.type === 'd') {
        await sftp.rmdir(remotePath, true)
      } else {
        await sftp.delete(remotePath)
      }
    }
  } else {
    await sftp.mkdir(dir, true)
  }
}

async function main() {
  const targets = loadConfig()
  const args = parseArgs()
  let target = null
  if (args.target) {
    target = targets.find((t) => t.name === args.target)
    if (!target) {
      console.error(`[deploy] 未找到目标：${args.target}`)
      process.exit(1)
    }
  } else {
    target = await promptChooseTarget(targets)
  }

  const localDir = path.isAbsolute(target.localDir)
    ? target.localDir
    : path.join(root, target.localDir)
  if (!fs.existsSync(localDir)) {
    console.error(`[deploy] 本地目录不存在：${localDir}`)
    process.exit(1)
  }

  const sftp = new SftpClient()
  try {
    console.log(`[deploy] 连接至 ${target.username}@${target.host}:${target.port || 22} ...`)
    const connectOptions = {
      host: target.host,
      port: target.port || 22,
      username: target.username,
    }

    if (target.privateKeyPath) {
      const keyPath = resolvePath(target.privateKeyPath)
      if (!fs.existsSync(keyPath)) {
        console.error(`[deploy] 私钥文件不存在：${keyPath}`)
        process.exit(1)
      }
      connectOptions.privateKey = fs.readFileSync(keyPath)
      if (target.passphrase) connectOptions.passphrase = target.passphrase
    } else if (target.privateKey) {
      connectOptions.privateKey = target.privateKey
      if (target.passphrase) connectOptions.passphrase = target.passphrase
    } else if (target.password) {
      connectOptions.password = target.password
      console.warn('[deploy] 警告：当前使用密码认证，建议改用 SSH 密钥认证。')
    } else {
      console.error('[deploy] 未提供认证方式（privateKeyPath/privateKey 或 password）')
      process.exit(1)
    }

    await sftp.connect(connectOptions)
    console.log('[deploy] 连接成功')

    const remoteDir = target.remoteDir.endsWith('/')
      ? target.remoteDir.slice(0, -1)
      : target.remoteDir
    await ensureRemoteDir(sftp, remoteDir)

    if (args.clean) {
      console.log(`[deploy] 清理远端目录内容：${remoteDir}`)
      await cleanRemoteDir(sftp, remoteDir)
    }

    console.log(`[deploy] 开始上传：${localDir} -> ${remoteDir}`)
    await sftp.uploadDir(localDir, remoteDir)
    console.log('[deploy] 上传完成')
  } catch (err) {
    console.error('[deploy] 发生错误：', err.message || err)
    process.exitCode = 1
  } finally {
    try {
      await sftp.end()
    } catch {}
  }
}

main()
