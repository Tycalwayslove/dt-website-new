<template>
  <div class="bg-[#393A52FF] pt-20 lg:pt-30 pb-15 lg:pb-30 w-full">
    <h2 class="text-[28px] lg:text-[56px] font-bold text-center text-white">
      喵呜严选品牌合作伙伴
    </h2>
    <div
      class="w-full max-w-[1920px] mx-auto"
      :style="{
        height: containerHeight + 'px',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '40px',
      }"
    >
      <LogoLoop
        :logos="techLogos"
        :speed="20"
        direction="left"
        :logoHeight="logoHeight"
        :gap="gap"
        :pauseOnHover="true"
        :scaleOnHover="true"
        :fadeOut="true"
        fadeOutColor="#393A52FF"
        ariaLabel="miaowu partners"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoLoop from '@/components/LogoLoop.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const techLogos = [
  { src: '/src/assets/img/partner-01.png', alt: 'Logo 1' },
  { src: '/src/assets/img/partner-02.png', alt: 'Logo 2' },
  { src: '/src/assets/img/partner-03.png', alt: 'Logo 3' },
  { src: '/src/assets/img/partner-04.png', alt: 'Logo 4' },
]

// Responsive values for LogoLoop props
const logoHeight = ref(30)
const gap = ref(40)
const containerHeight = ref(110)

const updateSizes = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  const isLg = window.matchMedia('(min-width: 1024px)').matches
  logoHeight.value = isLg ? 75 : 30
  gap.value = isLg ? 100 : 40
  containerHeight.value = isLg ? 150 : 110
}

onMounted(() => {
  updateSizes()
  window.addEventListener('resize', updateSizes)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSizes)
})
</script>

<style scoped>
/* 组件样式 */
</style>
