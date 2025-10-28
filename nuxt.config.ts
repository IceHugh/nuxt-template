// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    dataValue: "theme",
    classSuffix: "",
  },

  i18n: {
    locales: [
      {
        code: "zh",
        language: "zh-CN",
        name: "简体中文",
        files: ["i18n/locales/zh.json"],
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        files: ["i18n/locales/en.json"],
      },
    ],
    defaultLocale: "zh",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: "root",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
