<template>
  <section class="container py-10 md:py-16 lg:py-20">
    <!-- 标题 -->
    <h2
      v-fade-in-up="{ delay: 300 }"
      class="text-[28px] lg:text-[56px] text-center color-black mb-5 font-wendao text-black"
    >
      喵呜AI顾问式电商
    </h2>
    <!-- 描述 -->
    <p
      v-fade-in-up="{ delay: 300 }"
      class="text-sm lg:text-base leading-relaxed text-center color-black px-[10px] lg:px-[230px] text-black"
    >
      "我们不是在找推广者，而是在共创新一代顾问职业。"未来每一个数字人，都是一个微型品牌。你不只是卖货，而是在塑造你的知识影响力。喵呜A的定制顾问数字人不仅仅是你24在线服务用户的工具，而是一种"新型身份"--一个被AI放大的、可复制的"顾问人格体"。每个数字人背后都是一个真实的内容创造者、知识服务者或AI运营者。
    </p>
    <!-- 瀑布流卡片展示 -->
    <div class="mt-10 lg:mt-16">
      <div ref="waterfallContainer" class="waterfall-container">
        <div
          v-for="column in columns"
          :key="column.index"
          class="waterfall-column"
          :style="{
            marginTop: `${column.offset}px`,
          }"
        >
          <div
            v-fade-in-up="{ delay: 300 }"
            v-for="(card, index) in column.cards"
            :key="card.id"
            :class="['waterfall-card', { 'last-card': index === column.cards.length - 1 }]"
          >
            <div
              class="group card-tilt border border-black rounded-lg lg:rounded-2xl p-3 lg:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <!-- 内容 -->
              <div class="pt-1">
                <h3
                  class="text-sm sm:text-sm md:text-base lg:text-2xl font-bold text-black mb-1 sm:mb-1 lg:mb-3 truncate"
                >
                  {{ card.name }}
                </h3>
                <p
                  class="text-base sm:text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2"
                >
                  {{ card.description }}
                </p>
              </div>
              <!-- 图片（卡片悬停：轻微3D+图片放大与聚焦） -->
              <div class="w-full overflow-hidden mt-3 lg:mt-8 rounded-xl">
                <img
                  :src="card.avatar"
                  :alt="card.name"
                  class="w-full h-auto object-contain transition duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { img } from '@/utils/assets.js'
const human01 = img('human-01.png')
const human02 = img('human-02.png')
const human03 = img('human-03.png')
const human04 = img('human-04.png')
const human05 = img('human-05.png')
const human06 = img('human-06.png')
const human07 = img('human-07.png')
const human08 = img('human-08.png')
import { onMounted, onUnmounted, ref } from 'vue'

// 卡片数据接口
interface Card {
  id: number
  name: string
  description: string
  avatar: string
}

// 列数据类型
interface Column {
  index: number
  cards: Card[]
  offset: number
}

// Mock 数据
const cards = ref<Card[]>([
  {
    id: 1,
    name: '生活好物优选官',
    description: '帮你挑选刚需好物，低价也能实用又省心零食饮料达人。',
    avatar: human01,
  },
  {
    id: 2,
    name: '零食饮料达人',
    description: '挖遍美味宝藏，精准戳中你的舌尖偏好。',
    avatar: human02,
  },
  {
    id: 3,
    name: '酒水选购顾问',
    description: '适配场景预算口味，量身定制专属选酒方案。',
    avatar: human03,
  },
  {
    id: 4,
    name: '茗语 AI 助手',
    description: '聊茶文化教冲泡，做你身边的专属茶艺师。',
    avatar: human04,
  },
  {
    id: 5,
    name: '米面粮油选购顾问',
    description: '严选优质米面粮油，守护你的日常膳食健康。',
    avatar: human05,
  },
  {
    id: 6,
    name: '美妆护肤顾问',
    description: '懂你的肤质需求，定制温和有效的护肤方案',
    avatar: human06,
  },
  {
    id: 7,
    name: '生鲜水果',
    description: '懂品种知时令合偏好，严选当季鲜美水果。',
    avatar: human07,
  },
  {
    id: 8,
    name: '滋补保健顾问',
    description: '适配你的体质和生活习惯，帮你搞定科学进补方案',
    avatar: human08,
  },
])

const waterfallContainer = ref<HTMLElement | null>(null)
const columns = ref<Column[]>([])

// 计算列数
const getColumnCount = () => {
  if (typeof window === 'undefined') return 4

  const width = window.innerWidth
  if (width >= 1280) return 4 // xl及以上
  if (width >= 1024) return 3 // lg
  if (width >= 768) return 3 // md
  return 2 // xs, sm
}

// 分布卡片到列
const distributeCards = () => {
  const columnCount = getColumnCount()
  const newColumns: Column[] = []

  // 根据列的高度差，计算每列的偏移量
  // 第1列：0px，第2列：30px，第3列：0px，第4列：30px
  const offsets = [0, 30, 0, 30]

  // 初始化列
  for (let i = 0; i < columnCount; i++) {
    newColumns.push({
      index: i,
      cards: [],
      offset: offsets[i] || 0,
    })
  }

  // 将卡片分配到列中
  cards.value.forEach((card, index) => {
    const columnIndex = index % columnCount
    newColumns[columnIndex].cards.push(card)
  })
  // 不同宽度下控制每列最大卡片数：
  // >1024 (大于 lg) 限制为 2 张（最多 2 行）；
  // 768–1024 (md 区间) 限制为 3 张（最多 3 行、3 列）。
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024
  if (width > 1024) {
    for (let i = 0; i < newColumns.length; i++) {
      newColumns[i].cards = newColumns[i].cards.slice(0, 2)
    }
  } else if (width >= 768 && width < 1024) {
    for (let i = 0; i < newColumns.length; i++) {
      newColumns[i].cards = newColumns[i].cards.slice(0, 3)
    }
  }

  columns.value = newColumns
}

// 窗口resize处理
const handleResize = () => {
  distributeCards()
}

onMounted(() => {
  distributeCards()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.card-tilt {
  transition:
    transform 250ms ease,
    box-shadow 250ms ease;
  transform-style: preserve-3d;
  will-change: transform;
}
@media (min-width: 1024px) {
  .card-tilt:hover {
    transform: perspective(900px) rotateX(2deg) rotateY(-2deg) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}
.waterfall-container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  /* 当屏幕宽度超过 2xl(1536px) 时，瀑布流容器不再变宽并居中 */
  width: 100%;
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
}

.waterfall-column {
  flex: 1;
  min-width: 0;
}

.waterfall-card {
  margin-bottom: 1rem;
}

.waterfall-card.last-card {
  margin-bottom: 0;
}
</style>
