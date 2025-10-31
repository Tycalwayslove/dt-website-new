<template>
  <section class="container py-10 md:py-16 lg:py-20">
    <div class="mx-auto lg:pb-0">
      <!-- 公司信息列表 -->
      <div class="border rounded-2xl border-black">
        <div
          v-for="(company, index) in companyList"
          :key="index"
          :data-index="index"
          class="px-5 xs:px-5 max-lg:px-10 xl:px-20 relative"
          :class="{
            'bg-white': index % 2 === 0,
            'bg-black': index % 2 === 1,
            'rounded-b-2xl': index === companyList.length - 1,
            'rounded-t-2xl': index === 0,
            'custom-top-radius': index !== 0,
          }"
          :style="{
            zIndex: index,
            '--bg-color': index % 2 === 0 ? '#ffffff' : '#000000',
          }"
        >
          <!-- PC端布局：左侧信息，右侧图片 -->
          <div class="hidden lg:flex h-full">
            <!-- 左侧：公司信息 -->
            <div
              class="flex flex-shrink-1 flex-grow flex-col justify-center py-20 max-w-[calc(100%-560px)]"
            >
              <div class="space-y-3 lg:space-y-4 pr-20">
                <div class="relative overflow-hidden">
                  <h3
                    v-if="needsScroll[index]"
                    :class="[
                      'text-[56px] lg:text-[56px] font-bold transition-all duration-1000 ease-out whitespace-nowrap',
                      { 'animate-fade-in-up': isVisible[index] },
                      index % 2 === 0 ? 'text-black' : 'text-white',
                      'animate-scroll-text',
                    ]"
                    :style="{
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: '10s',
                      '--text-content': `'${company.title} '`,
                    }"
                    :ref="(el) => setTitleRef(el, index)"
                  >
                    {{ company.title }}&nbsp;&nbsp;{{ company.title }}
                  </h3>
                  <h3
                    v-else
                    :class="[
                      'text-[56px] lg:text-[56px] font-bold transition-all duration-1000 ease-out truncate',
                      { 'animate-fade-in-up': isVisible[index] },
                      index % 2 === 0 ? 'text-black' : 'text-white',
                    ]"
                    :style="{
                      animationDelay: `${index * 0.2}s`,
                    }"
                    :ref="(el) => setTitleRef(el, index)"
                  >
                    {{ company.title }}
                  </h3>
                </div>
                <p
                  :class="[
                    'text-xl lg:text-xl leading-relaxed transition-all duration-1000 ease-out',
                    { 'animate-fade-in-up': isVisible[index] },
                    index % 2 === 0 ? 'text-black' : 'text-white',
                  ]"
                  :style="{
                    animationDelay: `${index * 0.2 + 0.1}s`,
                  }"
                >
                  {{ company.desc }}
                </p>
                <p
                  :class="[
                    'text-base lg:text-base leading-relaxed transition-all duration-1000 ease-out',
                    { 'animate-fade-in-up': isVisible[index] },
                    index % 2 === 0 ? 'text-black' : 'text-white',
                  ]"
                  :style="{
                    animationDelay: `${index * 0.2 + 0.2}s`,
                  }"
                >
                  {{ company.content }}
                </p>
              </div>
            </div>

            <!-- 右侧：公司图片 -->
            <div class="flex-shrink-0 flex-grow-0 relative overflow-hidden py-20">
              <div
                class="w-[560px] h-[300px] transition-all duration-1200 ease-out"
                :class="{ 'animate-fade-in': isVisible[index] }"
                :style="{
                  animationDelay: `${index * 0.2 + 0.3}s`,
                }"
              >
                <img
                  :src="company.image"
                  :alt="company.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <!-- 移动端布局：上方图片，下方信息 -->
          <div
            class="lg:hidden flex flex-col"
            :class="{ 'bg-white': index % 2 === 0, 'bg-black': index % 2 === 1 }"
          >
            <!-- 上方：公司图片 -->
            <div
              class="w-full h-[168px] sm:h-[200px] md:h-64 relative overflow-hidden my-10 rounded-t-3xl"
            >
              <img :src="company.image" :alt="company.title" class="w-full h-full object-cover" />
            </div>

            <!-- 下方：公司信息 -->
            <div :class="index === companyList.length - 1 ? 'pb-10' : 'pb-14'">
              <h3
                :class="[
                  'text-[28px] xs:text-[28px] sm:text-3xl md:text-4xl font-bold',
                  index % 2 === 1 ? 'text-white' : 'text-black',
                ]"
              >
                {{ company.title }}
              </h3>
              <p
                :class="[
                  'text-lg xs:text-lg sm:text-xl md:text-2xl leading-relaxed py-5',
                  index % 2 === 1 ? 'text-gray-300' : 'text-black',
                ]"
              >
                {{ company.desc }}
              </p>
              <p
                :class="[
                  'text-sm xs:text-sm sm:text-base md:text-lg leading-relaxed',
                  index % 2 === 1 ? 'text-gray-400' : 'text-gray-700',
                ]"
              >
                {{ company.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 公司信息接口类型
interface CompanyInfo {
  title: string
  desc: string
  content: string
  image: string
}

// Mock 数据
const companyList = ref<CompanyInfo[]>([
  {
    title: '让喵呜AI成为可信赖的专业伙伴',
    desc: '#被理解｜高信任｜决策确定感',
    content:
      '喵呜AI 对 用户 的价值与意义，从“搜喵呜AI 对 用户 的价值与意义，从“搜喵呜AI 对 用户 的价值与意义，从“搜喵呜AI 对 用户 的价值与意义，从“搜喵呜AI 对 用户 的价值与意义，从“搜喵呜AI 对 用户 的价值与意义，从“搜',
    image: '/src/assets/img/here-01.jpg',
  },
  {
    title: '专业团队协作',
    desc: '汇聚行业精英，打造高效协作的专业团队',
    content:
      '团队成员来自不同领域，拥有丰富的项目经验。我们注重团队合作，倡导开放式沟通，让每个成员的才能得到充分发挥，共同推动项目成功。',
    image: '/src/assets/img/here-02.jpg',
  },
  {
    title: '持续发展理念',
    desc: '关注可持续发展和客户价值的长期创造',
    content:
      '我们相信可持续发展的力量。在追求商业成功的同时，我们积极承担社会责任，关注环境保护，致力于为社会发展贡献我们的力量。',
    image: '/src/assets/img/here-03.jpg',
  },
])

// 用于触发动画的可见性状态
const isVisible = ref<boolean[]>([])
const needsScroll = ref<boolean[]>([])
const titleRefs = ref<(HTMLElement | null)[]>([])

// 设置标题引用
const setTitleRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    titleRefs.value[index] = el
    checkIfNeedsScroll(el, index)
  }
}

