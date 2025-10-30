<script setup lang="ts">
import { formatRelativeTime } from '~/utils/format'
// 使用应用特定的工具函数（自动导入）
const count = ref(0)
const lastUpdate = ref(new Date())
const randomId = ref('')

// 生成初始ID
onMounted(() => {
  randomId.value = generateId()
})

function increment() {
  count.value++
  lastUpdate.value = new Date()
}

function decrement() {
  count.value--
  lastUpdate.value = new Date()
}

function reset() {
  count.value = 0
  lastUpdate.value = new Date()
}

function generateNewId() {
  randomId.value = generateId()
}
</script>

<template>
  <div class="p-6 bg-muted rounded-lg">
    <h3 class="text-lg font-semibold mb-4">
      {{ $t('components.demoCounter.title') }}
    </h3>

    <div class="flex items-center space-x-4 mb-4">
      <Button variant="outline" size="icon" @click="decrement">
        <Icon name="lucide:minus" />
      </Button>

      <span class="text-2xl font-mono w-16 text-center">{{ count }}</span>

      <Button variant="outline" size="icon" @click="increment">
        <Icon name="lucide:plus" />
      </Button>
    </div>

    <div class="space-y-2 text-sm text-muted-foreground">
      <p>上一次更新: {{ formatRelativeTime(lastUpdate) }}</p>
      <p>随机ID: {{ randomId }}</p>
    </div>

    <div class="mt-4 flex space-x-2">
      <Button variant="secondary" size="sm" @click="reset"> 重置 </Button>
      <Button variant="ghost" size="sm" @click="generateNewId"> 生成新ID </Button>
    </div>
  </div>
</template>
