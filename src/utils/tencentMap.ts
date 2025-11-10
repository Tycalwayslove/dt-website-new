import type { Ref } from 'vue'

type ContainerLike = string | HTMLElement | Ref<HTMLElement | null> | Ref<HTMLDivElement | null>

export interface InitMapOptions {
  container: ContainerLike
  address: string
  city?: string
  zoom?: number
  markerTitle?: string
}

export interface InitMapResult {
  map: any
  marker: any
  infoWindow: any
  location: { lat: number; lng: number }
}

const resolveContainer = (container: ContainerLike): HTMLElement | null => {
  if (typeof container === 'string') {
    return document.getElementById(container)
  }
  if (container && typeof (container as any).value !== 'undefined') {
    return (container as Ref<HTMLElement | null>).value
  }
  return container as HTMLElement | null
}

const loadTMapScript = (key: string) => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).TMap) {
      resolve()
      return
    }
    const existing = document.getElementById('qqmap-script')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('QQ Map script failed to load')))
      return
    }
    const script = document.createElement('script')
    script.id = 'qqmap-script'
    script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${key}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('QQ Map script failed to load'))
    document.head.appendChild(script)
  })
}

const searchPOI = async (key: string, address: string, city?: string) => {
  const boundary = city
    ? `region(${encodeURIComponent(city)},0)`
    : 'nearby(22.53318,113.93042,10000)'
  const url = `https://apis.map.qq.com/ws/place/v1/search?keyword=${encodeURIComponent(address)}&boundary=${boundary}&key=${key}&orderby=_distance`
  const data = await jsonp(url)
  if (data && data.status === 0 && Array.isArray(data.data) && data.data.length > 0) {
    // 更严格的筛选：仅在包含“科兴”相关关键词时才选用 POI
    const best =
      data.data.find((d: any) =>
        /(科兴科学园|科兴科技园|科兴)/i.test(`${d.title} ${d.address || ''}`)
      ) || null
    return best
  }
  return null
}

const geocode = async (key: string, address: string, city?: string) => {
  const url =
    `https://apis.map.qq.com/ws/geocoder/v1/?address=${encodeURIComponent(address)}&key=${key}` +
    (city ? `&region=${encodeURIComponent(city)}` : '')
  const data = await jsonp(url)
  if (data && data.status === 0 && data.result?.location) {
    return data.result
  }
  return null
}

export async function initTencentMap(options: InitMapOptions): Promise<InitMapResult> {
  const key = (import.meta as any).env?.VITE_TENCENT_MAP_KEY
  if (!key) throw new Error('Missing VITE_TENCENT_MAP_KEY in environment')

  await loadTMapScript(key)
  const TMap = (window as any).TMap
  const el = resolveContainer(options.container)
  if (!el) throw new Error('Map container not found')

  const center = new TMap.LatLng(22.53318, 113.93042)
  const map = new TMap.Map(el, { center, zoom: options.zoom ?? 16 })

  // Prefer POI search, fallback to geocoder
  let lat = center.lat
  let lng = center.lng
  let title = options.markerTitle || '公司位置'
  let addressText = options.address

  const poi = await searchPOI(key, options.address, options.city)
  console.log('POI Search Result:', poi)
  if (poi && poi.location) {
    lat = poi.location.lat
    lng = poi.location.lng
    title = poi.title || title
    addressText = poi.address || addressText
  } else {
    const geo = await geocode(key, options.address, options.city)
    console.log('Geocoder Result:', geo)
    if (geo?.location) {
      lat = geo.location.lat
      lng = geo.location.lng
    }
  }

  const loc = new TMap.LatLng(lat, lng)
  console.log('Map Center:', loc)
  map.setCenter(loc)

  const marker = new TMap.MultiMarker({
    map,
    styles: {
      company: new TMap.MarkerStyle({ width: 28, height: 42, anchor: { x: 14, y: 42 } }),
    },
    geometries: [
      {
        id: 'company',
        styleId: 'company',
        position: loc,
        properties: { title, address: addressText },
      },
    ],
  })

  const infoWindow = new TMap.InfoWindow({
    map,
    position: loc,
    content: `<div style=\"font-size:14px;\"><strong>${title}</strong><br/>${addressText}</div>`,
  })
  infoWindow.close()
  marker.on('click', (evt: any) => {
    const pos = evt.geometry.position
    infoWindow.setPosition(pos)
    infoWindow.open()
  })

  return { map, marker, infoWindow, location: { lat, lng } }
}

// JSONP 工具：给 URL 追加 output=jsonp&callback，并通过 script 标签拿结果以绕过 CORS
function jsonp(url: string, timeout = 10000): Promise<any> {
  return new Promise((resolve, reject) => {
    const cbName = `__qqmap_cb_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const sep = url.includes('?') ? '&' : '?'
    const src = `${url}${sep}output=jsonp&callback=${cbName}`

    let timer: any
    const cleanup = () => {
      try {
        delete (window as any)[cbName]
      } catch {}
      const script = document.getElementById(cbName)
      if (script && script.parentNode) script.parentNode.removeChild(script)
      if (timer) clearTimeout(timer)
    }

    ;(window as any)[cbName] = (data: any) => {
      cleanup()
      resolve(data)
    }

    const script = document.createElement('script')
    script.id = cbName
    script.src = src
    script.onerror = () => {
      cleanup()
      reject(new Error('JSONP 请求失败'))
    }
    document.body.appendChild(script)

    timer = setTimeout(() => {
      cleanup()
      reject(new Error('JSONP 请求超时'))
    }, timeout)
  })
}
