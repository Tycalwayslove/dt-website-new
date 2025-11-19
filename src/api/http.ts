import { useAuthStore } from '@/stores/auth.js'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
export type HttpRequestConfig = AxiosRequestConfig & {
  withAuth?: boolean
  allowHttpError?: boolean
}

// 在开发模式下我们走 Vite 代理，使用 /api；在构建后的生产/测试模式下，使用环境的完整域名
const baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || '/api'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    Version: '1.5.1',
  },
})

instance.interceptors.request.use((config) => {
  // 在生产环境，将 /manage/wechat/* 相关接口改用测试环境域名
  try {
    const isProd = (import.meta as any).env?.PROD
    const testBase = (import.meta as any).env?.VITE_TEST_API_BASE_URL
    const url = config.url || ''
    if (
      isProd &&
      testBase &&
      typeof url === 'string' &&
      (url.startsWith('/manage/wechat/generate_scheme') ||
        url.startsWith('/manage/wechat/get_jsapi_ticket'))
    ) {
      const prefix = String(testBase).replace(/\/+$/, '')
      config.url = `${prefix}${url}`
    }
  } catch (_) {
    // 忽略环境变量读取异常
  }

  const auth = useAuthStore()
  // header 必须添加version 版本号，低于1.5.1的版本是不加密版本，大于等于1.5.1的版本是加密版本
  const withAuth = (config as HttpRequestConfig).withAuth
  if ((withAuth === undefined || withAuth !== false) && auth.token) {
    config.headers = config.headers || {}
    ;(config.headers as any).Authorization = `Bearer ${auth.token}`
  }
  const allowHttpError = (config as HttpRequestConfig).allowHttpError
  if (allowHttpError) {
    config.validateStatus = () => true
  }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const cfg = (error.config || {}) as HttpRequestConfig
    if (cfg.allowHttpError && error.response && (error.response as any).data !== undefined) {
      return Promise.resolve((error.response as any).data)
    }
    let message = '网络错误，请稍后重试'
    if (error.response) {
      const status = error.response.status
      if (status >= 500) message = '服务器开小差了（5xx）'
      else if (status === 404) message = '资源不存在（404）'
      else if (status === 401) {
        message = '未授权或登录已过期（401）'
        const auth = useAuthStore()
        auth.clear()
      } else if (status === 400) message = '请求参数有误（400）'
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请检查网络后重试'
    }
    return Promise.reject({ message, raw: error })
  }
)

export async function httpGet<T = any>(url: string, config?: HttpRequestConfig) {
  return instance.get<T, T>(url, config)
}
export async function httpPost<T = any>(url: string, data?: any, config?: HttpRequestConfig) {
  return instance.post<T, T>(url, data, config)
}
export async function httpPut<T = any>(url: string, data?: any, config?: HttpRequestConfig) {
  return instance.put<T, T>(url, data, config)
}
export async function httpDelete<T = any>(url: string, config?: HttpRequestConfig) {
  return instance.delete<T, T>(url, config)
}

export default instance
