<template>
  <SidebarProvider>
    <AppSidebar
      title="Nuxt Template"
      :menu-items="menuItems"
    >
      <template #footer>
        <div class="px-4 py-2 flex justify-end">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </template>
    </AppSidebar>
    <SidebarInset>
      <header class="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>

        <!-- 右侧操作区域 -->
        <div class="ml-auto flex items-center space-x-4 px-4">
          <!-- 使用插槽，允许页面自定义头部内容 -->
          <div v-if="$slots.header" class="flex items-center space-x-4">
            <slot name="header" />
          </div>
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </main>

      <footer class="border-t">
        <div class="container mx-auto px-4 py-4">
          <div class="text-center text-sm text-muted-foreground">
            © 2024 Nuxt Template. All rights reserved.
          </div>
        </div>
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义菜单项类型
interface MenuItem {
  title: string
  url: string
  icon: string
  isActive?: boolean
}

// 简化的菜单配置，AppSidebar 组件会自动处理激活状态
const menuItems: MenuItem[] = [
  {
    title: "首页",
    url: "/",
    icon: "lucide:home",
  },
  {
    title: "组件测试",
    url: "/components-test",
    icon: "lucide:component",
  },
  {
    title: "分析",
    url: "/analytics",
    icon: "lucide:bar-chart-3",
  },
  {
    title: "项目",
    url: "/projects",
    icon: "lucide:folder",
  },
  {
    title: "团队",
    url: "/team",
    icon: "lucide:users",
  },
  {
    title: "设置",
    url: "/settings",
    icon: "lucide:settings",
  },
]
</script>

<style scoped>
/* 布局特定的样式 */
</style>