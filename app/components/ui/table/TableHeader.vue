<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const _props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <thead :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
