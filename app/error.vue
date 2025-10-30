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

// 处理错误信息
const errorInfo = computed(() => {
  return {
    title: t('error.general.title', '出现错误'),
    description: t('error.general.description', '抱歉，应用程序遇到了一个错误。'),
    icon: 'lucide:alert-triangle',
    iconClass: 'text-red-500',
  }
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
      <Card class="border-border/50 shadow-xl bg-background/90 backdrop-blur-sm">
        <CardContent class="p-8 text-center space-y-6">
          <!-- 错误图标 -->
          <div class="flex justify-center">
            <div
              class="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
              :class="[errorInfo.iconClass]"
            >
              <Icon :name="errorInfo.icon" class="w-8 h-8" />
            </div>
          </div>

          <!-- 错误信息 -->
          <div class="space-y-3">
            <h1 class="text-2xl font-bold text-foreground">
              {{ errorInfo.title }}
            </h1>
            <p class="text-muted-foreground">
              {{ errorInfo.description }}
            </p>
            <div v-if="error.statusCode" class="text-sm text-muted-foreground">
              错误代码: {{ error.statusCode }}
            </div>
          </div>

          <!-- 错误详情（开发环境） -->
          <div v-if="isDev && error" class="text-left">
            <Collapsible>
              <CollapsibleTrigger
                class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Icon name="lucide:bug" class="w-4 h-4" />
                错误详情
                <Icon name="lucide:chevron-down" class="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent class="mt-2">
                <div class="bg-muted p-3 rounded-md text-xs font-mono">
                  <div>状态码: {{ error.statusCode }}</div>
                  <div>消息: {{ error.statusMessage || error.message }}</div>
                  <div v-if="error.stack" class="mt-2">
                    <div class="font-semibold">堆栈:</div>
                    <pre class="whitespace-pre-wrap">{{ error.stack }}</pre>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-3">
            <Button class="flex-1" @click="handleError">
              <Icon name="lucide:home" class="w-4 h-4 mr-2" />
              {{ t('error.404.actions.home', '返回首页') }}
            </Button>
            <Button variant="outline" class="flex-1" @click="handleError">
              <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
              {{ t('error.404.actions.refresh', '刷新页面') }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
