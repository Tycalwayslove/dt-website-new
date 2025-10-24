<template>
  <footer class="bg-white py-16 lg:py-20">
    <div class="container mx-auto px-4">
      <!-- PC端布局 -->
      <div class="hidden lg:block">
        <div class="grid grid-cols-5 gap-8 mb-12">
          <!-- 品牌Logo区域 -->
          <div class="col-span-1">
            <div class="flex items-center space-x-2 mb-6">
              <div class="w-10 h-10 bg-miaowu-green rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <span class="text-2xl font-bold text-black">喵呜AI</span>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">
              专业的AI顾问式电商平台，让每一次购物都更智能、更贴心。
            </p>
          </div>

          <!-- 我们的产品 -->
          <div>
            <h3 class="text-lg font-bold text-black mb-4">我们的产品</h3>
            <ul class="space-y-2">
              <li
                v-for="product in products"
                :key="product"
                class="text-gray-600 hover:text-miaowu-green transition-colors duration-200 cursor-pointer"
              >
                {{ product }}
              </li>
            </ul>
          </div>

          <!-- 商务与合作 -->
          <div>
            <h3 class="text-lg font-bold text-black mb-4">商务与合作</h3>
            <ul class="space-y-2">
              <li
                v-for="cooperation in cooperations"
                :key="cooperation"
                class="text-gray-600 hover:text-miaowu-green transition-colors duration-200 cursor-pointer"
              >
                {{ cooperation }}
              </li>
            </ul>
          </div>

          <!-- 关于我们 -->
          <div>
            <h3 class="text-lg font-bold text-black mb-4">关于我们</h3>
            <ul class="space-y-2">
              <li
                v-for="about in aboutUs"
                :key="about"
                class="text-gray-600 hover:text-miaowu-green transition-colors duration-200 cursor-pointer"
              >
                {{ about }}
              </li>
            </ul>
          </div>

          <!-- 服务与条款 -->
          <div>
            <h3 class="text-lg font-bold text-black mb-4">服务与条款</h3>
            <ul class="space-y-2">
              <li
                v-for="service in services"
                :key="service"
                class="text-gray-600 hover:text-miaowu-green transition-colors duration-200 cursor-pointer"
              >
                {{ service }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-8">
        <!-- 品牌Logo区域 -->
        <div class="text-center">
          <div class="flex items-center justify-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-miaowu-green rounded-full flex items-center justify-center">
              <span class="text-white font-bold">M</span>
            </div>
            <span class="text-xl font-bold text-black">喵呜AI</span>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed">
            专业的AI顾问式电商平台，让每一次购物都更智能、更贴心。
          </p>
        </div>

        <!-- 链接区域 -->
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h3 class="text-base font-bold text-black mb-3">我们的产品</h3>
            <ul class="space-y-2">
              <li
                v-for="product in products.slice(0, 2)"
                :key="product"
                class="text-gray-600 text-sm"
              >
                {{ product }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-bold text-black mb-3">商务与合作</h3>
            <ul class="space-y-2">
              <li
                v-for="cooperation in cooperations.slice(0, 2)"
                :key="cooperation"
                class="text-gray-600 text-sm"
              >
                {{ cooperation }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-bold text-black mb-3">关于我们</h3>
            <ul class="space-y-2">
              <li v-for="about in aboutUs.slice(0, 2)" :key="about" class="text-gray-600 text-sm">
                {{ about }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-bold text-black mb-3">服务与条款</h3>
            <ul class="space-y-2">
              <li
                v-for="service in services.slice(0, 2)"
                :key="service"
                class="text-gray-600 text-sm"
              >
                {{ service }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 底部版权和社交图标 -->
      <div class="border-t border-gray-200 pt-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <!-- 版权信息 -->
          <div class="text-center lg:text-left">
            <p class="text-gray-500 text-sm">
              Copyright ©{{ year }} 喵呜宇宙（深圳）网络科技有限公司 粤 ICP 备 2023042737 号 - 1
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
const year = new Date().getFullYear()

const products = ['喵呜AI小程序', '喵呜AI顾问式电商', '喵呜AI供应链', '喵呜AI数字人']

const cooperations = ['供应商招募', '渠道合作', '媒体合作', '品牌合作']

const aboutUs = ['关于喵呜AI', '加入我们', '联系我们', '帮助中心']

const services = ['用户协议', '隐私政策', '法律声明', '免责声明']

const socialPlatforms = [
  { name: '微信', icon: '微' },
  { name: '微博', icon: '微' },
  { name: '抖音', icon: '抖' },
  { name: '小红书', icon: '小' },
]
</script>
