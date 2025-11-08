[根目录](../../CLAUDE.md) > **components**

# Components 模块文档

## 变更记录 (Changelog)

### 2025-11-08T10:31:42+0000

- **初始化文档**: 创建 components 模块文档
- **结构分析**: 分析全局组件目录结构
- **状态记录**: 记录当前目录状态

## 模块职责

`components/` 目录用于存放全局可复用的 Vue 组件。这些组件在整个应用中都可以使用，与 `app/components/` 中的应用级组件相对应。

## 目录结构

```
components/
├── ui/                    # UI 组件库 (预留)
├── CLAUDE.md             # 模块文档
└── [待添加的组件目录...]
```

## 当前状态

### 目录状态

- **状态**: 空目录，准备就绪
- **预期用途**: 全局 UI 组件库
- **计划组件**: shadcn-vue 风格的组件库

### 与应用级组件的区别

| 特性     | `app/components/` | `components/` |
| -------- | ----------------- | ------------- |
| 作用域   | 应用特定          | 全局可复用    |
| 自动导入 | ✅ 支持           | ✅ 支持       |
| 典型用途 | 业务组件          | UI 组件库     |
| 命名空间 | 无                | 无            |

## 预期组件类型

### UI 组件库 (`ui/`)

基于 shadcn-vue 的组件库：

- **基础组件**: Button, Input, Card, Badge
- **表单组件**: Form, Select, Checkbox, Radio
- **导航组件**: Menu, Tabs, Breadcrumb
- **反馈组件**: Dialog, Alert, Toast
- **布局组件**: Container, Grid, Stack
- **数据组件**: Table, Pagination, Calendar

### 设计系统

- **主题系统**: 深色/浅色模式支持
- **设计令牌**: 颜色、字体、间距规范
- **组件变体**: 不同大小、状态的变体
- **无障碍**: ARIA 属性和键盘导航

## 组件开发规范

### 命名约定

- **组件名**: PascalCase (如 `Button.vue`)
- **文件名**: 与组件名一致
- **目录名**: kebab-case (如 `date-picker/`)

### 组件结构

```vue
<template>
  <!-- 组件模板 -->
</template>

<script setup lang="ts">
// 组件逻辑
interface Props {
  // Props 定义
}

interface Emits {
  // Emits 定义
}

// 组件实现
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 属性验证

```typescript
// 使用 TypeScript 接口
interface Props {
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

// 使用 withDefaults 设置默认值
const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
})
```

## 主题系统

### CSS 变量

```css
:root {
  --color-primary: 59 130 246;
  --color-primary-foreground: 255 255 255;
  --radius: 0.5rem;
}

.dark {
  --color-primary: 96 165 250;
  --color-primary-foreground: 15 23 42;
}
```

### Tailwind 配置

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
}
```

## 开发计划

### 第一阶段：基础组件

1. **Button** - 按钮组件
   - 变体：default, primary, secondary, outline, ghost
   - 尺寸：sm, md, lg
   - 状态：loading, disabled

2. **Input** - 输入框组件
   - 类型：text, email, password, number
   - 状态：normal, error, disabled
   - 功能：清空按钮、前缀/后缀

3. **Card** - 卡片组件
   - 结构：header, content, footer
   - 变体：default, elevated, outlined

### 第二阶段：表单组件

1. **Form** - 表单容器
2. **Select** - 下拉选择器
3. **Checkbox** - 复选框
4. **Radio** - 单选框组

### 第三阶段：反馈组件

1. **Dialog** - 对话框
2. **Alert** - 警告提示
3. **Toast** - 消息提示

## 使用方式

### 基本使用

```vue
<template>
  <div>
    <!-- 按钮组件 -->
    <UButton variant="primary" size="md"> 点击我 </UButton>

    <!-- 输入框组件 -->
    <UInput v-model="value" placeholder="请输入内容" />

    <!-- 卡片组件 -->
    <UCard>
      <template #header> 标题 </template>
      内容区域
    </UCard>
  </div>
</template>
```

### 自动导入

所有 `components/` 目录下的组件都会被自动导入，无需手动注册：

```vue
<template>
  <!-- 直接使用，无需 import -->
  <MyComponent />
</template>
```

### 全局注册

如果需要显式注册：

```typescript
// plugins/components.ts
export default defineNuxtPlugin(nuxtApp => {
  // 全局组件注册逻辑
})
```

## 测试策略

### 单元测试

使用 Vitest 进行组件单元测试：

```typescript
// tests/components/Button.test.ts
import { render, screen } from '@testing-library/vue'
import Button from '@/components/ui/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    render(Button, {
      props: {
        variant: 'primary',
      },
    })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### 视觉回归测试

使用 Chromatic 或 Percy 进行视觉测试：

```typescript
// .storybook/stories/Button.stories.ts
export default {
  title: 'UI/Button',
  component: Button,
}

export const Default = {
  args: {
    variant: 'default',
    children: 'Button',
  },
}
```

## 性能优化

### 代码分割

```typescript
// 懒加载大型组件
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
```

### 组件缓存

```vue
<template>
  <KeepAlive>
    <Component :is="currentComponent" />
  </KeepAlive>
</template>
```

## 文档生成

### 组件文档

使用 Storybook 或 VitePress：

````markdown
# Button 组件

按钮组件用于触发操作。

## 使用方法

```vue
<Button>点击我</Button>
```
````

## 属性

| 属性    | 类型   | 默认值    | 说明     |
| ------- | ------ | --------- | -------- |
| variant | string | 'default' | 按钮变体 |
| size    | string | 'md'      | 按钮大小 |

```

## 常见问题 (FAQ)

### Q: 何时使用全局组件 vs 应用组件？

A:
- **全局组件**: 通用 UI 组件，可在多个应用中复用
- **应用组件**: 特定业务逻辑组件，只在当前应用中使用

### Q: 如何处理组件样式冲突？

A:
- 使用 `scoped` CSS
- 采用 CSS Modules
- 使用 CSS-in-JS 方案

### Q: 如何保证组件的无障碍访问？

A:
- 添加适当的 ARIA 属性
- 支持键盘导航
- 提供焦点管理
- 使用语义化 HTML

## 相关文件清单

### 当前文件

- `CLAUDE.md` - 模块文档

### 计划文件

- `ui/Button/index.vue` - 按钮组件
- `ui/Input/index.vue` - 输入框组件
- `ui/Card/index.vue` - 卡片组件
- `ui/index.ts` - 组件导出入口

## 开发建议

1. **渐进式开发**: 从基础组件开始，逐步扩展
2. **设计先行**: 先确定设计系统，再实现组件
3. **测试覆盖**: 为每个组件编写测试用例
4. **文档完善**: 提供详细的使用文档和示例
5. **性能考虑**: 注意组件的渲染性能和包大小

## 模块特点

1. **全局可复用**: 组件可在整个应用中使用
2. **自动导入**: 无需手动注册和导入
3. **类型安全**: 完整的 TypeScript 支持
4. **主题友好**: 支持深色模式和主题定制
5. **无障碍**: 内置无障碍访问支持
6. **测试完备**: 包含单元测试和视觉测试
```
