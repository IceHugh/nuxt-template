<script setup lang="ts">
interface User {
  name: string
  username: string
  avatar: string
}

interface Props {
  user: User
  showActions?: boolean
  size?: 'sm' | 'md'
}

const { user, showActions = false, size = 'sm' } = defineProps<Props>()

const emit = defineEmits<{
  action: [action: 'settings' | 'profile' | 'logout']
}>()

// 处理用户操作
const handleAction = (action: 'settings' | 'profile' | 'logout') => {
  emit('action', action)
}
</script>

<template>
  <div class="flex items-center gap-3 p-3">
    <UAvatar :src="user.avatar" :alt="user.name" :size="size" />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">{{ user.name }}</p>
      <p class="text-xs text-muted-foreground truncate">{{ user.username }}</p>
    </div>

    <!-- 操作按钮 -->
    <div v-if="showActions" class="flex items-center gap-2">
      <UButton
        variant="ghost"
        size="sm"
        square
        icon="i-heroicons-cog-6-tooth"
        @click="handleAction('settings')"
      />
      <UButton
        variant="ghost"
        size="sm"
        square
        icon="i-heroicons-ellipsis-horizontal"
        @click="handleAction('profile')"
      />
    </div>

    <!-- 默认省略号按钮 -->
    <UIcon v-else name="i-heroicons-ellipsis-horizontal" class="w-5 h-5 text-muted-foreground" />
  </div>
</template>
