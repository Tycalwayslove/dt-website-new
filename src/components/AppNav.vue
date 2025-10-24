<template>
  <header class="sticky top-0 z-50 bg-black">
    <nav class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- 移动端：汉堡菜单/关闭按钮（左侧） -->
      <button
        class="lg:hidden p-2 text-white hover:text-miaowu-green transition-all duration-300"
        @click="open = !open"
      >
        <!-- 汉堡图标 -->
        <svg
          v-if="!open"
          class="w-6 h-6 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <!-- 关闭图标 -->
        <svg
          v-else
          class="w-6 h-6 transition-transform duration-300 rotate-90"
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

      <!-- Logo（PC端左侧，移动端居中） -->
      <RouterLink to="/" class="flex items-center lg:mr-auto">
        <img :src="logoUrl" alt="喵呜AI Logo" class="h-8 lg:h-10 w-auto" />
      </RouterLink>

      <!-- 中间：桌面导航（仅PC端显示） -->
      <ul class="hidden lg:flex items-center space-x-8 h-full">
        <li
          v-for="item in navItems"
          :key="item.to"
          class="relative nav-item-wrapper h-full flex items-center"
          @mouseenter="handleMouseEnter(item.to)"
          @mouseleave="handleMouseLeave"
        >
          <!-- 一级导航 -->
          <RouterLink
            v-if="!item.children"
            :to="item.to"
            class="text-white hover:text-miaowu-green transition-colors duration-200 relative block px-6 h-full flex items-center"
            :class="{ 'text-miaowu-green': isActive(item.to) }"
          >
            {{ item.label }}
            <!-- 选中时的下划线 -->
            <div
              v-if="isActive(item.to)"
              class="absolute bottom-0 left-0 w-full h-3 bg-miaowu-green animate-underline-expand"
            ></div>
          </RouterLink>

          <!-- 有子菜单的导航 -->
          <div
            v-else
            class="text-white hover:text-miaowu-green transition-colors duration-200 relative cursor-pointer py-2"
            :class="{ 'text-miaowu-green': isActiveParent(item) }"
          >
            <span class="flex items-center space-x-1">
              <span>{{ item.label }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': activeDropdown === item.to }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
            <!-- 选中时的下划线 -->
            <div
              v-if="isActiveParent(item)"
              class="absolute -bottom-1 left-0 w-full h-3 bg-miaowu-green animate-underline-expand"
            ></div>
          </div>

          <!-- 二级导航下拉菜单 -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div
              v-if="item.children && item.children.length > 0 && activeDropdown === item.to"
              class="absolute top-full left-0 z-50"
              @mouseenter="handleDropdownEnter"
              @mouseleave="handleMouseLeave"
            >
              <div
                class="min-w-[236px] bg-gray-900 shadow-2xl rounded-b-lg overflow-hidden border border-gray-800"
              >
                <ul class="px-7">
                  <li
                    v-for="(child, idxx) in item.children"
                    :key="child.to"
                    :class="[
                      'flex',
                      'items-center',
                      'justify-center',
                      'w-full',
                      item.children.length > idxx + 1 ? 'border-line' : 'border-b-0',
                    ]"
                  >
                    <RouterLink
                      :to="child.to"
                      class="block w-full h-[60px] flex items-center justify-center text-gray-300 hover:text-miaowu-green transition-all duration-200 relative group/item"
                      :class="{ ' text-white': isActive(child.to) }"
                    >
                      <span class="relative z-10">{{ child.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </li>
      </ul>

      <!-- 右侧：下载按钮 -->
      <!-- PC端：完整按钮 -->
      <button
        class="hidden lg:flex items-center justify-center gap-2 bg-miaowu-green text-white px-[36px] py-[12px] rounded-2xl text-base hover:bg-white hover:text-black transition-colors duration-200"
      >
        <img :src="iconDownloadUrl" alt="下载喵呜App" class="w-6 h-6" />
        下载喵呜App
      </button>

      <!-- 移动端：仅图标按钮 -->
      <button
        class="lg:hidden flex items-center justify-center bg-miaowu-green text-white p-3 rounded-2xl hover:bg-green-600 transition-colors duration-200"
      >
        <img :src="iconDownloadUrl" alt="下载" class="w-5 h-5" />
      </button>
    </nav>

    <!-- 移动端菜单容器（从导航栏下方开始） -->
    <div class="lg:hidden relative">
      <!-- 蒙层（在导航栏下方） -->
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="fixed inset-x-0 top-20 bottom-0 z-40 bg-black/60 backdrop-blur-sm"
          @click="open = false"
        ></div>
      </transition>

      <!-- 移动端菜单面板 -->
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="open"
          class="fixed left-0 top-20 bottom-0 w-3/5 z-50 bg-black shadow-2xl"
          @click.stop
        >
          <div class="h-full overflow-y-auto px-6 py-8">
            <!-- 导航菜单 -->
            <ul class="space-y-0">
              <li v-for="item in navItems" :key="item.to" class="border-b border-white/10">
                <!-- 无子菜单的导航 -->
                <RouterLink
                  v-if="!item.children"
                  :to="item.to"
                  class="block py-5 text-lg font-medium text-white hover:text-miaowu-green transition-colors duration-200"
                  :class="{ 'text-miaowu-green': isActive(item.to) }"
                  @click="open = false"
                >
                  {{ item.label }}
                </RouterLink>

                <!-- 有子菜单的导航 -->
                <div v-else>
                  <button
                    class="w-full flex items-center justify-between py-5 text-lg font-medium text-white hover:text-miaowu-green transition-colors duration-200"
                    :class="{ 'text-miaowu-green': isActiveParent(item) }"
                    @click="toggleMobileSubmenu(item.to)"
                  >
                    <span>{{ item.label }}</span>
                    <svg
                      class="w-5 h-5 transition-transform duration-200"
                      :class="{ 'rotate-180': openMobileSubmenu === item.to }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  <!-- 二级菜单 -->
                  <ul
                    v-show="openMobileSubmenu === item.to"
                    class="pb-4 space-y-0 bg-white/5 -mx-6 px-6"
                  >
                    <li
                      v-for="(child, idx) in item.children"
                      :key="child.to"
                      :class="{ 'border-b border-white/10': idx < item.children.length - 1 }"
                    >
                      <RouterLink
                        :to="child.to"
                        class="block py-4 pl-4 text-base text-white/70 hover:text-miaowu-green transition-colors duration-200"
                        :class="{ 'text-miaowu-green': isActive(child.to) }"
                        @click="open = false"
                      >
                        {{ child.label }}
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <!-- 底部链接 -->
            <div
              class="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-miaowu-green px-4"
            >
              <a href="#" class="hover:text-white transition-colors">帮助中心</a>
              <span class="text-white/30">|</span>
              <a href="#" class="hover:text-white transition-colors">隐私协议</a>
              <span class="text-white/30">|</span>
              <a href="#" class="hover:text-white transition-colors">服务条款</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import iconDownload from '@/assets/img/download.png'
import logoLight from '@/assets/img/logo-light.png'
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Logo URL
const logoUrl = logoLight
const iconDownloadUrl = iconDownload

// 定义导航项类型
interface NavItem {
  to: string
  label: string
  children?: NavItem[]
}

const open = ref(false)
const openMobileSubmenu = ref<string | null>(null)
const activeDropdown = ref<string | null>(null)
const route = useRoute()

// 延迟关闭定时器
let closeTimer: number | null = null

// 监听路由变化，关闭移动端菜单
watchEffect(() => {
  route.path
  open.value = false
  openMobileSubmenu.value = null
  activeDropdown.value = null
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
})

// 检查当前路由是否激活
const isActive = (path: string) => {
  return route.path === path
}

// 检查父级导航是否激活（子路由有一个激活即可）
const isActiveParent = (item: NavItem) => {
  if (!item.children) return false
  return item.children.some(
    (child) => route.path === child.to || route.path.startsWith(child.to + '/')
  )
}

// 切换移动端子菜单
const toggleMobileSubmenu = (path: string) => {
  openMobileSubmenu.value = openMobileSubmenu.value === path ? null : path
}

// 鼠标进入导航项
const handleMouseEnter = (path: string) => {
  // 清除延迟关闭定时器
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  activeDropdown.value = path
}

// 鼠标进入下拉菜单
const handleDropdownEnter = () => {
  // 清除延迟关闭定时器
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

// 鼠标离开导航项
const handleMouseLeave = () => {
  // 延迟150ms关闭，给用户时间移动到下拉菜单
  // closeTimer = window.setTimeout(() => {
  //   activeDropdown.value = null
  //   closeTimer = null
  // }, 150)
}

// 导航菜单配置（可配置的路由导航）
const navItems: NavItem[] = [
  {
    to: '/',
    label: '首页',
  },
  {
    to: '/business',
    label: '喵呜业务',
    children: [
      { to: '/business/ai-assistant', label: 'AI顾问服务' },
      { to: '/business/mini-program', label: '小程序开发' },
      { to: '/business/supply-chain', label: '供应链管理' },
      { to: '/business/digital-human', label: '数字人服务' },
    ],
  },
  {
    to: '/recruitment',
    label: '喵呜招聘',
    children: [
      { to: '/recruitment/positions', label: '招聘职位' },
      { to: '/recruitment/culture', label: '企业文化' },
      { to: '/recruitment/benefits', label: '福利待遇' },
    ],
  },
  {
    to: '/about',
    label: '关于我们',
  },
  {
    to: '/contact',
    label: '联系我们',
  },
]
</script>

<style scoped>
.border-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
