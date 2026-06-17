<template>
  <div class="bc-wrap">

    <!-- ── Controls row ── -->
    <div class="bc-controls">
      <div class="bc-nav">
        <button v-if="zoomedRange" class="bc-back" @click="resetZoom">
          ← Full view
        </button>
        <span class="bc-range-label" :class="{ zoomed: !!zoomedRange }">
          {{ currentRangeLabel }}
        </span>
        <span v-if="zoomedRange" class="bc-zoom-badge">
          {{ zoomedEvents.length }} calls
        </span>
      </div>
    </div>

    <!-- ── CSS histogram ── -->
    <div class="hist-outer" @mouseleave="hoveredIdx = null">

      <!-- Y-axis -->
      <div class="hist-y">
        <div
          v-for="tick in yTicks"
          :key="tick.val"
          class="hist-y-tick"
          :style="{ bottom: tick.pct + '%' }"
        >{{ fmtCount(tick.val) }}</div>
      </div>

      <!-- Chart body: bars + x-labels -->
      <div class="hist-body">

        <!-- Bar area (flex-end aligns bars to baseline) -->
        <div class="hist-bars">

          <!-- Grid lines (absolutely positioned) -->
          <div
            v-for="tick in yTicks"
            :key="'g' + tick.val"
            class="hist-grid-line"
            :style="{ bottom: tick.pct + '%' }"
          ></div>

          <!-- Bar columns -->
          <div
            v-for="(b, i) in buckets"
            :key="i"
            class="hist-col"
            :class="{ hovered: hoveredIdx === i, 'has-count': b.count > 0 }"
            @mousemove="evt => onBarHover(evt, i)"
            @mouseleave="hoveredIdx = null"
            @click="b.count > 0 && onBarClick(i)"
          >
            <div
              class="hist-bar"
              :class="{ empty: b.count === 0 }"
              :style="{ height: barPct(b.count) + '%' }"
            ></div>
          </div>
        </div>

        <!-- X-axis labels -->
        <div class="hist-x">
          <div
            v-for="(b, i) in buckets"
            :key="'x' + i"
            class="hist-x-col"
          >
            <span v-if="showXLabel(i)" class="hist-x-lbl">{{ b.shortLabel }}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Hover tooltip -->
    <Teleport to="body">
      <div
        v-if="hoveredIdx !== null && buckets[hoveredIdx]?.count > 0"
        class="bc-tooltip"
        :style="{ left: ttPos.x + 'px', top: ttPos.y + 'px' }"
      >
        <div class="bc-tt-time">{{ buckets[hoveredIdx]?.shortLabel }}</div>
        <div class="bc-tt-row">
          Count &nbsp;<strong>{{ buckets[hoveredIdx]?.count.toLocaleString() }}</strong>
        </div>
        <div v-if="!zoomedRange" class="bc-tt-hint">Click to zoom in</div>
      </div>
    </Teleport>

    <!-- ── Zoomed detail table ── -->
    <transition name="detail-slide">
      <div v-if="zoomedRange" class="bc-detail">

        <div class="bcd-head">
          <span>#</span>
          <span>Time</span>
          <span>Event</span>
          <span>Method</span>
          <span>URI</span>
          <span>Latency</span>
        </div>

        <div class="bcd-body">
          <div
            v-for="e in zoomedEvents"
            :key="e._origIdx"
            class="bcd-row"
            @click="$emit('open-detail', e)"
          >
            <span class="bcd-num">{{ e._origIdx + 1 }}</span>
            <span class="bcd-time">{{ f8(e.time) }}</span>
            <span class="bcd-ev" :style="evStyle(e)">{{ e.event.replace(/_/g, ' ') }}</span>
            <span class="bcd-meth" :class="'m' + (e.method || 'POST')">{{ e.method || '—' }}</span>
            <span class="bcd-uri" :title="e.uri">{{ e.uri }}</span>
            <span class="bcd-lat">{{ latency(e.time, e.outTime) }}</span>
          </div>
          <div v-if="zoomedEvents.length === 0" class="bcd-empty">
            No events in this interval
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { pc } from '../utils/palette'
import { toMs, f8, latency } from '../utils/timeHelpers'

const PLOT_H = 148   // bar area height in px (must match CSS .hist-bars height)

const props = defineProps({
  data:         { type: Object, default: null },
  hiddenEvents: { type: Set,    default: () => new Set() },
})

const emit = defineEmits(['highlight', 'open-detail'])

// ── Zoom state ───────────────────────────────────────────────────────────────
const zoomedRange = ref(null)

function resetZoom() { zoomedRange.value = null }

function autoInterval(spanMs) {
  if (spanMs <= 10 * 60000)   return 30000
  if (spanMs <= 60 * 60000)   return 60000
  if (spanMs <= 3 * 3600000)  return 5  * 60000
  if (spanMs <= 8 * 3600000)  return 15 * 60000
  return 30 * 60000
}

