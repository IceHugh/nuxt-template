<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-10 w-10 p-0" :aria-label="$t('accessibility.toggleLanguage')">
        <Icon
          name="solar:global-line-duotone"
          class="h-5 w-5"
        />
        <span class="sr-only">{{ $t('accessibility.toggleLanguage') }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="loc in locales"
        :key="loc.code"
        @click="setLocale(loc.code)"
        :class="{ 'bg-accent': locale === loc.code }"
      >
        <span class="mr-2 h-4 w-4 flex items-center justify-center">
          {{ loc.code === 'zh' ? '🌐' : '🔤' }}
        </span>
        <span>{{ loc.name }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>