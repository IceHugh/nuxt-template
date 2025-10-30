<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- 带完整加载逻辑的猫咪加载页面 -->
    <LoadingWrapper :duration="3000" :allow-skip="true" />

    <!-- 主应用内容 -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>