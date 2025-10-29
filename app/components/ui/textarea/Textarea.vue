<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const localValue = ref(props.modelValue ?? props.defaultValue ?? '');

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue ?? '';
});

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  localValue.value = target.value;
  emits('update:modelValue', target.value);
}
</script>

<template>
  <textarea
    :value="localValue"
    @input="onInput"
    :class="cn('flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  />
</template>
