<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ label: string; value: number; color?: string }>(),
  { color: '' }
)

const v = computed(() => Math.max(0, Math.min(100, props.value)))
const barColor = computed(() =>
  v.value > 80 ? 'var(--rose)' : v.value > 60 ? 'var(--amber)' : props.color || 'var(--primary)'
)
</script>

<template>
  <div class="gauge">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <span class="label-mono" style="font-size:9px">{{ label }}</span>
      <span class="num" style="font-size:11px;font-weight:600">{{ value }}%</span>
    </div>
    <div class="bar"><span :style="{ width: v + '%', background: barColor }" /></div>
  </div>
</template>
