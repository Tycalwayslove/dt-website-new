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
  apiGetGrowthArticleDetail,
  apiGetOtherCategoryHotArticles,
  apiGetSameCategoryHotArticles,
  getGrowthArticleImage,
  normalizeGrowthFileUrl,
  type GrowthArticle,
} from '@/api/growth.js'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'
import { formatNewsSummaryText, sanitizeNewsHtml } from '@/utils/news'
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const ui = useUiStore()

const article = ref<GrowthArticle | null>(null)
const sameCategoryHotArticles = ref<GrowthArticle[]>([])
const otherCategoryHotArticles = ref<GrowthArticle[]>([])
const loading = ref(false)
const errorMessage = ref('')
let requestId = 0

const articleId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})
const backLink = computed(() => {
  return Number(route.query.bizType) === 1 ? '/growth-center/suppliers' : '/growth-center/sellers'
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

const loadDetail = async () => {
  if (!ensureLogin()) return
  if (!articleId.value) {
    errorMessage.value = '缺少文章 ID'
    return
  }

  const currentRequestId = ++requestId
  loading.value = true
  errorMessage.value = ''
  article.value = null
  sameCategoryHotArticles.value = []
  otherCategoryHotArticles.value = []

  try {
    const detail = await apiGetGrowthArticleDetail(articleId.value)
    if (currentRequestId !== requestId) return
    article.value = detail

    const [sameResult, otherResult] = await Promise.allSettled([
      apiGetSameCategoryHotArticles(articleId.value, 10),
      apiGetOtherCategoryHotArticles(articleId.value, 10),
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
  void loadDetail()
})

watch(articleId, () => {
  void loadDetail()
})

watch(
  () => auth.isLoggedIn,
  (loggedIn) => {
    if (loggedIn) void loadDetail()
    else {
      article.value = null
      sameCategoryHotArticles.value = []
      otherCategoryHotArticles.value = []
    }
  }
)
</script>

<style scoped>
.growth-detail-content {
  word-break: break-word;
}

.growth-detail-content :deep(p) {
  margin: 1em 0;
}

.growth-detail-content :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1.5rem auto;
  border-radius: 12px;
}

.growth-detail-content :deep(a) {
  color: #111827;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.growth-detail-content :deep(video) {
  max-width: 100%;
}
</style>
