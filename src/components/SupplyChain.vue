<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <!-- PC端布局 -->
      <div class="hidden lg:flex items-center space-x-12">
        <!-- 左侧文字区 -->
        <div class="flex-1 space-y-6">
          <h2 class="text-4xl font-bold text-black leading-tight">喵呜AI供应链</h2>

          <!-- 标签 -->
          <div class="flex items-center space-x-2">
            <span class="text-miaowu-green font-medium">#精准共识</span>
            <span class="text-gray-400">|</span>
            <span class="text-miaowu-green font-medium">#品牌人格化</span>
            <span class="text-gray-400">|</span>
            <span class="text-miaowu-green font-medium">#长期关系</span>
          </div>

          <!-- 描述文字 -->
          <p class="text-lg text-gray-600 leading-relaxed">
            通过AI技术实现精准的供需匹配，让每一次推荐都基于深度理解。
            我们致力于构建品牌人格化的供应链体系，建立长期稳定的合作关系。
            让「被理解的推荐」成为现实，让「咨询式消费」成为常态。
          </p>

          <!-- 了解详情按钮 -->
          <button
            class="bg-miaowu-green text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg"
          >
            了解详情
          </button>
        </div>

        <!-- 右侧促销视觉区 -->
        <div class="flex-1">
          <div class="relative">
            <!-- 促销场景图 -->
            <div
              class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden"
            >
              <!-- 背景装饰 -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-miaowu-green/10 to-green-300/20"
              ></div>

              <!-- 促销元素 -->
              <div class="relative z-10 text-center space-y-6">
                <!-- FLASH SALE 横幅 -->
                <div
                  class="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold animate-pulse"
                >
                  FLASH SALE
                </div>

                <!-- 折扣信息 -->
                <div class="text-6xl font-bold text-miaowu-green">50%</div>

                <!-- 商品信息 -->
                <div class="text-gray-700 font-medium">TRIỆU MÓN</div>

                <!-- 了解详情按钮 -->
                <button
                  class="bg-miaowu-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg"
                >
                  了解详情
                </button>
              </div>

              <!-- 装饰元素 -->
              <div
                class="absolute top-4 right-4 w-16 h-16 bg-orange-400 rounded-full opacity-20"
              ></div>
              <div
                class="absolute bottom-4 left-4 w-12 h-12 bg-miaowu-green rounded-full opacity-20"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-8">
        <!-- 文字区 -->
        <div class="space-y-4 text-center">
          <h2 class="text-2xl font-bold text-black leading-tight">喵呜AI供应链</h2>

          <!-- 标签 -->
          <div class="flex items-center justify-center space-x-2 text-sm">
            <span class="text-miaowu-green font-medium">#精准共识</span>
            <span class="text-gray-400">|</span>
            <span class="text-miaowu-green font-medium">#品牌人格化</span>
            <span class="text-gray-400">|</span>
            <span class="text-miaowu-green font-medium">#长期关系</span>
          </div>

          <!-- 描述文字 -->
          <p class="text-sm text-gray-600 leading-relaxed">
            通过AI技术实现精准的供需匹配，让每一次推荐都基于深度理解。
            我们致力于构建品牌人格化的供应链体系，建立长期稳定的合作关系。
          </p>

          <!-- 了解详情按钮 -->
          <button
            class="w-full bg-miaowu-green text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-green-600 transition-colors duration-200"
          >
            了解详情
          </button>
        </div>

        <!-- 促销视觉区 -->
        <div
          class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 h-48 flex items-center justify-center relative overflow-hidden"
        >
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-miaowu-green/10 to-green-300/20"
          ></div>

          <!-- 促销元素 -->
          <div class="relative z-10 text-center space-y-4">
            <!-- FLASH SALE 横幅 -->
            <div
              class="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse"
            >
              FLASH SALE
            </div>

            <!-- 折扣信息 -->
            <div class="text-4xl font-bold text-miaowu-green">50%</div>

            <!-- 商品信息 -->
            <div class="text-gray-700 font-medium text-sm">TRIỆU MÓN</div>
          </div>

          <!-- 装饰元素 -->
          <div class="absolute top-2 right-2 w-8 h-8 bg-orange-400 rounded-full opacity-20"></div>
          <div
            class="absolute bottom-2 left-2 w-6 h-6 bg-miaowu-green rounded-full opacity-20"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
