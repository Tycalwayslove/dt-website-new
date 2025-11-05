<template>
  <Transition name="fade">
    <div
      v-show="visible"
      class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 dark:bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="relogin-title"
      @click.self="close"
    >
      <Transition name="scale">
        <div
          v-show="visible"
          class="w-[380px] max-w-[92vw] rounded-xl bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
        >
          <div class="px-5 pt-5">
            <h3 id="relogin-title" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">登录提示</h3>
            <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">当前登录状态已失效，请重新登录。</p>
          </div>
          <div class="mt-5 px-5 pb-5 flex justify-end gap-3">
            <button
              type="button"
              class="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-neutral-900 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-300/80 dark:text-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              @click="close()"
            >
              稍后
            </button>
            <button
              type="button"
              class="inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold text-black bg-[#9bff2b] hover:bg-[#84ff00] active:bg-[#84ff00]/90"
              @click="goLogin"
            >
              立即去登录
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
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

<style scoped>
/* Overlay fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Card scale */
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.18s ease-in-out, opacity 0.18s ease-in-out;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.98);
  opacity: 0;
}
</style>
