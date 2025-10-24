<template>
  <section class="py-16 lg:py-24">
    <!-- 技术/平台伙伴 -->
    <div class="bg-black py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">喵呜AI合作伙伴</h2>
          <p class="text-lg text-white/80">与行业领先的技术平台深度合作</p>
        </div>

        <!-- 技术伙伴Logo -->
        <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          <div
            v-for="partner in techPartners"
            :key="partner.name"
            class="group cursor-pointer transform hover:scale-110 transition-all duration-300"
          >
            <div
              class="bg-white rounded-lg px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div class="text-gray-800 font-bold text-lg text-center">
                {{ partner.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 严选品牌伙伴 -->
    <div class="bg-gradient-to-br from-gray-800 to-gray-900 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">喵呜严选品牌合作伙伴</h2>
          <p class="text-lg text-white/80">精选优质品牌，为用户提供高品质产品</p>
        </div>

        <!-- 品牌伙伴Logo -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          <div
            v-for="brand in brandPartners"
            :key="brand.name"
            class="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="bg-white rounded-lg px-4 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div class="text-gray-800 font-bold text-sm lg:text-base">
                {{ brand.name }}
              </div>
              <div v-if="brand.subtitle" class="text-gray-500 text-xs mt-1">
                {{ brand.subtitle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const techPartners = [
  { name: '阿里云' },
  { name: '腾讯云' },
  { name: '字节跳动' },
  { name: 'MINIMAX' },
  { name: '华为云' },
  { name: '百度智能云' },
]

const brandPartners = [
  { name: '佳沃', subtitle: 'Joyvio' },
  { name: "Lay's", subtitle: '乐事' },
  { name: '百草味', subtitle: 'Bestore' },
  { name: 'Cheetos', subtitle: '奇多' },
  { name: 'Zespri', subtitle: '佳沛' },
  { name: 'Walch', subtitle: '威露士' },
  { name: '圣迪乐', subtitle: 'Shengdile' },
  { name: '三只松鼠', subtitle: 'Three Squirrels' },
]
</script>

<style scoped>
/* 组件样式 */
</style>
