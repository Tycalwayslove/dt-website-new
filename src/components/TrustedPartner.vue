<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <!-- PC端布局 -->
      <div class="hidden lg:flex items-center space-x-12">
        <!-- 左侧文字区 -->
        <div class="flex-1 space-y-6">
          <h2 class="text-4xl font-bold text-black leading-tight">让喵呜AI成为可信赖的专业伙伴</h2>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-3">
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              #该理料
            </span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              #高信任
            </span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              #决策确定球
            </span>
          </div>

          <!-- 正文描述 -->
          <p class="text-lg text-gray-600 leading-relaxed">
            我们致力于通过先进的人工智能技术，为企业提供全方位的电商解决方案。
            从智能推荐到专业咨询，从数据分析到品牌建设，喵呜AI始终是您最值得信赖的合作伙伴。
            让每一次合作都成为成功的开始，让每一个决策都更加精准有效。
          </p>
        </div>

        <!-- 右侧图片区 -->
        <div class="flex-1">
          <div class="relative">
            <!-- 主图 -->
            <div
              class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-80 flex items-center justify-center"
            >
              <div class="text-center space-y-4">
                <div
                  class="w-24 h-24 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
                >
                  <span class="text-white text-2xl font-bold">AI</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800">专业AI服务</h3>
                <p class="text-gray-600">让技术更懂业务</p>
              </div>
            </div>

            <!-- 装饰元素 -->
            <div
              class="absolute -top-4 -right-4 w-16 h-16 bg-miaowu-green rounded-full opacity-20"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-12 h-12 bg-orange-400 rounded-full opacity-20"
            ></div>
          </div>
        </div>
      </div>

      <!-- 移动端布局 -->
      <div class="lg:hidden space-y-8">
        <!-- 文字区 -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-black leading-tight">让喵呜AI成为可信赖的专业伙伴</h2>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              #该理料
            </span>
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              #高信任
            </span>
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              #决策确定球
            </span>
          </div>

          <!-- 正文描述 -->
          <p class="text-sm text-gray-600 leading-relaxed">
            我们致力于通过先进的人工智能技术，为企业提供全方位的电商解决方案。
            从智能推荐到专业咨询，从数据分析到品牌建设，喵呜AI始终是您最值得信赖的合作伙伴。
          </p>
        </div>

        <!-- 图片区 -->
        <div
          class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 h-48 flex items-center justify-center"
        >
          <div class="text-center space-y-3">
            <div
              class="w-16 h-16 bg-miaowu-green rounded-full flex items-center justify-center mx-auto"
            >
              <span class="text-white text-lg font-bold">AI</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800">专业AI服务</h3>
            <p class="text-sm text-gray-600">让技术更懂业务</p>
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
