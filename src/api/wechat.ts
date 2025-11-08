import { httpPost } from './http.js'
import type { ApiResponse } from './types.js'

// 微信 URL Scheme 相关类型
export interface GenerateSchemeParams {
  appid?: string
  jump_wxa?: {
    path?: string
    query?: string
    env_version?: 'release' | 'trial' | 'develop'
  }
  is_expire?: boolean // 默认 false，永久有效
  expire_time?: number
  expire_type?: 0 | 1
  expire_interval?: number
}

export interface GenerateSchemeData {
  // 后端可能返回的字段名兼容处理
  scheme?: string
  url_scheme?: string
  openlink?: string
  expires_at?: number
}

export type GenerateSchemeResponse = ApiResponse<GenerateSchemeData | string>

// 生成微信小程序 URL Scheme（不带鉴权）
export function apiGenerateWechatScheme(
  params: GenerateSchemeParams
): Promise<GenerateSchemeResponse> {
  const payload = {
    // 默认永久有效
    is_expire: false,
    ...params,
  }
  // 跳过鉴权头
  return httpPost<GenerateSchemeResponse>('/manage/wechat/generate_scheme', payload, {
    withAuth: false,
  })
}

// ————————————————————————————————
// WeChat JSSDK 签名配置
export interface JsSdkConfigData {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
  // 后端可选返回，前端仍会覆盖确保包含 open tag
  jsApiList?: string[]
  openTagList?: string[]
}
export type JsSdkConfigResponse = ApiResponse<JsSdkConfigData>

// 生成指定长度的随机字符串（字母数字），用于 nonceStr
function genNonce(len = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let s = ''
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)]
  }
  return s
}

// 计算 SHA-1 十六进制摘要
async function sha1Hex(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const digest = await crypto.subtle.digest('SHA-1', data)
  const bytes = new Uint8Array(digest)
  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

// 前端生成微信 JSSDK 签名配置：后端仅提供 jsapi_ticket
export async function apiGetWechatJsSdkConfig(url: string): Promise<JsSdkConfigResponse> {
  const cleanUrl = (url || (typeof window !== 'undefined' ? window.location.href : '')).split('#')[0]
  // 获取 jsapi_ticket（无鉴权）；兼容后端可能需要 url 参数
  const ticketResp = await httpPost<any>(
    '/manage/wechat/get_jsapi_ticket',
    { url: cleanUrl },
    { withAuth: false }
  )
  // 兼容可能的返回结构：字符串、对象、或带 data 的包裹
  const extractTicket = (resp: any): string | undefined => {
    if (!resp) return undefined
    if (typeof resp === 'string') return resp
    const d = resp.data !== undefined ? resp.data : resp
    if (typeof d === 'string') return d
    return d?.jsapi_ticket || d?.ticket || d?.jsapiTicket
  }
  const ticket = extractTicket(ticketResp) || ''
  if (!ticket) {
    return {
      status: 'error',
      message: 'jsapi_ticket missing',
      data: {
        appId: '',
        timestamp: 0,
        nonceStr: '',
        signature: '',
      },
    }
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const nonceStr = genNonce(16)
  const raw = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${cleanUrl}`
  const signature = await sha1Hex(raw)
  const appId = (import.meta as any).env?.VITE_WECHAT_APPID || ''

  const data: JsSdkConfigData = {
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [],
    openTagList: ['wx-open-launch-weapp'],
  }

  return {
    status: 'ok',
    data,
  }
}
