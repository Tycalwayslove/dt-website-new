<template>
  <section class="container overflow-x-hidden pt-10 md:pt-16 lg:pt-20">
    <!-- 轮播视口 -->
    <div
      class="relative w-full overflow-hidden"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
      @touchstart="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <!-- 轮播轨道（支持首尾克隆，无缝无限轮播） -->
      <div
        class="flex"
        :class="isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        @transitionend="onTransitionEnd"
      >
        <!-- 轮播项 -->
        <div
          v-for="(item, idx) in slidesWithClones"
          :key="item.id + '-' + idx"
          class="w-full flex-shrink-0"
        >
          <!-- PC端：左图右文（lg 及以上）-->
          <div class="hidden lg:grid items-center lg:[grid-template-columns:auto_1fr] gap-20">
            <!-- 左侧图片（按断点和视口计算尺寸与比例），入场动效 + 渐变遮罩 + 浅阴影 -->
            <div class="w-full flex justify-center">
              <div
                class="overflow-hidden relative shadow-sm md:shadow"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]',
                ]"
                :style="desktopImageStyle"
              >
                <img
                  :src="getImageSrc(item)"
                  :alt="item.title"
                  class="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 rounded-2xl"
                  loading="eager"
                />
                <!-- 微妙渐变遮罩，底部略暗以提升层次 -->
                <div
                  class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0 rounded-2xl"
                ></div>
              </div>
            </div>
            <!-- 右侧文字区域：渐显+轻微横向滑入，分段延迟 -->
            <div class="w-full flex flex-col justify-center">
              <h2
                class="text-[56px] text-black leading-tight font-wendao"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4',
                ]"
                style="transition-delay: 100ms"
              >
                {{ item.title }}
              </h2>
              <!-- 标题下分割线：120x3 黑色，随标题横向滑入与渐显 -->
              <div
                class="mt-[30px] w-[120px] h-[3px] bg-black"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4',
                ]"
                style="transition-delay: 140ms"
              ></div>
              <p
                class="mt-[30px] text-xl text-gray-700 leading-relaxed max-w-[640px]"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4',
                ]"
                style="transition-delay: 180ms"
              >
                {{ item.desc }}
              </p>
              <div class="mt-[30px]">
                <router-link
                  v-if="item.ctaText"
                  :to="item.ctaLink || '#'"
                  class="inline-flex items-center px-20 py-3 rounded-md bg-black text-white hover:bg-miaowu-green hover:text-black transition-colors duration-200"
                  :class="[
                    shouldAnimateContent
                      ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                      : 'transition-none',
                    idx === currentIndex && isContentEntering
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4',
                  ]"
                  style="transition-delay: 260ms"
                >
                  {{ item.ctaText }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- 移动端：上图下文（< lg）-->
          <div class="lg:hidden mx-auto py-6">
            <!-- 图片在上（按 335/150 比例自适应，最小高度 150px），入场动效 + 渐变遮罩 + 浅阴影 -->
            <div
              class="overflow-hidden relative shadow-sm"
              :class="[
                shouldAnimateContent
                  ? 'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out'
                  : 'transition-none',
                idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]',
              ]"
              :style="mobileImageStyle"
            >
              <img
                :src="getImageSrc(item)"
                :alt="item.title"
                class="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 rounded-2xl"
                loading="eager"
              />
              <!-- 微妙渐变遮罩，底部略暗以提升层次 -->
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0 rounded-2xl"
              ></div>
            </div>
            <!-- 文字在下：渐显+轻微横向滑入，分段延迟 -->
            <div class="mt-5">
              <h2
                class="text-2xl md:text-3xl text-black leading-tight font-wendao"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4',
                ]"
                style="transition-delay: 100ms"
              >
                {{ item.title }}
              </h2>
              <!-- 移动端标题下分割线：120x3 黑色，随标题横向滑入与渐显 -->
              <div
                class="mt-2 w-[120px] h-[3px] bg-black"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4',
                ]"
                style="transition-delay: 140ms"
              ></div>
              <p
                class="mt-3 text-sm md:text-base text-gray-700 leading-relaxed"
                :class="[
                  shouldAnimateContent
                    ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                    : 'transition-none',
                  idx === currentIndex && isContentEntering
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4',
                ]"
                style="transition-delay: 180ms"
              >
                {{ item.desc }}
              </p>
              <div class="mt-5">
                <router-link
                  v-if="item.ctaText"
                  :to="item.ctaLink || '#'"
                  class="inline-flex items-center px-20 py-3 rounded-md bg-black text-white hover:bg-miaowu-green hover:text-black transition-colors"
                  :class="[
                    shouldAnimateContent
                      ? 'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out'
                      : 'transition-none',
                    idx === currentIndex && isContentEntering
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4',
                  ]"
                  style="transition-delay: 260ms"
                >
                  {{ item.ctaText }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前后切换按钮 -->
      <button
        type="button"
        aria-label="上一张"
        class="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80"
        @click="prev"
      >
        <span class="sr-only">上一张</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="下一张"
        class="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80"
        @click="next"
      >
        <span class="sr-only">下一张</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M8.22 4.22a.75.75 0 011.06 0l7.25 7.25a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06L14.94 12 8.22 5.28a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- 指示器与数字索引：右下角并排显示；圆点指示器在左，数字索引在右；移动端隐藏 -->
      <div class="hidden lg:flex absolute bottom-1 right-1 items-center gap-4">
        <!-- 圆点指示器（黑/灰）：当前为黑点，其余为灰点 -->
        <div class="pointer-events-auto flex items-center justify-center gap-2">
          <button
            v-for="(item, i) in banners"
            :key="item.id + '-dot'"
            type="button"
            class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors duration-200 ring-1"
            :class="
              i + 1 === currentRealIndex
                ? 'bg-black ring-black/40'
                : 'bg-gray-400 hover:bg-gray-500 ring-black/10'
            "
            @click="goTo(i)"
            :aria-label="`切换到第 ${i + 1} 张`"
            :aria-current="i + 1 === currentRealIndex ? 'true' : 'false'"
          />
        </div>

        <!-- 数字索引指示器：显示 01/03；仅当前数字 正方体翻转（cube），总数静态 -->
        <div class="relative inline-block px-2 py-1">
          <div class="flex items-baseline gap-1 leading-none">
            <!-- 当前数字：正方体翻转切换（沿 Y 轴旋转） -->
            <div class="h-[44px] overflow-hidden">
              <span
                :key="formattedCurrent"
                class="block text-black text-[40px] tracking-widest select-none font-anton"
              >
                {{ formattedCurrent }}
              </span>
            </div>
            <!-- 总数：静态显示，不参与翻转动画 -->
            <span class="text-black text-[40px] tracking-widest select-none font-anton"
              >/{{ formattedTotal }}</span
            >
          </div>
          <div
            class="absolute -bottom-1 left-0 w-full h-3 bg-miaowu-green animate-underline-expand"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import banner1B2x from '@/assets/img/banner/banner1-b@2x.png'
import banner1P2x from '@/assets/img/banner/banner1-p@2x.png'
import banner1Pc2x from '@/assets/img/banner/banner1-pc@2x.png'
import banner2B2x from '@/assets/img/banner/banner2-b@2x.png'
import banner2P2x from '@/assets/img/banner/banner2-p@2x.png'
import banner2Pc2x from '@/assets/img/banner/banner2-pc@2x.png'
import banner3B2x from '@/assets/img/banner/banner3-b@2x.png'
import banner3P2x from '@/assets/img/banner/banner3-p@2x.png'
import banner3Pc2x from '@/assets/img/banner/banner3-pc@2x.png'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

// 轮播项结构
interface BannerItem {
  id: number
  imageBase: string // 不包含后缀的图片基名，如：banner1
  title: string
  desc: string
  ctaText?: string
  ctaLink?: string
}

// 模拟数据：请确保有如下命名的图片存在于 assets/img/banner/
// - banner1-b@2x.png, banner1-p@2x.png, banner1-pc@2x.png
// - banner2-b@2x.png, banner2-p@2x.png, banner2-pc@2x.png
// - banner3-b@2x.png, banner3-p@2x.png, banner3-pc@2x.png
const banners = ref<BannerItem[]>([
  {
    id: 1,
    imageBase: 'banner1',
    title: '每一次推荐，都值得信任',
    desc: '喵呜AI，不止是工具，是懂用户需求的顾问，是懂你想法的伙伴。在这里每一次链接，都源于理解，成于信任。',
    ctaText: '了解我们',
    ctaLink: '/about/company',
  },
  {
    id: 2,
    imageBase: 'banner2',
    title: '成为AI顾问，即刻出发',
    desc: '一个人，也可以是一支团队。喵呜AI让个体价值被放大，让专业被看见。新电商，新战场。',
    ctaText: '下载App',
    ctaLink: 'products/app',
  },
  {
    id: 3,
    imageBase: 'banner3',
    title: '好商品就是好答案',
    desc: '入驻喵呜AI，让你的商品走进千万用户的生活。我们不只帮你卖货，让每一单都是用户笃定的选择。优质供应商火热招募中。',
    ctaText: '加入我们',
    ctaLink: '/cooperation/suppliers',
  },
])

// 屏幕宽度监听（用于图片后缀选择）
const screenWidth = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)
const screenHeight = ref<number>(typeof window !== 'undefined' ? window.innerHeight : 768)
const handleResize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
  startAutoPlay()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  stopAutoPlay()
})

