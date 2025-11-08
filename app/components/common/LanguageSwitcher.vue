<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, setLocale } = useI18n()

// 创建下拉菜单项
const menuItems = computed<DropdownMenuItem[][]>(() => {
  return Array.from(locales.value).map((loc: any) => [
    {
      label: loc.name,
      icon: loc.code === 'zh' ? 'i-lucide-globe' : 'i-lucide-type',
      onSelect: () => setLocale(loc.code),
      class: locale.value === loc.code ? 'bg-primary/10 text-primary' : '',
    },
  ])
})
</script>

<template>
  <UDropdownMenu :items="menuItems" :content="{ align: 'end' }" :ui="{ content: 'w-40' }">
    <UButton
      variant="ghost"
      color="neutral"
      square
      size="sm"
      class="relative h-10 w-10 p-0"
      icon="solar:global-line-duotone"
    >
      <span class="sr-only">{{ $t('accessibility.toggleLanguage') }}</span>
    </UButton>
  </UDropdownMenu>
</template>
