<template>
  <div class="bg-white">
    <!-- pc端展示 -->
    <div v-fade-in-up="{ delay: 500 }" class="container mx-auto px-20 lg:px-20 pt-20 hidden lg:block">
      <div class="">
        <section class="flex space-x-10 items-center">
          <!-- 标题 -->
          <h2 class="text-[56px] font-wendao text-black flex-shrink-0">供应商管理后台</h2>
          <!-- 描述 -->
          <p class="text-black">
            让「答案」顾问式电商走进千家万户|让
            喵呜AI成为每一个用户<br></br>的专业私人购物顾问|让电商回归「信任与理解」的本质。
          </p>
        </section>
        <!-- 分割线 -->
        <div class="w-full h-[3px] bg-black"></div>
        <!-- 卡片 -->
        <section class="w-full relative flex my-10 space-x-10 flex items-center justify-between">
          <!-- 左侧卡片-30% -->
          <div
            class="w-[30%] h-[360px] min-w-[430px] flex items-center justify-center rounded-2xl relative"
            :style="{
              backgroundImage: `url(${img1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="w-full h-full flex flex-1 flex-row items-center relative justify-center">
              <div class="w-[160px] h-[160px] flex items-center justify-center">
                <img class="w-[140px] h-[140px] object-contain" :src="img3" alt="" />
              </div>
              <div class="flex-1 ml-2 leading-[50px] max-w-[230px]">
                <p class="text-[36px] text-white">喵呜AI供应商</p>
                <p class="text-[36px] text-white">平台入驻规则</p>
              </div>
            </div>
            <div class="detail-header">
              <a
                class="detail-button"
                href="https://v05ctaei9gn.feishu.cn/wiki/ECXswio4vi9ja2kN0AUcMISDnqd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="查询入驻规则（新开页）"
              >
                <img class="w-5 h-5 mr-2" :src="img5" alt="" />
                <div class="hover-underline-group flex items-center">
                  <span class="hover-underline leading-[30px] inline-block">
                    查询入驻规则
                  </span>
                </div>
              </a>
            </div>
          </div>
          <!-- 右侧卡片-70% -->
          <div
            class="w-[70%] h-[360px] min-w-[594px] flex items-center justify-center rounded-2xl relative"
            :style="{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }"
          >
            <div class="w-full h-full flex flex-row items-center relative justify-center">
              <div class="w-[160px] h-[160px] flex items-center justify-center">
                <img class="w-[140px] h-[140px] object-contain" :src="img4" alt="" />
              </div>
              <div class="flex-1 ml-2 leading-[50px] max-w-[230px]">
                <p class="text-[36px] text-white">喵呜AI供应商</p>
                <p class="text-[36px] text-white">商品管理</p>
              </div>
            </div>
            <div class="detail-header">
              <div class="detail-button hover-underline cursor-pointer" @click="toMall">
                <img class="w-5 h-5 mr-2" :src="img6" alt="" />
                  <div class="hover-underline-group flex items-center">
                  <span class="hover-underline leading-[30px] inline-block">
                    上传管理商品
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 移动端展示 -->
    <div v-fade-in-up="{ delay: 500 }" class="block lg:hidden px-6 pt-10">
      <!-- 标题、描述、分割线各占一行，间距适中 -->
      <section class="space-y-4">
        <h2 class="text-2xl font-wendao text-black">供应商管理后台</h2>
        <p class="text-sm text-black leading-7">
          让「答案」顾问式电商走进千家万户|让
          喵呜AI成为每一个用户的专业私人购物顾问|让电商回归「信任与理解」的本质。
        </p>
        <div class="w-full h-[2px] bg-black/80"></div>
      </section>

      <!-- 卡片：每行一个，纵向排列 -->
      <section class="mt-6 space-y-6">
        <!-- 左侧卡片（移动端全宽） -->
        <div
          class="w-full h-[260px] flex items-center justify-center rounded-2xl relative"
          :style="{
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div class="w-full h-full flex flex-row items-center justify-center">
            <div class="w-[120px] h-[120px] flex items-center justify-center">
              <img class="w-[100px] h-[100px] object-contain" :src="img3" alt="" />
            </div>
            <div class="flex-1 ml-2 leading-[36px] max-w-[240px] text-white">
              <p class="text-[24px] text-white">喵呜AI供应商</p>
              <p class="text-[24px] text-white">平台入驻规则</p>
            </div>
          </div>
          <div class="detail-header-mobile">
            <a
              class="detail-button-mobile"
              href="https://v05ctaei9gn.feishu.cn/wiki/ECXswio4vi9ja2kN0AUcMISDnqd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="查询入驻规则（新开页）"
            >
              <img class="w-5 h-5 mr-2" :src="img5" alt="" />
              查询入驻规则
            </a>
          </div>
        </div>

        <!-- 右侧卡片（移动端全宽） -->
        <div
          class="w-full h-[260px] flex items-center justify-center rounded-2xl relative"
          :style="{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div class="w-full h-full flex flex-row items-center justify-center">
            <div class="w-[120px] h-[120px] flex items中心 justify-center">
              <img class="w-[100px] h-[100px] object-contain" :src="img4" alt="" />
            </div>
            <div class="flex-1 ml-2 leading-[36px] max-w-[240px] text-white">
              <p class="text-[24px] text白">喵呜AI供应商</p>
              <p class="text-[24px] text白">商品管理</p>
            </div>
          </div>
          <div class="detail-header-mobile">
            <div class="detail-button-mobile" @click="toMall">
              <img class="w-5 h-5 mr-2" :src="img6" alt="" />
              上传管理商品
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面：供应商管理后台（本地静态资源模块化导入）
import img1 from '@/assets/img/supplier-console-01.png'
import img2 from '@/assets/img/supplier-console-02.png'
import img3 from '@/assets/img/supplier-console-03.png'
import img4 from '@/assets/img/supplier-console-04.png'
import img5 from '@/assets/img/supplier-console-05.png'
import img6 from '@/assets/img/supplier-console-06.png'
import { requireLoginOrPrompt } from '@/utils/authGuard.js'
import { useMallRedirect } from '@/utils/mallNavigation.js'

const { redirectToMall } = useMallRedirect()
const toMall = async () => {
  if (!requireLoginOrPrompt()) return
  await redirectToMall()
}
</script>

<style scoped>
.detail-header {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.detail-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 98px;
  line-height: 98px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #9bff2b;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  color: #000;
}
.detail-button::before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 24px solid #9bff2b;
  border-bottom: 45px solid #9bff2b;
  border-left: 24px solid transparent;
  border-top: 45px solid transparent;
  left: -46px;
}
.detail-header-mobile {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.detail-button-mobile {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: #9bff2b;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: #000;
  text-decoration: underline;
}
.detail-button-mobile::before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 6px solid #9bff2b;
  border-bottom: 17px solid #9bff2b;
  border-left: 6px solid transparent;
  border-top: 17px solid transparent;
  left: -12px;
}
</style>
