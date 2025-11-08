<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- PC端：背景图容器（宽度自适应，高度480） -->
        <section
          v-fade-in-up="{ delay: 300 }"
          class="w-full h-[480px] relative rounded-2xl overflow-hidden"
          :style="{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <!-- 内容：文案（左对齐） -->
          <div class="absolute inset-0">
            <div class="h-full mx-auto flex items-center">

              <!-- 文案区域（垂直居中，与左侧有间距） -->
              <div v-fade-in-up="{ delay: 500 }" class="flex-1 flex flex-col justify-center ml-24 mr-20 space-y-5">
                <!-- 三行文案 -->
                <h2 class="text-3xl font-wendao text-white">优质供应商招募</h2>
                <p class="text-xl text-white mt-3">喵呜 AI / Me&U AI 是喵呜宇宙旗下集 科技+创意 双领先的 AI 顾问式电商品牌</p>
                <p class="text-base text-white mt-2">
                  如您想加入我们：请预约到司洽谈。
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
        <!-- 招募文案 -->
         <section v-fade-in-up="{ delay: 1000 }" class="w-full position space-y-8 flex flex-col items-center">
          <h2 class="text-[56px] font-wendao text-black text-center">优质供应商，就等你来</h2>
          <p class="text-xl text-center text-black max-w-[1316px] m-auto leading-[28px]">喵呜宇宙成立于2023年3月，是一家专注于AI智能体研发与营销创新应用的前沿科技公司。我们在2025年10月份，供应链开放招募中，喵呜期待优质的供应商以及品牌供应商都能加入我们，把「答案」-最合适的商品交到用户手中。</p>
          <!-- 了解详情按钮 -->
           <button
             class="w-[200px] h-[48px] text-center bg-black text-white hover:text-black hover:bg-miaowu-green rounded-xl drop-shadow-md flex items-center justify-center"
             aria-label="跳转到喵呜品牌供应商招募页面"
             @click="goToRecruitment"
           >
             了解详情
           </button>
         </section>
      </div>
    </div>
    <!-- 移动端布局：仅在小屏显示 -->
    <div v-fade-in-up="{ delay: 500 }" class="container block lg:hidden px-4 py-8 space-y-4">
      <!-- 移动端背景图：全屏自适应，高度300px -->
      <div class="w-full">
        <img :src="bg" alt="供应商招募背景图" class="w-full h-[300px] object-cover rounded-2xl" />
      </div>

      <!-- 文案区域：置于背景图下方，间距适中 -->
      <div class="mt-6 space-y-4 text-center">
        <h2 class="text-2xl font-wendao text-black">优质供应商招募</h2>
        <p class="text-base text-gray-700">喵呜 AI / Me&U AI 是喵呜宇宙旗下<br></br>集 科技+创意 双领先的 AI 顾问式电商品牌</p>
        <p class="text-sm text-gray-600">
          如您想加入我们：请预约到司洽谈。
        </p>
         <!-- 地址（图标+地址） -->
          <div class="w-full p-4 bg-black flex flex-col items-left justify-start">
        <p class="text-base text-white mt-2 flex items-left text-left">
          <img :src="locationImg" alt="地址图标" class="w-[17px] h-[20px] mr-2" />
          深圳市南山区粤海街道科兴科学园A1-10
        </p>
        <!-- <p class="text-base text-white mt-2 flex items-center">
          <img :src="emailImg" alt="地址图标" class="w-[18px] h-[13px] mr-2" />
          service@meupop.com
        </p> -->
          </div>

      </div>
        <!-- 招募文案 -->
         <section class="w-full position space-y-4 flex flex-col items-center">
          <h2 class="text-2xl font-wendao text-black text-left">优质供应商，就等你来</h2>
          <p class="text-base text-left text-black">喵呜宇宙成立于2023年3月，是一家专注于AI智能体研发与营销创新应用的前沿科技公司。我们在2025年10月份，供应链开放招募中，喵呜期待优质的供应商以及品牌供应商都能加入我们，把「答案」-最合适的商品交到用户手中。</p>
         <!-- 了解详情按钮 -->
           <button
             class="w-[200px] h-[48px] text-center bg-black text-white hover:bg-miaowu-green hover:text-black rounded-xl drop-shadow-md flex items-center justify-center"
             aria-label="跳转到喵呜品牌供应商管理后台页面"
             @click="goToRecruitment"
           >
             了解详情
           </button>
         </section>
         
        </div>
        <!-- 品牌合作伙伴（移动端也展示） -->
        <MiaowuSelectedBrandPartners />
  </div>
</template>

<script setup lang="ts">
import { img } from '@/utils/assets.js'
const bg = img('contact-bg.png')
const locationImg = img('contact-location.png')
import MiaowuSelectedBrandPartners from '@/components/MiaowuSelectedBrandPartners.vue'
import { requireLoginOrPrompt } from '@/utils/authGuard.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToRecruitment = () => {
  if (!requireLoginOrPrompt()) return
  router.push('/products/supplier-console')
}

</script>
