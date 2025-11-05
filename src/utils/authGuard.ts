import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'

// 检查登录状态，不满足时弹出重新登录提示；返回是否已登录
export function requireLoginOrPrompt(): boolean {
  const auth = useAuthStore()
  console.log(auth.isLoggedIn)
  if (!auth.isLoggedIn) {
    const ui = useUiStore()
    ui.openReloginPrompt()
    return false
  }
  return true
}
