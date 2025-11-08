<script setup lang="ts">
const isModalOpen = ref(false)
const apiStatus = ref<'online' | 'offline' | 'warning'>('online')
const responseTime = ref(12)
const lastCheckTime = ref(new Date())

// 模拟API状态检查
const checkApiStatus = async () => {
  // 模拟API检查
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 随机生成状态（实际应用中应该真实检查）
  const random = Math.random()
  if (random > 0.8) {
    apiStatus.value = 'warning'
    responseTime.value = Math.floor(Math.random() * 100) + 50
  } else {
    apiStatus.value = 'online'
    responseTime.value = Math.floor(Math.random() * 30) + 5
  }

  lastCheckTime.value = new Date()
}

const handleTest = () => {
  isModalOpen.value = true
}

const handleTestComplete = () => {
  checkApiStatus()
}

// 定期检查状态
onMounted(() => {
  checkApiStatus()
  setInterval(checkApiStatus, 30000) // 每30秒检查一次
})
</script>

<template>
  <div class="space-y-4">
    <TechStackCard
      title="tRPC API"
      description="类型安全的API通信框架，提供端到端的类型推断和自动完成功能。"
      icon="i-lucide-zap"
      :status="apiStatus"
      :badge="`${responseTime}ms`"
      action-label="测试连接"
      @action="handleTest"
    />

    <!-- API详细信息 -->
    <div class="grid grid-cols-2 gap-3 mt-4">
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-clock" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">响应时间</span>
        </div>
        <p class="font-mono text-sm font-semibold">{{ responseTime }}ms</p>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">最后检查</span>
        </div>
        <p class="font-mono text-sm">{{ lastCheckTime.toLocaleTimeString() }}</p>
      </div>
    </div>

    <!-- API特性展示 -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">端到端类型安全</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">自动类型推断</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">实时数据同步</span>
      </div>
    </div>

    <!-- 测试模态框 -->
    <TechTestModal
      v-model="isModalOpen"
      title="tRPC API 测试"
      test-type="api"
      @test="handleTestComplete"
    />
  </div>
</template>
