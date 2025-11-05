// Map TS path aliases to actual files to help the TS language service
// keep using '@/...' imports without module-not-found diagnostics.

declare module '@/stores/auth' {
  export * from '../stores/auth'
}

declare module '@/stores/theme' {
  export * from '../stores/theme'
}

declare module '@/stores/ui' {
  export * from '../stores/ui'
}

declare module '@/api/user' {
  export * from '../api/user'
}

declare module '@/api/http' {
  export * from '../api/http'
}

declare module '@/api/types' {
  export * from '../api/types'
}