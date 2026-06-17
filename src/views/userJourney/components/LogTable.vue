<template>
  <div class="log-panel" :class="{ collapsed: !expanded }">
    <!-- Panel header (always visible) -->
    <div class="log-panel-hdr" @click="$emit('toggle')">
      <div class="lph-left">
        <span class="lph-icon">📋</span>
        <span class="lph-title">API Logs</span>
        <span class="lph-badge">{{ totalVisible }} entries</span>
      </div>
      <button class="lph-toggle" :title="expanded ? 'Collapse' : 'Expand'">
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"
          class="chevron-icon"
          :class="{ rotated: !expanded }"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>

    <!-- Table (hidden when collapsed) -->
    <template v-if="expanded">
      <div class="log-head">
        <span>#</span>
        <span>Time</span>
        <span>Event</span>
        <span>Meth</span>
        <span>URI</span>
        <span>Out time</span>
        <span>Latency</span>
      </div>
      <div class="log-body">
        <div
          v-for="e in filteredRows"
          :key="e._origIdx"
          class="log-row"
          :class="{ hl: highlightIndex === e._origIdx }"
          @mouseenter="evt => $emit('tooltip-show', evt, e, e._origIdx + 1)"
          @mouseleave="$emit('tooltip-hide')"
          @click="$emit('open-detail', e)"
        >
          <span class="lnum">{{ e._origIdx + 1 }}</span>
          <span class="ltime">{{ f8(e.time) }}</span>
          <span class="lev" :style="evStyle(e)">{{ e.event.replace(/_/g, ' ') }}</span>
          <span class="lmeth" :class="'m' + (e.method || 'POST')">{{ e.method || '—' }}</span>
          <span class="luri" :title="e.uri">{{ e.uri }}</span>
          <span class="ltime">{{ f8(e.outTime) }}</span>
          <span class="llat">{{ latency(e.time, e.outTime) }}</span>
        </div>
        <div v-if="filteredRows.length === 0" class="log-empty">No matching events</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { pc } from '../utils/palette'
import { f8, latency } from '../utils/timeHelpers'

const props = defineProps({
  data:           { type: Object,  default: null },
  hiddenEvents:   { type: Set,     default: () => new Set() },
  search:         { type: String,  default: '' },
  highlightIndex: { type: Number,  default: -1 },
  expanded:       { type: Boolean, default: true },
})

defineEmits(['highlight', 'open-detail', 'tooltip-show', 'tooltip-hide', 'toggle'])

const filteredRows = computed(() => {
  if (!props.data) return []
  const q = props.search.toLowerCase()
  return props.data.timeline
    .map((e, i) => ({ ...e, _origIdx: i }))
    .filter(e => {
      if (props.hiddenEvents.has(e.event)) return false
      if (q && !e.uri.toLowerCase().includes(q) && !e.event.toLowerCase().includes(q)) return false
      return true
    })
})

const totalVisible = computed(() => filteredRows.value.length)

function evStyle(e) {
  const c = pc(e.event)
  return `color:${c.h};background:${c.bg};border-color:${c.br}`
}
</script>

<style scoped>
.log-panel {
  border-top: 1px solid var(--line);
  flex: 1;
  min-height: 0;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.log-panel.collapsed {
  flex: 0 0 42px;
}

/* Panel header */
.log-panel-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  height: 42px;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid var(--line);
  background: var(--surface-2);
  transition: background 0.12s;
}
.log-panel-hdr:hover { background: var(--canvas); }
.lph-left   { display: flex; align-items: center; gap: 10px; }
.lph-icon   { font-size: 14px; }
.lph-title  { font-size: 13px; font-weight: 700; color: var(--ink); }
.lph-badge  {
  font-size: 11px; font-weight: 600;
  color: var(--primary-700); background: var(--primary-50);
  border: 1px solid var(--primary-100);
  padding: 1px 8px; border-radius: 10px;
}
.lph-toggle {
  background: none; border: none; cursor: pointer; padding: 4px;
  color: var(--muted); display: flex; align-items: center; justify-content: center;
}
.chevron-icon {
  width: 16px; height: 16px; transition: transform 0.25s ease;
}
.chevron-icon.rotated { transform: rotate(180deg); }

/* Column header */
.log-head {
  display: grid;
  gap: 10px;
  padding: 7px 18px;
  border-bottom: 1px solid var(--line);
  font-size: 11px; font-weight: 700; color: var(--muted);
  letter-spacing: .08em; text-transform: uppercase;
  flex-shrink: 0; background: var(--canvas);
  grid-template-columns: 38px 108px 132px 58px 1fr 98px 68px;
}

.log-body {
  overflow-y: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
  scrollbar-gutter: stable;
}

.log-row {
  display: grid; gap: 10px; padding: 6px 18px;
  border-bottom: 1px solid var(--line-2);
  align-items: center; cursor: pointer; transition: background 0.1s;
  grid-template-columns: 38px 108px 132px 58px 1fr 98px 68px;
}
.log-row:hover    { background: var(--canvas); }
.log-row.hl       { background: var(--primary-50); border-left: 3px solid var(--primary); }
.log-row:last-child { border-bottom: none; }

.lnum  { font-size: 12px; color: var(--muted-2); }
.ltime { font-size: 13px; color: var(--ink-2); font-weight: 600; }
.lev   { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid; white-space: nowrap; }
.lmeth { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.mGET  { color: var(--emerald); background: var(--emerald-50); border: 1px solid rgba(15,157,110,.25); }
.mPOST { color: var(--amber); background: var(--amber-50); border: 1px solid rgba(194,121,11,.25); }
.luri  { font-size: 12px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.llat  { font-size: 13px; color: var(--ink-2); font-weight: 600; }

.log-empty { padding: 20px; text-align: center; color: var(--muted); font-size: 13px; }
</style>
