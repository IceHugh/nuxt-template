# Cloudflare Pages 部署指南

本 Nuxt 4 项目已完整配置 Cloudflare Pages 部署，支持自动 CI/CD 和 D1 数据库集成。

## 🚀 快速部署

### 1. GitHub 仓库设置

确保项目已推送到 GitHub 仓库，然后：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 页面
3. 点击 **Create a project** → **Connect to Git**
4. 选择你的 GitHub 仓库

### 2. Cloudflare Pages 配置

在 Cloudflare Pages 项目设置中：

**构建配置 (Build Settings):**
- **构建命令**: `bun run build:cf`
- **构建输出目录**: `dist`
- **Node.js 版本**: `20.x`

**环境变量 (Environment Variables):**
```
NODE_ENV = production
```

### 3. GitHub Secrets 设置

在 GitHub 仓库设置中添加以下 Secrets：

1. `CLOUDFLARE_API_TOKEN`: 创建具有 Zone:Zone:Read 和 Zone:Page Rules:Edit 权限的 API Token
2. `CLOUDFLARE_ACCOUNT_ID`: 在 Cloudflare Dashboard 的右侧边栏找到

## 📋 项目配置概览

### ✅ 已配置的功能

- **✅ Nuxt 4 兼容性**: 使用 `cloudflare-pages` 预设
- **✅ 自动 CI/CD**: GitHub Actions 工作流
- **✅ D1 数据库**: 完整的数据库绑定和迁移
- **✅ 构建优化**: 自动生成 `_headers`, `_routes.json`, `_redirects`
- **✅ 环境分离**: 预览和生产环境配置

### 📁 关键配置文件

```
├── .github/workflows/deploy.yml    # GitHub Actions 工作流
├── wrangler.toml                   # Cloudflare 配置
├── nuxt.config.ts                  # Nuxt 配置
├── package.json                    # 依赖和脚本
└── dist/                          # 构建输出目录
    ├── _headers                   # HTTP 头部配置
    ├── _routes.json              # 路由配置
    ├── _redirects                # 重定向规则
    ├── _worker.js/               # Cloudflare Workers 代码
    └── _nuxt/                    # 静态资源
```

## 🔧 配置详情

### 1. wrangler.toml

```toml
name = "nuxt-template"
compatibility_date = "2024-10-28"
compatibility_flags = ["nodejs_compat"]

pages_build_output_dir = ".output/public"

# D1 数据库绑定
[[d1_databases]]
binding = "DB"
database_name = "nuxt-template-db"
database_id = "你的数据库ID"
```

### 2. package.json 脚本

```json
{
  "scripts": {
    "build": "nuxt build",
    "build:cf": "NITRO_PRESET=cloudflare-pages nuxt build"
  }
}
```

### 3. GitHub Actions 工作流

- **触发条件**: 推送到 main 分支，或针对 main 分支的 PR
- **构建步骤**: 类型检查 → 代码格式检查 → 构建 → 部署
- **自动部署**: main 分支自动部署到生产环境，PR 部署到预览环境

## 🗄️ D1 数据库设置

### 1. 创建数据库

```bash
# 安装 Wrangler CLI
bun install -g wrangler

# 创建数据库
wrangler d1 create nuxt-template-db

# 更新 wrangler.toml 中的 database_id
```

### 2. 数据库迁移

```bash
# 生成迁移文件
bun run db:generate

# 执行迁移
wrangler d1 migrations apply nuxt-template-db

# 本地开发
wrangler d1 migrations apply nuxt-template-db --local
```

### 3. 数据库绑定

数据库会自动绑定到 Cloudflare Pages 项目，通过以下方式访问：

```typescript
// 在 server/api 路由中
export default defineEventHandler(async (event) => {
  const db = useCloudflareD1Database(event)
  // 使用 db 进行数据库操作
})
```

## 🚀 部署流程

### 自动部署（推荐）

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建成功后自动部署到 Cloudflare Pages
4. 获得 `.pages.dev` 域名访问

### 手动部署

```bash
# 1. 构建项目
bun run build:cf

# 2. 部署到 Cloudflare Pages
npx wrangler pages deploy dist

# 或使用 Wrangler CLI
wrangler pages deploy dist
```

## 🔍 预览和测试

### 本地预览

```bash
# 1. 构建项目
bun run build:cf

# 2. 启动本地预览服务器
npx wrangler pages dev dist
```

### 预览部署

- 每个 PR 都会自动创建预览部署
- 预览链接会自动添加到 PR 页面
- 预览部署在 PR 合并后自动删除

## ⚡ 性能优化

### 已配置的优化

- **静态资源缓存**: `_headers` 文件配置了长期缓存
- **代码分割**: Nuxt 自动进行代码分割
- **图片优化**: 使用 `@nuxt/image` 模块
- **字体优化**: 自动字体优化
- **Gzip 压缩**: Cloudflare 自动启用

### 构建大小

当前构建大小：约 **1.3MB**（gzip 后约 **374KB**）

## 🛠️ 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本是否为 20.x
   - 确保 `wrangler.toml` 配置正确
   - 检查环境变量设置

2. **数据库连接问题**
   - 确认 D1 数据库已创建
   - 检查 `database_id` 是否正确
   - 验证数据库绑定配置

3. **路由问题**
   - 检查 `_routes.json` 配置
   - 确认动态路由在 Nuxt 中正确定义

### 调试命令

```bash
# 本地构建测试
bun run build:cf

# 本地预览
npx wrangler pages dev dist

# 查看 Wrangler 日志
wrangler pages deployment list
```

## 📚 相关文档

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Nuxt 4 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [D1 数据库文档](https://developers.cloudflare.com/d1/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

## 🎉 下一步

部署完成后，你可以：

1. 配置自定义域名
2. 设置 Cloudflare Analytics
3. 配置自定义错误页面
4. 设置 A/B 测试
5. 配置边缘函数