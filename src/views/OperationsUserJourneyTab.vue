<template>
  <div class="uj-ops" @mousemove="onMouseMove">

    <!-- ── Fetch bar ────────────────────────────────────────────────────────── -->
    <div class="uj-fetch-card">
      <div class="uj-fetch-bar">
        <div class="uj-field">
          <label class="uj-lbl">User ID / Client ID</label>
          <input class="uj-inp" v-model="form.uid" placeholder="e.g. SMBI0556"
            @keydown.enter="onFetch" />
        </div>
        <div class="uj-field">
          <label class="uj-lbl">Date</label>
          <input class="uj-inp uj-inp-date" type="date" v-model="form.datePicker" :max="todayIso" />
        </div>
        <div class="uj-field uj-field-grow">
          <label class="uj-lbl">Session ID <span class="uj-opt">(optional)</span></label>
          <input class="uj-inp" v-model="form.sessionId" placeholder="e.g. sess_abc123…" />
        </div>
        <button class="btn btn-accent uj-btn" :disabled="loading" @click="onFetch">
          <span v-if="loading" class="uj-spin" />
          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          {{ loading ? 'Loading…' : 'Fetch journey' }}
        </button>
      </div>
    </div>

    <!-- ── Error bar ─────────────────────────────────────────────────────────── -->
    <div v-if="fetchError" class="uj-err-bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ fetchError }}
      <button class="uj-retry-btn" @click="onFetch">Retry</button>
    </div>

    <!-- ── Loading skeleton ──────────────────────────────────────────────────── -->
    <div v-if="loading" class="uj-skel-wrap">
      <!-- Session bar skel -->
      <div class="uj-skel-bar">
        <div v-for="i in 5" :key="i" class="uj-skel uj-skel-chip" />
      </div>
      <!-- KPI skel -->
      <div class="uj-skel-kpi-row">
        <div v-for="i in 5" :key="i" class="uj-skel uj-skel-kpi" />
      </div>
      <!-- Chart skel -->
      <div class="uj-skel uj-skel-chart" />
      <!-- Trail skel -->
      <div class="uj-skel uj-skel-trail" />
      <!-- Table skel -->
      <div class="uj-skel-table">
        <div class="uj-skel uj-skel-trow" v-for="i in 8" :key="i" />
      </div>
    </div>

    <!-- ── Loaded ─────────────────────────────────────────────────────────────── -->
    <template v-else-if="journeyData">

      <!-- Session info bar -->
      <div class="uj-session-bar">
        <span class="uj-session-tag">SESSION</span>
        <span class="uj-si">User ID&nbsp;<strong>{{ journeyData.userId }}</strong></span>
        <span class="uj-sdiv" />
        <span class="uj-si">Date&nbsp;<strong>{{ fDate(journeyData.date) }}</strong></span>
        <span class="uj-sdiv" />
        <span class="uj-si">Events&nbsp;<strong>{{ journeyData.totalApiCalls }}</strong></span>
        <span class="uj-sdiv" />
        <span class="uj-si">Range&nbsp;<strong>{{ f8(journeyData.firstActivityTime) }} → {{ f8(journeyData.lastActivityTime) }}</strong></span>
        <span class="uj-sdiv" />
        <span class="uj-si">Duration&nbsp;<strong>{{ journeyData.sessionDuration }}</strong></span>
      </div>

      <!-- KPI strip -->
      <div class="uj-kpi-strip">
        <div class="uj-kpi">
          <div class="uj-kpi-hd">
            <svg class="uj-ico-blue" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="uj-kpi-lbl">FIRST API</span>
          </div>
          <div class="uj-kpi-val">{{ f8(journeyData.firstActivityTime) }}</div>
          <div class="uj-kpi-sub">start of session</div>
        </div>
        <div class="uj-kpi-sep" />
        <div class="uj-kpi">
          <div class="uj-kpi-hd">
            <svg class="uj-ico-emerald" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span class="uj-kpi-lbl">LAST API</span>
          </div>
          <div class="uj-kpi-val">{{ f8(journeyData.lastActivityTime) }}</div>
          <div class="uj-kpi-sub">end of session</div>
        </div>
        <div class="uj-kpi-sep" />
        <div class="uj-kpi">
          <div class="uj-kpi-hd">
            <svg class="uj-ico-blue" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            <span class="uj-kpi-lbl">TOTAL EVENTS</span>
          </div>
          <div class="uj-kpi-val">{{ journeyData.totalApiCalls }}</div>
          <div class="uj-kpi-sub">API calls logged</div>
        </div>
        <div class="uj-kpi-sep" />
        <div class="uj-kpi">
          <div class="uj-kpi-hd">
            <svg class="uj-ico-rose" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span class="uj-kpi-lbl">ERRORS</span>
          </div>
          <div class="uj-kpi-val" :class="errorCount > 0 ? 'uj-val-rose' : ''">{{ errorCount }}</div>
          <div class="uj-kpi-sub">4xx / 5xx</div>
        </div>
        <div class="uj-kpi-sep" />
        <div class="uj-kpi uj-kpi-wide">
          <div class="uj-kpi-hd">
            <svg class="uj-ico-amber" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span class="uj-kpi-lbl">SLOWEST API</span>
          </div>
          <div class="uj-kpi-val-sm" :title="slowestApi?.uri">{{ slowestUriWithLatency }}</div>
          <div class="uj-kpi-sub">P99 latency</div>
        </div>
      </div>

      <!-- API Activity Distribution -->
      <div class="uj-section">
        <div class="uj-sec-hd">
          <span class="uj-sec-title">API Activity Distribution</span>
          <span class="uj-sec-sub">
            {{ f8(journeyData.firstActivityTime) }} — {{ f8(journeyData.lastActivityTime) }} · {{ intervalLabel }} intervals
          </span>
          <div class="uj-int-toggle" style="margin-left:auto">
            <button v-for="opt in INTERVAL_OPTS" :key="opt.val"
              class="uj-int-btn"
              :class="{ active: intervalMs === opt.val }"
              @click="intervalMs = opt.val">
              {{ opt.label }}
            </button>
          </div>
        </div>
        <div class="uj-chart-wrap">
          <JourneyBarChart
            :data="journeyData"
            :hidden-events="hiddenEvents"
            @open-detail="openDetail"
          />
        </div>
      </div>

      <!-- Activity Trail -->
      <div class="uj-section">
        <div class="uj-sec-hd">
          <span class="uj-sec-title">Activity Trail</span>
          <span class="uj-badge">{{ visibleTrailCount }} / {{ journeyData.totalApiCalls }} events</span>
          <select class="uj-sel" v-model="trailEventFilter" style="margin-left:auto">
            <option value="all">All events</option>
            <option v-for="ev in eventTypes" :key="ev" :value="ev">
              {{ ev.replace(/_/g, ' ') }}
            </option>
          </select>
        </div>
        <div class="uj-trail-body">
          <StepFlowView
            :data="journeyData"
            :hidden-events="trailHiddenEvents"
            @open-popup="openPopup"
            @tooltip-show="showTooltip"
            @tooltip-hide="hideTooltip"
          />
        </div>
      </div>

      <!-- ── API Logs ── -->
      <div class="uj-section uj-section-logs">
        <div class="uj-sec-hd uj-log-hd">
          <span class="uj-log-icon">📋</span>
          <span class="uj-sec-title">API Logs</span>
          <span class="uj-badge">{{ filteredLog.length }} entries</span>
          <button class="btn btn-sm uj-export-btn" @click="exportCsv">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        <!-- Controls strip -->
        <div class="uj-log-controls">
          <div class="uj-search-wrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" class="uj-search-ico">
              <circle cx="11" cy="11" r="7"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input class="uj-inp uj-search-inp" v-model="logSearch"
              placeholder="Search URI / event…" />
          </div>
          <label class="uj-err-toggle" :class="{ active: errorsOnly }">
            <input type="checkbox" v-model="errorsOnly" class="uj-checkbox" />
            Errors only
          </label>
          <select class="uj-sel" v-model="methodFilter">
            <option value="all">All methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <select class="uj-sel" v-model="statusFilter">
            <option value="all">All statuses</option>
            <option value="2xx">2xx</option>
            <option value="4xx">4xx</option>
            <option value="5xx">5xx</option>
          </select>
        </div>

        <!-- Table header -->
        <div class="uj-log-head">
          <span>#</span>
          <span>Time</span>
          <span>Event</span>
          <span>Method</span>
          <span>URI</span>
          <span>Status</span>
          <span>Out Time</span>
          <span>Latency</span>
        </div>

        <!-- Table body -->
        <div class="uj-log-body">
          <div
            v-for="e in filteredLog"
            :key="e._origIdx"
            class="uj-log-row"
            @click="openDetail(e)"
          >
            <span class="ulr-num">{{ e._origIdx + 1 }}</span>
            <span class="ulr-time">{{ f8(e.time) }}</span>
            <span class="ulr-ev" :style="evStyle(e)">{{ e.event.replace(/_/g, ' ') }}</span>
            <span class="ulr-meth" :class="'m-' + (e.method || 'POST')">{{ e.method || '—' }}</span>
            <span class="ulr-uri" :title="e.uri">{{ e.uri }}</span>
            <span class="ulr-status" :class="statusClass(e)">{{ statusCode(e) || '—' }}</span>
            <span class="ulr-time">{{ f8(e.outTime) }}</span>
            <span class="ulr-lat">{{ latency(e.time, e.outTime) }}</span>
          </div>
          <div v-if="filteredLog.length === 0" class="uj-log-empty">
            No matching events
          </div>
        </div>
      </div>

    </template>

    <!-- ── No-results state ────────────────────────────────────────────────── -->
    <div v-else-if="noResults" class="uj-empty">
      <div class="uj-empty-ico">🔍</div>
      <div class="uj-empty-msg">No API activity found</div>
      <div class="uj-empty-hint">
        No activity for <strong>{{ lastFetchedUid }}</strong> on <strong>{{ lastFetchedDate }}</strong>.
        Try a different date or User ID.
      </div>
    </div>

    <!-- ── Empty / initial state ──────────────────────────────────────────── -->
    <div v-else-if="!loading && !fetchError" class="uj-empty">
      <div class="uj-empty-ico">📡</div>
      <div class="uj-empty-msg">No data loaded</div>
      <div class="uj-empty-hint">
        Enter a User ID and date, then click <strong>Fetch journey</strong>
      </div>
    </div>

    <!-- ZoomPopup -->
    <ZoomPopup
      :open="popupOpen"
      :group="popupGroup"
      @close="popupOpen = false"
      @open-detail="openDetail"
    />

    <!-- Log detail dialog -->
    <LogDetailDialog
      :visible="detailVisible"
      :row="detailEvent"
      :log-date="logDate"
      @close="detailVisible = false"
    />

    <!-- Hover tooltip -->
    <AppTooltip :visible="ttVisible" :pos="ttPos" :event="ttEvent" :seq="ttSeq" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useJourneyData }  from './userJourney/composables/useJourneyData'
