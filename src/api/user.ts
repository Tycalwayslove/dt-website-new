// 用户相关 API 接口

import { httpGet } from './http.js'
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
}

// 获取用户信息响应类型
export type UserInfoResponse = ApiResponse<UserInfo[]>

// 获取当前用户信息
export function apiGetUserInfo(): Promise<UserInfoResponse> {
  return httpGet<UserInfoResponse>('/api/user/info')
}
