<script setup lang="ts">
interface Props {
  class?: string
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'neutral' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
  text: string
  successMessage?: string
  disabled?: boolean
}

const {
  variant = 'outline',
  size = 'sm',
  color = 'primary',
  text,
  successMessage = '已复制到剪贴板',
  disabled = false,
  class: buttonClass,
} = defineProps<Props>()

const emit = defineEmits<{
  copied: [text: string]
  error: [error: Error]
}>()

// 响应式状态
const isCopied = ref(false)
const isLoading = ref(false)

// 计算属性：按钮是否禁用
const isDisabled = computed(() => disabled || isLoading.value)

// 计算属性：按钮图标
const buttonIcon = computed(() => (isCopied.value ? 'i-lucide-check' : 'i-lucide-copy'))

// 计算属性：ARIA 标签
const ariaLabel = computed(() => (isCopied.value ? successMessage : '复制到剪贴板'))

// 清理函数：定时器 ID
let timeoutId: NodeJS.Timeout | null = null

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

// 主要功能：复制到剪贴板
async function copyToClipboard(): Promise<void> {
  // 安全检查
  if (!process.client || disabled || isLoading.value) {
    return
  }

  try {
    isLoading.value = true

    // 尝试使用现代的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      // 降级到传统方法
      await fallbackCopyText(text)
    }

    // 显示成功状态
    isCopied.value = true
    emit('copied', text)

    // 清理之前的定时器并设置新的
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
    const errorObj = error instanceof Error ? error : new Error('复制失败')
    emit('error', errorObj)
  } finally {
    isLoading.value = false
  }
}

// 降级方案：传统复制方法
async function fallbackCopyText(textToCopy: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'

    try {
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (!successful) {
        throw new Error('复制失败')
      }

      resolve()
    } catch (error) {
      document.body.removeChild(textArea)
      reject(error)
    }
  })
}
</script>

<template>
  <UButton
    :variant="variant"
    :size="size"
    :color="color"
    :disabled="isDisabled"
    :loading="isLoading"
    :icon="buttonIcon"
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="copyToClipboard"
  >
    <!-- 插槽内容或默认按钮文本 -->
    <span v-if="$slots.default || !isCopied">
      <slot v-if="$slots.default" />
      <span v-else-if="!isCopied">复制</span>
      <span v-else>{{ successMessage }}</span>
    </span>
  </UButton>
</template>

<style scoped>
/* 组件样式（如果需要额外的自定义样式） */
</style>
