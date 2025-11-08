#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import OSS from 'ali-oss'

const root = process.cwd()
const args = process.argv.slice(2)

function parseArgs() {
  const out = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith('--')) {
      const [k, v] = a.replace(/^--/, '').split('=')
      out[k] = v !== undefined ? v : true
    }
  }
  return out
}

function readJson(file) {
  try {
    const raw = fs.readFileSync(file, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile()
  } catch {
    return false
  }
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

function toPosix(p) {
  return p.split(path.sep).join('/')
}

async function ensureCleanPrefix(client, prefix) {
  const toDelete = []
  let marker
  do {
    const res = await client.list({ prefix, marker }, {})
    if (res.objects && res.objects.length) {
      for (const obj of res.objects) toDelete.push(obj.name)
      marker = res.nextMarker
    } else {
      marker = undefined
    }
  } while (marker)

  if (!toDelete.length) return
  console.log(`[oss] Cleaning ${toDelete.length} objects under ${prefix} ...`)
  await client.deleteMulti(toDelete)
}

function headersFor(file) {
  const ext = path.extname(file)
  if (ext === '.js' || ext === '.css') {
    return { 'Cache-Control': 'public, max-age=31536000, immutable' }
  }
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp' || ext === '.svg') {
    return { 'Cache-Control': 'public, max-age=604800' }
  }
  return { 'Cache-Control': 'public, max-age=86400' }
}

async function main() {
  const opt = parseArgs()
  const env = opt.env === 'test' ? 'test' : (opt.env === 'prod' || opt.env === 'production' ? 'production' : 'production')
  const clean = !!opt.clean

  const configPath = path.join(root, 'scripts', 'oss.config.json')
  const cfg = readJson(configPath)
  if (!cfg) {
    console.error(`[oss] 配置文件未找到或解析失败：${configPath}`)
    console.error('[oss] 请创建 scripts/oss.config.json，参考 scripts/oss.config.example.json')
    process.exit(1)
  }

  const localDir = env === 'test' ? path.join(root, 'dist-test') : path.join(root, 'dist')
  if (!isDir(localDir)) {
    console.error(`[oss] 本地目录不存在：${localDir}。请先执行对应环境的构建。`)
    process.exit(1)
  }

  const prefix = env === 'test' ? (cfg.testPrefix || 'website-test/') : (cfg.prodPrefix || 'website-prod/')
  const client = new OSS({
    region: cfg.region,
    accessKeyId: cfg.accessKeyId,
    accessKeySecret: cfg.accessKeySecret,
    bucket: cfg.bucket,
  })

  console.log(`[oss] 目标 Bucket: ${cfg.bucket}, 区域: ${cfg.region}, 前缀: ${prefix}`)
  if (clean) await ensureCleanPrefix(client, prefix)

  const files = walk(localDir)
  console.log(`[oss] 开始上传 ${files.length} 个文件到 ${prefix}`)
  for (const full of files) {
    const rel = toPosix(path.relative(localDir, full))
    const remoteKey = `${prefix}${rel}`
    const headers = headersFor(full)
    await client.put(remoteKey, full, { headers })
    console.log(`[oss] 上传成功 -> ${remoteKey}`)
  }
  console.log('[oss] 上传完成')
}

main().catch((e) => {
  console.error('[oss] 发生错误：', e?.message || e)
  process.exit(1)
})