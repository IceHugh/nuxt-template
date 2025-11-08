# 布局优化实施规划 (修订版)

## 项目概述

对 `app/layouts/default.vue` 进行全面重构，实现清晰的三栏响应式布局，解决当前布局混乱、组件重复显示、响应式逻辑不一致等问题。

## 目标定义

### 主要目标
1. 统一Header显示逻辑，确保只有一个Header固定在顶部
2. 规范化侧边栏显示逻辑（左侧：Pad+PC，右侧：仅PC）
3. 优化Footer位置逻辑（PC端在右侧栏下方，移动端在Drawer内）
4. 统一主题和语言切换按钮的位置逻辑
5. 完善Drawer功能的响应式支持
6. **使用Tailwind CSS断点系统和工具类实现响应式布局**

### 成功标准
- [ ] 三种断点下的布局表现正确（移动端<768px，Pad端768-1279px，PC端≥1280px）
- [ ] Header始终固定在顶部，内容不重复
- [ ] 侧边栏按需显示，无布局冲突
- [ ] Footer位置正确，无重复显示
- [ ] 主题和语言切换按钮位置符合要求
- [ ] 所有交互功能正常工作
- [ ] **完全使用Tailwind CSS实现，无自定义CSS**

## 技术分析

### 当前代码问题
1. **布局结构混乱**：Header在桌面端与侧边栏冲突
2. **响应式断点不一致**：左侧用`lg:`，右侧用`xl:`
3. **组件重复**：Logo、Footer、切换按钮多处显示
4. **移动端导航重叠**：底部导航与Drawer功能重复
5. **CSS实现不统一**：混合使用自定义CSS和Tailwind

### 技术约束
- 必须使用 Nuxt 4 + Vue 3 + TypeScript
- 必须使用 Nuxt UI + Tailwind CSS
- **完全使用Tailwind CSS断点系统，无自定义CSS**
- 需要保持现有功能完整性
- 确保SSR兼容性

## Tailwind CSS 断点规范

### 断点系统定义
```css
/* Tailwind CSS 默认断点 */
sm: 640px   /* 小屏幕 - 平板竖屏 */
md: 768px   /* 中等屏幕 - 平板横屏/小笔记本 */
lg: 1024px  /* 大屏幕 - 桌面端 */
xl: 1280px  /* 超大屏幕 - 大桌面显示器 */
xxl: 1536px /* 超超大屏幕 - 超宽显示器 */
```

### 布局断点映射
```typescript
// 响应式断点逻辑
const breakpoints = {
  mobile: '0px - 767px',     // 移动端： < md (768px)
  tablet: '768px - 1023px',  // Pad端： md - lg-1 (768px-1023px)
  desktop: '1024px - 1279px', // 小桌面： lg - xl-1 (1024px-1279px)
  largeDesktop: '1280px+'    // 大桌面： xl+ (1280px+)
}

// Tailwind CSS 类名映射
// 移动端：无前缀 (默认)
// Pad端：md:
// 小桌面：lg:
// 大桌面：xl:
```

## 实施步骤

### 阶段1：准备工作
1. **备份原始文件**
   - 复制 `app/layouts/default.vue` 为 `app/layouts/default.vue.backup`

2. **分析依赖关系**
   - 检查 `AppThemeToggle` 和 `AppLanguageSwitcher` 组件
   - 确认路由和页面结构

### 阶段2：重构布局结构
1. **重写模板结构**
   ```vue
   <template>
     <div class="min-h-screen bg-background">
       <!-- 固定Header - 所有断点显示 -->
       <FixedHeader />

       <!-- 主布局网格 - 使用Tailwind Grid -->
       <div class="h-screen lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">
         <!-- 左侧边栏 - Pad和PC端显示 -->
         <LeftSidebar class="hidden md:flex" />

         <!-- 主内容区 -->
         <main class="flex-1 overflow-y-auto lg:overflow-hidden">
           <div class="h-full flex flex-col">
             <!-- 页面内容 -->
             <div class="flex-1 overflow-y-auto p-4 lg:p-6">
               <slot />
             </div>

             <!-- 移动端底部导航 -->
             <MobileBottomNav class="md:hidden" />
           </div>
         </main>

         <!-- 右侧边栏 - 仅大桌面端显示 -->
         <RightSidebar class="hidden xl:flex" />
       </div>

       <!-- 移动端Drawer - Pad和移动端显示 -->
       <MobileDrawer :class="{ 'xl:hidden': true }" />
     </div>
   </template>
   ```

