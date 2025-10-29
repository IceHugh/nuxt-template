<script setup lang="ts">
// 设置页面标题
definePageMeta({
  title: 'Dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">{{ $t('navigation.dashboard') }}</h2>
      <p class="text-muted-foreground">欢迎来到 Nuxt 4 模板项目仪表盘</p>
    </div>

    <div class="grid gap-6">

          <!-- UI 组件展示区 -->
          <Card>
            <CardHeader>
              <CardTitle>{{ $t('sections.ui.title') }}</CardTitle>
              <CardDescription>{{ $t('sections.ui.description') }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <Button>{{ $t('buttons.default') }}</Button>
                <Button variant="secondary">{{ $t('buttons.secondary') }}</Button>
                <Button variant="outline">{{ $t('buttons.outline') }}</Button>
                <Button variant="ghost">{{ $t('buttons.ghost') }}</Button>
                <Button variant="destructive">{{ $t('buttons.destructive') }}</Button>
              </div>

              <div class="flex items-center space-x-2">
                <Input :placeholder="$t('forms.namePlaceholder')" class="max-w-xs" />
                <Button>{{ $t('buttons.submit') }}</Button>
              </div>
            </CardContent>
          </Card>

          <!-- 技术栈状态 -->
          <Card>
            <CardHeader>
              <CardTitle>{{ $t('sections.techStack.title') }}</CardTitle>
              <CardDescription>{{ $t('sections.techStack.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.tailwind') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.shadcn') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.darkMode') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.iconSystem') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.trpc') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.i18n') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.utilityLibs') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.biome') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span class="text-sm">{{ $t('techStackItems.deployment') }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- tRPC API 测试 -->
          <APITest />

          <!-- 响应式测试 -->
          <Card>
            <CardHeader>
              <CardTitle>{{ $t('sections.responsive.title') }}</CardTitle>
              <CardDescription>{{ $t('sections.responsive.description') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div class="bg-muted p-4 rounded-lg text-center">
                  <div class="text-lg font-semibold">{{ $t('responsive.mobile') }}</div>
                  <div class="text-sm text-muted-foreground">1 {{ $t('responsive.columns') }}</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center md:hidden">
                  <div class="text-lg font-semibold">{{ $t('responsive.tablet') }}</div>
                  <div class="text-sm text-muted-foreground">2 {{ $t('responsive.columns') }}</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center hidden md:block lg:hidden">
                  <div class="text-lg font-semibold">{{ $t('responsive.tablet') }}</div>
                  <div class="text-sm text-muted-foreground">2 {{ $t('responsive.columns') }}</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center hidden lg:block">
                  <div class="text-lg font-semibold">{{ $t('responsive.desktop') }}</div>
                  <div class="text-sm text-muted-foreground">4 {{ $t('responsive.columns') }}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Nuxt 4 应用组件演示 -->
          <DemoCounter />

          <!-- 工具库测试 -->
          <UtilityTest />

          <!-- 数据库调试面板 -->
          <DatabaseDebug />

        </div>
      </div>
</template>
