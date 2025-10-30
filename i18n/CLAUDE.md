[根目录](../../CLAUDE.md) > **i18n**

# i18n 国际化模块文档

## 变更记录 (Changelog)

### 2025-10-29 15:38:00

- 修复国际化缺失翻译键问题
  - 添加 `accessibility.toggleLanguage` 翻译键到中英文语言包
  - 解决开发服务器国际化警告
- 更新文档，添加翻译键管理最佳实践

### 2025-10-29 14:46:59

- 初始化 i18n 模块文档
- 完成国际化配置分析
- 识别中英文双语支持结构

## 模块职责

`i18n/` 负责项目的国际化（Internationalization）配置和语言包管理。该模块通过 `@nuxtjs/i18n` 提供完整的多语言支持，包括中英文双语界面、浏览器语言检测、路由级别的语言切换等功能。

## 目录结构

```
i18n/
└── locales/
    ├── i18n/
    │   ├── locales/
    │   │   ├── zh.json      # 中文语言包
    │   │   └── en.json      # 英文语言包
    │   └── ...              # 其他配置文件
    └── ...                  # 其他语言相关文件
```

## 入口与启动

### Nuxt i18n 配置

在 `nuxt.config.ts` 中配置：

```typescript
i18n: {
  locales: [
    {
      code: "zh",
      language: "zh-CN",
      name: "简体中文",
      file: "./i18n/locales/zh.json",
    },
    {
      code: "en",
      language: "en-US",
      name: "English",
      file: "./i18n/locales/en.json",
    },
  ],
  defaultLocale: "zh",
  detectBrowserLanguage: {
    useCookie: true,
    redirectOn: "root",
  },
}
```

## 对外接口

### 语言包结构

#### 中文语言包 (`locales/zh.json`)

```json
{
  "common": {
    "title": "Nuxt 4 模板项目",
    "subtitle": "现代化技术栈集成测试",
    "language": "语言"
  },
  "navigation": {
    "currentMode": "当前模式",
    "system": "系统",
    "light": "亮色",
    "dark": "暗色"
  },
  "sections": {
    "ui": {
      "title": "UI 组件测试",
      "description": "测试 shadcn-vue 基础组件"
    },
    "techStack": {
      "title": "技术栈集成状态",
      "description": "显示各个技术栈的集成进度"
    },
    "api": {
      "title": "tRPC API 测试",
      "description": "测试 tRPC API 的类型安全调用"
    },
    "responsive": {
      "title": "响应式设计测试",
      "description": "测试不同屏幕尺寸下的布局"
    },
    "utilities": {
      "title": "工具库演示",
      "description": "展示各种工具库的使用示例"
    }
  },
  "buttons": {
    "default": "默认按钮",
    "secondary": "次要按钮",
    "outline": "轮廓按钮",
    "ghost": "幽灵按钮",
    "destructive": "危险按钮",
    "submit": "提交",
    "testHealthAPI": "测试健康检查 API",
    "sendGreeting": "发送问候",
    "getUserInfo": "获取用户信息"
  },
  "forms": {
    "namePlaceholder": "请输入姓名",
    "userIdPlaceholder": "请输入用户 ID"
  },
  "api": {
    "health": {
      "title": "健康检查",
      "description": "测试服务端健康状态"
    },
    "greeting": {
      "title": "问候 API",
      "description": "发送个性化问候消息"
    },
    "userInfo": {
      "title": "用户信息",
      "description": "根据 ID 获取用户信息"
    },
    "error": "API 调用失败"
  },
  "techStackItems": {
    "tailwind": "Tailwind CSS V4",
    "shadcn": "shadcn-vue",
    "trpc": "tRPC",
    "drizzle": "Drizzle ORM",
    "typescript": "TypeScript",
    "vueUse": "VueUse",
    "biome": "Biome",
    "pinia": "Pinia",
    "i18n": "i18n 国际化",
    "iconify": "Iconify 图标"
  },
  "responsive": {
    "mobile": "移动端",
    "tablet": "平板端",
    "desktop": "桌面端"
  },
  "utilities": {
    "mouse": {
      "title": "鼠标位置",
      "description": "实时跟踪鼠标位置坐标"
    },
    "window": {
      "title": "窗口尺寸",
      "description": "监听窗口大小变化"
    },
    "media": {
      "title": "媒体查询",
      "description": "响应式断点检测"
    },
    "time": {
      "title": "时间格式化",
      "description": "日期时间格式化展示"
    },
    "toggle": {
      "title": "开关切换",
      "description": "状态切换功能演示"
    },
    "string": {
      "title": "字符串处理",
      "description": "字符串转换和处理"
    },
    "number": {
      "title": "数字处理",
      "description": "数字计算和限制"
    },
    "counter": {
      "title": "实时计数器",
      "description": "综合功能实时演示"
    }
  }
}
```

#### 英文语言包 (`locales/en.json`)

对应的英文翻译，与中文语言包保持相同的键值结构。

### 使用方式

#### 在 Vue 模板中使用

