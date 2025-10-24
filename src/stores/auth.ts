import { defineStore } from 'pinia'

const TOKEN_KEY = 'auth-token'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '' as string }),
  actions: {
    init() {
      this.token = localStorage.getItem(TOKEN_KEY) || ''
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    clear() {
      this.token = ''
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})
