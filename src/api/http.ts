import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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
  },
})

instance.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers = config.headers || {}
      ; (config.headers as any).Authorization = `Bearer ${auth.token}`
  }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    let message = '网络错误，请稍后重试'
    if (error.response) {
      const status = error.response.status
      if (status >= 500) message = '服务器开小差了（5xx）'
      else if (status === 404) message = '资源不存在（404）'
      else if (status === 401) {
        message = '未授权或登录已过期（401）'
        const auth = useAuthStore()
        const ui = useUiStore()
        auth.clear()
        ui.openReloginPrompt()
      } else if (status === 400) message = '请求参数有误（400）'
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请检查网络后重试'
    }
    return Promise.reject({ message, raw: error })
  }
)

export async function httpGet<T = any>(url: string, config?: AxiosRequestConfig) {
  return instance.get<T, T>(url, config)
}
export async function httpPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return instance.post<T, T>(url, data, config)
}
export async function httpPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return instance.put<T, T>(url, data, config)
}
export async function httpDelete<T = any>(url: string, config?: AxiosRequestConfig) {
  return instance.delete<T, T>(url, config)
}

export default instance
