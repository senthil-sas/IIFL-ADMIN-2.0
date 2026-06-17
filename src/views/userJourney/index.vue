<template>
  <div class="uj-root" data-theme="light" @mousemove="onMouseMove">

    <JourneyHeader
      :user-display="headerUser"
      :date-display="headerDate"
    />

    <div class="uj-layout">
      <JourneySidebar
        :data="journeyData"
        :hidden-events="hiddenEvents"
        :loading="loading"
        @fetch="onFetch"
        @toggle-event="toggleEvent"
      />

      <div class="uj-main">
        <JourneyToolbar
          :event-count="eventCount"
          :time-range="timeRange"
        />

        <!-- Timeline wrap -->
        <div class="uj-tl-wrap">

          <!-- Empty / error state -->
          <div v-if="!journeyData && !fetchError" class="state-box">
            <div class="state-icon">📡</div>
            <div class="state-msg">No data loaded</div>
            <div class="state-sub">Enter a User ID and date, then click <strong>Fetch Journey</strong></div>
          </div>

          <div v-else-if="fetchError" class="state-box">
            <div class="state-icon">⚠️</div>
            <div class="state-msg" style="color:#f87171">Error</div>
            <div class="state-sub">{{ fetchError }}</div>
          </div>

          <template v-else-if="journeyData">
            <!-- ── Bar chart section (collapsible) ── -->
            <div class="bar-section" :class="{ collapsed: barChartCollapsed }">
              <div class="section-hdr" @click="barChartCollapsed = !barChartCollapsed">
                <div class="shdr-left">
                  <span class="shdr-icon">📈</span>
                  <span class="shdr-title">API Activity Distribution</span>
                  <span class="shdr-badge">histogram</span>
                </div>
                <button class="shdr-toggle" :title="barChartCollapsed ? 'Expand' : 'Collapse'">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round"
                    class="chevron-icon" :class="{ rotated: barChartCollapsed }">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div v-show="!barChartCollapsed">
                <JourneyBarChart
                  :data="journeyData"
                  :hidden-events="hiddenEvents"
                  @highlight="onHighlight"
                  @open-detail="openChDetail"
                />
              </div>
            </div>

            <!-- ── Step Flow section (collapsible) ── -->
            <div class="chart-section" :class="{ collapsed: chartCollapsed }">
              <div class="section-hdr" @click="chartCollapsed = !chartCollapsed">
                <div class="shdr-left">
                  <span class="shdr-icon">📊</span>
                  <span class="shdr-title">Step Flow</span>
                  <span class="shdr-badge">{{ eventCount }}</span>
                </div>
                <button class="shdr-toggle" :title="chartCollapsed ? 'Expand' : 'Collapse'">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round"
                    class="chevron-icon" :class="{ rotated: chartCollapsed }">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div v-show="!chartCollapsed" class="chart-body">
                <StepFlowView
                  :data="journeyData"
                  :hidden-events="hiddenEvents"
                  @highlight="onHighlight"
                  @open-popup="openPopup"
                  @tooltip-show="showTooltip"
                  @tooltip-hide="hideTooltip"
                />
              </div>
            </div>

            <!-- ── Log section (collapsible) ── -->
            <LogTable
              :data="journeyData"
              :hidden-events="hiddenEvents"
              :highlight-index="highlightIndex"
              :expanded="logExpanded"
              @toggle="logExpanded = !logExpanded"
              @highlight="onHighlight"
              @open-detail="openChDetail"
              @tooltip-show="showTooltip"
              @tooltip-hide="hideTooltip"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Cluster / single-event popup -->
    <ZoomPopup
      :open="popupOpen"
      :group="popupGroup"
      @close="popupOpen = false"
      @highlight="onPopupHighlight"
      @open-detail="openChDetail"
    />

    <!-- Clickhouse log detail dialog -->
    <LogDetailDialog
      :visible="chDetailVisible"
      :row="chDetailEvent"
      :log-date="chLogDate"
      @close="chDetailVisible = false"
    />

    <!-- Hover tooltip -->
    <AppTooltip
      :visible="ttVisible"
      :pos="ttPos"
      :event="ttEvent"
      :seq="ttSeq"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { f8 } from './utils/timeHelpers'
