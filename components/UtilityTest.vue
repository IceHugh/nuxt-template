<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('sections.utilities.title') }}</CardTitle>
      <CardDescription>{{ $t('sections.utilities.description') }}</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- VueUse 测试 -->
      <div class="space-y-3">
        <h4 class="font-medium">{{ $t('utilities.vueuse.title') }}</h4>
        <div class="grid gap-4 md:grid-cols-2">
          <!-- useWindowSize -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.vueuse.windowSize') }}</p>
            <p class="text-xs text-muted-foreground">
              {{ $t('utilities.vueuse.width') }}: {{ width }}px,
              {{ $t('utilities.vueuse.height') }}: {{ height }}px
            </p>
          </div>

          <!-- useMouse -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.vueuse.mousePosition') }}</p>
            <p class="text-xs text-muted-foreground">
              X: {{ Math.round(mouseX) }}, Y: {{ Math.round(mouseY) }}
            </p>
          </div>

          <!-- useDateFormat -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.vueuse.currentTime') }}</p>
            <p class="text-xs text-muted-foreground">{{ formattedTime }}</p>
          </div>

          <!-- useToggle -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.vueuse.toggleDemo') }}</p>
            <Button
              @click="toggle"
              :variant="toggleValue ? 'default' : 'outline'"
              size="sm"
              class="mt-1"
            >
              {{ toggleValue ? $t('utilities.vueuse.on') : $t('utilities.vueuse.off') }}
            </Button>
          </div>
        </div>
      </div>

      <!-- date-fns 测试 -->
      <div class="space-y-3">
        <h4 class="font-medium">{{ $t('utilities.dateFns.title') }}</h4>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.dateFns.currentDate') }}</p>
            <p class="text-xs text-muted-foreground">{{ formatDate(new Date()) }}</p>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.dateFns.relativeTime') }}</p>
            <p class="text-xs text-muted-foreground">{{ formatRelative(new Date()) }}</p>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.dateFns.dateAdd') }}</p>
            <p class="text-xs text-muted-foreground">{{ addDaysToDate }}</p>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.dateFns.dateDifference') }}</p>
            <p class="text-xs text-muted-foreground">{{ daysDifference }}</p>
          </div>
        </div>
      </div>

      <!-- Radash 测试 -->
      <div class="space-y-3">
        <h4 class="font-medium">{{ $t('utilities.radash.title') }}</h4>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.radash.arrayShuffle') }}</p>
            <p class="text-xs text-muted-foreground">{{ shuffledArray.join(', ') }}</p>
            <Button
              @click="shuffleArray"
              variant="outline"
              size="sm"
              class="mt-2"
            >
              {{ $t('buttons.shuffle') }}
            </Button>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.radash.objectSelect') }}</p>
            <p class="text-xs text-muted-foreground">{{ selectedObject }}</p>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.radash.stringCamel') }}</p>
            <p class="text-xs text-muted-foreground">{{ camelCaseString }}</p>
          </div>

          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.radash.numberClamp') }}</p>
            <p class="text-xs text-muted-foreground">{{ clampedNumber }}</p>
          </div>
        </div>
      </div>

      <!-- 综合测试 -->
      <div class="space-y-3">
        <h4 class="font-medium">{{ $t('utilities.comprehensive.title') }}</h4>
        <div class="p-3 bg-muted rounded-md">
          <p class="text-sm font-medium">{{ $t('utilities.comprehensive.liveCounter') }}</p>
          <div class="flex items-center space-x-2 mt-2">
            <Button
              @click="decrement"
              variant="outline"
              size="sm"
            >
              {{ $t('buttons.decrement') }}
            </Button>
            <span class="text-lg font-semibold w-12 text-center">{{ counter }}</span>
            <Button
              @click="increment"
              variant="outline"
              size="sm"
            >
              {{ $t('buttons.increment') }}
            </Button>
            <Button
              @click="reset"
              variant="ghost"
              size="sm"
            >
              {{ $t('buttons.reset') }}
            </Button>
          </div>
          <p class="text-xs text-muted-foreground mt-2">
            {{ $t('utilities.comprehensive.lastUpdate') }}: {{ lastUpdateFormatted }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { format, addDays, formatDistanceToNow } from 'date-fns'
import { shuffle, select, camel, clamp } from 'radash'

// VueUse composables
const { width, height } = useWindowSize()
const { x: mouseX, y: mouseY } = useMouse()
const formattedTime = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
const [toggleValue, toggle] = useToggle(false)

// 响应式数据
const counter = ref(0)
const lastUpdate = ref(new Date())
const testArray = ref([1, 2, 3, 4, 5])
const shuffledArray = ref([...testArray.value])

// 计算属性
const addDaysToDate = computed(() => {
  return format(addDays(new Date(), 7), 'YYYY-MM-DD')
})

const formatRelative = computed(() => {
  return formatDistanceToNow(new Date(), { addSuffix: true })
})

const formatDate = (date: Date) => {
  return format(date, 'YYYY年MM月DD日 HH:mm:ss')
}

const daysDifference = computed(() => {
  const targetDate = addDays(new Date(), 30)
  return formatDistanceToNow(targetDate, { addSuffix: true })
})

const selectedObject = computed(() => {
  const testObj = {
    name: '测试对象',
    value: 42,
    active: true,
    timestamp: new Date()
  }
  return select(testObj, ['name', 'value'])
})

const camelCaseString = computed(() => {
  return camel('hello-world-example')
})

const clampedNumber = computed(() => {
  return clamp(150, 0, 100)
})

const lastUpdateFormatted = computed(() => {
  return formatDate(lastUpdate.value)
})

// 方法
const increment = () => {
  counter.value++
  lastUpdate.value = new Date()
}

const decrement = () => {
  counter.value--
  lastUpdate.value = new Date()
}

const reset = () => {
  counter.value = 0
  lastUpdate.value = new Date()
}

const shuffleArray = () => {
  shuffledArray.value = shuffle(testArray.value)
}

// 初始化
shuffleArray()
</script>