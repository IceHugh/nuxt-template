[根目录](../CLAUDE.md) > **components**

# Components 全局组件模块文档

## 模块职责

`components/` 目录包含全局可复用的 Vue 组件，这些组件在整个应用中都可以自动导入和使用。主要提供 shadcn-vue 组件库的封装和通用 UI 组件。

## 目录结构

```
components/
├── CLAUDE.md           # 模块文档
└── ui/                 # shadcn-vue 组件库（实际组件位于 app/components/ui/）
```

## 入口与启动

### 组件自动导入
- Nuxt 4 自动扫描 `components/` 目录
- 支持嵌套目录结构
- 组件按文件名自动注册

## 对外接口

### 全局组件
当前项目采用了 Nuxt 4 的 `app/components/` 结构，全局 UI 组件实际位于：
- `app/components/ui/` - shadcn-vue 组件库
- `app/components/common/` - 通用组件

### shadcn-vue 组件系统
完整的现代 UI 组件库，包括：

#### 基础组件
- **Button** - 多种样式的按钮组件
  - 变体：default, secondary, outline, ghost, destructive
  - 尺寸：sm, md, lg
  - 支持图标、加载状态

- **Input** - 表单输入组件
  - 支持文本、密码、邮箱等类型
  - 验证状态显示
  - 前缀后缀图标

- **Label** - 表单标签组件
- **Textarea** - 多行文本输入

#### 布局组件
- **Card** - 卡片容器
  - CardHeader, CardTitle, CardDescription
  - CardContent, CardFooter

- **Separator** - 分隔线
- **Skeleton** - 骨架屏加载

#### 导航组件
- **Breadcrumb** - 面包屑导航
- **Tabs** - 选项卡切换

#### 反馈组件
- **Alert** - 警告提示
  - AlertTitle, AlertDescription
  - 多种类型：default, destructive, warning

- **Badge** - 标签徽章
- **Progress** - 进度条

#### 交互组件
- **Dialog** - 对话框
  - DialogTrigger, DialogContent
  - DialogHeader, DialogTitle, DialogDescription
  - DialogFooter, DialogClose

- **Collapsible** - 折叠面板
- **Tooltip** - 工具提示

#### 数据展示
- **Table** - 数据表格
  - TableHeader, TableBody, TableFooter
  - TableRow, TableCell, TableHead, TableCaption

- **Select** - 下拉选择器
- **Avatar** - 头像组件

## 关键依赖与配置

### 核心依赖
- **reka-ui**: 无样式 Vue 组件基础库
- **class-variance-authority**: 组件变体管理
- **clsx** & **tailwind-merge**: CSS 类名工具
- **lucide-vue-next**: 图标库

### 配置文件
- `nuxt.config.ts` - shadcn-nuxt 配置
- `components.json` - 组件库配置

### 样式系统
- **Tailwind CSS V4**: 原子化 CSS
- **CSS 变量**: 主题系统
- **深色模式**: 自动主题切换

## 组件特性

### 设计系统
- **一致性**: 统一的设计语言
- **可访问性**: ARIA 属性和键盘导航
- **响应式**: 移动端优先设计
- **主题化**: 支持自定义主题

### 开发体验
- **TypeScript**: 完整类型支持
- **自动导入**: 无需手动注册
- **Tree Shaking**: 按需打包
- **文档完善**: 使用示例和 API 文档

### 性能优化
- **轻量级**: 基于现代 Web 标准
- **CSS-in-JS**: 避免样式冲突
- **懒加载**: 支持组件懒加载
- **SSR 友好**: 服务端渲染支持

## 使用示例

### 基础使用
```vue
<template>
  <div>
    <Button @click="handleClick">
      点击我
    </Button>

    <Card>
      <CardHeader>
        <CardTitle>标题</CardTitle>
        <CardDescription>描述</CardDescription>
      </CardHeader>
      <CardContent>
        内容区域
      </CardContent>
    </Card>
  </div>
</template>
```

### 表单示例
```vue
<template>
  <form @submit="handleSubmit">
    <div class="space-y-4">
      <div>
        <Label for="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="输入邮箱"
        />
      </div>

      <div>
        <Label for="message">消息</Label>
        <Textarea
          id="message"
          v-model="form.message"
          placeholder="输入消息"
        />
      </div>

      <Button type="submit" :disabled="loading">
        {{ loading ? '提交中...' : '提交' }}
      </Button>
    </div>
  </form>
</template>
```

### 对话框示例
```vue
<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">打开对话框</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>确认操作</DialogTitle>
        <DialogDescription>
          此操作不可撤销，请确认是否继续？
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="close">取消</Button>
        <Button variant="destructive" @click="confirm">确认</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

## 自定义和扩展

### 主题定制
通过 CSS 变量自定义主题：
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

### 组件变体
使用 class-variance-authority 定义组件变体：
```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 新增组件
1. 使用 shadcn-vue CLI：
```bash
npx shadcn-vue@latest add [component]
```

2. 手动创建组件：
- 在 `app/components/ui/` 创建组件文件
- 导入必要的 reka-ui 组件
- 应用样式变体和 CSS 类
- 添加 TypeScript 类型定义

## 常见问题 (FAQ)

### Q: 如何自定义组件样式？
A: 通过 CSS 变量覆盖默认主题，或者使用 `class` 属性添加自定义样式。

### Q: 组件不支持某个功能怎么办？
A: 可以基于现有组件进行扩展，或者直接使用 reka-ui 的基础组件进行自定义。

### Q: 如何处理国际化？
A: 使用 `@nuxtjs/i18n` 的 `$t()` 函数在组件中翻译文本内容。

### Q: 组件的 TypeScript 类型在哪里？
A: 类型定义自动从组件文件生成，也可以手动创建 `.d.ts` 文件。

### Q: 如何优化组件打包体积？
A: Nuxt 4 支持自动 tree shaking，只打包实际使用的组件。

## 相关文件清单

### 配置文件
- `components.json` - 组件库配置
- `nuxt.config.ts` - Nuxt 配置中的 shadcn 部分

### 组件目录
- `app/components/ui/` - shadcn-vue 组件（主要位置）
- `app/components/common/` - 通用组件

### 样式文件
- `app/assets/css/tailwind.css` - 全局样式
- 组件内部样式定义

## 模块特点

1. **现代化设计**: 基于 Tailwind CSS 的现代设计系统
2. **完全类型化**: TypeScript 支持，提供完整的类型提示
3. **高度可定制**: 通过 CSS 变量和配置选项轻松定制
4. **可访问性**: 符合 WCAG 标准，支持键盘导航和屏幕阅读器
5. **响应式**: 移动端优先的自适应设计
6. **性能优化**: Tree shaking 支持，按需加载
7. **开发友好**: 丰富的文档、示例和开发工具支持