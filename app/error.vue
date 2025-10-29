<!-- 全局错误页面 -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center max-w-md mx-auto p-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">
        {{ error.statusCode }}
      </h1>
      <p class="text-lg text-muted-foreground mb-6">
        {{ error.statusMessage || '页面出现错误' }}
      </p>
      <Button @click="handleError" variant="outline">
        返回首页
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const _props = defineProps({
  error: Object,
});

const _handleError = () => clearError({ redirect: "/" });
</script>