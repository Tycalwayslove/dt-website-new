import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: { title: '关于我们' },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/pages/Products.vue'),
    meta: { title: '产品与服务' },
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/pages/News.vue'),
    meta: { title: '新闻动态' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
    meta: { title: '联系我们' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

NProgress.configure({ showSpinner: false })

router.beforeEach(() => {
  NProgress.start()
  return true
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = String(to.meta.title) + ' - 公司官网'
  }
  NProgress.done()
})

export default router
