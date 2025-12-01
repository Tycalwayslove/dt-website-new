import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isTest = mode === 'test'
  const isProd = mode === 'production'
  const isDev = command === 'serve'
  const API_BASE = env.VITE_API_BASE_URL || 'http://localhost:3000'

  // Resolve public base from env or scripts/oss.config.json
  // 在开发模式下始终使用 '/'，只在构建时使用 OSS 路径
  let PUBLIC_BASE = isDev ? '/' : env.VITE_PUBLIC_BASE_URL || '/'

  if (!isDev && !env.VITE_PUBLIC_BASE_URL) {
    try {
      const cfgPath = path.join(process.cwd(), 'scripts', 'oss.config.json')
      if (fs.existsSync(cfgPath)) {
        const raw = fs.readFileSync(cfgPath, 'utf-8')
        const cfg = JSON.parse(raw) as {
          bucket: string
          region: string // e.g. oss-cn-guangzhou
          testPrefix: string
          prodPrefix: string
        }
        const endpoint = `${cfg.bucket}.${cfg.region}.aliyuncs.com`
        const prefix = isTest ? cfg.testPrefix : cfg.prodPrefix
        PUBLIC_BASE = `https://${endpoint}/${prefix}`
      }
    } catch (e) {
      // Keep default '/'
    }
  }
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
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || ''
            const ext = name.split('.').pop()?.toLowerCase() || ''
            if (ext === 'css') return 'assets/css/[name]-[hash][extname]'
            if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) {
              return 'assets/img/[name]-[hash][extname]'
            }
            if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext)) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            return 'assets/static/[name]-[hash][extname]'
          },
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
