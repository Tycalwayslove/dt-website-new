<template>
  <section class="policy-page">
    <iframe
      class="policy-frame"
      title="隐私协议"
      src="https://www.meuscm.com/agreement/user_privacy_policy.html"
    ></iframe>
  </section>
</template>

<script setup lang="ts">
// 页面：隐私协议（外部协议页由 iframe 承载）
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
