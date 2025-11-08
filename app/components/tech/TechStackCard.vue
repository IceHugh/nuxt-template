<script setup lang="ts">
interface TechStackCardProps {
  title: string
  description: string
  icon: string
  status: 'online' | 'offline' | 'warning' | 'loading'
  badge?: string
  actionLabel?: string
  actionDisabled?: boolean
}

const {
  badge = '',
  actionLabel = '测试',
  actionDisabled = false,
} = defineProps<TechStackCardProps>()

const emit = defineEmits<{
  action: []
}>()

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  warning: 'bg-amber-500',
  loading: 'bg-blue-500 animate-pulse',
}

const statusBadgeColors = {
  online: 'emerald',
  offline: 'gray',
  warning: 'amber',
  loading: 'blue',
}

const handleAction = () => {
  if (!props.actionDisabled) {
    emit('action')
  }
}
</script>

<template>
  <div class="tech-card p-6 relative overflow-hidden web3-fade-in">
    <!-- 顶部渐变条 -->
    <div class="absolute top-0 left-0 right-0 h-1 web3-gradient-bg"></div>

    <!-- 卡片内容 -->
    <div class="flex items-start gap-4">
      <!-- 技术图标 -->
      <div class="tech-icon flex-shrink-0">
        <UIcon :name="icon" class="w-6 h-6" />
      </div>

      <!-- 信息区域 -->
      <div class="flex-1 min-w-0">
        <!-- 标题和状态 -->
        <div class="flex items-center gap-2 mb-2">
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <div class="w-2 h-2 rounded-full" :class="statusColors[status]"></div>
        </div>

        <!-- 描述 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ description }}</p>

        <!-- 徽章 -->
        <UBadge
          v-if="badge"
          :color="statusBadgeColors[status]"
          variant="subtle"
          size="xs"
          class="mb-3"
        >
          {{ badge }}
        </UBadge>

        <!-- 操作按钮 -->
        <UButton
          :loading="status === 'loading'"
          :disabled="actionDisabled"
          size="sm"
          class="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          @click="handleAction"
        >
          <UIcon v-if="status === 'online'" name="i-lucide-play" class="w-4 h-4 mr-2" />
          <UIcon v-else-if="status === 'offline'" name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
          <UIcon
            v-else-if="status === 'warning'"
            name="i-lucide-alert-triangle"
            class="w-4 h-4 mr-2"
          />
          <UIcon v-else name="i-lucide-loader-2" class="w-4 h-4 mr-2 animate-spin" />
          {{ actionLabel }}
        </UButton>
      </div>
    </div>

    <!-- 装饰性网格背景 -->
    <div class="absolute inset-0 web3-grid-bg opacity-5 pointer-events-none"></div>
  </div>
</template>

<style scoped>
.tech-card {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgb(229 231 235);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

@media (prefers-color-scheme: dark) {
  .tech-card {
    background: rgb(31 41 55);
    border-color: rgb(55 65 81);
  }
}

.tech-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
}

@media (prefers-color-scheme: dark) {
  .tech-icon {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  }
}
</style>
