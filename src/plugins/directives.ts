import type { App, DirectiveBinding } from 'vue'

function createLazyDirective() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLImageElement
          const dataSrc = el.getAttribute('data-src')
          if (dataSrc) {
            el.src = dataSrc
            el.removeAttribute('data-src')
          }
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '100px' }
  )

  return {
    mounted(el: HTMLImageElement) {
      io.observe(el)
    },
  }
}

function animateOnVisible(el: HTMLElement, binding: DirectiveBinding) {
  const cls = typeof binding.value === 'string' ? binding.value : 'animate-fade-in'
  el.classList.add('opacity-0')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0')
          el.classList.add(cls)
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '50px' }
  )
  io.observe(el)
}

/**
 * 文本淡入上移动画指令：v-fade-in-up
 * 可选：绑定值为数字（毫秒）或对象 { delay: number } 设置动画延迟
 */
function fadeInUpOnVisible(
  el: HTMLElement,
  binding: DirectiveBinding<number | { delay?: number }>
) {
  el.classList.add('opacity-0')

  const delay =
    typeof binding.value === 'number'
      ? binding.value
      : typeof binding.value === 'object' && binding.value?.delay
        ? binding.value.delay
        : 0

  if (delay && Number.isFinite(delay)) {
    el.style.animationDelay = `${delay}ms`
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0')
          el.classList.add('animate-fade-in-up')
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '50px' }
  )
  io.observe(el)
}

/**
 * 左/右方向淡入指令：v-fade-in-left / v-fade-in-right
 * 可选：绑定值为数字（毫秒）或对象 { delay: number }
 */
function fadeInSideOnVisible(
  el: HTMLElement,
  binding: DirectiveBinding<number | { delay?: number }>,
  side: 'left' | 'right'
) {
  el.classList.add('opacity-0')
  const delay =
    typeof binding.value === 'number'
      ? binding.value
      : typeof binding.value === 'object' && binding.value?.delay
        ? binding.value.delay
        : 0
  if (delay && Number.isFinite(delay)) {
    el.style.animationDelay = `${delay}ms`
  }
  const cls = side === 'left' ? 'animate-fade-in-left' : 'animate-fade-in-right'
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0')
          el.classList.add(cls)
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '50px' }
  )
  io.observe(el)
}

/**
 * 级联出现：父级可见后，子元素依次淡入
 * 用法：v-stagger，或 v-stagger="{ interval: 120, selector: '.item', from: 'left' }"
 */
function staggerOnVisible(
  el: HTMLElement,
  binding: DirectiveBinding<
    | number
    | { interval?: number; selector?: string; from?: 'up' | 'left' | 'right'; delay?: number }
  >
) {
  const opts = typeof binding.value === 'number' ? { interval: binding.value } : binding.value || {}
  const interval = Math.max(0, opts.interval ?? 100)
  const baseDelay = Math.max(0, opts.delay ?? 0)
  const from = opts.from ?? 'up'
  const clsMap = {
    up: 'animate-fade-in-up',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right',
  } as const
  const cls = clsMap[from]

  const targets: HTMLElement[] = opts.selector
    ? (Array.from(el.querySelectorAll(opts.selector)) as HTMLElement[])
    : (Array.from(el.children) as HTMLElement[])

  if (!targets.length) return
  targets.forEach((child) => child.classList.add('opacity-0'))

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          targets.forEach((child, idx) => {
            child.style.animationDelay = `${baseDelay + idx * interval}ms`
            child.classList.remove('opacity-0')
            child.classList.add(cls)
          })
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '50px' }
  )
  io.observe(el)
}

/**
 * 背景图懒加载：v-lazy-bg，元素进入视口时将 data-bg 或绑定值设为背景图
 */
function createLazyBgDirective() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const dataBg = el.getAttribute('data-bg')
          const bg = dataBg || ''
          if (bg) {
            el.style.backgroundImage = `url(${bg})`
            el.removeAttribute('data-bg')
          }
          io.unobserve(el)
        }
      })
    },
    { rootMargin: '100px' }
  )
  return {
    mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
      if (binding.value && typeof binding.value === 'string') {
        el.setAttribute('data-bg', binding.value)
      }
      io.observe(el)
    },
  }
}

