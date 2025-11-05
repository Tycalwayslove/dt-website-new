<template>
  <DefaultLayout />
  <LoginDialog v-model="ui.showLoginDialog" />
  <ReloginPrompt v-model="ui.showReloginPrompt" @login="handleLogin" />
</template>

<script setup lang="ts">
import LoginDialog from '@/components/auth/LoginDialog.vue'
import ReloginPrompt from '@/components/auth/ReloginPrompt.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { useUiStore } from '@/stores/ui.js'

const ui = useUiStore()
function handleLogin() {
  ui.openLoginDialog()
  ui.closeReloginPrompt()
}
</script>

<style scoped></style>
