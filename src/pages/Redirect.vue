<template>
  <div class="min-h-screen bg-white flex items-center justify-center">
    <div class="text-center space-y-4">
      <h1 class="text-2xl font-bold text-black">正在打开喵呜AI小程序</h1>
      <p class="text-gray-600">若未自动跳转，请稍候或扫码体验</p>
      <div v-if="showCode" class="flex items-center justify-center">
        <img
          :src="miniProgramCode"
          alt="小程序二维码"
          width="180"
          height="180"
          class="rounded-xl border border-black"
          loading="lazy"
        />
      </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import miniProgramCode from '@/assets/img/mini-program-code.png'
  import { apiGenerateWechatScheme } from '@/api/index.js'
  import { buildWechatSchemeParams, openMiniProgramByScheme } from '@/utils/wechat.js'
  
  const showCode = ref(false)
  
  function buildQueryWithPhone(baseQuery: string | undefined, phone: string | null): string | undefined {
    if (!baseQuery && !phone) return baseQuery
    const params = new URLSearchParams(baseQuery || '')
    if (phone) params.set('phone', phone)
    return params.toString()
  }
  
  onMounted(async () => {
    const route = useRoute()
    const phone = (route.query?.phone as string) || null
  
    const cfg = buildWechatSchemeParams()
    const query = buildQueryWithPhone(cfg.jump_wxa?.query, phone)
  
    try {
      const resp = await apiGenerateWechatScheme(
        buildWechatSchemeParams({
          query,
        })
      )
      const data: any = resp?.data
      const scheme =
        typeof data === 'string' ? data : data?.openlink || data?.scheme || data?.url_scheme || ''
      const ok = openMiniProgramByScheme(scheme)
      if (!ok) {
        showCode.value = true
      }
    } catch (e) {
      showCode.value = true
    }
  })
  </script>
  
  <style scoped>
  </style>
