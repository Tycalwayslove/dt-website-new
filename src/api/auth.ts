import { httpGet, httpPost } from './http'

// 通用 API 响应结构
export interface ApiResponse<T = any> {
  status: 'ok' | 'error'
  message?: string
  data: T
  code?: number
}

// 错误响应结构
export interface ApiError {
  status: 'error'
  message: string
  code: number
  data?: null
}

// AES 密钥响应数据结构
export interface AesKeyData {
  key_data: string
  key_str: string
}

// AES 密钥接口响应类型
export type AesKeyResponse = ApiResponse<AesKeyData>

// 登录请求参数
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应数据结构
export interface LoginData {
  token: string
  user?: {
    id: string
    username: string
    email?: string
    avatar?: string
  }
  expires?: number
}

// 登录接口响应类型
export type LoginResponse = ApiResponse<LoginData>

// 获取 AES 密钥
export function apiGetAesKey(): Promise<AesKeyResponse> {
  return httpGet<AesKeyResponse>('/api/user/get_aes_key')
}

// 用户登录
export function apiLogin(payload: LoginRequest): Promise<LoginResponse> {
  return httpPost<LoginResponse>('/api/user/login', payload)
}
