# Nuxt 4 全栈应用模板 🚀

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.0+-00DC82?logo=nuxt.js&labelColor=020420)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?logo=typescript&labelColor=020420)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?logo=tailwindcss&labelColor=020420)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11.0+-2596BE?logo=trpc&labelColor=020420)](https://trpc.io/)

一个现代化的 **Nuxt 4 全栈应用模板**，集成了当前最佳的技术栈和开发实践。为快速启动新项目提供坚实的基础，包含完整的前端 UI、后端 API、数据库集成、国际化支持和自动化部署流程。

## ✨ 核心特性

### 🎯 现代化技术栈

- **前端框架**: Nuxt 4 + Vue 3 + TypeScript
- **UI 组件**: Nuxt UI + Tailwind CSS 3 + 深色模式
- **状态管理**: Pinia
- **类型安全 API**: tRPC + Zod
- **数据库**: Drizzle ORM + Cloudflare D1 (生产) + SQLite (开发)
- **国际化**: @nuxtjs/i18n (中英双语)
- **工具库**: date-fns + radash + VueUse (SSR 兼容版本)
- **代码质量**: ESLint + Prettier (格式化 + 检查)

### 🏗️ 架构特点

- **全栈 TypeScript**: 从前端到后端的完整类型安全
- **SSR/SSG 支持**: 服务端渲染和静态生成灵活切换
- **响应式设计**: 移动端优先的自适应布局
- **模块化结构**: 清晰的代码组织和分层架构
- **开发体验**: 热重载、自动导入、类型提示

## 🎨 组件库

### 组件概览

项目提供完整的 Web3 风格组件库，所有组件都支持：

- ✅ **TypeScript**: 完整的类型定义
- ✅ **深色模式**: 内置主题切换支持
- ✅ **响应式**: 移动端优先设计
- ✅ **无障碍**: ARIA 属性和键盘导航
- ✅ **自动导入**: 零配置使用组件

### 组件分类

#### 🎨 通用组件 (Common)

位于 `app/components/common/`，提供基础 UI 功能。

- **AppThemeToggle** - 主题切换器，SSR 兼容
- **AppLanguageSwitcher** - 语言切换器，支持中英文
- **Empty** - 空状态展示，支持操作按钮
- **CopyButton** - 复制按钮，一键复制到剪贴板

#### 🏗️ 布局组件 (Layout)

位于 `app/components/layout/`，提供页面布局和导航。

- **AppLogo** - 应用 Logo，支持不同尺寸
- **AppNavigation** - 导航菜单，多种显示样式
- **AppSidebar** - 侧边栏，左右布局支持
- **AppUserInfo** - 用户信息展示，支持操作按钮
- **AppContainer** - 响应式容器组件

#### ⚡ 技术演示组件 (Tech)

位于 `app/components/tech/`，技术栈展示和状态监控。

- **TechStackCard** - 技术栈展示卡片，Web3 风格
- **TRPCTestCard** - tRPC API 连接测试
- **DrizzleTestCard** - 数据库连接测试
- **I18nTestCard** - 国际化功能测试
- **SystemStatusCard** - 系统状态展示

#### 🔄 加载组件 (Loading)

位于 `app/components/loading/`，加载状态展示。

- **Loading** - 基础加载组件，多种尺寸
- **LoadingWrapper** - 加载包装器，内容保护

### 快速使用

所有组件都支持自动导入，直接在模板中使用：

```vue
<template>
  <div>
    <!-- 主题切换 -->
    <AppThemeToggle />

    <!-- 应用 Logo -->
    <AppLogo size="md" />

    <!-- 技术栈展示 -->
    <TechStackCard
      title="Nuxt 4"
      description="现代 Vue.js 全栈框架"
      icon="i-simple-icons-nuxtdotjs"
      status="online"
    />

    <!-- 复制按钮 -->
    <CopyButton text="Hello, Web3 Hub!" success-message="已复制到剪贴板" variant="outline" />

    <!-- 空状态 -->
    <Empty
      title="暂无数据"
      description="点击刷新按钮重试"
      :show-action="true"
      action-label="刷新"
    />
  </div>
</template>
```

### 组件演示

访问 `/components` 页面查看完整的组件库演示和文档，包含：

- 🎯 实时组件预览
- 📝 详细使用说明
- 🎨 代码示例
- 🔧 Props 和事件文档

### 开发规范

- **命名约定**: PascalCase 组件名
- **Props 定义**: TypeScript 接口 + 默认值
- **事件处理**: 类型安全的事件定义
- **样式规范**: Tailwind CSS + 深色模式
- **性能优化**: 懒加载和代码分割

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm/yarn
- Git

### 安装依赖

```bash
# 克隆项目
git clone <your-repo-url>
cd nuxt-app

# 安装依赖
pnpm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 应用将在 http://localhost:3000 启动
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 本地预览
pnpm preview
```

### 数据库操作

```bash
# 生成迁移文件
pnpm db:generate

# 执行迁移
pnpm db:migrate

# 数据库可视化
pnpm db:studio

# 重置数据库
pnpm db:reset
```

## 📁 项目结构

```
nuxt-app/
├── app/                     # Nuxt 4 核心应用目录
│   ├── components/          # 应用级组件
│   │   ├── common/         # 通用组件
│   │   ├── layout/         # 布局组件
│   │   ├── loading/        # 加载组件
│   │   └── tech/           # 技术演示组件
│   ├── composables/        # 组合式函数
│   ├── pages/              # 页面组件
│   ├── layouts/            # 布局模板
│   ├── utils/              # 工具函数
│   └── assets/             # 静态资源
├── server/                 # 服务端代码
│   ├── api/                # 传统 API 路由
│   ├── trpc/               # tRPC 配置和路由
│   ├── lib/                # 服务端工具库
│   └── scripts/            # 数据库脚本
├── components/             # 全局组件
├── i18n/                   # 国际化配置
│   └── locales/            # 语言文件
├── migrations/             # 数据库迁移文件
└── 配置文件
    ├── nuxt.config.ts      # Nuxt 配置
    ├── drizzle.config.ts   # Drizzle ORM 配置
    ├── eslint.config.js    # ESLint 配置
    └── wrangler.toml       # Cloudflare 配置
```

## 🌐 部署

### Cloudflare Pages (推荐)

```bash
# 构建用于 Cloudflare Pages
pnpm build:cf

# 部署到 Cloudflare Pages
# 或通过 GitHub Actions 自动部署
```

### 其他平台

项目支持部署到任何支持 Node.js 的平台：

- Vercel
- Netlify
- Railway
- DigitalOcean App Platform

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint + Prettier 进行代码质量管控：

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化代码
pnpm format
```

### 新增页面

在 `app/pages/` 创建 `.vue` 文件，路由会自动生成：

```vue
<!-- app/pages/about.vue -->
<script setup>
definePageMeta({
  title: '关于我们',
})
</script>

<template>
  <div>
    <h1>关于我们</h1>
  </div>
</template>
```

### 新增 API

#### tRPC API (推荐)

1. 在 `server/lib/schema.ts` 定义数据模型
2. 在 `server/trpc/router.ts` 添加路由
3. 在 `server/trpc/routes/` 实现逻辑

```typescript
// server/trpc/router.ts
export const appRouter = t.router({
  getUsers: t.procedure.query(async ({ ctx }) => {
    return await db.select().from(users)
  }),
})
```

#### 传统 API

```typescript
// server/api/users.get.ts
export default defineEventHandler(async event => {
  const users = await db.select().from(users)
  return users
})
```

### 国际化

支持中英双语，在 `i18n/locales/` 目录管理翻译：

```json
// i18n/locales/zh.json
{
  "common": {
    "hello": "你好",
    "welcome": "欢迎"
  }
}
```

在组件中使用：

```vue
<template>
  <div>{{ $t('common.welcome') }}</div>
</template>
```

## 🧪 测试

项目包含完整的技术栈测试：

- **tRPC API 测试**: 验证类型安全的 API 通信
- **数据库连接测试**: 确保本地和生产环境连接正常
- **国际化测试**: 验证多语言切换功能
- **UI 组件测试**: 检查响应式设计和主题切换

访问应用主页的"技术栈测试"部分查看实时测试结果。

## 📚 相关文档

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [部署指南](./DEPLOYMENT.md)
- [Drizzle 配置](./DRIZZLE_SETUP.md)
- [布局优化指南](./LAYOUT_GUIDE.md)
- [OpenSpec 规范](./AGENTS.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Made with ❤️ using Nuxt 4**
