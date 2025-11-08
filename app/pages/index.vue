<script setup lang="ts">
// 设置页面标题
definePageMeta({
  title: 'Web3 Hub - 探索去中心化世界',
})

// 发布内容状态
const composeText = ref('')

// 模拟内容数据
const posts = ref([
  {
    id: 1,
    author: {
      name: 'Web3 Developer',
      username: 'web3dev',
      avatar: 'https://i.pravatar.cc/150?u=web3dev',
    },
    content:
      '刚刚完成了一个 DeFi 协议的智能合约审计！🔒\n\n发现了几个关键的优化点：\n• Gas 费用优化 30%\n• 安全性增强\n• 代码重构提升可读性\n\nWeb3 安全永远是第一位的！ #DeFi #SmartContract',
    timestamp: '2小时前',
    likes: 89,
    comments: 15,
    shares: 23,
    liked: false,
  },
  {
    id: 2,
    author: {
      name: 'Blockchain Enthusiast',
      username: 'blockchain_eth',
      avatar: 'https://i.pravatar.cc/150?u=blockchain',
    },
    content:
      '以太坊 Layer2 解决方案对比分析 📊\n\n🚀 Arbitrum: 生态最丰富\n⚡ Optimism: EVM 兼容性最佳\n💎 StarkNet: 原生支持账户抽象\n🌐 zkSync: 零知识证明技术领先\n\n各有优势，选择适合自己的才是最重要的。#Layer2 #Ethereum',
    timestamp: '5小时前',
    likes: 234,
    comments: 42,
    shares: 67,
    liked: true,
  },
])

// 发布功能
const publishPost = () => {
  if (composeText.value.trim()) {
    const newPost = {
      id: Date.now(),
      author: {
        name: 'Web3 User',
        username: 'web3_user',
        avatar: 'https://i.pravatar.cc/150?u=demo',
      },
      content: composeText.value,
      timestamp: '刚刚',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    }
    posts.value.unshift(newPost)
    composeText.value = ''
  }
}

// 点赞功能
const toggleLike = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
  }
}
</script>

<template>
  <div class="space-y-4 max-w-lg mx-auto">
    <!-- 发布框 -->
    <UCard>
      <div class="p-4">
        <div class="flex gap-3">
          <UAvatar src="https://i.pravatar.cc/150?u=demo" alt="Demo User" size="md" />
          <div class="flex-1">
            <UTextarea
              v-model="composeText"
              placeholder="分享你的 Web3 见解..."
              :rows="3"
              autoresize
              class="resize-none"
            />
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-2">
                <UButton icon="i-heroicons-photo" variant="ghost" size="sm" square />
                <UButton icon="i-heroicons-face-smile" variant="ghost" size="sm" square />
                <UButton icon="i-heroicons-chart-bar" variant="ghost" size="sm" square />
              </div>
              <UButton
                size="sm"
                :disabled="!composeText.trim()"
                color="primary"
                class="min-w-[80px]"
                @click="publishPost"
              >
                发布
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- 内容卡片列表 -->
    <div class="space-y-4">
      <UCard
        v-for="post in posts"
        :key="post.id"
        class="hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="p-4">
          <!-- 作者信息 -->
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-3">
              <UAvatar :src="post.author.avatar" :alt="post.author.name" size="md" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1 flex-wrap">
                  <h3 class="font-semibold text-sm">{{ post.author.name }}</h3>
                  <span class="text-muted-foreground text-sm">@{{ post.author.username }}</span>
                  <span class="text-muted-foreground text-sm">·</span>
                  <span class="text-muted-foreground text-sm">{{ post.timestamp }}</span>
                </div>
              </div>
            </div>
            <UButton variant="ghost" size="sm" square icon="i-heroicons-ellipsis-horizontal" />
          </div>

          <!-- 内容 -->
          <div class="mt-3 text-sm leading-relaxed whitespace-pre-line">
            {{ post.content }}
          </div>

          <!-- 互动按钮 -->
          <div class="flex items-center justify-between mt-4 pt-3 border-t">
            <div class="flex items-center gap-1">
              <UButton
                variant="ghost"
                size="sm"
                class="gap-2 px-3 py-2 rounded-full"
                @click="toggleLike(post.id)"
              >
                <UIcon
                  :name="post.liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                  class="w-4 h-4"
                />
                <span class="text-xs">{{ post.likes }}</span>
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                color="neutral"
                class="gap-2 px-3 py-2 rounded-full"
              >
                <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4" />
                <span class="text-xs">{{ post.comments }}</span>
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                color="neutral"
                class="gap-2 px-3 py-2 rounded-full"
              >
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
                <span class="text-xs">{{ post.shares }}</span>
              </UButton>

              <UButton variant="ghost" size="sm" color="neutral" class="p-2 rounded-full">
                <UIcon name="i-heroicons-bookmark" class="w-4 h-4" />
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 加载更多 -->
    <div class="text-center py-4">
      <UButton variant="ghost" color="neutral" size="lg" class="min-w-[160px]">
        加载更多内容
      </UButton>
    </div>
  </div>
</template>
