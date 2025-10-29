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
          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">{{ $t('utilities.vueuse.windowSize') }}</p>
              <p class="text-xs text-muted-foreground">
                {{ $t('utilities.vueuse.width') }}: {{ width }}px,
                {{ $t('utilities.vueuse.height') }}: {{ height }}px
              </p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">{{ $t('utilities.vueuse.windowSize') }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ $t('utilities.vueuse.width') }}: --px,
                  {{ $t('utilities.vueuse.height') }}: --px
                </p>
              </div>
            </template>
          </ClientOnly>

          <!-- useMouse -->
          <div class="p-3 bg-muted rounded-md">
            <p class="text-sm font-medium">{{ $t('utilities.vueuse.mousePosition') }}</p>
            <p class="text-xs text-muted-foreground">
              X: {{ Math.round(mouseX) }}, Y: {{ Math.round(mouseY) }}
            </p>
          </div>

          <!-- useDateFormat -->
          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">{{ $t('utilities.vueuse.currentTime') }}</p>
              <p class="text-xs text-muted-foreground">{{ formattedTime }}</p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">{{ $t('utilities.vueuse.currentTime') }}</p>
                <p class="text-xs text-muted-foreground">----年--月--日 --:--:--</p>
              </div>
            </template>
          </ClientOnly>

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
          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">{{ $t('utilities.dateFns.currentDate') }}</p>
              <p class="text-xs text-muted-foreground">{{ formatDate(new Date()) }}</p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">{{ $t('utilities.dateFns.currentDate') }}</p>
                <p class="text-xs text-muted-foreground">----年--月--日 --:--:--</p>
              </div>
            </template>
          </ClientOnly>

          <ClientOnly>
            <div class="p-3 bg-muted rounded-md">
              <p class="text-sm font-medium">{{ $t('utilities.dateFns.relativeTime') }}</p>
              <p class="text-xs text-muted-foreground">{{ formatRelative(new Date()) }}</p>
            </div>
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">{{ $t('utilities.dateFns.relativeTime') }}</p>
                <p class="text-xs text-muted-foreground">-- 前后</p>
              </div>
            </template>
          </ClientOnly>

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
          <ClientOnly>
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
            <template #fallback>
              <div class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">{{ $t('utilities.radash.arrayShuffle') }}</p>
                <p class="text-xs text-muted-foreground">--, --, --, --, --</p>
                <Button
                  variant="outline"
                  size="sm"
                  class="mt-2"
                  disabled
                >
                  {{ $t('buttons.shuffle') }}
                </Button>
              </div>
            </template>
          </ClientOnly>

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
          <ClientOnly>
            <p class="text-xs text-muted-foreground mt-2">
              {{ $t('utilities.comprehensive.lastUpdate') }}: {{ lastUpdateFormatted }}
            </p>
            <template #fallback>
              <p class="text-xs text-muted-foreground mt-2">
                {{ $t('utilities.comprehensive.lastUpdate') }}: ----年--月--日 --:--:--
              </p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { useDateFormat, useMouse, useToggle, useWindowSize } from "@vueuse/core";
import { addDays, format, formatDistanceToNow } from "date-fns";
import { camel, pick, shuffle } from "radash";

// 简单的 clamp 函数实现
const clampNumber = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

// VueUse composables
const { width, height } = useWindowSize();
const { x: mouseX, y: mouseY } = useMouse();
const _formattedTime = useDateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
const [_toggleValue, _toggle] = useToggle(false);

// 响应式数据
const counter = ref(0);
const lastUpdate = ref(new Date());
const testArray = ref([1, 2, 3, 4, 5]);
const shuffledArray = ref([...testArray.value]);

// 计算属性
const _addDaysToDate = computed(() => {
  return format(addDays(new Date(), 7), "yyyy-MM-dd");
});

const _formatRelative = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

const formatDate = (date: Date) => {
  return format(date, "yyyy年MM月dd日 HH:mm:ss");
};

const _daysDifference = computed(() => {
  const targetDate = addDays(new Date(), 30);
  return formatDistanceToNow(targetDate, { addSuffix: true });
});

const _selectedObject = computed(() => {
  const testObj = {
    name: "测试对象",
    value: 42,
    active: true,
    timestamp: new Date(),
  };
  return pick(testObj, ["name", "value"]);
});

const _camelCaseString = computed(() => {
  return camel("hello-world-example");
});

const _clampedNumber = computed(() => {
  return clampNumber(150, 0, 100);
});

const _lastUpdateFormatted = computed(() => {
  return formatDate(lastUpdate.value);
});

// 方法
const _increment = () => {
  counter.value++;
  lastUpdate.value = new Date();
};

const _decrement = () => {
  counter.value--;
  lastUpdate.value = new Date();
};

const _reset = () => {
  counter.value = 0;
  lastUpdate.value = new Date();
};

const shuffleArray = () => {
  shuffledArray.value = shuffle(testArray.value);
};

// 初始化
shuffleArray();
</script>