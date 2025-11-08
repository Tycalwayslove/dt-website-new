<template>
  <div class="bg-white">
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- PC端：背景图容器（宽度自适应，高度480） -->
        <section v-fade-in-up="{ delay: 300 }" class="w-full h-[480px] relative rounded-2xl overflow-hidden" :style="{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }">
          <!-- 内容：文案（左对齐） -->
          <div class="absolute inset-0">
            <div class="h-full mx-auto flex items-center">

              <!-- 文案区域（垂直居中，与左侧有间距） -->
              <div v-fade-in-up="{ delay: 500 }" class="flex-1 flex flex-col justify-center ml-24 mr-20 space-y-5">
                <!-- 三行文案 -->
                <h2 class="text-3xl font-wendao text-white">其他商务合作</h2>
                <p class="text-xl text-white mt-3">喵呜 AI / Me&U AI 是喵呜宇宙旗下集 科技+创意 双领先的 AI 顾问式电商品牌</p>
                <p class="text-base text-white mt-2">
                  商务合作请到司洽谈。
                </p>
                <!-- 地址（图标+地址） -->
                <p class="text-base text-white mt-2 flex items-center">
                  <img :src="locationImg" alt="地址图标" class="w-[17px] h-[20px] mr-2" />
                  深圳市南山区粤海街道科兴科学园A1-1003
                </p>
                <!-- <p class="text-base text-white mt-2 flex items-center">
                  <img :src="emailImg" alt="地址图标" class="w-[18px] h-[13px] mr-2" />
                  service@meupop.com
                </p> -->
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 移动端布局：仅在小屏显示 -->
    <div v-fade-in-up="{ delay: 500 }" class="container block lg:hidden px-4 py-8 space-y-4">
      <!-- 移动端背景图：全屏自适应，高度300px -->
      <div class="w-full">
        <img :src="bg" alt="卖手招募背景图" class="w-full h-[300px] object-cover rounded-2xl" />
      </div>

      <!-- 文案区域：置于背景图下方，间距适中 -->
      <div class="mt-6 space-y-4 text-center">
        <h2 class="text-2xl font-wendao text-black">其他商务合作</h2>
        <p class="text-base text-gray-700">喵呜 AI / Me&U AI 是喵呜宇宙旗下<br></br>集 科技+创意 双领先的 AI 顾问式电商品牌</p>
        <p class="text-sm text-gray-600">
          商务合作请到司洽谈。
        </p>
        <!-- 地址（图标+地址） -->
        <div class="w-full p-4 bg-black flex flex-col items-left justify-start">
          <p class="text-base text-white mt-2 flex items-left text-left">
            <img :src="locationImg" alt="地址图标" class="w-[17px] h-[20px] mr-2" />
            深圳市南山区粤海街道科兴科学园A1-1003
          </p>
          <!-- <p class="text-base text-white mt-2 flex items-center">
            <img :src="emailImg" alt="地址图标" class="w-[18px] h-[13px] mr-2" />
            service@meupop.com
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { img } from '@/utils/assets.js'
const bg = img('contact-bg.png')
const locationImg = img('contact-location.png')

</script>
