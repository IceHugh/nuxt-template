<script setup lang="ts">
// Vue 组合式 API
import { computed, onMounted, onUnmounted } from 'vue'

// 手动导入 Nuxt 函数和 composable
import { useRoute } from '#app'
import { useLayoutState } from '~/composables/useLayoutState'

// 使用组合式函数管理布局状态
const {
  checkMobile,
  clearResizeTimer,
  navigationItems,
  user,
  searchQuery,
  trendingTopics,
  suggestedUsers,
} = useLayoutState()

// 当前路由
const route = useRoute()
const currentPath = computed(() => route.path)

// 页面标题 - 使用计算属性优化
const pageTitle = computed(() => {
  const current = navigationItems.value.find(item => item.to === currentPath.value)
  return current?.label || 'Web3 Hub'
})

// 生命周期管理
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  clearResizeTimer()
})

// 事件处理函数
const handleNavigation = (item: any) => {
  // 导航处理逻辑
  console.warn('Navigate to:', item.to)
}

const handleUserAction = (action: any) => {
  // 用户操作处理逻辑
  console.warn('User action:', action)
}

const handleTopicSelect = (topic: any) => {
  // 话题选择处理逻辑
  console.warn('Topic selected:', topic.title)
}

const handleUserFollow = (followedUser: any) => {
  // 用户关注处理逻辑
  console.warn('User followed:', followedUser.name)
}

const handleUserProfile = (viewedUser: any) => {
  // 用户资料查看处理逻辑
  console.warn('View profile:', viewedUser.name)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- 优化的布局网格 -->
    <div class="h-screen lg:grid lg:grid-cols-[280px_1fr_320px]">
      <!-- 左侧边栏 -->
      <AppSidebar
        position="left"
        :current-path="currentPath"
        :show-user-actions="true"
        :show-social-links="true"
        @navigation="handleNavigation"
        @user-action="handleUserAction"
      />

      <!-- 主要内容区域 -->
      <main class="flex flex-col lg:overflow-hidden">
        <!-- 优化的 Header -->
        <UHeader
          title="Web3 Hub"
          mode="drawer"
          toggle-side="right"
          :toggle="{ icon: 'i-heroicons-bars-3', variant: 'ghost', size: 'sm' }"
        >
          <!-- 自定义Logo -->
          <template #title>
            <AppLogo size="sm" />
          </template>

          <!-- 左侧内容 - 桌面端显示Logo -->
          <template #left>
            <div class="hidden lg:flex items-center gap-3">
              <AppLogo size="md" />
            </div>
          </template>

          <!-- 中间内容 - 页面标题 -->
          <template #default>
            <h1 class="text-lg font-semibold text-center flex-1">{{ pageTitle }}</h1>
          </template>

          <!-- 右侧内容 - 工具栏 -->
          <template #right>
            <div class="flex items-center gap-2">
              <UButton variant="ghost" size="sm" square icon="i-heroicons-magnifying-glass" />
            </div>
          </template>

          <!-- 优化的移动端菜单内容 -->
          <template #body>
            <div class="p-4 space-y-4">
              <!-- 搜索 -->
              <UInput
                v-model="searchQuery"
                placeholder="搜索 Web3 Hub..."
                size="sm"
                icon="i-heroicons-magnifying-glass"
                class="w-full"
              />

              <!-- 用户信息 -->
              <AppUserInfo :user="user" :show-actions="true" @action="handleUserAction" />

              <!-- 设置选项 -->
              <div class="flex flex-col gap-2">
                <AppThemeToggle />
                <AppLanguageSwitcher />
              </div>

              <!-- 趋势话题 -->
              <AppTrendingTopics :topics="trendingTopics" @select="handleTopicSelect" />

              <!-- 推荐用户 -->
              <AppSuggestedUsers
                :users="suggestedUsers"
                @follow="handleUserFollow"
                @view-profile="handleUserProfile"
              />

              <!-- 底部链接 -->
              <div class="pt-4 border-t">
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-2">
                    <UButton variant="ghost" size="xs" class="justify-start">
                      <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-1" />
                      设置
                    </UButton>
                    <UButton variant="ghost" size="xs" class="justify-start">
                      <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4 mr-1" />
                      帮助
                    </UButton>
                    <UButton variant="ghost" size="xs" class="justify-start">
                      <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-1" />
                      隐私
                    </UButton>
                    <UButton variant="ghost" size="xs" class="justify-start">
                      <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-1" />
                      条款
                    </UButton>
                  </div>

                  <div class="pt-4">
                    <p class="text-xs text-muted-foreground text-center">
                      © 2025 Web3 Hub. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UHeader>

        <!-- 页面内容区域 -->
        <div class="flex-1 overflow-y-auto p-4 lg:p-6">
          <slot />
        </div>
      </main>

      <!-- 右侧边栏 -->
      <AppSidebar
        position="right"
        :current-path="currentPath"
        @navigation="handleNavigation"
        @topic-select="handleTopicSelect"
        @user-follow="handleUserFollow"
        @user-profile="handleUserProfile"
      />
    </div>

    <!-- 移动端底部导航 -->
    <AppMobileNavigation :current-path="currentPath" @navigate="handleNavigation" />
  </div>
</template>

<style scoped>
/* 移动端内容区域留出底部导航空间 */
@media (max-width: 1023px) {
  main {
    padding-bottom: 5rem;
  }
}
</style>
