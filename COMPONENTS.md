# 组件使用文档

## 概览

本项目采用 Nuxt 4 + Vue 3 组件架构，提供完整的 Web3 风格 UI 组件库。所有组件都支持 TypeScript、深色模式、国际化，并遵循现代前端开发最佳实践。

## 组件分类

### 🎨 通用组件 (Common)

位于 `app/components/common/`，提供基础 UI 功能。

#### AppThemeToggle - 主题切换器

**用途**: 在深色和浅色主题之间切换。

```vue
<template>
  <AppThemeToggle />
</template>
```

**特性**:

- ✅ 自动检测系统主题偏好
- ✅ SSR 兼容，避免水合错误
- ✅ 响应式图标切换
- ✅ 无障碍访问支持

**Props**: 无

**事件**: 无

---

#### AppLanguageSwitcher - 语言切换器

**用途**: 在中英文之间切换应用语言。

```vue
<template>
  <AppLanguageSwitcher />
</template>
```

**特性**:

- ✅ 支持中英双语
- ✅ 实时语言切换
- ✅ 保持当前路由状态
- ✅ 响应式设计

**Props**: 无

**事件**: 无

---

#### Empty - 空状态组件

**用途**: 当没有数据时显示友好的空状态。

```vue
<template>
  <Empty
    title="暂无数据"
    description="点击刷新按钮重试"
    icon="i-heroicons-inbox"
    show-action
    action-label="刷新"
  />
</template>
```

**Props**:

- `title?: string` - 空状态标题
- `description?: string` - 描述文本
- `icon?: string` - 图标名称
- `showAction?: boolean` - 是否显示操作按钮
- `actionLabel?: string` - 操作按钮文本

**事件**:

- `@action` - 点击操作按钮时触发

---

#### CopyButton - 复制按钮

**用途**: 复制文本到剪贴板，支持多种样式和状态。

```vue
<template>
  <CopyButton
    text="Hello, Web3 Hub!"
    success-message="已复制到剪贴板"
    variant="outline"
    size="sm"
    color="primary"
  />
</template>
```

**Props**:

- `text: string` - 要复制的内容
- `successMessage?: string` - 成功复制后的提示信息，默认 "已复制到剪贴板"
- `variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'` - 按钮变体，默认 'outline'
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - 按钮大小，默认 'sm'
- `color?: 'primary' | 'neutral' | 'secondary' | 'success' | 'info' | 'warning' | 'error'` - 按钮颜色，默认 'primary'
- `class?: string` - 自定义 CSS 类名
- `disabled?: boolean` - 是否禁用，默认 false

**事件**:

- `@copied` - 复制成功时触发，参数为复制的文本
- `@error` - 复制失败时触发，参数为错误对象

**特性**:

- ✅ 自动兼容现代和传统剪贴板 API
- ✅ SSR 安全，只在客户端执行
- ✅ 加载状态和成功状态反馈
- ✅ 自定义样式和尺寸支持

---

### 🏗️ 布局组件 (Layout)

位于 `app/components/layout/`，提供页面布局和导航功能。

#### AppLogo - 应用 Logo

**用途**: 显示应用标识。

```vue
<template>
  <AppLogo size="md" :show-text="true" />
</template>
```

**Props**:

- `size?: 'sm' | 'md' | 'lg'` - Logo 大小
- `showText?: boolean` - 是否显示文本

**特性**:

- ✅ 响应式尺寸调整
- ✅ Web3 风格设计
- ✅ 主要颜色主题

---

#### AppNavigation - 导航菜单

**用途**: 主要导航菜单。

```vue
<template>
  <AppNavigation
    :items="navigationItems"
    :current-path="currentPath"
    variant="sidebar"
    @navigate="handleNavigation"
  />
</template>
```

**Props**:

- `items: NavigationItem[]` - 导航项数组
- `currentPath?: string` - 当前路径
- `variant?: 'sidebar' | 'topbar' | 'mobile'` - 显示变体

**事件**:

- `@navigate` - 点击导航项时触发

**NavigationItem 类型**:

```typescript
interface NavigationItem {
  label: string
  icon: string
  to?: string
  badge?: string
  active?: boolean
}
```

---

#### AppSidebar - 侧边栏

**用途**: 左侧或右侧边栏布局。

```vue
<template>
  <AppSidebar
    position="left"
    :is-mobile="false"
    :show-user-actions="true"
    :show-trending-topics="true"
    @navigation="handleNavigation"
    @user-action="handleUserAction"
  />
</template>
```

**Props**:

