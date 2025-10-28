<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- 主要内容 -->
    <main class="min-h-screen bg-background">
      <!-- 头部 -->
      <header class="border-b">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">Nuxt 4 模板项目</h1>
            <p class="text-muted-foreground mt-2">现代化技术栈集成测试</p>
          </div>
          <div class="flex items-center space-x-4">
            <ThemeToggle />
            <span class="text-sm text-muted-foreground">
              当前模式: {{ $colorMode.preference }}
            </span>
          </div>
        </div>
      </header>

      <!-- 内容区域 -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid gap-8">

          <!-- UI 组件展示区 -->
          <Card>
            <CardHeader>
              <CardTitle>UI 组件测试</CardTitle>
              <CardDescription>测试 shadcn-vue 基础组件</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <Button>默认按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </div>

              <div class="flex items-center space-x-2">
                <Input placeholder="测试输入框" class="max-w-xs" />
                <Button>提交</Button>
              </div>
            </CardContent>
          </Card>

          <!-- 技术栈状态 -->
          <Card>
            <CardHeader>
              <CardTitle>技术栈集成状态</CardTitle>
              <CardDescription>显示各个技术栈的集成进度</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Tailwind CSS V4</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">shadcn-vue</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Dark Mode</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">图标系统</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm">tRPC API</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span class="text-sm">多语言</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span class="text-sm">工具库</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span class="text-sm">Biome</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span class="text-sm">部署配置</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- tRPC API 测试 -->
          <APITest />

          <!-- 响应式测试 -->
          <Card>
            <CardHeader>
              <CardTitle>响应式设计测试</CardTitle>
              <CardDescription>测试不同屏幕尺寸下的布局</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div class="bg-muted p-4 rounded-lg text-center">
                  <div class="text-lg font-semibold">移动端</div>
                  <div class="text-sm text-muted-foreground">1 列</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center md:hidden">
                  <div class="text-lg font-semibold">平板端</div>
                  <div class="text-sm text-muted-foreground">2 列</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center hidden md:block lg:hidden">
                  <div class="text-lg font-semibold">平板端</div>
                  <div class="text-sm text-muted-foreground">2 列</div>
                </div>
                <div class="bg-muted p-4 rounded-lg text-center hidden lg:block">
                  <div class="text-lg font-semibold">桌面端</div>
                  <div class="text-sm text-muted-foreground">4 列</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  </div>
</template>
