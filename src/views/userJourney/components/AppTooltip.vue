<template>
  <div
    id="tt"
    :class="{ show: visible }"
    :style="{ left: pos.x + 'px', top: pos.y + 'px' }"
  >
    <div class="tt-hdr">
      <div class="tt-dot" :style="dotStyle"></div>
      <div class="tt-ev" :style="{ color: color.h }">{{ eventLabel }}</div>
      <div class="tt-seq">#{{ seq }}</div>
    </div>
    <div class="tt-r"><span class="tt-k">Time</span>     <span class="tt-v">{{ event?.time }}</span></div>
    <div class="tt-r"><span class="tt-k">Method</span>   <span class="tt-v">{{ event?.method || '—' }}</span></div>
    <div class="tt-r"><span class="tt-k">URI</span>      <span class="tt-v">{{ event?.uri }}</span></div>
    <div class="tt-r"><span class="tt-k">Out time</span> <span class="tt-v">{{ event?.outTime || '—' }}</span></div>
    <div class="tt-lat">
      <span class="tt-lat-lbl">Latency</span>
      <span class="tt-lat-v">{{ latency }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { pc } from '../utils/palette'
import { latency as calcLatency } from '../utils/timeHelpers'

const props = defineProps({
  visible: Boolean,
  pos: { type: Object, default: () => ({ x: 0, y: 0 }) },
  event: { type: Object, default: null },
  seq: { type: Number, default: 0 },
})

const color = computed(() => props.event ? pc(props.event.event) : { h: '#888', br: 'rgba(128,128,128,.4)' })
const eventLabel = computed(() => props.event?.event?.replace(/_/g, ' ') || '')
const dotStyle = computed(() => `background:${color.value.h};border-color:${color.value.br}`)
const latency = computed(() => props.event ? calcLatency(props.event.time, props.event.outTime) : '—')
</script>

<style scoped>
#tt {
  position: fixed;
  z-index: 600;
  pointer-events: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px 16px;
  min-width: 256px;
  max-width: 310px;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transition: opacity 0.12s;
}
#tt.show { opacity: 1; }

.tt-hdr {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}
.tt-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; border: 2px solid; }
.tt-ev  { font-size: 13px; font-weight: 700; color: var(--ink); }
.tt-seq { font-size: 11px; color: var(--muted-2); margin-left: auto; }

.tt-r   { display: flex; gap: 12px; margin-bottom: 4px; align-items: flex-start; }
.tt-k   { font-size: 12px; color: var(--muted); font-weight: 600; min-width: 64px; flex-shrink: 0; padding-top: 1px; }
.tt-v   { font-size: 12px; color: var(--ink-2); word-break: break-all; line-height: 1.5; }

.tt-lat     { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--line-2); display: flex; justify-content: space-between; align-items: center; }
.tt-lat-lbl { font-size: 12px; color: var(--muted); font-weight: 600; }
.tt-lat-v   { font-size: 15px; font-weight: 700; color: var(--emerald); }
</style>
