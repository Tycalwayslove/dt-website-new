<template>
  <!-- 整体容器 - 纯白色背景 -->
  <div class="container mx-auto px-20 lg:px-20 py-20 bg-white">
    <!-- 主容器 - PC端左右布局，移动端上下布局 -->
    <div
      class="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 xl:gap-20"
    >
      <!-- 左侧图片区域（红框） - 移动端在上，PC端在左 -->
      <div class="w-full lg:w-[60%] flex items-center justify-center">
        <img :src="registerImg" alt="注册" class="w-full max-w-[1000px] h-auto" />
      </div>

      <!-- 右侧表单区域（蓝框） - 移动端在下，PC端在右 -->
      <div class="w-full lg:w-[40%] max-w-[500px]">
        <!-- 标题 -->
        <div class="mb-6 lg:mb-8">
          <h2
            class="text-2xl sm:text-3xl lg:text-[56px] text-black text-left mb-3 lg:mb-8 font-wendao text-black"
          >
            商家账号注册
          </h2>
          <div class="w-16 lg:w-20 h-[3px] bg-black"></div>
        </div>

        <!-- 注册表单 -->
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          label-width="0"
          size="small"
        >
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入您的手机号"
              clearable
              maxlength="11"
              type="tel"
            >
              <template #prefix>
                <img :src="iconPhone" alt="手机号" class="w-[15px] h-[20px]" />
              </template>
            </el-input>
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="code">
            <div class="flex items-center w-full code-wrapper">
              <el-input
                v-model="registerForm.code"
                placeholder="请输入验证码"
                clearable
                maxlength="6"
                class="code-input flex-1"
                type="number"
              >
                <template #prefix>
                  <img :src="iconReg" alt="验证码" class="w-[17px] h-[20px]" />
                </template>
              </el-input>
              <!-- 获取验证码按钮 -->
              <div
                :class="['get-code-btn-text', countdown > 0 || sendingCode ? 'disabled' : 'active']"
                @click="countdown === 0 && !sendingCode && handleGetCode()"
              >
                {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
              </div>
            </div>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请设置您的密码"
              clearable
            >
              <template #prefix>
                <img :src="iconPwd" alt="密码" class="w-[17px] h-[20px]" />
              </template>
              <template #suffix>
                <img
                  :src="showPassword ? iconSee : iconNoSee"
                  alt="显示/隐藏密码"
                  class="w-[19px] h-[13px] cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </el-input>
          </el-form-item>

          <!-- 密码提示 -->
          <div
            :class="[
              'text-xs text-gray-500 mb-4 px-1 leading-relaxed text-black',
              !hasPasswordError ? '-mt-3' : 'mt-0',
            ]"
          >
            *密码必须是8-20位英文字母、数字、特殊符号字 符组合（不能是纯数字或字母）
          </div>

          <!-- 确认密码 -->
          <el-form-item prop="confirm_password">
            <el-input
              v-model="registerForm.confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请再次输入设置的密码"
              clearable
            >
              <template #prefix>
                <img :src="iconPwdAgain" alt="确认密码" class="w-[17px] h-[20px]" />
              </template>
              <template #suffix>
                <img
                  :src="showConfirmPassword ? iconSee : iconNoSee"
                  alt="显示/隐藏密码"
                  class="w-[19px] h-[13px] cursor-pointer"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </el-input>
          </el-form-item>

          <!-- 代理ID -->
          <el-form-item prop="inviter">
            <el-input
              v-model="registerForm.inviter"
              placeholder="请输入邀请您入驻的代理ID"
              clearable
            >
              <template #prefix>
                <img :src="iconAgentId" alt="代理ID" class="w-[17px] h-[20px]" />
              </template>
            </el-input>
          </el-form-item>

          <!-- 注册按钮 -->
          <el-form-item class="mb-4">
            <el-button
              type="primary"
              :class="[
                'w-full h-[44px] font-medium text-[22px] mx-[60px] register-btn',
                !isFormComplete && !registering ? 'opacity-40' : 'opacity-100',
              ]"
              :disabled="!isFormComplete && !registering"
              :loading="registering"
              @click="handleRegister"
            >
              {{ registering ? '注册中...' : '立即注册' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 底部链接 -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between text-sm gap-3 sm:gap-0 mt-6"
        >
          <div class="text-gray-600">
            已有账号？
            <a
              href="#"
              class="text-black font-medium ml-1 hover-underline-group"
              @click.prevent="handleGoToLogin"
            >
              <span class="hover-underline">立即登录</span>
            </a>
          </div>
          <div class="text-gray-600 hover-underline-group">
            <a
              href="#"
              class="text-black font-medium hover-underline"
              @click.prevent="handleNoAgentId"
            >
              没有代理ID？
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 图形验证码弹窗 -->
    <CaptchaDialog v-model="showCaptchaDialog" @confirm="handleCaptchaConfirm" />
  </div>
</template>

<script setup lang="ts">
import {
  apiGetAesKey,
  apiGetSmsCode,
  apiRegister,
  type AesKeyData,
  type RegisterRequest,
} from '@/api/auth'
import { apiGetUserInfo, type UserInfo } from '@/api/user.js'
import CaptchaDialog from '@/components/auth/CaptchaDialog.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useUiStore } from '@/stores/ui.js'
import { decryptByAES, encryptByAES } from '@/utils/crypto.js'
import { isPhone } from '@/utils/validators'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// 导入图标和图片
import iconAgentId from '@/assets/img/regisiter/icon-agentid.png'
import iconNoSee from '@/assets/img/regisiter/icon-no-see.png'
import iconPhone from '@/assets/img/regisiter/icon-phone.png'
import iconPwdAgain from '@/assets/img/regisiter/icon-pwd-again.png'
import iconPwd from '@/assets/img/regisiter/icon-pwd.png'
import iconReg from '@/assets/img/regisiter/icon-reg.png'
import iconSee from '@/assets/img/regisiter/icon-see.png'
import registerImg from '@/assets/img/regisiter/register-img.png'

const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const registerFormRef = ref<FormInstance>()
const registering = ref(false)
const sendingCode = ref(false)
const countdown = ref(0)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const hasPasswordError = ref(false) // 追踪密码字段是否有错误
const showCaptchaDialog = ref(false) // 图形验证码弹窗显示状态
const captchaInfo = ref<{ captcha_id: string; captcha_code: string } | null>(null) // 图形验证码信息
let countdownTimer: NodeJS.Timeout | null = null

// 判断表单是否填写完整
const isFormComplete = computed(() => {
  return !!(
    registerForm.phone &&
    registerForm.code &&
    registerForm.password &&
    registerForm.confirm_password &&
    registerForm.inviter
  )
})

// 表单数据
const registerForm = reactive<RegisterRequest>({
  phone: '',
  code: '',
  password: '',
  confirm_password: '',
  inviter: '',
})

// 自定义验证器：密码一致性
const validatePasswordMatch = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 自定义验证器：手机号格式
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const result = isPhone(value)
    if (result === true) {
      callback()
    } else {
      callback(new Error(result as string))
    }
  }
}

