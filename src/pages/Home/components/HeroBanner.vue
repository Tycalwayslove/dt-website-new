<template>
  <section class="relative overflow-hidden bg-gray-50">
    <!-- 轮播容器 -->
    <div class="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
      <!-- 轮播项 -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-all duration-1000 ease-out"
        :class="{
          'opacity-100 z-10': currentSlide === index,
          'opacity-0 z-0': currentSlide !== index,
        }"
      >
        <!-- PC端布局 -->
        <div class="hidden lg:flex h-full">
          <!-- 图片区 (60%) -->
          <div class="w-3/5 relative overflow-hidden">
            <div
              class="absolute inset-0 transition-all duration-1200 ease-out"
              :class="{
                'translate-y-0 opacity-100': currentSlide === index,
                'translate-y-12 opacity-0': currentSlide !== index,
              }"
            >
              <div class="parallax-container relative w-full h-full">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="parallax-image w-full h-full object-cover transition-transform duration-1000 ease-out"
                  :class="{
                    'scale-105': currentSlide === index,
                    'scale-100': currentSlide !== index,
                  }"
                />
                <!-- 图片遮罩层 -->
                <div class="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>

          <!-- 文字区 (40%) -->
          <div class="w-2/5 bg-white flex items-center justify-center p-8 md:p-10 lg:p-12">
            <div
              class="max-w-md space-y-6 md:space-y-8 transition-all duration-1200 ease-out"
              :class="{
                'translate-y-0 opacity-100': currentSlide === index,
                'translate-y-12 opacity-0': currentSlide !== index,
              }"
            >
              <h1
                class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '200ms' : '0ms' }"
              >
                {{ slide.title }}
              </h1>
              <p
                class="text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '400ms' : '0ms' }"
              >
                {{ slide.content }}
              </p>
              <button
                class="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base lg:text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg transform hover:scale-105"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '600ms' : '0ms' }"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>

        <!-- 移动端布局 -->
        <div class="lg:hidden h-full flex flex-col">
          <!-- 图片区 -->
          <div class="flex-1 relative overflow-hidden">
            <div
              class="absolute inset-0 transition-all duration-1200 ease-out"
              :class="{
                'translate-y-0 opacity-100': currentSlide === index,
                'translate-y-12 opacity-0': currentSlide !== index,
              }"
            >
              <div class="parallax-container relative w-full h-full">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="parallax-image w-full h-full object-cover transition-transform duration-1000 ease-out"
                  :class="{
                    'scale-105': currentSlide === index,
                    'scale-100': currentSlide !== index,
                  }"
                />
                <!-- 图片遮罩层 -->
                <div class="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
          </div>

          <!-- 文字区 -->
          <div class="bg-white p-5 sm:p-6 flex-1 flex items-center justify-center">
            <div
              class="text-center space-y-3 sm:space-y-4 transition-all duration-1200 ease-out"
              :class="{
                'translate-y-0 opacity-100': currentSlide === index,
                'translate-y-12 opacity-0': currentSlide !== index,
              }"
            >
              <h1
                class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '200ms' : '0ms' }"
              >
                {{ slide.title }}
              </h1>
              <p
                class="text-xs sm:text-sm text-gray-600 leading-relaxed transition-all duration-1000 ease-out"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '400ms' : '0ms' }"
              >
                {{ slide.content }}
              </p>
              <button
                class="bg-gray-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all duration-300 w-full transform hover:scale-105"
                :class="{
                  'translate-y-0 opacity-100': currentSlide === index,
                  'translate-y-8 opacity-0': currentSlide !== index,
                }"
                :style="{ transitionDelay: currentSlide === index ? '600ms' : '0ms' }"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播指示器 -->
    <div
      class="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
    >
      <button
        v-for="(slide, index) in slides"
        :key="`indicator-${index}`"
        class="group"
        :aria-label="`切换到第 ${index + 1} 张`"
        @click="goToSlide(index)"
      >
        <div
          class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
          :class="
            currentSlide === index
              ? 'bg-gray-900 w-6 sm:w-8'
              : 'bg-white/70 hover:bg-white hover:w-3 sm:hover:w-4'
          "
        ></div>
      </button>
    </div>

    <!-- 轮播控制按钮 -->
    <button
      class="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-200 md:left-6 z-20 hover:scale-110 shadow-lg"
      aria-label="上一张"
      @click="prevSlide"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <button
      class="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-200 md:right-6 z-20 hover:scale-110 shadow-lg"
      aria-label="下一张"
      @click="nextSlide"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const currentSlide = ref(0)
