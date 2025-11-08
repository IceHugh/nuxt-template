<script setup lang="ts">
// 使用 @nuxtjs/color-mode 提供的 useColorMode
const colorMode = useColorMode()

// 切换主题函数
function toggleTheme() {
  // 在浅色和深色之间切换
  const newTheme = colorMode.preference === 'dark' ? 'light' : 'dark'
  colorMode.preference = newTheme
}
</script>

<template>
  <ClientOnly>
    <UButton
      variant="ghost"
      color="neutral"
      square
      size="sm"
      class="relative h-10 w-10 p-0"
      :icon="
        colorMode.preference === 'dark'
          ? 'solar:sun-2-line-duotone'
          : 'solar:moon-stars-line-duotone'
      "
      @click="toggleTheme"
    >
    </UButton>
  </ClientOnly>
</template>
