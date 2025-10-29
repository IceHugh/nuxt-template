<script setup lang="ts">
// 设置页面布局和标题
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="space-y-6 p-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">{{ $t('navigation.analytics') }}</h2>
      <p class="text-muted-foreground">查看应用数据分析和统计信息</p>
    </div>

    <div class="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>数据分析仪表盘</CardTitle>
          <CardDescription>显示各种关键指标和趋势分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-center py-8">
            <Icon name="lucide:bar-chart" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p class="text-muted-foreground">分析图表和统计数据将在这里显示</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>