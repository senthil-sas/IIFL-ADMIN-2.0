<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    min: number; max: number; step?: number
    valueMin: number; valueMax: number
    fmt?: (n: number) => string
  }>(),
  { step: 1 }
)
const emit = defineEmits<{ (e: 'change', lo: number, hi: number): void }>()

const lo = computed(() => Math.max(props.min, Math.min(props.valueMin, props.valueMax)))
const hi = computed(() => Math.min(props.max, Math.max(props.valueMin, props.valueMax)))
const span = computed(() => props.max - props.min || 1)
const loPct = computed(() => ((lo.value - props.min) / span.value) * 100)
const hiPct = computed(() => ((hi.value - props.min) / span.value) * 100)

const onMin = (e: Event) => {
  const v = Math.min(parseFloat((e.target as HTMLInputElement).value), hi.value - props.step)
  emit('change', v, hi.value)
}
const onMax = (e: Event) => {
  const v = Math.max(parseFloat((e.target as HTMLInputElement).value), lo.value + props.step)
  emit('change', lo.value, v)
}
const label = (n: number) => (props.fmt ? props.fmt(n) : n.toLocaleString('en-IN'))
</script>

<template>
  <div class="rs-wrap">
    <div class="rs-track-row">
      <div class="rs-track" />
      <div class="rs-fill" :style="{ left: loPct + '%', right: 100 - hiPct + '%' }" />
      <input class="rs-input" type="range" :min="min" :max="max" :step="step" :value="lo" @input="onMin" :style="{ zIndex: lo > max - step * 5 ? 5 : 3 }" />
      <input class="rs-input" type="range" :min="min" :max="max" :step="step" :value="hi" @input="onMax" :style="{ zIndex: 4 }" />
    </div>
    <div class="rs-readout">
      <span>{{ label(min) }}</span>
      <span>{{ label(max) }}</span>
    </div>
  </div>
</template>