import { useTooltip }      from './userJourney/composables/useTooltip'
import { f8, fDate, toMs, latency } from './userJourney/utils/timeHelpers'
import { pc }              from './userJourney/utils/palette'
import JourneyBarChart from './userJourney/components/JourneyBarChart.vue'
import StepFlowView    from './userJourney/components/StepFlowView.vue'
import ZoomPopup       from './userJourney/components/ZoomPopup.vue'
import AppTooltip      from './userJourney/components/AppTooltip.vue'
import LogDetailDialog from '../components/LogDetailDialog.vue'

// ── Data layer ───────────────────────────────────────────────────────────────
const { journeyData, loading, fetchError, fetchJourney } = useJourneyData()
const { ttVisible, ttPos, ttEvent, ttSeq, showTooltip, hideTooltip, positionTooltip } = useTooltip()

// ── Form ─────────────────────────────────────────────────────────────────────
const todayIso = new Date().toISOString().slice(0, 10)
const form = ref({ uid: '', datePicker: todayIso, sessionId: '' })
const lastFetchedUid  = ref('')
const lastFetchedDate = ref('')
const noResults       = ref(false)

function onFetch() {
  if (!form.value.uid.trim())  return alert('Enter a User ID')
  if (!form.value.datePicker)  return alert('Select a date')
  noResults.value      = false
  hiddenEvents.value   = new Set()
  trailEventFilter.value = 'all'
  logSearch.value      = ''
  errorsOnly.value     = false
  methodFilter.value   = 'all'
  statusFilter.value   = 'all'

  lastFetchedUid.value  = form.value.uid.trim()
  const [y, m, d] = form.value.datePicker.split('-')
  lastFetchedDate.value = `${d} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1]} ${y}`

  fetchJourney({ uid: form.value.uid.trim(), date: d + m + y }).then(() => {
    if (!journeyData.value?.timeline?.length) {
      noResults.value = true
    } else if (journeyData.value) {
      const spanMs = toMs(journeyData.value.lastActivityTime) - toMs(journeyData.value.firstActivityTime)
      intervalMs.value = autoIntervalMs(spanMs)
    }
  })
}

