<template>
  <!-- 登录弹框遮罩层 -->
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
      @click="close"
    >
      <!-- 登录内容容器 -->
      <div class="relative" @click.stop>
        <!-- 移动端背景图片容器 -->
        <div class="lg:hidden relative" style="width: 758px; max-width: 90vw">
          <img
            src="@/assets/img/login-bg-mobile.png"
            alt="登录背景"
            class="w-full h-auto object-contain"
            style="display: block"
          />

          <!-- 内容区域定位在背景图片上 -->
          <div
            class="absolute bg-white rounded-2xl p-5"
            style="height: 360px; bottom: 38px; left: 38px; right: 38px"
          >
            <div class="h-full flex flex-col">
              <!-- 头部 -->
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-800">登录您的喵呜AI账号</h2>
                <button
                  @click="close"
                  class="hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- 登录标签页 -->
              <div class="mb-4">
                <div class="flex justify-center">
                  <div
                    @click="loginTab = 'qrcode'"
                    class="text-center font-medium transition-colors duration-200 mr-12 cursor-pointer"
                    :class="loginTab === 'qrcode' ? 'underline text-black' : 'text-gray-500'"
                  >
                    扫码登录
                  </div>
                  <div
                    @click="loginTab = 'password'"
                    class="text-center font-medium transition-colors duration-200 cursor-pointer"
                    :class="loginTab === 'password' ? 'underline text-black' : 'text-gray-500'"
                  >
                    账号登录
                  </div>
                </div>
              </div>

              <!-- 登录内容 -->
              <div class="h-full flex flex-col">
                <!-- 扫码登录 -->
                <div
                  v-if="loginTab === 'qrcode'"
                  class="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div class="mb-2">
                    <div
                      class="w-40 h-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      <!-- 二维码图片 - 只在等待扫码时显示 -->
                      <img
                        v-if="qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        :src="qrCodeImage"
                        alt="登录二维码"
                        class="w-full h-full object-contain rounded-lg"
                      />
                      <!-- 扫描线动画 -->
                      <div
                        v-if="qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        class="absolute inset-0 pointer-events-none"
                      >
                        <div class="scan-line"></div>
                      </div>
                      <!-- 已扫码状态显示 -->
                      <div
                        v-if="qrCodeStatus === '2'"
                        class="flex flex-col items-center justify-center text-center p-4"
                      >
                        <div
                          class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3"
                        >
                          <svg
                            class="w-8 h-8 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p class="text-sm text-yellow-700 font-medium mb-1">请在手机上确认登录</p>
                        <p class="text-xs text-yellow-600">查看您的喵呜APP</p>
                      </div>
                      <!-- 加载状态 -->
                      <div
                        v-else-if="!qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        class="flex flex-col items-center justify-center"
                      >
                        <div
                          class="animate-spin rounded-full h-8 w-8 border-b-2 border-miaowu-green mb-2"
                        ></div>
                        <span class="text-sm text-gray-500">生成中...</span>
                      </div>
                      <!-- 过期状态 - 只在明确过期时显示 -->
                      <div
                        v-else-if="qrCodeExpired"
                        class="flex flex-col items-center justify-center"
                      >
                        <svg
                          class="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span class="text-sm text-gray-500">二维码已过期</span>
                      </div>
                    </div>
                  </div>

                  <!-- 状态显示区域 -->
                  <div class="mb-4">
                    <!-- 状态图标和文本 - 只在非已扫码状态显示 -->
                    <div v-if="qrCodeStatus !== '2'" class="flex items-center justify-center mb-2">
                      <!-- 等待扫码状态 -->
                      <div v-if="qrCodeStatus === '1'" class="flex items-center">
                        <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                        <span class="text-sm text-blue-600 font-medium">{{
                          qrCodeStatusText
                        }}</span>
                      </div>

                      <!-- 登录成功状态 -->
                      <div v-else-if="qrCodeStatus === '3'" class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span class="text-sm text-green-600 font-medium">{{
                          qrCodeStatusText
                        }}</span>
                      </div>
                    </div>

                    <!-- 状态描述 - 只在非已扫码状态显示 -->
                    <div v-if="qrCodeStatus !== '2'" class="text-xs text-gray-500 text-center">
                      <span v-if="qrCodeStatus === '1'">打开「喵呜APP」我的右上角扫码</span>
                      <span v-else-if="qrCodeStatus === '3'">正在为您登录...</span>
                      <span v-else-if="qrCodeStatus === '4'">二维码已失效，请点击下方按钮刷新</span>
                    </div>
                  </div>

                  <!-- 刷新按钮 -->
                  <button
                    v-if="qrCodeExpired"
                    @click="refreshQrCode"
                    class="px-4 py-2 text-sm text-white bg-miaowu-green hover:bg-green-600 rounded-lg transition-colors duration-200 font-medium"
                  >
                    刷新二维码
                  </button>
                </div>

                <!-- 账号登录 -->
                <div v-else class="flex-1 flex flex-col justify-center space-y-4">
                  <!-- 手机号输入框 -->
                  <div class="relative">
                    <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.username"
                      type="text"
                      placeholder="请输入您的手机号"
                      @input="clearValidationErrors"
                      :class="[
                        'w-full pl-12 pr-12 py-2 border-0 rounded-lg focus:ring-2 focus:bg-white transition-colors duration-200 text-black placeholder:text-gray-400',
                        validationErrors.username
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500'
                          : 'bg-gray-100 focus:ring-miaowu-green',
                      ]"
                    />
                    <!-- 清空按钮 -->
                    <button
                      v-if="loginForm.username"
                      @click="((loginForm.username = ''), clearValidationErrors())"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <!-- 错误提示 -->
                    <div
                      v-if="validationErrors.username"
                      class="absolute -bottom-4 left-0 text-xs text-red-500"
                    >
                      {{ validationErrors.username }}
                    </div>
                  </div>

                  <!-- 密码输入框 -->
                  <div class="relative">
                    <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="请输入您的密码"
                      @input="clearValidationErrors"
                      :class="[
                        'w-full pl-12 pr-20 py-2 border-0 rounded-lg focus:ring-2 focus:bg-white transition-colors duration-200 text-black placeholder:text-gray-400',
                        validationErrors.password
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500'
                          : 'bg-gray-100 focus:ring-miaowu-green',
                      ]"
                    />
                    <!-- 清空按钮 -->
                    <button
                      v-if="loginForm.password"
                      @click="((loginForm.password = ''), clearValidationErrors())"
                      class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <!-- 显示/隐藏密码按钮 -->
                    <button
                      @click="showPassword = !showPassword"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        v-if="showPassword"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    </button>
                    <!-- 错误提示 -->
                    <div
                      v-if="validationErrors.password"
                      class="absolute -bottom-4 left-0 text-xs text-red-500"
                    >
                      {{ validationErrors.password }}
                    </div>
                  </div>

                  <button
                    @click="onLogin"
                    :disabled="loggingIn"
                    class="bg-black text-miaowu-green py-3 mx-[100px] rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ loggingIn ? '登录中...' : '登录' }}
                  </button>

                  <p class="text-xs text-black text-center leading-relaxed">
                    请使用您的喵呜账号登录，若您还未注册喵呜账号，请联系商务获取注册码后下载「喵呜APP」注册后登录。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PC端背景图片容器 -->
        <div class="hidden lg:block relative" style="width: 514px">
          <img
            src="@/assets/img/login-bg-pc.png"
            alt="登录背景"
            class="w-full h-auto object-contain"
            style="display: block"
          />

          <!-- 内容区域定位在背景图片上 -->
          <div
            class="absolute bg-white rounded-2xl p-5"
            style="height: 360px; bottom: 38px; left: 38px; right: 38px"
          >
            <div class="h-full flex flex-col">
              <!-- 头部 -->
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-800">登录您的喵呜AI账号</h2>
                <button
                  @click="close"
                  class="hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- 登录标签页 -->
              <div class="mb-4">
                <div class="flex justify-center">
                  <div
                    @click="loginTab = 'qrcode'"
                    class="text-center font-medium transition-colors duration-200 mr-12 cursor-pointer"
                    :class="loginTab === 'qrcode' ? 'underline text-black' : 'text-gray-500'"
                  >
                    扫码登录
                  </div>
                  <div
                    @click="loginTab = 'password'"
                    class="text-center font-medium transition-colors duration-200 cursor-pointer"
                    :class="loginTab === 'password' ? 'underline text-black' : 'text-gray-500'"
                  >
                    账号登录
                  </div>
                </div>
              </div>

              <!-- 登录内容 -->
              <div class="h-full flex flex-col">
                <!-- 扫码登录 -->
                <div
                  v-if="loginTab === 'qrcode'"
                  class="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div class="mb-2">
                    <div
                      class="w-40 h-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      <!-- 二维码图片 - 只在等待扫码时显示 -->
                      <img
                        v-if="qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        :src="qrCodeImage"
                        alt="登录二维码"
                        class="w-full h-full object-contain rounded-lg"
                      />
                      <!-- 扫描线动画 -->
                      <div
                        v-if="qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        class="absolute inset-0 pointer-events-none"
                      >
                        <div class="scan-line"></div>
                      </div>
                      <!-- 已扫码状态显示 -->
                      <div
                        v-if="qrCodeStatus === '2'"
                        class="flex flex-col items-center justify-center text-center p-4"
                      >
                        <div
                          class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3"
                        >
                          <svg
                            class="w-8 h-8 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p class="text-sm text-yellow-700 font-medium mb-1">请在手机上确认登录</p>
                        <p class="text-xs text-yellow-600">查看您的喵呜APP</p>
                      </div>
                      <!-- 加载状态 -->
                      <div
                        v-else-if="!qrCodeImage && !qrCodeExpired && qrCodeStatus === '1'"
                        class="flex flex-col items-center justify-center"
                      >
                        <div
                          class="animate-spin rounded-full h-8 w-8 border-b-2 border-miaowu-green mb-2"
                        ></div>
                        <span class="text-sm text-gray-500">生成中...</span>
                      </div>
                      <!-- 过期状态 - 只在明确过期时显示 -->
                      <div
                        v-else-if="qrCodeExpired"
                        class="flex flex-col items-center justify-center"
                      >
                        <svg
                          class="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span class="text-sm text-gray-500">二维码已过期</span>
                      </div>
                    </div>
                  </div>

                  <!-- 状态显示区域 -->
                  <div class="mb-4">
                    <!-- 状态图标和文本 -->
                    <div class="flex items-center justify-center mb-2">
                      <!-- 等待扫码状态 -->
                      <div v-if="qrCodeStatus === '1'" class="flex items-center">
                        <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                        <span class="text-sm text-blue-600 font-medium">{{
                          qrCodeStatusText
                        }}</span>
                      </div>

                      <!-- 已扫码状态 -->
                      <div v-else-if="qrCodeStatus === '2'" class="flex items-center mt-6">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mr-2"></div>
                        <span class="text-sm text-yellow-600 font-medium">{{
                          qrCodeStatusText
                        }}</span>
                      </div>

                      <!-- 登录成功状态 -->
                      <div v-else-if="qrCodeStatus === '3'" class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span class="text-sm text-green-600 font-medium">{{
                          qrCodeStatusText
                        }}</span>
                      </div>
                    </div>

                    <!-- 状态描述 -->
                    <div class="text-xs text-gray-500 text-center">
                      <span v-if="qrCodeStatus === '1'">请使用喵呜APP扫描上方二维码</span>
                      <span v-else-if="qrCodeStatus === '3'">正在为您登录...</span>
                      <span v-else-if="qrCodeStatus === '4'">二维码已失效，请点击下方按钮刷新</span>
                    </div>
                  </div>

                  <!-- 刷新按钮 -->
                  <button
                    v-if="qrCodeExpired"
                    @click="refreshQrCode"
                    class="px-4 py-2 text-sm text-white bg-miaowu-green hover:bg-green-600 rounded-lg transition-colors duration-200 font-medium"
                  >
                    刷新二维码
                  </button>
                </div>

                <!-- 账号登录 -->
                <div v-else class="flex-1 flex flex-col justify-center space-y-4">
                  <!-- 手机号输入框 -->
                  <div class="relative">
                    <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.username"
                      type="text"
                      placeholder="请输入您的手机号"
                      @input="clearValidationErrors"
                      :class="[
                        'w-full pl-12 pr-12 py-2 border-0 rounded-lg focus:ring-2 focus:bg-white transition-colors duration-200 text-black placeholder:text-gray-400',
                        validationErrors.username
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500'
                          : 'bg-gray-100 focus:ring-miaowu-green',
                      ]"
                    />
                    <!-- 清空按钮 -->
                    <button
                      v-if="loginForm.username"
                      @click="((loginForm.username = ''), clearValidationErrors())"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <!-- 错误提示 -->
                    <div
                      v-if="validationErrors.username"
                      class="absolute -bottom-4 left-0 text-xs text-red-500"
                    >
                      {{ validationErrors.username }}
                    </div>
                  </div>

                  <!-- 密码输入框 -->
                  <div class="relative">
                    <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="请输入您的密码"
                      @input="clearValidationErrors"
                      :class="[
                        'w-full pl-12 pr-20 py-2 border-0 rounded-lg focus:ring-2 focus:bg-white transition-colors duration-200 text-black placeholder:text-gray-400',
                        validationErrors.password
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500'
                          : 'bg-gray-100 focus:ring-miaowu-green',
                      ]"
                    />
                    <!-- 清空按钮 -->
                    <button
                      v-if="loginForm.password"
                      @click="((loginForm.password = ''), clearValidationErrors())"
                      class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <!-- 显示/隐藏密码按钮 -->
                    <button
                      @click="showPassword = !showPassword"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        v-if="showPassword"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    </button>
                    <!-- 错误提示 -->
                    <div
                      v-if="validationErrors.password"
                      class="absolute -bottom-4 left-0 text-xs text-red-500"
                    >
                      {{ validationErrors.password }}
                    </div>
                  </div>

                  <button
                    @click="onLogin"
                    :disabled="loggingIn"
                    class="bg-black text-miaowu-green py-3 mx-[100px] rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ loggingIn ? '登录中...' : '登录' }}
                  </button>

                  <p class="text-sm text-black text-center leading-relaxed">
                    请使用您的喵呜账号登录，若您还未注册喵呜账号，请联系商务获取注册码后下载「喵呜APP」注册后登录。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import * as CryptoJS from 'crypto-js'
