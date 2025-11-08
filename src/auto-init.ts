import { useAuthStore } from '@/stores/auth.js'
import { useThemeStore } from '@/stores/theme.js'
import { useUiStore } from '@/stores/ui.js'

// 在开发环境或通过 URL 参数强制启用 vConsole（仅移动端，除非显式开启）
async function loadVConsoleFromCdn() {
  return new Promise<void>((resolve, reject) => {
    try {
      const url = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.onload = () => {
        try {
          const VConsoleGlobal = (window as any).VConsole
          if (VConsoleGlobal) {
            ;(window as any).__vconsole__ = new VConsoleGlobal()
            console.log('[vconsole] initialized via CDN')
            resolve()
          } else {
            reject(new Error('VConsole global not found after CDN load'))
          }
        } catch (e) {
          reject(e)
        }
      }
      script.onerror = (e) => reject(e as any)
      document.head.appendChild(script)
    } catch (e) {
      reject(e as any)
    }
  })
}

async function setupVConsole() {
  try {
    const enableByEnv = import.meta.env.DEV
    const enableByQuery =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('vconsole') === '1'

    if (!(enableByEnv || enableByQuery)) return

    const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : ''
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)

    // 默认仅在移动端启用；若通过 ?vconsole=1 明确指定则不受限制
    if (!isMobile && !enableByQuery) return

    // 防止重复初始化
    if (typeof window !== 'undefined' && (window as any).__vconsole__) return

    // 使用 CDN 加载以避免开发依赖未安装时的模块解析错误
    await loadVConsoleFromCdn().catch((cdnErr) => {
      console.warn('[vconsole] cdn init failed:', cdnErr)
    })
  } catch (e) {
    console.warn('[vconsole] init failed:', e)
  }
}

export function bootstrap() {
  const store = useThemeStore()
  store.init()
  const auth = useAuthStore()
  auth.init()
  const ui = useUiStore()
  // 不主动弹登录框；若本地存在 token，auth.init 中已触发刷新用户信息
  // 按需启用 vConsole（开发环境或 URL 参数）
  setupVConsole()
}
