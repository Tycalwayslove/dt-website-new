<template>
  <div class="min-h-screen bg-white">
    <section class="container mx-auto px-4 py-8 md:px-10 lg:px-20 lg:py-12">
      <div v-if="!auth.isLoggedIn" class="mx-auto max-w-3xl rounded-2xl bg-gray-50 p-8 text-center">
        <p class="text-2xl font-semibold text-black">登录后查看成长中心</p>
        <p class="mt-3 text-sm leading-6 text-gray-500">
          成长中心内容面向已登录用户开放，请先登录喵呜AI账号。
        </p>
        <button
          class="mt-6 rounded-xl bg-miaowu-green px-8 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-miaowu-green"
          @click="ui.openLoginDialog()"
        >
          立即登录
        </button>
      </div>

      <div
        v-else-if="!canViewCurrentBizType"
        class="mx-auto max-w-3xl rounded-2xl bg-gray-50 p-8 text-center"
      >
        <p class="text-2xl font-semibold text-black">暂无当前成长中心访问权限</p>
        <p class="mt-3 text-sm leading-6 text-gray-500">
          当前账号暂未开通{{ currentAudienceName }}内容，请切换到账号已开通的身份后查看。
        </p>
        <RouterLink
          v-if="firstAllowedGrowthOption"
          :to="firstAllowedGrowthOption.path"
          class="mt-6 inline-flex rounded-xl bg-miaowu-green px-8 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-miaowu-green"
        >
          查看{{ firstAllowedGrowthOption.label }}
        </RouterLink>
      </div>

      <template v-else>
        <div class="mx-auto max-w-[1400px]">
          <section class="overflow-hidden rounded-2xl bg-black">
            <el-carousel
              :height="carouselHeight"
              indicator-position="outside"
              arrow="hover"
              :autoplay="heroArticles.length > 1"
            >
              <el-carousel-item
                v-for="heroArticle in heroArticles"
                :key="heroArticle.articleId || heroArticle.title"
              >
                <component
                  :is="isHeroArticleClickable(heroArticle) ? RouterLink : 'div'"
                  v-bind="getHeroArticleBind(heroArticle)"
                  class="growth-hero group relative block h-full overflow-hidden rounded-2xl"
                  :class="{ 'cursor-default': !isHeroArticleClickable(heroArticle) }"
                >
                  <img
                    :src="getArticleDisplayImage(heroArticle) || fallbackBanner"
                    :alt="heroArticle.title || '成长中心推荐'"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
                  ></div>
                  <div class="absolute bottom-0 left-0 max-w-3xl p-6 text-white md:p-10">
                    <p class="text-sm font-medium text-miaowu-green">
                      {{
                        heroArticle.firstCategoryName ||
                        heroArticle.bizTypeName ||
                        currentAudienceLabel
                      }}
                    </p>
                    <h1 class="mt-3 line-clamp-2 text-2xl font-semibold md:text-4xl">
                      {{ heroArticle.title || '成长中心推荐' }}
                    </h1>
                    <p
                      class="mt-4 hidden max-w-2xl text-sm leading-6 text-white/80 md:line-clamp-2"
                    >
                      {{ heroArticle.summary || '查看平台公告、操作指南和课程内容。' }}
                    </p>
                  </div>
                </component>
              </el-carousel-item>
            </el-carousel>
          </section>

          <div
            v-if="categoryLoading"
            class="mx-auto mt-8 h-12 max-w-[680px] animate-pulse rounded-xl bg-gray-100"
          ></div>
          <div
            v-else-if="firstCategories.length"
            class="mx-auto mt-8 max-w-[680px] rounded-xl bg-black p-1"
          >
            <div class="flex gap-1 overflow-x-auto">
              <button
                v-for="category in firstCategories"
                :key="category.categoryId"
                class="min-w-[128px] flex-1 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold transition"
                :class="
                  Number(activeFirstId) === Number(category.categoryId)
                    ? 'bg-miaowu-green text-black'
                    : 'text-white hover:text-miaowu-green'
                "
                @click="selectFirstCategory(category)"
              >
                {{ category.categoryName }}
              </button>
            </div>
          </div>

          <div
            v-if="secondCategories.length"
            class="mt-5 flex justify-start gap-8 overflow-x-auto rounded-lg bg-gray-50 px-6"
          >
            <button
              v-for="category in secondCategories"
              :key="category.categoryId"
              class="relative shrink-0 whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-600 transition hover:text-black"
              :class="{ 'text-black': Number(activeSecondId) === Number(category.categoryId) }"
              @click="selectSecondCategory(category)"
            >
              {{ category.categoryName }}
              <span
                v-if="Number(activeSecondId) === Number(category.categoryId)"
                class="absolute bottom-0 left-1/2 h-1 w-10 -translate-x-1/2 bg-miaowu-green"
              ></span>
            </button>
          </div>

          <div v-if="pageLoading" class="mt-10 space-y-6">
            <div v-for="item in 4" :key="item" class="flex gap-6">
              <div class="h-36 w-64 animate-pulse rounded-xl bg-gray-100"></div>
              <div class="flex-1 space-y-4 py-2">
                <div class="h-6 w-2/3 animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-4/5 animate-pulse rounded bg-gray-100"></div>
              </div>
            </div>
          </div>

          <div
            v-else-if="errorMessage"
            class="mt-10 rounded-2xl border border-gray-200 p-8 text-center"
          >
            <p class="text-lg font-semibold text-black">内容加载失败</p>
            <p class="mt-2 text-sm text-gray-500">{{ errorMessage }}</p>
            <button
              class="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-miaowu-green hover:text-black"
              @click="reload"
            >
              重新加载
            </button>
          </div>

          <div
            v-else-if="!activeSecondCategory"
            class="mt-10 rounded-2xl bg-gray-50 p-10 text-center text-gray-500"
          >
            暂无可展示分类
          </div>

          <section v-else class="mt-9">
            <div class="mb-5 flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold text-black md:text-2xl">
                {{ activeSecondCategory.categoryName }}
              </h2>
              <span class="hidden text-sm text-gray-400 md:block">
                {{
                  activeSecondCategory.displayModeName ||
                  getDisplayModeName(activeSecondCategory.displayMode)
                }}
              </span>
            </div>

            <div v-if="articles.length === 0" class="rounded-2xl bg-gray-50 p-10 text-center">
              <p class="text-base font-medium text-black">暂无内容</p>
              <p class="mt-2 text-sm text-gray-500">当前分类下暂时没有可展示的文章。</p>
            </div>

            <div v-else-if="isImageTextMode" class="space-y-8">
              <RouterLink
                v-for="articleItem in articles"
                :key="articleItem.articleId"
                :to="getArticleLink(articleItem)"
                class="group grid gap-5 rounded-2xl p-2 transition hover:bg-gray-50 md:grid-cols-[320px_minmax(0,1fr)] md:gap-8"
              >
                <ArticleCover :article="articleItem" class-name="aspect-[16/9] md:h-[180px]" />
                <div class="flex min-w-0 flex-col justify-center">
                  <h3
                    class="line-clamp-2 text-xl font-semibold leading-snug text-black group-hover:text-miaowu-green"
                  >
                    {{ articleItem.title }}
                  </h3>
                  <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {{ articleItem.summary || stripHtml(articleItem.content) }}
                  </p>
                  <p class="mt-5 text-sm font-medium text-gray-400">
                    {{ formatDate(articleItem.publishTime) }}
                  </p>
                </div>
              </RouterLink>
            </div>

            <div
              v-else-if="isTextMode"
              class="divide-y divide-gray-100 rounded-2xl border border-gray-100"
            >
              <RouterLink
                v-for="textArticle in articles"
                :key="textArticle.articleId"
                :to="getArticleLink(textArticle)"
                class="group block px-5 py-5 transition hover:bg-gray-50 md:px-8"
              >
                <h3
                  class="line-clamp-2 text-lg font-semibold text-black group-hover:text-miaowu-green"
                >
                  {{ textArticle.title }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {{ textArticle.summary || stripHtml(textArticle.content) }}
                </p>
                <p class="mt-3 text-xs text-gray-400">{{ formatDate(textArticle.publishTime) }}</p>
              </RouterLink>
            </div>

            <div v-else-if="isVideoSectionMode" class="space-y-10">
              <section v-for="group in videoSectionGroups" :key="group.key" class="space-y-5">
                <h3 class="text-lg font-semibold text-black md:text-xl">{{ group.name }}</h3>
                <VideoGrid :articles="group.articles" />
              </section>
            </div>

            <VideoGrid v-else :articles="articles" />

            <div class="mt-10 flex justify-center">
              <button
                v-if="hasMore"
                class="rounded-xl border border-black px-8 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="loadingMore"
                @click="loadMore"
              >
                {{ loadingMore ? '加载中...' : '加载更多' }}
              </button>
              <p v-else-if="articles.length" class="text-sm text-gray-400">已展示全部内容</p>
            </div>
          </section>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/one-component-per-file */
import fallbackBanner from '@/assets/img/banner/banner1-pc@2x.png'
import {
  GROWTH_BIZ_TYPE,
  GROWTH_DISPLAY_MODE,
  apiGetGrowthArticlePage,
  apiGetGrowthCategories,
  apiGetGrowthRecommendedArticles,
  getGrowthArticleHeroImage,
  getGrowthArticleImage,
  type GrowthArticle,
  type GrowthBizType,
  type GrowthCategory,
} from '@/api/growth.js'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'
import { canAccessGrowthBizType, getGrowthAudienceOptions } from '@/utils/growthPermission.js'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const pageSize = 20
type GrowthHeroArticle = GrowthArticle & { __fallback?: boolean }

const categoryLoading = ref(false)
const pageLoading = ref(false)
const loadingMore = ref(false)
const errorMessage = ref('')
const categories = ref<GrowthCategory[]>([])
const recommendedArticles = ref<GrowthArticle[]>([])
const articles = ref<GrowthArticle[]>([])
const activeFirstId = ref<number | string>('')
const activeSecondId = ref<number | string>('')
const currentPage = ref(1)
const total = ref(0)
const isMobileViewport = ref(false)
let pageRequestId = 0
let recommendRequestId = 0

function compareCategorySort(a: GrowthCategory, b: GrowthCategory) {
  return Number(a.sort || 0) - Number(b.sort || 0)
}

function sortCategories(list: GrowthCategory[]) {
  return [...list].sort(compareCategorySort)
}

function getCategoryChildren(category?: GrowthCategory | null): GrowthCategory[] {
  const children = category?.children || category?.child || []
  return Array.isArray(children) ? children : []
}

function normalizeCategoryNode(category: GrowthCategory): GrowthCategory {
  return {
    ...category,
    children: sortCategories(getCategoryChildren(category).map(normalizeCategoryNode)),
  }
}

const activeBizType = computed<GrowthBizType>(() => {
  return route.path.includes('/suppliers') ? GROWTH_BIZ_TYPE.SUPPLIER : GROWTH_BIZ_TYPE.SELLER
})
const allowedGrowthOptions = computed(() =>
  auth.isLoggedIn ? getGrowthAudienceOptions(auth.currentUser) : []
)
const growthAccessKey = computed(() =>
  allowedGrowthOptions.value.map((item) => item.bizType).join(',')
)
const firstAllowedGrowthOption = computed(() => allowedGrowthOptions.value[0] || null)
const canViewCurrentBizType = computed(() => {
  return auth.isLoggedIn && canAccessGrowthBizType(auth.currentUser, activeBizType.value)
})
const currentAudienceName = computed(() => {
  return activeBizType.value === GROWTH_BIZ_TYPE.SUPPLIER ? '供应链商家' : '达人卖手'
})
const currentAudienceLabel = computed(() => {
  return activeBizType.value === GROWTH_BIZ_TYPE.SUPPLIER
    ? '供应链商家成长中心'
    : '达人卖手成长中心'
})
const currentBizCategories = computed(() => {
  return categories.value.filter((item) => Number(item.bizType) === Number(activeBizType.value))
})
const firstCategories = computed<GrowthCategory[]>(() => {
  const all = currentBizCategories.value
  const secondByParent = new Map<string, GrowthCategory[]>()

  all.forEach((category) => {
    const normalizedCategory = normalizeCategoryNode(category)
    const isSecondLevel =
      Number(normalizedCategory.categoryLevel) === 2 ||
      (Number(normalizedCategory.parentId || 0) > 0 &&
        Number(normalizedCategory.categoryLevel) !== 1)
    if (!isSecondLevel) return

    const key = String(normalizedCategory.parentId)
    const siblings = secondByParent.get(key) || []
    siblings.push(normalizedCategory)
    secondByParent.set(key, siblings)
  })

  return all
    .filter((category) => {
      const children = getCategoryChildren(category)
      return (
        Number(category.categoryLevel) === 1 ||
        Number(category.parentId || 0) === 0 ||
        Boolean(children.length)
      )
    })
    .map((category) => {
      const normalizedCategory = normalizeCategoryNode(category)
      const flatChildren = secondByParent.get(String(category.categoryId)) || []
      const nestedChildren = getCategoryChildren(normalizedCategory)
      const childMap = new Map<string, GrowthCategory>()

      nestedChildren.forEach((child) => childMap.set(String(child.categoryId), child))
      flatChildren.forEach((child) => childMap.set(String(child.categoryId), child))

      return {
        ...normalizedCategory,
        children: sortCategories(Array.from(childMap.values())),
      }
    })
    .filter((category) => category.children?.length)
    .sort(compareCategorySort)
})
const activeFirstCategory = computed(() => {
  return firstCategories.value.find(
    (item) => Number(item.categoryId) === Number(activeFirstId.value)
  )
})
const secondCategories = computed(() => {
  return sortCategories(getCategoryChildren(activeFirstCategory.value))
})
const activeSecondCategory = computed(() => {
  return secondCategories.value.find(
    (item) => Number(item.categoryId) === Number(activeSecondId.value)
  )
})
const activeDisplayMode = computed(() => Number(activeSecondCategory.value?.displayMode || 0))
const isImageTextMode = computed(() => activeDisplayMode.value === GROWTH_DISPLAY_MODE.IMAGE_TEXT)
const isTextMode = computed(() => activeDisplayMode.value === GROWTH_DISPLAY_MODE.TEXT)
const isVideoSectionMode = computed(
  () => activeDisplayMode.value === GROWTH_DISPLAY_MODE.VIDEO_SECTION
)
const hasMore = computed(() => articles.value.length < total.value)
const carouselHeight = computed(() => (isMobileViewport.value ? '220px' : '430px'))
const heroArticles = computed<GrowthHeroArticle[]>(() => {
  const filtered = recommendedArticles.value.filter(
    (article) => Number(article.bizType) === Number(activeBizType.value)
  )
  const list = filtered.length ? filtered : recommendedArticles.value
  return list.length
    ? list
    : [
        {
          title: currentAudienceLabel.value,
          summary: '查看平台公告、操作指南和课程内容。',
          bizType: activeBizType.value,
          bizTypeName: currentAudienceLabel.value,
          __fallback: true,
        },
      ]
})
const videoSectionGroups = computed(() => {
  const sections = activeSecondCategory.value?.sectionList || []
  const usedArticleIds = new Set<string>()

  const groups = sections.map((section) => {
    const sectionArticles = articles.value.filter((article) => {
      const matched = Number(article.sectionId) === Number(section.sectionId)
      if (matched && article.articleId !== undefined) usedArticleIds.add(String(article.articleId))
      return matched
    })
    return {
      key: String(section.sectionId || section.sectionName),
      name: section.sectionName || '课程板块',
      articles: sectionArticles,
    }
  })

  const rest = articles.value.filter((article) => !usedArticleIds.has(String(article.articleId)))
  if (rest.length) {
    groups.push({ key: 'other', name: '更多课程', articles: rest })
  }

  return groups.filter((group) => group.articles.length)
})

const ensureLogin = () => {
  if (auth.isLoggedIn) return true
  ui.openLoginDialog()
  return false
}

const clearGrowthData = () => {
  categories.value = []
  recommendedArticles.value = []
  articles.value = []
  activeFirstId.value = ''
  activeSecondId.value = ''
  currentPage.value = 1
  total.value = 0
}

const ensureGrowthAccess = () => {
  if (!ensureLogin()) return false
  return canViewCurrentBizType.value
}

const syncGrowthPermissionRoute = () => {
  if (!auth.isLoggedIn || canViewCurrentBizType.value) return
  const option = firstAllowedGrowthOption.value
  if (option && route.path !== option.path) {
    void router.replace(option.path)
  } else {
    clearGrowthData()
  }
}

const refreshGrowthForCurrentAccess = () => {
  if (!auth.isLoggedIn) {
    clearGrowthData()
    return
  }

  syncGrowthPermissionRoute()
  if (canViewCurrentBizType.value) {
    void loadBaseData()
  }
}

const syncViewport = () => {
  isMobileViewport.value = window.innerWidth < 768
}

const loadRecommendedArticles = async () => {
  if (!ensureGrowthAccess()) return
  const requestId = ++recommendRequestId
  const recommendList = await apiGetGrowthRecommendedArticles({
    bizType: activeBizType.value,
  })
  if (requestId !== recommendRequestId) return
  recommendedArticles.value = recommendList
}

const loadBaseData = async () => {
  if (!ensureGrowthAccess()) return
  categoryLoading.value = true
  errorMessage.value = ''
  try {
    const [, categoryList] = await Promise.all([
      loadRecommendedArticles(),
      apiGetGrowthCategories(),
    ])
    categories.value = categoryList
    syncCategorySelection()
    await loadArticles(true)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '请稍后重试'
  } finally {
    categoryLoading.value = false
  }
}

const syncCategorySelection = () => {
  const first = firstCategories.value.some(
    (item) => Number(item.categoryId) === Number(activeFirstId.value)
  )
    ? activeFirstCategory.value
    : firstCategories.value[0]
  activeFirstId.value = first?.categoryId || ''

  const children = getCategoryChildren(first)
  const second = children.some((item) => Number(item.categoryId) === Number(activeSecondId.value))
    ? children.find((item) => Number(item.categoryId) === Number(activeSecondId.value))
    : children[0]
  activeSecondId.value = second?.categoryId || ''
}

const loadArticles = async (reset = true) => {
  if (!canViewCurrentBizType.value || !activeSecondId.value) {
    articles.value = []
    total.value = 0
    return
  }

  const nextPage = reset ? 1 : currentPage.value + 1
  const requestId = ++pageRequestId
  if (reset) {
    pageLoading.value = true
    articles.value = []
    total.value = 0
  } else {
    loadingMore.value = true
  }
  errorMessage.value = ''

  try {
    const page = await apiGetGrowthArticlePage({
      current: nextPage,
      size: pageSize,
      bizType: activeBizType.value,
      secondCategoryId: activeSecondId.value,
    })
    if (requestId !== pageRequestId) return
    currentPage.value = page.current
    total.value = page.total
    articles.value = reset ? page.records : mergeArticles(articles.value, page.records)
  } catch (error) {
    if (requestId !== pageRequestId) return
    errorMessage.value = error instanceof Error ? error.message : '请稍后重试'
  } finally {
    if (requestId === pageRequestId) {
      pageLoading.value = false
      loadingMore.value = false
    }
  }
}

const mergeArticles = (current: GrowthArticle[], incoming: GrowthArticle[]) => {
  const map = new Map(current.map((article) => [String(article.articleId), article]))
  incoming.forEach((article) => map.set(String(article.articleId), article))
  return Array.from(map.values())
}

const selectFirstCategory = (category: GrowthCategory) => {
  activeFirstId.value = category.categoryId || ''
  const firstSecond = getCategoryChildren(category)[0]
  activeSecondId.value = firstSecond?.categoryId || ''
  void loadArticles(true)
}

const selectSecondCategory = (category: GrowthCategory) => {
  activeSecondId.value = category.categoryId || ''
  void loadArticles(true)
}

const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  void loadArticles(false)
}

