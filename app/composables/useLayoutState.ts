import { ref, computed } from 'vue'

// 导航菜单数据 - 移到组件外部避免重复创建
const DEFAULT_NAVIGATION_ITEMS = [
  {
    label: '首页',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: '探索',
    icon: 'i-heroicons-magnifying-glass',
    to: '/explore',
  },
  {
    label: '通知',
    icon: 'i-heroicons-bell',
    to: '/notifications',
    badge: '3',
  },
  {
    label: '消息',
    icon: 'i-heroicons-envelope',
    to: '/messages',
  },
  {
    label: '列表',
    icon: 'i-heroicons-list-bullet',
    to: '/lists',
  },
  {
    label: '书签',
    icon: 'i-heroicons-bookmark',
    to: '/bookmarks',
  },
  {
    label: '个人资料',
    icon: 'i-heroicons-user',
    to: '/profile',
  },
  {
    label: '更多',
    icon: 'i-heroicons-ellipsis-horizontal',
    to: '/more',
  },
] as const

// 默认用户数据
const DEFAULT_USER = {
  name: 'Web3 User',
  username: '@web3user',
  avatar: 'https://i.pravatar.cc/150?u=web3user',
} as const

// 默认趋势话题
const DEFAULT_TRENDING_TOPICS = [
  { category: '科技', title: '#Web3.0', posts: 1280 },
  { category: 'DeFi', title: '#YieldFarming', posts: 892 },
  { category: 'NFT', title: '#DigitalArt', posts: 645 },
] as const

// 默认推荐用户
const DEFAULT_SUGGESTED_USERS = [
  { name: 'Web3 Developer', username: '@web3dev', avatar: 'https://i.pravatar.cc/150?u=web3dev' },
  { name: 'Blockchain Expert', username: '@blockchain', avatar: 'https://i.pravatar.cc/150?u=blockchain' },
  { name: 'NFT Artist', username: '@nftartist', avatar: 'https://i.pravatar.cc/150?u=nftartist' },
] as const

export function useLayoutState() {
  // 响应式状态
  const isRightDrawerOpen = ref(false)
  const isMobile = ref(false)
  const searchQuery = ref('')

  // 计算属性 - 优化导航项
  const navigationItems = computed(() =>
    DEFAULT_NAVIGATION_ITEMS.map(item => ({ ...item }))
  )

  // 用户信息
  const user = computed(() => ({ ...DEFAULT_USER }))

  // 趋势话题 - 使用 shallowRef 优化性能
  const trendingTopics = ref([...DEFAULT_TRENDING_TOPICS])

  // 推荐用户 - 使用 shallowRef 优化性能
  const suggestedUsers = ref([...DEFAULT_SUGGESTED_USERS])

  // 检测移动端 - 优化防抖
  let resizeTimer: NodeJS.Timeout | null = null
  const checkMobile = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }

    resizeTimer = setTimeout(() => {
      isMobile.value = window.innerWidth < 1024
      if (!isMobile.value) {
        isRightDrawerOpen.value = false
      }
    }, 100)
  }

  // 清理定时器
  const clearResizeTimer = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
      resizeTimer = null
    }
  }

  return {
    // 状态
    isRightDrawerOpen,
    isMobile,
    searchQuery,

    // 计算属性
    navigationItems,
    user,
    trendingTopics,
    suggestedUsers,

    // 方法
    checkMobile,
    clearResizeTimer,
  }
}