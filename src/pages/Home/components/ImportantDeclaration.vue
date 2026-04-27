<template>
  <section class="container py-10 md:py-16 lg:py-20">
    <div class="flex flex-col">
      <!-- 标题 -->
      <h2 v-fade-in-up="{ delay: 300 }" class="text-4xl text-left mb-8 font-wendao text-black">
        喵呜声明
      </h2>

      <!-- 图片展示区域：小屏上下排列 (grid-cols-1)，大屏左右分布 (lg:grid-cols-2) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <!-- 声明图片 1 -->
        <div
          v-fade-in-up="{ delay: 400 }"
          class="w-full rounded-xl overflow-hidden flex items-center justify-center"
        >
          <img :src="import01" alt="郑重声明1" class="w-full h-auto object-contain" />
        </div>

        <!-- 声明图片 2 -->
        <div
          v-fade-in-up="{ delay: 500 }"
          class="w-full rounded-xl overflow-hidden flex items-center justify-center"
        >
          <img :src="import02" alt="郑重声明2" class="w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import import01 from '@/assets/img/import-01.png'
import import02 from '@/assets/img/import-02.png'
</script>

<style scoped>
/* 若需进一步调整，可在此处编写样式 */
</style>
