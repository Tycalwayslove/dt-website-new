<template>
  <div class="min-h-screen">
    <!-- 首屏轮播Banner -->
    <HeroBanner />

    <!-- 公司信息 -->
    <CompanyInfo />
    <!-- 顾问式电商（数字人） -->
    <DigitalHuman />

    <!-- 招募 -->
    <Recruitment />

    <!-- 合作伙伴 -->
    <Partners />
  </div>
</template>

<script setup lang="ts">
import CompanyInfo from './components/CompanyInfo.vue'
import DigitalHuman from './components/DigitalHuman.vue'
import HeroBanner from './components/HeroBanner.vue'
import Partners from './components/Partners.vue'
import Recruitment from './components/Recruitment.vue'
</script>
