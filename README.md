# 🚀 Nuxt 4 Template Project

一个现代化的 Nuxt 4 模板项目，集成了最新的技术栈和最佳实践，适合快速启动新的 Web 应用项目。

## ✨ 特性

- 🎨 **现代化 UI**：Tailwind CSS V4 + shadcn-vue + 深色模式
- 🌐 **国际化**：中英文双语支持
- 🔧 **类型安全**：TypeScript + tRPC
- 📱 **响应式**：移动端、平板端、桌面端适配
- 🛠️ **工具库**：VueUse、date-fns、radash
- 📦 **代码质量**：Biome 格式化和检查
- 🚀 **自动部署**：Cloudflare Pages + GitHub Actions

## 🏗️ 技术栈

### 前端框架
- **Nuxt 4** - Vue.js 元框架
- **Vue 3** - 响应式框架
- **TypeScript** - 类型安全

### UI 组件库
- **Tailwind CSS V4** - 原子化 CSS 框架
- **shadcn-vue** - Vue 3 组件库
- **@iconify/vue** - 图标系统
- **@nuxtjs/color-mode** - 深色模式

### 开发工具
- **Biome** - 代码格式化和检查
- **@vueuse/nuxt** - Vue 组合式函数
- **date-fns** - 日期处理库
- **radash** - 函数式编程工具库

### API 和后端
- **tRPC** - 类型安全的 API
- **Nitro** - 服务端渲染引擎
- **Drizzle ORM** - 数据库 ORM
- **Cloudflare D1** - SQLite 数据库

### 国际化
- **@nuxtjs/i18n** - 多语言支持

### 部署
- **Cloudflare Pages** - 静态网站托管
- **GitHub Actions** - CI/CD 自动化
- **Wrangler CLI** - Cloudflare 开发工具

## 🚀 快速开始

### 环境要求

- Node.js 20+
- Bun 或 npm/yarn
- Git

### 安装和运行

```bash
# 克隆项目
git clone <repository-url>
cd nuxt-template

# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build

# 预览构建结果
bun run preview
```

## 📁 项目结构

```
nuxt-template/
├── .github/workflows/          # GitHub Actions 工作流
├── app/                       # Nuxt 应用目录
│   ├── app.vue               # 根组件
│   ├── components/           # Vue 组件
│   │   ├── APITest.vue
│   │   ├── LanguageSwitcher.vue
│   │   ├── ThemeToggle.vue
│   │   ├── UtilityTest.vue
│   │   └── ui/               # shadcn-vue 组件
│   ├── composables/          # 组合式函数
│   ├── lib/                  # 应用工具库
│   ├── pages/                # 页面组件
│   └── utils/                # 工具函数
├── components/               # 全局组件
├── i18n/locales/             # 国际化文件
│   ├── zh.json              # 中文
│   └── en.json              # 英文
├── server/                   # 服务端代码
│   ├── api/                  # API 路由
│   │   ├── health.get.ts    # 健康检查
│   │   ├── users/           # 用户 API
│   │   └── trpc/            # tRPC API 路由
│   ├── lib/                  # 服务端工具库
│   │   ├── db.ts           # 数据库连接
│   │   └── schema.ts       # 数据库架构
│   ├── scripts/              # 数据库脚本
│   ├── trpc/                 # tRPC 配置
│   │   └── router.ts        # tRPC 路由配置
│   └── trpc/                 # tRPC 路由定义
│       └── routes/          # API 路由定义
├── assets/                   # 静态资源
│   └── css/
│       └── tailwind.css   # Tailwind CSS
├── public/                   # 公共文件
├── content/                  # 内容文件
├── migrations/               # 数据库迁移文件
├── modules/                  # Nuxt 模块
├── plan/                     # 项目规划文档
├── shared/                   # 共享代码
├── DEPLOYMENT.md            # 部署指南
├── README.md                # 项目说明
├── wrangler.toml            # Cloudflare 配置
├── wrangler.toml.example    # Cloudflare 配置模板
├── drizzle.config.ts        # Drizzle 配置
├── biome.json               # Biome 配置
├── nuxt.config.ts           # Nuxt 配置
├── package.json             # 项目依赖
└── tsconfig.json            # TypeScript 配置
```