// ── Filter / trail state ──────────────────────────────────────────────────────
const hiddenEvents     = ref(new Set())
const trailEventFilter = ref('all')
const logSearch        = ref('')
const errorsOnly       = ref(false)
const methodFilter     = ref('all')
const statusFilter     = ref('all')

// ── Popup / detail state ──────────────────────────────────────────────────────
const popupOpen     = ref(false)
const popupGroup    = ref(null)
const detailVisible = ref(false)
const detailEvent   = ref(null)
const logDate       = ref('')

// ── Event types (for trail filter) ───────────────────────────────────────────
const eventTypes = computed(() => {
  if (!journeyData.value?.timeline) return []
  return [...new Set(journeyData.value.timeline.map(e => e.event))]
})

// trailHiddenEvents = hiddenEvents ∪ non-selected types
const trailHiddenEvents = computed(() => {
  const base = new Set(hiddenEvents.value)
  if (trailEventFilter.value !== 'all') {
    eventTypes.value
      .filter(t => t !== trailEventFilter.value)
      .forEach(t => base.add(t))
  }
  return base
})

const visibleTrailCount = computed(() => {
  if (!journeyData.value?.timeline) return 0
  return journeyData.value.timeline.filter(e => !trailHiddenEvents.value.has(e.event)).length
})