// 根据断点选择图片后缀
const imgSuffix = computed<'b' | 'p' | 'pc'>(() => {
  if (screenWidth.value >= 1920) return 'pc' // 3xl
  if (screenWidth.value >= 1024) return 'p' // lg ~ 2xl
  return 'b' // < lg
})

// 图片映射（本地模块化导入）
const bannerImages: Record<string, { b: string; p: string; pc: string }> = {
  banner1: {
    b: banner1B2x,
    p: banner1P2x,
    pc: banner1Pc2x,
  },
  banner2: {
    b: banner2B2x,
    p: banner2P2x,
    pc: banner2Pc2x,
  },
  banner3: {
    b: banner3B2x,
    p: banner3P2x,
    pc: banner3Pc2x,
  },
}

// 根据断点返回对应的已导入图片地址
function getImageSrc(item: BannerItem): string {
  const map = bannerImages[item.imageBase]
  return map ? map[imgSuffix.value] : ''
}

// 轮播逻辑（无缝无限）：首尾克隆
const slidesWithClones = computed(() => {
  const arr = banners.value
  if (arr.length === 0) return []
  const first = arr[0]
  const last = arr[arr.length - 1]
  return [last, ...arr, first]
})

// 当前索引从 1 开始（指向首个真实项）
const currentIndex = ref<number>(1)
const isTransitionEnabled = ref(true)
// 防抖：动画进行中时忽略快速点击，避免索引越界
const isAnimating = ref(false)
// 文本内容入场控制：切换过程中不入场，过渡结束后才进入
const isContentEntering = ref(true)
const shouldAnimateContent = computed(() => isContentEntering.value)

