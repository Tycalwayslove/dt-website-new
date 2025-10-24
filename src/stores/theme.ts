import { defineStore } from 'pinia'

const STORAGE_KEY = 'app-theme-dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({ isDark: false }),
  actions: {
    init() {
      const saved = localStorage.getItem(STORAGE_KEY)
      this.isDark = saved ? saved === '1' : matchMedia('(prefers-color-scheme: dark)').matches
      this.apply()
    },
    toggleTheme() {
      this.isDark = !this.isDark
      this.persist()
      this.apply()
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, this.isDark ? '1' : '0')
    },
    apply() {
      const root = document.documentElement
      root.classList.toggle('dark', this.isDark)
    },
  },
})
