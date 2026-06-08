<template>
  <div class="min-h-screen bg-white">
    <section class="container mx-auto px-4 py-10 md:px-20 md:py-20">
      <div v-fade-in-up="{ delay: 300 }" class="mb-10 md:mb-14">
        <h1 class="text-3xl md:text-[56px] font-wendao tracking-tight text-black">公司资讯</h1>
        <div class="mt-4 md:mt-[30px] mb-5 md:mb-[30px] h-[3px] w-20 md:w-[120px] bg-black"></div>
        <p class="max-w-3xl text-base md:text-xl leading-relaxed text-black">
          关注喵呜AI官方公众号动态，了解产品进展、行业观察与公司新闻。
        </p>
      </div>

      <div v-if="loading && articles.length === 0" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="item in 6"
          :key="item"
          class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
        >
          <div class="aspect-[16/9] animate-pulse bg-gray-100"></div>
          <div class="space-y-3 p-5">
            <div class="h-4 w-24 animate-pulse rounded bg-gray-100"></div>
            <div class="h-6 w-full animate-pulse rounded bg-gray-100"></div>
            <div class="h-4 w-4/5 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="errorMessage && articles.length === 0"
        class="rounded-lg border border-gray-200 p-8 text-center"
      >
        <p class="text-lg font-medium text-black">资讯加载失败</p>
        <p class="mt-2 text-sm text-gray-500">{{ errorMessage }}</p>
        <button
          class="mt-6 rounded-lg bg-miaowu-green px-5 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          @click="loadNews"
        >
          重新加载
        </button>
      </div>

      <div
        v-else-if="articles.length === 0"
        class="rounded-lg border border-gray-200 p-8 text-center"
      >
        <p class="text-lg font-medium text-black">暂无公司资讯</p>
        <p class="mt-2 text-sm text-gray-500">同步脚本运行后，这里会自动展示公众号文章。</p>
      </div>

      <template v-else>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <RouterLink
            v-for="article in articles"
            :key="article.id"
            :to="{ name: 'AboutNewsDetail', params: { id: article.id } }"
            class="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                v-if="getDisplayCoverUrl(article.coverUrl)"
                :src="getDisplayCoverUrl(article.coverUrl)"
                :alt="article.title"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-black px-6 text-center"
              >
                <span class="text-xl font-medium leading-snug text-white">{{ article.title }}</span>
              </div>
            </div>

            <div class="flex flex-1 flex-col p-5">
              <p class="mb-3 text-sm text-gray-500">
                {{ formatNewsDate(article.publishTime) || '喵呜AI' }}
              </p>
              <h2 class="line-clamp-2 text-xl font-semibold leading-snug text-black">
                {{ article.title }}
              </h2>
              <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                {{ formatNewsSummaryText(article.digest) || '点击查看文章详情。' }}
              </p>
              <span
                class="mt-5 inline-flex text-sm font-medium text-black group-hover:text-miaowu-green"
              >
                阅读详情
              </span>
            </div>
          </RouterLink>
        </div>

        <div class="mt-10 flex flex-col items-center gap-3">
          <div v-if="hasMore" ref="loadMoreTrigger" class="h-px w-full" aria-hidden="true"></div>
          <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
          <button
            v-if="hasMore"
            class="rounded-lg border border-black px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-white disabled:hover:text-gray-400"
            :disabled="loadingMore"
            @click="loadMore"
          >
            {{ loadingMore ? '加载中...' : '加载更多' }}
          </button>
          <p v-else class="text-sm text-gray-400">已展示全部资讯</p>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import {
  buildNewsArticlesApiPath,
  formatNewsDate,
  formatNewsSummaryText,
  getDisplayCoverUrl,
  type NewsArticleSummary,
  type NewsListPayload,
} from '@/utils/news'

const pageSize = 10
const articles = ref<NewsArticleSummary[]>([])
const page = ref(1)
const total = ref(0)
const hasMore = ref(false)
const loading = ref(true)
const loadingMore = ref(false)
const errorMessage = ref('')
const loadMoreTrigger = ref<HTMLElement | null>(null)
let loadMoreObserver: IntersectionObserver | null = null

const loadNews = async (reset = true) => {
  const nextPage = reset ? 1 : page.value + 1

  if (reset) {
    loading.value = true
  } else {
    loadingMore.value = true
  }
  errorMessage.value = ''

  try {
    const response = await fetch(buildNewsArticlesApiPath(nextPage, pageSize), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = (await response.json()) as NewsListPayload
    const incomingArticles = payload.articles ?? []

    articles.value = reset ? incomingArticles : mergeArticles(articles.value, incomingArticles)
    page.value = payload.page ?? nextPage
    total.value = payload.total ?? articles.value.length
    hasMore.value = payload.hasMore ?? articles.value.length < total.value
  } catch (error) {
    if (reset) articles.value = []
    errorMessage.value = error instanceof Error ? error.message : '请稍后重试'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  void loadNews(false)
}

const observeLoadMoreTrigger = () => {
  loadMoreObserver?.disconnect()
  loadMoreObserver = null

  if (!loadMoreTrigger.value || !hasMore.value || typeof IntersectionObserver === 'undefined') {
    return
  }

  loadMoreObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMore()
      }
    },
    {
      rootMargin: '240px 0px',
    }
  )
  loadMoreObserver.observe(loadMoreTrigger.value)
}

function mergeArticles(
  currentArticles: NewsArticleSummary[],
  incomingArticles: NewsArticleSummary[]
) {
  const articlesById = new Map(currentArticles.map((article) => [article.id, article]))

  incomingArticles.forEach((article) => {
    articlesById.set(article.id, article)
  })

  return Array.from(articlesById.values())
}

onMounted(() => {
  void loadNews()
})

watch([hasMore, () => articles.value.length], async () => {
  await nextTick()
  observeLoadMoreTrigger()
})

onBeforeUnmount(() => {
  loadMoreObserver?.disconnect()
})
</script>
