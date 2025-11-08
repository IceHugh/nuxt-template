<script setup lang="ts">
interface Props {
  position: 'left' | 'right'
  currentPath?: string
  isMobile?: boolean
  showUserActions?: boolean
  showTrendingTopics?: boolean
  showSuggestedUsers?: boolean
  showBottomLinks?: boolean
  showSocialLinks?: boolean
}

const {
  currentPath,
  showUserActions,
  showTrendingTopics,
  showSuggestedUsers,
  showBottomLinks,
  showSocialLinks
} = withDefaults(defineProps<Props>(), {
  currentPath: '',
  isMobile: false,
  showUserActions: false,
  showTrendingTopics: true,
  showSuggestedUsers: true,
  showBottomLinks: true,
  showSocialLinks: false,
})

const emit = defineEmits<{
  navigation: [item: any]
  userAction: [action: any]
  topicSelect: [topic: any]
  userFollow: [user: any]
  userProfile: [user: any]
}>()

// 获取布局状态
const { navigationItems, user, trendingTopics, suggestedUsers, searchQuery } = useLayoutState()

// 底部链接配置
const bottomLinks = [
  { label: '设置', icon: 'i-heroicons-cog-6-tooth' },
  { label: '帮助', icon: 'i-heroicons-question-mark-circle' },
  { label: '隐私', icon: 'i-heroicons-shield-check' },
  { label: '条款', icon: 'i-heroicons-document-text' },
] as const

// 社交链接配置
const socialLinks = [
  { icon: 'i-simple-icons-github', name: 'GitHub' },
  { icon: 'i-simple-icons-twitter', name: 'Twitter' },
  { icon: 'i-simple-icons-discord', name: 'Discord' },
] as const

// 处理各种事件
const handleNavigation = (item: any) => {
  emit('navigation', item)
}

const handleUserAction = (action: any) => {
  emit('userAction', action)
}

const handleTopicSelect = (topic: any) => {
  emit('topicSelect', topic)
}

const handleUserFollow = (user: any) => {
  emit('userFollow', user)
}

const handleUserProfile = (user: any) => {
  emit('userProfile', user)
}
</script>

<template>
  <!-- 左侧边栏 -->
  <aside v-if="position === 'left'" class="hidden lg:flex flex-col">
    <div class="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      <!-- Logo -->
      <AppLogo size="md" />

      <!-- Navigation -->
      <AppNavigation
        :items="navigationItems"
        :current-path="currentPath"
        variant="sidebar"
        @navigate="handleNavigation"
      />

      <!-- 发布按钮 -->
      <UButton size="lg" color="primary" variant="solid" class="w-full gap-2">
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
        <span>发布</span>
      </UButton>

      <!-- 用户信息 -->
      <AppUserInfo :user="user" :show-actions="showUserActions" @action="handleUserAction" />

      <!-- 主题和语言切换 -->
      <div class="flex items-center gap-4">
        <AppThemeToggle />
        <AppLanguageSwitcher />
      </div>

      <!-- 社交链接 -->
      <div v-if="showSocialLinks" class="flex items-center gap-4">
        <UButton
          v-for="link in socialLinks"
          :key="link.name"
          variant="ghost"
          size="sm"
          square
          :icon="link.icon"
          :aria-label="link.name"
        />
      </div>
    </div>
  </aside>

  <!-- 右侧边栏 -->
  <aside v-else class="hidden lg:flex flex-col">
    <div class="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      <!-- 搜索 -->
      <UInput
        v-model="searchQuery"
        placeholder="搜索 Web3 Hub..."
        size="sm"
        icon="i-heroicons-magnifying-glass"
        class="w-full"
      />

      <!-- 趋势话题 -->
      <AppTrendingTopics
        v-if="showTrendingTopics"
        :topics="trendingTopics"
        @select="handleTopicSelect"
      />

      <!-- 推荐用户 -->
      <AppSuggestedUsers
        v-if="showSuggestedUsers"
        :users="suggestedUsers"
        @follow="handleUserFollow"
        @view-profile="handleUserProfile"
      />

      <!-- 底部链接 -->
      <div v-if="showBottomLinks" class="space-y-4">
        <div class="grid grid-cols-2 gap-2">
          <UButton
            v-for="link in bottomLinks"
            :key="link.label"
            variant="ghost"
            size="xs"
            class="justify-start"
          >
            <UIcon :name="link.icon" class="w-4 h-4 mr-1" />
            {{ link.label }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- 右侧底部 Footer -->
    <UFooter>
      <UContainer>
        <div class="py-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-muted-foreground">© 2025 Web3 Hub. All rights reserved.</p>
          </div>
        </div>
      </UContainer>
    </UFooter>
  </aside>
</template>
