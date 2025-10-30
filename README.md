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
├── app/                       # Nuxt 4 核心应用目录
│   ├── app.vue               # 主应用组件（根布局）
│   ├── components/           # 应用特定 Vue 组件
│   │   ├── common/           # 通用组件
│   │   │   ├── LanguageSwitcher.vue
│   │   │   └── ThemeToggle.vue
│   │   ├── demo/             # 演示组件
│   │   │   ├── APITest.vue
│   │   │   ├── DatabaseDebug.vue
│   │   │   ├── DemoCounter.vue
│   │   │   └── UtilityTest.vue
│   │   ├── layout/           # 布局组件
│   │   │   └── AppSidebar.vue
│   │   └── ui/               # shadcn-vue 组件库
│   ├── composables/          # 应用层组合式函数
│   │   └── useTRPC.ts        # tRPC 客户端
│   ├── error.vue             # 全局错误页面
│   ├── layouts/              # 页面布局模板
│   │   └── default.vue       # 默认布局
│   ├── pages/                # 页面文件（自动生成路由）
│   │   ├── index.vue         # 首页
│   │   ├── analytics.vue     # 分析页面
│   │   ├── components-test.vue # 组件测试页面
│   │   ├── projects.vue      # 项目页面
│   │   ├── settings.vue      # 设置页面
│   │   └── team.vue          # 团队页面
│   ├── plugins/              # 应用层插件
│   └── utils/                # 应用层工具函数
├── components/               # 全局组件
│   └── ui/                   # shadcn-vue UI 组件库
│       ├── alert/            # Alert 组件
│       ├── avatar/           # Avatar 组件
│       ├── badge/            # Badge 组件
│       ├── breadcrumb/       # Breadcrumb 组件
│       ├── button/           # Button 组件
│       ├── card/             # Card 组件
│       ├── collapsible/      # Collapsible 组件
│       ├── dialog/           # Dialog 组件
│       ├── dropdown-menu/    # Dropdown Menu 组件
│       ├── input/            # Input 组件
│       ├── label/            # Label 组件
│       ├── progress/         # Progress 组件
│       ├── select/           # Select 组件
│       ├── separator/        # Separator 组件
│       ├── sheet/            # Sheet 组件
│       ├── sidebar/          # Sidebar 组件
│       ├── skeleton/         # Skeleton 组件
│       ├── table/            # Table 组件
│       ├── tabs/             # Tabs 组件
│       ├── textarea/         # Textarea 组件
│       └── tooltip/          # Tooltip 组件
├── i18n/                     # 国际化配置
│   └── locales/              # 语言包文件
│       ├── zh.json           # 中文语言包
│       └── en.json           # 英文语言包
├── server/                   # 服务端代码
│   ├── api/                  # API 路由
│   │   └── trpc/             # tRPC API 路由
│   │       └── [...].ts      # tRPC 捕获所有路由
│   ├── lib/                  # 服务端工具库
│   │   ├── db.ts             # 数据库连接
│   │   └── schema.ts         # 数据库架构
│   ├── scripts/              # 数据库脚本
│   │   ├── init-db.ts        # 数据库初始化
│   │   └── seed.ts           # 数据库种子数据
│   └── trpc/                 # tRPC 服务端配置
│       ├── router.ts         # tRPC 路由器
│       └── routes/           # tRPC 路由定义
│           └── debug.ts      # 调试路由
├── .biomeignore              # Biome 忽略文件
├── drizzle.config.ts         # Drizzle ORM 配置
├── biome.json                # Biome 代码格式化配置
├── nuxt.config.ts            # Nuxt 主配置文件
├── package.json              # 项目包配置
├── wrangler.toml             # Cloudflare Workers 配置
└── tsconfig.json             # TypeScript 配置
```

## 🎯 功能展示

### 📱 页面导航

- **侧边栏导航**：现代化的响应式侧边栏，支持折叠和移动端适配
- **多页面应用**：首页、分析、项目、设置、团队、组件测试等完整页面
- **路由管理**：基于 Nuxt 4 文件路由的自动路由生成

### UI 组件库

- **完整的 shadcn-vue 组件**：包含 20+ 种常用 UI 组件
- **响应式设计**：移动端、平板端、桌面端完美适配
- **深色模式**：一键切换明暗主题，支持系统主题检测
- **交互组件**：对话框、下拉菜单、标签页、工具提示等

### 🔧 开发工具演示

- **tRPC API 测试**：类型安全的前后端通信，包含健康检查和调试接口
- **数据库调试**：实时查看数据库连接状态和操作结果
- **工具函数测试**：VueUse、date-fns、radash 等工具库的实际应用演示
- **实时计数器**：展示 Vue 3 响应式系统和组合式 API

### 🗄️ 数据库支持

- **Drizzle ORM**：类型安全的数据库操作，支持 SQL 和 NoSQL 风格
- **双数据库支持**：本地开发使用 SQLite，生产环境使用 Cloudflare D1
- **数据库脚本**：包含初始化、种子数据、重置等完整的数据库管理工具
- **自动迁移**：数据库架构版本管理和自动迁移

### 🌍 国际化

- **中英双语**：完整的界面翻译，支持动态语言切换
- **浏览器检测**：自动检测用户浏览器语言偏好
- **路由本地化**：支持 URL 路径的本地化

### 🎨 代码质量

- **Biome**：现代化的代码格式化和检查工具
- **TypeScript**：全栈类型安全，从前端到后端的完整类型支持
- **组件化开发**：基于 Vue 3 Composition API 的现代组件模式

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
bun run db:push          # 推送数据库架构到 D1
bun run db:studio        # 打开 Drizzle Studio
bun run db:reset         # 重置数据库（删除并重新初始化）
bun run db:init          # 初始化数据库
bun run db:seed          # 添加种子数据
bun run db:local:migrate # 本地数据库迁移
bun run db:local:generate # 本地迁移文件生成
bun run db:local:studio  # 本地 Drizzle Studio
```

