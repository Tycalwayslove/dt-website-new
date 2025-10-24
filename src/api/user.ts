// 用户相关 API 接口示例

import { httpDelete, httpGet, httpPost, httpPut } from './http'
import type { ApiResponse, PaginationData, PaginationParams, User } from './types'

// 用户列表请求参数
export interface UserListParams extends PaginationParams {
  keyword?: string
  status?: 'active' | 'inactive'
}

// 用户列表响应
export type UserListResponse = ApiResponse<PaginationData<User>>

// 用户详情响应
export type UserDetailResponse = ApiResponse<User>

// 创建用户请求参数
export interface CreateUserRequest {
  username: string
  email: string
  password: string
  avatar?: string
}

// 更新用户请求参数
export interface UpdateUserRequest {
  username?: string
  email?: string
  avatar?: string
}

// 修改密码请求参数
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

// API 函数定义
export function apiGetUserList(params: UserListParams): Promise<UserListResponse> {
  return httpGet<UserListResponse>('/api/users', { params })
}

export function apiGetUserDetail(id: string): Promise<UserDetailResponse> {
  return httpGet<UserDetailResponse>(`/api/users/${id}`)
}

export function apiCreateUser(data: CreateUserRequest): Promise<UserDetailResponse> {
  return httpPost<UserDetailResponse>('/api/users', data)
}

export function apiUpdateUser(id: string, data: UpdateUserRequest): Promise<UserDetailResponse> {
  return httpPut<UserDetailResponse>(`/api/users/${id}`, data)
}

export function apiDeleteUser(id: string): Promise<ApiResponse<null>> {
  return httpDelete<ApiResponse<null>>(`/api/users/${id}`)
}

export function apiChangePassword(data: ChangePasswordRequest): Promise<ApiResponse<null>> {
  return httpPost<ApiResponse<null>>('/api/users/change-password', data)
}
