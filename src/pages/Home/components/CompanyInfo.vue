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
              class="flex flex-shrink-1 flex-grow flex-col justify-center pt-20 pb-[96px] max-w-[calc(100%-560px)]"
            >
              <div v-stagger class="space-y-3 lg:space-y-4 pr-20">
                <div class="relative overflow-hidden">
                  <h3
                    :class="[
                      'text-[56px] lg:text-[56px] truncate font-wendao',
                      index % 2 === 0 ? 'text-black' : 'text-white',
                    ]"
                  >
                    {{ company.title }}
                  </h3>
                </div>
                <p
                  :class="[
                    'text-xl lg:text-xl leading-relaxed',
                    index % 2 === 0 ? 'text-black' : 'text-white',
                  ]"
                >
                  {{ company.desc }}
                </p>
                <p
                  :class="[
                    'text-base lg:text-base leading-relaxed',
                    index % 2 === 0 ? 'text-black' : 'text-white',
                  ]"
                >
                  {{ company.content }}
                </p>
                <div v-if="company.button?.show">
                  <button
                    :class="[company.button?.class]"
                    class="mt-4 px-20 py-4 text-sm font-medium"
                    @click="goDetail(company)"
                  >
                    {{ company.button?.text }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 右侧：公司图片 -->
            <div class="flex-shrink-0 flex-grow-0 relative overflow-hidden pt-20 pb-[96px]">
              <div v-stagger class="w-[560px] h-[300px] rounded-2xl">
                <img
                  :src="company.image"
                  :alt="company.title"
                  class="w-full h-full object-cover transition duration-300 rounded-2xl"
                />
              </div>
            </div>
          </div>

          <!-- 移动端布局：上方图片，下方信息 -->
          <div
            v-stagger
            class="lg:hidden flex flex-col"
            :class="{ 'bg-white': index % 2 === 0, 'bg-black': index % 2 === 1 }"
          >
            <!-- 上方：公司图片 -->
            <div class="w-full h-[168px] sm:h-[200px] md:h-64 relative overflow-hidden my-10">
              <img
                :src="company.image"
                :alt="company.title"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <!-- 下方：公司信息 -->
            <div :class="index === companyList.length - 1 ? 'pb-10' : 'pb-14'">
              <h3
                :class="[
                  'text-[28px] xs:text-[28px] sm:text-3xl md:text-4xl font-wendao',
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
              <div v-if="company.button?.show" class="mt-4">
                <button
                  :class="[company.button?.class]"
                  class="px-20 py-3 text-sm font-medium"
                  @click="goDetail(company)"
                >
                  {{ company.button?.text }}
                </button>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 公司信息接口类型
interface CompanyInfo {
  title: string
  desc: string
  content: string
  image: string
  button?: {
    show: boolean
    text: string
    class: string
    to: string
  }
}

const router = useRouter()
const goDetail = (company: CompanyInfo) => {
  const to = company.button?.to
  if (to) router.push(to)
}

// Mock 数据
const companyList = ref<CompanyInfo[]>([
  {
    title: '让喵呜AI成为可信赖的专业伙伴',
    desc: '#被理解｜高信任｜决策确定感',
    content:
      '喵呜AI 对 用户 的价值与意义，从“搜索商品”到“被理解的推荐”，让AI成为可信赖的专业伙伴：喵呜AI顾问带来“咨询式消费”体验，每次推荐有理由、有知识、有温度。让用户不仅能“更快买”而且“更笃定地买”，每个数字顾问都有专业人格和知识逻辑，让AI从冷冰冰的工具，变成“可信任的伙伴”；',
    image: img('here-01.png'),
    button: { show: false, text: '了解详情', class: 'btn-main-white', to: '/products' },
  },
  {
    title: '喵呜AI小程序 V2.0',
    desc: '从「销售」到「专业顾问」的强化升级',
    content:
      '这次的喵呜AI小程序 V2.0 从顾问人格化 / 产品分析可视化 / 品牌形象系统化 三点入手基于之前发布的 V1.0 进行核心理念的 强化 和 升级。它不只是改版，而是一次品牌的信任与升级，一次体验哲学的加强与重构！未来我们会继续基于「专业顾问」的核心理念持续优化和迭代产品。',
    image: img('here-02.png'),
    button: { show: true, text: '了解详情', class: 'btn-main-black', to: '/products/mini-program' },
  },
  {
    title: '喵呜AI供应链',
    desc: '#精准共识｜品牌人格化｜长期关系',
    content:
      '传统电商中，品牌花钱买曝光，但买不到信任。顾问式电商中，品牌通过AI顾问建立长期认知与情感绑定。喵呜AI不只是帮你卖货，而是帮你建立「被理解的品牌人格」，在这里，你的品牌不再是广告的一句口号，而是一个能被AI讲述、能被用户信任的知识体系。“我们帮你建立被理解的品牌人格，让品牌成为知识生态的一部分，而不是流量的一部分。”',
    image: img('here-03.png'),
    button: {
      show: true,
      text: '了解详情',
      class: 'btn-main-white',
      to: '/products/supplier-console',
    },
  },
])
</script>

<style scoped>
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
</style>
