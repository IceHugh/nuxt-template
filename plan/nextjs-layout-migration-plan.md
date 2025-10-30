# Next.js Layout 到 Nuxt 移植规划

## 已明确的决策

### 技术栈选择

- **目标框架**: Next.js 15 (React 19) → Nuxt 3 (Vue 3)
- **UI 组件库**: shadcn/ui (React) → shadcn-vue (Vue)
- **样式系统**: Tailwind CSS + CSS Variables (保持一致)
- **图标库**: Lucide React → Lucide Vue (通过 @nuxt/icon)
- **国际化**: next-intl → @nuxtjs/i18n
- **主题切换**: next-themes → @nuxtjs/color-mode
- **状态管理**: React hooks → Vue composables

### 架构差异

- **布局系统**: React Layout (文件系统路由) → Nuxt Layout (布局组件)
- **服务端渲染**: React RSC → Vue 3 SSR
- **组件模式**: React Client Components → Vue 3 Composition API

## 整体规划概述

### 项目目标

将目标项目 `/Users/icehugh/workspace/noalone/apps/next-template` 的现代化 sidebar layout 系统完整移植到当前 Nuxt 项目，包括：

1. **侧边栏导航系统**：带有品牌标识、主导航菜单、用户信息和操作按钮
2. **响应式设计**：支持移动端折叠和桌面端固定显示
3. **主题切换功能**：支持亮色/暗色/系统主题
4. **国际化支持**：多语言切换功能
5. **组件化架构**：可复用的布局组件

### 技术栈

**源项目 (Next.js)**:

- React 19 + Next.js 15
- shadcn/ui + Tailwind CSS
- next-intl + next-themes
- tRPC + Lucide React

**目标项目 (Nuxt)**:

- Vue 3 + Nuxt 3
- shadcn-vue + Tailwind CSS
- @nuxtjs/i18n + @nuxtjs/color-mode
- @nuxt/icon (Lucide)

### 主要阶段

1. **阶段 1**: 创建核心布局组件和 Sidebar UI 组件
2. **阶段 2**: 实现导航系统和用户信息组件
3. **阶段 3**: 集成主题切换和国际化功能
4. **阶段 4**: 响应式优化和性能调优
5. **阶段 5**: 测试验证和文档完善

### 详细任务分解

#### 阶段 1：核心布局组件创建

- **任务 1.1**：创建 shadcn-vue Sidebar UI 组件
  - 目标：实现完整的 Sidebar UI 组件集合
  - 输入：目标项目的 sidebar 组件设计
  - 输出：`app/components/ui/sidebar/` 目录下的完整组件
  - 涉及文件：
    - `app/components/ui/sidebar/index.ts`
    - `app/components/ui/sidebar/Sidebar.vue`
    - `app/components/ui/sidebar/SidebarContent.vue`
    - `app/components/ui/sidebar/SidebarFooter.vue`
    - `app/components/ui/sidebar/SidebarHeader.vue`
    - `app/components/ui/sidebar/SidebarInset.vue`
    - `app/components/ui/sidebar/SidebarMenu.vue`
    - `app/components/ui/sidebar/SidebarProvider.vue`
  - 预估工作量：3-4 小时

- **任务 1.2**：创建默认布局组件
  - 目标：实现与 LayoutDefault 对应的 Vue 版本
  - 输入：LayoutDefault.tsx 的功能逻辑
  - 输出：`app/layouts/default.vue`
  - 涉及文件：`app/layouts/default.vue`
  - 预估工作量：1-2 小时

- **任务 1.3**：创建应用侧边栏组件
  - 目标：实现 AppSidebar 的 Vue 版本
  - 输入：AppSidebar.tsx 的设计和功能
  - 输出：`app/components/layouts/AppSidebar.vue`
  - 涉及文件：`app/components/layouts/AppSidebar.vue`
  - 预估工作量：2-3 小时

#### 阶段 2：导航系统实现

