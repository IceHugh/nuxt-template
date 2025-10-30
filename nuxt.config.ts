// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 启用 pages
  pages: true,

  // 使用本地 VueUse 实现，避免 Cloudflare Pages 兼容性问题

  // 优化构建配置
  build: {
    transpile: ['@vueuse/core'],
  },

  // SSR 配置
  ssr: true,

  // Vue 配置
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-'),
    },
  },

  // 渲染配置
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  // 实验性功能
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  // 路由配置
  routeRules: {
    // 静态资源缓存
    '/api/**': { isr: 60 },
    '/assets/**': { isr: 2592000 }, // 30天
  },

  css: ['~/assets/css/tailwind.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],

  // Icon 配置
  icon: {
    // 图标组件自定义配置
    size: '1em',
    class: 'icon',
    // 自定义图标集合配置
    aliases: {
      // 可以在这里定义图标别名
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    dataValue: 'theme',
    classSuffix: '',
  },

  i18n: {
    locales: [
      {
        code: 'zh',
        language: 'zh-CN',
        name: '简体中文',
        file: 'zh.json',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
    },
    // 在开发环境禁用缺失键警告
    silent: true,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
  },
})
