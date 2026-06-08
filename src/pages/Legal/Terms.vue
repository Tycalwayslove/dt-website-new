<template>
  <section class="policy-page">
    <iframe
      class="policy-frame"
      title="服务条款"
      src="https://www.meuscm.com/agreement/user_service.html"
    ></iframe>
  </section>
</template>

<script setup lang="ts">
// 页面：服务条款（外部协议页由 iframe 承载）
</script>

<style scoped>
.policy-page {
  width: 100%;
  height: calc(100vh - 80px);
  min-height: 720px;
  overflow: hidden;
  background: #fff;
}

.policy-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
  vertical-align: top;
}
</style>
