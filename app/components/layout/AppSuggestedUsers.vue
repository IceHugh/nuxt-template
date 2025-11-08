<script setup lang="ts">
interface SuggestedUser {
  name: string
  username: string
  avatar: string
}

interface Props {
  users: SuggestedUser[]
  title?: string
}

const { users, title } = withDefaults(defineProps<Props>(), {
  title: '推荐关注',
})

const emit = defineEmits<{
  follow: [user: SuggestedUser]
  viewProfile: [user: SuggestedUser]
}>()

// 处理关注操作
const handleFollow = (user: SuggestedUser) => {
  emit('follow', user)
}

// 处理查看用户资料
const handleViewProfile = (user: SuggestedUser) => {
  emit('viewProfile', user)
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-semibold">{{ title }}</h3>
    </template>
    <div class="p-2 space-y-3">
      <div
        v-for="(suggestedUser, index) in users"
        :key="index"
        class="flex items-center justify-between"
      >
        <div
          class="flex items-center gap-3 cursor-pointer hover:bg-muted p-1 rounded transition-colors duration-200"
          @click="handleViewProfile(suggestedUser)"
        >
          <UAvatar :src="suggestedUser.avatar" :alt="suggestedUser.name" size="sm" />
          <div>
            <p class="text-sm font-medium">{{ suggestedUser.name }}</p>
            <p class="text-xs text-muted-foreground">{{ suggestedUser.username }}</p>
          </div>
        </div>
        <UButton
          size="xs"
          variant="outline"
          @click="handleFollow(suggestedUser)"
        >
          关注
        </UButton>
      </div>
    </div>
  </UCard>
</template>