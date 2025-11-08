<script setup lang="ts">
// 主题切换功能
const colorMode = useColorMode()
const mounted = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => {
  if (!mounted.value) return false // 默认为浅色模式
  return colorMode.preference === 'dark'
})

// 确保组件在客户端完全挂载后再显示主题状态
onMounted(() => {
  nextTick(() => {
    mounted.value = true
  })
})
</script>

<template>
  <UButton
    variant="ghost"
    size="sm"
    square
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggleTheme"
  >
    <UIcon
      :name="mounted ? (isDark ? 'i-heroicons-sun' : 'i-heroicons-moon') : 'i-heroicons-moon'"
      class="w-5 h-5"
    />
  </UButton>
</template>
