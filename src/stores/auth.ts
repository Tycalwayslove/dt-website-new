import { defineStore } from 'pinia'
import type { UserInfo } from '../api/user.js'

const TOKEN_KEY = 'auth-token'
const USER_INFO_KEY = 'user-info'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    userInfo: null as UserInfo | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.userInfo,
  },
  actions: {
    init() {
      this.token = localStorage.getItem(TOKEN_KEY) || ''
      const userInfoStr = localStorage.getItem(USER_INFO_KEY)
      if (userInfoStr) {
        try {
          this.userInfo = JSON.parse(userInfoStr)
        } catch (error) {
          console.error('解析用户信息失败:', error)
          this.userInfo = null
        }
      }
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
    },
    clear() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_INFO_KEY)
    },
    logout() {
      this.clear()
      // 可以在这里添加其他退出登录的逻辑，比如调用退出登录API
    },
  },
})
