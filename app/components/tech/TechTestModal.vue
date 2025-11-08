<script setup lang="ts">
interface TechTestModalProps {
  modelValue: boolean
  title: string
  testType: 'api' | 'database' | 'i18n' | 'system'
}

const props = defineProps<TechTestModalProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  test: [type: string]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const testResults = ref<string[]>([])
const isTestRunning = ref(false)
const testProgress = ref(0)

const getTestSteps = (type: string): string[] => {
  const testSteps = {
    api: [
      '连接到 tRPC 服务器',
      '验证认证状态',
      '测试查询接口',
      '测试变更接口',
      '验证响应时间'
    ],
    database: [
      '连接到数据库',
      '验证表结构',
      '测试读取操作',
      '测试写入操作',
      '验证数据完整性'
    ],
    i18n: [
      '加载语言文件',
      '验证翻译完整性',
      '测试语言切换',
      '验证日期格式化',
      '测试数字本地化'
    ],
    system: [
      '检查系统状态',
      '验证网络连接',
      '测试API响应时间',
      '检查内存使用',
      '验证系统配置'
    ]
  }

  return testSteps[type as keyof typeof testSteps] || []
}

const runTest = async () => {
  isTestRunning.value = true
  testResults.value = []
  testProgress.value = 0

  // 模拟测试过程
  const steps = getTestSteps(props.testType)

  for (let i = 0; i < steps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 800))

    testProgress.value = ((i + 1) / steps.length) * 100
    testResults.value.push(`✓ ${steps[i]}`)
  }

  isTestRunning.value = false
  emit('test', props.testType)
}

const closeModal = () => {
  isModalOpen.value = false
  testResults.value = []
  testProgress.value = 0
}
</script>

<template>
  <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-md' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            color="gray"
            size="sm"
            square
            @click="closeModal"
          />
        </div>
      </template>

      <div class="space-y-4">
        <!-- 测试进度条 -->
        <div v-if="isTestRunning || testResults.length > 0" class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">测试进度</span>
            <span class="font-mono text-gray-600 dark:text-gray-400">{{ Math.round(testProgress) }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="web3-gradient-bg h-2 rounded-full transition-all duration-500"
              :style="{ width: `${testProgress}%` }"
            ></div>
          </div>
        </div>

        <!-- 测试结果 -->
        <div v-if="testResults.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
          <div
            v-for="(result, index) in testResults"
            :key="index"
            class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 web3-fade-in"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ result }}</span>
          </div>
        </div>

        <!-- 测试按钮 -->
        <div v-if="!isTestRunning && testResults.length === 0" class="text-center py-4">
          <UIcon name="i-lucide-flask" class="w-12 h-12 text-violet-500 mx-auto mb-3" />
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            点击下方按钮开始{{ title }}测试
          </p>
        </div>

        <!-- 测试完成 -->
        <div v-if="!isTestRunning && testResults.length > 0" class="text-center py-4">
          <UIcon name="i-lucide-check-circle" class="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <p class="text-gray-900 dark:text-white font-medium mb-1">测试完成</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            所有测试项目均已通过验证
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton variant="outline" @click="closeModal">
            关闭
          </UButton>
          <UButton
            :loading="isTestRunning"
            :disabled="isTestRunning"
            class="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700"
            @click="runTest"
          >
            <UIcon v-if="!isTestRunning" name="i-lucide-play" class="w-4 h-4 mr-2" />
            {{ isTestRunning ? '测试中...' : '开始测试' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>