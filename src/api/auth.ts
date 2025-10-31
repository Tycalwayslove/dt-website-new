import { httpGet, httpPost } from './http.js'

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

// 新的登录请求参数（加密后）
export interface NewLoginRequest {
  data: string
}

// 登录响应数据结构
export interface LoginData {
  access_token: string
}

// 登录接口响应类型
export type LoginResponse = ApiResponse<LoginData>

// 扫码登录相关类型定义
// 生成二维码请求参数
export interface GenerateQrCodeParams {
  scene_id: string
  scene_token: string
}

// 二维码生成响应数据
export interface QrCodeData {
  code_id: string // 二维码内容/URL
  qr_id: string // 二维码唯一标识
  expires_at: number // 过期时间戳
}

// 二维码生成响应类型
export type QrCodeResponse = ApiResponse<QrCodeData>

// 扫码状态枚举
export type QrCodeStatus = '1' | '2' | '3' | '4'

// 扫码状态响应数据
export interface QrCodeStatusData {
  status: QrCodeStatus
  user_info?: {
    id: string
    username: string
    avatar?: string
  }
  expires_at: number
}

// 扫码状态响应类型
export type QrCodeStatusResponse = ApiResponse<QrCodeStatusData>

// 确认登录请求参数
export interface ConfirmLoginRequest {
  qr_id: string
  action: 'confirm' | 'cancel'
}

// 确认登录响应类型
export type ConfirmLoginResponse = ApiResponse<LoginData>

// 获取 AES 密钥
export function apiGetAesKey(): Promise<AesKeyResponse> {
  return httpGet<AesKeyResponse>('/api/user/get_aes_key')
}

// 用户登录
export function apiLogin(payload: LoginRequest): Promise<LoginResponse> {
  return httpPost<LoginResponse>('/api/user/login', payload)
}

// 新的登录接口（使用加密数据）
export function apiNewLogin(payload: NewLoginRequest): Promise<LoginResponse> {
  console.log(payload)
  return httpPost<LoginResponse>('/api/user/login', { data: payload.data })
}

// 生成扫码登录二维码
export function apiGenerateQrCode(params: GenerateQrCodeParams): Promise<QrCodeResponse> {
  return httpGet<QrCodeResponse>('/api/get_login_qr_code', { params })
}

// 查询二维码扫码状态
export function apiGetQrCodeStatus(code_id: string): Promise<QrCodeStatusResponse> {
  return httpPost<QrCodeStatusResponse>('/api/login_qr_code_status', { code_id })
}
