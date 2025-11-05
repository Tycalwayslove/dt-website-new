import { useAuthStore } from '@/stores/auth.js'
import { useThemeStore } from '@/stores/theme.js'
import { useUiStore } from '@/stores/ui.js'

export function bootstrap() {
  const store = useThemeStore()
  store.init()
  const auth = useAuthStore()
  auth.init()
  const ui = useUiStore()
  // 不主动弹登录框；若本地存在 token，auth.init 中已触发刷新用户信息
}
