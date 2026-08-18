<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="min-h-screen bg-white">
    <section class="container mx-auto px-4 py-8 md:px-10 lg:px-20 lg:py-12">
      <div v-if="!auth.isLoggedIn" class="mx-auto max-w-3xl rounded-2xl bg-gray-50 p-8 text-center">
        <p class="text-2xl font-semibold text-black">登录后查看文章详情</p>
        <p class="mt-3 text-sm leading-6 text-gray-500">
          成长中心内容需要登录后访问，请先登录喵呜AI账号。
        </p>
        <button
          class="mt-6 rounded-xl bg-miaowu-green px-8 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-miaowu-green"
          @click="ui.openLoginDialog()"
        >
          立即登录
        </button>
      </div>

      <div
        v-else-if="!canViewRequestedBizType"
        class="mx-auto max-w-3xl rounded-2xl bg-gray-50 p-8 text-center"
      >
        <p class="text-2xl font-semibold text-black">暂无文章访问权限</p>
        <p class="mt-3 text-sm leading-6 text-gray-500">
          当前账号暂未开通该成长中心内容，请切换到账号已开通的身份后查看。
        </p>
        <RouterLink
          v-if="firstAllowedGrowthOption"
          :to="firstAllowedGrowthOption.path"
          class="mt-6 inline-flex rounded-xl bg-miaowu-green px-8 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-miaowu-green"
        >
          返回{{ firstAllowedGrowthOption.label }}
        </RouterLink>
      </div>

      <div v-else class="mx-auto max-w-[1240px]">
        <RouterLink
          :to="backLink"
          class="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <span aria-hidden="true">‹</span>
          返回成长中心
        </RouterLink>

        <div v-if="loading" class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div class="h-5 w-36 animate-pulse rounded bg-gray-100"></div>
            <div class="mt-6 h-10 w-4/5 animate-pulse rounded bg-gray-100"></div>
            <div class="mt-8 aspect-[16/9] animate-pulse rounded-2xl bg-gray-100"></div>
            <div class="mt-8 space-y-4">
              <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
              <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
              <div class="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
          <div class="hidden space-y-4 lg:block">
            <div class="h-64 animate-pulse rounded-2xl bg-gray-100"></div>
            <div class="h-64 animate-pulse rounded-2xl bg-gray-100"></div>
          </div>
        </div>

        <div
          v-else-if="errorMessage"
          class="mx-auto max-w-3xl rounded-2xl border border-gray-200 p-8 text-center"
        >
          <p class="text-lg font-semibold text-black">详情加载失败</p>
          <p class="mt-2 text-sm text-gray-500">{{ errorMessage }}</p>
          <button
            class="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-miaowu-green hover:text-black"
            @click="loadDetail"
          >
            重新加载
          </button>
        </div>

        <div v-else-if="article" class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
            <nav class="mb-7 text-sm text-gray-400">
              成长中心 / {{ article.firstCategoryName || '分类' }} /
              {{ article.secondCategoryName || '详情' }}
            </nav>

            <header class="border-b border-gray-100 pb-7">
              <h1 class="text-2xl font-semibold leading-tight text-black md:text-4xl">
                {{ article.title }}
              </h1>
              <div class="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span>{{ formatDate(article.publishTime) }}</span>
                <span v-if="article.viewCount">浏览 {{ article.viewCount }}</span>
                <span v-if="article.sectionName">{{ article.sectionName }}</span>
              </div>
            </header>

            <div v-if="article.videoUrl" class="mt-7 overflow-hidden rounded-2xl bg-black">
              <video
                :src="normalizeGrowthFileUrl(article.videoUrl)"
                :poster="articlePoster"
                controls
                playsinline
                class="aspect-video w-full bg-black"
              ></video>
            </div>

            <div v-else-if="articlePoster" class="mt-7 overflow-hidden rounded-2xl bg-gray-100">
              <img :src="articlePoster" :alt="article.title" class="w-full object-cover" />
            </div>

            <div
              v-if="safeContent"
              ref="contentRef"
              class="growth-detail-content mt-7 text-base leading-8 text-black"
              v-html="safeContent"
            ></div>

            <div v-else class="mt-7 space-y-5 text-base leading-8 text-black">
              <p v-for="(paragraph, index) in fallbackParagraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </article>

          <aside class="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <HotPanel title="同类热门" :articles="sameCategoryHotArticles" tone="green" />
            <HotPanel title="更多热门课程" :articles="otherCategoryHotArticles" tone="orange" />
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  GROWTH_BIZ_TYPE,
  apiGetGrowthArticleDetail,
  apiGetOtherCategoryHotArticles,
  apiGetSameCategoryHotArticles,
  getGrowthArticleImage,
  normalizeGrowthFileUrl,
  type GrowthArticle,
  type GrowthBizType,
} from '@/api/growth.js'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'
import { canAccessGrowthBizType, getGrowthAudienceOptions } from '@/utils/growthPermission.js'
import { formatNewsSummaryText, sanitizeNewsHtml } from '@/utils/news'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const ui = useUiStore()