// ── Timeline ─────────────────────────────────────────────────────────────────
const allEvents = computed(() => {
  if (!props.data?.timeline) return []
  return props.data.timeline
    .map((e, i) => ({ ...e, _origIdx: i }))
    .filter(e => !props.hiddenEvents.has(e.event))
})

const activeRange = computed(() => {
  if (zoomedRange.value) return zoomedRange.value
  const evMs = allEvents.value.map(e => toMs(e.time)).filter(ms => ms > 0)
  if (!evMs.length) return { startMs: 0, endMs: 1 }
  return { startMs: Math.min(...evMs), endMs: Math.max(...evMs) }
})

// ── Buckets ──────────────────────────────────────────────────────────────────
const buckets = computed(() => {
  if (!props.data?.timeline?.length) return []
  const { startMs, endMs } = activeRange.value
  const spanMs    = Math.max(endMs - startMs, 1)
  const intMs     = autoInterval(spanMs)
  const loopStart = Math.floor(startMs / intMs) * intMs

  const result = []
  for (let t = loopStart; t <= endMs; t += intMs) {
    const events = allEvents.value.filter(e => {
      const ms = toMs(e.time)
      return ms >= t && ms < t + intMs
    })
    result.push({
      startMs: t, endMs: t + intMs,
      count: events.length, events,
      timeLabel: msLabel(t) + ' – ' + msLabel(t + intMs),
      shortLabel: msLabel(t),
    })
  }
  while (result.length > 1 && result[result.length - 1].count === 0) result.pop()
  return result
})

const zoomedEvents = computed(() => {
  if (!zoomedRange.value) return []
  const { startMs, endMs } = zoomedRange.value
  return allEvents.value.filter(e => {
    const ms = toMs(e.time)
    return ms >= startMs && ms <= endMs
  })
})

// ── Labels / ticks ───────────────────────────────────────────────────────────
function msLabel(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return String(h % 24).padStart(2, '0') + ':' + String(m).padStart(2, '0')
}

const currentRangeLabel = computed(() => {
  if (zoomedRange.value)
    return `${msLabel(zoomedRange.value.startMs)} – ${msLabel(zoomedRange.value.endMs)}`
  const { startMs, endMs } = activeRange.value
  if (!startMs && !endMs) return ''
  return `${msLabel(startMs)}  →  ${msLabel(endMs)}`
})

const maxCount = computed(() => Math.max(...buckets.value.map(b => b.count), 1))

// y-ticks: 5 levels, pct = % from bottom of bar area
const yTicks = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const val = Math.round((maxCount.value / 4) * i)
    return { val, pct: (val / maxCount.value) * 100 }
  })
)

// bar height as percentage of bar area (min 1.5% for visible non-zero bars)
function barPct(count) {
  if (count <= 0) return 0
  return Math.max((count / maxCount.value) * 100, 1.5)
}

function fmtCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000)    return (n / 1000).toFixed(0) + 'k'
  return String(n)
}

// Show x-label every Nth bar (at most ~10 labels)
function showXLabel(i) {
  const every = Math.max(1, Math.ceil(buckets.value.length / 10))
  return i % every === 0
}

// ── Hover tooltip ─────────────────────────────────────────────────────────────
const hoveredIdx = ref(null)
const ttPos = reactive({ x: 0, y: 0 })

function onBarHover(evt, i) {
  hoveredIdx.value = i
  ttPos.x = evt.clientX + 14
  ttPos.y = evt.clientY - 52
}

// ── Zoom click ────────────────────────────────────────────────────────────────
function onBarClick(i) {
  const b = buckets.value[i]
  zoomedRange.value = { startMs: b.startMs, endMs: b.endMs }
  hoveredIdx.value  = null
}

// ── Event style ───────────────────────────────────────────────────────────────
function evStyle(e) {
  const c = pc(e.event)
  return `color:${c.h};background:${c.bg};border-color:${c.br}`
}
</script>

<style scoped>
.bc-wrap {
  display: flex;
  flex-direction: column;
  background: var(--bg2);
}

/* ── Controls ── */
.bc-controls {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 16px 2px; flex-shrink: 0;
}
.bc-nav { display: flex; align-items: center; gap: 10px; }
.bc-back {
  display: flex; align-items: center; gap: 5px;
  background: rgba(59,130,246,.1); border: 1.5px solid rgba(59,130,246,.35);
  border-radius: 6px; color: #3b82f6; font-size: 12px; font-weight: 700;
  padding: 4px 11px; cursor: pointer; transition: background 0.15s; font-family: inherit;
}
.bc-back:hover { background: rgba(59,130,246,.18); }
.bc-range-label { font-family: inherit; font-size: 12px; font-weight: 600; color: var(--text3); }
.bc-range-label.zoomed { color: var(--text2); font-size: 13px; }
.bc-zoom-badge {
  font-family: inherit; font-size: 11px; font-weight: 600;
  color: #3b82f6; background: rgba(59,130,246,.1);
  border: 1.5px solid rgba(59,130,246,.3); padding: 1px 9px; border-radius: 10px;
}

