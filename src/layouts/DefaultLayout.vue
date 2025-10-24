<template>
  <div class="min-h-full flex flex-col">
    <!-- 顶部广告条 -->
    <TopAdv />

    <!-- 导航栏 -->
    <AppNav />

    <!-- 主内容区域 -->
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- 底部 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppNav from '@/components/AppNav.vue'
import TopAdv from '@/components/TopAdv.vue'
import { RouterView } from 'vue-router'
</script>