- `position: 'left' | 'right'` - 侧边栏位置
- `currentPath?: string` - 当前路径
- `isMobile?: boolean` - 是否为移动端
- `showUserActions?: boolean` - 是否显示用户操作
- `showTrendingTopics?: boolean` - 是否显示热门话题
- `showSuggestedUsers?: boolean` - 是否显示推荐用户
- `showBottomLinks?: boolean` - 是否显示底部链接
- `showSocialLinks?: boolean` - 是否显示社交链接

**事件**:

- `@navigation` - 导航点击
- `@userAction` - 用户操作
- `@topicSelect` - 话题选择
- `@userFollow` - 用户关注
- `@userProfile` - 查看用户资料

---

#### AppUserInfo - 用户信息

**用途**: 显示用户基本信息和操作。

```vue
<template>
  <AppUserInfo :user="user" :show-actions="true" size="md" @action="handleUserAction" />
</template>
```

**Props**:

- `user: User` - 用户对象
- `showActions?: boolean` - 是否显示操作按钮
- `size?: 'sm' | 'md'` - 显示大小

**User 类型**:

```typescript
interface User {
  name: string
  username: string
  avatar: string
}
```

**事件**:

- `@action` - 用户操作 ('settings' | 'profile' | 'logout')

---

### ⚡ 技术演示组件 (Tech)

位于 `app/components/tech/`，用于技术栈展示和测试。

#### TechStackCard - 技术栈卡片

**用途**: 展示单个技术栈的状态和信息。

```vue
<template>
  <TechStackCard
    title="tRPC"
    description="类型安全的 API 通信"
    icon="i-simple-icons-trpc"
    status="online"
    badge="正常"
    action-label="测试"
    @action="handleTest"
  />
</template>
```

**Props**:

- `title: string` - 技术栈名称
- `description: string` - 描述信息
- `icon: string` - 图标名称
- `status: 'online' | 'offline' | 'warning' | 'loading'` - 状态
- `badge?: string` - 状态徽章文本
- `actionLabel?: string` - 操作按钮文本
- `actionDisabled?: boolean` - 是否禁用操作

**事件**:

- `@action` - 点击操作按钮

**特性**:

- ✅ Web3 风格设计
- ✅ 状态指示器
- ✅ 响应式布局
- ✅ 渐变效果

---

#### TRPCTestCard - tRPC 测试卡片

**用途**: 测试 tRPC API 连接和功能。

```vue
<template>
  <TRPCTestCard />
</template>
```

**特性**:

- ✅ 自动测试 API 连接
- ✅ 显示测试结果
- ✅ 错误处理和重试
- ✅ 实时状态更新

---

#### DrizzleTestCard - 数据库测试卡片

**用途**: 测试数据库连接和操作。

```vue
<template>
  <DrizzleTestCard />
</template>
```

**特性**:

- ✅ 测试数据库连接
- ✅ 基础 CRUD 操作测试
- ✅ 性能指标显示
- ✅ 错误诊断

---

#### I18nTestCard - 国际化测试卡片

**用途**: 测试多语言功能。

```vue
<template>
  <I18nTestCard />
</template>
```

**特性**:

- ✅ 语言切换测试
- ✅ 翻译验证
- ✅ 路由本地化测试
- ✅ SEO 元数据测试

---

### 🔄 加载组件 (Loading)

位于 `app/components/loading/`，提供加载状态展示。

#### Loading - 基础加载组件

**用途**: 显示加载状态。

```vue
<template>
  <Loading size="md" text="加载中..." :overlay="false" />
</template>
```

**Props**:

- `size?: 'sm' | 'md' | 'lg'` - 加载器大小
- `text?: string` - 加载文本
- `overlay?: boolean` - 是否显示遮罩层

---

#### LoadingWrapper - 加载包装器

**用途**: 包装内容，在加载时显示加载状态。

```vue
<template>
  <LoadingWrapper :loading="isLoading" text="正在获取数据...">
    <div>内容区域</div>
  </LoadingWrapper>
</template>
```

**Props**:

- `loading: boolean` - 是否加载中
- `text?: string` - 加载文本
- `height?: string` - 包装器高度

**Slots**:

- `default` - 内容区域

---

## 组件开发规范

### 命名约定

- **组件名**: PascalCase (如 `AppThemeToggle.vue`)
- **Props 接口**: `Props` (如 `interface Props`)
- **Emit 接口**: `Emits` (如 `interface Emits`)
- **事件处理**: `handle` 前缀 (如 `handleClick`)

### Props 定义

使用 TypeScript 接口定义 Props：

```typescript
interface Props {
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const { title, description = '默认描述', size = 'md', disabled = false } = defineProps<Props>()
```

### 事件定义

使用 TypeScript 接口定义事件：