import { ElMessage } from 'element-plus'
import * as QRCode from 'qrcode'
import { computed, onUnmounted, ref, watch } from 'vue'
import {
  apiGenerateQrCode,
  apiGetAesKey,
  apiGetQrCodeStatus,
  apiNewLogin,
  type AesKeyData,
  type GenerateQrCodeParams,
  type NewLoginRequest,
  type QrCodeData,
  type QrCodeStatus,
} from '../../api/auth.js'
import { apiGetUserInfo, type UserInfo } from '../../api/user.js'
import { useAuthStore } from '../../stores/auth.js'
import { decryptByAES, encryptByAES } from '../../utils/crypto.js'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

// 禁用body滚动
function disableBodyScroll() {
  document.body.style.overflow = 'hidden'
}

function enableBodyScroll() {
  document.body.style.overflow = ''
}

// 监听弹窗显示状态
watch(visible, (newValue) => {
  if (newValue) {
    disableBodyScroll()
  } else {
    enableBodyScroll()
  }
})

// 组件卸载时恢复滚动和清理定时器
onUnmounted(() => {
  enableBodyScroll()
  stopPolling()
})

function close() {
  emit('update:modelValue', false)
}

const loginTab = ref<'password' | 'qrcode'>('qrcode')
const loggingIn = ref(false)
const showPassword = ref(false)
const loginForm = ref({ username: '', password: '' })