let autoplayTimer: number | null = null

const slides = [
  {
    title: '创新科技引领未来',
    content:
      '我们致力于通过最前沿的技术创新，为用户提供卓越的产品体验。从人工智能到大数据分析，我们不断探索科技的可能性，让生活变得更加智能和便捷。',
    image: '/src/assets/img/here-01.jpg',
  },
  {
    title: '专业团队值得信赖',
    content:
      '拥有多年行业经验的专业团队，我们深谙用户需求，能够提供最优质的解决方案。每一个细节都经过精心打磨，确保产品品质达到最高标准。',
    image: '/src/assets/img/here-02.jpg',
  },
  {
    title: '持续创新永不止步',
    content:
      '在快速变化的市场环境中，我们始终保持敏锐的洞察力和创新精神。通过持续的技术升级和服务优化，为客户创造更大的价值。',
    image: '/src/assets/img/here-03.jpg',
  },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  // 触发视差效果重置
  nextTick(() => {
    resetParallaxEffects()
  })
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
  // 触发视差效果重置
  nextTick(() => {
    resetParallaxEffects()
  })
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  // 用户手动切换后重置自动播放
  stopAutoplay()
  startAutoplay()
  // 触发视差效果重置
  nextTick(() => {
    resetParallaxEffects()
  })
}

const startAutoplay = () => {
  stopAutoplay() // 确保不会有多个定时器
  autoplayTimer = window.setInterval(nextSlide, 6000) // 6秒自动切换，给动画更多时间
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const pauseAutoplay = () => {
  stopAutoplay()
}

const resumeAutoplay = () => {
  startAutoplay()
}

// 视差效果相关函数
const handleMouseMove = (event: Event) => {
  const mouseEvent = event as MouseEvent
  const parallaxImages = document.querySelectorAll('.parallax-image') as NodeListOf<HTMLElement>
  const rect = (mouseEvent.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (mouseEvent.clientX - rect.left) / rect.width
  const y = (mouseEvent.clientY - rect.top) / rect.height

  parallaxImages.forEach((img) => {
    const speed = 0.1
    const xOffset = (x - 0.5) * speed * 100
    const yOffset = (y - 0.5) * speed * 100
    img.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.05)`
  })
}

const handleScroll = () => {
  const parallaxImages = document.querySelectorAll('.parallax-image') as NodeListOf<HTMLElement>
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  parallaxImages.forEach((img) => {
    img.style.transform = `translateY(${rate}px) scale(1.05)`
  })
}

const resetParallaxEffects = () => {
  const parallaxImages = document.querySelectorAll('.parallax-image') as NodeListOf<HTMLElement>
  parallaxImages.forEach((img) => {
    img.style.transform = 'translateY(0px) scale(1.05)'
  })
}

onMounted(() => {
  startAutoplay()
  // 添加鼠标移动视差效果
  const carouselContainer = document.querySelector('.relative.overflow-hidden')
  if (carouselContainer) {
    carouselContainer.addEventListener('mousemove', handleMouseMove)
  }
  // 添加滚动视差效果
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  stopAutoplay()
  // 清理事件监听器
  const carouselContainer = document.querySelector('.relative.overflow-hidden')
  if (carouselContainer) {
    carouselContainer.removeEventListener('mousemove', handleMouseMove)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 图片进入动画 */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1.05);
  }
}

/* 文字进入动画 */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 视差容器样式 */
.parallax-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.parallax-image {
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* 平滑过渡效果 */
.slide-enter-active {
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-leave-active {
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 确保图片和文字在不同时间进入 */
.image-animate {
  animation: slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.text-animate {
  animation: slideInFromBottom 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

/* 悬停效果 */
button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* 响应式优化 */
@media (max-width: 1023px) {
  .text-animate {
    animation-delay: 0.2s;
  }

  .parallax-image {
    transform: scale(1.02) !important;
  }
}

/* 性能优化 */
.parallax-image {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* 轮播指示器动画 */
.absolute.bottom-6 button div {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 控制按钮动画 */
.absolute.left-4 button,
.absolute.right-4 button {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.absolute.left-4 button:hover,
.absolute.right-4 button:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
