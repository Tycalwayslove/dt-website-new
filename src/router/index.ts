import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: { title: '首页' },
  },

  // 产品与服务（嵌套路由）
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/pages/Products.vue'),
    meta: { title: '产品与服务' },
    children: [
      {
        path: 'mini-program',
        name: 'ProductMiniProgram',
        component: () => import('@/pages/Products/MiniProgram.vue'),
        meta: { title: '喵呜AI 小程序' },
      },
      {
        path: 'app',
        name: 'ProductApp',
        component: () => import('@/pages/Products/App.vue'),
        meta: { title: '喵呜AI App' },
      },
      {
        path: 'supplier-console',
        name: 'ProductSupplierConsole',
        component: () => import('@/pages/Products/SupplierConsole.vue'),
        meta: { title: '供应商管理后台' },
      },
    ],
  },

  // 商务合作（嵌套路由）
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: () => import('@/pages/Cooperation.vue'),
    meta: { title: '商务合作' },
    children: [
      {
        path: 'suppliers',
        name: 'CooperationSuppliers',
        component: () => import('@/pages/Cooperation/Suppliers.vue'),
        meta: { title: '喵呜品牌供应商招募' },
      },
      {
        path: 'sellers',
        name: 'CooperationSellers',
        component: () => import('@/pages/Cooperation/Sellers.vue'),
        meta: { title: '喵呜AI卖手招募' },
      },
      {
        path: 'partners',
        name: 'CooperationPartners',
        component: () => import('@/pages/Cooperation/Partners.vue'),
        meta: { title: '其他商务合作' },
      },
    ],
  },

  // 关于我们（嵌套路由）
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: { title: '关于我们' },
    children: [
      {
        path: 'company',
        name: 'AboutCompany',
        component: () => import('@/pages/About/Company.vue'),
        meta: { title: '关于喵呜AI' },
      },
      {
        path: 'contact',
        name: 'AboutContact',
        component: () => import('@/pages/Contact.vue'),
        meta: { title: '联系我们' },
      },
    ],
  },

  // 法务（嵌套路由）
  {
    path: '/legal',
    name: 'Legal',
    component: () => import('@/pages/Legal.vue'),
    meta: { title: '服务与条款' },
    children: [
      {
        path: 'help',
        name: 'HelpCenter',
        component: () => import('@/pages/Legal/Help.vue'),
        meta: { title: '帮助中心' },
      },
      {
        path: 'privacy',
        name: 'PrivacyPolicy',
        component: () => import('@/pages/Legal/Privacy.vue'),
        meta: { title: '隐私协议' },
      },
      {
        path: 'terms',
        name: 'TermsOfService',
        component: () => import('@/pages/Legal/Terms.vue'),
        meta: { title: '服务条款' },
      },
    ],
  },

  // （已移除）服务中心

  // 兜底重定向
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    document.title = String(to.meta.title) + ' - 喵呜AI - 顾问式电商平台'
  }
  NProgress.done()
})

export default router