const reload = () => {
  if (!categories.value.length) void loadBaseData()
  else void loadArticles(true)
}

const getArticleLink = (article: GrowthArticle) => {
  return {
    name: 'GrowthArticleDetail',
    params: { id: article.articleId || '0' },
    query: { bizType: String(activeBizType.value) },
  }
}

const getArticleDisplayImage = (article: GrowthArticle) => getGrowthArticleHeroImage(article)
const isHeroArticleClickable = (article: GrowthHeroArticle) => {
  return !article.__fallback && Boolean(article.articleId)
}
const getHeroArticleBind = (article: GrowthHeroArticle) => {
  return isHeroArticleClickable(article) ? { to: getArticleLink(article) } : {}
}
const formatDate = (value?: string) => String(value || '').slice(0, 10)
const stripHtml = (value?: string) =>
  String(value || '')
    .replace(/<[^>]+>/g, '')
    .trim()
const getDisplayModeName = (value?: number) => {
  const mode = Number(value)
  if (mode === GROWTH_DISPLAY_MODE.IMAGE_TEXT) return '图文列表'
  if (mode === GROWTH_DISPLAY_MODE.TEXT) return '文字列表'
  if (mode === GROWTH_DISPLAY_MODE.VIDEO_SECTION) return '视频板块列表'
  if (mode === GROWTH_DISPLAY_MODE.VIDEO) return '视频列表'
  return ''
}

