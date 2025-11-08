<template>
  <section class="container py-10 md:py-16 lg:py-20">
    <!-- 移动端布局：上方文字，下方卡片信息 -->
    <div class="lg:hidden flex flex-col">
      <h2
        v-fade-in-up="{ delay: 300 }"
        class="text-4xl text-left color-black mb-5 font-wendao text-black"
      >
        喵呜AI招募
      </h2>
      <p
        v-fade-in-up="{ delay: 300 }"
        class="text-base leading-relaxed text-left color-black text-black"
      >
        让「答案」顾问式电商走进千家万户让
        喵呜A成为每一个用户的专业私人购物顾问|让电商回归「信任与理解」的本质。
      </p>
      <!-- 了解详情按钮(暂时隐藏) -->
      <button
        v-fade-in-up="{ delay: 300 }"
        class="bg-black text-white w-[60%] max-w-[200px] px-4 py-3 my-5 rounded-md"
      >
        了解详情
      </button>
      <!-- 一根3px #000的分割线 -->
      <div v-fade-in-up="{ delay: 300 }" class="w-full h-[3px] bg-black"></div>
      <!-- 卡片信息 -->
      <div v-stagger="{ delay: 500 }" class="flex flex-col gap-4 mt-10">
        <div
          v-for="item in recruitmentList"
          :key="item.id"
          class="relative w-full aspect-[10/6] rounded-2xl overflow-hidden"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          <h3
            class="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {{ item.title }}
          </h3>
          <div class="detail-header">
            <span class="detail-button" role="button" @click="goDetail(item)">查看详情 >>>></span>
          </div>
        </div>
      </div>
    </div>
    <!-- pc端布局：上方文字，下方卡片信息一行展示3个卡片 -->
    <div class="hidden lg:flex flex-col gap-4">
      <!-- 文字区 -->
      <div class="flex flex-row gap-4 w-full flex-1 items-center">
        <h2
          v-fade-in-up="{ delay: 300 }"
          class="text-4xl text-left color-black font-wendao text-black"
        >
          喵呜AI招募
        </h2>
        <div class="flex-1">
          <p
            v-fade-in-left="{ delay: 300 }"
            class="text-xl leading-relaxed text-left color-black ml-10 max-w-[567px] text-black"
          >
            让「答案」顾问式电商走进千家万户让
            喵呜A成为每一个用户的专业私人购物顾问|让电商回归「信任与理解」的本质。
          </p>
        </div>
        <!-- 了解详情按钮 (暂时隐藏) -->
        <!-- <button class="bg-black text-white w-[60%] max-w-[200px] px-4 py-3 rounded-md">
          了解详情
        </button> -->
      </div>
      <!-- 一根3px #000的分割线 -->
      <div v-fade-in-up="{ delay: 300 }" class="w-full h-[3px] bg-black"></div>
      <!-- 卡片区 -->
      <div class="flex flex-row gap-4 mt-7">
        <div
          v-fade-in-up="{ delay: 500 }"
          v-for="item in recruitmentList"
          :key="item.id"
          class="relative w-full aspect-[10/6] rounded-2xl overflow-hidden"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          <h3
            class="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {{ item.title }}
          </h3>
          <div class="detail-header">
            <span class="detail-button" role="button" @click="goDetail(item)">查看详情 >>>></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 移除 img() 助手，改用静态模块导入
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import rec01 from '@/assets/img/recruitment-01.png'
import rec02 from '@/assets/img/recruitment-02.png'
import rec03 from '@/assets/img/recruitment-03.png'

// 招募信息接口
interface RecruitmentItem {
  id: number
  title: string
  image: string
  to: string
}

// 招募数据
const recruitmentList = ref<RecruitmentItem[]>([
  {
    id: 1,
    title: '「品牌供应商招募」',
    image: rec01,
    to: '/cooperation/suppliers',
  },
  {
    id: 2,
    title: '「喵呜AI卖手招募」',
    image: rec02,
    to: '/cooperation/sellers',
  },
  {
    id: 3,
    title: '「商务合作」',
    image: rec03,
    to: '/cooperation/partners',
  },
])

const router = useRouter()
const goDetail = (item: RecruitmentItem) => {
  if (item.to) router.push(item.to)
}
</script>

<style scoped>
/* 组件样式 */
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
  display: inline-block;
  width: 194px;
  height: 62px;
  line-height: 62px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: #000000a8;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  color: #9bff2bff;
  text-decoration: underline;
  cursor: pointer;
}
.detail-button:hover {
  color: #ffffff;
}
.detail-button::before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 8px solid #000000a8;
  border-bottom: 25px solid #000000a8;
  border-left: 8px solid transparent;
  border-top: 25px solid transparent;
  left: -16px;
}
</style>
import rec01 from '@/assets/img/recruitment-01.png'
import rec02 from '@/assets/img/recruitment-02.png'
import rec03 from '@/assets/img/recruitment-03.png'
