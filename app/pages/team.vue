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
      <h2 class="text-2xl font-bold tracking-tight">{{ $t('navigation.team') }}</h2>
      <p class="text-muted-foreground">管理团队成员和权限</p>
    </div>

    <div class="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>团队成员</CardTitle>
          <CardDescription>查看和管理团队成员信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-center py-8">
            <Icon name="lucide:users" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p class="text-muted-foreground">团队成员列表和权限管理将在这里显示</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>