const article = ref<GrowthArticle | null>(null)
const sameCategoryHotArticles = ref<GrowthArticle[]>([])
const otherCategoryHotArticles = ref<GrowthArticle[]>([])
const contentRef = ref<HTMLElement | null>(null)
const loading = ref(false)
const errorMessage = ref('')
let requestId = 0
let richTextLayoutFrame = 0

const articleId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})
const routeBizType = computed<GrowthBizType | null>(() => {
  const value = Number(route.query.bizType)
  if (value === GROWTH_BIZ_TYPE.SUPPLIER || value === GROWTH_BIZ_TYPE.SELLER) {
    return value
  }
  return null
})
const allowedGrowthOptions = computed(() =>
  auth.isLoggedIn ? getGrowthAudienceOptions(auth.currentUser) : []
)
const growthAccessKey = computed(() =>
  allowedGrowthOptions.value.map((item) => item.bizType).join(',')
)
const firstAllowedGrowthOption = computed(() => allowedGrowthOptions.value[0] || null)
const canViewRequestedBizType = computed(() => {
  if (!auth.isLoggedIn) return false
  if (!routeBizType.value) return allowedGrowthOptions.value.length > 0
  return canAccessGrowthBizType(auth.currentUser, routeBizType.value)
})
const backLink = computed(() => {
  if (Number(route.query.bizType) === GROWTH_BIZ_TYPE.SUPPLIER) return '/growth-center/suppliers'
  if (Number(route.query.bizType) === GROWTH_BIZ_TYPE.SELLER) return '/growth-center/sellers'
  return firstAllowedGrowthOption.value?.path || '/growth-center/sellers'
})
const articlePoster = computed(() => getGrowthArticleImage(article.value))
const safeContent = computed(() => sanitizeNewsHtml(article.value?.content || ''))
const fallbackParagraphs = computed(() => {
  const text = formatNewsSummaryText(article.value?.summary || '')
  if (!text) return ['当前文章暂未配置正文内容。']
  return text.split(/\n+/).filter(Boolean)
})

const ensureLogin = () => {
  if (auth.isLoggedIn) return true
  ui.openLoginDialog()
  return false
}

const ensureGrowthAccess = () => {
  if (!ensureLogin()) return false
  return canViewRequestedBizType.value
}

const clearDetailData = () => {
  article.value = null
  sameCategoryHotArticles.value = []
  otherCategoryHotArticles.value = []
}

const loadDetail = async () => {
  if (!ensureGrowthAccess()) {
    clearDetailData()
    return
  }
  if (!articleId.value) {
    errorMessage.value = '缺少文章 ID'
    return
  }

  const currentRequestId = ++requestId
  loading.value = true
  errorMessage.value = ''
  clearDetailData()

  try {
    const detail = await apiGetGrowthArticleDetail(articleId.value)
    if (currentRequestId !== requestId) return
    if (
      detail?.bizType &&
      !canAccessGrowthBizType(auth.currentUser, Number(detail.bizType) as GrowthBizType)
    ) {
      clearDetailData()
      errorMessage.value = '暂无该文章访问权限'
      return
    }
    article.value = detail
    const recommendBizType = Number(
      detail?.bizType || routeBizType.value || firstAllowedGrowthOption.value?.bizType
    )

    const [sameResult, otherResult] = await Promise.allSettled([
      apiGetSameCategoryHotArticles(articleId.value, 10),
      apiGetOtherCategoryHotArticles(articleId.value, recommendBizType, 10),
    ])
    if (currentRequestId !== requestId) return
    sameCategoryHotArticles.value =
      sameResult.status === 'fulfilled' ? sameResult.value.filter(isNotCurrentArticle) : []
    otherCategoryHotArticles.value =
      otherResult.status === 'fulfilled' ? otherResult.value.filter(isNotCurrentArticle) : []
  } catch (error) {
    if (currentRequestId !== requestId) return
    errorMessage.value = error instanceof Error ? error.message : '请稍后重试'
  } finally {
    if (currentRequestId === requestId) {
      loading.value = false
    }
  }
}

const isNotCurrentArticle = (item: GrowthArticle) => {
  return String(item.articleId) !== String(articleId.value)
}
const formatDate = (value?: string) => String(value || '').slice(0, 10)
const parsePixelSize = (value?: string | null) => {
  const normalized = String(value || '').trim()
  if (!normalized) return 0
  const matched = normalized.match(/^(\d+(?:\.\d+)?)(?:px)?$/i)
  return matched ? Number(matched[1]) : 0
}

const getDeclaredImageSize = (image: HTMLImageElement) => {
  const width = parsePixelSize(image.style.width) || parsePixelSize(image.getAttribute('width'))
  const height = parsePixelSize(image.style.height) || parsePixelSize(image.getAttribute('height'))
  return { width, height }
}

