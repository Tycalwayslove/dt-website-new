// 用户相关 API 接口

import { httpGet, httpPost } from './http.js'
import type { ApiResponse } from './types.js'

// 用户信息数据结构
export interface UserInfo {
  id: string
  username: string
  phone?: string
  email?: string
  avatar?: string
  avatar_url?: string
  nickname?: string
  status?: 'active' | 'inactive'
  created_at?: string
  updated_at?: string
  mall_state?: number | string
}

// 获取用户信息响应类型
export type UserInfoResponse = ApiResponse<UserInfo[]>

// 获取当前用户信息
export function apiGetUserInfo(): Promise<UserInfoResponse> {
  return httpGet<UserInfoResponse>('/api/user/info')
}

// 商城认证/跳转相关
export interface MallAuthData {
  mall_token?: string
  [key: string]: any
}

export type MallAuthResponse = ApiResponse<MallAuthData>

// 商城注册（mall_state == 1）
export function apiMallRegister(): Promise<MallAuthResponse> {
  return httpPost<MallAuthResponse>('/api/user/mall_register')
}

// 商城登录（mall_state == 2 或 3）
export function apiMallLogin(): Promise<MallAuthResponse> {
  return httpPost<MallAuthResponse>('/api/user/mall_login')
}
