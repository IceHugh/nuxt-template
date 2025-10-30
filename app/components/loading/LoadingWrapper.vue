<script setup lang="ts">
interface Props {
  duration?: number // 加载持续时间（毫秒）
  allowSkip?: boolean // 是否允许跳过
  minDisplayTime?: number // 最小显示时间（毫秒）
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  allowSkip: true,
  minDisplayTime: 1500,
})

// 加载状态
const isLoading = ref(true)
const progress = ref(0)
const startTime = Date.now()
let animationFrame: number | null = null
let progressInterval: NodeJS.Timeout | null = null

// 键盘提示显示
const showKeyboardHint = computed(() => {
  return props.allowSkip && progress.value > 20
})

// 模拟加载进度
function simulateProgress() {
  const elapsed = Date.now() - startTime
  const remaining = Math.max(0, props.duration - elapsed)

  if (remaining > 0) {
    // 使用缓动函数让进度条更自然
    const easeOutQuart = 1 - (1 - progress.value / 100) ** 4
    const targetProgress = (elapsed / props.duration) * 100
    progress.value = Math.min(95, targetProgress + (95 - targetProgress) * (1 - easeOutQuart))
  } else {
    // 确保达到最小显示时间
    const displayTime = Date.now() - startTime
    if (displayTime >= props.minDisplayTime) {
      progress.value = 100
      // 延迟一点完成动画
      setTimeout(() => {
        completeLoading()
      }, 200)
    }
  }
}

// 完成加载
function completeLoading() {
  isLoading.value = false
  cleanup()
}

// 跳过加载
function handleSkip() {
  if (props.allowSkip && progress.value > 20) {
    progress.value = 100
    setTimeout(() => {
      completeLoading()
    }, 200)
  }
}

// 键盘事件处理
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.allowSkip && progress.value > 20) {
    handleSkip()
  }
}

// 清理定时器和动画
function cleanup() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  document.removeEventListener('keydown', handleKeydown)
}

// 组件挂载时开始加载
onMounted(() => {
  // 监听键盘事件
  document.addEventListener('keydown', handleKeydown)

  // 使用 requestAnimationFrame 更新进度
  const updateProgress = () => {
    simulateProgress()
    if (isLoading.value) {
      animationFrame = requestAnimationFrame(updateProgress)
    }
  }

  animationFrame = requestAnimationFrame(updateProgress)

  // 备用定时器（防止 requestAnimationFrame 失效）
  progressInterval = setInterval(() => {
    if (isLoading.value) {
      simulateProgress()
    }
  }, 50)
})

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})

// 页面可见性变化时暂停/恢复动画
onMounted(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      cleanup()
    } else if (isLoading.value) {
      // 页面重新可见时恢复动画
      animationFrame = requestAnimationFrame(() => {
        const updateProgress = () => {
          simulateProgress()
          if (isLoading.value) {
            animationFrame = requestAnimationFrame(updateProgress)
          }
        }
        updateProgress()
      })
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
})

// 监听路由变化，如果用户手动导航则隐藏加载屏幕
const router = useRouter()
watch(
  () => router.currentRoute.value,
  () => {
    if (progress.value > 50) {
      completeLoading()
    }
  }
)
</script>

<template>
  <Transition name="loading-fade" appear>
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <!-- 内部的 Loading 组件 -->
      <Loading />

      <!-- 可选的点击跳过按钮 -->
      <button
        v-if="allowSkip && progress > 20"
        class="absolute bottom-8 right-8 px-4 py-2 text-sm bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 border border-border/50"
        @click="handleSkip"
      >
        跳过加载
      </button>

      <!-- 键盘提示 -->
      <div
        v-if="showKeyboardHint"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-pulse"
      >
        按 <kbd class="px-2 py-1 bg-muted rounded text-xs">ESC</kbd> 跳过
      </div>

      <!-- 可访问性支持 -->
      <div
        role="progressbar"
        :aria-valuenow="Math.round(progress)"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="应用加载进度"
        class="sr-only"
      >
        加载进度: {{ Math.round(progress) }}%
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 淡入淡出动画 */
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.loading-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* 键盘样式 */
kbd {
  font-family:
    ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.75em;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* 焦点管理 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .backdrop-blur-sm {
    backdrop-filter: none;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none;
  }

  .loading-fade-enter-active,
  .loading-fade-leave-active {
    transition: opacity 0.2s ease;
  }
}
</style>
