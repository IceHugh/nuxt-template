# 🚀 部署指南

本文档详细说明如何将 Nuxt 4 模板项目部署到 Cloudflare Pages，包括 D1 数据库的完整配置。

## 📋 前置要求

1. **GitHub 仓库**：项目已推送到 GitHub
2. **Cloudflare 账户**：注册 Cloudflare 账户
3. **Cloudflare Pages 项目**：在 Cloudflare 中创建 Pages 项目
4. **Wrangler CLI**：安装 Cloudflare CLI 工具

## 🔧 环境变量配置

在 Cloudflare Pages 中设置以下环境变量：

### 生产环境变量

```
NODE_VERSION=20
NITRO_PRESET=cloudflare-pages
```

### 可选环境变量

```
# 如果需要其他环境变量
NUXT_PUBLIC_API_URL=https://your-api.com
```

## 🗄️ D1 数据库配置

本项目集成了 Cloudflare D1 数据库，支持本地开发和生产环境的数据存储。

### 1. 创建 D1 数据库

```bash
# 安装 Wrangler CLI（如果还没有）
bun add -D wrangler

# 登录 Cloudflare
bunx wrangler auth login

# 创建 D1 数据库
bunx wrangler d1 create nuxt-template-db
```

**重要**：记下创建的数据库 ID，后续配置需要用到。

### 2. 配置 wrangler.toml

参考 `wrangler.toml.example` 文件，填入实际的数据库 ID：

```toml
# 复制模板文件并配置
cp wrangler.toml.example wrangler.toml

# 编辑配置文件，填入实际的数据库 ID
# database_id = "你的实际数据库ID"
```

### 3. 数据库迁移

```bash
# 生成迁移文件
bun run db:generate

# 应用到本地数据库
bunx wrangler d1 migrations apply nuxt-template-db --local

# 应用到远程数据库
bunx wrangler d1 migrations apply nuxt-template-db --remote
```

### 4. 数据库架构

项目包含以下数据表：

- **users**：用户表
- **posts**：文章表
- **categories**：分类表
- **post_categories**：文章分类关联表
- **debug_records**：调试记录表

### 5. 环境自动切换

- **本地开发**：使用 SQLite 文件 (`./data/app.db`)
- **Cloudflare Pages**：自动使用 D1 数据库

## 📦 自动部署 (GitHub Actions)

### 1. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret 名称              | 描述                  | 获取方式                                          |
| ------------------------ | --------------------- | ------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`   | Cloudflare API Token  | Cloudflare Dashboard → My Profile → API Tokens    |
| `CLOUDFLARE_ACCOUNT_ID`  | Cloudflare Account ID | Cloudflare Dashboard → Right sidebar → Account ID |
| `CLOUDFLARE_DATABASE_ID` | D1 数据库 ID          | 运行 `bunx wrangler d1 list` 获取                 |

### 2. 获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → "My Profile" → "API Tokens" → "Create Token"
3. 选择 "Custom token" 模板
4. 配置权限：
   - **Account**: `Cloudflare Pages:Edit`
   - **Zone**: `Zone:Read` (可选)
   - **Zone Resources**: `All zones` 或特定域名
5. 设置 Token 名称和有效期
6. 复制生成的 Token

### 3. 部署流程

部署会自动触发：

- **推送到 main 分支**：自动部署到生产环境
- **创建 Pull Request**：自动创建预览部署
- **代码检查**：
  - TypeScript 类型检查
  - Biome 代码格式检查
  - 构建测试

## 🛠️ 手动部署

### 方法一：Wrangler CLI

```bash
# 安装 Wrangler
bun add -D wrangler

# 登录 Cloudflare
bun wrangler auth login

# 构建项目
bun run build

# 部署到 Cloudflare Pages
bun wrangler pages deploy .output/public --project-name=nuxt-template
```

### 方法二：Cloudflare Pages 控制台

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击 "Create a project" → "Connect to Git"
3. 选择 GitHub 仓库
4. 配置构建设置：
   - **Build command**: `bun run build`
   - **Build output directory**: `.output/public`
   - **Node.js version**: `20`
5. 点击 "Save and Deploy"

## 🔍 部署检查清单

- [ ] GitHub Secrets 已正确配置
- [ ] Cloudflare Pages 项目已创建
- [ ] 环境变量已设置
- [ ] 构建设置正确
- [ ] 部署成功后功能正常

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本是否为 20+
   - 确认所有依赖已正确安装
   - 检查 TypeScript 类型错误

2. **部署后页面空白**
   - 检查控制台错误信息
   - 确认环境变量配置正确
   - 检查 Nitro 预设设置

3. **API 调用失败**
   - 确认 CORS 设置
   - 检查 API URL 环境变量
   - 验证路由配置

### 调试命令

```bash
# 本地构建测试
bun run build

# 本地预览
bun run preview

# 类型检查
bun run typecheck

# 代码检查
bun run biome:check
```

## 📊 监控和分析

### Cloudflare Analytics

访问 Cloudflare Pages Dashboard 查看：

- 页面访问量
- 性能指标
- 错误日志
- 缓存统计

### 性能优化建议

1. **图片优化**：使用 `@nuxt/image` 自动优化
2. **缓存策略**：配置适当的缓存头
3. **代码分割**：Nuxt 自动处理
4. **资源压缩**：Cloudflare 自动压缩

## 🔄 更新部署

每次推送到 `main` 分支都会触发自动部署：

```bash
git add .
git commit -m "feat: 新功能更新"
git push origin main
```

Pull Request 会创建预览部署，供审查使用。

## 📚 相关文档

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Nuxt 4 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
