<script setup lang="ts">
interface TrendingTopic {
  category: string
  title: string
  posts: number
}

interface Props {
  topics: TrendingTopic[]
  title?: string
}

const { topics, title } = withDefaults(defineProps<Props>(), {
  title: '趋势话题',
})

const emit = defineEmits<{
  select: [topic: TrendingTopic]
}>()

// 处理话题点击
const handleTopicSelect = (topic: TrendingTopic) => {
  emit('select', topic)
}

// 格式化讨论数量
const formatPostCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k 条讨论`
  }
  return `${count} 条讨论`
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-semibold">{{ title }}</h3>
    </template>
    <div class="p-2 space-y-2">
      <div
        v-for="(topic, index) in topics"
        :key="index"
        class="cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors duration-200"
        @click="handleTopicSelect(topic)"
      >
        <p class="text-xs text-muted-foreground">{{ topic.category }} · 趋势</p>
        <p class="font-medium text-sm">{{ topic.title }}</p>
        <p class="text-xs text-muted-foreground">{{ formatPostCount(topic.posts) }}</p>
      </div>
    </div>
  </UCard>
</template>