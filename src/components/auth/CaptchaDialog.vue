<template>
  <el-dialog
    v-model="visible"
    title="请输入图形验证码"
    width="400px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="captcha-content">
      <!-- 图形验证码图片 -->
      <div class="captcha-image-wrapper">
        <img
          v-if="captchaImage"
          :src="captchaImage"
          alt="图形验证码"
          class="captcha-image"
          @click="refreshCaptcha"
        />
        <div v-else class="captcha-loading">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          <span>加载中...</span>
        </div>
        <div class="captcha-refresh" @click="refreshCaptcha">
          <el-icon><RefreshRight /></el-icon>
          <span>点击刷新</span>
        </div>
      </div>

      <!-- 验证码输入框 -->
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入图形验证码"
            clearable
            maxlength="6"
            @keyup.enter="handleConfirm"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="confirming" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { apiGetCaptcha } from '@/api/auth'
import { Key, Loading, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { computed, ref, watch } from 'vue'

interface CaptchaInfo {
  captcha_id: string
  captcha_code: string
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', captchaInfo: CaptchaInfo): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const captchaImage = ref('')
const captchaId = ref('')
const form = ref({
  code: '',
})
const confirming = ref(false)

const rules: FormRules = {
  code: [
    { required: true, message: '请输入图形验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '验证码长度为4-6位', trigger: 'blur' },
  ],
}

// 获取图形验证码
const fetchCaptcha = async () => {
  try {
    captchaImage.value = ''
    const response = await apiGetCaptcha()
    if (response && response.status === 'ok') {
      captchaId.value = response.data.captcha_id
      // 如果 image 已经是完整的 base64，直接使用；否则添加前缀
      captchaImage.value = response.data.image.startsWith('data:')
        ? response.data.image
        : `data:image/png;base64,${response.data.image}`
    } else {
      ElMessage.error(response?.msg || '获取图形验证码失败')
    }
  } catch (error: any) {
    ElMessage.error(error?.msg || '获取图形验证码失败')
  }
}

// 刷新验证码
const refreshCaptcha = () => {
  form.value.code = ''
  fetchCaptcha()
}

// 确认
const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    return
  }

  if (!captchaId.value) {
    ElMessage.error('验证码信息错误，请刷新后重试')
    return
  }

  confirming.value = true
  try {
    // 将验证码信息传回父组件
    emit('confirm', {
      captcha_id: captchaId.value,
      captcha_code: form.value.code,
    })
  } finally {
    confirming.value = false
  }
}

// 关闭
const handleClose = () => {
  form.value.code = ''
  visible.value = false
}

// 监听弹窗显示状态
watch(visible, (newVal) => {
  if (newVal) {
    fetchCaptcha()
  } else {
    // 关闭时重置
    form.value.code = ''
    captchaImage.value = ''
    captchaId.value = ''
  }
})
</script>

<style scoped>
.captcha-content {
  padding: 20px 0;
}

.captcha-image-wrapper {
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.captcha-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.captcha-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #909399;
}

.captcha-refresh {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #409eff;
  transition: all 0.3s;
}

.captcha-refresh:hover {
  background-color: rgba(255, 255, 255, 1);
  color: #66b1ff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
