<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4">喵呜AI招募</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          让顾问式电商走进千家万户，加入我们，共创未来
        </p>
      </div>

      <!-- PC端布局 -->
      <div class="hidden lg:block">
        <!-- 三张横向排列的招募场景图 -->
        <div class="grid grid-cols-3 gap-8 mb-8">
          <!-- 科技界面场景 -->
          <div class="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div
              class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden"
            >
              <!-- 科技感背景 -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-miaowu-green/20 to-transparent"
              ></div>

              <!-- 科技元素 -->
              <div class="relative z-10 text-center space-y-4">
                <div
                  class="w-16 h-16 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
                >
                  <span class="text-white text-2xl font-bold">3</span>
                </div>
                <div class="text-white text-2xl font-bold">3-in-1</div>
                <div class="text-miaowu-green text-lg font-medium">130W</div>
                <div class="text-white/80 text-sm">2h</div>
              </div>

              <!-- 装饰线条 -->
              <div class="absolute top-4 left-4 w-8 h-0.5 bg-miaowu-green"></div>
              <div class="absolute bottom-4 right-4 w-6 h-0.5 bg-miaowu-green"></div>
            </div>
          </div>

          <!-- 人物互动场景 -->
          <div class="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div
              class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden"
            >
              <!-- 人物形象 -->
              <div class="relative z-10 text-center space-y-4">
                <div
                  class="w-20 h-20 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
                >
                  <span class="text-white text-2xl">👩</span>
                </div>
                <div class="text-gray-800 text-lg font-bold">专业顾问</div>
                <div class="text-gray-600 text-sm">智能推荐服务</div>

                <!-- 浮动图标 -->
                <div class="flex justify-center space-x-2">
                  <div
                    class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-xs">📱</span>
                  </div>
                  <div
                    class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-xs">💡</span>
                  </div>
                  <div
                    class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-xs">🎯</span>
                  </div>
                </div>
              </div>

              <!-- 装饰元素 -->
              <div class="absolute top-4 right-4 w-12 h-12 bg-miaowu-green/20 rounded-full"></div>
              <div class="absolute bottom-4 left-4 w-8 h-8 bg-orange-400/20 rounded-full"></div>
            </div>
          </div>

          <!-- 团队协作场景 -->
          <div class="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div
              class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden"
            >
              <!-- 团队形象 -->
              <div class="relative z-10 text-center space-y-4">
                <div class="flex justify-center space-x-2">
                  <div
                    class="w-8 h-8 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-sm">👨</span>
                  </div>
                  <div
                    class="w-8 h-8 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-sm">👩</span>
                  </div>
                  <div
                    class="w-8 h-8 bg-miaowu-green rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-sm">👨</span>
                  </div>
                </div>
                <div class="text-gray-800 text-lg font-bold">团队协作</div>
                <div class="text-gray-600 text-sm">共同成长</div>

                <!-- 协作元素 -->
                <div
                  class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto shadow-lg"
                >
                  <span class="text-miaowu-green text-xl">💻</span>
                </div>
              </div>

              <!-- 装饰元素 -->
              <div class="absolute top-4 left-4 w-10 h-10 bg-miaowu-green/20 rounded-full"></div>
              <div class="absolute bottom-4 right-4 w-6 h-6 bg-orange-400/20 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- 了解详情按钮 -->
        <div class="text-center">
          <button
            class="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            了解详情
          </button>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-6">
        <!-- 三张垂直排列的招募场景图 -->
        <div class="space-y-4">
          <!-- 科技界面场景 -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 h-40 flex items-center justify-center relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-miaowu-green/20 to-transparent"
            ></div>
            <div class="relative z-10 text-center space-y-2">
              <div
                class="w-12 h-12 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
              >
                <span class="text-white text-lg font-bold">3</span>
              </div>
              <div class="text-white text-lg font-bold">3-in-1</div>
              <div class="text-miaowu-green text-sm font-medium">130W</div>
            </div>
          </div>

          <!-- 人物互动场景 -->
          <div
            class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 h-40 flex items-center justify-center relative overflow-hidden"
          >
            <div class="relative z-10 text-center space-y-2">
              <div
                class="w-16 h-16 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
              >
                <span class="text-white text-xl">👩</span>
              </div>
              <div class="text-gray-800 text-lg font-bold">专业顾问</div>
              <div class="text-gray-600 text-sm">智能推荐服务</div>
            </div>
          </div>

          <!-- 团队协作场景 -->
          <div
            class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 h-40 flex items-center justify-center relative overflow-hidden"
          >
            <div class="relative z-10 text-center space-y-2">
              <div class="flex justify-center space-x-1">
                <div class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center">
                  <span class="text-white text-xs">👨</span>
                </div>
                <div class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center">
                  <span class="text-white text-xs">👩</span>
                </div>
                <div class="w-6 h-6 bg-miaowu-green rounded-full flex items-center justify-center">
                  <span class="text-white text-xs">👨</span>
                </div>
              </div>
              <div class="text-gray-800 text-lg font-bold">团队协作</div>
              <div class="text-gray-600 text-sm">共同成长</div>
            </div>
          </div>
        </div>

        <!-- 了解详情按钮 -->
        <div class="text-center pt-4">
          <button
            class="w-full bg-black text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            了解详情
          </button>
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