2. **实现响应式逻辑**
   ```typescript
   // 使用VueUse的useBreakpoints (Tailwind CSS断点)
   const breakpoints = useBreakpoints({
     sm: 640,
     md: 768,
     lg: 1024,
     xl: 1280,
     xxl: 1536
   })

   // 响应式状态
   const isMobile = breakpoints.smaller('md')     // < 768px
   const isTablet = breakpoints.between('md', 'lg') // 768px - 1023px
   const isSmallDesktop = breakpoints.between('lg', 'xl') // 1024px - 1279px
   const isLargeDesktop = breakpoints.greaterOrEqual('xl') // >= 1280px
   ```

### 阶段3：组件拆分（使用Tailwind CSS）

#### 1. **FixedHeader组件**
   ```vue
   <!-- app/components/layout/FixedHeader.vue -->
   <template>
     <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
       <div class="h-16 flex items-center justify-between px-4 lg:px-6">
         <!-- 左侧：Logo -->
         <div class="flex items-center gap-3">
           <UIcon name="i-simple-icons-x" class="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
           <span class="text-lg lg:text-xl font-bold">Web3 Hub</span>
         </div>

         <!-- 中间：页面标题 -->
         <h1 class="text-lg font-semibold text-center flex-1 lg:flex-none">{{ pageTitle }}</h1>

         <!-- 右侧：工具栏 -->
         <div class="flex items-center gap-2">
           <!-- PC端显示完整工具栏 -->
           <div class="hidden xl:flex items-center gap-2">
             <UButton variant="ghost" size="sm" square icon="i-heroicons-magnifying-glass" />
             <AppThemeToggle />
             <AppLanguageSwitcher />
           </div>

           <!-- Pad和移动端显示汉堡菜单 -->
           <UButton
             variant="ghost"
             size="sm"
             square
             icon="i-heroicons-bars-3"
             class="xl:hidden"
             @click="toggleDrawer"
           />
         </div>
       </div>
     </header>
   </template>
   ```

#### 2. **LeftSidebar组件**
   ```vue
   <!-- app/components/layout/LeftSidebar.vue -->
   <template>
     <aside class="hidden md:flex flex-col border-r bg-background">
       <div class="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
         <!-- Logo区域 -->
         <div class="flex items-center gap-3">
           <UIcon name="i-simple-icons-x" class="w-8 h-8 text-primary" />
           <span class="text-xl font-bold">Web3 Hub</span>
         </div>

         <!-- Navigation Menu -->
         <div class="space-y-1">
           <UButton
             v-for="item in navigationItems"
             :key="item.to"
             :to="item.to"
             :variant="currentPath === item.to ? 'solid' : 'ghost'"
             :color="currentPath === item.to ? 'primary' : 'neutral'"
             size="lg"
             class="w-full justify-start gap-3"
           >
             <UIcon :name="item.icon" class="w-5 h-5" />
             <span class="flex-1 text-left">{{ item.label }}</span>
             <UBadge v-if="item.badge" size="xs" variant="solid" color="primary">
               {{ item.badge }}
             </UBadge>
           </UButton>
         </div>

         <!-- Publish Button -->
         <UButton size="lg" color="primary" variant="solid" class="w-full gap-2">
           <UIcon name="i-heroicons-plus" class="w-5 h-5" />
           <span>发布</span>
         </UButton>

         <!-- User Info -->
         <div class="flex items-center gap-3 p-3">
           <UAvatar :src="user.avatar" :alt="user.name" size="sm" />
           <div class="flex-1 min-w-0">
             <p class="text-sm font-medium truncate">{{ user.name }}</p>
             <p class="text-xs text-muted-foreground truncate">{{ user.username }}</p>
           </div>
           <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5 text-muted-foreground" />
         </div>
       </div>
     </aside>
   </template>
   ```

