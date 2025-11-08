<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- PC端：背景图容器（宽度自适应，高度480） -->
        <section
          v-fade-in-up
          class="w-full h-[480px] relative rounded-2xl overflow-hidden"
          :style="{
            backgroundImage: `url(${img01})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <!-- 内容：居中对齐，左图+右文案 -->
          <div class="absolute inset-0">
            <div class="h-full mx-auto flex items-center">
              <!-- 左侧：靠近底部的绝对定位图片 -->
              <div class="relative w-[460px] h-full">
                <img
                  v-fade-in-up="{ delay: 500 }"
                  :src="img02"
                  alt="App 左侧展示图"
                  class="hidden lg:block absolute bottom-0 left-0 w-[460px] h-auto object-cover rounded-xl"
                />
              </div>

              <!-- 右侧：文案区域（垂直居中，与左侧有间距） -->
              <div v-stagger="{delay:500}" class="flex-1 flex flex-col justify-center ml-10 mr-20 space-y-5">
                <!-- 三行文案 -->
                <h2 class="text-3xl font-wendao text-white drop-shadow-md">喵呜App</h2>
                <p class="text-xl text-white/90 mt-3 drop-shadow-md">AI 智能体，就用喵呜AI。</p>
                <p class="text-base text-white/80 mt-2 drop-shadow-md">
                  打造个人AI智能体，用A!技术创造销售新篇章!让你对用户的服务随时都在，让你成为品牌AI智能体;喵呜AI智能体，您
                  的高效销售方式只需一张照片，5分钟即可生成您的专属A1智能体，有货没货都能赚，省时省力，一键解锁私欲财富密码
                </p>

                <!-- 图标横向排列：icon01 - icon05 -->
                <div class="flex items-center gap-10 pt-5">
                  <div class="flex flex-col items-center">
                    <img :src="icon01" alt="功能图标1" class="w-8 h-8" />
                    <span class="mt-2 text-[#FFFFFFCC] text-xs drop-shadow-md">智能体</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <img :src="icon02" alt="功能图标2" class="w-8 h-8" />
                    <span class="mt-2 text-[#FFFFFFCC] text-xs drop-shadow-md">知识库</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <img :src="icon03" alt="功能图标3" class="w-8 h-8" />
                    <span class="mt-2 text-[#FFFFFFCC] text-xs drop-shadow-md">商城</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <img :src="icon04" alt="功能图标4" class="w-8 h-8" />
                    <span class="mt-2 text-[#FFFFFFCC] text-xs drop-shadow-md">营销工具</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <img :src="icon05" alt="功能图标5" class="w-8 h-8" />
                    <span class="mt-2 text-[#FFFFFFCC] text-xs drop-shadow-md">一键分享</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 下载app展示 -->
        <section class="w-full relative">
          <div v-fade-in-up="{ delay: 500 }" class="space-y-5 text-center color-black">
            <h3 class="font-wendao text-[56px] text-black">下载app展示</h3>
            <p class="text-xl text-black">
              5分钟快速生成另一个你,聊天对话客服解答产品推荐，统统帮你搞定;<br />
              用AI连接世界，人人都可拥有自己的AI智能体,AI助手24小时智能对话交流，帮你介绍产品，解答客户疑问
            </p>
          </div>
          <!-- 下载地址展示区域 -->
          <div v-stagger="{delay:1000}" class="relative w-full mt-10">
            <div class="flex justify-center gap-8 mx-auto">
              <!-- 卡片：微信扫码下载 -->
              <div
                class="bg-white/95 rounded-2xl border border-black px-6 text-center w-full max-w-[460px] min-w-[300px] py-[77px]"
              >
                <div class="flex justify-center">
                  <img
                    :src="img03"
                    alt="微信扫码下载二维码"
                    class="w-[280px] max-w-[280px] min-w-[100px] h-[280px] max-h-[280px] min-h-[100px] rounded-lg object-cover"
                  />
                </div>
                <h4 class="text-lg font-semibold text-black mt-10 mb-2 text-4xl text-black">
                  客户端下载
                </h4>
                <p class="text-xl text-black">微信扫码立即下载手机app</p>
              </div>

              <!-- 卡片：iOS 下载方式 -->
              <div
                class="bg-white/95 rounded-2xl border border-black px-6 text-center w-full max-w-[460px] min-w-[300px] py-[77px] flex flex-col justify-center"
              >
                <div class="flex justify-center">
                  <img
                    :src="img04"
                    alt="ios下载二维码"
                    class="w-[150px] max-w-[150px] min-w-[100px] h-[150px] max-h-[150px] min-h-[100px] rounded-lg object-cover"
                  />
                </div>
                <h4 class="text-lg font-semibold text-black mt-10 mb-2 text-4xl text-black">
                  ios下载
                </h4>
                <a
                  href="https://apps.apple.com/cn/app/%E5%96%B5%E5%91%9Cai/id6462773304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="前往 App Store 下载喵呜AI"
                  class="hover-underline-group text-xl text-black mx-auto"
                  title="前往 App Store 下载"
                >
                  <span class="hover-underline">前往 App Store 下载 >>>></span>
                </a>
              </div>

              <!-- 卡片：安卓 下载方式 -->
              <div
                class="bg-white/95 rounded-2xl border border-black px-6 text-center w-full max-w-[460px] min-w-[300px] py-[77px] flex flex-col justify-center"
              >
                <div class="flex justify-center">
                  <img
                    :src="img05"
                    alt="安卓下载二维码"
                    class="w-[120px] h-[150px] rounded-lg object-cover"
                  />
                </div>
                <h4 class="text-lg font-semibold text-black mt-10 mb-2 text-4xl text-black">
                  安卓下载
                </h4>
                <div class="mt-2 flex flex-col items-center space-y-2">
                  <a
                    href="https://app.cdo.oppomobile.com/home/detail?app_id=31451501"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="前往 OPPO 应用市场下载喵呜"
                    class="hover-underline-group text-xl text-black"
                    title="OPPO 应用市场下载"
                  >
                    <span class="hover-underline">OPPO应用市场下载 >>>></span>
                  </a>
                  <a
                    href="https://wap.pp.cn/app_BycxLcx5eUze/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="前往 PP 助手下载喵呜"
                    class="hover-underline-group text-xl text-black"
                    title="PP 助手下载"
                  >
                    <span class="hover-underline">PP助手下载 >>>></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 移动端布局：仅在小屏显示 -->
    <div class="container mx-auto block lg:hidden px-4 py-8">
      <!-- 移动端背景图：全屏自适应，高度300px -->
      <div v-fade-in-up="{ delay: 500 }" class="w-full">
        <img :src="img01" alt="喵呜App 背景图" class="w-full h-[300px] object-cover rounded-2xl" />
      </div>

      <!-- 文案区域：置于背景图下方，间距适中 -->
      <div v-fade-in-up="{ delay: 500 }" class="mt-6 space-y-4 text-center">
        <h2 class="text-2xl font-wendao text-black">喵呜App</h2>
        <p class="text-base text-gray-700">AI 智能体，就用喵呜AI。</p>
        <p class="text-sm text-gray-600">
          打造个人AI智能体，用A!技术创造销售新篇章!让你对用户的服务随时都在，让你成为品牌AI智能体;喵呜AI智能体，您
          的高效销售方式只需一张照片，5分钟即可生成您的专属A1智能体，有货没货都能赚，省时省力，一键解锁私欲财富密码
        </p>
        <!-- 图标横向排列：居中，适配小屏尺寸 -->
        <div class="mt-4 flex justify-center gap-6 bg-black/95 p-4 rounded-2xl">
          <div class="flex flex-col items-center">
            <img :src="icon01" alt="功能图标1" class="w-6 h-6 text-white" />
            <span class="mt-2 text-gray-700 text-xs text-white">智能体</span>
          </div>
          <div class="flex flex-col items-center">
            <img :src="icon02" alt="功能图标2" class="w-6 h-6 text-white" />
            <span class="mt-2 text-gray-700 text-xs text-white">知识库</span>   
          </div>
          <div class="flex flex-col items-center">
            <img :src="icon03" alt="功能图标3" class="w-6 h-6 text-white" />
            <span class="mt-2 text-gray-700 text-xs text-white">商城</span>
          </div>
          <div class="flex flex-col items-center">
            <img :src="icon04" alt="功能图标4" class="w-6 h-6 text-white" />
            <span class="mt-2 text-gray-700 text-xs text-white">营销工具</span>
          </div>
          <div class="flex flex-col items-center">
            <img :src="icon05" alt="功能图标5" class="w-6 h-6 text-white" />
            <span class="mt-2 text-gray-700 text-xs text-white">一键分享</span>
          </div>
        </div>
      </div>

      <!-- 下载app展示（移动端）：文本居中，卡片竖排 -->
      <div v-fade-in-up="{ delay: 500 }" class="mt-10">
        <div class="text-center space-y-3">
          <h3 class="text-2xl font-wendao text-black">下载app展示</h3>
          <p class="text-sm text-gray-700 leading-8">
            5分钟快速生成另一个你,<br></br>聊天对话客服解答产品推荐，统统帮你搞定;<br />
            用AI连接世界，人人都可拥有自己的AI智能体,<br></br>AI助手24小时智能对话交流，<br></br>帮你介绍产品，解答客户疑问
          </p>
        </div>
        <!-- 卡片区域：从一行变为3行；小于sm为100%宽；sm及以上最大460px，居中 -->
        <div class="mt-6 space-y-6">
          <!-- 微信扫码下载 -->
          <div
            class="bg-white/95 rounded-2xl border border-black px-4 py-6 w-full sm:max-w-[460px] mx-auto text-center"
          >
            <div class="flex justify-center">
              <img
                :src="img03"
                alt="微信扫码下载二维码"
                class="w-40 h-40 rounded-lg object-cover"
              />
            </div>
            <h4 class="text-lg font-semibold text-black mt-6 mb-2">客户端下载</h4>
            <p class="text-sm text-gray-700">微信扫码立即下载手机app</p>
          </div>

          <!-- iOS 下载方式 -->
          <div
            v-show="platform === 'unknown' || platform === 'ios'"
            class="bg-white/95 rounded-2xl border border-black px-4 py-6 w-full sm:max-w-[460px] mx-auto text-center"
          >
            <div class="flex justify-center">
              <img :src="img04" alt="iOS 下载图标" class="w-20 h-20 rounded-lg object-cover" />
            </div>
            <h4 class="text-lg font-semibold text-black mt-6 mb-2">iOS 下载</h4>
            <a
              href="https://apps.apple.com/cn/app/%E5%96%B5%E5%91%9Cai/id6462773304"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="前往 App Store 下载喵呜AI"
              class="text-sm text-miaowu-green underline underline-offset-4 hover:text-miaowu-green/80"
              title="前往 App Store 下载"
            >
              前往 App Store 下载 →
            </a>
          </div>

          <!-- 安卓 下载方式 -->
          <div
            v-show="platform === 'unknown' || platform === 'android'"
            class="bg-white/95 rounded-2xl border border-black px-4 py-6 w-full sm:max-w-[460px] mx-auto text-center"
          >
            <div class="flex justify-center">
              <img :src="img05" alt="安卓 下载图标" class="w-20 h-30 rounded-lg object-cover" />
            </div>
            <h4 class="text-lg font-semibold text-black mt-6 mb-2">安卓下载</h4>
            <div class="flex flex-col items-center space-y-2">
              <a
                href="https://app.cdo.oppomobile.com/home/detail?app_id=31451501"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往 OPPO 应用市场下载喵呜"
                class="text-sm text-black underline underline-offset-4"
                title="OPPO 应用市场下载"
              >
                OPPO应用市场下载 >>>>
              </a>
              <a
                href="https://wap.pp.cn/app_BycxLcx5eUze/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="前往 PP 助手下载喵呜"
                class="text-sm text-black underline underline-offset-4 "
                title="PP 助手下载"
              >
                PP助手下载 >>>>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面：喵呜AI App（静态资源模块化导入）
import img01 from '@/assets/img/product-app-01.png'
import img02 from '@/assets/img/product-app-02.png'
import img03 from '@/assets/img/product-app-03.png'
import img04 from '@/assets/img/product-app-04.png'
import img05 from '@/assets/img/product-app-05.png'
import icon01 from '@/assets/img/product-app-icon-01.png'
import icon02 from '@/assets/img/product-app-icon-02.png'
import icon03 from '@/assets/img/product-app-icon-03.png'
import icon04 from '@/assets/img/product-app-icon-04.png'
import icon05 from '@/assets/img/product-app-icon-05.png'
import { onMounted, ref } from 'vue'

// 移动端机型检测：ios / android / unknown
const platform = ref<'ios' | 'android' | 'unknown'>('unknown')

onMounted(() => {
  try {
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera || ''
    if (/android/i.test(ua)) {
      platform.value = 'android'
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      platform.value = 'ios'
    } else {
      platform.value = 'unknown'
    }
  } catch (_) {
    platform.value = 'unknown'
  }
})
</script>