/* ── Histogram outer container ── */
.hist-outer {
  display: flex;
  padding: 6px 16px 0 0;
  flex-shrink: 0;
}

/* ── Y-axis ── */
.hist-y {
  width: 54px;
  height: 148px;   /* must match .hist-bars height */
  position: relative;
  flex-shrink: 0;
}
.hist-y-tick {
  position: absolute;
  right: 8px;
  transform: translateY(50%);   /* center label on gridline */
  font-family: inherit;
  font-size: 11px;
  color: var(--text3);
  white-space: nowrap;
  user-select: none;
}

/* ── Body: bars + x-axis ── */
.hist-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ── Bar area ── */
.hist-bars {
  height: 148px;                          /* fixed bar plot height */
  display: flex;
  align-items: flex-end;                  /* bars grow UP from baseline */
  position: relative;
  border-bottom: 1.5px solid var(--border2);  /* baseline */
}

/* Grid lines */
.hist-grid-line {
  position: absolute;
  left: 0; right: 0;
  border-top: 1px solid var(--border);
  pointer-events: none;
}

/* Bar column wrapper */
.hist-col {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 1px;
  cursor: default;
}
.hist-col.has-count { cursor: pointer; }

/* Bar fill — grows from bottom */
.hist-bar {
  width: 100%;
  background: rgba(59,130,246,.40);
  border-radius: 2px 2px 0 0;
  transition: background 0.1s;
}
.hist-bar.empty { background: rgba(59,130,246,.08); height: 2px !important; }
.hist-col.has-count:hover .hist-bar { background: #3b82f6; }
.hist-col.hovered.has-count .hist-bar { background: #2563eb; }

/* ── X-axis labels ── */
.hist-x {
  height: 26px;
  display: flex;
  align-items: flex-start;
  padding-top: 5px;
  overflow: visible;
}
.hist-x-col {
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: visible;
}
.hist-x-lbl {
  font-family: inherit;
  font-size: 11px;
  color: var(--text3);
  white-space: nowrap;
  user-select: none;
}

/* ── Hover tooltip ── */
.bc-tooltip {
  position: fixed; z-index: 900; pointer-events: none;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); padding: 10px 14px;
  box-shadow: var(--shadow-md);
  min-width: 130px;
}
.bc-tt-time { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.bc-tt-row  { font-size: 12px; color: var(--muted); }
.bc-tt-row strong { color: var(--primary); }
.bc-tt-hint { font-size: 11px; color: var(--muted-2); margin-top: 5px; }

/* ── Detail panel (zoomed) ── */
.bc-detail {
  border-top: 2px solid var(--primary);
  background: var(--canvas);
  display: flex; flex-direction: column;
  max-height: 280px; overflow: hidden;
}
.bcd-head {
  display: grid;
  grid-template-columns: 42px 108px 148px 80px 1fr 80px;
  gap: 10px; padding: 7px 16px;
  font-size: 11px; font-weight: 700; color: var(--muted);
  letter-spacing: .08em; text-transform: uppercase;
  background: var(--surface-2); border-bottom: 1px solid var(--line); flex-shrink: 0;
}
.bcd-body {
  overflow-y: auto; flex: 1;
  scrollbar-width: thin; scrollbar-color: var(--line) transparent; scrollbar-gutter: stable;
}
.bcd-row {
  display: grid;
  grid-template-columns: 42px 108px 148px 80px 1fr 80px;
  gap: 10px; padding: 7px 16px;
  border-bottom: 1px solid var(--line-2);
  align-items: center; cursor: pointer; transition: background 0.1s; font-size: 13px;
}
.bcd-row:hover      { background: var(--canvas); }
.bcd-row:last-child { border-bottom: none; }
.bcd-num  { font-size: 12px; color: var(--muted-2); }
.bcd-time { font-size: 13px; color: var(--ink-2); font-weight: 600; }
.bcd-ev   {
  display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px;
  font-size: 11px; font-weight: 700;
  border: 1px solid; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.bcd-meth {
  display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px;
  font-size: 11px; font-weight: 700;
}
.mGET  { color: var(--emerald); background: var(--emerald-50); border: 1px solid rgba(15,157,110,.25); }
.mPOST { color: var(--amber); background: var(--amber-50); border: 1px solid rgba(194,121,11,.25); }
.bcd-uri  { font-size: 12px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bcd-lat  { font-size: 13px; color: var(--ink-2); font-weight: 600; }
.bcd-empty { padding: 20px; text-align: center; color: var(--muted); font-size: 13px; }

/* ── Transition ── */
.detail-slide-enter-active,
.detail-slide-leave-active { transition: max-height 0.25s ease, opacity 0.2s; }
.detail-slide-enter-from,
.detail-slide-leave-to     { max-height: 0; opacity: 0; }
.detail-slide-enter-to,
.detail-slide-leave-from   { max-height: 280px; opacity: 1; }
</style>
