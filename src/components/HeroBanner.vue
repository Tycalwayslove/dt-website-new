<template>
  <section class="relative overflow-hidden bg-gray-100">
    <!-- 轮播容器 -->
    <div class="relative h-96 lg:h-96">
      <!-- 轮播项 -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-all duration-700 ease-in-out"
        :class="{
          'opacity-100 translate-x-0 z-10': currentSlide === index,
          'opacity-0 translate-x-full': currentSlide < index,
          'opacity-0 -translate-x-full': currentSlide > index,
        }"
      >
        <!-- PC端布局 -->
        <div class="hidden lg:flex h-96">
          <!-- 视觉区 (70%) -->
          <div
            class="w-7/12 bg-gradient-to-br from-orange-300 to-orange-500 relative overflow-hidden"
          >
            <!-- 科技感图形 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative w-80 h-80">
                <!-- 机器人图形 -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <div
                      class="w-24 h-24 bg-miaowu-green rounded-full flex items-center justify-center"
                    >
                      <span class="text-white text-2xl font-bold">AI</span>
                    </div>
                  </div>
                </div>
                <!-- 装饰元素 -->
                <div
                  class="absolute top-8 left-8 w-4 h-4 bg-miaowu-green rounded-full animate-pulse"
                ></div>
                <div
                  class="absolute top-16 right-12 w-3 h-3 bg-white rounded-full animate-pulse"
                ></div>
                <div
                  class="absolute bottom-12 left-16 w-2 h-2 bg-miaowu-green rounded-full animate-pulse"
                ></div>
                <!-- 社交图标 -->
                <div class="absolute top-4 right-4 flex space-x-2">
                  <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span class="text-xs">T</span>
                  </div>
                  <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span class="text-xs">D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 文字区 (30%) -->
          <div
            class="w-5/12 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-8"
          >
            <div class="text-center space-y-6 animate-fade-in">
              <h1 class="text-4xl font-bold text-black leading-tight">
                {{ slide.title }}
              </h1>
              <p class="text-lg text-black/80 leading-relaxed">
                {{ slide.subtitle }}
              </p>
              <button
                class="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              >
                了解详情
              </button>
            </div>
          </div>
        </div>

        <!-- 移动端布局 -->
        <div class="lg:hidden h-96 flex flex-col">
          <!-- 文字区 -->
          <div
            class="bg-gradient-to-br from-orange-300 to-orange-500 p-6 flex-1 flex items-center justify-center"
          >
            <div class="text-center space-y-4 animate-fade-in">
              <h1 class="text-2xl font-bold text-black leading-tight">
                {{ slide.title }}
              </h1>
              <p class="text-sm text-black/80 leading-relaxed">
                {{ slide.subtitle }}
              </p>
              <button
                class="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full"
              >
                了解详情
              </button>
            </div>
          </div>

          <!-- 视觉区 -->
          <div
            class="bg-gradient-to-br from-orange-400 to-orange-600 flex-1 flex items-center justify-center relative"
          >
            <div class="relative w-48 h-48">
              <!-- 简化的机器人图形 -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <div
                    class="w-16 h-16 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-lg font-bold">AI</span>
                  </div>
                </div>
              </div>
              <!-- 装饰元素 -->
              <div
                class="absolute top-4 left-4 w-3 h-3 bg-miaowu-green rounded-full animate-pulse"
              ></div>
              <div class="absolute top-8 right-6 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播指示器（小圆点） -->
    <div class="absolute bottom-6 right-6 flex space-x-2 z-20">
      <button
        v-for="(slide, index) in slides"
        :key="`indicator-${index}`"
        class="group"
        :aria-label="`切换到第 ${index + 1} 张`"
        @click="goToSlide(index)"
      >
        <div
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-black w-8' : 'bg-white/70 hover:bg-white hover:w-3'"
        ></div>
      </button>
    </div>

    <!-- 轮播控制按钮 -->
    <button
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 lg:left-6 z-20 hover:scale-110"
      aria-label="上一张"
      @click="prevSlide"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <button
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 lg:right-6 z-20 hover:scale-110"
      aria-label="下一张"
      @click="nextSlide"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { onMounted, onUnmounted, ref } from 'vue'

const currentSlide = ref(0)
let autoplayTimer: number | null = null

const slides = [
  {
    title: '喵呜AI顾问式电商',
    subtitle: '电商从此不再是 我找东西，而是 有人懂我… 让小买卖变成大生意',
  },
  {
    title: '智能推荐系统',
    subtitle: '基于AI的个性化推荐，让每一次购物都更精准、更贴心',
  },
  {
    title: '专业顾问服务',
    subtitle: '24/7在线顾问，为您的业务提供专业指导和解决方案',
  },
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  // 用户手动切换后重置自动播放
  stopAutoplay()
  startAutoplay()
}

const startAutoplay = () => {
  stopAutoplay() // 确保不会有多个定时器
  autoplayTimer = window.setInterval(nextSlide, 5000) // 5秒自动切换
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

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>
