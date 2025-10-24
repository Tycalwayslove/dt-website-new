<template>
  <el-dialog v-model="visible" title="登录提示" width="380px">
    <p class="text-gray-600 dark:text-gray-300">当前登录状态已失效，请重新登录。</p>
    <template #footer>
      <el-button @click="close()">稍后</el-button>
      <el-button type="primary" @click="goLogin">立即去登录</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'login'): void }>()

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

function close() {
  visible.value = false
}

function goLogin() {
  close()
  emit('login')
}
</script>