```vue
<template>
  <div>
    <h1>{{ $t('common.title') }}</h1>
    <p>{{ $t('sections.ui.description') }}</p>
    <Button>{{ $t('buttons.default') }}</Button>
  </div>
</template>
```

#### 在 JavaScript 中使用

```javascript
// 在组合式函数中
const { t } = useI18n()
const title = t('common.title')

// 在服务端
const { t } = useI18n()
const message = t('api.error')
```

#### 在 Nuxt 页面中使用

```vue
<script setup>
// 设置页面标题的国际化
definePageMeta({
  title: 'navigation.dashboard',
})
</script>
```

## 关键依赖与配置

### 核心依赖

- **@nuxtjs/i18n**: Nuxt 3/4 国际化解决方案
- **vue-i18n**: Vue.js 国际化核心库

### 配置特性

- **浏览器语言检测**: 自动检测用户首选语言
- **Cookie 存储**: 记住用户的语言选择
- **路由级语言切换**: 支持 URL 路径中的语言代码
- **SEO 优化**: 生成多语言 sitemap 和 meta 标签

### 支持的语言

- **中文 (zh)**: `zh-CN` 简体中文
- **英文 (en)**: `en-US` 美式英语

## 语言切换功能

### 语言切换器组件

位于 `app/components/common/LanguageSwitcher.vue`：

- 提供中英文切换按钮
- 显示当前语言状态
- 实时切换界面语言
- 保存用户选择到 Cookie

### 语言检测策略

1. **URL 路径**: 优先从 URL 获取语言代码
2. **Cookie**: 其次从 Cookie 读取用户选择
3. **浏览器**: 最后使用浏览器 Accept-Language 头
4. **默认**: 回退到配置的默认语言（中文）

### 路由配置

- 支持根路径语言重定向
- 不同语言的独立路由
- 语言间的无缝切换

## 翻译管理

### 翻译键命名规范

- 使用点分隔的层级结构
- 按功能模块分组
- 语义化的键名
- 避免键名冲突

### 翻译文件组织

```json
{
  "模块名": {
    "功能名": {
      "具体项": "翻译内容"
    }
  }
}
```

### 翻译覆盖策略

- 支持运行时翻译更新
- 支持翻译热重载
- 支持翻译文件懒加载

## 最佳实践

### 翻译键设计

1. **层级清晰**: 使用有意义的层级结构
2. **命名一致**: 保持命名风格的一致性
3. **避免硬编码**: 所有文本都应通过翻译系统
4. **上下文相关**: 根据使用场景提供合适的翻译

### 性能优化

1. **按需加载**: 只加载当前语言的翻译文件
2. **缓存策略**: 合理使用浏览器缓存
3. **文件大小**: 控制翻译文件的大小
4. **压缩优化**: 生产环境压缩翻译文件

### 开发工作流

1. **先定义键**: 在添加新文本前先定义翻译键
2. **同步更新**: 同时更新所有语言版本
3. **测试验证**: 测试所有语言的显示效果
4. **文档维护**: 保持翻译文档的更新

## 常见问题 (FAQ)

### Q: 如何添加新的语言支持？

A: 在 `nuxt.config.ts` 中添加新的语言配置，创建对应的语言文件，并添加语言切换选项。

### Q: 如何处理复数形式？

A: 使用 vue-i18n 的复数语法，在翻译文件中定义不同数量的翻译。

### Q: 如何处理动态内容翻译？

A: 使用插值语法，如 `{{ $t('message', { name: userName }) }}`。

### Q: 如何在 API 响应中使用翻译？

A: 在服务端通过 `useI18n()` 获取翻译函数，根据请求语言返回对应翻译。

### Q: 如何处理 RTL（从右到左）语言？

A: 配置 `rtl` 支持并添加对应的 CSS 类和布局调整。

## 相关文件清单

### 配置文件

- `nuxt.config.ts` - i18n 配置部分

### 语言文件

- `i18n/locales/zh.json` - 中文语言包
- `i18n/locales/en.json` - 英文语言包

### 组件文件

- `app/components/common/LanguageSwitcher.vue` - 语言切换组件

### 页面文件

- 所有 `app/pages/` 下的页面都使用国际化

## 使用示例

### 基础翻译

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('sections.ui.title') }}</CardTitle>
      <CardDescription>{{ $t('sections.ui.description') }}</CardDescription>
    </CardHeader>
  </Card>
</template>
```

### 带参数的翻译

```vue
<script setup>
const userName = ref('World')
</script>

<template>
  <div>{{ $t('welcome', { name: userName }) }}</div>
</template>
```

### 动态翻译键

```vue
<script setup>
const section = ref('ui')
</script>

<template>
  <div>{{ $t(`sections.${section}.title`) }}</div>
</template>
```

## 模块特点

1. **完整双语支持**: 中英文界面完全翻译
2. **智能语言检测**: 自动检测和切换用户语言
3. **SEO 友好**: 支持多语言 SEO 优化
4. **类型安全**: TypeScript 类型提示支持
5. **易于扩展**: 支持添加更多语言
6. **用户体验**: 无缝的语言切换体验
7. **开发友好**: 热重载和开发工具支持