- **任务 2.1**：创建主导航菜单组件
  - 目标：实现 NavMain 的 Vue 版本
  - 输入：NavMain.tsx 的菜单逻辑
  - 输出：`app/components/layouts/NavMain.vue`
  - 涉及文件：`app/components/layouts/NavMain.vue`
  - 预估工作量：1-2 小时

- **任务 2.2**：创建用户信息组件
  - 目标：实现 NavUser 的 Vue 版本
  - 输入：NavUser.tsx 的用户界面和交互
  - 输出：`app/components/layouts/NavUser.vue`
  - 涉及文件：`app/components/layouts/NavUser.vue`
  - 预估工作量：2-3 小时

- **任务 2.3**：创建操作按钮组件
  - 目标：实现 ActionSidebar 的 Vue 版本
  - 输入：ActionSidebar.tsx 的布局和功能
  - 输出：`app/components/layouts/ActionSidebar.vue`
  - 涉及文件：`app/components/layouts/ActionSidebar.vue`
  - 预估工作量：1 小时

#### 阶段 3：主题和国际化集成

- **任务 3.1**：优化主题切换组件
  - 目标：升级 ThemeToggle 为 sidebar 兼容版本
  - 输入：现有的 ThemeToggle.vue 和目标项目设计
  - 输出：更新的 `app/components/ThemeToggle.vue`
  - 涉及文件：`app/components/ThemeToggle.vue`
  - 预估工作量：1-2 小时

- **任务 3.2**：优化语言切换组件
  - 目标：升级 LanguageSwitcher 为 sidebar 兼容版本
  - 输入：现有的 LanguageSwitcher.vue 和 ActionSidebar 设计
  - 输出：更新的 `app/components/LanguageSwitcher.vue`
  - 涉及文件：`app/components/LanguageSwitcher.vue`
  - 预估工作量：1-2 小时

- **任务 3.3**：创建 Providers 组件
  - 目标：实现与 React Providers 对应的 Vue 插件系统
  - 输入：Providers.tsx 的功能逻辑
  - 输出：`app/plugins/providers.client.ts`
  - 涉及文件：`app/plugins/providers.client.ts`
  - 预估工作量：1-2 小时

#### 阶段 4：响应式优化

- **任务 4.1**：实现移动端响应式
  - 目标：确保 sidebar 在移动端的正确表现
  - 输入：sidebar 的响应式需求
  - 输出：响应式 CSS 和交互逻辑
  - 涉及文件：相关 CSS 和组件文件
  - 预估工作量：2-3 小时

- **任务 4.2**：性能优化
  - 目标：优化组件渲染和交互性能
  - 输入：现有的性能问题
  - 输出：优化后的组件代码
  - 涉及文件：所有布局相关组件
  - 预估工作量：1-2 小时

#### 阶段 5：测试和文档

- **任务 5.1**：创建测试页面
  - 目标：验证布局系统的完整功能
  - 输入：所有布局组件
  - 输出：测试页面和验证结果
  - 涉及文件：`app/pages/test-layout.vue`
  - 预估工作量：1-2 小时

- **任务 5.2**：完善使用文档
  - 目标：为后续开发提供使用指南
  - 输入：完整的实现方案
  - 输出：`./plan/layout-migration-guide.md`
  - 涉及文件：`./plan/layout-migration-guide.md`
  - 预估工作量：1 小时

## 需要进一步明确的问题

### 问题 1：Sidebar UI 组件实现方式

**推荐方案**：

- 方案 A：直接从 Radix Vue 移植 Sidebar 组件
  - 优点：功能完整，与 shadcn-vue 生态一致
  - 缺点：工作量较大，需要深入理解 Radix Vue API
- 方案 B：使用现有的 Sheet 组件为基础进行定制
  - 优点：开发速度快，利用已有组件
  - 缺点：功能可能不如原生 Sidebar 完整

**等待用户选择**：

