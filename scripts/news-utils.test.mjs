import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import ts from 'typescript'

async function importNewsUtils() {
  const outdir = await mkdtemp(join(tmpdir(), 'news-utils-'))
  const outfile = join(outdir, 'news-utils.mjs')
  const source = await readFile('src/utils/news.ts', 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  })

  await writeFile(outfile, `${outputText}\n//# sourceURL=${outfile}\n`, 'utf8')
  const module = await import(`${outfile}?t=${Date.now()}`)

  return {
    module,
    cleanup: () => rm(outdir, { recursive: true, force: true }),
  }
}

test('buildNewsArticlePath encodes article IDs for static json detail files', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.buildNewsArticlePath('abc_123-0'), '/news/articles/abc_123-0.json')
    assert.equal(module.buildNewsArticlePath('hello world'), '/news/articles/hello%20world.json')
  } finally {
    await cleanup()
  }
})

test('buildNewsArticleApiPath encodes article IDs for API detail endpoints', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.buildNewsArticleApiPath('abc_123-0'), '/api/news/articles/abc_123-0')
    assert.equal(module.buildNewsArticleApiPath('hello world'), '/api/news/articles/hello%20world')
  } finally {
    await cleanup()
  }
})

test('buildNewsArticlesApiPath builds paginated list endpoints', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.buildNewsArticlesApiPath(), '/api/news/articles?page=1&pageSize=10')
    assert.equal(module.buildNewsArticlesApiPath(3, 20), '/api/news/articles?page=3&pageSize=20')
  } finally {
    await cleanup()
  }
})

test('buildNewsManualImportApiPath returns manual import endpoint', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.buildNewsManualImportApiPath(), '/api/news/manual-import')
  } finally {
    await cleanup()
  }
})

test('formatNewsDate renders wechat second timestamps as local dates', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.formatNewsDate(1761710400), '2025.10.29')
    assert.equal(module.formatNewsDate(0), '')
    assert.equal(module.formatNewsDate(undefined), '')
  } finally {
    await cleanup()
  }
})

test('getDisplayCoverUrl hides wechat hotlink images but keeps local covers', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(module.getDisplayCoverUrl('http://mmecoa.qpic.cn/mmecoa_jpg/example/0'), '')
    assert.equal(module.getDisplayCoverUrl('https://mmbiz.qpic.cn/mmbiz_jpg/example/0'), '')
    assert.equal(module.getDisplayCoverUrl('/news/images/example.jpg'), '/news/images/example.jpg')
  } finally {
    await cleanup()
  }
})

test('formatNewsSummaryText strips wechat topic html from list summaries', async () => {
  const { module, cleanup } = await importNewsUtils()

  try {
    assert.equal(
      module.formatNewsSummaryText(
        '<a class="wx_topic_link" topic-id="moh2zxrf-rzt0is" style="color: #576B95 !important;">#喵呜AI</a>',
      ),
      '#喵呜AI',
    )
    assert.equal(module.formatNewsSummaryText('<p>AI&nbsp;&amp;&nbsp;电商<br>增长</p>'), 'AI & 电商 增长')
  } finally {
    await cleanup()
  }
})