```typescript
interface Emits {
  click: [event: MouseEvent]
  change: [value: string]
  submit: []
}

const emit = defineEmits<Emits>()
```

### 样式规范

1. **Tailwind CSS 优先**: 使用 Tailwind 类名进行样式设计
2. **响应式设计**: 移动端优先的响应式布局
3. **深色模式**: 所有组件必须支持深色模式
4. **无障碍访问**: 添加适当的 ARIA 属性

### 性能优化

1. **懒加载**: 大型组件使用 `defineAsyncComponent`
2. **计算属性**: 使用 `computed` 缓存计算结果
3. **条件渲染**: 合理使用 `v-if` 和 `v-show`
4. **事件监听**: 及时清理事件监听器

## 自动导入

### 组件自动导入

所有 `app/components/` 和 `components/` 目录下的组件都会被自动导入：

```vue
<template>
  <!-- 无需手动导入，直接使用 -->
  <AppThemeToggle />
  <AppLogo />
  <TechStackCard />
</template>
```

### Composables 自动导入

`app/composables/` 目录下的函数也会被自动导入：

```vue
<script setup>
// 无需手动导入，直接使用
const { user } = useAuth()
const { data } = await useFetch('/api/data')
</script setup>
```

### 工具函数自动导入

`app/utils/` 目录下的函数同样支持自动导入：

```vue
<script setup>
// 无需手动导入，直接使用
const formattedDate = formatDate(new Date())
const isValid = validateEmail(email)
</script setup>
```

## 主题系统

### CSS 变量

项目使用 CSS 变量支持主题切换：

```css
:root {
  --color-primary: 59 130 246;
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
}

.dark {
  --color-primary: 96 165 250;
  --color-background: 15 23 42;
  --color-foreground: 255 255 255;
}
```

### 深色模式

所有组件都支持深色模式，使用 Nuxt Color Mode 模块：

```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- 组件内容 -->
  </div>
</template>
```

## 测试

### 组件测试

使用 Vitest 进行组件测试：

```typescript
// tests/components/AppThemeToggle.test.ts
import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import AppThemeToggle from '@/app/components/common/AppThemeToggle.vue'

describe('AppThemeToggle', () => {
  it('renders correctly', () => {
    render(AppThemeToggle)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    const wrapper = mount(AppThemeToggle)
    await wrapper.find('button').trigger('click')
    // 验证主题切换逻辑
  })
})
```

### 可访问性测试

使用 @testing-library/jest-dom 进行可访问性测试：

```typescript
it('has proper accessibility attributes', () => {
  render(AppThemeToggle)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('aria-label')
  expect(button).toBeEnabled()
})
```

## 故障排除

### 常见问题

**Q: 组件没有自动导入？**

A: 检查组件是否在正确的目录中：

- 应用级组件：`app/components/`
- 全局组件：`components/`

**Q: 样式在深色模式下不正确？**

A: 确保使用正确的 Tailwind 类：

- `bg-white dark:bg-gray-900`
- `text-gray-900 dark:text-white`

**Q: SSR 水合错误？**

A: 使用 `onMounted` 和 `process.client` 检查：

```typescript
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
```

**Q: TypeScript 类型错误？**

A: 确保 Props 和 Emits 接口正确定义：

```typescript
interface Props {
  requiredProp: string
  optionalProp?: number
}

const props = defineProps<Props>()
```

## 贡献指南

### 添加新组件

1. **创建组件文件**: 在合适的目录中创建 `.vue` 文件
2. **定义接口**: 编写 Props 和 Emits TypeScript 接口
3. **实现功能**: 编写组件逻辑和模板
4. **添加样式**: 使用 Tailwind CSS 类名
5. **编写测试**: 创建单元测试文件
6. **更新文档**: 在本文件中添加组件文档

### 代码审查清单

- [ ] TypeScript 类型定义正确
- [ ] Props 有合理的默认值
- [ ] 支持深色模式
- [ ] 响应式设计
- [ ] 无障碍访问支持
- [ ] 性能优化
- [ ] 测试覆盖
- [ ] 文档完善

## 版本历史

### v1.0.0 (当前)

- ✅ 完整的组件库基础架构
- ✅ 通用组件集合
- ✅ 布局组件系统
- ✅ 技术演示组件
- ✅ 加载状态组件
- ✅ TypeScript 支持
- ✅ 深色模式支持
- ✅ 自动导入功能

### 计划功能

- 🔄 更多 UI 组件 (Table, Modal, Form)
- 🔄 Storybook 集成
- 🔄 组件测试覆盖
- 🔄 性能监控
- 🔄 国际化增强

---

_最后更新: 2025-11-08T10:31:42+0000_
