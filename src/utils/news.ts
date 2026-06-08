export interface NewsArticleSummary {
  id: string
  title: string
  digest?: string
  author?: string
  coverUrl?: string
  imageUrls?: string[]
  publishTime?: number
  originalUrl?: string
  sourcePublishId?: string
  sourceIndex?: number
}

export interface NewsArticleDetail extends NewsArticleSummary {
  contentHtml: string
  updatedAt?: string
}

export interface NewsListPayload {
  updatedAt: string
  total: number
  page?: number
  pageSize?: number
  totalPages?: number
  hasMore?: boolean
  articles: NewsArticleSummary[]
}

export function buildNewsArticlePath(id: string): string {
  return `/news/articles/${encodeURIComponent(id)}.json`
}

export function buildNewsArticleApiPath(id: string): string {
  return `/api/news/articles/${encodeURIComponent(id)}`
}

export function buildNewsArticlesApiPath(page = 1, pageSize = 10): string {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  return `/api/news/articles?${query.toString()}`
}

export function buildNewsManualImportApiPath(): string {
  return '/api/news/manual-import'
}

export function formatNewsDate(timestamp?: number): string {
  if (!timestamp) return ''

  const milliseconds = timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp
  const date = new Date(milliseconds)

  if (Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export function getDisplayCoverUrl(url?: string): string {
  if (!url) return ''

  try {
    const { hostname } = new URL(url, 'https://meupop.com')
    return hostname.endsWith('qpic.cn') ? '' : url
  } catch {
    return url.startsWith('/news/') ? url : ''
  }
}

export function formatNewsSummaryText(value?: string): string {
  if (!value) return ''

  const namedEntities: Record<string, string> = {
    nbsp: ' ',
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
  }

  return value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity: string) => {
      const normalized = entity.toLowerCase()
      const namedValue = namedEntities[normalized]

      if (namedValue) return namedValue

      if (normalized.startsWith('#x')) {
        const codePoint = Number.parseInt(normalized.slice(2), 16)
        return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ''
      }

      if (normalized.startsWith('#')) {
        const codePoint = Number.parseInt(normalized.slice(1), 10)
        return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ''
      }

      return ''
    })
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitizeNewsHtml(html: string): string {
  if (!html) return ''
  if (typeof document === 'undefined') return html

  const template = document.createElement('template')
  template.innerHTML = html

  template.content
    .querySelectorAll(
      'script, iframe, object, embed, form, input, button, textarea, select, link, meta'
    )
    .forEach((node) => node.remove())

  template.content.querySelectorAll('*').forEach((node) => {
    Array.from(node.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      const value = attribute.value.trim()

      if (name.startsWith('on')) {
        node.removeAttribute(attribute.name)
        return
      }

      if ((name === 'href' || name === 'src') && /^javascript:/i.test(value)) {
        node.removeAttribute(attribute.name)
      }
    })
  })

  return template.innerHTML
}
