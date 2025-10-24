<template>
  <div class="min-h-screen">
    <!-- 首屏轮播Banner -->
    <HeroBanner />

    <!-- 可信赖的专业伙伴 -->
    <TrustedPartner />

    <!-- 小程序V2.0 -->
    <MiniProgramV2 />

    <!-- 供应链 -->
    <SupplyChain />

    <!-- 顾问式电商（数字人） -->
    <DigitalHuman />

    <!-- 招募 -->
    <Recruitment />

    <!-- 合作伙伴 -->
    <Partners />
  </div>
</template>

<script setup lang="ts">
import DigitalHuman from '@/components/DigitalHuman.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import MiniProgramV2 from '@/components/MiniProgramV2.vue'
import Partners from '@/components/Partners.vue'
import Recruitment from '@/components/Recruitment.vue'
import SupplyChain from '@/components/SupplyChain.vue'
import TrustedPartner from '@/components/TrustedPartner.vue'
</script>