## 🎯 功能展示

### UI 组件测试
- 各种按钮样式（默认、次要、轮廓、幽灵、危险）
- 输入框和表单组件
- 卡片布局组件

### tRPC API 测试
- 健康检查 API
- 个性化问候 API
- 用户信息 API

### 数据库支持
- **Drizzle ORM**：类型安全的数据库操作
- **Cloudflare D1**：生产环境 SQLite 数据库
- **本地开发**：SQLite 文件数据库
- **自动迁移**：数据库架构管理

### 工具库演示
- **VueUse**：窗口尺寸、鼠标位置、时间格式、开关切换
- **date-fns**：日期格式化、相对时间、日期计算
- **radash**：数组操作、对象选择、字符串转换、数字限制
- **综合测试**：实时计数器

### 响应式设计
- 移动端布局（1列）
- 平板端布局（2列）
- 桌面端布局（4列）

### 国际化支持
- 中英文语言切换
- 完整的多语言界面
- 浏览器语言检测

## 🔧 开发脚本

```bash
# 开发
bun run dev              # 启动开发服务器
bun run build            # 构建生产版本
bun run preview          # 预览构建结果

# 代码质量
bun run typecheck        # TypeScript 类型检查
bun run biome:check      # Biome 代码检查
bun run biome:fix         # 自动修复代码格式
bun run format           # 格式化代码
bun run lint             # 代码检查
bun run lint:fix         # 自动修复 lint 问题

# 数据库
bun run db:generate      # 生成数据库迁移文件
bun run db:migrate       # 应用数据库迁移
bun run db:studio        # 打开 Drizzle Studio
bun run db:push          # 推送数据库架构到 D1
```

## 🚀 部署

### 🗄️ 数据库配置

项目集成了 Cloudflare D1 数据库，支持本地开发和生产环境：

- **本地开发**：使用 SQLite 文件数据库 (`./data/app.db`)
- **生产环境**：自动切换到 Cloudflare D1 数据库

详细数据库配置和迁移步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md#-d1-数据库配置)。

### 自动部署

项目配置了 GitHub Actions，推送到 `main` 分支会自动部署到 Cloudflare Pages。

#### GitHub Secrets 配置

在 GitHub 仓库设置中添加以下 Secrets：

- `CLOUDFLARE_API_TOKEN`：Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID
- `CLOUDFLARE_DATABASE_ID`：D1 数据库 ID

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。

### 环境变量

在 Cloudflare Pages 中设置：

```
NODE_VERSION=20
NITRO_PRESET=cloudflare-pages
```

## 📝 配置说明

### Nuxt 配置 (nuxt.config.ts)

- 集成各种模块
- 配置国际化
- 设置 Tailwind CSS

### Drizzle 配置 (drizzle.config.ts)

- 数据库连接配置
- 支持 SQLite 和 D1 数据库
- 自动生成迁移文件

### Wrangler 配置 (wrangler.toml)

- Cloudflare Pages 部署配置
- D1 数据库绑定
- 环境变量设置
- 多环境支持（preview、production）

### Biome 配置 (biome.json)

- 代码格式化规则
- 代码检查规则
- 支持多种文件类型

### TypeScript 配置 (tsconfig.json)

- 严格模式关闭（可根据需要开启）
- 路径别名配置
- Vue 支持

## 🎨 自定义

### 添加新组件

1. 在 `app/components/` 目录下创建组件
2. 在 `app/app.vue` 中导入和使用
3. 添加对应的翻译到 `i18n/locales/` 文件

### 添加新 API

1. 在 `server/trpc/router.ts` 中定义新的路由
2. 在 `components/APITest.vue` 中添加测试组件
3. 更新翻译文件

### 添加新工具库

1. 使用 `bun add <package>` 安装依赖
2. 在 `components/UtilityTest.vue` 中添加演示
3. 更新 package.json 脚本

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题或建议，请创建 GitHub Issue。
