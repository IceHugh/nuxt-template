<template>
  <div class="flex items-center space-x-2">
    <span class="text-sm text-muted-foreground">{{ $t('common.language') }}:</span>
    <Button
      variant="outline"
      size="sm"
      @click="toggleLocale"
      :aria-label="`切换到${nextLocale.name}`"
    >
      <Icon :name="currentLocale.code === 'zh' ? 'lucide:globe' : 'lucide:translate'" class="h-4 w-4 mr-2" />
      {{ currentLocale.name }}
    </Button>
  </div>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp()

const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find((loc: any) => loc.code === locale.value) || locales.value[0]
})

const nextLocale = computed(() => {
  const currentIndex = locales.value.findIndex((loc: any) => loc.code === locale.value)
  const nextIndex = (currentIndex + 1) % locales.value.length
  return locales.value[nextIndex] || locales.value[0]
})

const toggleLocale = () => {
  setLocale(nextLocale.value.code)
}
</script>