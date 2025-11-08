<template>
  <section
    ref="helpSectionRef"
    class="min-h-screen bg-cover bg-center relative"
    :style="helpBgStyle"
  >
    <!-- pc端布局 -->
    <div class="container mx-auto px-20 lg:px-20 py-20 hidden lg:block">
      <!-- 顶部：标题与分割线 -->
      <div v-fade-in-up="{ delay: 300 }" class="relative">
        <h1 class="text-[56px] font-wendao text-white mb-3">帮助中心</h1>
      </div>
      <div v-fade-in-up="{ delay: 400 }" class="w-full h-px bg-white h-[3px]"></div>

      <!-- 内容：左右布局 -->
      <div class="relative pt-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <!-- 左侧：分类列表 -->
          <aside v-fade-in-up="{ delay: 500 }" class="md:col-span-3">
            <div class="space-y-4 text-white">
              <!-- 常见问题（可折叠） -->
              <div class="rounded-xl bg-white/10 p-4 border border-white/10">
                <button
                  class="w-full flex items-center justify-between text-left"
                  @click="((faqOpen = !faqOpen), selectCategory('faq'))"
                >
                  <div class="flex items-center gap-2">
                    <!-- 常见问题 icon -->
                    <svg
                      class="w-5 h-5 text-miaowu-green"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8a3 3 0 00-3 3h2a1 1 0 112 0c0 2-3 1.5-3 4" />
                      <circle cx="12" cy="17" r="1" />
                    </svg>
                    <span
                      class="font-semibold text-white"
                      :class="{ 'text-miaowu-green': selectedCategory === 'faq' }"
                      >常见问题</span
                    >
                  </div>
                  <svg
                    class="w-5 h-5 text-white/70 transition-transform"
                    :class="{ 'rotate-180': faqOpen }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <transition
                  enter-active-class="transition-all duration-300"
                  enter-from-class="opacity-0 -mt-2"
                  enter-to-class="opacity-100 mt-2"
                  leave-active-class="transition-all duration-200"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ul v-if="faqOpen" class="mt-3 space-y-2">
                    <li v-for="group in faqGroups" :key="group" class="">
                      <button
                        class="w-full text-left px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 flex items-center gap-2"
                        :class="{
                          'text-miaowu-green font-medium bg-white/15 border-l-2 border-miaowu-green':
                            selectedCategory === 'faq' && selectedFaqGroup === group,
                        }"
                        @click="selectFaq(group)"
                      >
                        <!-- 子栏目 icon：统一圆点 -->
                        <svg
                          class="w-4 h-4 text-miaowu-green flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="12" r="6" />
                        </svg>
                        <span>{{ group }}</span>
                      </button>
                    </li>
                  </ul>
                </transition>
              </div>

              <!-- 使用指南 -->
              <div class="rounded-xl p-4 bg-white/10 border border-white/10">
                <button
                  class="w-full text-left px-1 py-1 font-semibold text-white/90 flex items-center gap-2"
                  :class="{ 'text-miaowu-green': selectedCategory === 'guide' }"
                  @click="selectCategory('guide')"
                >
                  <!-- 使用指南 icon -->
                  <svg
                    class="w-4 h-4 text-miaowu-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path
                      d="M20 4v13a2 2 0 01-2 2H6.5a2.5 2.5 0 00-2.5 2.5V6a2 2 0 012-2H18a2 2 0 012 2z"
                    />
                  </svg>
                  <span>使用指南</span>
                </button>
              </div>

              <!-- 供应商入驻（同级栏目） -->
              <div class="rounded-xl p-4 bg-white/10 border border-white/10">
                <button
                  class="w-full text-left px-1 py-1 font-semibold text-white/90 flex items-center gap-2"
                  :class="{ 'text-miaowu-green': selectedCategory === 'vendor' }"
                  @click="selectCategory('vendor')"
                >
                  <!-- 供应商入驻 icon（店铺/工厂） -->
                  <svg
                    class="w-4 h-4 text-miaowu-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 9l2-5h14l2 5" />
                    <path d="M4 9h16v11H4z" />
                    <path d="M10 14h4v6h-4z" />
                  </svg>
                  <span>供应商入驻</span>
                </button>
              </div>

              <!-- 商务合作 -->
              <div class="rounded-xl p-4 bg-white/10 border border-white/10">
                <button
                  class="w-full text-left px-1 py-1 font-semibold text-white/90 flex items-center gap-2"
                  :class="{ 'text-miaowu-green': selectedCategory === 'biz' }"
                  @click="selectCategory('biz')"
                >
                  <!-- 商务合作 icon -->
                  <svg
                    class="w-4 h-4 text-miaowu-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                    <path d="M2 20a10 10 0 0120 0" />
                  </svg>
                  <span>商务合作</span>
                </button>
              </div>
            </div>
          </aside>

          <!-- 右侧：具体内容（可滚动） -->
          <main v-fade-in-up="{ delay: 800 }" class="md:col-span-9">
            <div
              class="h-full overflow-y-auto rounded-xl border border-white/10 p-6 bg-black/30 backdrop-blur-md text-white"
            >
              <!-- 常见问题内容 -->
              <div v-if="selectedCategory === 'faq'" class="space-y-6">
                <!-- 搜索选择框（可输入过滤 + 下拉选择） -->
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <input
                      v-model="keyword"
                      type="text"
                      role="combobox"
                      :aria-expanded="searchOpen"
                      placeholder="选择或输入过滤问题"
                      @focus="searchOpen = true"
                      @input="searchOpen = true"
                      @blur="searchOpen = false"
                      class="w-60 md:w-72 px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-miaowu-green bg-white text-black placeholder:text-gray-500"
                    />
                    <!-- 清空选中内容图标 -->
                    <button
                      v-if="keyword"
                      type="button"
                      class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200"
                      @mousedown.prevent="clearFilter()"
                    >
                      <svg
                        class="w-4 h-4 text-gray-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <!-- 下拉选项 -->
                    <ul
                      v-if="searchOpen && filteredFaqItems.length > 0"
                      class="absolute z-10 mt-2 w-72 max-h-56 overflow-y-auto rounded-md shadow-lg bg-white text-black border border-gray-200"
                    >
                      <li
                        v-for="opt in filteredFaqItems"
                        :key="opt.id"
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        @mousedown.prevent="selectSearchOption(opt.title)"
                      >
                        {{ opt.title }}
                      </li>
                    </ul>
                  </div>
                  <!-- 重置按钮：恢复显示所有卡片与问答 -->
                  <button
                    type="button"
                    class="px-3 py-2 text-sm rounded-lg border border-white/20 text-white hover:bg-white/10"
                    @click="clearFilter()"
                  >
                    <span class="inline-flex items-center gap-1">
                      <svg
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="23 4 23 10 17 10" />
                        <polyline points="1 20 1 14 7 14" />
                        <path
                          d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0019.49 15"
                        />
                      </svg>
                      重置
                    </span>
                  </button>
                  <span class="text-sm text-white/70">当前分类：{{ selectedFaqGroup }}</span>
                </div>

                <!-- 问题卡片 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    v-for="item in filteredFaqItems"
                    :key="item.id"
                    class="px-4 py-3 rounded-xl bg-miaowu-green text-black text-sm font-medium shadow-sm hover:opacity-90 transition"
                    @click="selectSearchOption(item.title)"
                  >
                    {{ item.title }}
                  </button>
                </div>

                <!-- 当前筛选问答（受关键字过滤影响） -->
                <div class="mt-6 space-y-4">
                  <h3 class="text-lg font-semibold">当前筛选问答</h3>
                  <div
                    v-for="qa in filteredFaqItems"
                    :key="qa.id"
                    class="rounded-lg bg-white/5 border border-white/10 p-4"
                  >
                    <div class="font-medium text-white">💡 {{ qa.title }}</div>
                    <div class="mt-2 space-y-2">
                      <template v-for="(block, i) in qaBlocks(qa)" :key="qa.id + '-b' + i">
                        <p v-if="block.type === 'text'" class="text-white/80 text-sm">
                          {{ block.text }}
                        </p>
                        <img
                          v-else-if="block.type === 'image'"
                          :src="block.src"
                          :alt="block.alt || 'image'"
                          :class="['rounded-lg', block.class || 'max-w-full']"
                        />
                        <div
                          v-else-if="block.type === 'html'"
                          class="text-white/80 text-sm"
                          v-html="block.html"
                        ></div>
                      </template>
                    </div>
                    <!-- 分享当前问题链接（PC端） -->
                    <div class="mt-3">
                      <button
                        class="inline-flex items-center gap-1 px-3 py-2 rounded bg-white/10 text-white text-sm hover:bg-white/15"
                        @click="copyShareLink('faq', selectedFaqGroup, qa.title)"
                        aria-label="分享此问答"
                      >
                        <svg
                          class="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M10 13a5 5 0 017.54-4.23l.46.3" />
                          <path d="M14 11a5 5 0 00-7.54 4.23l-.46-.3" />
                          <path d="M8 16l-5 5" />
                          <path d="M16 8l5-5" />
                        </svg>
                        分享此问答
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 使用指南内容 -->
              <div v-else-if="selectedCategory === 'guide'" class="space-y-4">
                <!-- 目录图片：按文件名顺序垂直排列 -->
                <div class="space-y-4">
                  <img
                    v-for="(src, idx) in guideImages"
                    :key="'guide-img-' + idx"
                    :src="src"
                    :alt="'使用指南图片 ' + (idx + 1)"
                    class="w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              <!-- 供应商入驻内容 -->
              <div v-else-if="selectedCategory === 'vendor'" class="space-y-4">
                <h2 class="text-xl font-semibold">供应商入驻</h2>
                <p class="text-white/80">申请条件、资料提交与审核说明。</p>
                <ul class="list-disc pl-6 space-y-2 text-white/85">
                  <li>入驻条件：资质要求与业务范围</li>
                  <li>资料提交：营业执照、品牌授权、联系人信息</li>
                  <li>审核流程：预计周期与结果通知</li>
                  <li>入驻后：商品管理、结算与支持</li>
                </ul>
                <!-- 跳转提示：说明链接用途并提供按钮跳转到飞书文档 -->
                <div
                  class="rounded-lg bg-white/5 border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div class="text-white/80 text-sm">
                    <div class="font-medium text-white flex items-center gap-2">
                      <!-- 外链图标 -->
                      <svg
                        class="w-4 h-4 text-miaowu-green"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                      </svg>
                      供应商入驻完整版本（飞书文档）
                    </div>
                    <p class="mt-1">
                      该链接用于查看更详细的操作说明与商家入驻要求，便于你快速完成入驻与上线。
                    </p>
                  </div>
                  <a
                    href="https://v05ctaei9gn.feishu.cn/wiki/ECXswio4vi9ja2kN0AUcMISDnqd"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-miaowu-green text-black hover:opacity-90"
                    aria-label="打开飞书《商家入驻指南》"
                  >
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    打开完整指南（飞书）
                  </a>
                </div>
              </div>

              <!-- 商务合作内容 -->
              <div v-else class="space-y-6" aria-label="商务合作信息">
                <h2 class="text-xl font-semibold">商务合作</h2>
                <p class="text-white/80">
                  品牌入驻、代理合作、渠道共建等商务事宜，请联系下方商务经理。
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <!-- 微信二维码 -->
                  <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div class="font-medium text-white mb-2 flex items-center gap-2">
                      <svg
                        class="w-5 h-5 text-miaowu-green"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      微信扫码添加商务
                    </div>
                    <img
                      :src="imgHelpWechat"
                      alt="商务微信二维码"
                      class="w-[240px] h-auto rounded-lg mx-auto"
                      loading="lazy"
                    />
                    <p class="text-center text-white/60 text-sm mt-2">
                      微信扫码或保存后通过微信添加
                    </p>
                  </div>

                  <!-- 联系方式卡片 -->
                  <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div class="font-medium text-white mb-2 flex items-center gap-2">
                      <svg
                        class="w-5 h-5 text-miaowu-green"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                        <path d="M2 20a10 10 0 0120 0" />
                      </svg>
                      商务联系人
                    </div>
                    <div class="space-y-2 text-white/85">
                      <div class="flex items-center gap-2">
                        <span class="text-white/60">姓名</span><span class="font-medium">李凯</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-white/60">电话</span>
                        <a href="tel:13770732882" class="font-medium hover:text-miaowu-green"
                          >13770732882</a
                        >
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-white/60">邮箱</span>
                        <a
                          href="mailto:363185744@qq.com"
                          class="font-medium hover:text-miaowu-green"
                          >363185744@qq.com</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    <!-- 移动端布局 -->
    <div class="container mx-auto px-4 py-6 block lg:hidden">
      <!-- 顶部 sticky：栏目切换 + FAQ 分组 + 搜索 -->
      <div
        v-fade-in-up="{ delay: 300 }"
        class="sticky top-0 z-20 bg-neutral-900/85 backdrop-blur-md py-2 shadow-md border-b border-white/10"
        style="top: calc(env(safe-area-inset-top) + 80px)"
      >
        <!-- 顶部：栏目切换为横向滚动标签 -->
        <div class="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="帮助中心栏目">
          <button
            v-for="cat in ['faq', 'guide', 'vendor', 'biz']"
            :key="cat"
            class="px-4 py-3 rounded-full text-sm whitespace-nowrap"
            :class="{
              'bg-miaowu-green text-black': selectedCategory === (cat as Category),
              'bg-white/10 text-white': selectedCategory !== (cat as Category),
            }"
            role="tab"
            :aria-selected="selectedCategory === (cat as Category)"
            @click="selectCategory(cat as Category)"
          >
            {{
              cat === 'faq'
                ? '常见问题'
                : cat === 'guide'
                  ? '使用指南'
                  : cat === 'vendor'
                    ? '供应商入驻'
                    : '商务合作'
            }}
          </button>
        </div>

        <!-- FAQ 子分组从 Sticky 中移除，以减少顶部占用空间 -->

        <!-- 搜索输入：仅 FAQ 显示，支持关键字过滤 -->
        <div v-if="selectedCategory === 'faq'" class="mt-2">
          <div class="relative">
            <input
              v-model="keyword"
              type="text"
              placeholder="输入关键字或点击问题卡片过滤"
              class="w-full px-3 py-2 rounded-lg bg-white text-black placeholder:text-gray-500"
              @input="onKeywordInput"
            />
            <button
              v-if="keyword"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-gray-200"
              @mousedown.prevent="clearFilter()"
              aria-label="清空过滤"
            >
              清空
            </button>
          </div>
        </div>
      </div>

      <!-- 分组选择（非Sticky）：下方选择器，不占用顶部空间 -->
      <div v-fade-in-up="{ delay: 500 }" v-if="selectedCategory === 'faq'" class="mt-3">
        <label class="text-white/80 text-xs">FAQ 分组</label>
        <button
          class="mt-1 w-full px-4 py-3 rounded-lg bg-white text-black text-sm border border-white/10 shadow-sm flex items-center justify-between"
          @click="groupPickerOpen = true"
          aria-haspopup="dialog"
          :aria-expanded="groupPickerOpen ? 'true' : 'false'"
        >
          <span>{{ selectedFaqGroup }}</span>
          <svg
            class="w-4 h-4 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <!-- 底部弹出分组选择器（仅 FAQ） -->
      <div
        v-if="selectedCategory === 'faq' && groupPickerOpen"
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-label="选择FAQ分组"
      >
        <!-- 遮罩淡入淡出 -->
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div class="absolute inset-0 bg-black/50" @click="groupPickerOpen = false"></div>
        </Transition>
        <!-- 底部弹窗上滑动效 -->
        <Transition
          enter-active-class="transition transform duration-200"
          enter-from-class="translate-y-full opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition transform duration-200"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-full opacity-0"
        >
          <div
            class="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl border border-white/10 p-4"
            style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="text-white font-medium">选择 FAQ 分组</div>
                <div class="text-white/70 text-xs mt-1">点击分组即可筛选问题</div>
              </div>
              <button
                class="px-3 py-2 rounded bg-white/10 text-white text-xs"
                @click="groupPickerOpen = false"
                aria-label="关闭分组选择"
              >
                关闭
              </button>
            </div>
            <!-- 宫格：可滚动容器，打开时自动定位到当前分组 -->
            <div ref="groupGridRef" class="mt-3 grid grid-cols-3 gap-2 max-h-72 overflow-y-auto">
              <button
                v-for="group in faqGroups"
                :key="group"
                class="px-3 py-3 rounded-lg text-sm"
                :class="
                  selectedFaqGroup === group
                    ? 'bg-miaowu-green text-black ring-2 ring-miaowu-green/50'
                    : 'bg-white/10 text-white hover:bg-white/15'
                "
                :aria-selected="selectedFaqGroup === group ? 'true' : 'false'"
                :data-group="group"
                @click="chooseGroup(group)"
                aria-label="选择分组"
              >
                <span class="flex items-center justify-center gap-1">
                  <svg
                    v-if="selectedFaqGroup === group"
                    class="w-3 h-3 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ group }}</span>
                </span>
                <span v-if="selectedFaqGroup === group" class="block mt-1 text-[10px] text-black/80"
                  >已选择</span
                >
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 问题卡片：点击后写入 keyword 与 qid 到 URL 并过滤 -->
      <div
        v-fade-in-up="{ delay: 500 }"
        v-if="selectedCategory === 'faq'"
        class="mt-4 grid grid-cols-1 gap-2"
        role="list"
        aria-label="常见问题列表"
      >
        <button
          v-for="item in filteredFaqItems"
          :key="item.id"
          class="px-4 py-3 rounded-lg bg-miaowu-green text-black text-sm"
          @click="
            ((keyword = item.title),
            router.replace({
              path: route.path,
              query: {
                ...route.query,
                cat: 'faq',
                group: selectedFaqGroup,
                keyword: item.title,
                qid: item.id,
              },
            }))
          "
          aria-label="筛选到问题"
        >
          {{ item.title }}
        </button>
      </div>

      <!-- 空态指引 -->
      <div
        v-fade-in-up="{ delay: 500 }"
        v-if="selectedCategory === 'faq' && filteredFaqItems.length === 0"
        class="mt-4 text-white/80 text-sm"
        role="status"
        aria-live="polite"
      >
        未找到匹配问题。试试换个关键字或切换分组。
        <button class="ml-2 px-2 py-1 rounded bg-white/10" @click="clearFilter()">清空</button>
      </div>

      <!-- 当前筛选问答（移动端，仅 FAQ 显示） -->
      <div
        v-fade-in-up="{ delay: 500 }"
        v-if="selectedCategory === 'faq'"
        class="mt-4 space-y-3"
        role="list"
        aria-label="当前筛选问答"
      >
        <div
          v-for="qa in filteredFaqItems"
          :key="qa.id"
          :ref="(el) => setQaRef(qa.id, el)"
          class="rounded-lg bg-white/5 border border-white/10 p-3"
          role="listitem"
        >
          <div class="font-medium text-white text-sm">💡 {{ qa.title }}</div>
          <div class="mt-2 space-y-2">
            <template v-for="(block, i) in qaBlocks(qa)" :key="qa.id + '-b' + i">
              <p v-if="block.type === 'text'" class="text-white/80 text-xs">{{ block.text }}</p>
              <img
                v-else-if="block.type === 'image'"
                :src="block.src"
                :alt="block.alt || 'image'"
                :class="['rounded-lg', block.class || 'max-w-full']"
              />
              <div
                v-else-if="block.type === 'html'"
                class="text-white/80 text-xs"
                v-html="block.html"
              ></div>
            </template>
          </div>
          <!-- 分享当前问题链接（包含 qid 与 keyword） -->
          <div class="mt-2">
            <button
              class="inline-flex items-center gap-1 px-3 py-2 rounded bg-white/10 text-white text-xs"
              @click="copyShareLink('faq', selectedFaqGroup, qa.title)"
              aria-label="分享此问答"
            >
              <svg
                class="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 13a5 5 0 017.54-4.23l.46.3" />
                <path d="M14 11a5 5 0 00-7.54 4.23l-.46-.3" />
                <path d="M8 16l-5 5" />
                <path d="M16 8l5-5" />
              </svg>
              分享此问答
            </button>
          </div>
        </div>
      </div>

      <!-- 非 FAQ 栏目内容（移动端复用现有模板结构，保持一致样式） -->
      <div v-fade-in-up="{ delay: 500 }" v-if="selectedCategory !== 'faq'" class="hidden">
        <button
          class="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white text-xs"
          @click="copyShareLink(selectedCategory)"
          aria-label="复制栏目链接"
        >
          <svg
            class="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 13a5 5 0 017.54-4.23l.46.3" />
            <path d="M14 11a5 5 0 00-7.54 4.23l-.46-.3" />
            <path d="M8 16l-5 5" />
            <path d="M16 8l5-5" />
          </svg>
          复制栏目链接
        </button>
      </div>

      <!-- 使用指南（移动端） -->
      <div
        v-fade-in-up="{ delay: 300 }"
        v-if="selectedCategory === 'guide'"
        class="mt-4 space-y-3"
        aria-label="使用指南"
      >
        <div class="space-y-3">
          <img
            v-for="(src, idx) in guideImages"
            :key="'m-guide-img-' + idx"
            :src="src"
            :alt="'使用指南图片 ' + (idx + 1)"
            class="w-full"
            loading="lazy"
          />
        </div>
      </div>

      <!-- 供应商入驻（移动端） -->
      <div
        v-fade-in-up="{ delay: 300 }"
        v-else-if="selectedCategory === 'vendor'"
        class="mt-4 space-y-3"
        aria-label="供应商入驻"
      >
        <h2 class="text-base font-semibold">供应商入驻</h2>
        <p class="text-white/80 text-sm">申请条件、资料提交与审核说明。</p>
        <ul class="list-disc pl-5 space-y-2 text-white/85 text-sm">
          <li>入驻条件：资质要求与业务范围</li>
          <li>资料提交：营业执照、品牌授权、联系人信息</li>
          <li>审核流程：预计周期与结果通知</li>
          <li>入驻后：商品管理、结算与支持</li>
        </ul>
        <div class="rounded-lg bg-white/5 border border-white/10 p-3 space-y-2">
          <div class="text-white/80 text-xs">
            <div class="font-medium text-white flex items-center gap-2">
              <svg
                class="w-4 h-4 text-miaowu-green"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
              供应商入驻完整版本（飞书文档）
            </div>
            <p class="mt-1">链接包含更详细的操作说明与入驻要求，便于快速入驻。</p>
          </div>
          <a
            href="https://v05ctaei9gn.feishu.cn/wiki/ECXswio4vi9ja2kN0AUcMISDnqd"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-miaowu-green text-black hover:opacity-90 text-sm"
            aria-label="打开飞书《商家入驻指南》"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            打开完整指南（飞书）
          </a>
        </div>
      </div>

      <!-- 商务合作（移动端） -->
      <div
        v-fade-in-up="{ delay: 300 }"
        v-else-if="selectedCategory === 'biz'"
        class="mt-4 space-y-3"
        aria-label="商务合作"
      >
        <h2 class="text-base font-semibold">商务合作</h2>
        <p class="text-white/80 text-sm">
          品牌入驻、代理合作、渠道共建等商务事宜，请联系下方商务经理。
        </p>
        <div class="space-y-3">
          <div class="rounded-lg bg-white/5 border border-white/10 p-3">
            <div class="font-medium text-white text-sm mb-2 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-miaowu-green"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
              </svg>
              微信扫码添加商务
            </div>
            <img
              :src="imgHelpWechat"
              alt="商务微信二维码"
              class="w-48 h-auto rounded-lg mx-auto"
              loading="lazy"
            />
            <p class="text-center text-white/60 text-xs mt-2">微信扫码或保存后通过微信添加</p>
          </div>
          <div class="rounded-lg bg-white/5 border border-white/10 p-3">
            <div class="font-medium text-white text-sm mb-2 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-miaowu-green"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 12a4 4 0 10-8 0 4 4 0 0 0 8 0z" />
                <path d="M2 20a10 10 0 0120 0" />
              </svg>
              商务联系人
            </div>
            <div class="space-y-2 text-white/85 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-white/60">姓名</span><span class="font-medium">李凯</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-white/60">电话</span
                ><a href="tel:13770732882" class="font-medium hover:text-miaowu-green"
                  >13770732882</a
                >
              </div>
              <div class="flex items-center gap-2">
                <span class="text-white/60">邮箱</span
                ><a href="mailto:363185744@qq.com" class="font-medium hover:text-miaowu-green"
                  >363185744@qq.com</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 复制分享反馈：轻提示（全局） -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toastShow"
      class="fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-3 py-2 rounded-lg bg-white text-black text-xs shadow-lg"
      role="status"
      aria-live="polite"
    >
      {{ toastText }}
    </div>
  </Transition>

  <!-- 返回顶部按钮（PC 与移动端） -->
  <Transition name="fade">
    <button
      v-if="showBackToTop"
      class="fixed z-[60] right-4 md:right-6 bottom-6 md:bottom-8 rounded-full bg-white text-[#0e1118] shadow-lg border border-white/20 hover:bg-white/90 focus:ring-2 focus:ring-white/40 p-3 md:p-3.5"
      @click="scrollToTop"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="w-5 h-5 md:w-6 md:h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import helpBg from '@/assets/img/help-bg.png'
