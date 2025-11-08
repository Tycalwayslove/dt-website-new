// Helper for building OSS URLs for images with configurable base
const DEFAULT_OSS_BASE = 'https://awu-file.oss-cn-guangzhou.aliyuncs.com/website/'

export const OSS_BASE = (import.meta.env?.VITE_OSS_BASE_URL as string) || DEFAULT_OSS_BASE

function joinUrl(base: string, segment: string): string {
  const b = base.endsWith('/') ? base : base + '/'
  const s = segment.replace(/^\/+/, '')
  return b + s
}

export function ossUrl(relativePath: string): string {
  return joinUrl(OSS_BASE, relativePath)
}

// Build image URL from `assets/img/` relative path (mirror on OSS at `/website/img/`)
export function img(path: string): string {
  return ossUrl(joinUrl('img/', path))
}