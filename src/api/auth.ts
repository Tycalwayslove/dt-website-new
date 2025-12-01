import { httpGet, httpPost } from './http.js'
import type { ApiResponse, ApiResponseWithMsg } from './types.js'

// AES 密钥响应数据结构
export interface AesKeyData {
  key_data: string
  key_str: string
}

// AES 密钥接口响应类型
export type AesKeyResponse = ApiResponseWithMsg<AesKeyData>

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

// 注册请求参数
export interface RegisterRequest {
  phone: string
  code: string
  password: string
  confirm_password: string
  inviter?: string
  captcha_id?: string
  captcha_code?: string
}

// 注册响应类型（返回 access_token）
export type RegisterResponse = ApiResponseWithMsg<LoginData>

// 获取图形验证码请求参数
export interface GetCaptchaRequest {}

// 图形验证码响应数据
export interface CaptchaData {
  captcha_id: string
  image: string // base64 图片
}

// 获取图形验证码响应类型
export type GetCaptchaResponse = ApiResponseWithMsg<CaptchaData>

// 获取短信验证码请求参数
export interface GetSmsCodeRequest {
  phone: string
  captcha_code: string
  captcha_id: string
}

// 获取短信验证码响应类型
export type GetSmsCodeResponse = ApiResponseWithMsg<null>

// 获取 AES 密钥
export function apiGetAesKey(): Promise<AesKeyResponse> {
  return httpGet<AesKeyResponse>('/api/user/get_aes_key')
}

// 用户登录
export function apiLogin(payload: LoginRequest): Promise<LoginResponse> {
  return httpPost<LoginResponse>('/api/user/login', payload, { allowHttpError: true })
}

// 新的登录接口（使用加密数据）
export function apiNewLogin(payload: NewLoginRequest): Promise<LoginResponse> {
  console.log(payload)
  return httpPost<LoginResponse>(
    '/api/user/login',
    { data: payload.data },
    { allowHttpError: true }
  )
}

// 生成扫码登录二维码
export function apiGenerateQrCode(params: GenerateQrCodeParams): Promise<QrCodeResponse> {
  return httpGet<QrCodeResponse>('/api/get_login_qr_code', { params })
}

// 查询二维码扫码状态
export function apiGetQrCodeStatus(code_id: string): Promise<QrCodeStatusResponse> {
  return httpPost<QrCodeStatusResponse>('/api/login_qr_code_status', { code_id })
}

// 用户注册
export function apiRegister(payload: RegisterRequest): Promise<RegisterResponse> {
  return httpPost<RegisterResponse>('/api/web/merchant_regist', payload, { allowHttpError: true })
}

// 获取图形验证码
export function apiGetCaptcha(): Promise<GetCaptchaResponse> {
  return httpGet<GetCaptchaResponse>('/api/user/get_captcha')
}

// 获取短信验证码
export function apiGetSmsCode(payload: GetSmsCodeRequest): Promise<GetSmsCodeResponse> {
  return httpPost<GetSmsCodeResponse>('/api/web/send_sms', payload, { allowHttpError: true })
}
