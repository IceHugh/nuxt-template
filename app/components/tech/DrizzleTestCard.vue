<script setup lang="ts">
const isModalOpen = ref(false)
const dbStatus = ref<'online' | 'offline' | 'warning'>('online')
const dbType = ref('SQLite')
const recordCount = ref(1247)
const lastQueryTime = ref(3)

// 模拟数据库状态检查
const checkDbStatus = async () => {
  // 模拟数据库检查
  await new Promise(resolve => setTimeout(resolve, 800))

  // 随机生成状态（实际应用中应该真实检查）
  const random = Math.random()
  if (random > 0.9) {
    dbStatus.value = 'warning'
  } else {
    dbStatus.value = 'online'
  }

  // 模拟数据
  recordCount.value = Math.floor(Math.random() * 2000) + 500
  lastQueryTime.value = Math.floor(Math.random() * 10) + 1
}

const handleTest = () => {
  isModalOpen.value = true
}

const handleTestComplete = () => {
  checkDbStatus()
}

// 定期检查状态
onMounted(() => {
  checkDbStatus()
  setInterval(checkDbStatus, 60000) // 每分钟检查一次
})
</script>

<template>
  <div class="space-y-4">
    <TechStackCard
      title="Drizzle ORM"
      description="现代化的TypeScript ORM，提供类型安全的数据库操作和出色的性能表现。"
      icon="i-lucide-database"
      :status="dbStatus"
      :badge="dbType"
      action-label="查询测试"
      @action="handleTest"
    />

    <!-- 数据库详细信息 -->
    <div class="grid grid-cols-2 gap-3 mt-4">
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-layers" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">数据记录</span>
        </div>
        <p class="font-mono text-sm font-semibold">{{ recordCount.toLocaleString() }}</p>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-timer" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">查询时间</span>
        </div>
        <p class="font-mono text-sm font-semibold">{{ lastQueryTime }}ms</p>
      </div>
    </div>

    <!-- 数据库特性展示 -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">类型安全的查询</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">自动迁移管理</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">关系映射支持</span>
      </div>
    </div>

    <!-- 测试模态框 -->
    <TechTestModal
      v-model="isModalOpen"
      title="Drizzle ORM 测试"
      test-type="database"
      @test="handleTestComplete"
    />
  </div>
</template>