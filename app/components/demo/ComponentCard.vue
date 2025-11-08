<script setup lang="ts">
interface Props {
  title: string
  description: string
  badge?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <!-- 头部 -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3 mb-2">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <UBadge v-if="badge" variant="subtle" size="sm">
          {{ badge }}
        </UBadge>
      </div>
      <p class="text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>

    <!-- 演示区域 -->
    <div class="p-6 bg-gray-50 dark:bg-gray-900/50">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">演示</h4>
      <div class="demo-container">
        <slot name="demo" />
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="p-6 border-t border-gray-200 dark:border-gray-700">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">使用方法</h4>
      <div class="code-container">
        <slot name="usage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  @apply flex items-center justify-center min-h-[120px];
}

.code-container {
  @apply relative;
}

.code-container pre {
  @apply text-sm;
}
</style>
