import type { GenerateSchemeParams } from '@/api/wechat.js'

export type WechatEnvConfig = {
  appid: string
  env_version: 'release' | 'trial' | 'develop'
  path?: string
  query?: string
}

// 从环境变量构建默认 Scheme 参数，可传入 overrides 覆盖
export function buildWechatSchemeParams(
  overrides: Partial<GenerateSchemeParams & WechatEnvConfig> = {}
): GenerateSchemeParams {
  const appid = overrides.appid ?? import.meta.env.VITE_WECHAT_APPID ?? ''
  const env_version =
    overrides.env_version ?? (import.meta.env.VITE_WECHAT_ENV_VERSION || 'release')
  const path = overrides.path ?? import.meta.env.VITE_WECHAT_PATH
  const query = overrides.query ?? import.meta.env.VITE_WECHAT_QUERY

  const base: GenerateSchemeParams = {
    appid,
  }

  const jump: NonNullable<GenerateSchemeParams['jump_wxa']> = {
    env_version: env_version as 'release' | 'trial' | 'develop',
  }
  if (path) jump.path = path
  if (query) jump.query = query

  base.jump_wxa = { ...jump, ...(overrides.jump_wxa || {}) }

  // 允许覆盖其它字段（如 expire_* 等）；顶层的 path/query/env_version 不再默认设置
  const { path: _op, query: _oq, env_version: _oev, ...restOverrides } = overrides as any
  return { ...base, ...restOverrides }
}

// 是否为微信内置浏览器
export function isWeChatBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

// 动态加载微信 JSSDK（open tag 依赖 jweixin 脚本）
let wechatScriptLoading: Promise<void> | null = null
export function loadWechatJSSDK(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (wechatScriptLoading) return wechatScriptLoading

  wechatScriptLoading = new Promise<void>((resolve, reject) => {
    // 若已存在脚本不重复加载
    const existed = document.querySelector(
      'script[src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"]'
    ) as HTMLScriptElement | null
    if (existed) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load WeChat JSSDK'))
    document.head.appendChild(script)
  })

  return wechatScriptLoading
}

// 使用 URL Scheme 打开微信小程序（非微信浏览器环境）
export function openMiniProgramByScheme(scheme?: string): boolean {
  if (!scheme) return false
  try {
    window.location.href = scheme
    return true
  } catch (e) {
    console.warn('[wechat] open scheme failed:', e)
    return false
  }
}