#### 3. **RightSidebar组件**
   ```vue
   <!-- app/components/layout/RightSidebar.vue -->
   <template>
     <aside class="hidden xl:flex flex-col border-l bg-background">
       <div class="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
         <!-- Search -->
         <UInput
           v-model="searchQuery"
           placeholder="搜索 Web3 Hub..."
           size="sm"
           icon="i-heroicons-magnifying-glass"
           class="w-full"
         />

         <!-- Trending Topics -->
         <UCard>
           <template #header>
             <h3 class="font-semibold">趋势话题</h3>
           </template>
           <div class="p-2 space-y-2">
             <div
               v-for="(topic, index) in trendingTopics"
               :key="index"
               class="cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
             >
               <p class="text-xs text-muted-foreground">{{ topic.category }} · 趋势</p>
               <p class="font-medium text-sm">{{ topic.title }}</p>
               <p class="text-xs text-muted-foreground">{{ topic.posts }} 条讨论</p>
             </div>
           </div>
         </UCard>

         <!-- Suggested Users -->
         <UCard>
           <template #header>
             <h3 class="font-semibold">推荐关注</h3>
           </template>
           <div class="p-2 space-y-3">
             <div
               v-for="(suggestedUser, index) in suggestedUsers"
               :key="index"
               class="flex items-center justify-between"
             >
               <div class="flex items-center gap-3">
                 <UAvatar :src="suggestedUser.avatar" :alt="suggestedUser.name" size="sm" />
                 <div>
                   <p class="text-sm font-medium">{{ suggestedUser.name }}</p>
                   <p class="text-xs text-muted-foreground">{{ suggestedUser.username }}</p>
                 </div>
               </div>
               <UButton size="xs" variant="outline"> 关注 </UButton>
             </div>
           </div>
         </UCard>

         <!-- Footer -->
         <div class="space-y-4 border-t pt-4">
           <div class="grid grid-cols-2 gap-2">
             <UButton variant="ghost" size="xs" class="justify-start">
               <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-1" />
               设置
             </UButton>
             <UButton variant="ghost" size="xs" class="justify-start">
               <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4 mr-1" />
               帮助
             </UButton>
             <UButton variant="ghost" size="xs" class="justify-start">
               <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-1" />
               隐私
             </UButton>
             <UButton variant="ghost" size="xs" class="justify-start">
               <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-1" />
               条款
             </UButton>
           </div>

           <div class="pt-4">
             <p class="text-xs text-muted-foreground text-center">
               © 2025 Web3 Hub. All rights reserved.
             </p>
             <div class="flex items-center justify-center gap-2 mt-2">
               <UButton variant="ghost" size="xs" square icon="i-simple-icons-github" />
               <UButton variant="ghost" size="xs" square icon="i-simple-icons-twitter" />
               <UButton variant="ghost" size="xs" square icon="i-simple-icons-discord" />
             </div>
           </div>
         </div>
       </div>
     </aside>
   </template>
   ```

