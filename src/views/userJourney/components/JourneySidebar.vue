<template>
  <aside class="sidebar">
    <!-- Fetch form -->
    <div class="sb-sec">
      <div class="sb-lbl">Fetch Journey</div>

      <div class="fg">
        <label>User ID</label>
        <input class="input text-input" v-model="form.uid" type="text" placeholder="e.g. 11882058" @keydown.enter="onFetch" />
      </div>

      <div class="fg">
        <label>Date</label>
        <input
          class="input date-input"
          type="date"
          v-model="form.datePicker"
          :max="todayIso"
        />
        <span class="date-display">{{ displayDate }}</span>
      </div>

      <button class="btn btn-accent fetch-btn" :disabled="loading" @click="onFetch">
        <span v-if="loading" class="spinner"></span>
        <span v-else>▶</span>
        <span>{{ loading ? 'Loading…' : 'Fetch Journey' }}</span>
      </button>
    </div>

    <!-- Session info -->
    <div class="sb-sec" v-if="data">
      <div class="sb-lbl">Session</div>
      <div class="info-card">
        <div class="ic-row"><span class="ic-key">User ID</span>   <span class="ic-val">{{ data.userId }}</span></div>
        <div class="ic-row"><span class="ic-key">Date</span>      <span class="ic-val">{{ fDate(data.date) }}</span></div>
        <div class="ic-row"><span class="ic-key">First API</span> <span class="ic-val">{{ f8(data.firstActivityTime) }}</span></div>
        <div class="ic-row"><span class="ic-key">Last API</span>  <span class="ic-val">{{ f8(data.lastActivityTime) }}</span></div>
        <div class="ic-row"><span class="ic-key">Duration</span>  <span class="ic-val">{{ data.sessionDuration }}</span></div>
      </div>
    </div>

    <!-- Activity stats -->
    <div class="sb-sec" v-if="data">
      <div class="sb-lbl">Activity</div>
      <div class="stats-g">
        <div class="sbox"><div class="sv blue">{{ data.totalApiCalls }}</div><div class="sl">Total calls</div></div>
        <div class="sbox"><div class="sv green">{{ data.distinctApisUsed }}</div><div class="sl">Distinct APIs</div></div>
        <div class="sbox full"><div class="sv amber">{{ data.sessionDuration }}</div><div class="sl">Session duration</div></div>
      </div>
    </div>

    <!-- Legend / filter -->
    <div class="sb-sec" v-if="data">
      <div class="sb-lbl">Filter events</div>
      <div class="leg-list">
        <div
          v-for="ev in eventTypes"
          :key="ev"
          class="leg-item"
          :class="hiddenEvents.has(ev) ? 'off' : 'on'"
          @click="$emit('toggle-event', ev)"
        >
          <span class="leg-dot" :style="dotStyle(ev)"></span>
          <span class="leg-name" :style="{ color: pc(ev).h }">{{ ev.replace(/_/g, ' ') }}</span>
          <span class="leg-cnt">{{ data.importantEvents?.[ev] || 0 }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { pc } from '../utils/palette'
import { f8, fDate } from '../utils/timeHelpers'

const props = defineProps({
  data:         { type: Object,  default: null },
  hiddenEvents: { type: Set,     default: () => new Set() },
  loading:      { type: Boolean, default: false },
})

const emit = defineEmits(['fetch', 'toggle-event'])

/* ── Today's date helpers ── */
function toIso(d) {
  return d.toISOString().slice(0, 10)   // YYYY-MM-DD
}
function isoToDDMMYYYY(iso) {
  const [y, m, d] = iso.split('-')
  return d + m + y                       // DDMMYYYY for API
}
function isoToDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${+d} ${months[+m - 1]} ${y}`
}

const todayIso = toIso(new Date())
const form = reactive({ uid: '', datePicker: todayIso })

const displayDate = computed(() => isoToDisplay(form.datePicker))

/* ── Fetch ── */
function onFetch() {
  if (!form.uid.trim())  return alert('Enter a User ID')
  if (!form.datePicker)  return alert('Select a date')
  emit('fetch', {
    uid:  form.uid.trim(),
    date: isoToDDMMYYYY(form.datePicker),   // DDMMYYYY for journey API
  })
}

/* ── Legend ── */
const eventTypes = computed(() =>
  props.data ? [...new Set(props.data.timeline.map(e => e.event))] : []
)
function dotStyle(ev) {
  const c = pc(ev)
  return `background:${c.h};border-color:${c.br}`
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--line);
  background: var(--surface);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}

.sb-sec   { padding: 16px 14px; border-bottom: 1px solid var(--line-2); }
.sb-lbl   { font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 12px; }

.fg       { display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; }
.fg label { font-size: 12px; font-weight: 600; color: var(--ink-2); }

/* Date input — always light scheme */
input[type="date"].date-input { color-scheme: light; }
.date-display {
  font-size: 11px;
  color: var(--muted);
  font-weight: 500;
  padding-left: 2px;
}

.fetch-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}

.info-card { background: var(--canvas); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 12px; }
.ic-row    { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--line-2); font-size: 12px; }
.ic-row:last-child { border-bottom: none; padding-bottom: 0; }
.ic-key { color: var(--muted); font-weight: 500; }
.ic-val { font-size: 11px; font-weight: 600; color: var(--ink-2); }

.stats-g { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.sbox    { background: var(--canvas); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 12px 8px; text-align: center; }
.sbox.full { grid-column: 1 / -1; }
.sv      { font-size: 20px; font-weight: 700; line-height: 1.1; color: var(--ink); }
.sv.blue  { color: var(--primary); }
.sv.green { color: var(--emerald); }
.sv.amber { color: var(--amber); }
.sl      { font-size: 11px; color: var(--muted); margin-top: 3px; font-weight: 500; }

.leg-list { display: flex; flex-direction: column; gap: 2px; }
.leg-item {
  display: flex; align-items: center; gap: 9px; padding: 7px 9px;
  border-radius: var(--radius-sm); cursor: pointer; transition: background 0.12s;
  user-select: none; border: 1px solid transparent;
}
.leg-item:hover { background: var(--canvas); }
.leg-item.on    { background: var(--canvas); border-color: var(--line); }
.leg-item.off   { opacity: .3; }
.leg-dot  { width: 9px; height: 9px; border-radius: 50%; border: 2px solid; flex-shrink: 0; }
.leg-name { font-size: 12px; font-weight: 600; flex: 1; }
.leg-cnt  { font-size: 11px; color: var(--muted); background: var(--surface-2); padding: 2px 7px; border-radius: 9px; min-width: 24px; text-align: center; border: 1px solid var(--line-2); }

.spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.3); border-top-color: #fff;
  border-radius: 50%; animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
