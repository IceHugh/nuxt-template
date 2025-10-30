<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { copyButtonVariants } from '.'
import type { CopyButtonVariants } from '.'

interface Props {
  class?: HTMLAttributes['class']
  variant?: CopyButtonVariants['variant']
  size?: CopyButtonVariants['size']
  text: string
  successMessage?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'sm',
  successMessage: '已复制到剪贴板',
  disabled: false,
})

const emit = defineEmits<{
  copied: [text: string]
  error: [error: Error]
}>()

const isCopied = ref(false)
const isLoading = ref(false)

async function copyToClipboard() {
  if (!process.client || props.disabled || isLoading.value) return

  try {
    isLoading.value = true

    // 尝试使用现代的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(props.text)
    } else {
      // 降级到传统方法
      const textArea = document.createElement('textarea')
      textArea.value = props.text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (!successful) {
        throw new Error('复制失败')
      }
    }

    // 显示成功状态
    isCopied.value = true
    emit('copied', props.text)

    // 2秒后重置状态
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
    emit('error', error instanceof Error ? error : new Error('复制失败'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <button
    :class="cn(copyButtonVariants({ variant, size }), props.class)"
    :disabled="disabled || isLoading"
    :aria-label="isCopied ? successMessage : '复制到剪贴板'"
    @click="copyToClipboard"
  >
    <Icon
      :name="isCopied ? 'lucide:check' : isLoading ? 'lucide:loader-2' : 'lucide:copy'"
      :class="cn('transition-transform', isLoading && 'animate-spin')"
    />
    <span v-if="$slots.default || !isCopied">
      <slot v-if="$slots.default" />
      <span v-else-if="!isCopied">复制</span>
      <span v-else class="text-green-600 dark:text-green-400">{{ successMessage }}</span>
    </span>
  </button>
</template>