#### 4. **MobileDrawer组件**
   ```vue
   <!-- app/components/layout/MobileDrawer.vue -->
   <template>
     <USlideover v-model="isOpen" side="right" class="xl:hidden">
       <UCard class="flex flex-col h-full">
         <template #header>
           <div class="flex items-center justify-between">
             <h3 class="text-lg font-semibold">菜单</h3>
             <UButton variant="ghost" size="sm" square icon="i-heroicons-x-mark" @click="close" />
           </div>
         </template>

         <div class="flex-1 overflow-y-auto space-y-4 p-4">
           <!-- 用户信息 -->
           <div class="flex items-center gap-3 p-3">
             <UAvatar :src="user.avatar" :alt="user.name" size="sm" />
             <div class="flex-1 min-w-0">
               <p class="text-sm font-medium truncate">{{ user.name }}</p>
               <p class="text-xs text-muted-foreground truncate">{{ user.username }}</p>
             </div>
             <UIcon name="i-heroicons-ellipsis-horizontal" class="w-5 h-5 text-muted-foreground" />
           </div>

           <!-- 搜索 -->
           <UInput
             v-model="searchQuery"
             placeholder="搜索 Web3 Hub..."
             size="sm"
             icon="i-heroicons-magnifying-glass"
             class="w-full"
           />

           <!-- 导航菜单 -->
           <div class="space-y-1">
             <UButton
               v-for="item in navigationItems"
               :key="item.to"
               :to="item.to"
               :variant="currentPath === item.to ? 'solid' : 'ghost'"
               :color="currentPath === item.to ? 'primary' : 'neutral'"
               size="lg"
               class="w-full justify-start gap-3"
               @click="close"
             >
               <UIcon :name="item.icon" class="w-5 h-5" />
               <span class="flex-1 text-left">{{ item.label }}</span>
               <UBadge v-if="item.badge" size="xs" variant="solid" color="primary">
                 {{ item.badge }}
               </UBadge>
             </UButton>
           </div>

           <!-- 发布按钮 -->
           <UButton size="lg" color="primary" variant="solid" class="w-full gap-2">
             <UIcon name="i-heroicons-plus" class="w-5 h-5" />
             <span>发布</span>
           </UButton>

           <!-- 主题和语言切换 -->
           <div class="flex gap-2">
             <AppThemeToggle class="flex-1" />
             <AppLanguageSwitcher class="flex-1" />
           </div>

           <!-- 趋势话题 -->
           <UCard>
             <template #header>
               <h3 class="font-semibold">趋势话题</h3>
             </template>
             <div class="p-2 space-y-2">
               <div
                 v-for="(topic, index) in trendingTopics"
                 :key="index"
                 class="cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
               >
                 <p class="text-xs text-muted-foreground">{{ topic.category }} · 趋势</p>
                 <p class="font-medium text-sm">{{ topic.title }}</p>
                 <p class="text-xs text-muted-foreground">{{ topic.posts }} 条讨论</p>
               </div>
             </div>
           </UCard>

           <!-- Footer -->
           <div class="space-y-4 border-t pt-4">
             <div class="grid grid-cols-2 gap-2">
               <UButton variant="ghost" size="xs" class="justify-start">
                 <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-1" />
                 设置
               </UButton>
               <UButton variant="ghost" size="xs" class="justify-start">
                 <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4 mr-1" />
                 帮助
               </UButton>
               <UButton variant="ghost" size="xs" class="justify-start">
                 <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-1" />
                 隐私
               </UButton>
               <UButton variant="ghost" size="xs" class="justify-start">
                 <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-1" />
                 条款
               </UButton>
             </div>

             <div class="pt-4">
               <p class="text-xs text-muted-foreground text-center">
                 © 2025 Web3 Hub. All rights reserved.
               </p>
               <div class="flex items-center justify-center gap-2 mt-2">
                 <UButton variant="ghost" size="xs" square icon="i-simple-icons-github" />
                 <UButton variant="ghost" size="xs" square icon="i-simple-icons-twitter" />
                 <UButton variant="ghost" size="xs" square icon="i-simple-icons-discord" />
               </div>
             </div>
           </div>
         </div>
       </UCard>
     </USlideover>
   </template>
   ```

#### 5. **MobileBottomNav组件**
   ```vue
   <!-- app/components/layout/MobileBottomNav.vue -->
   <template>
     <nav class="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t md:hidden z-40">
       <div class="grid grid-cols-5 gap-1">
         <UButton
           v-for="item in navigationItems.slice(0, 5)"
           :key="item.to"
           :to="item.to"
           variant="ghost"
           color="neutral"
           size="sm"
           class="flex-col gap-1 h-16 rounded-none"
           :class="{ 'text-primary': currentPath === item.to }"
         >
           <UIcon :name="item.icon" class="w-5 h-5" />
           <span class="text-xs">{{ item.label }}</span>
         </UButton>
       </div>
     </nav>
   </template>
   ```

### 阶段4：Tailwind CSS样式实现