// 真实总数与真实索引（忽略克隆）
const total = computed(() => banners.value.length)
const currentRealIndex = computed(() => {
  const totalSlides = slidesWithClones.value.length
  if (totalSlides === 0) return 0
  if (currentIndex.value === 0) return total.value // 指向头部克隆（最后一张）
  if (currentIndex.value === totalSlides - 1) return 1 // 指向尾部克隆（第一张）
  return currentIndex.value
})

function next() {
  if (isAnimating.value) return
  isTransitionEnabled.value = true
  // 切换过程中先关闭内容入场
  isContentEntering.value = false
  currentIndex.value += 1
  // 索引边界保护（含克隆项）
  const maxIndex = slidesWithClones.value.length - 1
  if (currentIndex.value > maxIndex) currentIndex.value = maxIndex
  isAnimating.value = true
}

function prev() {
  if (isAnimating.value) return
  isTransitionEnabled.value = true
  // 切换过程中先关闭内容入场
  isContentEntering.value = false
  currentIndex.value -= 1
  // 索引边界保护（含克隆项）
  if (currentIndex.value < 0) currentIndex.value = 0
  isAnimating.value = true
}

function goTo(i: number) {
  if (isAnimating.value) return
  isTransitionEnabled.value = true
  // 切换过程中先关闭内容入场
  isContentEntering.value = false
  currentIndex.value = i + 1 // 映射到真实索引（克隆后）
  // 索引边界保护（含克隆项）
  const maxIndex = slidesWithClones.value.length - 1
  if (currentIndex.value < 0) currentIndex.value = 0
  if (currentIndex.value > maxIndex) currentIndex.value = maxIndex
  isAnimating.value = true
}

