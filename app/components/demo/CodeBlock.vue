<script setup lang="ts">
interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
  theme?: 'light' | 'dark' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  showLineNumbers: true,
  theme: 'auto',
})

const codeBlock = ref()

// 复制功能
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    // 这里可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 生成行号
const linesWithNumbers = computed(() => {
  if (!props.showLineNumbers) return props.code
  return props.code
    .split('\n')
    .map((line, index) => `${(index + 1).toString().padStart(2, ' ')}  ${line}`)
    .join('\n')
})
</script>

<template>
  <div class="relative group">
    <!-- 语言标签 -->
    <div class="absolute top-3 left-3 z-10">
      <UBadge variant="subtle" size="xs">
        {{ language }}
      </UBadge>
    </div>

    <!-- 复制按钮 -->
    <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <UButton
        size="xs"
        variant="ghost"
        square
        icon="i-heroicons-clipboard-document"
        @click="copyCode"
      />
    </div>

    <!-- 代码块 -->
    <pre ref="codeBlock" class="language-{{ language }}"><code>{{ linesWithNumbers }}</code></pre>
  </div>
</template>

<style scoped>
pre {
  @apply bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-rel;
}

code {
  @apply block;
}

/* 行号高亮 */
pre .line-numbers {
  @apply text-gray-500 select-none;
}
</style>