const adjustRichTextImages = () => {
  const content = contentRef.value
  if (!content) return

  content.querySelectorAll('img').forEach((image) => {
    const { width, height } = getDeclaredImageSize(image)
    if (!width || !height) return

    const parentWidth = image.parentElement?.clientWidth || content.clientWidth
    const targetWidth = Math.min(width, parentWidth)
    const targetHeight = (targetWidth * height) / width

    image.style.width = `${targetWidth}px`
    image.style.height = `${targetHeight}px`
    image.style.maxWidth = '100%'
    image.style.objectFit = 'fill'
  })
}

const scheduleRichTextLayout = () => {
  if (typeof window === 'undefined') return
  if (richTextLayoutFrame) window.cancelAnimationFrame(richTextLayoutFrame)

  void nextTick(() => {
    richTextLayoutFrame = window.requestAnimationFrame(() => {
      richTextLayoutFrame = 0
      adjustRichTextImages()
    })
  })
}

const HotPanel = defineComponent({
  name: 'HotPanel',
  props: {
    title: { type: String, required: true },
    articles: { type: Array as () => GrowthArticle[], required: true },
    tone: { type: String, default: 'green' },
  },
  setup(props) {
    return () =>
      h('section', { class: 'rounded-2xl bg-gray-50 p-5' }, [
        h('div', { class: 'mb-4 flex items-center gap-2' }, [
          h('span', {
            class: [
              'h-5 w-2 rounded-full',
              props.tone === 'orange' ? 'bg-orange-500' : 'bg-miaowu-green',
            ],
          }),
          h('h2', { class: 'text-base font-semibold text-black' }, props.title),
        ]),
        props.articles.length
          ? h(
              'ol',
              { class: 'space-y-3' },
              props.articles.map((item, index) =>
                h('li', { key: item.articleId, class: 'flex gap-2 text-sm leading-5' }, [
                  h(
                    'span',
                    {
                      class:
                        index < 3
                          ? 'w-5 shrink-0 font-semibold text-red-500'
                          : 'w-5 shrink-0 text-gray-400',
                    },
                    `${index + 1}.`
                  ),
                  h(
                    RouterLink,
                    {
                      to: {
                        name: 'GrowthArticleDetail',
                        params: { id: item.articleId || '0' },
                        query: route.query,
                      },
                      class: 'line-clamp-2 text-gray-700 transition hover:text-miaowu-green',
                    },
                    { default: () => item.title || '未命名内容' }
                  ),
                ])
              )
            )
          : h('p', { class: 'text-sm text-gray-400' }, '暂无推荐内容'),
      ])
  },
})

onMounted(() => {
  window.addEventListener('resize', scheduleRichTextLayout)
  void loadDetail()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', scheduleRichTextLayout)
  if (richTextLayoutFrame) window.cancelAnimationFrame(richTextLayoutFrame)
})

watch(articleId, () => {
  void loadDetail()
})

watch(safeContent, () => {
  scheduleRichTextLayout()
})

watch(
  () => route.query.bizType,
  () => {
    void loadDetail()
  }
)

watch(
  [() => auth.isLoggedIn, growthAccessKey],
  ([loggedIn]) => {
    if (loggedIn) void loadDetail()
    else clearDetailData()
  },
  { flush: 'post' }
)
</script>

<style scoped>
.growth-detail-content {
  word-break: break-word;
  overflow-wrap: anywhere;
}

.growth-detail-content :deep(p) {
  margin: 1em 0;
}

.growth-detail-content :deep(img) {
  max-width: 100%;
  vertical-align: middle;
}

.growth-detail-content :deep(img:not([height]):not([style*='height'])) {
  height: auto;
}

.growth-detail-content :deep(a) {
  color: #111827;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.growth-detail-content :deep(video) {
  max-width: 100%;
}

.growth-detail-content :deep(table) {
  max-width: 100%;
  border-collapse: collapse;
}

.growth-detail-content :deep(th),
.growth-detail-content :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
}

.growth-detail-content :deep(ul),
.growth-detail-content :deep(ol) {
  margin: 1em 0;
  padding-left: 1.5em;
}

.growth-detail-content :deep(ul) {
  list-style: disc;
}

.growth-detail-content :deep(ol) {
  list-style: decimal;
}

.growth-detail-content :deep(blockquote) {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #e5e7eb;
  color: #4b5563;
}

.growth-detail-content :deep(h1),
.growth-detail-content :deep(h2),
.growth-detail-content :deep(h3),
.growth-detail-content :deep(h4),
.growth-detail-content :deep(h5),
.growth-detail-content :deep(h6) {
  margin: 1em 0 0.6em;
  font-weight: 600;
  line-height: 1.35;
}

.growth-detail-content :deep(h1) {
  font-size: 2em;
}

.growth-detail-content :deep(h2) {
  font-size: 1.5em;
}

.growth-detail-content :deep(h3) {
  font-size: 1.25em;
}
</style>
