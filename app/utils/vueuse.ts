// VueUse 函数的本地实现，用于 Cloudflare Pages 兼容性

import type { Ref } from 'vue'

// reactiveOmit 的本地实现
export function reactiveOmit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const result = {} as Omit<T, K>

  for (const key in obj) {
    if (!keys.includes(key as K)) {
      result[key] = obj[key]
    }
  }

  return result
}

// useVModel 的简化实现
export function useVModel<T extends Record<string, any>, K extends keyof T>(
  props: T,
  key: K,
  emit?: (event: 'update:' & string, value: T[K]) => void
): Ref<T[K]> {
  // 这里提供一个基础的实现，实际项目中可能需要更复杂的逻辑
  return ref(props[key]) as Ref<T[K]>
}

// useEventListener 的简化实现
export function useEventListener(
  target: EventTarget | Window | undefined,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) {
  const cleanup = () => {
    if (target && target.removeEventListener) {
      target.removeEventListener(event, handler, options)
    }
  }

  onMounted(() => {
    if (target && target.addEventListener) {
      target.addEventListener(event, handler, options)
    }
  })

  onUnmounted(cleanup)

  // 在客户端环境下，如果 target 已经存在，立即添加监听器
  if (process.client && target && target.addEventListener) {
    target.addEventListener(event, handler, options)
  }
}

// useMediaQuery 的简化实现
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)
  let mediaQuery: MediaQueryList | null = null

  const cleanup = () => {
    if (mediaQuery && mediaQuery.removeListener) {
      // 旧版 API
      mediaQuery.removeListener(handleChange)
    } else if (mediaQuery && mediaQuery.removeEventListener) {
      // 新版 API
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  const handleChange = (e: MediaQueryListEvent | { matches: boolean }) => {
    matches.value = e.matches
  }

  if (process.client) {
    mediaQuery = window.matchMedia(query)
    matches.value = mediaQuery.matches

    // 使用兼容性更好的 API
    if (mediaQuery.addListener) {
      // 旧版浏览器
      mediaQuery.addListener(handleChange)
    } else if (mediaQuery.addEventListener) {
      // 新版浏览器
      mediaQuery.addEventListener('change', handleChange)
    }
  }

  onUnmounted(cleanup)

  return matches
}

// useDark 的简化实现
export function useDark(): Ref<boolean> {
  const isDark = ref(false)

  if (process.client) {
    // 检查系统偏好或本地存储
    const darkModePreference =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    isDark.value = darkModePreference === 'dark'
  }

  return isDark
}

// useToggle 的简化实现
export function useToggle(initialValue = false): [Ref<boolean>, () => void] {
  const state = ref(initialValue)

  const toggle = () => {
    state.value = !state.value
  }

  return [state, toggle]
}

// useClipboard 的简化实现
export function useClipboard() {
  const isSupported = ref(process.client && navigator.clipboard !== undefined)
  const text = ref('')
  const copied = ref(false)

  const copy = async (source: string) => {
    if (!isSupported.value) return false

    try {
      await navigator.clipboard.writeText(source)
      text.value = source
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
      return true
    } catch (error) {
      console.error('Failed to copy:', error)
      return false
    }
  }

  return {
    isSupported,
    text,
    copied,
    copy,
  }
}

// defaultDocument 的简化实现
export const defaultDocument = process.client ? document : null
