[根目录](../../CLAUDE.md) > **i18n**

# i18n 模块文档

## 变更记录 (Changelog)

### 2025-11-08T10:31:42+0000

- **初始化文档**: 创建 i18n 模块文档
- **国际化配置**: 完成多语言配置分析
- **语言文件**: 识别中英文双语文件结构

## 模块职责

`i18n/` 目录负责应用的国际化和本地化配置，支持中英双语切换，提供完整的多语言解决方案。

## 目录结构

```
i18n/
├── i18n.config.ts         # i18n 配置文件
└── locales/               # 语言文件目录
    ├── zh/                # 中文语言包
    │   ├── index.ts       # 中文主入口
    │   └── modules/       # 中文模块化翻译
    │       └── common.json
    ├── zh.json            # 中文完整翻译
    ├── en/                # 英文语言包
    │   ├── index.ts       # 英文主入口
    │   └── modules/       # 英文模块化翻译
    │       └── common.json
    └── en.json            # 英文完整翻译
```

## 配置文件

### i18n 配置 (`i18n.config.ts`)

```typescript
export default defineI18nConfig(() => ({
  legacy: false, // 使用 Composition API
  fallbackLocale: 'en', // 回退语言
  missingWarn: false, // 关闭缺失翻译警告
  fallbackWarn: false, // 关闭回退警告
}))
```

### Nuxt 配置 (在 `nuxt.config.ts` 中)

```typescript
i18n: {
  locales: [
    {
      code: 'zh',
      language: 'zh-CN',
      name: '简体中文',
      file: 'zh/index.ts',
    },
    {
      code: 'en',
      language: 'en-US',
      name: 'English',
      file: 'en/index.ts',
    },
  ],
  defaultLocale: 'en',
  detectBrowserLanguage: {
    useCookie: true,
    redirectOn: 'root',
  },
},
```

## 语言文件结构

### 完整翻译文件

- `zh.json` - 中文完整翻译文件
- `en.json` - 英文完整翻译文件

### 模块化翻译文件

#### 中文模块 (`locales/zh/`)

- `index.ts` - 中文模块导出入口
- `modules/common.json` - 通用组件翻译

#### 英文模块 (`locales/en/`)

- `index.ts` - 英文模块导出入口
- `modules/common.json` - 通用组件翻译

## 使用方式

### 在组件中使用

```vue
<template>
  <div>
    <!-- 基本翻译 -->
    <h1>{{ $t('common.welcome') }}</h1>

    <!-- 带参数的翻译 -->
    <p>{{ $t('common.greeting', { name: '用户' }) }}</p>

    <!-- 复数形式 -->
    <p>{{ $n(1, 'item') }}</p>
  </div>
</template>

<script setup>
// 在 script 中使用
const { t, locale, setLocale } = useI18n()

// 切换语言
const switchLanguage = (lang: string) => {
  setLocale(lang)
}

// 获取当前语言
console.log(locale.value)
</script>
```

### 在 Composables 中使用

```typescript
// composables/useI18nUtils.ts
export const useI18nUtils = () => {
  const { t, locale } = useI18n()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return {
    formatDate,
    translate: t,
    currentLocale: locale,
  }
}
```

### 在服务端使用

```typescript
// server/api/some-endpoint.ts
export default defineEventHandler(async event => {
  const { t } = useI18n(event)

  return {
    message: t('api.success'),
  }
})
```

## 支持的语言

### 简体中文 (zh)

- **语言代码**: `zh`
- **区域**: `zh-CN`
- **显示名称**: `简体中文`
- **文件位置**: `locales/zh/`

### English (en)

- **语言代码**: `en`
- **区域**: `en-US`
- **显示名称**: `English`
- **文件位置**: `locales/en/`

## 自动语言检测

### 检测策略

1. **Cookie 存储**: 用户选择的语言会保存在 Cookie 中
2. **浏览器语言**: 首次访问时检测浏览器语言偏好
3. **URL 路由**: 支持基于路径的语言切换
4. **回退机制**: 默认回退到英语

### 检测顺序

