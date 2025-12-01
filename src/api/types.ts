// 通用 API 类型定义

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 通用 API 响应结构
export interface ApiResponse<T = any> {
  status: 'ok' | 'error'
  message?: string
  data: T
  code?: number
}

// 使用 msg 字段的 API 响应结构（部分接口使用）
export interface ApiResponseWithMsg<T = any> {
  status: 'ok' | 'error'
  msg?: string
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

// 用户相关类型
export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 产品相关类型
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  status: 'active' | 'inactive'
  createdAt: string
}

// 新闻相关类型
export interface News {
  id: string
  title: string
  content: string
  summary?: string
  author: string
  publishTime: string
  status: 'draft' | 'published'
  tags?: string[]
}
