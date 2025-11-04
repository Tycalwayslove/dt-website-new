<template>
  <div class="seller-showcase" ref="showcaseRef">
    <div
      class="track"
      :style="{ animationPlayState: paused ? 'paused' : 'running' }"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <div v-for="(src, idx) in loopImages" :key="idx" class="card" tabindex="0">
        <img :src="src" alt="卖手人物" class="card-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
// 使用静态导入，避免 import.meta 造成的编译诊断问题
import s1 from '@/assets/img/sellers/sellers-01.png'
import s2 from '@/assets/img/sellers/sellers-02.png'
import s3 from '@/assets/img/sellers/sellers-03.png'
import s4 from '@/assets/img/sellers/sellers-04.png'
import s5 from '@/assets/img/sellers/sellers-05.png'
import s6 from '@/assets/img/sellers/sellers-06.png'

const images = [s1, s2, s3, s4, s5, s6]
// 为实现无缝循环，重复一遍列表
const loopImages = computed(() => [...images, ...images])
const paused = ref(false)

// 使用 IntersectionObserver 按可见比例调整卡片透明度与缩放，实现无需蒙层的柔和过渡
const showcaseRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let rafId = 0
const updates = new Map<HTMLElement, number>()

onMounted(() => {
  const root = showcaseRef.value
  if (!root) return
  const cards = root.querySelectorAll('.card')
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        updates.set(el, entry.intersectionRatio)
      }
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updates.forEach((r, el) => {
            // 较窄范围可减少视觉抖动：靠边轻微缩放与透明度变化
            const scale = 0.985 + 0.015 * r // 0.985 → 1.0
            const opacity = 0.75 + 0.25 * r // 0.75 → 1.0
            el.style.setProperty('--scale', String(scale))
            el.style.opacity = String(opacity)
          })
          updates.clear()
          rafId = 0
        })
      }
    },
    {
      root,
      threshold: [0, 0.5, 1], // 降低阈值数量，减少频繁更新
    }
  )
  cards.forEach((el) => observer!.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  if (rafId) cancelAnimationFrame(rafId)
  updates.clear()
})
</script>

<style scoped>
.seller-showcase {
  width: 100%;
  overflow: hidden;
  padding: 40px 0; /* 为垂直错位预留上下空间，避免裁切 */
  position: relative; /* 用于两侧渐变蒙层定位 */
}

.track {
  display: flex;
  align-items: center;
  gap: 40px; /* 相邻卡片间距 40px */
  width: max-content; /* 让内容宽度自然撑开，便于平滑滚动 */
  animation: scroll-left 40s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
}

.card {
  --shift: 0px; /* 通过 CSS 变量管理上下位移，便于组合缩放 */
  --scale: 1;  /* 由观察器动态调整缩放值 */
  flex: 0 0 auto;
  /* 移动端自适应尺寸：根据屏宽缩小 */
  width: clamp(120px, 40vw, 200px);
  aspect-ratio: 338 / 430; /* 保持与 PC 相同的纵横比 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  background: #fff;
  transform: translateZ(0) translateY(var(--shift)) scale(var(--scale));
  transition: transform 300ms ease, opacity 300ms ease, box-shadow 300ms ease;
  opacity: 0.95;
  backface-visibility: hidden;
}

.card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

@keyframes scroll-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}


/* 垂直错位：相邻卡片上下位移，增强设计感 */
.card:nth-child(odd) {
  --shift: -40px; /* 向上移动 40px */
}
.card:nth-child(even) {
  --shift: 40px; /* 向下移动 40px */
}

/* 不使用蒙层，过渡由 IntersectionObserver 控制卡片透明度与缩放 */

/* 交互过渡：轻微缩放与透明度变化 */
.card:hover,
.card:focus-visible {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}
.card:active {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
}

/* PC端加大位移，移动端保持较小位移 */
@media (min-width: 1024px) {
  /* PC 固定尺寸 338x430 */
  .card {
    width: 338px;
    height: 430px;
  }
  .card-img {
    width: 100%;
    height: 100%;
  }
}
</style>