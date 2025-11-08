// 最小类型声明以通过 TS 类型检查；运行时仍优先尝试本地依赖，失败时走 CDN 回退
declare module 'vconsole' {
  export default class VConsole {
    constructor(options?: any)
    setOption?(key: string, value: any): void
    destroy?(): void
  }
}