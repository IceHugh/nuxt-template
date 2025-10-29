<template>
  <ClientOnly>
    <Button
      variant="ghost"
      class="relative h-10 w-10 p-0"
      :aria-label="$t('accessibility.toggleTheme')"
      @click="toggleTheme"
    >
      <Icon
        name="solar:sun-2-line-duotone"
        class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icon
        name="solar:moon-stars-line-duotone"
        class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">{{ $t('accessibility.toggleTheme') }}</span>
    </Button>
    <template #fallback>
      <Button
        variant="ghost"
        class="relative h-10 w-10 p-0"
        :aria-label="$t('accessibility.toggleTheme')"
        @click="toggleTheme"
      >
        <Icon
          name="solar:moon-stars-line-duotone"
          class="h-5 w-5"
        />
        <span class="sr-only">{{ $t('accessibility.toggleTheme') }}</span>
      </Button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";

// 使用 @nuxtjs/color-mode 提供的 useColorMode
const colorMode = useColorMode();

// 切换主题函数
const toggleTheme = () => {
  // 在浅色和深色之间切换
  const newTheme = colorMode.preference === 'dark' ? 'light' : 'dark';
  colorMode.preference = newTheme;
};
</script>