1. 检查 Cookie 中的语言设置
2. 检查浏览器 `Accept-Language` 头
3. 使用默认语言 (英语)

## SEO 优化

### hreflang 标签

Nuxt i18n 自动生成 `hreflang` 标签，帮助搜索引擎理解多语言页面：

```html
<link rel="alternate" hreflang="zh" href="https://example.com/zh/path" />
<link rel="alternate" hreflang="en" href="https://example.com/en/path" />
<link rel="alternate" hreflang="x-default" href="https://example.com/path" />
```

### URL 结构

支持多种 URL 结构：

- **路径前缀**: `/zh/about`, `/en/about`
- **域名分离**: `zh.example.com`, `en.example.com`
- **混合模式**: 部分页面使用路径前缀

## 翻译管理

### 翻译文件格式

#### JSON 格式 (推荐)

```json
{
  "common": {
    "welcome": "欢迎",
    "login": "登录",
    "register": "注册"
  },
  "nav": {
    "home": "首页",
    "about": "关于",
    "contact": "联系我们"
  }
}
```

#### TypeScript 模块格式

```typescript
// locales/zh/index.ts
import common from './modules/common.json'

export default {
  common,
  // 更多模块...
}
```

### 翻译命名约定

- **嵌套结构**: 使用点号分隔的嵌套键名
- **语义化**: 使用有意义的键名，如 `user.profile.name`
- **一致性**: 保持不同语言间的键名一致
- **模块化**: 按功能模块组织翻译内容

### 最佳实践

1. **键名规范**: 使用有意义的英文字符串作为键名
2. **避免重复**: 提取公共翻译到 `common` 模块
3. **参数化**: 使用参数避免硬编码值
4. **上下文**: 为相同含义不同用处的翻译提供上下文
5. **验证**: 定期检查翻译完整性

## 高级功能

### 复数处理

```json
{
  "items": {
    "zero": "没有项目",
    "one": "1 个项目",
    "other": "{n} 个项目"
  }
}
```

### 日期时间格式化

```vue
<template>
  <div>{{ $d(new Date(), 'short') }}</div>
  <div>{{ $d(new Date(), 'long') }}</div>
</template>
```

### 数字格式化

```vue
<template>
  <div>{{ $n(1000, 'currency') }}</div>
  <div>{{ $n(0.1234, 'percent') }}</div>
</template>
```

### 懒加载翻译

```typescript
// 动态加载翻译
const loadLocale = async (locale: string) => {
  const messages = await import(`~/locales/${locale}.json`)
  setLocaleMessage(locale, messages.default)
}
```

## 常见问题 (FAQ)

### Q: 如何添加新语言？

A: 1. 在 `i18n.config.ts` 中添加语言配置 2. 创建对应的语言文件目录 3. 翻译所有文本内容 4. 更新 Nuxt 配置

### Q: 如何处理 RTL 语言？

A: 1. 在语言配置中设置 `dir: 'rtl'` 2. 添加对应的 CSS 样式 3. 更新组件布局逻辑

### Q: 如何优化翻译加载性能？

A: 1. 使用懒加载减少初始包大小 2. 按需加载语言包 3. 启用翻译缓存

### Q: 如何管理大量翻译内容？

A: 1. 使用模块化组织翻译文件 2. 考虑使用翻译管理平台 3. 建立翻译审核流程

## 相关文件清单

### 核心配置

- `i18n.config.ts` - i18n 主配置
- `nuxt.config.ts` - Nuxt i18n 配置

### 语言文件

- `locales/zh.json` - 中文完整翻译
- `locales/en.json` - 英文完整翻译
- `locales/zh/index.ts` - 中文模块入口
- `locales/en/index.ts` - 英文模块入口
- `locales/zh/modules/common.json` - 中文通用翻译
- `locales/en/modules/common.json` - 英文通用翻译

## 模块特点

1. **零配置**: 开箱即用的 i18n 支持
2. **自动检测**: 智能的语言检测机制
3. **SEO 友好**: 完整的 SEO 优化支持
4. **类型安全**: TypeScript 类型推导
5. **模块化**: 灵活的翻译文件组织
6. **性能优化**: 懒加载和缓存策略
