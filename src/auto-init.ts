import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'

export function bootstrap() {
  const store = useThemeStore()
  store.init()
  const auth = useAuthStore()
  auth.init()
  const ui = useUiStore()
  if (!auth.token) ui.openReloginPrompt()
}