import { useJourneyData } from './composables/useJourneyData'
import { useTooltip } from './composables/useTooltip'

import JourneyHeader         from './components/JourneyHeader.vue'
import JourneySidebar        from './components/JourneySidebar.vue'
import JourneyToolbar        from './components/JourneyToolbar.vue'
import JourneyBarChart       from './components/JourneyBarChart.vue'
import StepFlowView          from './components/StepFlowView.vue'
import LogTable              from './components/LogTable.vue'
import ZoomPopup             from './components/ZoomPopup.vue'
import AppTooltip            from './components/AppTooltip.vue'
import LogDetailDialog from '../../components/LogDetailDialog.vue'

// ── Data layer ──────────────────────────────────────────────────────────────
const {
  journeyData, loading, fetchError,
  headerUser, headerDate,
  fetchJourney,
} = useJourneyData()

const {
  ttVisible, ttPos, ttEvent, ttSeq,
  showTooltip, hideTooltip, positionTooltip,
} = useTooltip()

// ── UI state ─────────────────────────────────────────────────────────────────
const hiddenEvents      = ref(new Set())
const highlightIndex    = ref(-1)
const popupOpen         = ref(false)
const popupGroup        = ref(null)
const chartCollapsed    = ref(false)
const barChartCollapsed = ref(false)
const logExpanded       = ref(true)

// Clickhouse detail dialog
const chDetailVisible   = ref(false)
const chDetailEvent     = ref(null)
const chLogDate         = ref('')    // DDMMYYYY kept in sync with the fetch form

const eventCount = computed(() => {
  if (!journeyData.value) return '—'
  const vis = journeyData.value.timeline.filter(e => !hiddenEvents.value.has(e.event)).length
  return `${vis} / ${journeyData.value.timeline.length} events`
})

const timeRange = computed(() => {
  if (!journeyData.value) return '—'
  return `${f8(journeyData.value.firstActivityTime)} → ${f8(journeyData.value.lastActivityTime)}`
})

// ── Actions ───────────────────────────────────────────────────────────────────
async function onFetch(params) {
  hiddenEvents.value      = new Set()
  highlightIndex.value    = -1
  chartCollapsed.value    = false
  barChartCollapsed.value = false
  logExpanded.value       = true

  await fetchJourney(params)

  // Pick logDate directly from API response (DDMMYYYY)
  if (journeyData.value?.date) {
    chLogDate.value = journeyData.value.date   // e.g. "04062026"
  }
}

function openChDetail(event) {
  chDetailEvent.value   = event
  chDetailVisible.value = true
}

function toggleEvent(ev) {
  const next = new Set(hiddenEvents.value)
  next.has(ev) ? next.delete(ev) : next.add(ev)
  hiddenEvents.value = next
}

