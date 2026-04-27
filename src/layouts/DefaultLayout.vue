<template>
  <div class="min-h-full flex flex-col">
    <TopAdv v-if="!isBlank" />

    <AppNav v-if="!isBlank" />

    <!-- 主内容区域 -->
  <main class="flex-1">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div class="route-view-wrapper">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </main>

    <AppFooter v-if="!isBlank" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppNav from '@/components/AppNav.vue'
import TopAdv from '@/components/TopAdv.vue'
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isBlank = computed(() => route.meta?.layout === 'blank')
</script>
