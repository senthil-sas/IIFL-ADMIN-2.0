<script setup lang="ts">
import { ICON_PATHS } from './icon-paths'

withDefaults(
  defineProps<{
    name: string
    size?: number
    stroke?: number
  }>(),
  { size: 16, stroke: 1.5 }
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="ICON_PATHS[name] ?? ''"
  />
</template>
