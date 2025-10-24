<template>
  <section class="container py-12">
    <h1 class="text-3xl font-bold mb-4">新闻动态</h1>
    <ul class="space-y-4">
      <li v-for="i in 5" :key="i" class="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h3 class="font-medium">新闻标题 {{ i }}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm">新闻摘要内容...</p>
      </li>
    </ul>
  </section>
</template>
