# Nuxt 4 模板项目技术栈集成计划

## 项目概述

创建一个 Nuxt 4 模板项目，集成现代化技术栈，用于开发其他项目的基础。

## 技术栈要求

- UI库: shadcn-vue + Tailwind CSS V4 + @iconify/vue + @iconify-json/radix-icons
- 主题: @nuxtjs/color-mode (支持 dark)
- API: tRPC (使用 trpc-nuxt 模块)
- 多语言: @nuxtjs/i18n
- 数据库: Drizzle + Cloudflare D1 (本地开发支持)
- 工具库: date-fns + radash + vueuse
- 代码规范: biome 替换 eslint
- 部署: 支持 SSR + Cloudflare Pages 部署

## 额外要求

- 包管理器: bun
- 首页作为示例页面，包含所有技术栈测试
- TypeScript 非严格模式
- CI/CD 配置
- 每个技术栈接入搜索最新官方文档
- 每步完成后提交 git

## 执行计划

采用渐进式集成策略，按依赖关系逐步集成每个技术栈。
