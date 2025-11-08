<script setup lang="ts">
const { locale, setLocale, availableLocales } = useI18n()

const isModalOpen = ref(false)
const i18nStatus = ref<'online' | 'offline' | 'warning'>('online')
const currentLanguage = computed(() => locale.value)
const languageCount = computed(() => availableLocales.length)

// 切换语言
const switchLanguage = () => {
  const currentIndex = availableLocales.indexOf(currentLanguage.value)
  const nextIndex = (currentIndex + 1) % availableLocales.length
  setLocale(availableLocales[nextIndex])
}

const handleTest = () => {
  isModalOpen.value = true
}

const handleTestComplete = () => {
  // 模拟语言切换作为测试结果
  switchLanguage()
}

// 获取语言显示名称
const getLanguageDisplayName = (code: string) => {
  const names: Record<string, string> = {
    en: 'English',
    zh: '简体中文',
  }
  return names[code] || code
}

// 检查i18n状态
const checkI18nStatus = () => {
  // 简单的状态检查逻辑
  if (availableLocales.length > 0) {
    i18nStatus.value = 'online'
  } else {
    i18nStatus.value = 'offline'
  }
}

onMounted(() => {
  checkI18nStatus()
})
</script>

<template>
  <div class="space-y-4">
    <TechStackCard
      title="i18n 国际化"
      description="完整的多语言支持系统，提供动态语言切换和本地化功能。"
      icon="i-lucide-globe"
      :status="i18nStatus"
      :badge="getLanguageDisplayName(currentLanguage)"
      action-label="切换语言"
      @action="handleTest"
    />

    <!-- 语言详细信息 -->
    <div class="grid grid-cols-2 gap-3 mt-4">
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-languages" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">支持语言</span>
        </div>
        <p class="font-mono text-sm font-semibold">{{ languageCount }} 种</p>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center gap-2 mb-1">
          <UIcon name="i-lucide-translate" class="w-4 h-4 text-gray-500" />
          <span class="text-xs text-gray-500">当前语言</span>
        </div>
        <p class="font-mono text-sm font-semibold">{{ getLanguageDisplayName(currentLanguage) }}</p>
      </div>
    </div>

    <!-- 语言切换按钮 -->
    <div class="flex gap-2">
      <button
        v-for="lang in availableLocales"
        :key="lang"
        class="flex-1 p-2 text-sm rounded-lg transition-all duration-200"
        :class="
          currentLanguage === lang
            ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-500/30'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        "
        @click="setLocale(lang)"
      >
        {{ getLanguageDisplayName(lang) }}
      </button>
    </div>

    <!-- i18n特性展示 -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">动态语言切换</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">本地化日期格式</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-check" class="w-4 h-4 text-emerald-500" />
        <span class="text-sm text-gray-700 dark:text-gray-300">RTL 语言支持</span>
      </div>
    </div>

    <!-- 测试模态框 -->
    <TechTestModal
      v-model="isModalOpen"
      title="i18n 国际化测试"
      test-type="i18n"
      @test="handleTestComplete"
    />
  </div>
</template>