function onTransitionEnd() {
  const totalSlides = slidesWithClones.value.length
  if (totalSlides <= 2) return
  // 到达尾部克隆（从最后一张前进到首克隆），重置到首真实项
  if (currentIndex.value === totalSlides - 1) {
    isTransitionEnabled.value = false
    currentIndex.value = 1
    nextTick(() => {
      isTransitionEnabled.value = true
      // 重置完成后再触发内容入场
      isContentEntering.value = true
    })
    isAnimating.value = false
    return
  }
  // 到达头部克隆（从第一张后退到尾克隆），重置到尾真实项
  if (currentIndex.value === 0) {
    isTransitionEnabled.value = false
    currentIndex.value = totalSlides - 2
    nextTick(() => {
      isTransitionEnabled.value = true
      // 重置完成后再触发内容入场
      isContentEntering.value = true
    })
    isAnimating.value = false
    return
  }
  // 普通切换完成：允许内容入场
  isContentEntering.value = true
  isAnimating.value = false
}

// 自动播放控制
let timer: number | null = null
const intervalMs = 5000

function startAutoPlay() {
  if (timer != null) return
  timer = window.setInterval(() => {
    next()
  }, intervalMs)
}

function stopAutoPlay() {
  if (timer != null) {
    clearInterval(timer)
    timer = null
  }
}

// 图片容器尺寸样式（桌面端）
const desktopImageStyle = computed(() => {
  const w = screenWidth.value
  // PC 图片不缩小：固定尺寸
  // >= 1920px：固定为 1180 x 360
  if (w >= 1920) {
    return { width: '1180px', height: '360px' }
  }
  // 1024px ~ 1919px：固定为 805 x 360
  if (w >= 1024) {
    return { width: '805px', height: '360px' }
  }
  // 其余情况交由移动端样式处理
  return {}
})

// 图片容器尺寸样式（移动端）
const mobileImageStyle = computed(() => {
  return {
    width: '100%',
    aspectRatio: '335 / 150',
    minHeight: '150px',
  } as any
})

// 移动端滑动手势支持
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchDeltaX = ref(0)
const swiping = ref(false)
const touchThreshold = 50

function onTouchStart(e: TouchEvent) {
  if (!e.touches || e.touches.length === 0) return
  stopAutoPlay()
  const t = e.touches[0]
  touchStartX.value = t.clientX
  touchStartY.value = t.clientY
  touchDeltaX.value = 0
  swiping.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!swiping.value || !e.touches || e.touches.length === 0) return
  const t = e.touches[0]
  const dx = t.clientX - touchStartX.value
  const dy = t.clientY - touchStartY.value
  // 如果竖向滑动更明显则忽略，避免影响页面滚动
  if (Math.abs(dy) > Math.abs(dx)) return
  touchDeltaX.value = dx
}

function onTouchEnd() {
  if (!swiping.value) {
    startAutoPlay()
    return
  }
  const dx = touchDeltaX.value
  if (Math.abs(dx) > touchThreshold) {
    if (dx < 0) next()
    else prev()
  }
  swiping.value = false
  touchDeltaX.value = 0
  startAutoPlay()
}

// 数字索引格式化
const formattedCurrent = computed(() => String(currentRealIndex.value).padStart(2, '0'))
const formattedTotal = computed(() => String(total.value).padStart(2, '0'))
</script>

<style scoped>
/* 数字索引切换过渡 */
.counter-fade-enter-active,
.counter-fade-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.counter-fade-enter-from,
.counter-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* 数字索引滚动切换（向上滚动） */
.counter-roll-enter-active,
.counter-roll-leave-active {
  transition:
    transform 250ms ease,
    opacity 250ms ease;
}
.counter-roll-enter-from {
  transform: translateY(100%);
  opacity: 0.6;
}
.counter-roll-leave-to {
  transform: translateY(-100%);
  opacity: 0.6;
}

/* 数字索引 3D 翻转切换 */
/* 容器透视（用于正方体翻转） */
.cube-persp {
  perspective: 900px;
}
/* 正方体翻转：仅当前数字，沿 Y 轴旋转，带厚度感 */
.cube-face {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.cube-3d-enter-active,
.cube-3d-leave-active {
  transition:
    transform 320ms ease,
    opacity 320ms ease;
}
.cube-3d-enter-from {
  transform: rotateY(90deg) translateZ(22px);
  opacity: 0;
  transform-origin: center;
}
.cube-3d-leave-to {
  transform: rotateY(-90deg) translateZ(22px);
  opacity: 0;
  transform-origin: center;
}

/* 其他样式主要使用 Tailwind 实现 */
</style>
