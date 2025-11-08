# 公司官网（Vue 3 + Vite）

- 技术栈: Vue 3, Vite 4, Vue Router 4, Pinia, Element Plus, Tailwind CSS, Font Awesome, Axios
- 运行环境: Node >= 18，包管理器 `pnpm`

## 项目结构

- `index.html` 项目入口，引用 `src/main.ts`。`favicon.ico` 使用 `%BASE_URL%` 进行前缀拼接。
- `public/` 静态公共资源目录，构建时原样复制到输出根目录。包含 `favicon.ico`。
- `src/` 业务源码根目录
  - `assets/` 资源目录（由 Vite 处理并打包）
    - `img/` 图片资源（通过静态 `import` 引用，自动哈希与路径解析）
    - `fonts/` 字体资源
    - `styles/` 全局样式与 Tailwind 配置入口
  - `components/` 通用组件（如导航、页脚、登录对话框、合作伙伴展示等）
  - `pages/` 路由页面（首页/Home、产品/Products、关于/About、法律/Legal、合作/Cooperation 等）
  - `layouts/` 布局组件（默认布局）
  - `router/` 路由定义
  - `stores/` Pinia 状态管理（如主题、UI、认证）
  - `api/` 请求封装与类型定义（`axios`、`http.ts` 等）
  - `plugins/` 指令与插件注册
  - `utils/` 工具函数（加密、校验、地图等）
  - `env.d.ts` TypeScript 环境类型声明
- `scripts/` 部署与上传脚本
  - `deploy.mjs` SFTP 部署到服务器（支持交互选择目标）
  - `oss-upload.mjs` 上传构建产物到阿里云 OSS（支持 test/prod 前缀与仅上传 `assets/`）
  - `oss.config.example.json` OSS 配置示例
- `vite.config.ts` 构建与开发配置（`base` 前缀、代理、打包目录、静态资源命名规则等）

## 环境与配置

- `.env`、`.env.test`、`.env.production`：针对不同模式的环境变量
  - `VITE_API_BASE_URL` 接口基础地址（用于 `server.proxy` 与请求）
  - `VITE_PUBLIC_BASE_URL` 站点公共前缀（用于 Vite `base`），例如：
    - 测试环境：`https://<bucket>.<region>.aliyuncs.com/website/website-test/`
    - 生产环境：`https://<bucket>.<region>.aliyuncs.com/website/website-prod/`
- 若未显式设置 `VITE_PUBLIC_BASE_URL`，`vite.config.ts` 会尝试读取 `scripts/oss.config.json` 自动推导 `base` 前缀。
- `scripts/oss.config.json`（需自行创建，参考示例）：
  - `bucket`、`region`、`testPrefix`、`prodPrefix` 等字段

## 开发与调试

- 安装依赖
  - `pnpm i`
- 启动开发环境（默认本地）
  - `pnpm dev`
- 启动测试模式开发（带 test 环境变量）
  - `pnpm dev:test`
- 类型检查 / 代码质量
  - `pnpm type-check`
  - `pnpm lint` / `pnpm lint:fix`
  - `pnpm format`

## 构建与本地预览

- 测试构建
  - `pnpm build:test`
  - 输出目录：`dist-test/`
  - 预览：`pnpm preview:test`（默认端口 `5176`，路径带 `website/website-test/` 前缀）
- 生产构建
  - `pnpm build:prod`
  - 输出目录：`dist/`
  - 预览：`pnpm preview:prod`（端口 `5177`，路径带生产前缀）

## 上传到 OSS（阿里云）

- 准备配置 `scripts/oss.config.json`（参考 `oss.config.example.json`），包含：
  - `bucket`、`region`（如 `oss-cn-guangzhou`）、`testPrefix`、`prodPrefix`、密钥等
- 仅上传 `assets/`（同时自动包含根部 `favicon.ico`）到测试环境：
  - `pnpm deploy:oss:test`（相当于 `pnpm build:test && pnpm upload:oss:test`）
- 仅上传 `assets/`（同时自动包含根部 `favicon.ico`）到生产环境：
  - `pnpm deploy:oss:prod`
- 如需上传完整构建目录（包含 HTML 与所有文件），可移除 `--only-assets` 或自定义脚本。

## 服务器 SFTP 部署（可选）

- 创建 `scripts/deploy.config.json`，配置多个目标：`name`、`host`、`username`、`privateKeyPath`/`password`、`localDir`、`remoteDir`。
- 执行：
  - 交互选择目标并上传：`pnpm deploy`
  - 清空远端目录后再上传：`pnpm deploy:clean`

## 重点与易错点

- 资源引用方式
  - 模板/脚本中使用静态 `import` 引入 `src/assets/img/*`，避免手写 URL（Vite 自动处理路径、哈希与缓存）。
  - CSS/SCSS 中使用相对路径或 `url()` 让 Vite 处理。
  - 不要硬编码 `/src/assets/...` 或 `/website/.../src/...` 路径，这些在生产构建中不会存在。
- `base` 前缀与路径
  - `index.html` 的 `favicon` 已使用 `%BASE_URL%favicon.ico`，确保不同环境前缀下路径正确。
  - 预览地址为 `http://localhost:<port>/<base-prefix>/`，本地看到的 URL 前缀与真实部署一致。
- OSS 上传粒度
  - 默认命令使用 `--only-assets`，脚本已自动补充 `favicon.ico` 进入上传列表。
  - 如需上传额外根文件（如 `robots.txt`），请扩展脚本或改用完整上传。
- 环境变量与配置文件
  - 请根据环境更新 `.env.test` 与 `.env.production` 的 `VITE_PUBLIC_BASE_URL` 与 `VITE_API_BASE_URL`。
  - 若使用 `oss-upload.mjs` 推导前缀，确保 `scripts/oss.config.json` 存在且内容正确。

## 常见修改入口

- 修改导航/页脚：`src/components/AppNav.vue`、`src/components/AppFooter.vue`
- 首页内容块：`src/pages/Home/components/*`
- 合作/产品页面：`src/pages/Cooperation/*`、`src/pages/Products/*`
- 全局主题与 UI：`src/stores/ui.ts`、`src/stores/theme.ts`
- 接口地址与代理：`.env*` 中 `VITE_API_BASE_URL` 与 `vite.config.ts` 的 `server.proxy`

## Changelog

- 2025-11-08
  - 全面迁移图片为静态 `import`（`src/assets/img`），移除 `img()` 助手。
  - 删除 `src/utils/assets.ts` 与冗余 `public/assets/img`，统一由 Vite 管理资源。
  - 修复 `src/pages/Home/components/Recruitment.vue` 的图片引用与作用域错误。
  - 更新 `index.html` 中 `favicon` 路径为 `%BASE_URL%favicon.ico`，兼容前缀部署。
  - 优化 `scripts/oss-upload.mjs`：`--only-assets` 上传时自动包含构建根的 `favicon.ico`。
  - 验证 `pnpm preview:test` 预览无报错，图片与路径在带前缀场景下正确加载。

如需进一步自动化部署或添加更多根文件白名单（例如 `robots.txt`、`sitemap.xml`），可以在 `scripts/oss-upload.mjs` 中补充相应逻辑或提供指令需求。
