<template>
  <div class="min-h-screen bg-white">
    <!-- 桌面端：两列信息 + 图片占位 -->
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- 1. 顶部：左文右图 -->
        <section v-stagger="{ delay: 300 }" class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h1 class="text-[56px] tracking-tight mb-[30px] text-black font-wendao">
              喵呜AI 小程序
            </h1>
            <div class="w-[120px] h-[3px] bg-black mb-[30px]"></div>

            <p class="text-black text-xl leading-relaxed mb-8">
              这次的喵呜AI小程序 V2.0 从顾问人格化/产品分析可视化/品牌形象系统化
              三点入手基于之前发布的 V1.0 进行核心理念的 强化 和
              升级。它不只是改版，而是一次品牌的信任与升级，一次体验哲学的加强与重构!未来我们会继续基于「专业顾问，的核心理念持续优化和迭代产品。
            </p>
            <div
              class="relative inline-block"
              ref="qrTriggerDesktop"
              @mouseenter="onEnter"
              @mouseleave="onLeave"
            >
              <button
                class="apply-btn btn-main-white"
                @click="showCode = !showCode"
                aria-haspopup="true"
                :aria-expanded="showCode"
              >
                扫码体验
              </button>
              <Transition name="fade-down">
                <!-- v-show="showCode" -->
                <div
                  class="absolute top-full left-0 mt-2 bg-white border border-black shadow-lg rounded-xl p-3 z-50"
                  role="tooltip"
                  aria-live="polite"
                >
                  <img
                    :src="miniProgramCode"
                    alt="小程序二维码"
                    width="160"
                    height="160"
                    class="object-contain"
                    loading="lazy"
                  />
                  <p class="text-xs text-gray-600 mt-2">扫码即可体验喵呜AI小程序</p>
                </div>
              </Transition>
            </div>
          </div>
          <div class="flex item-center">
            <!-- 图片展示（等比缩放 800x546） -->
            <div class="w-full" style="aspect-ratio: 800 / 546">
              <img
                v-hover-zoom
                :src="img01"
                alt="喵呜AI 小程序概览"
                class="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <!-- 2. 左图右文：专业顾问 -->
        <section v-stagger="{ delay: 300 }" class="grid grid-cols-2 gap-16 items-center">
          <div class="flex item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img
                v-hover-zoom
                :src="img02"
                alt="专业顾问模块"
                class="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 class="text-[56px] font-wendao tracking-tight mb-5 text-black">喵呜AI 专业顾问</h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              从「销售」到「专业顾问」的强化升级
            </p>
            <p class="text-black text-base leading-relaxed">
              从「特征、意图、专业建议」构成推荐体系，基于真实用户行为数据训练的顾问模型，为用户提供高可信度的选购建议与商品解析，减少决策成本，提升购物体验。
            </p>
          </div>
        </section>

        <!-- 3. 左文右图：人格化展示 -->
        <section v-stagger="{ delay: 300 }" class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-[56px] font-wendao tracking-tight mb-5 text-black">
              数字顾问的「人格化展示」
            </h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              #专业领域简要说明|#可视知识呈现【#多入口引导与「顾问」直接展开对话
            </p>
            <p class="text-black text-base leading-relaxed">
              首屏的数字人形象展示其擅长的专业领域(如家居生活，美妆护肤，各领域专业咨询等)，并通过调动相关领域大模型以，动态呈现其A1知识库结构，让用户感知:这个顾问“懂我”。喵鸣A1通过对顾问的专业形象的塑造以及后续对话中顾问呈现的主动互动，让用户第一眼就感受到专业与温度。这种视觉与认知的绑定，降低了用户对
              喵鸣A1 的陌生感，增强了专业与信任感，你不需要关注大量的店铺与商品而是从自己的
              衣/食/住/行 出发仅仅通过关注相应的顾问就能最短时间买到最合适最可靠的商品。
            </p>
          </div>
          <div class="flex justify-end item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img
                v-hover-zoom
                :src="img03"
                alt="人格化展示"
                class="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <!-- 4. 左图右文：服务逻辑 -->
        <section v-stagger="{ delay: 300 }" class="grid grid-cols-2 gap-16 items-center">
          <div class="flex item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img
                v-hover-zoom
                :src="img04"
                alt="服务逻辑"
                class="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 class="text-[56px] font-wendao tracking-tight mb-5 text-black">
              顾问式电商服务逻辑
            </h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              #认知设计|#行为引导|#信任教育
            </p>
            <p class="text-black text-base leading-relaxed">
              喵鸣AI的顾问式电商是目前一种全新的电商模式，这个区域设计目的在于喵鸣A!推广前期降低新用户的理解成本，用户在几秒内明白玩法，进入参与状态。喵鸣A1需要被用户“理解”后才会被用户加入到自己的日常生活流去“使用”。用极简图文去讲述复杂逻辑。每一步都通过“引导”，让用户自然而然完成认知路径:从“看不懂”到“想尝试”。它既是产品功能导览，也是信任建构的第二步。
            </p>
          </div>
        </section>

        <!-- 5. 左文右图：技术与体验融合 -->
        <section v-stagger="{ delay: 300 }" class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-[56px] font-wendao tracking-tight mb-5 text-black">
              AI技术x体验的智能融合
            </h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              AI知识图谱+用户画像系统+智能推荐引擎
            </p>
            <p class="text-black text-base leading-relaxed">
              在底层架构上，我们引入了
              AI知识图谱+用户画像系统+智能推荐引擎，实现顾问与用户之间的「语义共振」。V2.0是一次信任的革命，一次体验语言的重写。它标志着顾问式电商从理念走向现实，从工具走向伙伴。在这个版本里我们用设计让科技有了更突出的专业人格，用AI让商业重新有人味。
            </p>
          </div>
          <div class="flex justify-end item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img
                v-hover-zoom
                :src="img05"
                alt="技术与体验融合"
                class="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 移动端：上下布局（图片在上、文字在下） -->
    <div class="lg:hidden">
      <div class="container mx-auto px-4 py-10 space-y-12">
        <!-- 1. 喵呜AI 小程序：图上文下 -->
        <section v-stagger="{ delay: 300 }" class="space-y-4">
          <div class="w-full" style="aspect-ratio: 800 / 546">
            <img
              :src="img01"
              alt="喵呜AI 小程序概览"
              class="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <h1 class="text-2xl font-wendao text-black">喵呜AI 小程序</h1>
          <p class="text-black text-sm leading-relaxed">
            这次的喵呜AI小程序 V2.0
            从顾问人格化/产品分析可视化/品牌形象系统化三点入手，基于之前发布的 V1.0
            进行核心理念的强化和升级。它不只是改版，而是一次品牌的信任与升级，一次体验哲学的加强与重构！未来我们会继续基于「专业顾问」的核心理念持续优化和迭代产品。
          </p>
          <div class="relative inline-block">
            <!-- 微信内置浏览器：通过原生 DOM 注入 open tag，规避模板内 <script> 报错 -->
            <div v-if="isWeChat && wechatAppId">
              <!-- JSSDK 未加载或 open tag 尚未注入前的占位与回退按钮（仍可走 Scheme） -->
              <button
                v-show="!wxLaunchRendered"
                class="inline-flex items-center px-5 h-10 rounded-xl bg-white border-2 border-black text-black font-medium hover:bg-miaowu-green hover:border-miaowu-green hover:text-black transition-colors"
                @click="handleMobileLaunch"
                aria-haspopup="true"
                :aria-expanded="showCode"
              >
                马上体验
              </button>
              <div ref="wxLaunchContainer"></div>
            </div>
            <!-- 非微信浏览器：点击跳转 URL Scheme；失败则展示二维码提示扫码 -->
            <button
              v-else
              class="inline-flex items-center px-5 h-10 rounded-xl bg-white border-2 border-black text-black font-medium hover:bg-miaowu-green hover:border-miaowu-green hover:text-black transition-colors"
              @click="handleMobileLaunch"
              aria-haspopup="true"
              :aria-expanded="showCode"
            >
              马上体验
            </button>
          </div>
        </section>

        <!-- 2. 专业顾问：图上文下 -->
        <section v-stagger="{ delay: 500 }" class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img02" alt="专业顾问模块" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-wendao text-black">喵呜AI 专业顾问</h2>
          <p class="text-black text-base leading-relaxed font-medium">
            从「销售」到「专业顾问」的强化升级
          </p>
          <p class="text-black text-sm leading-relaxed">
            从「特征、意图、专业建议」构成推荐体系，基于真实用户行为数据训练的顾问模型，为用户提供高可信度的选购建议与商品解析，减少决策成本，提升购物体验。
          </p>
        </section>

        <!-- 3. 人格化展示：图上文下 -->
        <section v-stagger="{ delay: 300 }" class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img03" alt="人格化展示" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-wendao text-black">数字顾问的「人格化展示」</h2>
          <p class="text-black text-base leading-relaxed font-medium">
            #专业领域简要说明 | #可视知识呈现 | #多入口引导与「顾问」直接对话
          </p>
          <p class="text-black text-sm leading-relaxed">
            首屏的数字人形象展示其擅长的专业领域，并通过调动相关领域大模型以动态呈现其 AI
            知识库结构，让用户感知：这个顾问“懂我”。
          </p>
        </section>

        <!-- 4. 服务逻辑：图上文下 -->
        <section v-stagger="{ delay: 300 }" class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img04" alt="服务逻辑" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-wendao text-black">顾问式电商服务逻辑</h2>
          <p class="text-black text-base leading-relaxed font-medium">
            #认知设计 | #行为引导 | #信任教育
          </p>
          <p class="text-black text-sm leading-relaxed">
            用极简图文讲述复杂逻辑，通过逐步引导让用户自然完成认知路径，从“看不懂”到“想尝试”，提升理解效率与参与度。
          </p>
        </section>

        <!-- 5. 技术与体验融合：图上文下 -->
        <section v-stagger="{ delay: 300 }" class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img05" alt="技术与体验融合" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-wendao text-black">AI技术 × 体验的智能融合</h2>
          <p class="text-black text-base leading-relaxed font-medium">
            AI知识图谱 · 用户画像系统 · 智能推荐引擎
          </p>
          <p class="text-black text-sm leading-relaxed">
            我们在底层引入多项能力，实现顾问与用户之间的「语义共振」。V2.0
            标志着顾问式电商从理念走向现实，从工具走向伙伴。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiGenerateWechatScheme } from '@/api/index.js'
