<script setup lang="ts">
interface Props {
  currentPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentPath: '',
})

const emit = defineEmits<{
  navigate: [item: any]
}>()

// 获取布局状态
const { navigationItems } = useLayoutState()

// 处理导航
const handleNavigation = (item: any) => {
  emit('navigate', item)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md lg:hidden z-40">
    <AppNavigation
      :items="navigationItems"
      :current-path="props.currentPath"
      variant="mobile"
      @navigate="handleNavigation"
    />
  </div>
</template>