// ── KPI: errors ──────────────────────────────────────────────────────────────
const errorCount = computed(() => {
  if (!journeyData.value?.timeline) return 0
  return journeyData.value.timeline.filter(e =>
    (e.statusCode >= 400) || (e.responseCode >= 400) || (e.status >= 400)
  ).length
})

// ── KPI: slowest API ─────────────────────────────────────────────────────────
const slowestApi = computed(() => {
  if (!journeyData.value?.timeline) return null
  let best = null
  journeyData.value.timeline.forEach(e => {
    if (e.time && e.outTime) {
      const lat = toMs(e.outTime) - toMs(e.time)
      if (lat > 0 && (!best || lat > best.lat)) best = { ...e, lat }
    }
  })
  return best
})

const slowestUri = computed(() => {
  const u = slowestApi.value?.uri
  if (!u) return '—'
  const parts = u.split('/').filter(Boolean)
  return '/' + parts.slice(-2).join('/')
})

const slowestUriWithLatency = computed(() => {
  if (!slowestApi.value) return '—'
  const latSec = (slowestApi.value.lat / 1000).toFixed(1)
  return `${slowestUri.value} · ${latSec}s`
})

// ── Interval toggle (visual; chart auto-detects its own interval) ─────────────
const INTERVAL_OPTS = [
  { val:  5 * 60000, label: '5 min'  },
  { val: 10 * 60000, label: '10 min' },
  { val: 15 * 60000, label: '15 min' },
  { val: 30 * 60000, label: '30 min' },
  { val: 60 * 60000, label: '1hr'    },
]

function autoIntervalMs(spanMs) {
  if (spanMs <= 10 * 60000)  return  5 * 60000
  if (spanMs <= 60 * 60000)  return  5 * 60000
  if (spanMs <= 3 * 3600000) return  5 * 60000
  if (spanMs <= 8 * 3600000) return 15 * 60000
  return 30 * 60000
}

const intervalMs = ref(15 * 60000)

const intervalLabel = computed(() => {
  const ms = intervalMs.value
  if (ms === 60 * 60000) return '1hr'
  return `${ms / 60000}-min`
})

// ── Log table ─────────────────────────────────────────────────────────────────
function statusCode(e) {
  return e.statusCode || e.responseCode || e.status
}

function statusClass(e) {
  const c = statusCode(e)
  if (!c) return ''
  if (c >= 500) return 'ulr-s5xx'
  if (c >= 400) return 'ulr-s4xx'
  return 'ulr-s2xx'
}

function evStyle(e) {
  const c = pc(e.event)
  return `color:${c.h};background:${c.bg};border-color:${c.br}`
}

