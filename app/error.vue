<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

defineProps<Props>()

// 国际化支持
const { t } = useI18n()

// 检查开发环境
const isDev = computed(() => import.meta.dev)

// 错误类型映射
const getErrorType = (statusCode?: number) => {
  if (!statusCode) return 'general'
  if (statusCode === 404) return '404'
  if (statusCode >= 500) return 'server'
  if (statusCode >= 400) return 'client'
  return 'general'
}

// 处理错误信息
const errorInfo = computed(() => {
  const errorType = getErrorType(error.value?.statusCode)

  const typeConfig = {
    '404': {
      title: t('error.404.title', '页面未找到'),
      description: t('error.404.description', '抱歉，您访问的页面不存在或已被移动。'),
      icon: 'lucide:search-x',
      iconClass: 'text-amber-500',
      color: 'amber' as const,
    },
    'server': {
      title: t('error.500.title', '服务器错误'),
      description: t('error.500.description', '服务器遇到了一个问题，请稍后再试。'),
      icon: 'lucide:server-crash',
      iconClass: 'text-red-500',
      color: 'red' as const,
    },
    'client': {
      title: t('error.400.title', '请求错误'),
      description: t('error.400.description', '您的请求有误，请检查后重试。'),
      icon: 'lucide:alert-circle',
      iconClass: 'text-orange-500',
      color: 'orange' as const,
    },
    'general': {
      title: t('error.general.title', '出现错误'),
      description: t('error.general.description', '抱歉，应用程序遇到了一个错误。'),
      icon: 'lucide:alert-triangle',
      iconClass: 'text-slate-500',
      color: 'slate' as const,
    },
  }

  return typeConfig[errorType]
})

// 处理错误
const handleError = () => clearError({ redirect: '/' })

// SEO 元数据
useSeoMeta({
  title: `${errorInfo.value.title} - ${t('common.title', 'Nuxt 4 模板项目')}`,
  description: errorInfo.value.description,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4"
  >
    <div class="w-full max-w-lg">
      <UCard
        class="border-border/50 shadow-xl bg-background/90 backdrop-blur-sm"
        :ui="{
          background: 'bg-background/90',
          shadow: 'shadow-xl',
        }"
      >
        <template #header>
          <div class="text-center pt-6">
            <UAvatar
              :icon="errorInfo.icon"
              size="3xl"
              :color="errorInfo.color"
              variant="soft"
              class="mx-auto"
            />
          </div>
        </template>

        <div class="text-center space-y-6">
          <!-- 错误信息 -->
          <div class="space-y-3">
            <h1 class="text-2xl font-bold text-foreground">
              {{ errorInfo.title }}
            </h1>
            <p class="text-muted-foreground">
              {{ errorInfo.description }}
            </p>
            <UBadge
              v-if="error.statusCode"
              variant="outline"
              color="gray"
              size="sm"
            >
              错误代码: {{ error.statusCode }}
            </UBadge>
          </div>

          <!-- 错误详情（开发环境） -->
          <div v-if="isDev && error" class="text-left">
            <UCollapsible>
              <template #default="{ open }">
                <UButton
                  variant="ghost"
                  color="gray"
                  size="sm"
                  class="w-full justify-center"
                >
                  <Icon name="lucide:bug" class="w-4 h-4 mr-2" />
                  错误详情
                  <Icon
                    :name="open ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    class="w-4 h-4 ml-2"
                  />
                </UButton>
              </template>

              <template #content>
                <div class="mt-3 p-4 bg-muted/50 rounded-lg border">
                  <div class="space-y-2 text-xs font-mono">
                    <div class="flex justify-between">
                      <span class="font-semibold">状态码:</span>
                      <UBadge variant="outline" size="xs">
                        {{ error.statusCode }}
                      </UBadge>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-semibold">消息:</span>
                      <span class="text-right max-w-[60%]">
                        {{ error.statusMessage || error.message }}
                      </span>
                    </div>
                    <div v-if="error.stack" class="mt-3">
                      <div class="font-semibold mb-2">堆栈:</div>
                      <div class="bg-background p-3 rounded border text-[10px] overflow-x-auto">
                        <pre class="whitespace-pre-wrap">{{ error.stack }}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </UCollapsible>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <UButton
              color="primary"
              variant="solid"
              size="lg"
              class="flex-1"
              @click="handleError"
            >
              <Icon name="lucide:home" class="w-4 h-4 mr-2" />
              {{ t('error.404.actions.home', '返回首页') }}
            </UButton>
            <UButton
              color="gray"
              variant="outline"
              size="lg"
              class="flex-1"
              @click="handleError"
            >
              <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
              {{ t('error.404.actions.refresh', '刷新页面') }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
