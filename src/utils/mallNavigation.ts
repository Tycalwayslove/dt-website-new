// 使用相对路径并在 NodeNext 模式下带上 .js 扩展，确保类型解析正确
import { apiMallLogin } from '@/api/user.js'
import { useAuthStore } from '@/stores/auth.js'
import { ElMessage, ElNotification } from 'element-plus'
import { ref } from 'vue'

/**
 * 处理跳转供应商后台的组合式函数
 */
export function useMallRedirect() {
  const auth = useAuthStore()
  const isRedirecting = ref(false)
  const MALL_URL = (import.meta as any).env?.VITE_MALL_URL as string | undefined
  /**
   * 仅做准备/鉴权，不做 UI 副作用，方便复用
   */
  const prepareMallRedirect = async (): Promise<
    | { status: 'ready'; action: 'register' | 'login'; mallToken: string }
    | { status: 'blocked'; action: 'none'; message: string; notify?: boolean }
    | { status: 'error'; action: 'none'; message: string }
  > => {
    if (!auth.currentUser) {
      return { status: 'blocked', action: 'none', message: '请先登录' }
    }
    const { mall_state } = auth.currentUser
    console.log(mall_state)
    try {
      switch (Number(mall_state)) {
        case 1: {
          // 暂时不支持注册
          // const regRes = await apiMallRegister()
          // const token = regRes.data?.mall_token
          // if (token) return { status: 'ready', action: 'register', mallToken: token }
          // return { status: 'error', action: 'none', message: '注册成功但未返回 token' }
          return {
            status: 'blocked',
            action: 'none',
            message: '网站仅支持商家登录，非商家用户请使用喵呜 AI APP 端。',
            notify: true,
          }
        }
        case 2:
        case 3: {
          const loginRes = await apiMallLogin()
          const token = loginRes.data?.mall_token
          if (token) return { status: 'ready', action: 'login', mallToken: token }
          return { status: 'error', action: 'none', message: '登录成功但未返回 token' }
        }
        case 4:
          return {
            status: 'blocked',
            action: 'none',
            message: '抱歉，带货达人暂不支持入驻商城，请在app端查看和管理您的商品。',
            notify: true,
          }
        default:
          return { status: 'error', action: 'none', message: '未知的商城状态' }
      }
    } catch (error: any) {
      console.error('商城跳转处理失败:', error)
      return { status: 'error', action: 'none', message: error?.message || '请求失败，请稍后再试' }
    }
  }

  /**
   * 便捷方法：准备后执行默认副作用（目前用 alert 代替跳转实现）
   */
  const redirectToMall = async () => {
    if (isRedirecting.value) return
    isRedirecting.value = true
    ElMessage.closeAll()
    ElMessage.info({ message: '正在处理，请稍候…', duration: 1200 })
    try {
      const result = await prepareMallRedirect()
      if (result.status === 'ready') {
        ElMessage.success({
          message: `${result.action === 'register' ? '注册' : '登录'}成功，正在跳转…`,
          duration: 1500,
        })
        // TODO: 将 mallToken 传入实际跳转方法
        navigateMall(result.mallToken)
      } else if (result.status === 'blocked') {
        if ((result as any).notify) {
          ElNotification({ title: '提示', message: result.message, type: 'warning', duration: 3000 })
        } else {
          ElMessage.warning({ message: result.message, duration: 2000 })
        }
      } else {
        ElMessage.error({ message: result.message, duration: 2000 })
      }
    } finally {
      isRedirecting.value = false
    }
  }

  // 构建商城跳转 URL（不直接导航，便于在其他地方复用）
  const buildMallUrl = (mallToken: string) => {
    const base = MALL_URL || ''
    const userId = auth.token || ''
    try {
      const url = new URL(base)
      url.searchParams.set('shop_token', mallToken)
      url.searchParams.set('user_id', userId)
      return url.toString()
    } catch {
      // 基础 URL 可能为空或非法，退化为拼接
      const params = new URLSearchParams({
        shop_token: mallToken,
        user_id: userId,
      })
      return base ? `${base}?${params.toString()}` : `?${params.toString()}`
    }
  }

  // TODO: 实际跳转逻辑占位（携带 mallToken），当前仅打印构建后的 URL
  const navigateMall = (mallToken: string) => {
    const target = buildMallUrl(mallToken)
    console.log('[mall] navigate target:', target)
    // 新窗口打开跳转地址
    window.open(target, '_blank')
  }

  return { prepareMallRedirect, redirectToMall, isRedirecting, buildMallUrl }
}