// 自定义密码验证器 - 用于追踪错误状态
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    hasPasswordError.value = true
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 20) {
    hasPasswordError.value = true
    callback(new Error('密码长度为6-20位'))
  } else {
    hasPasswordError.value = false
    callback()
  }
}

// 表单验证规则
const registerRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '验证码长度为4-6位', trigger: 'blur' },
  ],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  confirm_password: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePasswordMatch, trigger: 'blur' },
  ],
  inviter: [{ required: true, message: '请输入代理ID', trigger: 'blur' }],
})

// 获取验证码 - 打开图形验证码弹窗
const handleGetCode = async () => {
  // 先验证手机号
  if (!registerFormRef.value) return

  try {
    await registerFormRef.value.validateField('phone')
  } catch {
    return
  }

  // 打开图形验证码弹窗
  showCaptchaDialog.value = true
}

// 处理图形验证码确认
const handleCaptchaConfirm = async (info: { captcha_id: string; captcha_code: string }) => {
  sendingCode.value = true
  try {
    const response = await apiGetSmsCode({
      phone: registerForm.phone,
      captcha_code: info.captcha_code,
      captcha_id: info.captcha_id,
    })

    if (response && response.status === 'ok') {
      // 保存图形验证码信息供注册使用
      captchaInfo.value = info

      // 关闭图形验证码弹窗
      showCaptchaDialog.value = false

      ElMessage.success('验证码已发送，请注意查收')

      // 开始倒计时
      countdown.value = 60
      countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0 && countdownTimer) {
          clearInterval(countdownTimer)
          countdownTimer = null
        }
      }, 1000)
    } else {
      ElMessage.error(response?.msg || '发送验证码失败')
    }
  } catch (error: any) {
    ElMessage.error(error?.message || '发送验证码失败')
  } finally {
    sendingCode.value = false
  }
}

