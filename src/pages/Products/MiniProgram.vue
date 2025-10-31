<template>
  <div class="min-h-screen bg-white">
    <!-- 桌面端：两列信息 + 图片占位 -->
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <div class="space-y-40">
        <!-- 1. 顶部：左文右图 -->
        <section class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h1 class="text-[56px] font-extrabold tracking-tight mb-[30px]">喵呜AI 小程序</h1>
            <div class="w-[120px] h-[3px] bg-black mb-[30px]"></div>

            <p class="text-black text-xl leading-relaxed mb-8">
              这次的喵呜AI小程序 V2.0 从顾问人格化/产品分析可视化/品牌形象系统化
              三点入手基于之前发布的 V1.0 进行核心理念的 强化 和
              升级。它不只是改版，而是一次品牌的信任与升级，一次体验哲学的加强与重构!未来我们会继续基于「专业顾问，的核心理念持续优化和迭代产品。
            </p>
            <button
              class="inline-flex items-center px-20 h-12 rounded-2xl bg-white border-2 border-black text-black font-base hover:bg-miaowu-green hover:border-miaowu-green hover:text-white transition-colors duration-200"
            >
              扫码体验
            </button>
          </div>
          <div class="flex item-center">
            <!-- 图片展示（等比缩放 800x546） -->
            <div class="w-full" style="aspect-ratio: 800 / 546">
              <img :src="img01" alt="喵呜AI 小程序概览" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <!-- 2. 左图右文：专业顾问 -->
        <section class="grid grid-cols-2 gap-16 items-center">
          <div class="flex item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img :src="img02" alt="专业顾问模块" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 class="text-[56px] font-extrabold tracking-tight mb-5">喵呜AI 专业顾问</h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              从「销售」到「专业顾问」的强化升级
            </p>
            <p class="text-black text-base leading-relaxed">
              从「特征、意图、专业建议」构成推荐体系，基于真实用户行为数据训练的顾问模型，为用户提供高可信度的选购建议与商品解析，减少决策成本，提升购物体验。
            </p>
          </div>
        </section>

        <!-- 3. 左文右图：人格化展示 -->
        <section class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-[56px] font-extrabold tracking-tight mb-5">数字顾问的「人格化展示」</h2>
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
              <img :src="img03" alt="人格化展示" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <!-- 4. 左图右文：服务逻辑 -->
        <section class="grid grid-cols-2 gap-16 items-center">
          <div class="flex item-center">
            <div class="w-full" style="aspect-ratio: 560 / 300">
              <img :src="img04" alt="服务逻辑" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 class="text-[56px] font-extrabold tracking-tight mb-5">顾问式电商服务逻辑</h2>
            <p class="text-black text-xl leading-relaxed mb-5 font-medium">
              #认知设计|#行为引导|#信任教育
            </p>
            <p class="text-black text-base leading-relaxed">
              喵鸣AI的顾问式电商是目前一种全新的电商模式，这个区域设计目的在于喵鸣A!推广前期降低新用户的理解成本，用户在几秒内明白玩法，进入参与状态。喵鸣A1需要被用户“理解”后才会被用户加入到自己的日常生活流去“使用”。用极简图文去讲述复杂逻辑。每一步都通过“引导”，让用户自然而然完成认知路径:从“看不懂”到“想尝试”。它既是产品功能导览，也是信任建构的第二步。
            </p>
          </div>
        </section>

        <!-- 5. 左文右图：技术与体验融合 -->
        <section class="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-[56px] font-extrabold tracking-tight mb-5">AI技术x体验的智能融合</h2>
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
              <img :src="img05" alt="技术与体验融合" class="rounded-2xl w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 移动端：上下布局（图片在上、文字在下） -->
    <div class="lg:hidden">
      <div class="container mx-auto px-4 py-10 space-y-12">
        <!-- 1. 喵呜AI 小程序：图上文下 -->
        <section class="space-y-4">
          <div class="w-full" style="aspect-ratio: 800 / 546">
            <img :src="img01" alt="喵呜AI 小程序概览" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h1 class="text-2xl font-extrabold">喵呜AI 小程序</h1>
          <p class="text-black text-sm leading-relaxed">
            这次的喵呜AI小程序 V2.0 从顾问人格化/产品分析可视化/品牌形象系统化三点入手，基于之前发布的 V1.0 进行核心理念的强化和升级。它不只是改版，而是一次品牌的信任与升级，一次体验哲学的加强与重构！未来我们会继续基于「专业顾问」的核心理念持续优化和迭代产品。
          </p>
          <button class="inline-flex items-center px-5 h-10 rounded-xl bg-white border-2 border-black text-black font-medium hover:bg-miaowu-green hover:border-miaowu-green hover:text-white transition-colors">
            扫码体验
          </button>
        </section>

        <!-- 2. 专业顾问：图上文下 -->
        <section class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img02" alt="专业顾问模块" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-bold">喵呜AI 专业顾问</h2>
          <p class="text-black text-base leading-relaxed font-medium">从「销售」到「专业顾问」的强化升级</p>
          <p class="text-black text-sm leading-relaxed">
            从「特征、意图、专业建议」构成推荐体系，基于真实用户行为数据训练的顾问模型，为用户提供高可信度的选购建议与商品解析，减少决策成本，提升购物体验。
          </p>
        </section>

        <!-- 3. 人格化展示：图上文下 -->
        <section class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img03" alt="人格化展示" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-bold">数字顾问的「人格化展示」</h2>
          <p class="text-black text-base leading-relaxed font-medium">
            #专业领域简要说明 | #可视知识呈现 | #多入口引导与「顾问」直接对话
          </p>
          <p class="text-black text-sm leading-relaxed">
            首屏的数字人形象展示其擅长的专业领域，并通过调动相关领域大模型以动态呈现其 AI 知识库结构，让用户感知：这个顾问“懂我”。
          </p>
        </section>

        <!-- 4. 服务逻辑：图上文下 -->
        <section class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img04" alt="服务逻辑" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-bold">顾问式电商服务逻辑</h2>
          <p class="text-black text-base leading-relaxed font-medium">#认知设计 | #行为引导 | #信任教育</p>
          <p class="text-black text-sm leading-relaxed">
            用极简图文讲述复杂逻辑，通过逐步引导让用户自然完成认知路径，从“看不懂”到“想尝试”，提升理解效率与参与度。
          </p>
        </section>

        <!-- 5. 技术与体验融合：图上文下 -->
        <section class="space-y-4">
          <div class="w-full" style="aspect-ratio: 560 / 300">
            <img :src="img05" alt="技术与体验融合" class="w-full h-full rounded-2xl object-cover" />
          </div>
          <h2 class="text-xl font-bold">AI技术 × 体验的智能融合</h2>
          <p class="text-black text-base leading-relaxed font-medium">AI知识图谱 · 用户画像系统 · 智能推荐引擎</p>
          <p class="text-black text-sm leading-relaxed">
            我们在底层引入多项能力，实现顾问与用户之间的「语义共振」。V2.0 标志着顾问式电商从理念走向现实，从工具走向伙伴。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img01 from '@/assets/img/product-miniprogram-01.png'
import img02 from '@/assets/img/product-miniprogram-02.png'
import img03 from '@/assets/img/product-miniprogram-03.png'
import img04 from '@/assets/img/product-miniprogram-04.png'
import img05 from '@/assets/img/product-miniprogram-05.png'
</script>
