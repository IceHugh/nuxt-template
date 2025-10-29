<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('sections.api.title') }}</CardTitle>
      <CardDescription>{{ $t('sections.api.description') }}</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Health Check -->
      <div class="space-y-2">
        <h4 class="font-medium">{{ $t('api.health.title') }}</h4>
        <p class="text-sm text-muted-foreground">{{ $t('api.health.description') }}</p>
        <Button
          @click="testHealth"
          :disabled="loading.health"
          variant="outline"
        >
          <Icon v-if="loading.health" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
          {{ $t('buttons.testHealthAPI') }}
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
        <h4 class="font-medium">{{ $t('api.greeting.title') }}</h4>
        <p class="text-sm text-muted-foreground">{{ $t('api.greeting.description') }}</p>
        <div class="flex items-center space-x-2">
          <Input
            v-model="name"
            :placeholder="$t('forms.namePlaceholder')"
            class="max-w-xs"
            @keyup.enter="testGreeting"
          />
          <Button
            @click="testGreeting"
            :disabled="loading.greeting"
            variant="outline"
          >
            <Icon v-if="loading.greeting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ $t('buttons.sendGreeting') }}
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
        <h4 class="font-medium">{{ $t('api.userInfo.title') }}</h4>
        <p class="text-sm text-muted-foreground">{{ $t('api.userInfo.description') }}</p>
        <div class="flex items-center space-x-2">
          <Input
            v-model="userId"
            :placeholder="$t('forms.userIdPlaceholder')"
            class="max-w-xs"
            @keyup.enter="testUserInfo"
          />
          <Button
            @click="testUserInfo"
            :disabled="loading.userInfo"
            variant="outline"
          >
            <Icon v-if="loading.userInfo" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            {{ $t('buttons.getUserInfo') }}
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
    error.health = err instanceof Error ? err.message : $t("api.error");
  } finally {
    loading.health = false;
  }
};

const _testGreeting = async () => {
  loading.greeting = true;
  error.greeting = "";

  try {
    result.greeting = await trpc.greeting.query({ name: name.value });
  } catch (err) {
    error.greeting = err instanceof Error ? err.message : $t("api.error");
  } finally {
    loading.greeting = false;
  }
};

const _testUserInfo = async () => {
  loading.userInfo = true;
  error.userInfo = "";

  try {
    result.userInfo = await trpc.userInfo.query({ id: userId.value });
  } catch (err) {
    error.userInfo = err instanceof Error ? err.message : $t("api.error");
  } finally {
    loading.userInfo = false;
  }
};

// 组件挂载时自动测试健康检查
onMounted(() => {
  testHealth();
});
</script>