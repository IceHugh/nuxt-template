<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const { size = 'md', showText = true } = defineProps<Props>()

const sizeClasses = {
  sm: 'w-6 h-6 text-lg',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-2xl',
} as const

const iconClass = computed(() => sizeClasses[size])
const textClass = computed(
  () => `${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'} font-bold`
)
</script>

<template>
  <div class="flex items-center gap-3">
    <UIcon name="i-simple-icons-x" :class="iconClass" class="text-primary" />
    <span v-if="showText" :class="textClass">Web3 Hub</span>
  </div>
</template>
