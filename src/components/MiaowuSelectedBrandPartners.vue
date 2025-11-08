<template>
  <div class="bg-[#393A52FF] py-20 w-full">
    <h2 class="text-[28px] lg:text-[56px] font-wendao text-center text-white py-10">
      喵呜严选品牌合作伙伴
    </h2>
    <div class="w-full max-w-[1920px] mx-auto px-6 lg:px-20 py-10 cursor-pointer">
      <div class="loop-container" ref="loopContainer">
        <div
          :class="['loop-track', { paused }]"
          :style="{
            height: cellHeight + 'px',
            '--duration': duration + 's',
          }"
        >
          <img
            :src="brandPartners"
            alt="brand partners"
            :style="{ height: cellHeight + 'px' }"
            class="block select-none"
            draggable="false"
            loading="lazy" />
          <img
            :src="brandPartners"
            alt="brand partners duplicate"
            :style="{ height: cellHeight + 'px' }"
            class="block select-none"
            draggable="false"
            loading="lazy" />
        </div>
        <div class="loop-fade-left" />
        <div class="loop-fade-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { img } from '@/utils/assets.js'
const brandPartners = img('brand-partners.png')

// 基准高度为 160px，移动端缩放，PC 端原始；间距参考 AI 合作伙伴组件
const baseHeight = 160
const scale = ref(0.6)
const isLg = ref(false)
const duration = ref(30)
const paused = ref(false)
const loopContainer = ref<HTMLElement | null>(null)

const updateResponsive = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  const lg = window.matchMedia('(min-width: 1024px)').matches
  isLg.value = lg
  scale.value = lg ? 1 : 0.6
  // 移动端适配：缩短滚动周期以更明显的滚动效果
  duration.value = lg ? 60 : 25
}

const cellHeight = computed(() => Math.round(baseHeight * scale.value))

onMounted(() => {
  updateResponsive()
  window.addEventListener('resize', updateResponsive)
  const el = loopContainer.value
  if (el) {
    const onEnter = () => (paused.value = true)
    const onLeave = () => (paused.value = false)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onEnter)
    el.addEventListener('pointerup', onLeave)
    el.addEventListener('pointercancel', onLeave)
    // store listeners on element for removal
    ;(el as any)._mw_pause_listeners = { onEnter, onLeave }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsive)
  const el = loopContainer.value as any
  if (el && el._mw_pause_listeners) {
    const { onEnter, onLeave } = el._mw_pause_listeners
    el.removeEventListener('pointerenter', onEnter)
    el.removeEventListener('pointerleave', onLeave)
    el.removeEventListener('pointerdown', onEnter)
    el.removeEventListener('pointerup', onLeave)
    el.removeEventListener('pointercancel', onLeave)
  }
})
</script>

<style scoped>
/* 循环滚动容器与轨道 */
.loop-container {
  position: relative;
  overflow: hidden;
}
.loop-track {
  display: flex;
  gap: 0;
  width: max-content;
  will-change: transform;
  /* iOS Safari 动画优化 */
  transform: translateZ(0);
  backface-visibility: hidden;
  animation: loop-scroll var(--duration, 30s) linear infinite;
}
.loop-track.paused {
  animation-play-state: paused;
}
/* 桌面端悬停可暂停，移动端不受 hover 影响 */
@media (hover: hover) {
  .loop-container:hover .loop-track {
    animation-play-state: paused;
  }
}
@keyframes loop-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* 左右渐隐，贴合背景色 */
.loop-fade-left,
.loop-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  pointer-events: none;
}
.loop-fade-left {
  left: 0;
  background: linear-gradient(90deg, #393a52ff 0%, rgba(57, 58, 82, 0) 100%);
}
.loop-fade-right {
  right: 0;
  background: linear-gradient(270deg, #393a52ff 0%, rgba(57, 58, 82, 0) 100%);
}
</style>
