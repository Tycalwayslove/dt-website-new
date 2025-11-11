<template>
  <header class="sticky top-0 z-50 bg-black">
    <nav class="container mx-auto px-4 h-20 flex items-center">
      <!-- 移动端：汉堡菜单/关闭按钮（左侧） -->
      <button
        class="lg:hidden p-2 text-white hover:text-miaowu-green transition-all duration-300 group relative overflow-hidden active:scale-95"
        @click="toggleMobileMenu"
      >
        <!-- 汉堡菜单图标容器 -->
        <div class="relative w-6 h-6">
          <!-- 汉堡线条 -->
          <div class="absolute inset-0 flex flex-col justify-center space-y-1">
            <!-- 第一根线 -->
            <div
              class="w-full h-0.5 bg-current transition-all duration-300 ease-in-out origin-center"
              :class="open ? 'rotate-45 translate-y-1.5' : 'rotate-0 translate-y-0'"
              :style="{ 'transition-delay': open ? '0ms' : '150ms' }"
            ></div>
            <!-- 第二根线 -->
            <div
              class="w-full h-0.5 bg-current transition-all duration-200 ease-in-out origin-center"
              :class="open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'"
              :style="{ 'transition-delay': open ? '75ms' : '75ms' }"
            ></div>
            <!-- 第三根线 -->
            <div
              class="w-full h-0.5 bg-current transition-all duration-300 ease-in-out origin-center"
              :class="open ? '-rotate-45 -translate-y-1.5' : 'rotate-0 translate-y-0'"
              :style="{ 'transition-delay': open ? '0ms' : '150ms' }"
            ></div>
          </div>

          <!-- 添加一个微妙的背景效果 -->
          <div
            class="absolute inset-0 rounded-full transition-all duration-300 ease-in-out"
            :class="open ? 'bg-miaowu-green/10 scale-110' : 'bg-transparent scale-100'"
          ></div>
        </div>
      </button>

      <!-- Logo（移动端居中，PC端左侧） -->
      <RouterLink
        to="/"
        class="flex items-center absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none lg:translate-x-0"
      >
        <img :src="logoUrl" alt="喵呜AI Logo" class="h-8 lg:h-10 w-auto" />
      </RouterLink>

      <!-- 中间：桌面导航（仅PC端显示，居中） -->
      <ul class="hidden lg:flex items-center space-x-8 h-full flex-1 justify-center">
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
            class="hover:text-miaowu-green transition-colors duration-200 relative block px-6 h-full flex items-center"
            :class="isActive(item.to) ? 'text-miaowu-green' : 'text-white'"
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
              class="absolute -bottom-6 left-0 w-full h-[10px] bg-miaowu-green animate-underline-expand"
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
                      :class="{ 'text-miaowu-green': isActive(child.to) }"
                      :aria-current="isActive(child.to) ? 'page' : undefined"
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

      <!-- 右侧：登录和下载按钮 -->
      <div class="flex items-center gap-[10px] ml-auto h-full flex-row">
        <!-- PC端用户头像/登录按钮 -->
        <div
          class="hidden lg:flex flex-row items-center justify-center relative w-20 h-full hover:bg-[#ffffff1a]"
        >
          <!-- 未登录状态：显示登录按钮 -->
          <button
            v-if="!auth.isLoggedIn"
            class="flex items-center justify-center border border-white/30 text-white w-10 h-10 rounded-full hover:border-miaowu-green hover:text-miaowu-green transition-all duration-200"
            @click="ui.openLoginDialog()"
          >
            登录
          </button>

          <!-- 已登录状态：显示用户头像和下拉菜单 -->
          <div
            v-else
            class="relative"
            @mouseenter="handleUserMouseEnter"
            @mouseleave="handleUserMouseLeave"
          >
            <!-- 用户头像按钮 -->
            <button
              class="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-white/30 hover:border-miaowu-green hover:scale-105 transition-all duration-300 group avatar-glow"
            >
              <div class="relative w-full h-full">
                <img
                  v-if="auth.currentUser?.avatar_url"
                  :src="auth.currentUser.avatar_url"
                  :alt="auth.currentUser.nickname || auth.currentUser.username"
                  class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div
                  v-else
                  class="w-full h-full bg-miaowu-green flex items-center justify-center text-black font-medium transition-all duration-300 group-hover:bg-green-400"
                >
                  {{
                    (auth.currentUser?.nickname || auth.currentUser?.username || 'U')
                      .charAt(0)
                      .toUpperCase()
                  }}
                </div>
              </div>
            </button>

            <!-- 用户信息下拉菜单 -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="userDropdownOpen"
                class="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2 min-w-[200px] bg-gray-900 shadow-2xl rounded-lg overflow-hidden border border-gray-800 transform"
              >
                <!-- 用户信息区域 -->
                <div class="px-7 pt-5 flex-col">
                  <div class="flex items-center space-x-3 border-b border-[#ffffff33] py-5">
                    <div
                      class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-miaowu-green/20 hover:ring-miaowu-green/40 transition-all duration-300 avatar-fade-in"
                    >
                      <img
                        v-if="auth.currentUser?.avatar_url"
                        :src="auth.currentUser.avatar_url"
                        :alt="auth.currentUser.nickname || auth.currentUser.username"
                        class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                      />
                      <div
                        v-else
                        class="w-full h-full bg-miaowu-green flex items-center justify-center text-black font-medium transition-all duration-300 hover:bg-green-400"
                      >
                        {{
                          (auth.currentUser?.nickname || auth.currentUser?.username || 'U')
                            .charAt(0)
                            .toUpperCase()
                        }}
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-white font-medium truncate">
                        {{ auth.currentUser?.nickname || auth.currentUser?.username || '用户' }}
                      </p>
                      <p v-if="auth.currentUser?.phone" class="text-gray-400 text-sm truncate">
                        {{ auth.currentUser.phone }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center space-x-3 border-b border-[#ffffff33] py-5 text-miaowu-green cursor-pointer text-center"
                    @click="onMobileClickSupplierConsole"
                  >
                    供应商后台 >
                  </div>
                </div>

                <!-- 退出登录按钮 -->
                <div class="px-7 py-5">
                  <button
                    @click="handleLogout"
                    class="w-full h-10 text-center px-3 line-height-10 rounded-xl text-black bg-white hover:text-red-300 hover:bg-red-900/20 transition-colors duration-200"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 移动端用户头像/登录按钮 -->
        <div class="lg:hidden">
          <!-- 未登录状态：显示登录按钮 -->
          <button
            v-if="!auth.isLoggedIn"
            class="text-sm flex items-center justify-center border border-white/30 text-white w-12 h-12 rounded-full hover:border-miaowu-green hover:text-miaowu-green transition-all duration-200"
            @click="ui.openLoginDialog()"
          >
            登录
          </button>

          <!-- 已登录状态：显示用户头像 -->
          <button
            v-else
            class="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border border-white/30 hover:border-miaowu-green hover:scale-105 transition-all duration-300 group active:scale-95 avatar-glow"
            @click="toggleMobileUserPanel"
          >
            <div class="relative w-full h-full">
              <img
                v-if="auth.currentUser?.avatar_url"
                :src="auth.currentUser.avatar_url"
                :alt="auth.currentUser.nickname || auth.currentUser.username"
                class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
              />
              <div
                v-else
                class="w-full h-full bg-miaowu-green flex items-center justify-center text-black font-medium transition-all duration-300 group-hover:bg-green-400"
              >
                {{
                  (auth.currentUser?.nickname || auth.currentUser?.username || 'U')
                    .charAt(0)
                    .toUpperCase()
                }}
              </div>
            </div>
          </button>
        </div>

        <!-- PC端：完整下载按钮 -->
        <button
          class="hidden lg:flex items-center justify-center gap-2 bg-miaowu-green text-black px-[36px] py-[12px] rounded-xl text-base hover:bg-white hover:text-black transition-colors duration-200"
          @click="goToApp"
        >
          <img :src="iconDownloadUrl" alt="下载喵呜App" class="w-6 h-6" />
          下载喵呜App
        </button>

        <!-- 移动端：仅图标按钮 -->
        <button
          class="lg:hidden flex items-center justify-center bg-miaowu-green text-white p-3 rounded-xl hover:bg-green-600 transition-colors duration-200"
          @click="goToApp"
        >
          <img :src="iconDownloadUrl" alt="下载" class="w-5 h-5" />
        </button>
      </div>
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
          class="fixed inset-x-0 bottom-0 z-40 bg-black/60 backdrop-blur-sm"
          :class="mobileMenuTopClass"
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
          class="fixed left-0 bottom-0 w-3/5 z-50 bg-black shadow-2xl flex flex-col"
          :class="mobileMenuTopClass"
          @click.stop
        >
          <!-- 可滚动的内容区域 -->
          <div class="flex-1 overflow-y-auto px-6 py-8">
            <!-- 导航菜单 -->
            <ul class="space-y-0">
              <li v-for="item in navItems" :key="item.to" class="border-b border-white/10">
                <!-- 无子菜单的导航 -->
                <RouterLink
                  v-if="!item.children"
                  :to="item.to"
                  class="block py-5 text-lg font-medium hover:text-miaowu-green transition-colors duration-200"
                  :class="isActive(item.to) ? 'text-miaowu-green' : 'text-white'"
                  @click="open = false"
                >
                  {{ item.label }}
                </RouterLink>

                <!-- 有子菜单的导航 -->
                <div v-else>
                  <button
                    class="w-full flex items-center justify-between py-5 text-lg font-medium text-white hover:text-miaowu-green transition-colors duration-200"
                    :class="[{ 'text-miaowu-green': isActiveParent(item) }]"
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
                  <transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 max-h-0 overflow-hidden transform -translate-y-2"
                    enter-to-class="opacity-100 max-h-96 overflow-visible transform translate-y-0"
                    leave-active-class="transition-all duration-250 ease-in"
                    leave-from-class="opacity-100 max-h-96 overflow-visible transform translate-y-0"
                    leave-to-class="opacity-0 max-h-0 overflow-hidden transform -translate-y-2"
                  >
                    <ul
                      v-if="openMobileSubmenu === item.to"
                      class="pb-4 space-y-0 bg-white/5 -mx-6 px-6"
                    >
                      <li
                        v-for="(child, idx) in item.children"
                        :key="child.to"
                        :class="{ 'border-b border-white/10': idx < item.children.length - 1 }"
                        :style="{ 'animation-delay': `${idx * 50}ms` }"
                        class="animate-fade-in-up"
                      >
                        <RouterLink
                          :to="child.to"
                          class="block py-4 pl-4 text-base hover:text-miaowu-green transition-colors duration-200"
                          :class="isActive(child.to) ? 'text-miaowu-green' : 'text-white/70'"
                          @click="open = false"
                        >
                          {{ child.label }}
                        </RouterLink>
                      </li>
                    </ul>
                  </transition>
                </div>
              </li>
            </ul>
          </div>

          <!-- 固定在底部的链接 -->
          <div class="flex-shrink-0 border-t border-white/10 px-6 py-4">
            <div class="flex items-center justify-center gap-x-3 text-xs text-miaowu-green">
              <RouterLink
                to="/legal/help"
                class="hover:text-white transition-colors"
                @click="open = false"
              >
                帮助中心
              </RouterLink>
              <span class="text-white/30">|</span>
              <RouterLink
                to="/legal/privacy"
                class="hover:text-white transition-colors"
                @click="open = false"
              >
                隐私协议
              </RouterLink>
              <span class="text-white/30">|</span>
              <RouterLink
                to="/legal/terms"
                class="hover:text-white transition-colors"
                @click="open = false"
              >
                服务条款
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 移动端用户信息面板（在导航栏下方） -->
    <div class="lg:hidden relative">
      <!-- 蒙层 -->
      <transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileUserPanelOpen"
          class="fixed inset-x-0 bottom-0 z-40 bg-black/60 backdrop-blur-sm"
          :class="mobileUserPanelTopClass"
          @click="mobileUserPanelOpen = false"
        ></div>
      </transition>

      <!-- 用户信息面板 -->
      <transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-[-20px]"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-[-20px]"
      >
        <div
          v-if="mobileUserPanelOpen"
          class="fixed left-0 right-0 z-50 bg-gray-900 shadow-2xl rounded-b-2xl"
          :class="mobileUserPanelTopClass"
          @click.stop
        >
          <!-- 用户信息内容 -->
          <div class="px-6 py-6">
            <!-- 用户头像和基本信息 -->
            <div
              class="flex items-center space-x-4 pb-6 mb-6 animate-fade-in-up border-b border-[#ffffff33]"
              style="animation-delay: 100ms"
            >
              <div
                class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-miaowu-green/20 hover:ring-miaowu-green/40 transition-all duration-300 avatar-fade-in"
              >
                <img
                  v-if="auth.currentUser?.avatar_url"
                  :src="auth.currentUser.avatar_url"
                  :alt="auth.currentUser.nickname || auth.currentUser.username"
                  class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                />
                <div
                  v-else
                  class="w-full h-full bg-miaowu-green flex items-center justify-center text-black font-medium text-xl transition-all duration-300 hover:bg-green-400"
                >
                  {{
                    (auth.currentUser?.nickname || auth.currentUser?.username || 'U')
                      .charAt(0)
                      .toUpperCase()
                  }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white text-lg font-medium truncate">
                  {{ auth.currentUser?.nickname || auth.currentUser?.username || '用户' }}
                </h3>
                <p v-if="auth.currentUser?.phone" class="text-gray-400 text-sm truncate">
                  {{ auth.currentUser.phone }}
                </p>
                <p v-if="auth.currentUser?.email" class="text-gray-400 text-sm truncate">
                  {{ auth.currentUser.email }}
                </p>
              </div>
            </div>
            <!-- 供应商平台入口 -->
            <div
              class="flex items-center justify-center space-x-4 pb-6 mb-6 animate-fade-in-up border-b border-[#ffffff33] text-miaowu-green"
              style="animation-delay: 200ms"
              @click="onClickSupplierConsole"
            >
              供应商后台 >
            </div>

            <!-- 退出登录按钮 -->
            <div class="mt-6 animate-fade-in-up" style="animation-delay: 300ms">
              <button
                @click="handleLogout"
                class="w-full flex items-center justify-center px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import iconDownloadUrl from '@/assets/img/download.png'
import logoUrl from '@/assets/img/logo-light.png'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'
import { useMallRedirect } from '@/utils/mallNavigation.js'
import { ElMessage } from 'element-plus'
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

// Logo URL

// 定义导航项类型
interface NavItem {
  to: string
  label: string
  children?: NavItem[]
}

const open = ref(false)
const openMobileSubmenu = ref<string | null>(null)
const activeDropdown = ref<string | null>(null)
const userDropdownOpen = ref(false)
const mobileUserPanelOpen = ref(false)
const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()
const { redirectToMall } = useMallRedirect()

const onClickSupplierConsole = () => {
  redirectToMall()
}

const onMobileClickSupplierConsole = () => {
  toggleMobileUserPanel()
  redirectToMall()
}

// 检测TopAdv是否显示
const isTopAdvVisible = ref(false)

// 动态计算移动端菜单的top位置
const mobileMenuTopClass = computed(() => {
  // 导航栏高度：h-20 = 80px
  // TopAdv高度：移动端 h-11 = 44px，PC端 h-[66px] = 66px
  const navHeight = 80 // 导航栏高度
  const topAdvHeight = isTopAdvVisible.value ? 44 : 0 // 移动端TopAdv高度

  return {
    'top-20': !isTopAdvVisible.value, // 没有TopAdv时使用默认的top-20
    'top-[124px]': isTopAdvVisible.value, // 有TopAdv时：80px + 44px = 124px
  }
})

// 动态计算移动端用户面板的top位置
const mobileUserPanelTopClass = computed(() => {
  // 导航栏高度：h-20 = 80px
  // TopAdv高度：移动端 h-11 = 44px
  const navHeight = 80 // 导航栏高度
  const topAdvHeight = isTopAdvVisible.value ? 44 : 0 // 移动端TopAdv高度

  return {
    'top-20': !isTopAdvVisible.value, // 没有TopAdv时使用默认的top-20
    'top-[124px]': isTopAdvVisible.value, // 有TopAdv时：80px + 44px = 124px
  }
})

// 延迟关闭定时器
let closeTimer: number | null = null

// 检测TopAdv可见性的函数
const checkTopAdvVisibility = () => {
  // 查找TopAdv元素
  const topAdvElement =
    document.querySelector('[data-top-adv]') ||
    document.querySelector('.bg-gradient-to-r.from-orange-100.to-orange-200')

  if (topAdvElement) {
    const rect = topAdvElement.getBoundingClientRect()
    const isVisible = rect.height > 0 && rect.top >= 0
    isTopAdvVisible.value = isVisible
  } else {
    isTopAdvVisible.value = false
  }
}

// 组件挂载时开始检测
onMounted(() => {
  checkTopAdvVisibility()
  // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver(checkTopAdvVisibility)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  })

  // 监听窗口大小变化
  window.addEventListener('resize', checkTopAdvVisibility)

  // 清理函数
  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('resize', checkTopAdvVisibility)
  })
})

// 锁定/解锁页面滚动（移动端菜单或用户面板打开时）
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

// 根据面板状态控制页面滚动
watchEffect(() => {
  if (open.value || mobileUserPanelOpen.value) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})

// 监听路由变化，关闭移动端菜单
watchEffect(() => {
  route.path
  open.value = false
  openMobileSubmenu.value = null
  activeDropdown.value = null
  userDropdownOpen.value = false
  mobileUserPanelOpen.value = false
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
})

// 规范化路径：去掉尾部斜杠，保持根路径为 '/'
const normalizePath = (p: string) => {
  const trimmed = p.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

// 检查当前路由是否激活（更稳健的匹配，忽略尾部斜杠）
const isActive = (path: string) => {
  return normalizePath(route.path) === normalizePath(path)
}

// 检查父级导航是否激活（子路由有一个激活即可）
const isActiveParent = (item: NavItem) => {
  if (!item.children) return false
  const current = normalizePath(route.path)
  return item.children.some((child) => {
    const target = normalizePath(child.to)
    return current === target || current.startsWith(target + '/')
  })
}

// 切换移动端子菜单
const toggleMobileSubmenu = (path: string) => {
  openMobileSubmenu.value = openMobileSubmenu.value === path ? null : path
}

// 鼠标进入导航项（PC端二级菜单）
const handleMouseEnter = (path: string) => {
  // 清除延迟关闭定时器
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  // 打开对应的二级菜单，同时确保用户下拉关闭
  activeDropdown.value = path
  userDropdownOpen.value = false
}

// 鼠标进入二级下拉菜单区域
const handleDropdownEnter = () => {
  // 清除延迟关闭定时器
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  // 保持二级菜单打开，并确保用户下拉关闭（互斥）
  userDropdownOpen.value = false
}

// 鼠标离开导航项
const handleMouseLeave = () => {
  // 延迟150ms关闭，给用户时间移动到下拉菜单
  closeTimer = window.setTimeout(() => {
    activeDropdown.value = null
    closeTimer = null
  }, 150)
}

// 处理用户下拉菜单（PC端头像悬停）
const handleUserMouseEnter = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  // 打开用户下拉，并立即关闭任何二级导航（互斥显示）
  userDropdownOpen.value = true
  activeDropdown.value = null
}

const handleUserMouseLeave = () => {
  // 延迟关闭用户下拉菜单
  closeTimer = window.setTimeout(() => {
    userDropdownOpen.value = false
    closeTimer = null
  }, 150)
}

// 退出登录
const handleLogout = () => {
  auth.logout()
  userDropdownOpen.value = false
  mobileUserPanelOpen.value = false
  ElMessage.success('已退出登录')
}

// 切换移动端用户信息面板
const toggleMobileUserPanel = () => {
  mobileUserPanelOpen.value = !mobileUserPanelOpen.value
  // 关闭移动端菜单
  open.value = false
  openMobileSubmenu.value = null
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  open.value = !open.value
  // 关闭用户信息面板
  mobileUserPanelOpen.value = false
  // 当打开移动端菜单时，自动展开当前页面对应的父级菜单，确保高亮项可见
  if (open.value) {
    const activeParent = navItems.find((item) => isActiveParent(item))
    openMobileSubmenu.value = activeParent ? activeParent.to : null
  }
}

// 跳转到喵呜AI App页面
const goToApp = () => {
  router.push('/products/app')
}

// 导航菜单配置（与路由一致）
const navItems: NavItem[] = [
  { to: '/', label: '首页' },
  {
    to: '/products',
    label: '喵呜业务',
    children: [
      { to: '/products/supplier-console', label: '供应商管理后台' },
      { to: '/products/app', label: '喵呜AI App' },
      { to: '/products/mini-program', label: '喵呜AI 小程序' },
    ],
  },
  {
    to: '/cooperation',
    label: '喵呜招募',
    children: [
      { to: '/cooperation/suppliers', label: '喵呜品牌供应商招募' },
      { to: '/cooperation/sellers', label: '喵呜AI卖手招募' },
      { to: '/cooperation/partners', label: '其他商务合作' },
    ],
  },
  {
    to: '/about',
    label: '关于我们',
    children: [
      { to: '/about/company', label: '关于喵呜AI' },
      { to: '/about/contact', label: '联系我们' },
    ],
  },
  {
    to: '/legal',
    label: '服务与条款',
    children: [
      { to: '/legal/help', label: '帮助中心' },
      { to: '/legal/privacy', label: '隐私协议' },
      { to: '/legal/terms', label: '服务条款' },
    ],
  },
]
</script>

<style scoped>
.border-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 移动端二级菜单项淡入上移动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
  opacity: 0;
}

/* 汉堡菜单动画效果 */
@keyframes hamburger-bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-2px);
  }
  60% {
    transform: translateY(-1px);
  }
}

.hamburger-bounce {
  animation: hamburger-bounce 0.6s ease-in-out;
}

/* 汉堡菜单线条弹性效果 */
@keyframes line-elastic {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(1);
  }
}

.line-elastic {
  animation: line-elastic 0.3s ease-in-out;
}

/* 头像脉冲效果 */
@keyframes avatar-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.avatar-pulse {
  animation: avatar-pulse 1.5s ease-in-out;
}

/* 头像淡入效果 */
@keyframes avatar-fade-in {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.avatar-fade-in {
  animation: avatar-fade-in 0.6s ease-out;
}

/* 头像悬停发光效果 */
.avatar-glow {
  position: relative;
}

.avatar-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #22c55e, #16a34a, #22c55e);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.avatar-glow:hover::before {
  opacity: 0.6;
}
</style>
