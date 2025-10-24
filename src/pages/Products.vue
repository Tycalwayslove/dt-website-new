<template>
  <section class="container py-12">
    <h1 class="text-3xl font-bold mb-4">产品与服务</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="p-4 border border-gray-200 dark:border-gray-800 rounded">
        <div class="aspect-video bg-gray-100 dark:bg-gray-800 mb-3" />
        <h3 class="font-semibold">产品 {{ i }}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm">简短描述。</p>
      </div>
    </div>
  </section>
</template>
