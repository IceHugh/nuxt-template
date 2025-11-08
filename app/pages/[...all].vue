<script setup lang="ts">
// 获取路由信息
const route = useRoute()
const router = useRouter()

// 国际化支持
const { t } = useI18n()

// 获取页面信息
const pageInfo = computed(() => {
  return {
    title: t('error.404.title', '页面未找到'),
    description: t('error.404.description', '抱歉，您访问的页面不存在或已被移动。'),
    icon: 'lucide:search-x',
    iconClass: 'text-blue-500',
  }
})

// 返回首页
function goHome() {
  router.push('/')
}

// 返回上一页
function goBack() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 动态圆圈装饰 -->
      <div class="absolute top-10 right-10 w-2 h-2 bg-primary/30 rounded-full animate-bounce" />
      <div class="absolute bottom-20 left-20 w-3 h-3 bg-primary/20 rounded-full animate-ping" />
      <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-pulse" />
      <div class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/25 rounded-full animate-pulse" />
      <div class="absolute top-1/2 left-1/4 w-1 h-1 bg-primary/35 rounded-full animate-bounce" />
      <div class="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-ping" />
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 w-full max-w-2xl">
      <UCard class="border-border/50 shadow-2xl bg-background/90 backdrop-blur-sm">
        <div class="p-8 md:p-12 text-center space-y-8">
          <!-- 图标和标题 -->
          <div class="space-y-4">
            <!-- 404 大号数字 -->
            <div class="relative">
              <div class="text-8xl md:text-9xl font-bold text-primary/20 select-none animate-pulse">
                404
              </div>
              <!-- 装饰圆环 -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/10 rounded-full animate-spin-slow"
                />
                <div
                  class="absolute w-24 h-24 md:w-32 md:h-32 border-2 border-primary/5 rounded-full animate-spin-slow-reverse"
                />
              </div>
            </div>

            <!-- 图标 -->
            <div class="flex justify-center">
              <div
                class="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
                :class="[pageInfo.iconClass]"
              >
                <Icon :name="pageInfo.icon" class="w-8 h-8" />
              </div>
            </div>
          </div>

          <!-- 错误信息 -->
          <div class="space-y-4">
            <h1 class="text-3xl md:text-4xl font-bold text-foreground">
              {{ pageInfo.title }}
            </h1>
            <p class="text-lg text-muted-foreground max-w-md mx-auto">
              {{ pageInfo.description }}
            </p>
          </div>

          <!-- 404 详细说明 -->
          <div class="text-left max-w-md mx-auto space-y-4">
            <div class="bg-muted/50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="lucide:info" class="w-4 h-4" />
                {{ t('error.404.detail', '可能的原因：') }}
              </h3>
              <ul class="text-sm text-muted-foreground space-y-2">
                <li class="flex items-start gap-2">
                  <Icon name="lucide:circle" class="w-3 h-3 mt-1.5 flex-shrink-0" />
                  {{ t('error.404.reasons.mistyped', '地址输入错误') }}
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="lucide:circle" class="w-3 h-3 mt-1.5 flex-shrink-0" />
                  {{ t('error.404.reasons.moved', '页面已移动到新地址') }}
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="lucide:circle" class="w-3 h-3 mt-1.5 flex-shrink-0" />
                  {{ t('error.404.reasons.deleted', '页面已被删除') }}
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="lucide:circle" class="w-3 h-3 mt-1.5 flex-shrink-0" />
                  {{ t('error.404.reasons.broken', '链接已损坏') }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              {{ t('error.404.suggestion', '您可以尝试以下操作：') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <UButton class="min-w-0 flex-1 sm:flex-none" size="lg" @click="goHome">
                <UIcon name="lucide:home" class="w-4 h-4 mr-2" />
                {{ t('error.404.actions.home', '返回首页') }}
              </UButton>
              <UButton
                variant="outline"
                class="min-w-0 flex-1 sm:flex-none"
                size="lg"
                @click="goBack"
              >
                <UIcon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
                {{ t('error.404.actions.back', '返回上一页') }}
              </UButton>
            </div>
          </div>

          <!-- 额外信息 -->
          <div class="pt-4 border-t border-border/50">
            <div class="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div class="flex items-center gap-1">
                <Icon name="lucide:globe" class="w-3 h-3" />
                <span
                  >{{ t('common.language', '语言') }}:
                  {{ $i18n.locale === 'zh' ? '简体中文' : 'English' }}</span
                >
              </div>
              <div class="flex items-center gap-1">
                <Icon name="lucide:map-pin" class="w-3 h-3" />
                <span>路径: {{ route.path }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 额外的视觉元素 -->
    <div
      class="absolute bottom-10 left-10 text-primary/10 text-6xl font-bold select-none animate-pulse"
    >
      ?
    </div>
    <div
      class="absolute top-10 right-20 text-primary/5 text-4xl font-bold select-none animate-pulse"
      style="animation-delay: 1s"
    >
      !
    </div>
  </div>
</template>

<style scoped>
/* 自定义动画 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-slow-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin-slow-reverse 15s linear infinite;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .text-8xl {
    font-size: 4rem;
  }

  .text-9xl {
    font-size: 5rem;
  }
}

/* 深色模式优化 */
.dark .bg-background\/90 {
  background-color: hsl(var(--background) / 0.95);
}

/* 减少动画效果（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-bounce,
  .animate-ping {
    animation: none;
  }
}
</style>
