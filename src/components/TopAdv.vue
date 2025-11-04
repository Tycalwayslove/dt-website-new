<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-500 ease-in-out"
    leave-from-class="opacity-100 translate-y-0 max-h-20"
    leave-to-class="opacity-0 -translate-y-full max-h-0"
  >
    <div
      v-if="!isClosed"
      data-top-adv
      class="top-adv-bg w-full relative overflow-hidden h-11 lg:h-[66px] cursor-pointer"
      role="button"
      aria-label="前往喵呜品牌供应商招聘"
      tabindex="0"
      @click="goSuppliers"
      @keydown.enter="goSuppliers"
    >
      <!-- 右侧关闭按钮 -->
      <div class="absolute right-2 lg:right-[5%] top-1/2 -translate-y-1/2 z-10">
        <button
          class="cursor-pointer p-2 rounded-full bg-black/50 hover:bg-black/60 text-white transition-colors duration-200 shadow-sm ring-1 ring-white/40 backdrop-blur-[2px] hover:rotate-90 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          title="关闭广告"
          aria-label="关闭广告"
          @click.stop="handleClose"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200 drop-shadow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 初始状态为未关闭，每次刷新都会显示
const isClosed = ref(false)
const router = useRouter()

// 关闭广告
const handleClose = () => {
  isClosed.value = true
  // 只在当前会话中关闭，刷新后会重新显示
}

// 点击背景跳转到喵呜品牌供应商招聘页面（使用编程式导航）
const goSuppliers = () => {
  // 先隐藏广告，再进行跳转
  isClosed.value = true
  router.push('/cooperation/suppliers')
}
</script>

<style scoped>
/* 顶部广告背景：根据屏幕宽度切换不同图片 */
.top-adv-bg {
  /* 移动端：图片使用 contain，左右可能留白，使用主色 #0237d7 的左右渐变与底色融合 */
  background-color: #0237d7; /* 主色底，避免出现白底突兀 */
  background-image:
    url('../assets/img/top-adv-mobile.png'),
    linear-gradient(
      to right,
      rgba(2, 55, 215, 0.6),
      rgba(2, 55, 215, 0.3) 30%,
      rgba(2, 55, 215, 0.3) 70%,
      rgba(2, 55, 215, 0.6)
    );
  background-size:
    cover,
    100% 100%;
  /* background-size: contain, 100% 100%; */
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
}

/* >= lg 使用大图 */
@media (min-width: 1024px) {
  .top-adv-bg {
    background-image: url('../assets/img/top-adv-lg.png');
    background-size: cover; /* 大屏填充容器以获得完整背景效果 */
    background-position: center;
  }
}

/* >= 3xl 使用超大图 */
@media (min-width: 1920px) {
  .top-adv-bg {
    background-image: url('../assets/img/top-adv-3xl.png');
    background-size: cover;
  }
}
</style>
