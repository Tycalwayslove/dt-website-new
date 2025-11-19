<template>
  <footer class="bg-white">
    <div class="container">
      <!-- PC端布局 -->
      <div class="hidden lg:block pt-20">
        <div class="flex items-start gap-8 mb-20">
          <!-- 品牌Logo区域（PC：基础50%，可收缩，不增长） -->
          <div class="basis-1/2 shrink grow-0">
            <div class="flex items-center space-x-2 mb-6">
              <img :src="logoDark" alt="喵呜AI" class="h-10 w-auto" />
            </div>
            <!-- <p class="text-gray-600 text-sm leading-relaxed">
              专业的AI顾问式电商平台，让每一次购物都更智能、更贴心。
            </p> -->
          </div>

          <!-- 右侧内容区（PC：基础50%，可增长） -->
          <div class="basis-1/2 grow">
            <div class="grid grid-cols-4 gap-8">
              <!-- 我们的产品 -->
              <div>
                <h3 class="text-lg font-bold text-black mb-4">我们的产品</h3>
                <ul class="space-y-2">
                  <li v-for="product in products" :key="product.to">
                    <RouterLink
                      :to="product.to"
                      class="hover-underline-group text-black transition-colors duration-200"
                    >
                      <span class="hover-underline">{{ product.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>

              <!-- 商务与合作 -->
              <div>
                <h3 class="text-lg font-bold text-black mb-4">商务与合作</h3>
                <ul class="space-y-2">
                  <li v-for="cooperation in cooperations" :key="cooperation.to">
                    <RouterLink
                      :to="cooperation.to"
                      class="hover-underline-group text-black transition-colors duration-200"
                    >
                      <span class="hover-underline">{{ cooperation.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>

              <!-- 关于我们 -->
              <div>
                <h3 class="text-lg font-bold text-black mb-4">关于我们</h3>
                <ul class="space-y-2">
                  <li v-for="about in aboutUs" :key="about.to">
                    <RouterLink
                      :to="about.to"
                      class="hover-underline-group text-black transition-colors duration-200"
                    >
                      <span class="hover-underline">{{ about.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>

              <!-- 服务与条款 -->
              <div>
                <h3 class="text-lg font-bold text-black mb-4">服务与条款</h3>
                <ul class="space-y-2">
                  <li v-for="service in services" :key="service.to">
                    <RouterLink
                      :to="service.to"
                      class="hover-underline-group text-black transition-colors duration-200"
                    >
                      <span class="hover-underline">{{ service.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-8 pt-20 pb-10">
        <!-- 品牌Logo区域 -->
        <div class="text-left">
          <div class="flex items-center space-x-2 mb-4">
            <img :src="logoDark" alt="喵呜AI" class="h-8 w-auto" />
          </div>
        </div>

        <!-- 链接区域（移动端垂直排列） -->
        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-bold text-black mb-2">我们的产品</h3>
            <ul class="space-y-2">
              <li v-for="product in products" :key="product.to">
                <RouterLink :to="product.to" class="text-black text-base underline">
                  {{ product.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">商务与合作</h3>
            <ul class="space-y-2">
              <li v-for="cooperation in cooperations" :key="cooperation.to">
                <RouterLink :to="cooperation.to" class="text-black text-base underline">
                  {{ cooperation.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">关于我们</h3>
            <ul class="space-y-2">
              <li v-for="about in aboutUs" :key="about.to">
                <RouterLink :to="about.to" class="text-black text-base underline">
                  {{ about.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-black mb-2">服务与条款</h3>
            <ul class="space-y-2">
              <li v-for="service in services" :key="service.to">
                <RouterLink :to="service.to" class="text-black text-base underline">
                  {{ service.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 底部版权和社交图标 -->
      <div class="border-gray-200 mb-7">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <!-- 版权信息 -->
          <div class="text-left lg:text-left">
            <p class="text-black text-base">
              Copyright © {{ year }} Me&U AI. All Rights
              Reserved｜喵呜宇宙（深圳）人工智能有限公司｜
              <a
                href="https://beian.miit.gov.cn/#/Integrated/index"
                target="_blank"
                rel="noopener noreferrer"
                class="text-black underline"
                >粤ICP备2023042737号-1</a
              >
              <a
                href="https://www.12377.cn/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-black underline ml-2"
                >12377中央网信办违法和不良信息举报中心</a
              >
              <!-- Copyright ©{{ year }} 喵呜宇宙（深圳）网络科技有限公司 粤 ICP 备 2023042737 号 - 1 -->
            </p>
          </div>

          <!-- 社交平台图标 -->
          <div class="flex items-center space-x-4">
            <div
              v-for="social in socialPlatforms"
              :key="social.name"
              class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-miaowu-green hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span class="text-sm">{{ social.icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logoDark from '@/assets/img/logo-dark.png'
import { RouterLink } from 'vue-router'
const year = new Date().getFullYear()

const products: Array<{ label: string; to: string }> = [
  { label: '供应商管理后台', to: '/products/supplier-console' },
  { label: '喵呜AI App', to: '/products/app' },
  { label: '喵呜AI 小程序', to: '/products/mini-program' },
]

const cooperations: Array<{ label: string; to: string }> = [
  { label: '喵呜品牌供应商招募', to: '/cooperation/suppliers' },
  { label: '喵呜AI卖手招募', to: '/cooperation/sellers' },
  { label: '其他商务合作', to: '/cooperation/partners' },
]

const aboutUs: Array<{ label: string; to: string }> = [
  { label: '关于喵呜AI', to: '/about/company' },
  { label: '联系我们', to: '/about/contact' },
]

const services: Array<{ label: string; to: string }> = [
  { label: '帮助中心', to: '/legal/help' },
  { label: '隐私协议', to: '/legal/privacy' },
  { label: '服务条款', to: '/legal/terms' },
]

const socialPlatforms: Array<{ name: string; icon: string }> = [
  // { name: '微信', icon: '微' },
  // { name: '微博', icon: '微' },
  // { name: '抖音', icon: '抖' },
  // { name: '小红书', icon: '小' },
]
</script>
