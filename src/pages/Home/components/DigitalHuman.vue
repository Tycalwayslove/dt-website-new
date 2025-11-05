<template>
  <section class="container py-10 md:py-16 lg:py-20">
    <!-- 标题 -->
    <h2
      v-fade-in-up="{ delay: 300 }"
      class="text-[28px] lg:text-[56px] text-center color-black mb-5 font-wendao"
    >
      喵呜AI顾问式电商
    </h2>
    <!-- 描述 -->
    <p
      v-fade-in-up="{ delay: 300 }"
      class="text-sm lg:text-base leading-relaxed text-center color-black px-[10px] lg:px-[230px]"
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
            v-fade-in-up="{ delay: 500 }"
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
                  class="text-sm sm:text-sm md:text-base lg:text-4xl font-bold text-black mb-1 sm:mb-1 lg:mb-3 truncate"
                >
                  {{ card.name }}
                </h3>
                <p
                  class="text-xs sm:text-xs md:text-sm lg:text-xl text-gray-600 leading-relaxed line-clamp-2"
                >
                  {{ card.description }}
                </p>
              </div>
              <!-- 图片（卡片悬停：轻微3D+图片放大与聚焦） -->
              <div class="w-full aspect-[1/1] overflow-hidden mt-3 lg:mt-8 rounded-xl">
                <img
                  :src="card.avatar"
                  :alt="card.name"
                  class="w-full h-full object-cover transition duration-300 ease-out transform group-hover:scale-110 filter group-hover:brightness-105 group-hover:saturate-105"
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
    name: '张顾问',
    description: '专业电商顾问，10年行业经验，擅长数据分析与运营策略',
    avatar: '/src/assets/img/human-01.png',
  },
  {
    id: 2,
    name: '李老师',
    description: 'AI技术专家，专注于数字人定制服务',
    avatar: '/src/assets/img/human-02.png',
  },
  {
    id: 3,
    name: '王经理',
    description: '品牌运营顾问，帮助打造个人IP影响力',
    avatar: '/src/assets/img/human-03.png',
  },
  {
    id: 4,
    name: '刘顾问',
    description: '内容创作专家，擅长文案策划与内容营销',
    avatar: '/src/assets/img/human-04.png',
  },
  {
    id: 5,
    name: '陈老师',
    description: '数据分析师，提供专业的数据洞察服务',
    avatar: '/src/assets/img/human-05.png',
  },
  {
    id: 6,
    name: '赵经理',
    description: '用户体验专家，优化用户旅程设计',
    avatar: '/src/assets/img/human-06.png',
  },
  {
    id: 7,
    name: '孙顾问',
    description: '市场策略专家，制定精准的市场定位',
    avatar: '/src/assets/img/human-07.png',
  },
  {
    id: 8,
    name: '周老师',
    description: '品牌设计顾问，打造独特的视觉形象',
    avatar: '/src/assets/img/human-08.png',
  },
  {
    id: 9,
    name: '吴经理',
    description: '社媒运营专家，擅长多平台内容分发',
    avatar: '/src/assets/img/human-01.png',
  },
  {
    id: 10,
    name: '郑顾问',
    description: '电商咨询顾问，提供一站式解决方案',
    avatar: '/src/assets/img/human-02.png',
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