#### 主布局容器样式
```vue
<!-- app/layouts/default.vue 核心样式 -->
<template>
  <div class="min-h-screen bg-background">
    <!-- 固定Header，为内容预留空间 -->
    <FixedHeader />

    <!-- 主布局容器，处理不同断点 -->
    <div class="pt-16 h-screen">
      <!-- 移动端：单栏布局 -->
      <div class="md:hidden h-full">
        <main class="h-full pb-16">
          <slot />
        </main>
      </div>

      <!-- Pad端：两栏布局 -->
      <div class="hidden md:flex lg:hidden h-full">
        <LeftSidebar />
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>

      <!-- 小桌面端：两栏布局 -->
      <div class="hidden lg:flex xl:hidden h-full">
        <LeftSidebar />
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>

      <!-- 大桌面端：三栏布局 -->
      <div class="hidden xl:flex h-full">
        <LeftSidebar />
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
        <RightSidebar />
      </div>
    </div>

    <!-- Drawer，在非大桌面端显示 -->
    <MobileDrawer />
  </div>
</template>
```

#### 响应式工具类映射表
```css
/* Tailwind CSS 响应式工具类使用示例 */

/* 显示/隐藏 */
.hidden        { display: none; }
.block         { display: block; }
.flex          { display: flex; }
.grid          { display: grid; }

/* 响应式前缀 */
.sm:hidden     /* 小屏幕隐藏 */
.md:block      /* 中等屏幕显示 */
.lg:flex       /* 大屏幕弹性布局 */
.xl:grid       /* 超大屏幕网格布局 */

/* 布局系统 */
.grid-cols-1   { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2   { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-[280px_1fr_320px] { grid-template-columns: 280px 1fr 320px; }

/* 尺寸 */
.h-16          { height: 4rem; } /* 64px - Header高度 */
.h-full        { height: 100%; }
.w-5           { width: 1.25rem; } /* 20px */
.w-6           { width: 1.5rem; } /* 24px */
.w-8           { width: 2rem; } /* 32px */

/* 间距 */
.p-4           { padding: 1rem; } /* 16px */
.p-6           { padding: 1.5rem; } /* 24px */
.gap-2         { gap: 0.5rem; } /* 8px */
.gap-4         { gap: 1rem; } /* 16px */

/* 定位 */
.fixed         { position: fixed; }
.relative      { position: relative; }
.top-0         { top: 0px; }
.bottom-0      { bottom: 0px; }
.left-0        { left: 0px; }
.right-0       { right: 0px; }
.z-40          { z-index: 40; }
.z-50          { z-index: 50; }

/* 背景和边框 */
.bg-background { background-color: hsl(var(--background)); }
.border        { border-width: 1px; }
.border-t      { border-top-width: 1px; }
.border-r      { border-right-width: 1px; }
.border-l      { border-left-width: 1px; }

/* 溢出处理 */
.overflow-y-auto { overflow-y: auto; }
.overflow-hidden { overflow: hidden; }

/* 文本 */
.text-xs       { font-size: 0.75rem; line-height: 1rem; }
.text-sm       { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg       { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl       { font-size: 1.25rem; line-height: 1.75rem; }
.font-medium   { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }

/* 过渡动画 */
.transition-colors { transition-property: color, background-color, border-color; }
.duration-200     { transition-duration: 200ms; }
.duration-300     { transition-duration: 300ms; }
```

### 阶段5：功能完善（使用Tailwind CSS）

#### 1. **状态管理优化**
```typescript
// 使用Tailwind CSS断点结合VueUse
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  md: 768,
  lg: 1024,
  xl: 1280
})

// 响应式计算属性
const isMobile = computed(() => breakpoints.smaller('md').value)
const isTablet = computed(() => breakpoints.between('md', 'lg').value)
const isSmallDesktop = computed(() => breakpoints.between('lg', 'xl').value)
const isLargeDesktop = computed(() => breakpoints.greaterOrEqual('xl').value)

// Drawer状态
const isDrawerOpen = ref(false)

// 自动关闭Drawer逻辑
watch(isLargeDesktop, (newValue) => {
  if (newValue) {
    isDrawerOpen.value = false
  }
})
```

#### 2. **过渡动画使用Tailwind CSS**
```vue
<!-- Drawer动画 -->
<USlideover
  v-model="isDrawerOpen"
  class="transition-transform duration-300 ease-in-out"
/>

<!-- 按钮悬停效果 -->
<UButton
  class="transition-colors duration-200 hover:bg-primary/10"
/>

<!-- 卡片悬停效果 -->
<div class="hover:bg-muted rounded-lg transition-colors cursor-pointer">
```

