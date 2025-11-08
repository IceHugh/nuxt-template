<script setup lang="ts">
// 设置页面元数据
definePageMeta({
  title: '探索 - Web3 Hub',
  layout: 'default',
})

// 模拟探索内容数据
const exploreContent = ref([
  {
    id: 1,
    title: 'DeFi 协议安全性分析',
    description: '深入分析当前流行的 DeFi 协议安全机制，包括审计报告、漏洞分析和最佳实践建议。',
    image: 'https://picsum.photos/seed/defi-security/400/250.jpg',
    category: 'DeFi',
    readTime: '5 分钟阅读',
    likes: 342,
    views: 1500,
  },
  {
    id: 2,
    title: 'Layer2 扩容方案对比',
    description:
      '全面对比以太坊主流 Layer2 解决方案，包括 Optimistic Rollups、ZK-Rollups 等技术细节。',
    image: 'https://picsum.photos/seed/layer2-comparison/400/250.jpg',
    category: 'Layer2',
    readTime: '8 分钟阅读',
    likes: 567,
    views: 2300,
  },
  {
    id: 3,
    title: 'NFT 市场趋势报告',
    description: '2024年 NFT 市场最新趋势分析，涵盖艺术、游戏、元宇宙等多个领域的创新应用。',
    image: 'https://picsum.photos/seed/nft-trends/400/250.jpg',
    category: 'NFT',
    readTime: '6 分钟阅读',
    likes: 289,
    views: 1200,
  },
])

// 热门标签
const trendingTags = [
  { name: 'DeFi', count: '12.5K' },
  { name: 'Layer2', count: '8.2K' },
  { name: 'NFT', count: '6.7K' },
  { name: 'Web3', count: '15.3K' },
  { name: '智能合约', count: '9.1K' },
  { name: 'DAO', count: '4.5K' },
]

// 搜索和筛选状态
const searchQuery = ref('')
const selectedCategory = ref('全部')
const loadingMore = ref(false)

// 加载更多功能
const loadMore = async () => {
  loadingMore.value = true
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  loadingMore.value = false
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- 页面标题区域 -->
    <div class="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
      <div class="px-4 py-4">
        <h1 class="text-xl font-bold">探索</h1>
        <p class="text-sm text-muted-foreground">发现 Web3 世界的精彩内容</p>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="p-4 space-y-4">
      <!-- 搜索框 -->
      <div class="relative">
        <UInput
          v-model="searchQuery"
          placeholder="搜索感兴趣的内容..."
          size="lg"
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </div>

      <!-- 热门标签 -->
      <div class="space-y-2">
        <h3 class="text-sm font-semibold text-muted-foreground">热门话题</h3>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in trendingTags"
            :key="tag.name"
            variant="outline"
            class="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
          >
            {{ tag.name }}
            <span class="ml-1 text-xs opacity-70">{{ tag.count }}</span>
          </UBadge>
        </div>
      </div>

      <!-- 内容分类标签 -->
      <div class="flex gap-2 overflow-x-auto pb-2">
        <UButton
          v-for="category in ['全部', 'DeFi', 'Layer2', 'NFT', 'Web3', 'DAO']"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'outline'"
          size="sm"
          class="whitespace-nowrap"
          @click="selectedCategory = category"
        >
          {{ category }}
        </UButton>
      </div>
    </div>

    <!-- 内容列表 -->
    <div class="px-4 pb-20">
      <div class="space-y-4">
        <UCard
          v-for="item in exploreContent"
          :key="item.id"
          class="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- 图片区域 -->
            <div class="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden bg-muted">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute top-2 left-2">
                <UBadge variant="outline" size="xs">
                  {{ item.category }}
                </UBadge>
              </div>
            </div>

            <!-- 内容区域 -->
            <div class="flex-1 space-y-2">
              <h3 class="font-semibold text-lg line-clamp-2">{{ item.title }}</h3>
              <p class="text-sm text-muted-foreground line-clamp-3">
                {{ item.description }}
              </p>

              <!-- 元信息 -->
              <div class="flex items-center gap-4 text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="w-3 h-3" />
                  {{ item.readTime }}
                </span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-eye" class="w-3 h-3" />
                  {{ item.views }}
                </span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-heart" class="w-3 h-3" />
                  {{ item.likes }}
                </span>
              </div>

              <!-- 操作按钮 -->
              <div class="flex items-center gap-2 pt-2">
                <UButton size="xs" variant="ghost" color="neutral">
                  <UIcon name="i-heroicons-heart" class="w-4 h-4" />
                  <span class="ml-1">喜欢</span>
                </UButton>
                <UButton size="xs" variant="ghost" color="neutral">
                  <UIcon name="i-heroicons-bookmark" class="w-4 h-4" />
                  <span class="ml-1">收藏</span>
                </UButton>
                <UButton size="xs" variant="ghost" color="neutral">
                  <UIcon name="i-heroicons-share" class="w-4 h-4" />
                  <span class="ml-1">分享</span>
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 加载更多 -->
      <div class="flex justify-center mt-8">
        <UButton variant="outline" :loading="loadingMore" @click="loadMore">
          {{ loadingMore ? '加载中...' : '加载更多' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
