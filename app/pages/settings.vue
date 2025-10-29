<script setup lang="ts">
const { t } = useI18n();
// 设置页面布局和标题
definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="space-y-6 p-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">{{ $t('navigation.settings') }}</h2>
      <p class="text-muted-foreground">配置应用设置和偏好</p>
    </div>

    <div class="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>应用设置</CardTitle>
          <CardDescription>配置应用的各种设置选项</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-center py-8">
            <Icon name="lucide:settings" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p class="text-muted-foreground">应用设置和配置选项将在这里显示</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>