export default function registerDirectives(app: App) {
  app.directive('lazy', createLazyDirective())
  app.directive('lazy-bg', createLazyBgDirective())
  app.directive('animate', {
    mounted: animateOnVisible,
  })
  app.directive('fade-in-up', {
    mounted: fadeInUpOnVisible,
  })
  app.directive('fade-in-left', {
    mounted: (el, binding) => fadeInSideOnVisible(el, binding, 'left'),
  })
  app.directive('fade-in-right', {
    mounted: (el, binding) => fadeInSideOnVisible(el, binding, 'right'),
  })
  app.directive('stagger', {
    mounted: staggerOnVisible,
  })
  /**
   * 鼠标移入聚焦缩放：v-hover-zoom
   * 用法：
   *  - v-hover-zoom（默认 scale=1.05, duration=250ms, shadow=true）
   *  - v-hover-zoom="1.08"（只设置缩放）
   *  - v-hover-zoom="{ scale: 1.06, duration: 200, easing: 'ease-out', shadow: false }"
   */
  app.directive('hover-zoom', {
    mounted(
      el: HTMLElement,
      binding: DirectiveBinding<
        | number
        | {
            scale?: number
            duration?: number
            easing?: string
            shadow?: boolean
            brightness?: number
            saturate?: number
          }
      >
    ) {
      const opts =
        typeof binding.value === 'number' ? { scale: binding.value } : binding.value || {}
      const scale = Math.min(Math.max(opts.scale ?? 1.05, 1.0), 1.3)
      const duration = Math.min(Math.max(opts.duration ?? 250, 0), 2000)
      const easing = opts.easing ?? 'ease'
      const shadow = opts.shadow ?? true
      const brightness = Math.min(Math.max(opts.brightness ?? 1.02, 1.0), 1.5)
      const saturate = Math.min(Math.max(opts.saturate ?? 1.05, 1.0), 2.0)

      // 若绑定在容器上：优先作用于其内第一个 <img>，否则作用于自身
      const effectEl: HTMLElement = el.tagName === 'IMG'
        ? el
        : ((el.querySelector('img') as HTMLElement) || el)
      const targetEl = el

      // 初始化过渡在实际变换的元素上
      effectEl.classList.add('hover-zoom-ready')
      effectEl.style.transition = `transform ${duration}ms ${easing}, filter ${duration}ms ${easing}, box-shadow ${duration}ms ${easing}`
      effectEl.style.transformOrigin = 'center center'

      const enter = () => {
        if (binding.value && typeof binding.value === 'object') {
          effectEl.style.transform = `scale(${scale})`
          effectEl.style.filter = `brightness(${brightness}) saturate(${saturate})`
          effectEl.style.boxShadow = shadow ? '0 6px 20px rgba(0,0,0,0.12)' : 'none'
        } else {
          effectEl.classList.add('hover-zoom-active')
        }
      }
      const leave = () => {
        if (binding.value && typeof binding.value === 'object') {
          effectEl.style.transform = ''
          effectEl.style.filter = ''
          effectEl.style.boxShadow = ''
        } else {
          effectEl.classList.remove('hover-zoom-active')
        }
      }

      targetEl.addEventListener('mouseenter', enter)
      targetEl.addEventListener('mouseleave', leave)
      targetEl.addEventListener('focusin', enter)
      targetEl.addEventListener('focusout', leave)
      ;(el as any).__hoverZoomCleanup = () => {
        targetEl.removeEventListener('mouseenter', enter)
        targetEl.removeEventListener('mouseleave', leave)
        targetEl.removeEventListener('focusin', enter)
        targetEl.removeEventListener('focusout', leave)
      }
    },
    unmounted(el: HTMLElement) {
      if ((el as any).__hoverZoomCleanup) {
        ;(el as any).__hoverZoomCleanup()
      }
    },
  })
}
