import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    showLoginDialog: false,
    showReloginPrompt: false,
  }),
  actions: {
    openLoginDialog() {
      this.showLoginDialog = true
    },
    closeLoginDialog() {
      this.showLoginDialog = false
    },
    openReloginPrompt() {
      this.showReloginPrompt = true
    },
    closeReloginPrompt() {
      this.showReloginPrompt = false
    },
  },
})
