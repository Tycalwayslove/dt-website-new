我将把构建产物按环境上传到 OSS，并将构建资源引用的 base 指向对应的 OSS 前缀。已经完成以下改动：

核心改动

- 在 vite.config.ts 增加 base ，读取 VITE_PUBLIC_BASE_URL ，使打包后的资源使用绝对 OSS 地址。
- 调整环境配置：
  - .env.test 设置 VITE_PUBLIC_BASE_URL=https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-test/ ，并同步 VITE_OSS_BASE_URL 指向同一前缀。
  - .env.production 设置 VITE_PUBLIC_BASE_URL=https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-prod/ ，并同步 VITE_OSS_BASE_URL 指向同一前缀。
- 新增 scripts/oss-upload.mjs ，用 ali-oss 将 dist-test 或 dist 中的文件上传到 OSS 对应前缀，并设置合理的 Cache-Control 。
- 新增 scripts/oss.config.example.json 示例文件，指导配置 OSS 凭证。
- 在 package.json 增加命令：
  - upload:oss:test / upload:oss:prod ：上传到测试 / 生产前缀
  - deploy:oss:test / deploy:oss:prod ：构建并上传一条龙
    如何配置 OSS 凭证

- 在项目根目录创建 scripts/oss.config.json （已加入 .gitignore ，不会提交），参考示例：
  - scripts/oss.config.example.json
- 配置内容示例：
  - bucket : 你的 OSS Bucket 名
  - region : oss-cn-guangzhou
  - accessKeyId / accessKeySecret : 你的访问密钥
  - testPrefix : website-test/
  - prodPrefix : website-prod/
    构建与上传（命令行）

- 测试环境
  - pnpm build:test 生成 dist-test
  - pnpm upload:oss:test 上传到 https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-test/
  - 或直接 pnpm deploy:oss:test
- 生产环境
  - pnpm build:prod 生成 dist
  - pnpm upload:oss:prod 上传到 https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-prod/
  - 或直接 pnpm deploy:oss:prod
- 可选：支持清空目标前缀再上传（避免旧文件残留）
  - node scripts/oss-upload.mjs --env=test --clean
  - node scripts/oss-upload.mjs --env=prod --clean
    验证方式

- 上传完成后，直接访问：
  - 测试： https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-test/index.html
  - 生产： https://awu-file.oss-cn-guangzhou.aliyuncs.com/website-prod/index.html
- 如你的 OSS 已开启静态网站托管或绑定了自定义域名/CDN，请用对应域名访问。打包后的脚本、样式等资源路径将自动使用 VITE_PUBLIC_BASE_URL 的绝对地址。
  注意事项

- 资源缓存策略：
  - .js / .css ： Cache-Control: public, max-age=31536000, immutable
  - 图片： Cache-Control: public, max-age=604800
  - 其他： Cache-Control: public, max-age=86400
- 所有通过 img() 的图片地址也已随环境切换，指向 website-test/ 或 website-prod/ ，保证一致性。
- 如果你需要将开发环境也上传到 OSS，可在 .env 增加 VITE_PUBLIC_BASE_URL 并执行对应上传脚本。
  接下来请将你的 scripts/oss.config.json 凭证发我或自行放置到项目中，我可以直接为你执行测试/生产的构建与上传，并帮你在浏览器里验证页面是否正常加载。