#### 3. **可访问性使用Tailwind CSS**
```vue
<!-- 焦点管理 -->
<UButton
  class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
/>

<!-- 跳过链接 -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute">
  跳转到主内容
</a>

<!-- 语义化标签 + Tailwind样式 -->
<header class="fixed top-0 left-0 right-0 z-50">
<nav class="flex items-center">
<main id="main-content" class="flex-1">
<aside class="border-r">
```

## 验收标准

### 功能验收
1. **响应式布局**
   - [ ] 移动端（<768px）：单栏布局 + 底部导航 + Drawer
   - [ ] Pad端（768-1023px）：两栏布局 + 底部导航 + Drawer
   - [ ] 小桌面（1024-1279px）：两栏布局
   - [ ] 大桌面（≥1280px）：三栏布局 + 完整Header

2. **Tailwind CSS使用**
   - [ ] 完全使用Tailwind CSS工具类，无自定义CSS
   - [ ] 正确使用响应式前缀（sm:, md:, lg:, xl:）
   - [ ] 使用Tailwind CSS内置的颜色系统
   - [ ] 使用Tailwind CSS的过渡动画类

3. **组件显示逻辑**
   - [ ] Header：所有断点都显示，固定顶部
   - [ ] 左侧边栏：Pad和PC端显示（md:flex）
   - [ ] 右侧边栏：仅大桌面端显示（xl:flex）
   - [ ] 底部导航：仅移动端显示（md:hidden）
   - [ ] Drawer：非大桌面端显示（xl:hidden）

4. **按钮位置逻辑**
   - [ ] 主题切换：大桌面端在Header，其他端在Drawer
   - [ ] 语言切换：大桌面端在Header，其他端在Drawer

5. **Footer位置逻辑**
   - [ ] 大桌面端：在右侧边栏底部
   - [ ] 其他端：在Drawer内部底部

### 性能验收
1. **Tailwind CSS性能**
   - [ ] 未使用的Tailwind类被正确purge
   - [ ] CSS包体积合理（<50KB）
   - [ ] 响应式切换无明显卡顿

2. **交互性能**
   - [ ] 按钮点击响应时间 < 100ms
   - [ ] 页面切换无白屏
   - [ ] 滚动性能良好

### 兼容性验收
1. **Tailwind CSS兼容性**
   - [ ] 支持所有现代浏览器的CSS Grid和Flexbox
   - [ ] 响应式断点在所有设备正常工作
   - [ ] 深色模式切换正常

## 风险评估与应对

### Tailwind CSS相关风险
1. **断点设置不当**
   - 风险：断点选择不合理可能导致布局体验差
   - 应对：使用Tailwind默认断点，经过测试验证

2. **CSS包体积过大**
   - 风险：未正确配置purge导致CSS体积过大
   - 应对：使用Nuxt UI的预设配置，自动purge未使用的样式

3. **样式冲突**
   - 风险：Tailwind类名顺序可能导致样式覆盖
   - 应对：遵循Tailwind的CSS优先级规则，合理使用important

## 资源需求

### 开发资源
- 预计开发时间：4-6小时
- 测试时间：2-3小时
- 代码审查时间：1小时

### 技术资源
- Nuxt 4 开发环境
- Tailwind CSS v3配置
- 现代浏览器测试环境
- 多设备测试环境

## 交付清单

- [ ] 重构后的 `app/layouts/default.vue`（完全使用Tailwind CSS）
- [ ] 新增布局组件：
  - [ ] `app/components/layout/FixedHeader.vue`
  - [ ] `app/components/layout/LeftSidebar.vue`
  - [ ] `app/components/layout/RightSidebar.vue`
  - [ ] `app/components/layout/MobileDrawer.vue`
  - [ ] `app/components/layout/MobileBottomNav.vue`
- [ ] Tailwind CSS响应式样式实现
- [ ] 无自定义CSS文件（移除原有的`<style scoped>`）
- [ ] 功能测试报告
- [ ] 响应式测试报告
- [ ] Tailwind CSS性能分析报告

---

**规划修订时间**：2025-11-08
**预计完成时间**：2025-11-08
**负责人**：AI Assistant
**优先级**：高
**修订内容**：完全使用Tailwind CSS断点系统和工具类