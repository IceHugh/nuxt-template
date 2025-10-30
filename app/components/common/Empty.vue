<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmptyVariants } from '.'
import { cn } from '~/lib/utils'
import { emptyVariants } from '.'

interface Props {
  class?: HTMLAttributes['class']
  layout?: EmptyVariants['layout']
  size?: EmptyVariants['size']
  title?: string
  description?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '暂无数据',
  description: '当前没有可显示的内容',
  icon: 'lucide:inbox',
})

defineEmits<{
  action: []
}>()
</script>

<template>
  <div :class="cn(emptyVariants({ layout, size }), props.class)" role="empty">
    <!-- 图标 -->
    <div
      v-if="icon || $slots.icon"
      class="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground"
      :class="{
        'mb-2': size === 'sm',
        'mb-6': size === 'lg',
        'mr-4 mb-0': layout === 'inline',
      }"
    >
      <slot name="icon">
        <Icon
          :name="icon"
          class="size-8"
          :class="{ 'size-6': size === 'sm', 'size-10': size === 'lg' }"
        />
      </slot>
    </div>

    <!-- 内容区域 -->
    <div class="flex flex-col items-center" :class="{ 'items-start': layout === 'inline' }">
      <!-- 标题 -->
      <h3
        v-if="title || $slots.title"
        class="font-semibold text-foreground mb-2"
        :class="{
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
        }"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h3>

      <!-- 描述 -->
      <p
        v-if="description || $slots.description"
        class="text-muted-foreground mb-4 max-w-sm"
        :class="{
          'text-xs mb-2': size === 'sm',
          'text-base mb-6': size === 'lg',
          'mb-0': layout === 'inline',
        }"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>

      <!-- 操作按钮 -->
      <div
        v-if="$slots.action"
        class="flex flex-wrap gap-2 justify-center"
        :class="{ 'justify-start': layout === 'inline' }"
      >
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