// 注册
const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    // 验证表单
    await registerFormRef.value.validate()
  } catch {
    return
  }

  // 检查是否有图形验证码信息
  if (!captchaInfo.value) {
    ElMessage.error('请先获取验证码')
    return
  }

  registering.value = true
  try {
    // 第一步：获取 AES 加密密钥
    const aesKeyResponse = await apiGetAesKey()
    if (aesKeyResponse && aesKeyResponse.status === 'ok') {
      const resData = aesKeyResponse.data as AesKeyData

      // 解密获取真实的 key 和 iv
      const aesParams = decryptByAES(resData.key_data, {
        key: resData.key_str,
        iv: resData.key_str,
      })
      const aesParamsJson = JSON.parse(aesParams)
      const aesKey = aesParamsJson.aes_key
      const aesIv = aesParamsJson.aes_iv

      // 第二步：创建注册参数对象
      const params = {
        phone: registerForm.phone,
        code: registerForm.code,
        password: registerForm.password,
        inviter: registerForm.inviter,
      }

      // 第三步：序列化参数
      const paramsString = JSON.stringify(params)

      // 第四步：加密参数
      const encryptContent = encryptByAES(paramsString, { key: aesKey, iv: aesIv })

      // 第五步：创建加密请求对象
      const encryptedRequest = {
        data: encryptContent,
      }

      // 第六步：发送注册请求
      const response = await apiRegister(encryptedRequest as any)

      if (response && response.status === 'ok') {
        // 保存 token
        auth.setToken(response.data.access_token)

        // 获取用户信息
        try {
          const userInfoRes = await apiGetUserInfo()
          if (userInfoRes && userInfoRes.status === 'ok') {
            auth.setUserInfo(userInfoRes.data[0] as UserInfo)
            ElMessage.success('注册成功！')
          } else {
            ElMessage.warning('注册成功，但获取用户信息失败')
          }
        } catch (error) {
          console.error('获取用户信息失败:', error)
          ElMessage.warning('注册成功，但获取用户信息失败')
        }

        // 跳转到首页
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        ElMessage.error(response?.msg || '注册失败')
      }
    } else {
      ElMessage.error(aesKeyResponse?.msg || '获取加密参数失败')
    }
  } catch (error: any) {
    console.error('注册失败:', error)
    ElMessage.error(error?.msg || '注册失败')
  } finally {
    registering.value = false
  }
}

// 没有代理ID的处理 - 跳转到帮助中心的商务合作页面
const handleNoAgentId = () => {
  ElMessage.info('请联系商务获取代理ID')
  router.push('/legal/help?cat=biz')
}

// 跳转到首页并打开登录弹窗
const handleGoToLogin = () => {
  router.push('/')
  // 使用 nextTick 确保路由跳转完成后再打开弹窗
  setTimeout(() => {
    ui.openLoginDialog()
  }, 100)
}

