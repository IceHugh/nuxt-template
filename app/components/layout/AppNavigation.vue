<script setup lang="ts">
interface NavigationItem {
  label: string
  icon: string
  to: string
  badge?: string
}

interface Props {
  items: NavigationItem[]
  currentPath?: string
  orientation?: 'vertical' | 'horizontal'
  variant?: 'sidebar' | 'mobile'
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: '',
  orientation: 'vertical',
  variant: 'sidebar',
})

const emit = defineEmits<{
  navigate: [item: NavigationItem]
}>()

// 计算当前激活项
const _activeItem = computed(() => {
  return props.items.find(item => item.to === props.currentPath)
})

// 处理导航点击
const handleNavigation = (item: NavigationItem) => {
  emit('navigate', item)
}

// 尺寸样式 - 使用常量避免 SSR 水合不匹配
const mobileSize = 'sm'
const sidebarSize = 'lg'

// 只显示前5个导航项用于移动端 - 使用常量避免 SSR 水合不匹配
const mobileItems = computed(() => {
  return props.variant === 'mobile' ? props.items.slice(0, 5) : props.items
})
</script>

<template>
  <!-- 桌面端导航 -->
  <div v-if="variant === 'sidebar'" class="w-full space-y-2">
    <UButton
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :variant="currentPath === item.to ? 'solid' : 'ghost'"
      :color="currentPath === item.to ? 'primary' : 'neutral'"
      :size="sidebarSize"
      class="w-full justify-start gap-3 transition-all duration-200"
      :class="{ 'bg-primary/10 text-primary': currentPath === item.to }"
      @click="handleNavigation(item)"
    >
      <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
      <span class="flex-1 text-left">{{ item.label }}</span>
      <UBadge v-if="item.badge" size="xs" variant="solid" color="primary" class="shrink-0">
        {{ item.badge }}
      </UBadge>
    </UButton>
  </div>

  <!-- 移动端导航 -->
  <div v-else class="grid grid-cols-5 gap-1">
    <UButton
      v-for="item in mobileItems"
      :key="item.to"
      :to="item.to"
      variant="ghost"
      color="neutral"
      :size="mobileSize"
      class="flex-col items-center justify-center p-2 h-auto hover:bg-gray-100 dark:hover:bg-gray-800"
      :class="[
        // 使用固定的类名顺序确保 SSR 一致性
        {
          'text-primary': currentPath === item.to,
        },
      ]"
      @click="handleNavigation(item)"
    >
      <UIcon :name="item.icon" class="w-5 h-5" />
      <span class="text-xs">{{ item.label }}</span>
    </UButton>
  </div>
</template>
