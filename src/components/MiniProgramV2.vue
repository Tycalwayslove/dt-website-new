<template>
  <section class="py-16 lg:py-24 bg-black">
    <div class="container mx-auto px-4">
      <!-- PC端布局 -->
      <div class="hidden lg:flex items-center space-x-12">
        <!-- 左侧文字区 -->
        <div class="flex-1 space-y-6">
          <h2 class="text-4xl font-bold text-white leading-tight">喵呜AI小程序 V2.0</h2>

          <h3 class="text-xl text-white/80 font-medium">从「销售」到「专业顾问」的强化升级</h3>

          <!-- 升级点列表 -->
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90">顾问人格化</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90">产品分析可视化</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90">品牌形象系统化</span>
            </div>
          </div>

          <!-- 描述文字 -->
          <p class="text-lg text-white/70 leading-relaxed">
            全新升级的小程序版本，将传统的销售模式转变为专业的顾问式服务。
            通过AI技术实现个性化推荐，让每一次交互都更加智能和贴心。
          </p>

          <!-- 了解详情按钮 -->
          <button
            class="bg-miaowu-green text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-lg"
          >
            了解详情
          </button>
        </div>

        <!-- 右侧界面展示区 -->
        <div class="flex-1">
          <div class="relative">
            <!-- 手机界面展示 -->
            <div class="flex space-x-4 justify-center">
              <!-- 手机1 -->
              <div class="w-32 h-56 bg-gray-800 rounded-2xl p-2 shadow-2xl">
                <div class="w-full h-full bg-white rounded-xl flex flex-col">
                  <div class="h-8 bg-miaowu-green rounded-t-xl flex items-center justify-center">
                    <span class="text-white text-xs font-bold">喵呜AI</span>
                  </div>
                  <div class="flex-1 p-3 space-y-2">
                    <div class="h-2 bg-gray-200 rounded"></div>
                    <div class="h-2 bg-miaowu-green rounded w-3/4"></div>
                    <div class="h-2 bg-gray-200 rounded"></div>
                    <div class="h-8 bg-miaowu-green rounded mt-4"></div>
                  </div>
                </div>
              </div>

              <!-- 手机2 -->
              <div class="w-32 h-56 bg-gray-800 rounded-2xl p-2 shadow-2xl transform translate-y-4">
                <div class="w-full h-full bg-white rounded-xl flex flex-col">
                  <div class="h-8 bg-miaowu-green rounded-t-xl flex items-center justify-center">
                    <span class="text-white text-xs font-bold">AI顾问</span>
                  </div>
                  <div class="flex-1 p-3 space-y-2">
                    <div class="h-2 bg-miaowu-green rounded w-1/2"></div>
                    <div class="h-2 bg-gray-200 rounded"></div>
                    <div class="h-2 bg-miaowu-green rounded w-2/3"></div>
                    <div class="h-8 bg-miaowu-green rounded mt-4"></div>
                  </div>
                </div>
              </div>

              <!-- 手机3 -->
              <div
                class="w-32 h-56 bg-gray-800 rounded-2xl p-2 shadow-2xl transform -translate-y-2"
              >
                <div class="w-full h-full bg-white rounded-xl flex flex-col">
                  <div class="h-8 bg-miaowu-green rounded-t-xl flex items-center justify-center">
                    <span class="text-white text-xs font-bold">推荐</span>
                  </div>
                  <div class="flex-1 p-3 space-y-2">
                    <div class="h-2 bg-gray-200 rounded"></div>
                    <div class="h-2 bg-miaowu-green rounded w-4/5"></div>
                    <div class="h-2 bg-gray-200 rounded"></div>
                    <div class="h-8 bg-miaowu-green rounded mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-8">
        <!-- 文字区 -->
        <div class="space-y-4 text-center">
          <h2 class="text-2xl font-bold text-white leading-tight">喵呜AI小程序 V2.0</h2>

          <h3 class="text-lg text-white/80 font-medium">从「销售」到「专业顾问」的强化升级</h3>

          <!-- 升级点列表 -->
          <div class="space-y-2">
            <div class="flex items-center justify-center space-x-2">
              <div class="w-1.5 h-1.5 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90 text-sm">顾问人格化</span>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <div class="w-1.5 h-1.5 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90 text-sm">产品分析可视化</span>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <div class="w-1.5 h-1.5 bg-miaowu-green rounded-full"></div>
              <span class="text-white/90 text-sm">品牌形象系统化</span>
            </div>
          </div>

          <!-- 描述文字 -->
          <p class="text-sm text-white/70 leading-relaxed">
            全新升级的小程序版本，将传统的销售模式转变为专业的顾问式服务。
          </p>

          <!-- 了解详情按钮 -->
          <button
            class="w-full bg-miaowu-green text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-green-600 transition-colors duration-200"
          >
            了解详情
          </button>
        </div>

        <!-- 界面展示区 -->
        <div class="flex justify-center space-x-3">
          <!-- 手机界面 -->
          <div class="w-24 h-40 bg-gray-800 rounded-xl p-1.5 shadow-xl">
            <div class="w-full h-full bg-white rounded-lg flex flex-col">
              <div class="h-6 bg-miaowu-green rounded-t-lg flex items-center justify-center">
                <span class="text-white text-xs font-bold">喵呜AI</span>
              </div>
              <div class="flex-1 p-2 space-y-1">
                <div class="h-1.5 bg-gray-200 rounded"></div>
                <div class="h-1.5 bg-miaowu-green rounded w-3/4"></div>
                <div class="h-1.5 bg-gray-200 rounded"></div>
                <div class="h-6 bg-miaowu-green rounded mt-3"></div>
              </div>
            </div>
          </div>

          <div class="w-24 h-40 bg-gray-800 rounded-xl p-1.5 shadow-xl">
            <div class="w-full h-full bg-white rounded-lg flex flex-col">
              <div class="h-6 bg-miaowu-green rounded-t-lg flex items-center justify-center">
                <span class="text-white text-xs font-bold">AI顾问</span>
              </div>
              <div class="flex-1 p-2 space-y-1">
                <div class="h-1.5 bg-miaowu-green rounded w-1/2"></div>
                <div class="h-1.5 bg-gray-200 rounded"></div>
                <div class="h-1.5 bg-miaowu-green rounded w-2/3"></div>
                <div class="h-6 bg-miaowu-green rounded mt-3"></div>
              </div>
            </div>
          </div>
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
