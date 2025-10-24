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

export default function registerDirectives(app: App) {
  app.directive('lazy', createLazyDirective())
  app.directive('animate', {
    mounted: animateOnVisible,
  })
}
