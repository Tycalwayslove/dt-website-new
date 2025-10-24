<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-500 ease-in-out"
    leave-from-class="opacity-100 translate-y-0 max-h-20"
    leave-to-class="opacity-0 -translate-y-full max-h-0"
  >
    <div
      v-if="!isClosed"
      class="w-full bg-gradient-to-r from-orange-100 to-orange-200 relative overflow-hidden h-11 lg:h-[66px]"
    >
      <!-- 背景图案 -->
      <div
        class="absolute bottom-0 left-0 w-full h-6 lg:h-8 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 opacity-60"
      >
        <div class="w-full h-full bg-repeat-x"></div>
      </div>

      <!-- 内容区域 -->
      <div class="relative z-10 h-full flex items-center justify-center">
        <!-- 文字内容 - 垂直水平居中 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-orange-800 font-medium text-sm lg:text-base">品牌招商广告</span>
        </div>

        <!-- 右侧按钮组 - 绝对定位 -->
        <div
          class="absolute right-4 lg:right-[10%] top-1/2 -translate-y-1/2 flex items-center space-x-2"
        >
          <!-- 了解详情按钮 -->
          <button
            class="bg-white text-orange-800 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium hover:bg-orange-50 transition-colors duration-200 shadow-sm"
          >
            了解详情
          </button>

          <!-- 关闭按钮 -->
          <button
            class="p-1.5 rounded-full hover:bg-orange-300 transition-colors duration-200 text-orange-800 hover:rotate-90 transform"
            title="关闭广告"
            @click="handleClose"
          >
            <svg
              class="w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始状态为未关闭，每次刷新都会显示
const isClosed = ref(false)

// 关闭广告
const handleClose = () => {
  isClosed.value = true
  // 只在当前会话中关闭，刷新后会重新显示
}
</script>

<style scoped>
/* 组件样式 */
</style>