import { apiGetWechatJsSdkConfig } from '@/api/wechat.js'
import miniProgramCode from '@/assets/img/mini-program-code.png'
import img01 from '@/assets/img/product-miniprogram-01.png'
import img02 from '@/assets/img/product-miniprogram-02.png'
import img03 from '@/assets/img/product-miniprogram-03.png'
import img04 from '@/assets/img/product-miniprogram-04.png'
import img05 from '@/assets/img/product-miniprogram-05.png'
import {
  buildWechatSchemeParams,
  isWeChatBrowser,
  loadWechatJSSDK,
  openMiniProgramByScheme,
} from '@/utils/wechat.js'
import { onMounted, onUnmounted, ref } from 'vue'

const showCode = ref(false)
const qrTriggerDesktop = ref<HTMLElement | null>(null)
let hideTimer: number | null = null

// 存储微信小程序 URL Scheme（后端生成）
const miniProgramScheme = ref<string>('')
// 环境：是否在微信浏览器中
const isWeChat = ref<boolean>(false)
// 小程序参数（通过工具函数从环境变量构建，避免直接使用 import.meta）
const wechatAppId = ref<string>('')
const wechatPath = ref<string>('')
const wechatQuery = ref<string>('')
// open tag 容器与事件句柄
const wxLaunchContainer = ref<HTMLElement | null>(null)
let wxLaunchEl: HTMLElement | null = null
let tagLaunchHandler: ((e: Event) => void) | null = null
let tagErrorHandler: ((e: Event) => void) | null = null
const wxLaunchRendered = ref<boolean>(false)