const filteredLog = computed(() => {
  if (!journeyData.value?.timeline) return []
  const q = logSearch.value.trim().toLowerCase()
  return journeyData.value.timeline
    .map((e, i) => ({ ...e, _origIdx: i }))
    .filter(e => {
      const code = statusCode(e) || 0
      if (errorsOnly.value && code < 400) return false
      if (methodFilter.value !== 'all' && e.method !== methodFilter.value) return false
      if (statusFilter.value === '2xx' && !(code >= 200 && code < 300)) return false
      if (statusFilter.value === '4xx' && !(code >= 400 && code < 500)) return false
      if (statusFilter.value === '5xx' && !(code >= 500)) return false
      if (q && !e.uri?.toLowerCase().includes(q) && !e.event?.toLowerCase().includes(q)) return false
      return true
    })
})

function exportCsv() {
  const headers = ['#', 'Time', 'Event', 'Method', 'URI', 'Status', 'Out Time', 'Latency']
  const rows = filteredLog.value.map(e => [
    e._origIdx + 1,
    f8(e.time),
    e.event,
    e.method || '',
    e.uri || '',
    statusCode(e) || '',
    f8(e.outTime),
    latency(e.time, e.outTime),
  ])
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `journey_${form.value.uid}_${form.value.datePicker}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Actions ───────────────────────────────────────────────────────────────────
function openPopup(grp) {
  hideTooltip()
  popupGroup.value = grp
  popupOpen.value  = true
}

function openDetail(event) {
  detailEvent.value   = event
  if (journeyData.value?.date) logDate.value = journeyData.value.date
  detailVisible.value = true
}

function onMouseMove(evt) { if (ttVisible.value) positionTooltip(evt) }
function onKeyDown(e)     { if (e.key === 'Escape') popupOpen.value = false }
onMounted(()  => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>

<!-- Unscoped so CSS vars cascade into child components -->
<style>
.uj-ops {
  --bg2:       var(--surface);
  --bg3:       var(--canvas);
  --border:    var(--line-2);
  --border2:   var(--line);
  --text2:     var(--ink-2);
  --text3:     var(--muted);
  --surface3:  var(--line);
  --step-dot-bg: var(--surface);
  --step-line:   var(--line-2);
  --lane-hover:  rgba(71,98,227,.05);
  --zoom-bg:     var(--surface);
  --zoom-border: var(--line);
}
</style>

<style scoped>
/* ── Root ── */
.uj-ops {
  display: flex; flex-direction: column;
  background: var(--canvas); overflow-y: auto;
}
.uj-ops ::-webkit-scrollbar       { width: 5px; height: 5px; }
.uj-ops ::-webkit-scrollbar-track { background: transparent; }
.uj-ops ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }

/* ── Fetch card wrapper ── */
.uj-fetch-card {
  padding: 16px 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}

/* ── Fetch bar ── */
.uj-fetch-bar {
  display: flex; align-items: flex-end; gap: 12px;
  background: var(--canvas); border: 1px solid var(--line);
  border-radius: var(--radius); padding: 14px 16px;
  flex-wrap: wrap;
}
.uj-field         { display: flex; flex-direction: column; gap: 5px; min-width: 160px; }
.uj-field-grow    { flex: 1; }
.uj-lbl           { font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: .05em; text-transform: uppercase; }
.uj-opt           { font-weight: 400; text-transform: none; letter-spacing: 0; }
.uj-inp           { height: 36px; padding: 0 10px; border-radius: var(--radius-sm); border: 1px solid var(--line); background: var(--canvas); font-size: 13px; color: var(--ink); font-family: inherit; outline: none; transition: border-color .15s; }
.uj-inp:focus     { border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary-50); }
.uj-inp-date      { color-scheme: light; }
.uj-btn           { height: 36px; padding: 0 18px; display: flex; align-items: center; gap: 7px; white-space: nowrap; flex-shrink: 0; }
.uj-spin          { display: inline-block; width: 13px; height: 13px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: uj-spin .7s linear infinite; }
@keyframes uj-spin { to { transform: rotate(360deg); } }

/* ── Error bar ── */
.uj-err-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; background: var(--rose-50); color: var(--rose);
  font-size: 13px; font-weight: 600; border-bottom: 1px solid rgba(212,58,69,.18);
  flex-shrink: 0;
}
.uj-retry-btn {
  margin-left: auto; background: none; border: 1px solid var(--rose);
  border-radius: var(--radius-sm); color: var(--rose);
  font-size: 12px; font-weight: 600; padding: 3px 12px; cursor: pointer; font-family: inherit;
}
.uj-retry-btn:hover { background: var(--rose); color: #fff; }

/* ── Skeleton ── */
.uj-skel-wrap { display: flex; flex-direction: column; gap: 0; }
@keyframes uj-shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.uj-skel {
  background: linear-gradient(90deg, var(--line) 25%, var(--line-2) 50%, var(--line) 75%);
  background-size: 800px 100%;
  animation: uj-shimmer 1.4s ease-in-out infinite;
  border-radius: var(--radius-sm);
}
.uj-skel-bar   { display: flex; gap: 16px; padding: 10px 24px; border-bottom: 1px solid var(--line); background: var(--surface); }
.uj-skel-chip  { height: 20px; width: 120px; border-radius: 10px; }
.uj-skel-kpi-row { display: flex; border-bottom: 1px solid var(--line); background: var(--surface); }
.uj-skel-kpi   { flex: 1; height: 76px; margin: 14px 16px; }
.uj-skel-chart { height: 200px; margin: 16px 24px; }
.uj-skel-trail { height: 120px; margin: 16px 24px; }
.uj-skel-table { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 2px; }
.uj-skel-trow  { height: 34px; width: 100%; border-radius: 4px; }

/* ── Session info bar ── */
.uj-session-bar {
  display: flex; align-items: center; padding: 0 24px; height: 38px;
  background: var(--surface-2); border-bottom: 1px solid var(--line);
  overflow-x: auto; flex-shrink: 0; scrollbar-width: none;
}
.uj-session-bar::-webkit-scrollbar { display: none; }
.uj-session-tag {
  font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
  color: var(--muted); background: var(--canvas); border: 1px solid var(--line);
  padding: 3px 9px; border-radius: 4px; margin-right: 16px; flex-shrink: 0;
}
.uj-si          { font-size: 12px; color: var(--muted); white-space: nowrap; }
.uj-si strong   { color: var(--ink-2); font-weight: 600; }
.uj-sdiv        { width: 1px; height: 14px; background: var(--line); margin: 0 14px; flex-shrink: 0; }

/* ── KPI strip ── */
.uj-kpi-strip {
  display: flex; align-items: stretch; background: var(--surface);
  border-bottom: 1px solid var(--line); overflow-x: auto; scrollbar-width: none; flex-shrink: 0;
}
.uj-kpi-strip::-webkit-scrollbar { display: none; }
.uj-kpi       { display: flex; flex-direction: column; justify-content: center; padding: 14px 22px; gap: 2px; min-width: 130px; flex: 1; }
.uj-kpi-wide  { min-width: 200px; flex: 1.4; }
.uj-kpi-sep   { width: 1px; background: var(--line); flex-shrink: 0; }
.uj-kpi-hd    { display: flex; align-items: center; gap: 7px; margin-bottom: 4px; }
.uj-kpi-lbl   { font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); }
.uj-ico-blue   { color: var(--primary); }
.uj-ico-emerald { color: var(--emerald); }
.uj-ico-rose   { color: var(--rose); }
.uj-ico-amber  { color: var(--amber); }
.uj-kpi-val    { font-family: var(--display); font-size: 21px; font-weight: 700; letter-spacing: -.02em; color: var(--ink); line-height: 1.2; }
.uj-kpi-val-sm { font-size: 14px; font-weight: 600; color: var(--ink-2); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.uj-val-rose   { color: var(--rose); }
.uj-kpi-sub    { font-size: 11px; color: var(--muted); font-weight: 500; }

/* ── Sections ── */
.uj-section     { display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--line); }
.uj-section-logs { flex: 1; min-height: 0; }
.uj-sec-hd      { display: flex; align-items: center; gap: 10px; padding: 11px 24px 8px; flex-shrink: 0; flex-wrap: wrap; }
.uj-sec-title   { font-size: 13px; font-weight: 700; color: var(--ink); }
.uj-sec-sub     { font-size: 12px; color: var(--muted); }
.uj-badge       { font-size: 11px; font-weight: 600; color: var(--primary); background: var(--primary-50); border: 1px solid var(--primary-100); padding: 2px 10px; border-radius: 10px; }
.uj-chart-wrap  { padding: 2px 0 10px; }
.uj-trail-body  { flex: 1; overflow-x: auto; display: flex; flex-direction: column; min-height: 180px; }
.uj-log-icon    { font-size: 14px; }

/* ── Interval toggle ── */
.uj-int-toggle {
  display: flex; gap: 2px; padding: 2px;
  background: var(--canvas); border: 1px solid var(--line);
  border-radius: var(--radius-sm);
}
.uj-int-btn {
  height: 26px; padding: 0 10px; border-radius: calc(var(--radius-sm) - 2px);
  border: none; background: transparent;
  font-size: 11px; font-weight: 600; color: var(--ink-2);
  font-family: inherit; cursor: pointer; white-space: nowrap;
  transition: background .12s, color .12s;
}
.uj-int-btn:hover { background: var(--line-2); }
.uj-int-btn.active { background: var(--primary); color: #fff; }

/* ── Event-type select & generic select ── */
.uj-sel {
  height: 30px; padding: 0 8px; border-radius: var(--radius-sm);
  border: 1px solid var(--line); background: var(--canvas);
  font-size: 12px; color: var(--ink); font-family: inherit; outline: none; cursor: pointer;
}
.uj-sel:focus { border-color: var(--primary); }

/* ── Log section header ── */
.uj-log-hd      { border-top: 1px solid var(--line); }
.uj-export-btn  { margin-left: auto; display: flex; align-items: center; gap: 6px; }

/* ── Log controls strip ── */
.uj-log-controls {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 24px 10px; border-bottom: 1px solid var(--line);
  background: var(--canvas); flex-wrap: wrap; flex-shrink: 0;
}
.uj-search-wrap { display: flex; align-items: center; position: relative; flex: 1; min-width: 180px; }
.uj-search-ico  { position: absolute; left: 10px; color: var(--muted); pointer-events: none; }
.uj-search-inp  { width: 100%; padding-left: 32px !important; }
.uj-err-toggle  {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: var(--ink-2);
  padding: 5px 10px; border-radius: var(--radius-sm); border: 1px solid var(--line);
  background: var(--canvas); cursor: pointer; user-select: none; white-space: nowrap;
}
.uj-err-toggle.active { color: var(--rose); background: var(--rose-50); border-color: rgba(212,58,69,.3); }
.uj-checkbox  { width: 12px; height: 12px; accent-color: var(--rose); cursor: pointer; }

/* ── Log table ── */
.uj-log-head {
  display: grid;
  grid-template-columns: 38px 90px 140px 68px 1fr 64px 90px 70px;
  gap: 10px; padding: 7px 24px;
  font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: .07em; text-transform: uppercase;
  border-bottom: 1px solid var(--line); background: var(--canvas); flex-shrink: 0;
}
.uj-log-body { flex: 1; overflow-y: auto; min-height: 200px; max-height: 420px; }
.uj-log-row  {
  display: grid;
  grid-template-columns: 38px 90px 140px 68px 1fr 64px 90px 70px;
  gap: 10px; padding: 6px 24px;
  border-bottom: 1px solid var(--line-2);
  align-items: center; cursor: pointer; transition: background .1s; font-size: 13px;
}
.uj-log-row:hover { background: var(--canvas); }
.uj-log-row:last-child { border-bottom: none; }
.uj-log-empty { padding: 24px; text-align: center; color: var(--muted); font-size: 13px; }

.ulr-num  { font-size: 11px; color: var(--muted-2); font-family: var(--mono); }
.ulr-time { font-size: 12px; color: var(--ink-2); font-weight: 600; font-family: var(--mono); }
.ulr-ev   { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
.ulr-meth { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.m-GET  { color: var(--emerald); background: var(--emerald-50); border: 1px solid rgba(15,157,110,.25); }
.m-POST { color: var(--amber); background: var(--amber-50); border: 1px solid rgba(194,121,11,.25); }
.ulr-uri  { font-size: 12px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ulr-status { font-size: 12px; font-weight: 700; font-family: var(--mono); }
.ulr-s2xx { color: var(--emerald); }
.ulr-s4xx { color: var(--rose); }
.ulr-s5xx { color: var(--rose); }
.ulr-lat  { font-size: 12px; color: var(--ink-2); font-weight: 600; text-align: right; font-family: var(--mono); }

/* ── Empty / no-results ── */
.uj-empty      { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 60px 32px; }
.uj-empty-ico  { font-size: 42px; line-height: 1; }
.uj-empty-msg  { font-size: 17px; font-weight: 700; color: var(--ink-2); }
.uj-empty-hint { font-size: 13px; color: var(--muted); text-align: center; max-width: 340px; line-height: 1.7; }
</style>