// 验证状态
const validationErrors = ref({
  username: '',
  password: '',
})

// 扫码登录相关状态
const qrCodeData = ref<QrCodeData | null>(null)
const qrCodeImage = ref<string>('')
const qrCodeStatus = ref<QrCodeStatus>('1')
const qrCodeStatusText = ref('等待扫码')
const isPolling = ref(false)
const pollTimer = ref<NodeJS.Timeout | null>(null)
const qrCodeExpired = ref(false)

const auth = useAuthStore()

// 生成16位的随机数
function generateRandomString(length: number = 16) {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// 生成二维码
async function generateQrCode() {
  try {
    const random = generateRandomString(16)
    // 计算字符串的 MD5 哈希值
    const hash = CryptoJS.MD5(random + 'miaowu').toString()
    const params: GenerateQrCodeParams = {
      scene_id: random,
      scene_token: hash,
    }
    const response = await apiGenerateQrCode(params)
    if (response && response.status === 'ok') {
      qrCodeData.value = response.data
      // 生成二维码图片
      const qrCodeUrl = await QRCode.toDataURL(response.data.code_id, {
        width: 160,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      qrCodeImage.value = qrCodeUrl
      qrCodeStatus.value = '1'
      qrCodeStatusText.value = '等待扫码'
      qrCodeExpired.value = false

      // 开始轮询状态
      startPolling()
    } else {
      ElMessage.error(response?.message || '生成二维码失败')
    }
  } catch (error: any) {
    console.error('生成二维码失败:', error)
    ElMessage.error(error?.message || '生成二维码失败')
  }
}

// 开始轮询扫码状态
function startPolling() {
  if (isPolling.value || !qrCodeData.value) return

  isPolling.value = true
  pollTimer.value = setInterval(async () => {
    if (!qrCodeData.value) return

    try {
      const response = await apiGetQrCodeStatus(qrCodeData.value.code_id)
      if (response && response.status === 'ok') {
        const status = response.data.status
        qrCodeStatus.value = status

        switch (status) {
          case '1':
            qrCodeStatusText.value = '等待扫码'
            break
          case '2':
            qrCodeStatusText.value = '已扫码，请在手机上确认登录'
            break
          case '3':
            qrCodeStatusText.value = '登录成功'
            // 处理登录成功
            await handleQrLoginSuccess(response.data)
            stopPolling()
            break
          case '4':
            qrCodeStatusText.value = '二维码已过期'
            qrCodeExpired.value = true
            stopPolling()
            break
        }
      }
    } catch (error) {
      console.error('查询扫码状态失败:', error)
    }
  }, 2000) // 每2秒轮询一次
}

// 停止轮询
function stopPolling() {
  if (pollTimer.value) {
    clearInterval(pollTimer.value)
    pollTimer.value = null
  }
  isPolling.value = false
}

// 处理扫码登录成功
async function handleQrLoginSuccess(data: any) {
  try {
    // 这里需要根据实际API响应结构来处理
    // 假设返回的数据包含token信息
    if (data.user_token) {
      auth.setToken(data.user_token) // 实际应该从响应中获取token
      ElMessage.success('登录成功')
      // 登录成功后重置二维码数据
      resetQrCodeData()
      close()
    }
  } catch (error: any) {
    console.error('处理登录成功失败:', error)
    ElMessage.error('登录处理失败')
  }
}

// 重置二维码数据
function resetQrCodeData() {
  qrCodeData.value = null
  qrCodeImage.value = ''
  qrCodeStatus.value = '1'
  qrCodeStatusText.value = '等待扫码'
  qrCodeExpired.value = false
}

// 刷新二维码
function refreshQrCode() {
  stopPolling()
  resetQrCodeData()
  generateQrCode()
}

// 监听登录标签页切换
watch(loginTab, (newTab) => {
  if (newTab === 'qrcode') {
    // 切换到扫码登录时
    if (!qrCodeData.value) {
      // 如果没有二维码数据，生成新的
      generateQrCode()
    } else {
      // 如果有二维码数据，继续轮询状态
      if (!isPolling.value) {
        startPolling()
      }
    }
  } else {
    // 切换到密码登录时停止轮询
    stopPolling()
  }
})

// 监听弹窗显示状态
watch(visible, (newValue) => {
  if (newValue) {
    disableBodyScroll()
    // 每次打开弹窗都重新生成二维码
    if (loginTab.value === 'qrcode') {
      generateQrCode()
    }
  } else {
    enableBodyScroll()
    // 关闭弹窗时停止轮询并重置数据
    stopPolling()
    resetQrCodeData()
  }
})

// 清除验证错误
function clearValidationErrors() {
  validationErrors.value = {
    username: '',
    password: '',
  }
}

// 验证表单
function validateForm() {
  clearValidationErrors()
  let hasError = false

  if (!loginForm.value.username.trim()) {
    validationErrors.value.username = '请输入手机号'
    hasError = true
  }

  if (!loginForm.value.password.trim()) {
    validationErrors.value.password = '请输入密码'
    hasError = true
  }

  return !hasError
}

async function onLogin() {
  if (!validateForm()) {
    return
  }

  loggingIn.value = true
  try {
    const response = await apiGetAesKey()
    if (response && response.status === 'ok') {
      const resData = response.data as AesKeyData
      const aesParams = decryptByAES(resData.key_data, {
        key: resData.key_str,
        iv: resData.key_str,
      })
      const aesParamsJson = JSON.parse(aesParams)
      const aesKey = aesParamsJson.aes_key
      const aesIv = aesParamsJson.aes_iv
      console.log('aesKey:', aesKey)
      console.log('aesIv:', aesIv)

      // 创建登录参数对象
      const params = {
        identity: loginForm.value.username,
        password: loginForm.value.password,
        login_type: 'h5',
      }
      // 序列化参数
      const paramsString = JSON.stringify(params)

      // 加密参数
      const encryptContent = encryptByAES(paramsString, { key: aesKey, iv: aesIv })
      console.log(encryptContent)
      // 创建新的请求对象
      const newJsonParams: NewLoginRequest = {
        data: encryptContent,
      }

      const res = await apiNewLogin(newJsonParams)
      if (res && res.status === 'ok') {
        auth.setToken(res.data.access_token)

        // 获取用户信息
        try {
          const userInfoRes = await apiGetUserInfo()
          if (userInfoRes && userInfoRes.status === 'ok') {
            auth.setUserInfo(userInfoRes.data[0] as UserInfo)
            ElMessage.success('登录成功')
          } else {
            ElMessage.warning('登录成功，但获取用户信息失败')
          }
        } catch (error) {
          console.error('获取用户信息失败:', error)
          ElMessage.warning('登录成功，但获取用户信息失败')
        }

        close()
      } else {
        ElMessage.error(res?.message || '登录失败')
      }
    } else {
      ElMessage.error(response?.message || '获取加密参数失败')
    }
  } catch (e: any) {
    ElMessage.error(e?.message || '登录失败')
  } finally {
    loggingIn.value = false
  }
}
</script>

<style lang="scss" scoped>
.underline {
  position: relative;
  text-decoration-color: rgba(155, 255, 43, 1);
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 6px;
  text-underline-offset: -4px;
}

// 扫描线动画
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #9bff2b, transparent);
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(160px);
  }
}
</style>
