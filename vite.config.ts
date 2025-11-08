import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE = env.VITE_API_BASE_URL || 'http://localhost:3000'
  const PUBLIC_BASE = env.VITE_PUBLIC_BASE_URL || '/'
  const isTest = mode === 'test'
  const isProd = mode === 'production'
  return {
    base: PUBLIC_BASE,
    plugins: [vue(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: API_BASE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/manage': {
          target: API_BASE + '/manage',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: isTest ? 5176 : 5173,
    },
    build: {
      outDir: isTest ? 'dist-test' : 'dist',
      sourcemap: isTest,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['element-plus'],
          },
        },
      },
      minify: 'esbuild',
    },
  }
})
