// 应用配置文件 - 支持响应式配置
export default defineAppConfig({
  // 应用信息
  appName: 'Nuxt 4 Template',
  appVersion: '1.0.0',
  appDescription: '现代化的 Nuxt 4 模板项目',

  // 功能开关
  features: {
    darkMode: true,
    i18n: true,
    analytics: false,
  },

  // 联系信息
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/example/nuxt-template',
  },
})
