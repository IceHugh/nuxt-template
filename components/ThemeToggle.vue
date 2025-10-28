<template>
  <Button
    variant="outline"
    size="icon"
    @click="toggleColorMode"
    :aria-label="`切换到${nextMode}模式`"
  >
    <Icon
      :name="currentMode === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      class="h-4 w-4"
    />
  </Button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const currentMode = computed(() => colorMode.value)

const nextMode = computed(() => {
  switch (currentMode.value) {
    case 'light':
      return '暗色'
    case 'dark':
      return '亮色'
    case 'system':
      return '系统'
    default:
      return '暗色'
  }
})

const toggleColorMode = () => {
  switch (currentMode.value) {
    case 'light':
      colorMode.preference = 'dark'
      break
    case 'dark':
      colorMode.preference = 'system'
      break
    case 'system':
      colorMode.preference = 'light'
      break
    default:
      colorMode.preference = 'dark'
      break
  }
}
</script>