function onHighlight(idx) {
  highlightIndex.value = idx
  if (!logExpanded.value) logExpanded.value = true
  setTimeout(() => {
    document.querySelector('.log-row.hl')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, 80)
}

function openPopup(grp) {
  hideTooltip()
  popupGroup.value = grp
  popupOpen.value  = true
}

function onPopupHighlight(origIdx) { onHighlight(origIdx) }

function onMouseMove(evt) {
  if (ttVisible.value) positionTooltip(evt)
}

function onKeyDown(e) {
  if (e.key === 'Escape') popupOpen.value = false
}
onMounted(()  => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>

<!-- Global: theme tokens + scrollbar (no scoped so CSS vars cascade to children) -->
<style>
.uj-root {
  --bg: var(--canvas);
  --bg2: var(--surface);
  --bg3: var(--canvas);
  --bg4: var(--surface);
  --surface2: var(--surface-2);
  --surface3: var(--line);
  --border: var(--line-2);
  --border2: var(--line);
  --border3: #c4c8d4;
  --text: var(--ink);
  --text2: var(--ink-2);
  --text3: var(--muted);
  --text4: var(--muted-2);
  --shadow: rgba(15,22,36,.08);
  --lane-a: rgba(0,0,0,.016);
  --lane-b: rgba(0,0,0,.008);
  --lane-hover: rgba(71,98,227,.05);
  --grid-h: rgba(0,0,0,.10);
  --grid-m: rgba(0,0,0,.04);
  --ruler: var(--surface);
  --labels: var(--surface);
  --step-line: var(--line-2);
  --step-dot-bg: var(--surface);
  --zoom-bg: var(--surface);
  --zoom-border: var(--line);
  --accent: var(--primary);
  --hover: var(--primary-50);
}

.uj-root ::-webkit-scrollbar       { width: 5px; height: 5px; }
.uj-root ::-webkit-scrollbar-track { background: transparent; }
.uj-root ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
</style>

<style scoped>
.uj-root {
  display: flex; flex-direction: column;
  height: 100%; overflow: hidden;
  background: var(--canvas); color: var(--ink);
  font-size: 15px; line-height: 1.55;
  font-family: var(--sans);
}

.uj-layout { display: flex; flex: 1; overflow: hidden; }

.uj-main {
  flex: 1; display: flex; flex-direction: column;
  overflow: hidden; background: var(--canvas); min-width: 0;
}

/* Timeline wrap: flex column, fills remaining space */
.uj-tl-wrap {
  flex: 1; display: flex; flex-direction: column;
  overflow: hidden; min-height: 0;
}

/* Empty/error state */
.state-box {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 14px; padding: 48px;
}
.state-icon { font-size: 48px; line-height: 1; }
.state-msg  { font-size: 18px; font-weight: 700; color: var(--ink-2); }
.state-sub  { font-size: 14px; color: var(--muted); text-align: center; max-width: 340px; line-height: 1.7; }

/* ── Bar chart section (fixed height, collapsible) ── */
.bar-section {
  flex-shrink: 0;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  transition: max-height 0.25s ease;
}
.bar-section.collapsed { /* controlled by v-show on child */ }

/* ── Step / Swim-lane section ── */
.chart-section {
  display: flex; flex-direction: column;
  flex: 0 0 300px;   /* fixed height — log panel fills the rest */
  overflow: hidden; min-height: 0;
  border-bottom: 1px solid var(--line);
}
.chart-section.collapsed { flex: 0 0 40px; }

.section-hdr {
  display: flex; align-items: center; justify-content: space-between;
  height: 40px; padding: 0 18px; flex-shrink: 0;
  border-bottom: 1px solid var(--line);
  background: var(--surface); cursor: pointer; user-select: none;
  transition: background 0.12s;
}
.section-hdr:hover { background: var(--surface-2); }

.shdr-left   { display: flex; align-items: center; gap: 10px; }
.shdr-icon   { font-size: 14px; }
.shdr-title  { font-size: 13px; font-weight: 700; color: var(--ink); }
.shdr-badge  {
  font-size: 11px; font-weight: 600;
  color: var(--primary); background: var(--primary-50);
  border: 1px solid var(--primary-100); padding: 1px 8px; border-radius: 10px;
}
.shdr-toggle {
  background: none; border: none; cursor: pointer; padding: 4px;
  color: var(--muted); display: flex; align-items: center;
}
.chevron-icon {
  width: 16px; height: 16px; transition: transform 0.25s ease;
}
.chevron-icon.rotated { transform: rotate(180deg); }

.chart-body {
  flex: 1; display: flex; flex-direction: column;
  overflow: hidden; min-height: 0;
}
</style>
