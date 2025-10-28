<template>
  <Card>
    <CardHeader>
      <CardTitle>tRPC API 测试</CardTitle>
      <CardDescription>测试 tRPC API 的类型安全调用</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Health Check -->
      <div class="space-y-2">
        <h4 class="font-medium">健康检查</h4>
        <Button
          @click="testHealth"
          :disabled="loading.health"
          variant="outline"
        >
          <Icon v-if="loading.health" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          测试 Health API
        </Button>
        <div v-if="result.health" class="p-3 bg-muted rounded-md">
          <pre class="text-sm">{{ JSON.stringify(result.health, null, 2) }}</pre>
        </div>
        <div v-if="error.health" class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p class="text-sm text-destructive">{{ error.health }}</p>
        </div>
      </div>

      <!-- Greeting -->
      <div class="space-y-2">
        <h4 class="font-medium">问候 API</h4>
        <div class="flex items-center space-x-2">
          <Input
            v-model="name"
            placeholder="输入你的名字"
            class="max-w-xs"
            @keyup.enter="testGreeting"
          />
          <Button
            @click="testGreeting"
            :disabled="loading.greeting"
            variant="outline"
          >
            <Icon v-if="loading.greeting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            发送问候
          </Button>
        </div>
        <div v-if="result.greeting" class="p-3 bg-muted rounded-md">
          <pre class="text-sm">{{ JSON.stringify(result.greeting, null, 2) }}</pre>
        </div>
        <div v-if="error.greeting" class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p class="text-sm text-destructive">{{ error.greeting }}</p>
        </div>
      </div>

      <!-- User Info -->
      <div class="space-y-2">
        <h4 class="font-medium">用户信息 API</h4>
        <div class="flex items-center space-x-2">
          <Input
            v-model="userId"
            placeholder="输入用户 ID"
            class="max-w-xs"
            @keyup.enter="testUserInfo"
          />
          <Button
            @click="testUserInfo"
            :disabled="loading.userInfo"
            variant="outline"
          >
            <Icon v-if="loading.userInfo" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            获取用户信息
          </Button>
        </div>
        <div v-if="result.userInfo" class="p-3 bg-muted rounded-md">
          <pre class="text-sm">{{ JSON.stringify(result.userInfo, null, 2) }}</pre>
        </div>
        <div v-if="error.userInfo" class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p class="text-sm text-destructive">{{ error.userInfo }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const name = ref("World");
const userId = ref("123");

const loading = reactive({
  health: false,
  greeting: false,
  userInfo: false,
});

const result = reactive({
  health: null as any,
  greeting: null as any,
  userInfo: null as any,
});

const error = reactive({
  health: "",
  greeting: "",
  userInfo: "",
});

const trpc = useTRPC();

const testHealth = async () => {
  loading.health = true;
  error.health = "";

  try {
    result.health = await trpc.health.query();
  } catch (err) {
    error.health = err instanceof Error ? err.message : "未知错误";
  } finally {
    loading.health = false;
  }
};

const testGreeting = async () => {
  loading.greeting = true;
  error.greeting = "";

  try {
    result.greeting = await trpc.greeting.query({ name: name.value });
  } catch (err) {
    error.greeting = err instanceof Error ? err.message : "未知错误";
  } finally {
    loading.greeting = false;
  }
};

const testUserInfo = async () => {
  loading.userInfo = true;
  error.userInfo = "";

  try {
    result.userInfo = await trpc.userInfo.query({ id: userId.value });
  } catch (err) {
    error.userInfo = err instanceof Error ? err.message : "未知错误";
  } finally {
    loading.userInfo = false;
  }
};

// 组件挂载时自动测试健康检查
onMounted(() => {
  testHealth();
});
</script>