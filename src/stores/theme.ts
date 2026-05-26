import { defineStore } from 'pinia'
import { safeLocalStorage } from '@/utils/safeStorage.js'

const STORAGE_KEY = 'app-theme-dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({ isDark: false }),
  actions: {
    init() {
      const saved = safeLocalStorage.getItem(STORAGE_KEY)
      const prefersDark =
        typeof window !== 'undefined' && typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : false
      this.isDark = saved ? saved === '1' : prefersDark
      this.apply()
    },
    toggleTheme() {
      this.isDark = !this.isDark
      this.persist()
      this.apply()
    },
    persist() {
      safeLocalStorage.setItem(STORAGE_KEY, this.isDark ? '1' : '0')
    },
    apply() {
      const root = document.documentElement
      root.classList.toggle('dark', this.isDark)
    },
  },
})