// 检测是否需要滚动
const checkIfNeedsScroll = (element: HTMLElement, index: number) => {
  if (element.scrollWidth > element.offsetWidth) {
    needsScroll.value[index] = true
  }
}

// 观察元素进入视图
onMounted(() => {
  // 初始化可见性数组
  isVisible.value = new Array(companyList.value.length).fill(false)
  needsScroll.value = new Array(companyList.value.length).fill(false)

  // 使用 Intersection Observer 来触发动画
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          isVisible.value[index] = true
        }
      })
    },
    { threshold: 0.1 }
  )

  // 观察所有公司卡片
  setTimeout(() => {
    const cards = document.querySelectorAll('[data-index]')
    cards.forEach((card) => observer.observe(card))
  }, 100)
})
</script>

<style scoped>
/* 淡入向上动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

/* 响应式优化 */
@media (max-width: 1023px) {
  .animate-fade-in-up,
  .animate-fade-in {
    animation: none;
    opacity: 1;
  }
}

.custom-top-radius::before {
  content: '';
  position: absolute;
  transform: translateY(1px);
  top: -16px;
  left: 0;
  width: 100%;
  height: 16px;
  background-color: var(--bg-color);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 100;
}

/* 文字滚动动画 */
@keyframes scrollText {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-text {
  display: inline-block;
  animation: scrollText 10s linear infinite;
  width: max-content;
}
</style>
