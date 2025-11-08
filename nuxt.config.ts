// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/web3-theme.css'],

  // SSR 配置
  ssr: true,

  // 实验性功能
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  // 路由配置
  routeRules: {
    // 静态资源缓存
    '/': { prerender: true },
    '/api/**': { isr: 60 },
    '/assets/**': { isr: 2592000 }, // 30天
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

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

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
})
