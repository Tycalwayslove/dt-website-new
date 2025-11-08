#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readmePath = path.join(root, 'README.md')
const START = '<!-- RECENT_COMMITS_START -->'
const END = '<!-- RECENT_COMMITS_END -->'

function getRecentCommits(n = 10) {
  try {
    const fmt = "%h | %ad | %an | %s"
    const cmd = `git log --date=short -n ${n} --pretty=format:'${fmt}'`
    const raw = execSync(cmd, { cwd: root, encoding: 'utf-8' })
    const lines = raw.split('\n').filter(Boolean)
    return lines.map((l) => {
      const [hash, date, author, ...rest] = l.split(' | ')
      const subject = rest.join(' | ')
      return { hash, date, author, subject }
    })
  } catch (e) {
    console.error('[changelog] 获取 git 日志失败：', e?.message || e)
    return []
  }
}

function renderList(items) {
  if (!items.length) return '- 暂无提交记录或仓库未初始化 Git\n'
  return items.map((i) => `- ${i.hash} ${i.date} ${i.author} ${i.subject}`).join('\n') + '\n'
}

function ensureMarkers(content) {
  if (content.includes(START) && content.includes(END)) return content
  const block = `\n## Recent Commits\n\n${START}\n${END}\n`
  return content.trimEnd() + '\n' + block
}

function updateReadme(commits) {
  let content = fs.readFileSync(readmePath, 'utf-8')
  content = ensureMarkers(content)
  const startIdx = content.indexOf(START)
  const endIdx = content.indexOf(END)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error('README 标记范围不正确')
  }
  const before = content.slice(0, startIdx + START.length)
  const after = content.slice(endIdx)
  const middle = '\n' + renderList(commits) + '\n'
  const updated = before + middle + after
  fs.writeFileSync(readmePath, updated)
}

const commits = getRecentCommits(10)
updateReadme(commits)
console.log(`[changelog] 已更新 README 最近 ${commits.length} 条提交记录`)