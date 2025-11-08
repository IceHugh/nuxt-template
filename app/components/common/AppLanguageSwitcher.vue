<script setup lang="ts">
// 语言切换功能
const { locale, setLocale } = useI18n()



const toggleLanguage = () => {
  const nextLocale = locale.value === 'zh' ? 'en' : 'zh'
  setLocale(nextLocale)
}
</script>

<template>
  <UButton
    variant="ghost"
    size="sm"
    square
    :aria-label="`切换到 ${locale === 'zh' ? 'English' : '中文'}`"
    @click="toggleLanguage"
  >
    <UIcon name="i-heroicons-language" class="w-5 h-5" />
    <span class="ml-1 text-xs">{{ locale.toUpperCase() }}</span>
  </UButton>
</template>