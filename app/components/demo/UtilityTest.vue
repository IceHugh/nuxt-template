<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

// 原生 useWindowSize 实现
const width = ref(0)
const height = ref(0)

function updateWindowSize() {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

// 原生 useMouse 实现
const mouseX = ref(0)
const mouseY = ref(0)

function updateMousePosition(event: MouseEvent) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

// 原生 useDateFormat 实现
const formattedTime = ref('')

function updateTime() {
  const now = new Date()
  formattedTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 原生 useToggle 实现
const toggleValue = ref(false)

// 响应式数据
const count = ref(0)
const doubled = computed(() => count.value * 2)

const userInfo = reactive({
  name: '张三',
  age: 25,
})

const items = ref(['项目1', '项目2', '项目3'])

// 工具函数
const randomId = ref('')
function generateNewId() {
  randomId.value =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const relativeTime = ref('')
const absoluteTime = ref('')

function updateTimes() {
  const now = new Date()

  // 相对时间格式化（简化版）
  const diff = now.getTime() - new Date().setHours(0, 0, 0, 0)
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    relativeTime.value = `${hours}小时前`
  } else if (minutes > 0) {
    relativeTime.value = `${minutes}分钟前`
  } else {
    relativeTime.value = '刚刚'
  }

  absoluteTime.value = now.toLocaleString('zh-CN')
}

// 生命周期
onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)

  window.addEventListener('mousemove', updateMousePosition)

  updateTime()
  const timeInterval = setInterval(updateTime, 1000)

  generateNewId()
  updateTimes()
  const timesInterval = setInterval(updateTimes, 60000) // 每分钟更新一次

  // 清理函数将在 onUnmounted 中调用
  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
    window.removeEventListener('mousemove', updateMousePosition)
    clearInterval(timeInterval)
    clearInterval(timesInterval)
  })
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('sections.utilities.title') }}</CardTitle>
      <CardDescription>{{ $t('sections.utilities.description') }}</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Vue 原生功能测试 -->
      <div class="space-y-3">
        <h4 class="font-medium">
          {{ $t('utilities.vueuse.title') }}
        </h4>
        <div class="grid gap-4 md:grid-cols-2">
          <!-- useWindowSize - 原生实现 -->
          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">
                {{ $t('utilities.vueuse.windowSize') }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ $t('utilities.vueuse.width') }}: {{ width }}px,
                {{ $t('utilities.vueuse.height') }}: {{ height }}px
              </p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">
                  {{ $t('utilities.vueuse.windowSize') }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ $t('utilities.vueuse.width') }}: --px, {{ $t('utilities.vueuse.height') }}:
                  --px
                </p>
              </div>
            </template>
          </ClientOnly>

          <!-- useMouse - 原生实现 -->
          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">
                {{ $t('utilities.vueuse.mousePosition') }}
              </p>
              <p class="text-xs text-muted-foreground">X: {{ mouseX }}, Y: {{ mouseY }}</p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">
                  {{ $t('utilities.vueuse.mousePosition') }}
                </p>
                <p class="text-xs text-muted-foreground">X: --, Y: --</p>
              </div>
            </template>
          </ClientOnly>

          <!-- useDateFormat - 原生实现 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.vueuse.currentTime') }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ formattedTime }}
            </p>
          </div>

          <!-- useToggle - 原生实现 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.vueuse.toggle') }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <Button
                size="sm"
                :variant="toggleValue ? 'default' : 'outline'"
                @click="toggleValue = !toggleValue"
              >
                {{ toggleValue ? $t('utilities.vueuse.on') : $t('utilities.vueuse.off') }}
              </Button>
              <span class="text-xs text-muted-foreground">
                {{ $t('utilities.vueuse.status') }}: {{ toggleValue }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 响应式数据 -->
      <div class="space-y-3">
        <h4 class="font-medium">
          {{ $t('utilities.reactive.title') }}
        </h4>
        <div class="grid gap-4 md:grid-cols-2">
          <!-- 响应式计数器 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.reactive.counter') }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <Button size="sm" variant="outline" @click="count--"> - </Button>
              <span class="text-sm font-mono w-8 text-center">{{ count }}</span>
              <Button size="sm" variant="outline" @click="count++"> + </Button>
              <Button size="sm" variant="ghost" @click="count = 0"> 重置 </Button>
            </div>
          </div>

          <!-- 计算属性 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.reactive.computed') }}
            </p>
            <p class="text-xs text-muted-foreground mt-1">计数 x 2 = {{ doubled }}</p>
            <p class="text-xs text-muted-foreground">计数是{{ count > 5 ? '大数' : '小数' }}</p>
          </div>

          <!-- 响应式对象 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.reactive.object') }}
            </p>
            <div class="text-xs text-muted-foreground mt-1 space-y-1">
              <p>姓名: {{ userInfo.name }}</p>
              <p>年龄: {{ userInfo.age }}</p>
              <Button size="sm" variant="outline" class="mt-1" @click="userInfo.age++">
                增加年龄
              </Button>
            </div>
          </div>

          <!-- 数组操作 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">
              {{ $t('utilities.reactive.array') }}
            </p>
            <div class="text-xs text-muted-foreground mt-1">
              <p>项目数: {{ items.length }}</p>
              <p>第一项: {{ items[0] || '空' }}</p>
              <div class="flex gap-1 mt-1">
                <Button size="sm" variant="outline" @click="items.push(`项目${items.length + 1}`)">
                  添加
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  :disabled="items.length === 0"
                  @click="items.pop()"
                >
                  删除
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具函数展示 -->
      <div class="space-y-3">
        <h4 class="font-medium">
          {{ $t('utilities.functions.title') }}
        </h4>
        <div class="grid gap-4 md:grid-cols-2">
          <!-- 生成ID -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">生成随机ID</p>
            <div class="text-xs text-muted-foreground mt-1">
              <p class="font-mono break-all">
                {{ randomId }}
              </p>
              <Button size="sm" variant="outline" class="mt-1" @click="generateNewId">
                生成新ID
              </Button>
            </div>
          </div>

          <!-- 时间格式化 -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">时间格式化</p>
            <div class="text-xs text-muted-foreground mt-1">
              <p>相对时间: {{ relativeTime }}</p>
              <p>格式化: {{ absoluteTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
