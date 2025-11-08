<template>
  <div class="bg-black py-20 w-full">
    <h2 class="text-[28px] lg:text-[56px] font-wendao text-center text-white py-10">
      喵呜AI合作伙伴
    </h2>
    <div class="w-full max-w-[1920px] mx-auto px-6 lg:px-20 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 justify-items-center">
        <div
          v-for="(logo, idx) in techLogos"
          :key="idx"
          class="flex items-center justify-center w-full"
          :style="{
            height: cellHeight + 'px',
          }"
        >
          <img
            :src="logo.src"
            :alt="logo.alt"
            :style="{
              width: computedWidth(logo) + 'px',
              maxHeight: cellHeight + 'px',
            }"
            class="block object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { img } from '@/utils/assets.js'
const partner01 = img('partner-01.png')
const partner02 = img('partner-02.png')
const partner03 = img('partner-03.png')
const partner04 = img('partner-04.png')
import { computed, onMounted, onUnmounted, ref } from 'vue'

// 添加各自宽高，方便后续调整与适配
const techLogos = [
  { src: partner01, alt: '阿里云', width: 268, height: 60 },
  { src: partner02, alt: '腾讯云', width: 244, height: 75 },
  { src: partner03, alt: '字节跳动', width: 293, height: 75 },
  { src: partner04, alt: 'MINIMAX', width: 282, height: 90 },
]

// 根据屏幕尺寸缩放 logo 展示尺寸（移动端缩小，PC 端原始）
const scale = ref(0.6)
const isLg = ref(false)

const updateScale = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  const lg = window.matchMedia('(min-width: 1024px)').matches
  isLg.value = lg
  scale.value = lg ? 1 : 0.3
}

const computedWidth = (logo: { width: number }) => Math.round(logo.width * scale.value)
const computedHeight = (logo: { height: number }) => Math.round(logo.height * scale.value)

// 单元格统一高度，确保不同尺寸图片垂直居中显示
const cellHeight = computed(() => {
  const heights = techLogos.map((l) => computedHeight(l))
  return heights.length ? Math.max(...heights) : 0
})

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
/* 组件样式 */
</style>