```
请选择您偏好的方案，或提供其他建议：
[ ] 方案 A：从 Radix Vue 移植完整 Sidebar 组件
[ ] 方案 B：基于 Sheet 组件定制开发
[ ] 其他方案：***
```

### 问题 2：状态管理策略

**推荐方案**：

- 方案 A：使用 Pinia 进行全局状态管理
  - 优点：适合复杂应用状态，开发工具完善
  - 缺点：增加了项目复杂度
- 方案 B：使用 Vue 3 Composables 进行本地状态管理
  - 优点：轻量级，与 Vue 3 生态完美融合
  - 缺点：复杂状态管理可能不如 Pinia 方便

**等待用户选择**：

```
请选择您偏好的方案，或提供其他建议：
[ ] 方案 A：引入 Pinia 进行全局状态管理
[ ] 方案 B：使用 Vue 3 Composables 管理状态
[ ] 其他方案：***
```

### 问题 3：图标系统实现

**推荐方案**：

- 方案 A：继续使用 @nuxt/icon (Iconify)
  - 优点：图标库丰富，与 Nuxt 集成良好
  - 缺点：可能与 Lucide 图标风格略有差异
- 方案 B：单独引入 lucide-vue-next
  - 优点：与目标项目图标风格完全一致
  - 缺点：增加了依赖，需要额外配置

**等待用户选择**：

```
请选择您偏好的方案，或提供其他建议：
[ ] 方案 A：继续使用 @nuxt/icon (Iconify)
[ ] 方案 B：引入 lucide-vue-next
[ ] 其他方案：***
```

## 用户反馈区域

请在此区域补充您对整体规划的意见和建议：

```
用户补充内容：

---

---

---
```

## 组件映射关系

### 核心布局组件

| Next.js 组件        | Nuxt 组件                               | 状态   |
| ------------------- | --------------------------------------- | ------ |
| `LayoutDefault.tsx` | `app/layouts/default.vue`               | 待创建 |
| `AppSidebar.tsx`    | `app/components/layouts/AppSidebar.vue` | 待创建 |
| `Providers.tsx`     | `app/plugins/providers.client.ts`       | 待创建 |

### 导航组件

| Next.js 组件        | Nuxt 组件                                  | 状态   |
| ------------------- | ------------------------------------------ | ------ |
| `NavMain.tsx`       | `app/components/layouts/NavMain.vue`       | 待创建 |
| `NavUser.tsx`       | `app/components/layouts/NavUser.vue`       | 待创建 |
| `ActionSidebar.tsx` | `app/components/layouts/ActionSidebar.vue` | 待创建 |

### UI 组件

| Next.js 组件           | Nuxt 组件                             | 状态           |
| ---------------------- | ------------------------------------- | -------------- |
| `ThemeSwitcher.tsx`    | `app/components/ThemeToggle.vue`      | 已存在，需升级 |
| `LanguageSwitcher.tsx` | `app/components/LanguageSwitcher.vue` | 已存在，需升级 |

### Sidebar UI 组件集合

| Next.js 组件                | Nuxt 组件                     | 状态           |
| --------------------------- | ----------------------------- | -------------- |
| `@/components/ui/sidebar/*` | `app/components/ui/sidebar/*` | 待创建完整集合 |

## 文件结构对比

### 目标项目 (Next.js)

```
src/
├── app/
│   └── [locale]/
│       └── layout.tsx          # 根布局 (国际化 + Providers)
├── layouts/
│   ├── LayoutDefault.tsx       # 默认布局 (SidebarProvider + SidebarInset)
│   ├── AppSidebar.tsx         # 侧边栏主组件
│   ├── NavMain.tsx            # 主导航菜单
│   ├── NavUser.tsx            # 用户信息菜单
│   └── ActionSidebar.tsx      # 操作按钮区
├── components/
│   ├── providers/
│   │   └── Providers.tsx      # 全局 Provider (主题 + tRPC + Toast)
│   ├── common/
│   │   ├── ThemeSwitcher.tsx  # 主题切换
│   │   └── LanguageSwitcher.tsx # 语言切换
│   └── ui/
│       └── sidebar/           # Sidebar UI 组件集合
```

