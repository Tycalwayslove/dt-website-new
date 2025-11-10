<template>
  <div class="bg-white">
    <!-- PC端布局：背景图容器（宽度铺满，高度580px） -->
    <section class="container mx-auto px-20 lg:px-20 py-20 hidden md:block">
      <div
        v-fade-in-up="{ delay: 300 }"
        class="w-full h-[580px] relative rounded-2xl overflow-hidden"
        :style="{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <!-- 内容栅格：左地图 右公司信息；屏幕较小时扩大地图占比 -->
        <div
          class="absolute inset-0 grid md:grid-cols-[6fr_3fr] lg:grid-cols-[3fr_2fr] xl:grid-cols-[1fr_1fr] gap-8 items-center p-20 box-border"
        >
          <!-- 左侧：地图显示区域 -->
          <div v-fade-in-up="{ delay: 500 }" class="h-full">
            <div
              class="w-full h-full max-h-[420px] rounded-xl overflow-hidden flex items-center justify-center"
            >
              <img
                :src="companyLocation"
                alt="公司位置"
                class="h-full w-full max-h-[420px] object-cover select-none pointer-events-none xl:h-full xl:w-auto xl:object-contain xl:max-w-full xl:mx-auto"
              />
            </div>
          </div>

          <!-- 右侧：公司信息（四行文案） -->
          <div
            v-fade-in-up="{ delay: 800 }"
            class="flex flex-col justify-center space-y-3 text-white pl-10"
          >
            <!-- 第一行：联系我们 -->
            <h2 class="text-3xl font-semibold">联系我们</h2>
            <!-- 第二行：AI 智能体（喵呜AI） -->
            <p class="text-xl">喵呜AI</p>
            <!-- 第三行：地址（图标+地址） -->
            <p class="text-base mt-2 flex items-center">
              <img :src="locationImg" alt="地址图标" class="w-[17px] h-[20px] mr-2" />
              深圳市南山区粤海街道科兴科学园A1-1003
            </p>
            <!-- 第四行：邮箱（图标+email） -->
            <p class="text-base mt-2 flex items-center">
              <img :src="emailImg" alt="邮箱图标" class="w-[18px] h-[13px] mr-2" />
              service@meupop.com
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 移动端布局：仅在小屏显示 -->
    <section v-fade-in-up="{ delay: 500 }" class="container block md:hidden px-4 py-8 space-y-4">
      <!-- 顶部背景图：全屏自适应，高度300px，文案置于中间 -->
      <div class="w-full relative">
        <img :src="bg" alt="联系背景图" class="w-full h-[300px] object-cover rounded-2xl" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="px-6 py-4 bg-black/40 rounded-2xl text-center backdrop-blur-sm">
            <h2 class="text-2xl font-semibold text-white">联系我们</h2>
            <p class="text-base text-white">喵呜AI</p>
            <div class="mt-2 space-y-2">
              <p class="text-base text-white flex items-center justify-center">
                <img :src="locationImg" alt="地址图标" class="w-[17px] h-[20px] mr-2" />
                深圳市南山区粤海街道科兴科学园A1-1003
              </p>
              <p class="text-base text-white flex items-center justify-center">
                <img :src="emailImg" alt="邮箱图标" class="w-[18px] h-[13px] mr-2" />
                service@meupop.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端：地图显示容器 -->
      <div class="w-full h-[260px] rounded-2xl overflow-hidden border border-gray-200">
        <img :src="companyLocation" alt="公司位置" class="w-full h-full object-cover" />
      </div>

      <!-- 地址信息与邮箱已置于顶部背景图的中间文案中 -->
    </section>
  </div>
</template>

<script setup lang="ts">
import companyLocation from '@/assets/img/company-location.jpeg'
import bg from '@/assets/img/contact-bg.png'
import emailImg from '@/assets/img/contact-email.png'
import locationImg from '@/assets/img/contact-location.png'
</script>