// 移动端点击行为（非微信浏览器）：优先 URL Scheme，失败则展示二维码
function handleMobileLaunch() {
  if (miniProgramScheme.value) {
    const ok = openMiniProgramByScheme(miniProgramScheme.value)
    if (!ok) {
      showCode.value = true
    }
  } else {
    // 若尚未拿到 scheme，临时展示二维码
    showCode.value = true
  }
}

const onEnter = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  showCode.value = true
}

const onLeave = () => {
  hideTimer = window.setTimeout(() => {
    showCode.value = false
  }, 120)
}

const handleClickOutside = (e: MouseEvent) => {
  const el = qrTriggerDesktop.value
  if (!el) return
  if (!el.contains(e.target as Node)) {
    showCode.value = false
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') showCode.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  isWeChat.value = isWeChatBrowser()

  // 从环境变量构建默认参数（在工具函数中读取 import.meta.env）
  const cfg = buildWechatSchemeParams()
  wechatAppId.value = cfg.appid || ''
  wechatPath.value = cfg.jump_wxa?.path || ''
  wechatQuery.value = cfg.jump_wxa?.query || ''

  // 微信内置浏览器加载 JSSDK，并绑定 open tag 事件
  if (isWeChat.value) {
    loadWechatJSSDK()
      .then(async () => {
        try {
          const pageUrl = window.location.href.split('#')[0]
          const cfgResp = await apiGetWechatJsSdkConfig(pageUrl)
          const cfg: any = cfgResp?.data || {}
          const wxObj = (window as any).wx
          if (!wxObj) throw new Error('wx not found after JSSDK load')
          console.log('hhahha')
          console.log(cfg)

          wxObj.config({
            debug: true,
            appId: cfg.appId || wechatAppId.value,
            timestamp: cfg.timestamp,
            nonceStr: cfg.nonceStr,
            signature: cfg.signature,
            jsApiList: Array.isArray(cfg.jsApiList) ? cfg.jsApiList : [],
            openTagList: Array.isArray(cfg.openTagList)
              ? cfg.openTagList
              : ['wx-open-launch-weapp'],
          })

          wxObj.ready(() => {
            const container = wxLaunchContainer.value
            if (!container) return
            // 创建 open tag 元素
            const openTag = document.createElement('wx-open-launch-weapp')
            openTag.id = 'wx-launch-weapp'
            openTag.style.display = 'inline-block'
            if (wechatAppId.value) openTag.setAttribute('appid', wechatAppId.value)
            if (wechatPath.value) openTag.setAttribute('path', wechatPath.value)
            if (wechatQuery.value) openTag.setAttribute('query', wechatQuery.value)
            // 注入模板按钮
            const scriptTpl = document.createElement('script')
            scriptTpl.type = 'text/wxtag-template'
            scriptTpl.innerHTML = `
<button class="inline-flex items-center px-5 h-10 rounded-xl bg-white border-2 border-black text-black font-medium hover:bg-miaowu-green hover:border-miaowu-green hover:text-black transition-colors" aria-haspopup="true">马上体验</button>
            `
            openTag.appendChild(scriptTpl)
            container.innerHTML = ''
            container.appendChild(openTag)
            wxLaunchEl = openTag
            wxLaunchRendered.value = true
            // 事件处理
            tagLaunchHandler = () => {
              console.log('[wechat] open tag launch success')
            }
            tagErrorHandler = (e: any) => {
              console.warn('[wechat] open tag launch error:', e?.detail || e)
              if (miniProgramScheme.value) {
                openMiniProgramByScheme(miniProgramScheme.value)
              } else {
                // 保持按钮显示，无二维码回退
              }
            }
            openTag.addEventListener('launch', tagLaunchHandler)
            openTag.addEventListener('error', tagErrorHandler)
          })

          wxObj.error((err: any) => {
            console.warn('[wechat] wx.config error:', err)
            // 配置错误时保留占位按钮，仍可走 Scheme
            wxLaunchRendered.value = false
          })
        } catch (err) {
          console.warn('[wechat] get jsapi signature failed:', err)
          // 无法配置时保留占位按钮
          wxLaunchRendered.value = false
        }
      })
      .catch((err) => {
        console.warn('[wechat] load jssdk failed:', err)
      })
  }
  // 生成永久有效的 URL Scheme（不带鉴权头）
  apiGenerateWechatScheme(
    buildWechatSchemeParams({
      // 可在此覆盖 .env 的默认配置，例如临时指定路径或 query
      // path: '/pages/index/index',
      // query: 'from=web',
    })
  )
    .then((resp) => {
      const data: any = resp?.data
      // 兼容不同字段名
      const scheme =
        typeof data === 'string' ? data : data?.openlink || data?.scheme || data?.url_scheme || ''
      miniProgramScheme.value = scheme || ''
      if (miniProgramScheme.value) {
        console.log('[wechat] generated scheme:', miniProgramScheme.value)
      }
    })
    .catch((err) => {
      console.warn('[wechat] generate_scheme failed:', err?.message || err)
    })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  // 事件清理（若存在）
  if (wxLaunchEl) {
    try {
      if (tagLaunchHandler) wxLaunchEl.removeEventListener('launch', tagLaunchHandler)
      if (tagErrorHandler) wxLaunchEl.removeEventListener('error', tagErrorHandler)
    } catch {}
    wxLaunchEl = null
    tagLaunchHandler = null
    tagErrorHandler = null
  }
})
</script>

<style scoped>
.qr-popper {
  position: absolute;
  background: #fff;
  border: 1px solid #000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 12px;
  z-index: 10;
}

.qr-popper-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 12px;
}

.qr-popper-arrow {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  transform: rotate(45deg);
}

.qr-popper-arrow.left {
  left: -6px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.fade-scale-right-enter-active,
.fade-scale-right-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-scale-right-enter-from,
.fade-scale-right-leave-to {
  opacity: 0;
  transform: translateY(-50%) scale(0.95);
}
.fade-scale-right-enter-to,
.fade-scale-right-leave-from {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}
.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.12s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
}
.fade-down-enter-to,
.fade-down-leave-from {
  opacity: 1;
}
</style>
