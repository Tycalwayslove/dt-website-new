<template>
  <div class="min-h-screen bg-white">
    <section class="container mx-auto px-4 py-10 md:px-20 md:py-20">
      <div class="mx-auto max-w-4xl">
        <RouterLink
          to="/about/news"
          class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          返回公司资讯
        </RouterLink>
      </div>

      <div v-if="loading" class="mx-auto max-w-4xl">
        <div class="h-5 w-32 animate-pulse rounded bg-gray-100"></div>
        <div class="mt-6 h-10 w-4/5 animate-pulse rounded bg-gray-100"></div>
        <div class="mt-8 aspect-[16/9] animate-pulse rounded-lg bg-gray-100"></div>
        <div class="mt-8 space-y-4">
          <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
          <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
          <div class="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
        </div>
      </div>

      <div
        v-else-if="errorMessage"
        class="mx-auto max-w-3xl rounded-lg border border-gray-200 p-8 text-center"
      >
        <p class="text-lg font-medium text-black">文章加载失败</p>
        <p class="mt-2 text-sm text-gray-500">{{ errorMessage }}</p>
        <button
          class="mt-6 rounded-lg bg-miaowu-green px-5 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          @click="loadArticle"
        >
          重新加载
        </button>
      </div>

      <article v-else-if="article" class="mx-auto max-w-4xl">
        <header v-fade-in-up="{ delay: 300 }">
          <h1 class="text-3xl font-semibold leading-tight text-black md:text-[48px]">
            {{ article.title }}
          </h1>
          <div class="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{{ formatNewsDate(article.publishTime) || '喵呜AI' }}</span>
            <span v-if="article.author" aria-hidden="true">/</span>
            <span v-if="article.author">{{ article.author }}</span>
          </div>
          <div v-if="article.originalUrl" class="mt-5">
            <a
              :href="article.originalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-black underline underline-offset-4"
            >
              查看公众号原文
            </a>
          </div>
        </header>

        <div
          v-if="displayCoverUrl"
          v-fade-in-up="{ delay: 500 }"
          class="mt-8 overflow-hidden rounded-lg"
        >
          <img :src="displayCoverUrl" :alt="article.title" class="w-full object-cover" />
        </div>

        <div
          v-if="sanitizedHtml"
          v-fade-in-up="{ delay: 700 }"
          class="news-content mt-10 text-base leading-8 text-black md:text-lg"
          v-html="sanitizedHtml"
        ></div>

        <div v-else-if="imageUrls.length" v-fade-in-up="{ delay: 700 }" class="mt-10 space-y-6">
          <img
            v-for="(imageUrl, index) in imageUrls"
            :key="`${imageUrl}-${index}`"
            :src="imageUrl"
            :alt="`${article.title} 图片 ${index + 1}`"
            class="mx-auto h-auto w-full rounded-lg object-contain"
          />
        </div>

        <div v-else class="mt-10 rounded-lg border border-gray-200 p-8 text-center">
          <p class="text-base text-gray-600">当前同步数据暂未包含正文内容。</p>
          <a
            v-if="article.originalUrl"
            :href="article.originalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex rounded-lg bg-miaowu-green px-5 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            打开公众号原文
          </a>
        </div>

        <section
          v-fade-in-up="{ delay: 900 }"
          class="mt-14 border-t border-gray-200 pt-8"
          aria-labelledby="official-account-title"
        >
          <div
            class="flex flex-col gap-6 rounded-lg bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p id="official-account-title" class="text-xl font-semibold text-black">
                关注喵呜AI宇宙公众号
              </p>
              <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                获取公司动态、产品更新和行业观察。用微信扫码关注，也可以打开公众号主页查看历史文章。
              </p>
              <a
                :href="officialAccountUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-5 inline-flex rounded-lg bg-miaowu-green px-5 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                打开公众号主页
              </a>
            </div>
            <a
              :href="officialAccountUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block shrink-0 rounded-lg bg-white p-3 shadow-sm transition hover:shadow-md"
              aria-label="打开喵呜AI宇宙公众号主页"
            >
              <img
                :src="officialAccountQr"
                alt="喵呜AI宇宙公众号二维码"
                class="h-28 w-28 rounded object-contain sm:h-32 sm:w-32"
              />
            </a>
          </div>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  buildNewsArticleApiPath,
  formatNewsDate,
  getDisplayCoverUrl,
  sanitizeNewsHtml,
  type NewsArticleDetail,
} from '@/utils/news'
import officialAccountQr from '@/assets/img/official-account.jpg'

const route = useRoute()
const officialAccountUrl =
  'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkxNzY5Nzk3MA==#wechat_redirect'

const article = ref<NewsArticleDetail | null>(null)
const loading = ref(true)
const errorMessage = ref('')

const articleId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const sanitizedHtml = computed(() => sanitizeNewsHtml(article.value?.contentHtml ?? ''))
const hasContentImages = computed(() => {
  const contentHtml = article.value?.contentHtml ?? ''
  return /<img\b/i.test(contentHtml) || Boolean(article.value?.imageUrls?.length)
})
const displayCoverUrl = computed(() => {
  if (hasContentImages.value) return ''
  return getDisplayCoverUrl(article.value?.coverUrl)
})
const imageUrls = computed(() => article.value?.imageUrls ?? [])

const loadArticle = async () => {
  if (!articleId.value) {
    errorMessage.value = '缺少文章 ID'
    loading.value = false
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(buildNewsArticleApiPath(articleId.value), { cache: 'no-store' })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    article.value = (await response.json()) as NewsArticleDetail
  } catch (error) {
    article.value = null
    errorMessage.value = error instanceof Error ? error.message : '请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadArticle()
})

watch(articleId, () => {
  void loadArticle()
})
</script>

<style scoped>
.news-content {
  word-break: break-word;
}

.news-content :deep(p) {
  margin: 1em 0;
}

.news-content :deep(img) {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  margin: 1.5rem auto;
  border-radius: 8px;
  object-fit: contain;
}

.news-content :deep(a) {
  color: #111827;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.news-content :deep(section),
.news-content :deep(div) {
  max-width: 100%;
}
</style>
