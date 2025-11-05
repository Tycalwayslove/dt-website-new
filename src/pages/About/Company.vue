<template>
  <div class="min-h-screen bg-white">
    <!-- 桌面端：两列信息 + 图片占位 -->
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- 1. 顶部：左文右图:关于喵呜AI-->
        <section  class="grid grid-cols-2 gap-16 items-center">
          <div v-fade-in-up="{ delay: 500 }">
            <h1 class="text-[56px] font-wendao tracking-tight mb-[30px] text-black">关于喵呜AI</h1>
            <!-- 分割线 -->
            <div class="w-[120px] h-[3px] bg-black mb-[30px]"></div>

            <p class="text-black text-xl font-medium leading-relaxed mb-5">
              喵呜宇宙（深圳）人工智能有限公司
            </p>
            <p class="text-black text-xl leading-normal mb-6">
              喵鸣宇宙成立于2023年3月，是一家专注于AI智能体研发与营销创新应用的前沿科技公司。我们致力于探索人工智能如何更好地服务人类，让每一个人、每一个品牌，都能拥有属于自己的智能体伙伴。
            </p>
            <p class="text-black text-xl leading-normal mb-6">
              秉持着“创造每个人的智能体”的理念，喵鸣宇宙融合AI算法、内容创意与商业场景，打造一个面向未来的智能体商业生态平台。在这里，AI不再只是冷冰冰的技术，而是一种充满温度与智慧的存在--能够理解情感、洞察需求、助力成长。
            </p>
            <p class="text-black text-xl leading-normal mb-6">
              我们相信，AI将重塑人与品牌、人与内容的连接方式。<br></br>喵呜宇宙希望成为这场变革的推动者:<br></br>让科技有灵魂，让品牌有生命，让智能体成为每个人生活与工作的伙伴。
            </p>
            <p class="text-black text-xl leading-normal mb-6">
              携手喵鸣宇宙，一起进入AI时代的全新篇章。
            </p>

          </div>
          <div v-fade-in-up="{ delay: 800 }" class="flex item-center">
            <!-- 图片展示（等比缩放 800x546） -->
            <div class="w-full" style="aspect-ratio: 880 / 560">
              <img :src="img1" alt="关于喵呜AI" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <!-- 2. 左图右文：喵呜AI创始团队简介 -->
        <section  class="grid grid-cols-2 gap-16 items-center">
          <div>
            <div class="grid grid-cols-3 gap-6">
              <!-- 顾问1：喵呜AI CEO / 邱楠 -->
              <div v-fade-in-up="{ delay: 500 }" class="w-full">
                <div class="w-full" style="aspect-ratio: 1 / 1">
                  <img :src="person1" alt="顾问1" class="rounded-2xl w-full h-full object-cover" />
                </div>
                <div class="mt-3 text-center">
                  <p class="text-black text-xl font-semibold leading-relaxed">喵呜AI CEO</p>
                  <p class="text-black text-xl leading-relaxed">邱楠</p>
                </div>
              </div>

              <!-- 顾问2：喵呜AI CTO / 程谦 -->
              <div v-fade-in-up="{ delay: 700 }" class="w-full">
                <div class="w-full" style="aspect-ratio: 1 / 1">
                  <img :src="person2" alt="顾问2" class="rounded-2xl w-full h-full object-cover" />
                </div>
                <div class="mt-3 text-center">
                  <p class="text-black text-xl font-semibold leading-relaxed">喵呜AI CTO</p>
                  <p class="text-black text-xl leading-relaxed">程谦</p>
                </div>
              </div>

              <!-- 顾问3：喵呜AI COO / 陈信君 -->
              <div v-fade-in-up="{ delay: 900 }" class="w-full">
                <div class="w-full" style="aspect-ratio: 1 / 1">
                  <img :src="person3" alt="顾问3" class="rounded-2xl w-full h-full object-cover" />
                </div>
                <div class="mt-3 text-center">
                  <p class="text-black text-xl font-semibold leading-relaxed">喵呜AI COO</p>
                  <p class="text-black text-xl leading-relaxed">陈信君</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 简介 -->
          <div v-fade-in-up="{ delay: 1100 }">
            <h2 class="text-[56px] font-wendao tracking-tight mb-[30px] text-black">喵呜AI创始团队</h2>
            <p class="text-black text-xl leading-normal mb-6">
              喵鸣宇宙(深圳)人工智能有限公司的创始人团队，来自国内最早一批虚拟数字人研发与应用的核心团队。他们深耕于AI算法、虚拟形象生成、智能交互、以及数字人商业化落地等领域，拥有丰富的行业经验与技术积累。
            </p>
            <p class="text-black text-xl leading-normal mb-6">
              团队成员曾主导或参与多个具有行业影响力的虚拟数字人项目，并在人工智能视觉、语音交互、情感建模与智能营销系统等方向取得突破性成果。目前，团队已累计获得96项相关技术专利，涵盖AI驱动的虚拟数字人生成、智能体交互引擎、内容分发算法等多个核心领域。
            </p>

            <p class="text-black text-xl leading-normal mb-6">
              喵呜宇宙的创始人团队不仅具备强大的技术研发能力，更兼具品牌思维与商业化洞察。他们相信，AI的未来不止是智能的进化，更是情感与创造力的延伸。在他们的带领下，喵呜宇宙正以“让每个人都拥有自己的智能体”为使命，打造一个融合科技、创意与人文温度的AI智能体新生态。
            </p>
          </div>
        </section>
        <!-- 3. 供应链入口介绍 -->
        <section class="grid grid-cols-1 gap-16 items-center">
          <div class="w-full min-h-[600px] relative rounded-2xl overflow-hidden text-white p-20" :style="{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }">
            <!-- 内容：文案（左对齐） -->
            <div v-fade-in-up="{ delay: 500 }" class="text-center flex flex-col justify-center items-center">
              <h2 class="text-[56px] font-wendao tracking-tight mb-[30px]">2025年10月喵呜供应链开放入驻</h2>
              <p class=" text-xl leading-normal mb-[30px]">
                用顾问给品牌背书：数字顾问的“专业推荐”相当于一个人格化的广告位，比算法推送更有说服力。知识共建机制：品牌可向平台提供专业内容（产品原理、产品规格、认证证书、使用建议等），被吸收入顾问AI知识库，形成品牌的“知识资产”；品牌知识进入AI知识库，长期可复用。用户洞察回流机制：AI顾问与用户互动的数据，反哺品牌决策，让品牌真正了解“为什么用户买/不买”。用户数据回流助力产品与内容优化。
              </p>
              <!-- 了解详情按钮 -->
              <button
                class="w-[200px] h-[48px] text-center bg-miaowu-green  hover:bg-white hover:text-black text-black rounded-xl drop-shadow-md"
                @click="goToSupplierConsole"
                aria-label="跳转到供应商管理后台页面"
              >
                了解详情
              </button>
            </div>
            <!-- 图片（PC端三图，等间距，按500x360等比例缩放，容器居中） -->
            <div v-fade-in-up="{ delay: 800 }" class="mt-10 w-full">
              <div class="mx-auto w-full max-w-[1600px]">
                <div class="grid grid-cols-3 gap-8 justify-center items-center">
                  <div class="w-full max-w-[500px]" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg02" alt="供应链入口图1" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div class="w-full max-w-[500px]" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg03" alt="供应链入口图2" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div class="w-full max-w-[500px]" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg04" alt="供应链入口图3" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                </div>
              </div>
            </div>
             
          </div>  

        </section>

      </div>
    </div>

    <!-- 移动端：上下布局（图片在上、文字在下） -->
    <div class="container mx-auto px-4 py-10 block lg:hidden">
      <div class="space-y-16">
        <!-- 1. 顶部：上图下文: 关于喵呜AI（移动端） -->
        <section class="space-y-6">
          <!-- 图片 -->
          <div v-fade-in-up="{ delay: 500 }" class="w-full" style="aspect-ratio: 880 / 560">
            <img :src="img1" alt="关于喵呜AI" class="rounded-2xl w-full h-full object-cover" />
          </div>
          <!-- 文字 -->
          <div v-fade-in-up="{ delay: 800 }">
            <h1 class="text-3xl font-wendao tracking-tight mb-4">关于喵呜AI</h1>
            <div class="w-[80px] h-[3px] bg-black mb-4"></div>
            <p class="text-black text-base font-medium leading-relaxed mb-3">喵呜宇宙（深圳）人工智能有限公司</p>
            <p class="text-black text-base leading-relaxed mb-3">
              喵鸣宇宙成立于2023年3月，是一家专注于AI智能体研发与营销创新应用的前沿科技公司。我们致力于探索人工智能如何更好地服务人类，让每一个人、每一个品牌，都能拥有属于自己的智能体伙伴。
            </p>
            <p class="text-black text-base leading-relaxed mb-3">
              秉持着“创造每个人的智能体”的理念，喵鸣宇宙融合AI算法、内容创意与商业场景，打造一个面向未来的智能体商业生态平台。在这里，AI不再只是冷冰冰的技术，而是一种充满温度与智慧的存在--能够理解情感、洞察需求、助力成长。
            </p>
            <p class="text-black text-base leading-relaxed mb-3">
              我们相信，AI将重塑人与品牌、人与内容的连接方式。<br></br>喵呜宇宙希望成为这场变革的推动者:<br></br>让科技有灵魂，让品牌有生命，让智能体成为每个人生活与工作的伙伴。
            </p>
            <p class="text-black text-base leading-relaxed mb-1">携手喵鸣宇宙，一起进入AI时代的全新篇章。</p>
          </div>
        </section>

        <!-- 2. 喵呜AI创始团队简介（移动端：简介在上，顾问们一行显示一个） -->
        <section class="space-y-8">
          <!-- 简介 -->
          <div v-fade-in-up="{ delay: 500 }">
            <h2 class="text-3xl font-wendao tracking-tight mb-4">喵呜AI创始团队</h2>
            <p class="text-black text-base leading-relaxed mb-3">
              喵鸣宇宙(深圳)人工智能有限公司的创始人团队，来自国内最早一批虚拟数字人研发与应用的核心团队。他们深耕于AI算法、虚拟形象生成、智能交互、以及数字人商业化落地等领域，拥有丰富的行业经验与技术积累。
            </p>
            <p class="text-black text-base leading-relaxed mb-3">
              团队成员曾主导或参与多个具有行业影响力的虚拟数字人项目，并在人工智能视觉、语音交互、情感建模与智能营销系统等方向取得突破性成果。目前，团队已累计获得96项相关技术专利，涵盖AI驱动的虚拟数字人生成、智能体交互引擎、内容分发算法等多个核心领域。
            </p>
            <p class="text-black text-base leading-relaxed">喵呜宇宙的创始人团队不仅具备强大的技术研发能力，更兼具品牌思维与商业化洞察。他们相信，AI的未来不止是智能的进化，更是情感与创造力的延伸。在他们的带领下，喵呜宇宙正以“让每个人都拥有自己的智能体”为使命，打造一个融合科技、创意与人文温度的AI智能体新生态。</p>
          </div>
          <!-- 顾问一列一行展示 -->
          <div class="space-y-6">
            <!-- 顾问1 -->
            <div v-fade-in-up="{ delay: 500 }" class="w-full">
              <div class="w-full" style="aspect-ratio: 1 / 1">
                <img :src="person1" alt="顾问1" class="rounded-2xl w-full h-full object-cover" />
              </div>
              <div class="mt-3 text-center">
                <p class="text-black text-base font-semibold leading-relaxed">喵呜AI CEO</p>
                <p class="text-black text-base leading-relaxed">邱楠</p>
              </div>
            </div>
            <!-- 顾问2 -->
            <div v-fade-in-up="{ delay: 500 }" class="w-full">
              <div class="w-full" style="aspect-ratio: 1 / 1">
                <img :src="person2" alt="顾问2" class="rounded-2xl w-full h-full object-cover" />
              </div>
              <div class="mt-3 text-center">
                <p class="text-black text-base font-semibold leading-relaxed">喵呜AI CTO</p>
                <p class="text-black text-base leading-relaxed">程谦</p>
              </div>
            </div>
            <!-- 顾问3 -->
            <div v-fade-in-up="{ delay: 500 }" class="w-full">
              <div class="w-full" style="aspect-ratio: 1 / 1">
                <img :src="person3" alt="顾问3" class="rounded-2xl w-full h-full object-cover" />
              </div>
              <div class="mt-3 text-center">
                <p class="text-black text-base font-semibold leading-relaxed">喵呜AI COO</p>
                <p class="text-black text-base leading-relaxed">陈信君</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 供应链入口介绍（移动端：内容居中，图片一行一个） -->
        <section>
          <div class="w-full relative rounded-2xl overflow-hidden text-white p-6" :style="{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }">
            <!-- 内容：居中 -->
            <div v-fade-in-up="{ delay: 500 }" class="text-center flex flex-col justify-center items-center">
              <h2 class="text-3xl font-wendao tracking-tight mb-4">2025年10月喵呜供应链开放入驻</h2>
              <p class="text-base leading-relaxed mb-4">
                用顾问给品牌背书：数字顾问的“专业推荐”相当于一个人格化的广告位，比算法推送更有说服力。知识共建机制：品牌可向平台提供专业内容（产品原理、产品规格、认证证书、使用建议等），被吸收入顾问AI知识库，形成品牌的“知识资产”；品牌知识进入AI知识库，长期可复用。用户洞察回流机制：AI顾问与用户互动的数据，反哺品牌决策，让品牌真正了解“为什么用户买/不买”。用户数据回流助力产品与内容优化。
              </p>
              <button
                class="w-[160px] h-[40px] text-center bg-miaowu-green hover:bg-white hover:text-black text-black rounded-xl drop-shadow-md"
                @click="goToSupplierConsole"
                aria-label="跳转到供应商管理后台页面"
              >
                了解详情
              </button>
            </div>
            <!-- 图片：一行一个 -->
            <div v-stagger="{delay:1000}" class="mt-6 w-full">
              <div class="mx-auto w-full max-w-[720px]">
                <div class="grid grid-cols-1 gap-6 justify-center items-center">
                  <div class="w-full" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg02" alt="供应链入口图1" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div class="w-full" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg03" alt="供应链入口图2" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div class="w-full" style="aspect-ratio: 500 / 360">
                    <img :src="companyImg04" alt="供应链入口图3" class="w-full h-full rounded-2xl object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import img1 from '@/assets/img/company-img-01.png'
import companyImg02 from '@/assets/img/company-img-02.png'
import companyImg03 from '@/assets/img/company-img-03.png'
import companyImg04 from '@/assets/img/company-img-04.png'
import person1 from '@/assets/img/company-person-01.png'
import person2 from '@/assets/img/company-person-02.png'
import person3 from '@/assets/img/company-person-03.png'
import bg from '@/assets/img/contact-bg.png'
import { requireLoginOrPrompt } from '@/utils/authGuard.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToSupplierConsole = () => {
  if (!requireLoginOrPrompt()) return
  router.push('/products/supplier-console')
}
</script>
