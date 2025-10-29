[根目录](../../CLAUDE.md) > **app**

# App 模块文档

## 模块职责

`app/` 目录是 Nuxt 4 的核心应用目录，包含了所有应用特定的前端代码。这个目录的设计遵循 Nuxt 4 的新架构，提供了更清晰的代码组织和自动导入功能。

## 目录结构

```
app/
├── assets/           # 静态资源（CSS、图片等）
├── components/       # 应用级 Vue 组件
├── composables/      # 应用级组合式函数
├── layouts/          # 页面布局模板
├── pages/            # 页面文件（自动路由）
├── plugins/          # 应用层插件
├── utils/            # 应用层工具函数
├── app.vue           # 根应用组件
├── app.config.ts     # 应用响应式配置
└── error.vue         # 全局错误页面
```

## 入口与启动

### 主应用组件 (`app.vue`)
- 作为应用的根组件，提供全局布局结构
- 集成了 `NuxtRouteAnnouncer` 和 `NuxtLoadingIndicator`
- 使用 `NuxtLayout` 和 `NuxtPage` 进行布局和页面渲染

### 应用配置 (`app.config.ts`)
- 提供响应式的应用配置
- 可在运行时通过 `useAppConfig()` 访问
- 支持动态配置更新

## 对外接口

### 页面路由 (`pages/`)
基于文件的路由系统，自动生成应用路由：

| 页面路径 | 文件位置 | 功能描述 |
|---------|----------|----------|
| `/` | `pages/index.vue` | 主仪表盘，展示所有功能集成 |
| `/components-test` | `pages/components-test.vue` | 专门的组件测试页面 |
| `/analytics` | `pages/analytics.vue` | 分析页面示例 |
| `/projects` | `pages/projects.vue` | 项目管理页面示例 |
| `/team` | `pages/team.vue` | 团队管理页面示例 |
| `/settings` | `pages/settings.vue` | 设置页面示例 |

### 应用组件 (`components/`)

#### 演示组件
- `APITest.vue` - tRPC API 测试组件，展示健康检查、问候和用户信息 API
- `DemoCounter.vue` - 计数器演示组件
- `DatabaseDebug.vue` - 数据库调试组件
- `UtilityTest.vue` - 工具函数测试组件

#### UI 组件库 (`components/ui/`)
完整的 shadcn-vue 组件集合：
- **按钮组件**: `button/Button.vue` - 多种样式按钮
- **输入组件**: `input/Input.vue` - 表单输入框
- **卡片组件**: `card/` - 内容展示卡片
- **对话框组件**: `dialog/` - 模态对话框
- **标签组件**: `badge/Badge.vue` - 状态标签
- **进度条**: `progress/Progress.vue` - 进度展示
- **选择器**: `select/` - 下拉选择
- **表格**: `table/` - 数据表格
- **标签页**: `tabs/` - 选项卡切换
- **工具提示**: `tooltip/` - 悬停提示
- **面包屑**: `breadcrumb/` - 导航路径
- **分隔线**: `separator/Separator.vue`
- **骨架屏**: `skeleton/Skeleton.vue`

### 组合式函数 (`composables/`)
- `useTRPC.ts` - tRPC 客户端封装，提供类型安全的 API 调用
- `useMouse.ts` - 鼠标位置跟踪
- `useMediaQuery.ts` - 媒体查询响应式
- `useWindowSize.ts` - 窗口尺寸监听
- `useToggle.ts` - 开关状态管理

### 工具函数 (`utils/`)
- `format.ts` - 格式化工具函数
  - `formatRelativeTime()` - 相对时间格式化
  - `formatFileSize()` - 文件大小格式化
  - `generateId()` - 随机 ID 生成

### 插件 (`plugins/`)
- `ssr-width.ts` - SSR 宽度检测插件

## 关键依赖与配置

### UI 组件依赖
- **shadcn-vue**: UI 组件库，位于 `~/components/ui`
- **Tailwind CSS**: 样式框架，配置文件 `tailwind.config.js`
- **@iconify/vue**: 图标系统
- **@nuxtjs/color-mode**: 深色模式支持

### 状态管理
- **Pinia**: 全局状态管理（通过 `@pinia/nuxt` 集成）
- **VueUse**: 组合式函数工具库

### 国际化
- **@nuxtjs/i18n**: 多语言支持
- 语言文件位于 `~/i18n/locales/`

### API 客户端
- **tRPC**: 类型安全的 API 客户端
- 配置文件 `~/lib/trpc.ts`

## 数据模型

App 模块主要使用通过 tRPC 获取的数据类型：

### API 响应类型
- `HealthResponse` - 健康检查响应
- `GreetingResponse` - 问候 API 响应
- `UserInfoResponse` - 用户信息响应
- `DebugRecord[]` - 调试记录列表

### 表单数据类型
- `GreetingInput` - 问候 API 输入参数
- `UserInfoInput` - 用户信息查询参数

## 测试与质量

### 功能测试
- **UI 组件测试**: 展示各种按钮、输入框、卡片组件
- **API 集成测试**: 测试 tRPC API 的类型安全调用
- **响应式测试**: 验证不同屏幕尺寸下的布局
- **工具库演示**: 展示 VueUse、date-fns、radash 的使用

### 组件测试策略
- 每个演示组件都有独立的测试区域
- 错误处理和加载状态展示
- 实时数据更新和交互反馈

### 代码质量
- 支持 Biome 代码格式化和检查
- TypeScript 严格类型检查
- 自动导入功能减少样板代码

## 常见问题 (FAQ)

### Q: 如何在 app 模块中添加新页面？
A: 在 `app/pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成对应的路由。

### Q: app/components/ 和 components/ 有什么区别？
A: `app/components/` 中的组件仅在 app 目录内自动导入，适合应用特定的组件；`components/` 中的组件是全局的，适合可复用的 UI 组件。

### Q: 如何添加新的组合式函数？
A: 在 `app/composables/` 目录下创建 `use*.ts` 文件，Nuxt 会自动导入，无需手动引用。

### Q: 如何处理国际化？
A: 使用 `$t()` 函数在模板中获取翻译文本，翻译文件位于 `i18n/locales/` 目录。

### Q: 如何调用后端 API？
A: 使用 `useTRPC()` 获取 tRPC 客户端，然后调用相应的 API 方法，如 `trpc.health.query()`。

## 相关文件清单

### 核心文件
- `app/app.vue` - 根应用组件
- `app/error.vue` - 全局错误页面
- `app/app.config.ts` - 应用配置

### 页面文件 (6个)
- `app/pages/index.vue` - 主仪表盘
- `app/pages/components-test.vue` - 组件测试页
- `app/pages/analytics.vue` - 分析页
- `app/pages/projects.vue` - 项目页
- `app/pages/team.vue` - 团队页
- `app/pages/settings.vue` - 设置页

### 组件文件 (60+个)
- `app/components/demo/` - 演示组件 (4个)
- `app/components/ui/` - UI 组件库 (50+个)

### 工具文件
- `app/composables/` - 组合式函数 (5个)
- `app/utils/` - 工具函数 (1个)
- `app/plugins/` - 插件 (1个)

### 样式文件
- `app/assets/css/tailwind.css` - Tailwind CSS 入口

## 模块特点

1. **自动导入**: `app/` 目录内的组件、composables、utils 支持自动导入
2. **类型安全**: 通过 tRPC 实现前后端类型安全的 API 通信
3. **模块化**: 清晰的目录结构和职责分离
4. **国际化**: 完整的多语言支持
5. **响应式**: 移动端优先的自适应设计
6. **现代工具链**: 集成最新的前端开发工具和最佳实践