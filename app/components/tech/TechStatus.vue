<script setup lang="ts">
interface TechStatusProps {
  status: 'online' | 'offline' | 'warning' | 'loading'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  customLabel?: string
}

const props = withDefaults(defineProps<TechStatusProps>(), {
  size: 'md',
  showLabel: false,
  customLabel: ''
})

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
}

const statusClasses = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  warning: 'bg-amber-500',
  loading: 'bg-blue-500 animate-pulse'
}

const statusLabels = {
  online: '在线',
  offline: '离线',
  warning: '警告',
  loading: '加载中'
}

const labelColors = {
  online: 'text-emerald-600 dark:text-emerald-400',
  offline: 'text-gray-600 dark:text-gray-400',
  warning: 'text-amber-600 dark:text-amber-400',
  loading: 'text-blue-600 dark:text-blue-400'
}

const displayLabel = computed(() => {
  return props.customLabel || statusLabels[props.status]
})
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- 状态指示灯 -->
    <div class="rounded-full" :class="[sizeClasses[size], statusClasses[status]]"></div>

    <!-- 状态标签 -->
    <span
      v-if="showLabel"
      class="text-sm font-medium"
      :class="labelColors[status]"
    >
      {{ displayLabel }}
    </span>
  </div>
</template>