## 🚀 部署

### 🗄️ 数据库配置

项目集成了 Cloudflare D1 数据库，支持本地开发和生产环境：

- **本地开发**：使用 SQLite 文件数据库 (`./data/app.db`)
- **生产环境**：自动切换到 Cloudflare D1 数据库

详细数据库配置和迁移步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md#-d1-数据库配置)。

### 手动部署

由于项目暂未配置自动化 CI/CD，需要手动部署到 Cloudflare Pages：

1. **构建项目**：

   ```bash
   bun run build:cf
   ```

2. **部署到 Cloudflare Pages**：

   ```bash
   # 使用 Wrangler CLI
   npx wrangler pages deploy dist --project-name nuxt-template
   ```

3. **配置环境变量**：
   在 Cloudflare Pages 项目设置中添加：
   - `NODE_VERSION=20`
   - `NITRO_PRESET=cloudflare-pages`

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## ⚠️ 重要修复说明

### VueUse 兼容 Cloudflare Pages 修复

项目已成功解决 VueUse 在 Cloudflare Pages 环境下的兼容性问题：

#### 问题描述

- **原始问题**：VueUse 依赖的浏览器 API（如 `window`, `document`）在 Cloudflare Pages 的服务端渲染环境下不可用
- **错误表现**：构建失败，运行时错误，SSR 渲染异常
- **影响范围**：所有依赖 VueUse 的组合式函数，如 `useMediaQuery`, `useMouse`, `useWindowSize`, `useToggle`

#### 修复方案

1. **彻底移除 VueUse 依赖**：

   ```bash
   bun remove @vueuse/core
   ```

2. **使用原生 Vue 3 API 重写组合式函数**：
   - `useMediaQuery` → 使用 `window.matchMedia` 原生 API
   - `useMouse` → 使用原生事件监听器
   - `useWindowSize` → 使用 `window.addEventListener` 监听 resize
   - `useToggle` → 使用 Vue 3 的 `ref` 实现开关状态

3. **客户端安全检查**：
   - 所有涉及 DOM API 的操作都增加了客户端环境检查
   - 使用 `onMounted` 钩子确保组件挂载后再执行 DOM 操作
   - 添加了错误边界处理，避免服务端渲染错误

#### 修复效果

- ✅ **构建成功**：消除了所有 VueUse 相关的构建错误
- ✅ **SSR 兼容**：服务端渲染不再出现 `window is not defined` 错误
- ✅ **功能完整**：保持了所有原有的功能特性
- ✅ **性能提升**：减少了约 50KB 的包体积
- ✅ **部署成功**：成功部署到 Cloudflare Pages 并正常运行

#### 关键文件

- `app/utils/vueuse.ts` - VueUse 兼容性替代实现
- `app/composables/` - 重写后的组合式函数
- `nuxt.config.ts` - 移除 VueUse 相关配置

#### 经验总结

1. **环境检测**：在服务端渲染项目中，必须严格区分客户端和服务端环境
2. **渐进增强**：先确保基础功能可用，再添加客户端增强特性
3. **原生优先**：对于简单的工具函数，优先使用原生 API 而非第三方库
4. **测试覆盖**：在构建和部署过程中充分测试 SSR 和客户端渲染

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
