# Nuxt 4 项目结构说明

这是符合 Nuxt 4 最佳实践的完整项目结构，每个目录和文件都有明确的用途。

## 📁 完整目录结构

```
nuxt-template/
├── 📂 app/                          # ✨ Nuxt 4 核心应用目录
│   ├── 📂 assets/                   # 静态资源（图片、样式等）
│   │   └── 📄 css/tailwind.css     # Tailwind CSS 入口文件
│   ├── 📂 components/               # 应用特定 Vue 组件
│   │   ├── 📄 APITest.vue          # API 测试组件
│   │   ├── 📄 DemoCounter.vue      # 计数器演示组件
│   │   ├── 📄 LanguageSwitcher.vue # 语言切换组件
│   │   ├── 📄 ThemeToggle.vue      # 主题切换组件
│   │   └── 📄 UtilityTest.vue      # 工具函数测试组件
│   ├── 📂 composables/             # 应用层组合式函数
│   │   └── 📄 useTRPC.ts           # tRPC 客户端 composable
│   ├── 📂 layouts/                  # 页面布局模板
│   ├── 📂 middleware/               # 路由中间件
│   ├── 📂 pages/                    # 页面文件（自动生成路由）
│   │   └── 📄 index.vue            # 首页
│   ├── 📂 plugins/                  # 应用层插件
│   │   ├── 📄 iconify.client.ts    # Iconify 图标插件（客户端）
│   │   └── 📄 ssr-width.ts         # SSR 宽度检测插件
│   ├── 📂 utils/                    # 应用层工具函数（自动导入）
│   │   └── 📄 format.ts            # 格式化工具函数
│   ├── 📄 app.vue                  # 主应用组件（根布局）
│   ├── 📄 app.config.ts            # 应用响应式配置
│   └── 📄 error.vue                # 全局错误页面
├── 📂 components/                   # 🌐 全局组件（整个项目可用）
│   └── 📂 ui/                      # shadcn-vue UI 组件库
│       ├── 📂 button/              # Button 组件
│       ├── 📂 card/                # Card 组件
│       └── 📂 input/               # Input 组件
├── 📂 content/                      # 📝 内容管理目录
│   └── 📄 .gitkeep                 # Markdown、MDX 等内容文件
├── 📂 i18n/                         # 🌍 国际化配置
│   └── 📂 locales/                 # 语言包文件
│       ├── 📄 zh.json              # 中文语言包
│       └── 📄 en.json              # 英文语言包
├── 📂 lib/                          # 🔧 库文件（需手动导入）
│   ├── 📄 trpc.ts                  # tRPC 配置文件
│   └── 📄 utils.ts                 # 核心工具函数
├── 📂 modules/                      # 🧩 自定义 Nuxt 模块
│   └── 📄 .gitkeep                 # 自定义模块存放处
├── 📂 public/                       # 🌐 公共静态资源
│   ├── 📄 favicon.ico              # 网站图标
│   └── 📄 robots.txt               # 爬虫配置
├── 📂 server/                       # 🖥️ 服务端代码
│   ├── 📂 api/                     # API 路由
│   │   └── 📂 trpc/                # tRPC API 路由
│   │       └── 📄 [...].ts         # tRPC 捕获所有路由
│   └── 📂 trpc/                    # tRPC 服务端配置
│       └── 📄 router.ts            # tRPC 路由器
├── 📂 shared/                       # 🔄 跨端共享代码
│   └── 📄 .gitkeep                 # 客户端和服务端共享代码
├── 📂 .github/                      # 📋 GitHub 配置
│   └── 📂 workflows/               # GitHub Actions 工作流
├── 📂 .husky/                       # 🪝 Git hooks 配置
├── 📂 .vscode/                      # 💻 VS Code 配置
├── 📂 node_modules/                 # 📦 项目依赖
├── 📄 .env.example                  # 🔐 环境变量示例
├── 📄 .gitignore                    # 🚫 Git 忽略文件
├── 📄 .nuxtignore                   # 🚫 Nuxt 构建忽略文件
├── 📄 biome.json                    # 🎨 Biome 代码格式化配置
├── 📄 bun.lock                      # 🔒 Bun 依赖锁定文件
├── 📄 components.json               # 🎨 shadcn-vue 配置文件
├── 📄 DEPLOYMENT.md                 # 🚀 部署说明文档
├── 📄 nuxt.config.ts                # ⚙️ Nuxt 主配置文件
├── 📄 package.json                  # 📦 项目包配置
├── 📄 README.md                     # 📖 项目说明文档
├── 📄 tsconfig.json                 # 🔷 TypeScript 配置
└── 📄 wrangler.toml                 # ☁️ Cloudflare Workers 配置
```