// 监听密码输入变化，清除错误状态（当用户开始输入时）
watch(
  () => registerForm.password,
  (newVal) => {
    // 当密码不为空且长度在6-20之间时，清除错误状态
    if (newVal && newVal.length >= 6 && newVal.length <= 20) {
      hasPasswordError.value = false
    }
  }
)

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})
</script>

<style scoped>
/* 表单项间距 */
:deep(.el-form-item) {
  margin-bottom: 16px;
}

/* 输入框样式 - 灰色背景 */
:deep(.el-input__wrapper) {
  background-color: #f0f0f0 !important;
  border: none !important;
  border-radius: 8px;
  box-shadow: none !important;
  padding: 10px 16px;
  min-height: 48px;
}

/* 修复浏览器自动填充的背景色 */
:deep(.el-input__inner:-webkit-autofill),
:deep(.el-input__inner:-webkit-autofill:hover),
:deep(.el-input__inner:-webkit-autofill:focus),
:deep(.el-input__inner:-webkit-autofill:active) {
  -webkit-box-shadow: 0 0 0 1000px #f0f0f0 inset !important;
  box-shadow: 0 0 0 1000px #f0f0f0 inset !important;
  -webkit-text-fill-color: #333 !important;
  background-color: #f0f0f0 !important;
  transition: background-color 5000s ease-in-out 0s;
}

:deep(.el-input__inner:-internal-autofill-selected) {
  background-color: #f0f0f0 !important;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper:focus),
:deep(.el-input.is-focus .el-input__wrapper) {
  background-color: #f0f0f0 !important;
  box-shadow: none !important;
}
/* 设定宽高 */
:deep(.el-input__wrapper) {
  padding: 8px 15px !important;
  min-height: 44px !important;
}

:deep(.el-input__prefix) {
  padding-right: 15px !important;
  margin-right: 15px !important;
}
:deep(.el-input__prefix-inner > :last-child) {
  margin-right: 0 !important;
}

/* 输入框内的文本 */
:deep(.el-input__inner) {
  font-size: 16px;
  color: #333;
}

:deep(.el-input__inner::placeholder) {
  color: #999;
  font-size: 16px;
}

/* 输入框内的图标 */
:deep(.el-input__prefix) {
  display: flex;
  align-items: center;
  margin-right: 12px;
  padding-right: 12px;
  position: relative;
}

/* 前缀图标后的分隔线 */
:deep(.el-input__prefix::after) {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 24px;
  background-color: #000000;
  opacity: 0.15;
}

:deep(.el-input__suffix) {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

/* 验证码容器 - 让输入框和按钮紧密连接 */
.code-wrapper {
  gap: 0;
}

/* 验证码输入框样式 - 去掉右边圆角 */
:deep(.code-input .el-input__wrapper) {
  border-radius: 8px 0 0 8px !important;
}

/* 清除按钮样式 */
:deep(.el-input__suffix-inner .el-icon) {
  cursor: pointer;
  color: #999;
}

/* 按钮通用样式 */
:deep(.el-button) {
  border-radius: 8px;
  font-weight: 500;
  height: 48px;
  font-size: 15px;
  border: none;
}

/* 获取验证码按钮文本样式 */
.get-code-btn-text {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: #f0f0f0;
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.3s;
  position: relative;
  min-width: 110px;
}

/* 添加分隔线 */
/* .get-code-btn-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.15);
} */

.get-code-btn-text.active {
  color: #000;
  cursor: pointer;
  font-weight: 500;
}

.get-code-btn-text.disabled {
  color: #999;
  cursor: not-allowed;
  background-color: #f0f0f0;
}

/* 注册按钮样式 */
.register-btn {
  background-color: #000 !important;
  border-color: #000 !important;
  color: #9bff2b !important;
  transition: all 0.3s;
}

.register-btn:hover:not(:disabled) {
  background-color: #333 !important;
  border-color: #333 !important;
}

.register-btn:active:not(:disabled) {
  background-color: #000 !important;
}

.register-btn:disabled {
  cursor: not-allowed;
}
</style>
