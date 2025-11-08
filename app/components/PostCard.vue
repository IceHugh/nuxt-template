<script setup lang="ts">
// 定义组件属性
interface Post {
  id: number
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  image?: string
}

interface Props {
  post: Post
}

defineProps<Props>()

// 定义事件
const emit = defineEmits<{
  like: [id: number]
  share: [id: number]
  comment: [id: number]
}>()

// 格式化内容（处理换行符）
const formatContent = (content: string) => {
  return content
    .split('\n')
    .map((line, index) => h('p', { key: index, class: index > 0 ? 'mt-2' : '' }, line))
}
</script>

<template>
  <UCard class="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div class="p-4">
      <!-- 作者信息 -->
      <div class="flex items-start gap-3">
        <UAvatar :src="post.author.avatar" :alt="post.author.name" size="md" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1">
            <h3 class="font-semibold text-sm">{{ post.author.name }}</h3>
            <span class="text-muted-foreground text-sm">@{{ post.author.username }}</span>
            <span class="text-muted-foreground text-sm">·</span>
            <span class="text-muted-foreground text-sm">{{ post.timestamp }}</span>
          </div>
        </div>
        <UButton variant="ghost" size="sm" square icon="i-heroicons-ellipsis-horizontal" />
      </div>

      <!-- 内容 -->
      <div class="mt-3 text-sm leading-relaxed">
        <component :is="() => formatContent(post.content)" />
      </div>

      <!-- 图片 -->
      <div v-if="post.image" class="mt-3">
        <img
          :src="post.image"
          :alt="`Post by ${post.author.name}`"
          class="rounded-lg w-full max-h-96 object-cover"
        />
      </div>

      <!-- 互动按钮 -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div class="flex items-center gap-1">
          <UButton
            variant="ghost"
            size="sm"
            :color="post.liked ? 'red' : 'neutral'"
            class="gap-2"
            @click="emit('like', post.id)"
          >
            <UIcon
              :name="post.liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
              class="w-4 h-4"
            />
            <span class="text-xs">{{ post.likes }}</span>
          </UButton>
        </div>

        <div class="flex items-center gap-1">
          <UButton
            variant="ghost"
            size="sm"
            color="neutral"
            class="gap-2"
            @click="emit('comment', post.id)"
          >
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4" />
            <span class="text-xs">{{ post.comments }}</span>
          </UButton>
        </div>

        <div class="flex items-center gap-1">
          <UButton
            variant="ghost"
            size="sm"
            color="neutral"
            class="gap-2"
            @click="emit('share', post.id)"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
            <span class="text-xs">{{ post.shares }}</span>
          </UButton>
        </div>

        <UButton variant="ghost" size="sm" color="neutral" square>
          <UIcon name="i-heroicons-bookmark" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
  </UCard>
</template>