### 目标结构 (Nuxt)

```
app/
├── app.vue                     # 根布局 (简化版)
├── layouts/
│   └── default.vue            # 默认布局 (SidebarProvider + content)
├── components/
│   ├── layouts/
│   │   ├── AppSidebar.vue     # 侧边栏主组件
│   │   ├── NavMain.vue        # 主导航菜单
│   │   ├── NavUser.vue        # 用户信息菜单
│   │   └── ActionSidebar.vue  # 操作按钮区
│   ├── ThemeToggle.vue        # 主题切换 (升级版)
│   ├── LanguageSwitcher.vue   # 语言切换 (升级版)
│   └── ui/
│       └── sidebar/           # Sidebar UI 组件集合
└── plugins/
    └── providers.client.ts    # 全局插件 (主题等)
```

## 技术实现要点

### 1. Sidebar 核心功能

- **可折叠性**: 支持 `offcanvas` 和 `inset` 模式
- **响应式**: 移动端自动折叠，桌面端固定显示
- **状态管理**: 使用 Vue 3 响应式状态管理折叠状态
- **键盘导航**: 完整的键盘访问性支持

### 2. 主题系统集成

- **CSS 变量**: 使用 Tailwind CSS 的 CSS 变量系统
- **暗色模式**: 支持 light/dark/system 三种模式
- **过渡动画**: 平滑的主题切换动画效果

### 3. 国际化适配

- **路由集成**: 与 @nuxtjs/i18n 路由系统完美集成
- **语言切换**: 支持动态语言切换，保持当前页面状态
- **本地化**: 所有 UI 文本支持多语言

### 4. 性能优化

- **懒加载**: Sidebar 组件按需加载
- **代码分割**: 不同布局模式独立打包
- **缓存策略**: 合理的组件缓存和状态持久化

## 风险评估与缓解

### 高风险项

1. **Sidebar UI 组件复杂性**
   - 风险：Radix Vue API 学习成本高
   - 缓解：分阶段实现，先实现基础功能

2. **状态管理复杂性**
   - 风险：跨组件状态同步问题
   - 缓解：使用 Vue 3 provide/inject 或 Pinia

### 中风险项

1. **响应式兼容性**
   - 风险：移动端交互体验不佳
   - 缓解：充分的移动端测试

2. **主题切换一致性**
   - 风险：与现有主题系统冲突
   - 缓解：渐进式升级，保持向后兼容

### 低风险项

1. **国际化集成**
   - 风险：语言切换逻辑复杂
   - 缓解：复用现有 i18n 配置

## 验收标准

### 功能完整性

- [ ] Sidebar 可正常展开/折叠
- [ ] 主导航菜单功能正常
- [ ] 用户信息下拉菜单正常
- [ ] 主题切换功能正常
- [ ] 语言切换功能正常

### 响应式设计

- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 移动端显示正常
- [ ] 横竖屏切换正常

### 性能指标

- [ ] 首屏加载时间 < 2s
- [ ] 交互响应时间 < 100ms
- [ ] 无内存泄漏
- [ ] 打包体积合理

### 代码质量

- [ ] TypeScript 类型安全
- [ ] Vue 3 最佳实践
- [ ] 代码可维护性
- [ ] 测试覆盖率 > 80%

## 后续优化建议

1. **组件库扩展**: 基于 Sidebar 经验，完善其他 UI 组件
2. **主题系统**: 建立完整的设计系统和主题配置
3. **文档完善**: 建立 Storybook 或类似展示系统
4. **性能监控**: 集成性能监控和错误追踪
5. **自动化测试**: 增加端到端测试和视觉回归测试