import imgHelpWechat from '@/assets/img/help-wechat.png'
import imgGuide1 from '@/assets/img/help/img_guide_1.png'
import imgGuide2 from '@/assets/img/help/img_guide_2.png'
import imgGuide3 from '@/assets/img/help/img_guide_3.png'
import imgGuide4 from '@/assets/img/help/img_guide_4.png'
import imgGuide5 from '@/assets/img/help/img_guide_5.png'
import imgGuide6 from '@/assets/img/help/img_guide_6.png'
import imgGuide7 from '@/assets/img/help/img_guide_7.png'
import imgGuide8 from '@/assets/img/help/img_guide_8.png'
import imgGuide9 from '@/assets/img/help/img_guide_9.png'
import imgGuide10 from '@/assets/img/help/img_guide_10.png'
import imgHelpTitle from '@/assets/img/help/img_help_title.png'
import imgShopCategory from '@/assets/img/img_shop_category.png'
import {
  ComponentPublicInstance,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 左侧：折叠与选中状态
const faqOpen = ref(true)
type Category = 'faq' | 'guide' | 'vendor' | 'biz'
const selectedCategory = ref<Category>('faq')
const faqGroups = ['账号与登录', '创建形象', '知识库', '分享', '商城', '其他']
const selectedFaqGroup = ref<string>(faqGroups[0])
// 移动端：底部分组选择器开关
const groupPickerOpen = ref(false)
// 移动端：分组宫格容器，用于自动滚动定位
const groupGridRef = ref<HTMLElement | null>(null)

// 右侧：搜索与问题数据
const keyword = ref('')
const searchOpen = ref(false)
// 输入防抖：避免每次按键都写路由
let keywordDebounce: number | undefined
const onKeywordInput = () => {
  if (keywordDebounce) window.clearTimeout(keywordDebounce)
  keywordDebounce = window.setTimeout(() => {
    router.replace({
      path: route.path,
      query: { ...route.query, keyword: keyword.value || undefined },
    })
  }, 300)
}

// 路由：生成/解析可分享的深链接
const route = useRoute()
const router = useRouter()

// 复制反馈：轻提示（Toast）状态与函数
const toastShow = ref(false)
const toastText = ref('')
const showToast = (text: string) => {
  toastText.value = text
  toastShow.value = true
  window.setTimeout(() => {
    toastShow.value = false
  }, 1800)
}

const shareUrl = (cat: Category, group?: string, kw?: string) => {
  const params = new URLSearchParams()
  params.set('cat', cat)
  if (group) params.set('group', group)
  if (kw) params.set('keyword', kw)
  // FAQ：如果能匹配具体问题，附带 qid 以便精准跳转
  if (cat === 'faq') {
    const items = (group ? faqItemsMap[group] : faqItemsMap[selectedFaqGroup.value]) || []
    const match = items.find((x) => x.title === (kw || keyword.value))
    if (match?.id) params.set('qid', match.id)
  }
  const basePath = route.path || '/legal/help'
  return `${window.location.origin}${basePath}?${params.toString()}`
}

const copyShareLink = async (cat: Category, group?: string, kw?: string) => {
  const base = kw ?? keyword.value.trim()
  const k = base ? base : undefined
  const url = shareUrl(cat, group, k)
  try {
    await navigator.clipboard.writeText(url)
    showToast('链接已复制')
  } catch (e) {
    window.open(url, '_blank')
    showToast('复制失败，已打开分享页')
  }
}

// 返回顶部：显示控制与滚动行为
const helpSectionRef = ref<HTMLElement | null>(null)
const showBackToTop = ref(false)
let sectionResizeObserver: ResizeObserver | null = null
const checkBackToTopVisibility = () => {
  const height =
    helpSectionRef.value?.scrollHeight ||
    document.documentElement.scrollHeight ||
    document.body.scrollHeight ||
    0
  showBackToTop.value = height > 2000
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  checkBackToTopVisibility()
  window.addEventListener('resize', checkBackToTopVisibility)
  // 观察内容区域尺寸变化，尤其是图片加载后的高度变化
  if (helpSectionRef.value) {
    sectionResizeObserver = new ResizeObserver(() => {
      checkBackToTopVisibility()
    })
    sectionResizeObserver.observe(helpSectionRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkBackToTopVisibility)
  if (sectionResizeObserver) {
    sectionResizeObserver.disconnect()
    sectionResizeObserver = null
  }
})

// 使用指南图片：静态导入以兼容不允许 import.meta 的构建配置
const guideImages = computed<string[]>(() => [
  imgHelpTitle,
  imgGuide1,
  imgGuide2,
  imgGuide3,
  imgGuide4,
  imgGuide5,
  imgGuide6,
  imgGuide7,
  imgGuide8,
  imgGuide9,
  imgGuide10,
])

// 富文本块类型，支持文本/图片/HTML
type FaqContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt?: string; class?: string }
  | { type: 'html'; html: string }

