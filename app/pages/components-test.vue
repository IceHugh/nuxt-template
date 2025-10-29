<template>
  <div class="container mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-6">Shadcn-vue 组件测试</h1>

    <!-- Button 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Button 组件</CardTitle>
        <CardDescription>测试不同样式的按钮</CardDescription>
      </CardHeader>
      <CardContent class="space-x-2">
        <Button>默认按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="destructive">危险按钮</Button>
        <Button variant="outline">边框按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
        <Button variant="link">链接按钮</Button>
      </CardContent>
    </Card>

    <!-- Input 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Input 组件</CardTitle>
        <CardDescription>测试输入框和标签</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Label for="email">邮箱</Label>
          <Input id="email" type="email" placeholder="输入您的邮箱" />
        </div>
        <div>
          <Label for="password">密码</Label>
          <Input id="password" type="password" placeholder="输入您的密码" />
        </div>
      </CardContent>
    </Card>

    <!-- Badge 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Badge 组件</CardTitle>
        <CardDescription>测试不同样式的徽章</CardDescription>
      </CardHeader>
      <CardContent class="space-x-2">
        <Badge>默认</Badge>
        <Badge variant="secondary">次要</Badge>
        <Badge variant="destructive">危险</Badge>
        <Badge variant="outline">边框</Badge>
      </CardContent>
    </Card>

    <!-- Alert 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Alert 组件</CardTitle>
        <CardDescription>测试不同样式的警告</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <Alert>
          <AlertTitle>信息提示</AlertTitle>
          <AlertDescription>这是一个默认的信息提示</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>错误提示</AlertTitle>
          <AlertDescription>这是一个错误提示信息</AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    <!-- Tabs 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Tabs 组件</CardTitle>
        <CardDescription>测试标签页</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">标签页 1</TabsTrigger>
            <TabsTrigger value="tab2">标签页 2</TabsTrigger>
            <TabsTrigger value="tab3">标签页 3</TabsTrigger>
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
      </CardContent>
    </Card>

    <!-- Progress 组件测试 -->
    <Card>
      <CardHeader>
        <CardTitle>Progress 组件</CardTitle>
        <CardDescription>测试进度条</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress :value="33" />
        <Progress :value="66" class="mt-2" />
        <Progress :value="100" class="mt-2" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
// 页面标题
useHead({
  title: "Shadcn-vue 组件测试",
});
</script>