import { httpGet } from './http.js'
import type { HttpRequestConfig } from './http.js'

export const GROWTH_BIZ_TYPE = {
  SUPPLIER: 1,
  SELLER: 2,
} as const

export const GROWTH_DISPLAY_MODE = {
  IMAGE_TEXT: 1,
  TEXT: 2,
  VIDEO_SECTION: 3,
  VIDEO: 4,
} as const

export type GrowthBizType = (typeof GROWTH_BIZ_TYPE)[keyof typeof GROWTH_BIZ_TYPE]
export type GrowthDisplayMode = (typeof GROWTH_DISPLAY_MODE)[keyof typeof GROWTH_DISPLAY_MODE]

export interface GrowthVideoSection {
  sectionId?: number | string
  bizType?: number
  categoryId?: number | string
  sectionName?: string
  sort?: number
  status?: number
}

export interface GrowthCategory {
  categoryId?: number | string
  parentId?: number | string
  categoryLevel?: number
  bizType?: number
  bizTypeName?: string
  categoryName?: string
  displayMode?: GrowthDisplayMode | number
  displayModeName?: string
  sort?: number
  status?: number
  articleCount?: number
  child?: GrowthCategory[]
  children?: GrowthCategory[]
  sectionList?: GrowthVideoSection[]
  sectionNameList?: string[]
}

export interface GrowthArticle {
  articleId?: number | string
  bizType?: number
  bizTypeName?: string
  firstCategoryId?: number | string
  firstCategoryName?: string
  secondCategoryId?: number | string
  secondCategoryName?: string
  displayMode?: GrowthDisplayMode | number
  displayModeName?: string
  sectionId?: number | string
  sectionName?: string
  title?: string
  summary?: string
  coverImg?: string
  content?: string
  videoUrl?: string
  videoCoverImg?: string
  topFlag?: number
  sort?: number
  status?: number
  publishType?: number
  viewCount?: number
  homeRecommend?: number
  homeRecommendStartTime?: string
  homeRecommendEndTime?: string
  homeBannerImg?: string
  publishTime?: string
  createTime?: string
  updateTime?: string
}

export interface GrowthPage<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages?: number
}

interface MallApiResponse<T> {
  code?: string | number
  msg?: string
  message?: string
  data?: T
  success?: boolean
  status?: string
}

export interface GrowthArticlePageParams {
  current?: number
  size?: number
  bizType: GrowthBizType
  secondCategoryId: number | string
}

const RESOURCE_BASE_URL =
  import.meta.env.VITE_GROWTH_RESOURCE_BASE_URL ||
  import.meta.env.VITE_RESOURCE_BASE_URL ||
  'https://awu-mall-file.oss-cn-guangzhou.aliyuncs.com/'
const GROWTH_API_PREFIX = '/growth/center'
const GROWTH_API_BASE_URL = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_GROWTH_API_BASE_URL || ''

function growthGet<T>(url: string, config: HttpRequestConfig = {}) {
  return httpGet<T>(url, {
    ...config,
    baseURL: GROWTH_API_BASE_URL,
    withAuth: true,
    headers: {
      ...(config.headers || {}),
      locale: 'zh_CN',
    },
  })
}

function unwrapMallResponse<T>(response: MallApiResponse<T> | T): T {
  const maybeResponse = response as MallApiResponse<T>
  if (maybeResponse && typeof maybeResponse === 'object' && 'data' in maybeResponse) {
    const code = String(maybeResponse.code ?? '')
    const successLike =
      maybeResponse.success === true ||
      maybeResponse.status === 'ok' ||
      code === '00000' ||
      code === '0' ||
      code === '200' ||
      code === ''

    if (!successLike) {
      throw new Error(maybeResponse.msg || maybeResponse.message || '请求失败')
    }

    return maybeResponse.data as T
  }

  return response as T
}

export function normalizeGrowthFileUrl(url?: string | null) {
  const value = String(url || '').trim()
  if (!value) return ''
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('blob:')) {
    return value
  }
  return `${String(RESOURCE_BASE_URL).replace(/\/+$/, '')}/${value.replace(/^\/+/, '')}`
}

export function getGrowthArticleImage(article?: GrowthArticle | null) {
  return normalizeGrowthFileUrl(
    article?.coverImg || article?.videoCoverImg || article?.homeBannerImg
  )
}

export function getGrowthArticleHeroImage(article?: GrowthArticle | null) {
  return normalizeGrowthFileUrl(
    article?.homeBannerImg || article?.coverImg || article?.videoCoverImg
  )
}

export async function apiGetGrowthRecommendedArticles(params?: {
  bizType?: GrowthBizType | number
}) {
  const response = await growthGet<MallApiResponse<GrowthArticle[]>>(
    `${GROWTH_API_PREFIX}/recommendArticles`,
    { params }
  )
  return unwrapMallResponse<GrowthArticle[]>(response) || []
}

export async function apiGetGrowthCategories() {
  const response = await growthGet<MallApiResponse<GrowthCategory[]>>(
    `${GROWTH_API_PREFIX}/categories`
  )
  return unwrapMallResponse<GrowthCategory[]>(response) || []
}

export async function apiGetGrowthArticlePage(params: GrowthArticlePageParams) {
  const response = await growthGet<MallApiResponse<GrowthPage<GrowthArticle>>>(
    `${GROWTH_API_PREFIX}/article/page`,
    {
      params,
    }
  )
  const data = unwrapMallResponse<GrowthPage<GrowthArticle>>(response)
  return {
    records: data?.records || [],
    total: Number(data?.total || 0),
    size: Number(data?.size || params.size || 10),
    current: Number(data?.current || params.current || 1),
    pages: Number(data?.pages || 0),
  }
}

export async function apiGetGrowthArticleDetail(articleId: string | number) {
  const response = await growthGet<MallApiResponse<GrowthArticle>>(
    `${GROWTH_API_PREFIX}/article/${articleId}`
  )
  return unwrapMallResponse<GrowthArticle>(response)
}

export async function apiGetSameCategoryHotArticles(articleId: string | number, limit = 10) {
  const response = await growthGet<MallApiResponse<GrowthArticle[]>>(
    `${GROWTH_API_PREFIX}/article/${articleId}/sameCategoryHotArticles`,
    { params: { limit } }
  )
  return unwrapMallResponse<GrowthArticle[]>(response) || []
}

export async function apiGetOtherCategoryHotArticles(
  articleId: string | number,
  bizType: GrowthBizType | number,
  limit = 10
) {
  const response = await growthGet<MallApiResponse<GrowthArticle[]>>(
    `${GROWTH_API_PREFIX}/article/${articleId}/otherCategoryHotArticles`,
    { params: { bizType, limit } }
  )
  return unwrapMallResponse<GrowthArticle[]>(response) || []
}
