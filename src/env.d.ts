/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WECHAT_APPID?: string
  readonly VITE_WECHAT_ENV_VERSION?: 'release' | 'trial' | 'develop'
  readonly VITE_WECHAT_PATH?: string
  readonly VITE_WECHAT_QUERY?: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
