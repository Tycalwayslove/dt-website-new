import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { apiGetUserInfo } from '@/api/user.js'
import type { UserInfo } from '@/api/user.js'

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
      // 若本地存在 token，则尝试刷新最新的用户信息
      if (this.token) {
        // 异步刷新，不阻塞初始化
        this.refreshUserInfo().catch((err) => {
          console.warn('初始化刷新用户信息失败:', err)
        })
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
    async refreshUserInfo() {
      if (!this.token) return
      try {
        const res = await apiGetUserInfo()
        if (res && res.status === 'ok' && Array.isArray(res.data) && res.data[0]) {
          this.setUserInfo(res.data[0] as UserInfo)
        } else {
          // 服务端返回非 ok 或未获取到有效用户，视为异常，清理本地信息
          this.clear()
          ElMessage.closeAll()
          ElMessage.info('登录状态已过期，请重新登录')
        }
      } catch (error) {
        // 请求异常（含 401），清理本地令牌与用户信息
        this.clear()
        ElMessage.closeAll()
        ElMessage.info('登录状态已过期，请重新登录')
        throw error
      }
    },
  },
})