const ArticleCover = defineComponent({
  name: 'ArticleCover',
  props: {
    article: { type: Object as () => GrowthArticle, required: true },
    className: { type: String, default: 'aspect-[16/9]' },
  },
  setup(props) {
    return () => {
      const image = getGrowthArticleImage(props.article)
      return h(
        'div',
        { class: `relative overflow-hidden rounded-xl bg-gray-100 ${props.className}` },
        [
          image
            ? h('img', {
                src: image,
                alt: props.article.title || '',
                class: 'h-full w-full object-cover transition duration-300 group-hover:scale-105',
                loading: 'lazy',
              })
            : h('div', { class: 'flex h-full w-full items-center justify-center bg-gray-100' }, [
                h(
                  'span',
                  { class: 'px-5 text-center text-sm font-medium text-gray-400' },
                  '暂无封面'
                ),
              ]),
        ]
      )
    }
  },
})

const VideoGrid = defineComponent({
  name: 'VideoGrid',
  props: {
    articles: { type: Array as () => GrowthArticle[], required: true },
  },
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' },
        props.articles.map((article) =>
          h(
            RouterLink,
            {
              key: article.articleId,
              to: getArticleLink(article),
              class: 'group block',
            },
            {
              default: () => [
                h(
                  'div',
                  { class: 'relative overflow-hidden rounded-xl bg-gray-100 aspect-[16/9]' },
                  [
                    getGrowthArticleImage(article)
                      ? h('img', {
                          src: getGrowthArticleImage(article),
                          alt: article.title || '',
                          class:
                            'h-full w-full object-cover transition duration-300 group-hover:scale-105',
                          loading: 'lazy',
                        })
                      : h('div', { class: 'h-full w-full bg-gray-100' }),
                    h(
                      'span',
                      {
                        class:
                          'absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white',
                      },
                      '▶'
                    ),
                  ]
                ),
                h(
                  'h3',
                  {
                    class:
                      'mt-3 line-clamp-2 text-sm font-semibold leading-6 text-black group-hover:text-miaowu-green',
                  },
                  article.title || ''
                ),
              ],
            }
          )
        )
      )
  },
})

onMounted(() => {
  syncViewport()
  window.addEventListener('resize', syncViewport)
  syncGrowthPermissionRoute()
  void loadBaseData()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport)
})

watch([() => auth.isLoggedIn, growthAccessKey], refreshGrowthForCurrentAccess, { flush: 'post' })

watch(activeBizType, () => {
  if (!auth.isLoggedIn) {
    clearGrowthData()
    return
  }
  syncGrowthPermissionRoute()
  if (!canViewCurrentBizType.value) {
    clearGrowthData()
    return
  }
  recommendedArticles.value = []
  syncCategorySelection()
  void loadRecommendedArticles()
  void loadArticles(true)
})
</script>

<style scoped>
.growth-hero :deep(.el-carousel__indicators--outside) {
  margin-top: 10px;
}
</style>
