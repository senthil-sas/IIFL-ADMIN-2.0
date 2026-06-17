<template>
  <div>
    <div class="popup-backdrop" :class="{ open: open }" @click="$emit('close')"></div>

    <div class="zoom-popup" :class="{ open: open }">
      <div class="zp-header">
        <div>
          <div class="zp-title">{{ group ? `${group.events.length} ${group.events.length === 1 ? 'call' : 'calls'} at ${f8(group.events[0].time)}` : '—' }}</div>
          <div class="zp-time">Click a card to highlight in log · use View Details for full trace</div>
        </div>
        <div class="zp-close" @click="$emit('close')">✕</div>
      </div>

      <div class="zp-body">
        <div
          v-for="(e, i) in group?.events"
          :key="i"
          class="zp-card"
          @click="onCardClick(group.origIdxs[i])"
        >
          <div class="zp-card-top">
            <span class="zp-ev" :style="evStyle(e)">{{ e.event.replace(/_/g, ' ') }}</span>
            <span class="zp-meth" :class="'zp-m' + (e.method || 'POST')">{{ e.method || '—' }}</span>
            <span class="zp-seq">#{{ group.origIdxs[i] + 1 }}</span>
          </div>
          <div class="zp-row"><span class="zp-key">Time</span>     <span class="zp-val">{{ e.time }}</span></div>
          <div class="zp-row"><span class="zp-key">URI</span>      <span class="zp-val">{{ e.uri }}</span></div>
          <div class="zp-row"><span class="zp-key">Out time</span> <span class="zp-val">{{ e.outTime || '—' }}</span></div>
          <div class="zp-lat-row">
            <span class="zp-lat-lbl">Latency</span>
            <span class="zp-lat-val">{{ latency(e.time, e.outTime) }}</span>
            <button class="zp-detail-link" @click.stop="onDetailClick(e)">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pc } from '../utils/palette'
import { latency, f8 } from '../utils/timeHelpers'

defineProps({
  open: Boolean,
  group: { type: Object, default: null },
})

const emit = defineEmits(['close', 'highlight', 'open-detail'])

function evStyle(e) {
  const c = pc(e.event)
  return `color:${c.h};background:${c.bg};border-color:${c.br}`
}

function onCardClick(origIdx) {
  emit('highlight', origIdx)
  emit('close')
}

function onDetailClick(e) {
  emit('open-detail', e)
}
</script>

<style scoped>
.popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(11,15,23,.45);
  z-index: 700;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(2px);
}
.popup-backdrop.open { opacity: 1; pointer-events: all; }

.zoom-popup {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(.96);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 800;
  min-width: 560px;
  max-width: 90vw;
  max-height: 82vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}
.zoom-popup.open { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }

.zp-header {
  padding: 16px 22px 14px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: var(--surface-2);
}
.zp-title { font-family: var(--display); font-size: 15px; font-weight: 700; color: var(--ink); }
.zp-time  { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 2px; }
.zp-close {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--canvas); border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 14px; color: var(--muted);
  transition: background 0.15s, color 0.15s; flex-shrink: 0;
}
.zp-close:hover { background: var(--line-2); color: var(--ink); }

.zp-body {
  overflow-y: auto;
  flex: 1;
  padding: 16px 22px 22px;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}

.zp-card {
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.12s;
}
.zp-card:last-child { margin-bottom: 0; }
.zp-card:hover { border-color: var(--primary-100); background: var(--primary-50); }

.zp-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.zp-ev   { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
.zp-meth { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 5px; }
.zp-mGET  { color: var(--emerald); background: var(--emerald-50); border: 1px solid rgba(15,157,110,.25); }
.zp-mPOST { color: var(--amber); background: var(--amber-50); border: 1px solid rgba(194,121,11,.25); }
.zp-seq  { font-size: 11px; color: var(--muted-2); margin-left: auto; }

.zp-row  { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 5px; font-size: 13px; }
.zp-key  { color: var(--muted); font-weight: 600; min-width: 72px; flex-shrink: 0; }
.zp-val  { font-size: 12px; color: var(--ink-2); word-break: break-all; line-height: 1.5; }

.zp-lat-row  { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--line-2); display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.zp-lat-lbl  { font-size: 12px; color: var(--muted); font-weight: 600; }
.zp-lat-val  { font-size: 15px; font-weight: 700; color: var(--emerald); flex: 1; }

.zp-detail-link {
  background: none;
  border: 1px solid var(--primary-100);
  border-radius: var(--radius-sm);
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s, border-color 0.12s;
  flex-shrink: 0;
}
.zp-detail-link:hover {
  background: var(--primary-50);
  border-color: var(--primary);
}
</style>
