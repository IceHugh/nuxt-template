<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  centered?: boolean
}

const { size = 'lg', padding = true, centered = false } = defineProps<Props>()

const containerClasses = computed(() => {
  const classes = []

  // 尺寸类
  switch (size) {
    case 'sm':
      classes.push('max-w-2xl')
      break
    case 'md':
      classes.push('max-w-4xl')
      break
    case 'lg':
      classes.push('max-w-6xl')
      break
    case 'xl':
      classes.push('max-w-7xl')
      break
    case 'full':
      classes.push('max-w-full')
      break
  }

  // 居中
  if (centered) {
    classes.push('mx-auto')
  } else {
    classes.push('mx-auto sm:px-6 lg:px-8')
  }

  // 内边距
  if (padding) {
    classes.push('px-4 sm:px-6 lg:px-8')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>