// 问答项：兼容旧数据（answer）与新数据（blocks）
type FaqItem = { id: string; title: string; answer?: string; blocks?: FaqContentBlock[] }

const faqItemsMap: Record<string, FaqItem[]> = {
  账号与登录: [
    {
      id: 'q1',
      title: '什么是喵呜账号？',
      answer:
        '喵呜账号是您使用喵呜软件服务的重要入口。注册账号后，您将能够登录并使用喵呜app和官网服务，享受多种功能，如生成AI智能体、录入私有知识库、使用AI智能体帮助您销售等。',
    },
    {
      id: 'q2',
      title: '如何注册喵呜账号？',
      answer:
        '由于我们提供的商业AI智能体服务为付费项目，您需要先购买激活码。获取激活码后，在app端点击“马上注册”，依次输入手机号、短信验证码和激活码即可完成注册。',
    },
    {
      id: 'q3',
      title: '激活码怎么获取？',
      blocks: [
        { type: 'text', text: '个人用户：请联系您所在地区的代理商购买。' },
        { type: 'text', text: '大量需求用户：请直接联系我们的商务经理咨询。' },
        { type: 'text', text: '联系方式见官网-帮助中心-商务合作页面。' },
      ],
    },
    {
      id: 'q4',
      title: '是否支持多端同时在线？',
      answer: '喵呜现仅支持app及pc端同时各在线一个设备。',
    },
    { id: 'q5', title: '昵称是否可以修改？', answer: '您可以在知识库管理中修改昵称。' },
    {
      id: 'q6',
      title: '头像怎么修改？',
      answer:
        '账号头像使用的是您生成的AI智能体形象。若需修改，请重新生成AI智能体形象。目前不支持单独修改头像。',
    },
  ],
  创建形象: [
    {
      id: 'q7',
      title: '如何创建形象？',
      answer:
        '您可以在App主页点击编辑形象，选择合适的模版后上传您的照片，稍等1-2分钟即可获得根据模板生成的AI智能体，效果生动自然。',
    },
    {
      id: 'q8',
      title: '我对我的形象不满意怎么办？',
      answer: '若您对形象不满意，重新选择模板生成即可。',
    },
  ],
  知识库: [
    {
      id: 'q13',
      title: '什么是知识库？',
      answer:
        '知识库是您AI智能体的“大脑”，录入您的专有知识后，AI智能体可以像您一样思考，帮助您完成产品销售。',
    },
    {
      id: 'q14',
      title: '知识库怎么填写？有模版吗？',
      blocks: [
        { type: 'text', text: '知识库分为两个主要部分：个人基础信息、服务信息。' },
        { type: 'text', text: '1. 个人基础信息' },
        {
          type: 'text',
          text: '这部分是关于您AI智能体的人物设定，包括性格、爱好、标签、组织信息等。性格偏好是定义了您的AI智能体的说话风格。为了让用户更全面了解您，您可以添加自己的网店、官网或个人主页的链接。请确保链接以http开头，以便正确跳转。建议在添加前在浏览器中测试链接的有效性。需要注意的是，由于微信浏览器的风控政策，淘宝链接有时在微信中无法打开。',
        },
        {
          type: 'text',
          text: '此外您还可以上传您的人设视频，方便用户在您的AI智能体页面快速了解您。',
        },
        { type: 'text', text: '2. 服务信息管理' },
        {
          type: 'text',
          text: '这部分内容应与您的业务紧密相关。您可以按照各模块具体内容要求自行填写或使用AI辅助生成填写。',
        },
      ],
    },
  ],
  分享: [
    {
      id: 'q19',
      title: '怎么把我的AI智能体发给别人？',
      answer: '分享是你的用户与你快速建立连接的方式。',
    },
    {
      id: 'q20',
      title: '怎么分享？',
      answer:
        '主页右上角点击分享按钮可通过分享小程序、h5以及链接的形式快速完成分享。小程序可直接分享给微信好友；h5可分享至微信好友及朋友圈 若想要宣传您的产品/活动/观点/业务等，可以通过营销工具生成相应海报或名片后分享。 若直接推荐分享产品/服务，也可在产品/服务列表直接分享。 你的用户可以点开你分享的链接或者识别图片中的二维码进入您的小程序主页与你的AI智能体对话。注：喵呜官方小程序为：喵呜AI智能体',
    },
  ],
  商城: [
    {
      id: 'q25',
      title: '如何入驻商城？',
      answer: '您先在app端完成钱包绑定后，从官网我的商城入口进行申请',
    },
    {
      id: 'q26',
      title: '申请入驻商城有什么条件？要提供什么材料吗？',
      blocks: [
        { type: 'text', text: '入驻商城现仅对有营业执照商家开放。' },
        { type: 'text', text: '需提供材料如下：' },
        { type: 'text', text: '1、营业执照电子版/拍照；' },
        { type: 'text', text: '2、法人身份证正反面照片；' },
        { type: 'text', text: '3、店铺结算账户信息。' },
      ],
    },
    {
      id: 'q27',
      title: '我申请了入驻商城怎么还没通过？',
      answer:
        '入驻商城审核时间为1-2个工作日， 请耐心等待。若超过2个工作日仍无审核结果，请联系您的代理进行反馈。',
    },
    {
      id: 'q28',
      title: '商城入驻支持哪些品类？',
      blocks: [
        { type: 'text', text: '商城支持品类随审核要求会有所变动，当前（20240627）支持品类如下：' },
        {
          type: 'image',
          src: imgShopCategory,
          alt: '商城入驻品类',
          class: 'w-full h-auto md:max-w-[500px] mx-auto mt-3',
        },
      ],
    },
  ],
  其他: [
    {
      id: 'q31',
      title: '会员有什么用？',
      answer: '为确保您能持续享受我们的优质服务，我们推出喵呜VIP。激活即可解锁以下特权：',
    },
    {
      id: 'q32',
      title: '你们有客服邮箱吗？',
      answer: '您有任何产品和服务上的问题或建议，都可反馈至我们的客服邮箱 service@meupop.com',
    },
  ],
}

