<template>
  <div class="p-6 bg-muted rounded-lg">
    <h3 class="text-lg font-semibold mb-4">{{ $t('components.demoCounter.title') }}</h3>

    <div class="flex items-center space-x-4 mb-4">
      <Button @click="decrement" variant="outline" size="icon">
        <Icon name="lucide:minus" />
      </Button>

      <span class="text-2xl font-mono w-16 text-center">{{ count }}</span>

      <Button @click="increment" variant="outline" size="icon">
        <Icon name="lucide:plus" />
      </Button>
    </div>

    <div class="space-y-2 text-sm text-muted-foreground">
      <p>上一次更新: {{ formatRelativeTime(lastUpdate) }}</p>
      <p>随机ID: {{ randomId }}</p>
    </div>

    <div class="mt-4 flex space-x-2">
      <Button @click="reset" variant="secondary" size="sm">
        重置
      </Button>
      <Button @click="generateNewId" variant="ghost" size="sm">
        生成新ID
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用应用特定的工具函数（自动导入）
const count = ref(0);
const lastUpdate = ref(new Date());
const randomId = ref("");

// 生成初始ID
onMounted(() => {
  randomId.value = generateId();
});

const increment = () => {
  count.value++;
  lastUpdate.value = new Date();
};

const decrement = () => {
  count.value--;
  lastUpdate.value = new Date();
};

const reset = () => {
  count.value = 0;
  lastUpdate.value = new Date();
};

const generateNewId = () => {
  randomId.value = generateId();
};
</script>