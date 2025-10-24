<template>
  <section class="container py-12 max-w-2xl">
    <h1 class="text-3xl font-bold mb-6">联系我们</h1>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="留言" prop="message">
        <el-input v-model="form.message" type="textarea" :rows="4" placeholder="请输入留言" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitting" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { isRequired, isEmail, isPhone } from '@/utils/validators'
import { httpPost } from '@/api/http'

const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({ name: '', email: '', phone: '', message: '' })

const rules: FormRules = {
  name: [
    {
      validator: (_: any, v: unknown, cb: (arg0: Error | undefined) => any) =>
        cb(isRequired(v) === true ? undefined : new Error(String(isRequired(v)))),
      trigger: 'blur',
    },
  ],
  email: [
    {
      validator: (_: any, v: unknown, cb: (arg0: Error | undefined) => any) =>
        cb(isRequired(v) === true ? undefined : new Error(String(isRequired(v)))),
      trigger: 'blur',
    },
    {
      validator: (_: any, v: string, cb: (arg0: Error | undefined) => any) =>
        cb(isEmail(v) === true ? undefined : new Error(String(isEmail(v)))),
      trigger: 'blur',
    },
  ],
  phone: [
    {
      validator: (_: any, v: string, cb: (arg0: Error | undefined) => any) =>
        cb(isPhone(v) === true ? undefined : new Error(String(isPhone(v)))),
      trigger: 'blur',
    },
  ],
  message: [
    {
      validator: (_: any, v: unknown, cb: (arg0: Error | undefined) => any) =>
        cb(isRequired(v) === true ? undefined : new Error(String(isRequired(v)))),
      trigger: 'blur',
    },
  ],
}

async function onSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: any) => {
    if (!valid) return
    submitting.value = true
    try {
      await httpPost('/contact', form)
      ElMessage.success('提交成功，我们会尽快联系您！')
      Object.assign(form, { name: '', email: '', phone: '', message: '' })
    } catch (e: any) {
      ElMessage.error(e?.message || '提交失败，请稍后重试')
    } finally {
      submitting.value = false
    }
  })
}
</script>
