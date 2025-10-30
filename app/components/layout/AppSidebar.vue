<script setup lang="ts">
import type { SidebarProps } from '~/components/ui/sidebar'
import { useRoute } from '#app'

// 定义菜单项类型
interface MenuItem {
  title: string
  url: string
  icon: string
  isActive?: boolean
}

// 定义组件 Props
interface AppSidebarProps extends SidebarProps {
  logo?: string
  title?: string
  menuItems?: MenuItem[]
}

const props = withDefaults(defineProps<AppSidebarProps>(), {
  collapsible: 'icon',
  logo: '/logo.svg',
  title: 'Nuxt Template',
  menuItems: () => [
    {
      title: '首页',
      url: '/',
      icon: 'lucide:home',
    },
    {
      title: '分析',
      url: '/analytics',
      icon: 'lucide:bar-chart-3',
    },
    {
      title: '项目',
      url: '/projects',
      icon: 'lucide:folder',
    },
    {
      title: '团队',
      url: '/team',
      icon: 'lucide:users',
    },
    {
      title: '设置',
      url: '/settings',
      icon: 'lucide:settings',
    },
  ],
})

const route = useRoute()

// 检查菜单项是否激活
function isMenuItemActive(item: MenuItem): boolean {
  return route.path === item.url || item.isActive || false
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <img :src="logo" :alt="title" class="size-4" onerror="this.style.display='none'">
              <!-- 如果 logo 加载失败，显示默认图标 -->
              <Icon name="lucide:layout-dashboard" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ title }}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <!-- 主导航菜单 -->
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in menuItems" :key="item.title">
            <SidebarMenuButton as-child :is-active="isMenuItemActive(item)" :tooltip="item.title">
              <NuxtLink :to="item.url">
                <Icon :name="item.icon" class="h-4 w-4" />
                <span>{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <!-- 支持自定义内容的 Footer -->
      <slot name="footer">
        <div class="flex items-center gap-2 px-4 py-2">
          <span class="text-sm text-muted-foreground"> © 2024 {{ title }} </span>
        </div>
      </slot>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
