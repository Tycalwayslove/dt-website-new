<template>
  <el-dialog v-model="visible" title="登录" width="420px" @closed="onClosed">
    <el-tabs v-model="loginTab">
      <el-tab-pane label="账号密码" name="password">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              show-password
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="扫码登录" name="qrcode">
        <div class="text-center text-gray-500 py-8">暂未实现，后续接入</div>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="close()">取消</el-button>
      <el-button type="primary" :loading="loggingIn" @click="onLogin">登录</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { apiGetAesKey, apiLogin, type LoginRequest, type AesKeyData } from '@/api/auth'
import { encryptByAES } from '@/utils/crypto'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

function close() {
  emit('update:modelValue', false)
}

function onClosed() {
  loginForm.value = { username: '', password: '' }
}

const loginTab = ref<'password' | 'qrcode'>('password')
const loggingIn = ref(false)
const loginFormRef = ref<FormInstance>()
const loginForm = ref({ username: '', password: '' })
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 50, message: '账号长度应在 3-50 之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 100, message: '密码长度应在 6-100 之间', trigger: 'blur' },
  ],
}

const auth = useAuthStore()

async function onLogin() {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    loggingIn.value = true
    try {
      const response = await apiGetAesKey()
      if (response && response.status === 'ok') {
        const aes = response.data as AesKeyData
        console.log(aes)
        const payload: LoginRequest = {
          username: encryptByAES(loginForm.value.username, aes),
          password: encryptByAES(loginForm.value.password, aes),
        }
        const res = await apiLogin(payload)
        if (res && res.status === 'ok') {
          auth.setToken(res.data.token)
          ElMessage.success('登录成功')
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
  })
}
</script>