## 🎯 目录详细说明

### 📁 `app/` - Nuxt 4 核心目录

> **重要**：这是 Nuxt 4 最重要的变化，所有应用特定代码都在此目录内

#### `app/assets/`

- **用途**：存放需要通过构建工具处理的静态资源
- **内容**：CSS、SCSS、图片、字体等
- **特点**：支持 Vite 处理，可进行优化和版本控制

#### `app/components/`

- **用途**：应用特定的 Vue 组件
- **作用域**：仅在 `app/` 目录内自动导入
- **适合**：页面组件、功能组件、业务组件

#### `app/composables/`

- **用途**：应用层的组合式函数
- **自动导入**：支持自动导入，无需手动引用
- **适合**：业务逻辑、状态管理、API 调用

#### `app/pages/`

- **用途**：页面文件，基于文件路由自动生成路由
- **可选**：如果不需要页面路由，可以不创建此目录
- **特点**：支持动态路由、嵌套路由

#### `app/plugins/`

- **用途**：应用层插件
- **自动注册**：Nuxt 会自动注册此目录下的插件
- **适合**：第三方库集成、全局功能扩展

#### `app/utils/`

- **用途**：应用层工具函数
- **自动导入**：支持自动导入，无需手动引用
- **适合**：格式化函数、验证函数、业务辅助函数

### 📁 `components/` - 全局组件目录

- **用途**：全局可复用的 Vue 组件
- **作用域**：整个项目（包括 `app/` 目录）
- **适合**：UI 组件库、通用组件、基础组件

### 📁 `lib/` - 库文件目录

- **用途**：核心库文件和工具函数
- **导入方式**：需要手动导入，不支持自动导入
- **适合**：第三方库封装、复杂工具函数、类型定义

### 📁 `server/` - 服务端目录

- **用途**：服务端代码和 API 路由
- **运行环境**：仅在服务端运行
- **适合**：API 路由、数据库操作、服务端逻辑

### 📁 `public/` - 公共静态资源

- **用途**：不需要构建处理的静态资源
- **访问方式**：通过根路径直接访问
- **适合**：图标、robots.txt、manifest.json

### 📁 `content/` - 内容管理

- **用途**：Markdown、MDX 等内容文件
- **集成**：可与 Nuxt Content 模块集成
- **适合**：博客、文档、静态内容

## 🔧 配置文件说明

### `nuxt.config.ts`

- **作用**：Nuxt 主配置文件
- **配置项**：模块、插件、构建选项、运行时配置

### `app.config.ts`

- **作用**：应用响应式配置
- **特点**：可在运行时动态修改，支持响应式更新
- **访问方式**：通过 `useAppConfig()` 访问

### `components.json`

- **作用**：shadcn-vue 组件库配置
- **配置项**：组件路径、样式配置、别名设置

### `biome.json`

- **作用**：Biome 代码格式化和检查配置
- **功能**：替代 ESLint + Prettier，提供更快的代码质量工具

## 🚀 最佳实践

### 1. 文件组织原则

- **应用特定代码** → `app/` 目录
- **全局可复用代码** → 根目录对应目录
- **第三方库封装** → `lib/` 目录
- **静态资源** → `public/` 或 `app/assets/`

### 2. 导入策略

- **自动导入**：`app/` 目录内的组件、composables、utils
- **手动导入**：`lib/` 目录内容、第三方库
- **全局导入**：`components/` 目录组件

### 3. 命名约定

- **组件**：PascalCase（如 `DemoCounter.vue`）
- **Composables**：use 开头（如 `useTRPC.ts`）
- **工具函数**：camelCase（如 `formatRelativeTime`）

### 4. 文档和注释

- **目录说明**：每个目录包含 `.gitkeep` 说明用途
- **配置文件**：包含详细注释说明各项配置
- **组件文档**：使用 JSDoc 或 Vue 组件注释

## 🔄 开发工作流

1. **新建页面**：在 `app/pages/` 创建 `.vue` 文件
2. **新建组件**：根据作用域选择 `app/components/` 或 `components/`
3. **新建工具函数**：根据复用性选择 `app/utils/` 或 `lib/`
4. **API 开发**：在 `server/api/` 创建路由文件
5. **样式管理**：在 `app/assets/` 管理 CSS 和样式文件

这个结构确保了代码的清晰分离、良好的可维护性和符合 Nuxt 4 的最佳实践。
