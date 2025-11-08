// 为 AxiosRequestConfig 扩展自定义字段，用于控制是否注入鉴权头
import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig<D = any> {
    /** 当为 false 时，HTTP 拦截器不注入 Authorization 头 */
    withAuth?: boolean
  }
}