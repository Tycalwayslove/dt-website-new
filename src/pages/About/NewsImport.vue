<template>
  <div class="min-h-screen bg-white">
    <section class="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <RouterLink
        :to="{ name: 'AboutNews' }"
        class="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
      >
        <span aria-hidden="true">←</span>
        返回公司资讯
      </RouterLink>

      <div class="mt-8">
        <h1 class="text-3xl font-semibold text-black md:text-4xl">公司资讯补录</h1>
        <p class="mt-4 text-base leading-relaxed text-gray-600">
          用于补录已通知群发但未进入官网列表的公众号文章。
        </p>
      </div>

      <form class="mt-8 space-y-6 rounded-lg border border-gray-200 p-5 md:p-6" @submit.prevent="submitImport">
        <label class="block">
          <span class="text-sm font-medium text-black">补录密钥</span>
          <input
            v-model.trim="token"
            type="password"
            autocomplete="off"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            placeholder="请输入运营补录密钥"
          />
        </label>

        <label class="block">
          <span class="text-sm font-medium text-black">公众号文章链接</span>
          <textarea
            v-model.trim="articleUrl"
            rows="4"
            class="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-black"
            placeholder="https://mp.weixin.qq.com/s/..."
          ></textarea>
        </label>

        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex min-h-11 items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-miaowu-green hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          {{ submitting ? '补录中...' : '补录文章' }}
        </button>
      </form>

      <div
        v-if="message"
        class="mt-6 rounded-lg border p-5"
        :class="messageType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'"
      >
        <p
          class="text-sm font-medium"
          :class="messageType === 'success' ? 'text-green-800' : 'text-red-700'"
        >
          {{ message }}
        </p>

        <RouterLink
          v-if="importedArticle"
          :to="{ name: 'AboutNewsDetail', params: { id: importedArticle.id } }"
          class="mt-4 inline-flex text-sm font-medium text-black underline underline-offset-4"
        >
          查看文章：{{ importedArticle.title }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { buildNewsManualImportApiPath } from '@/utils/news'

interface ImportedArticle {
  id: string
  title: string
  publishTime?: number
  originalUrl?: string
}

interface ManualImportPayload {
  article?: ImportedArticle
}

const token = ref('')
const articleUrl = ref('')
const submitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const importedArticle = ref<ImportedArticle | null>(null)

onMounted(() => {
  token.value = sessionStorage.getItem('newsManualImportToken') || ''
})

const submitImport = async () => {
  if (!token.value || !articleUrl.value) {
    messageType.value = 'error'
    message.value = '请填写补录密钥和公众号文章链接。'
    importedArticle.value = null
    return
  }

  submitting.value = true
  message.value = ''
  importedArticle.value = null

  try {
    sessionStorage.setItem('newsManualImportToken', token.value)

    const response = await fetch(buildNewsManualImportApiPath(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.value}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ url: articleUrl.value }),
    })
    const payload = (await response.json()) as ManualImportPayload & { error?: string }

    if (!response.ok) {
      throw new Error(payload.error || `HTTP ${response.status}`)
    }

    importedArticle.value = payload.article || null
    messageType.value = 'success'
    message.value = payload.article?.title ? '补录成功。' : '补录完成。'
  } catch (error) {
    messageType.value = 'error'
    message.value = error instanceof Error ? error.message : '补录失败，请稍后重试。'
  } finally {
    submitting.value = false
  }
}
</script>