const currentFaqItems = computed<FaqItem[]>(() => faqItemsMap[selectedFaqGroup.value] || [])

const filteredFaqItems = computed<FaqItem[]>(() => {
  const items = currentFaqItems.value
  const k = keyword.value.trim()
  if (!k) return items
  return items.filter((it) => {
    if (it.title.includes(k)) return true
    if (it.answer && it.answer.includes(k)) return true
    if (it.blocks) {
      for (const b of it.blocks) {
        if (b.type === 'text' && b.text.includes(k)) return true
        if (b.type === 'html' && b.html.includes(k)) return true
      }
    }
    return false
  })
})

// 根据内容变动更新返回顶部按钮显示
watch(
  [
    () => keyword.value,
    () => selectedCategory.value,
    () => selectedFaqGroup.value,
    () => filteredFaqItems.value.length,
  ],
  async () => {
    await nextTick()
    checkBackToTopVisibility()
  }
)

// 页面背景图样式
const helpBgStyle = computed(() => ({
  backgroundImage: `url(${helpBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))

// 交互方法
const selectCategory = (cat: Category) => {
  selectedCategory.value = cat
  // 切换栏目时清空过滤
  keyword.value = ''
  searchOpen.value = false
  // 同步 URL 以便分享；非 FAQ 清理 group/qid/keyword
  const q: Record<string, string | undefined> = { ...route.query, cat }
  if (cat !== 'faq') {
    q.group = undefined
    q.qid = undefined
    q.keyword = undefined
  }
  router.replace({ path: route.path, query: q })
}
const selectFaq = (group: string) => {
  selectedCategory.value = 'faq'
  selectedFaqGroup.value = group
  // 切换子分类时清空过滤
  keyword.value = ''
  searchOpen.value = false
  // 同步 URL 以便分享；切分组时清理 qid/keyword
  const q: Record<string, string | undefined> = { ...route.query, cat: 'faq', group }
  q.qid = undefined
  q.keyword = undefined
  router.replace({ path: route.path, query: q })
}
// 移动端：从底部选择器选择分组并关闭弹窗
const chooseGroup = (group: string) => {
  selectFaq(group)
  groupPickerOpen.value = false
}

// 打开弹窗时，自动滚动到当前分组位置（长列表体验优化）
watch(groupPickerOpen, async (open) => {
  if (open) {
    await nextTick()
    const container = groupGridRef.value
    if (!container) return
    const el = container.querySelector(
      `[data-group="${selectedFaqGroup.value}"]`
    ) as HTMLElement | null
    if (el) {
      const top = Math.max(el.offsetTop - 24, 0)
      container.scrollTo({ top, behavior: 'smooth' })
    }
  }
})
const clearFilter = () => {
  keyword.value = ''
  searchOpen.value = false
  // 移除 URL 中的 keyword
  const q = { ...route.query }
  delete (q as any).keyword
  delete (q as any).qid
  router.replace({ path: route.path, query: q })
}
const selectSearchOption = (title: string) => {
  keyword.value = title
  searchOpen.value = false
  // 写入 URL 中的 keyword；若匹配具体问题则附带 qid
  const items = faqItemsMap[selectedFaqGroup.value] || []
  const match = items.find((x) => x.title === title)
  const q: Record<string, string | undefined> = { ...route.query, keyword: title }
  if (match?.id) q.qid = match.id
  router.replace({ path: route.path, query: q })
}

// 渲染用：获取问答块，兼容旧的 answer 文本
const qaBlocks = (qa: FaqItem): FaqContentBlock[] => {
  if (qa.blocks && qa.blocks.length) return qa.blocks
  return qa.answer ? [{ type: 'text', text: qa.answer }] : []
}

// 根据 URL 初始化选中栏目、子分类与关键字过滤
// 辅助：按问题 id 查找问题与其分组
const findItemById = (qid: string | undefined): { group?: string; item?: FaqItem } => {
  if (!qid) return {}
  for (const group of Object.keys(faqItemsMap)) {
    const it = faqItemsMap[group].find((x) => x.id === qid)
    if (it) return { group, item: it }
  }
  return {}
}

const initFromRoute = () => {
  const cat = (route.query.cat as string) || selectedCategory.value
  const group = route.query.group as string | undefined
  const kw = route.query.keyword as string | undefined
  const qid = route.query.qid as string | undefined
  if (cat === 'faq') {
    selectedCategory.value = 'faq'
    // 优先根据 qid 进行精确定位与分组切换
    if (qid) {
      const found = findItemById(qid)
      if (found.group && faqGroups.includes(found.group)) selectedFaqGroup.value = found.group
      if (found.item) keyword.value = found.item.title
    } else {
      if (group && faqGroups.includes(group)) selectedFaqGroup.value = group
      if (kw) keyword.value = kw
    }
    faqOpen.value = true
  } else if (cat === 'guide' || cat === 'vendor' || cat === 'biz') {
    selectedCategory.value = cat as Category
    keyword.value = kw || ''
  }
}

onMounted(() => {
  initFromRoute()
})

watch(
  () => route.query,
  () => initFromRoute(),
  { deep: true }
)

// 若存在 qid，滚动至对应问答位置并高亮
const qaRefs: Record<string, HTMLElement | null> = {}
const setQaRef = (id: string, el: Element | ComponentPublicInstance | null) => {
  qaRefs[id] = (el as HTMLElement) || null
}
const scrollToQid = async () => {
  const qid = route.query.qid as string | undefined
  if (!qid) return
  await nextTick()
  const el = qaRefs[qid]
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 计算导航栏高度（AppNav：h-20=80px），用于偏移到导航栏下方
    const header = document.querySelector('header.sticky.top-0.z-50') as HTMLElement | null
    const navHeight = header?.getBoundingClientRect().height || 80
    // 再向上滚动 navHeight，确保目标内容不被顶部导航遮挡
    window.scrollBy({ top: -navHeight, behavior: 'smooth' })
    el.classList.add('ring-2', 'ring-miaowu-green', 'flash-highlight')
    setTimeout(() => {
      el.classList.remove('ring-2', 'ring-miaowu-green', 'flash-highlight')
    }, 1600)
  }
}
onMounted(() => scrollToQid())
watch(
  () => [route.query.qid, filteredFaqItems.value.length],
  () => scrollToQid()
)
</script>

<style scoped>
/* 轻微毛玻璃背景在浅色主题下更清晰 */
@keyframes qaFlash {
  0% {
    background-color: rgba(12, 255, 200, 0.25);
  }
  100% {
    background-color: transparent;
  }
}
.flash-highlight {
  animation: qaFlash 1.2s ease-in-out 1;
}
</style>
// 复制反馈：轻提示（Toast） const toastShow = ref(false) const toastText = ref('') const showToast
= (text: string) => { toastText.value = text toastShow.value = true window.setTimeout(() => {
toastShow.value = false }, 1800) }
