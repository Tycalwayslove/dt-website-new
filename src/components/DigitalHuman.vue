<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4">喵呜AI顾问式电商</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          每个数字人都是微型品牌，让顾问式电商走进千家万户
        </p>
      </div>

      <!-- 数字人卡片网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(human, index) in digitalHumans"
          :key="index"
          class="group cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            :class="human.bgClass"
          >
            <!-- 数字人头像 -->
            <div class="w-20 h-20 mx-auto mb-4 relative">
              <div
                class="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <div
                  class="w-16 h-16 bg-miaowu-green rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-xl font-bold">AI</span>
                </div>
              </div>
              <!-- 在线状态指示器 -->
              <div
                class="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
              ></div>
            </div>

            <!-- 数字人信息 -->
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ human.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ human.slogan }}</p>

            <!-- 特色标签 -->
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="tag in human.tags"
                :key="tag"
                class="px-2 py-1 bg-white/50 rounded-full text-xs font-medium text-gray-700"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部说明文字 -->
      <div class="text-center mt-12">
        <p class="text-gray-500 text-sm max-w-3xl mx-auto">
          每个数字人顾问都经过专业训练，具备独特的个性和专业领域知识，
          能够为用户提供个性化的购物建议和专业咨询服务。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const digitalHumans = [
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-gray-100 to-gray-200',
    tags: ['智能推荐', '专业咨询'],
  },
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-purple-100 to-purple-200',
    tags: ['数据分析', '个性化'],
  },
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-red-100 to-red-200',
    tags: ['24/7服务', '即时响应'],
  },
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-gray-200 to-gray-300',
    tags: ['品牌建设', '营销策略'],
  },
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-purple-200 to-purple-300',
    tags: ['供应链', '成本优化'],
  },
  {
    title: '喵呜AI顾问式电商',
    slogan: '让小买卖变成大生意',
    bgClass: 'bg-gradient-to-br from-gray-100 to-gray-200',
    tags: ['客户服务', '售后支持'],
  },
]
</script>

<style scoped>
/* 组件样式 */
</style>
