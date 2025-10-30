<script setup lang="ts">
// 设置页面标题
definePageMeta({
  title: 'Dashboard',
})
</script>

<template>
  <div class="space-y-6">
    <!-- 组件测试区域 -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 class="text-lg font-semibold text-yellow-800 mb-2">🔧 组件调试区域</h3>
      <div class="space-y-2">
        <p class="text-sm text-yellow-700">测试 CopyButton 和 Empty 组件：</p>
        <div class="flex items-center gap-4">
          <CopyButton text="测试复制功能" />
          <Empty title="测试空状态" size="sm" layout="inline" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold tracking-tight">
        {{ $t('navigation.dashboard') }}
      </h2>
      <p class="text-muted-foreground">欢迎来到 Nuxt 4 模板项目仪表盘</p>
      <div class="mt-2">
        <span class="text-sm text-muted-foreground"> 访问任意不存在页面即可测试 404 错误页面 </span>
      </div>
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
            <Button variant="secondary">
              {{ $t('buttons.secondary') }}
            </Button>
            <Button variant="outline">
              {{ $t('buttons.outline') }}
            </Button>
            <Button variant="ghost">
              {{ $t('buttons.ghost') }}
            </Button>
            <Button variant="destructive">
              {{ $t('buttons.destructive') }}
            </Button>
          </div>

          <div class="flex items-center space-x-2">
            <Input :placeholder="$t('forms.namePlaceholder')" class="max-w-xs" />
            <Button>{{ $t('buttons.submit') }}</Button>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium">新组件示例：</span>
            </div>

            <!-- CopyButton 示例 -->
            <div class="flex items-center space-x-2">
              <div class="bg-muted p-3 rounded-md font-mono text-sm max-w-xs">
                npm install nuxt-icon
              </div>
              <CopyButton text="npm install nuxt-icon" size="sm" />
            </div>

            <!-- Empty 示例 -->
            <div class="border rounded-md p-4 max-w-xs">
              <Empty
                layout="inline"
                title="暂无内容"
                description="这里将显示新组件的示例"
                icon="lucide:sparkles"
                size="sm"
              />
            </div>
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
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.tailwind') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.shadcn') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.darkMode') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.iconSystem') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.trpc') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.i18n') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.utilityLibs') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.biome') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gray-300 rounded-full" />
              <span class="text-sm">{{ $t('techStackItems.deployment') }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- UI 组件完整展示 -->
      <Card>
        <CardHeader>
          <CardTitle>Shadcn-vue 组件库展示</CardTitle>
          <CardDescription>完整的组件测试和示例</CardDescription>
        </CardHeader>
        <CardContent class="space-y-8">
          <!-- Button 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Button 组件</h4>
            <p class="text-sm text-muted-foreground">测试不同样式的按钮</p>
            <div class="flex flex-wrap gap-2">
              <Button>默认按钮</Button>
              <Button variant="secondary"> 次要按钮 </Button>
              <Button variant="destructive"> 危险按钮 </Button>
              <Button variant="outline"> 边框按钮 </Button>
              <Button variant="ghost"> 幽灵按钮 </Button>
              <Button variant="link"> 链接按钮 </Button>
            </div>
          </div>

          <!-- Input 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Input 组件</h4>
            <p class="text-sm text-muted-foreground">测试输入框和标签</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label for="email">邮箱</Label>
                <Input id="email" type="email" placeholder="输入您的邮箱" />
              </div>
              <div>
                <Label for="password">密码</Label>
                <Input id="password" type="password" placeholder="输入您的密码" />
              </div>
            </div>
          </div>

          <!-- Badge 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Badge 组件</h4>
            <p class="text-sm text-muted-foreground">测试不同样式的徽章</p>
            <div class="flex flex-wrap gap-2">
              <Badge>默认</Badge>
              <Badge variant="secondary"> 次要 </Badge>
              <Badge variant="destructive"> 危险 </Badge>
              <Badge variant="outline"> 边框 </Badge>
            </div>
          </div>

          <!-- Alert 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Alert 组件</h4>
            <p class="text-sm text-muted-foreground">测试不同样式的警告</p>
            <div class="space-y-4">
              <Alert>
                <AlertTitle>信息提示</AlertTitle>
                <AlertDescription>这是一个默认的信息提示</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>错误提示</AlertTitle>
                <AlertDescription>这是一个错误提示信息</AlertDescription>
              </Alert>
            </div>
          </div>

          <!-- Tabs 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Tabs 组件</h4>
            <p class="text-sm text-muted-foreground">测试标签页</p>
            <Tabs default-value="tab1">
              <TabsList>
                <TabsTrigger value="tab1"> 标签页 1 </TabsTrigger>
                <TabsTrigger value="tab2"> 标签页 2 </TabsTrigger>
                <TabsTrigger value="tab3"> 标签页 3 </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" class="mt-4">
                <p>这是标签页 1 的内容</p>
              </TabsContent>
              <TabsContent value="tab2" class="mt-4">
                <p>这是标签页 2 的内容</p>
              </TabsContent>
              <TabsContent value="tab3" class="mt-4">
                <p>这是标签页 3 的内容</p>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Progress 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Progress 组件</h4>
            <p class="text-sm text-muted-foreground">测试进度条</p>
            <div class="space-y-2">
              <Progress :value="33" />
              <Progress :value="66" />
              <Progress :value="100" />
            </div>
          </div>

          <!-- CopyButton 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">CopyButton 组件</h4>
            <p class="text-sm text-muted-foreground">测试复制按钮功能</p>

            <div class="space-y-6">
              <div class="space-y-2">
                <p class="text-sm font-medium">不同样式的复制按钮：</p>
                <div class="flex flex-wrap gap-2">
                  <CopyButton text="这是默认样式的复制按钮" />
                  <CopyButton text="这是次要样式的复制按钮" variant="secondary" />
                  <CopyButton text="这是危险样式的复制按钮" variant="destructive" />
                  <CopyButton text="这是边框样式的复制按钮" variant="outline" />
                  <CopyButton text="这是幽灵样式的复制按钮" variant="ghost" />
                </div>
              </div>

              <div class="space-y-2">
                <p class="text-sm font-medium">不同尺寸的复制按钮：</p>
                <div class="flex flex-wrap items-center gap-2">
                  <CopyButton text="小尺寸按钮" size="sm" />
                  <CopyButton text="默认尺寸按钮" size="default" />
                  <CopyButton text="大尺寸按钮" size="lg" />
                  <CopyButton text="图标尺寸" size="icon" />
                </div>
              </div>

              <div class="space-y-2">
                <p class="text-sm font-medium">实际使用示例：</p>
                <div class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <div class="bg-muted p-3 rounded-md font-mono text-sm max-w-xs">
                      npm install vue
                    </div>
                    <CopyButton text="npm install vue" />
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="bg-muted p-3 rounded-md font-mono text-sm max-w-xs">
                      const message = "Hello World"
                    </div>
                    <CopyButton
                      text="const message = 'Hello World'"
                      size="icon"
                      variant="outline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty 组件测试 -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-foreground">Empty 组件</h4>
            <p class="text-sm text-muted-foreground">测试空状态展示</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h5 class="text-sm font-medium">基础布局</h5>
                <div class="space-y-4">
                  <div>
                    <p class="text-xs text-muted-foreground mb-2">卡片式布局（默认）</p>
                    <Empty
                      title="暂无数据"
                      description="当前列表中没有可显示的项目"
                      icon="lucide:package"
                    />
                  </div>

                  <div>
                    <p class="text-xs text-muted-foreground mb-2">全幅式布局</p>
                    <Empty
                      layout="full"
                      title="没有搜索结果"
                      description="尝试调整搜索关键词或筛选条件"
                      icon="lucide:search"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h5 class="text-sm font-medium">特殊布局</h5>
                <div class="space-y-4">
                  <div>
                    <p class="text-xs text-muted-foreground mb-2">内联式布局</p>
                    <Empty
                      layout="inline"
                      title="没有选中项"
                      description="请从列表中选择一个项目"
                      icon="lucide:mouse-pointer"
                      size="sm"
                    />
                  </div>

                  <div>
                    <p class="text-xs text-muted-foreground mb-2">带操作按钮</p>
                    <Empty
                      title="还没有项目"
                      description="创建您的第一个项目开始使用"
                      icon="lucide:folder-plus"
                    >
                      <template #action>
                        <Button size="sm"> 创建项目 </Button>
                        <Button size="sm" variant="outline"> 了解更多 </Button>
                      </template>
                    </Empty>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h5 class="text-sm font-medium">高级示例</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-muted-foreground mb-2">自定义图标和内容</p>
                  <Empty
                    title="API 调用失败"
                    description="请检查网络连接或稍后重试"
                    icon="lucide:wifi-off"
                  >
                    <template #icon>
                      <Icon name="lucide:alert-circle" class="size-8 text-orange-500" />
                    </template>
                    <template #action>
                      <Button size="sm" variant="outline"> 重试 </Button>
                    </template>
                  </Empty>
                </div>

                <div>
                  <p class="text-xs text-muted-foreground mb-2">大尺寸布局</p>
                  <Empty
                    layout="card"
                    size="lg"
                    title="欢迎开始！"
                    description="这里是您的内容区域，当没有数据时会显示空状态"
                    icon="lucide:sparkles"
                  >
                    <template #action>
                      <Button>开始使用</Button>
                    </template>
                  </Empty>
                </div>
              </div>
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
              <div class="text-lg font-semibold">
                {{ $t('responsive.mobile') }}
              </div>
              <div class="text-sm text-muted-foreground">1 {{ $t('responsive.columns') }}</div>
            </div>
            <div class="bg-muted p-4 rounded-lg text-center md:hidden">
              <div class="text-lg font-semibold">
                {{ $t('responsive.tablet') }}
              </div>
              <div class="text-sm text-muted-foreground">2 {{ $t('responsive.columns') }}</div>
            </div>
            <div class="bg-muted p-4 rounded-lg text-center hidden md:block lg:hidden">
              <div class="text-lg font-semibold">
                {{ $t('responsive.tablet') }}
              </div>
              <div class="text-sm text-muted-foreground">2 {{ $t('responsive.columns') }}</div>
            </div>
            <div class="bg-muted p-4 rounded-lg text-center hidden lg:block">
              <div class="text-lg font-semibold">
                {{ $t('responsive.desktop') }}
              </div>
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
