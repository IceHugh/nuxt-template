import { nextTick } from 'vue'

// 防抖函数 - 优化 resize 事件
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

// 节流函数 - 优化滚动事件
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }
}

// 异步加载组件
export async function loadComponent<T = any>(loader: () => Promise<T>): Promise<T> {
  try {
    return await loader()
  } catch (error) {
    console.error('Failed to load component:', error)
    throw error
  }
}

// 检查是否为移动端
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 1024
}

// 等待 DOM 更新
export function waitForDOMUpdate(): Promise<void> {
  return nextTick()
}

// 内存清理工具
export function cleanup() {
  // 清理可能的内存泄漏
  if (typeof window !== 'undefined') {
    // 清理事件监听器等
  }
}

// 格式化数字显示
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

// 懒加载图片
export function lazyLoadImage(imgElement: HTMLImageElement, src: string): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            imgElement.src = src
            observer.unobserve(imgElement)
          }
        })
      },
      { rootMargin: '50px' }
    )
    observer.observe(imgElement)
  } else {
    // 回退到直接加载
    imgElement.src = src
  }
}
