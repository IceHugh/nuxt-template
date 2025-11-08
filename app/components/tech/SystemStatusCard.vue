<script setup lang="ts">
const isModalOpen = ref(false)
const systemStatus = ref<'online' | 'offline' | 'warning'>('online')
const uptime = ref('2h 34m')
const memoryUsage = ref(67)
const cpuUsage = ref(23)
const networkSpeed = ref('1.2 Mbps')

// 模拟系统状态监控
const updateSystemStatus = () => {
  // 模拟随机数据变化
  memoryUsage.value = Math.floor(Math.random() * 30) + 50
  cpuUsage.value = Math.floor(Math.random() * 40) + 10

  // 随机网络速度
  const speed = (Math.random() * 5 + 0.5).toFixed(1)
  networkSpeed.value = `${speed} Mbps`

  // 随机状态变化
  const random = Math.random()
  if (random > 0.95) {
    systemStatus.value = 'warning'
  } else {
    systemStatus.value = 'online'
  }
}

// 计算运行时间
const calculateUptime = () => {
  // 模拟启动时间
  const startTime = new Date()
  startTime.setHours(startTime.getHours() - 2)
  startTime.setMinutes(startTime.getMinutes() - 34)

  const now = new Date()
  const diff = now.getTime() - startTime.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  uptime.value = `${hours}h ${minutes}m`
}

const handleTest = () => {
  isModalOpen.value = true
}

const handleTestComplete = () => {
  updateSystemStatus()
  calculateUptime()
}

// 定期更新状态
onMounted(() => {
  calculateUptime()
  updateSystemStatus()

  // 每5秒更新一次系统状态
  setInterval(updateSystemStatus, 5000)

  // 每分钟更新运行时间
  setInterval(calculateUptime, 60000)
})

// 获取状态颜色
const getStatusColor = (value: number, thresholds: { warning: number; danger: number }) => {
  if (value >= thresholds.danger) return 'text-rose-600'
  if (value >= thresholds.warning) return 'text-amber-600'
  return 'text-emerald-600'
}

// 获取进度条颜色
const getProgressColor = (value: number, thresholds: { warning: number; danger: number }) => {
  if (value >= thresholds.danger) return 'bg-rose-500'
  if (value >= thresholds.warning) return 'bg-amber-500'
  return 'bg-emerald-500'
}
</script>

<template>
  <div class="space-y-4">
    <TechStackCard
      title="系统状态"
      description="实时监控系统运行状态，包括性能指标、资源使用和健康检查。"
      icon="i-lucide-activity"
      :status="systemStatus"
      :badge="uptime"
      action-label="健康检查"
      @action="handleTest"
    />

    <!-- 系统指标 -->
    <div class="space-y-3">
      <!-- CPU 使用率 -->
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-cpu" class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">CPU 使用率</span>
          </div>
          <span :class="`text-sm font-semibold ${getStatusColor(cpuUsage, { warning: 70, danger: 90 })}`">
            {{ cpuUsage }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="getProgressColor(cpuUsage, { warning: 70, danger: 90 })"
            :style="{ width: `${cpuUsage}%` }"
          ></div>
        </div>
      </div>

      <!-- 内存使用率 -->
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-hard-drive" class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">内存使用</span>
          </div>
          <span :class="`text-sm font-semibold ${getStatusColor(memoryUsage, { warning: 80, danger: 95 })}`">
            {{ memoryUsage }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="getProgressColor(memoryUsage, { warning: 80, danger: 95 })"
            :style="{ width: `${memoryUsage}%` }"
          ></div>
        </div>
      </div>

      <!-- 网络速度 -->
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-wifi" class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">网络速度</span>
          </div>
          <span class="text-sm font-semibold text-blue-600">{{ networkSpeed }}</span>
        </div>
      </div>
    </div>

    <!-- 系统特性展示 -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">实时性能监控</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">自动健康检查</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">资源使用预警</span>
      </div>
    </div>

    <!-- 测试模态框 -->
    <TechTestModal
      v-model="isModalOpen"
      title="系统状态测试"
      test-type="system"
      @test="handleTestComplete"
    />
  </div>
</template>