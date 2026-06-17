<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import { useStore } from '../store'

// ── Reports tab (static) ──────────────────────────────────────────────────────
interface Report {
  id: string; name: string; cat: string; freq: string
  last: string; size: string; fmt: string
  status: 'ready' | 'queued' | 'failed'
}

const REPORTS: Report[] = [
  { id: 'RPT-EOD-001', name: 'EOD Trade Book', cat: 'Trading', freq: 'Daily', last: '07 May 2026 18:42', size: '4.8 MB', fmt: 'XLSX', status: 'ready' },
  { id: 'RPT-MIS-014', name: 'Margin Shortfall Statement', cat: 'Risk', freq: 'Daily', last: '07 May 2026 18:30', size: '1.2 MB', fmt: 'CSV', status: 'ready' },
  { id: 'RPT-SIP-022', name: 'SIP Failures (30D)', cat: 'SIP', freq: 'Weekly', last: '05 May 2026 09:00', size: '320 KB', fmt: 'CSV', status: 'ready' },
  { id: 'RPT-REG-008', name: 'SEBI Quarterly Filing', cat: 'Regulatory', freq: 'Quarterly', last: '01 Apr 2026 10:15', size: '12.4 MB', fmt: 'PDF', status: 'ready' },
  { id: 'RPT-CLI-031', name: 'New Client Activations', cat: 'Onboarding', freq: 'Weekly', last: '05 May 2026 09:02', size: '186 KB', fmt: 'XLSX', status: 'queued' },
  { id: 'RPT-FUN-019', name: 'Pay-in / Pay-out Reconciliation', cat: 'Funds', freq: 'Daily', last: '07 May 2026 19:05', size: '2.1 MB', fmt: 'CSV', status: 'ready' },
]

const RPT_BADGE: Record<Report['status'], [string, string]> = {
  ready: ['badge-success', 'Ready'],
  queued: ['badge-info', 'Queued'],
  failed: ['badge-danger', 'Failed'],
}

const PILLS = [
  { id: 'all', lbl: 'All', count: 142 },
  { id: 'trading', lbl: 'Trading', count: 36 },
  { id: 'risk', lbl: 'Risk', count: 18 },
  { id: 'reg', lbl: 'Regulatory', count: 24 },
  { id: 'sip', lbl: 'SIP', count: 12 },
]

// ── Tab state ─────────────────────────────────────────────────────────────────
const activeTab = ref<'reports' | 'contracts'>('reports')

// ── Contracts tab ─────────────────────────────────────────────────────────────
const store = useStore()
const contractDetails = computed(() => store.getters['contracts/getContractDetails'] as Record<string, unknown>[])
const contractsLoading = computed(() => store.getters['contracts/getIsLoading'] as boolean)

const HEADER_FIRST = ['entry_date', 'date_with_day']
const HEADER_CUSTOM = ['NSE','BSE','NFO','BFO','MCX','NCDEXCOMM','NCO','CDS','BCD','index','equity_cash','if','io','sf','so','futidx','optidx','futstk','optstk','futcom','futcur','optcur','optfut','futbas','futbln','futenr','futird','futirt','optbln','optird']

const orderedHeaders = computed(() => {
  if (!contractDetails.value.length) return []
  const allKeys = Object.keys(contractDetails.value[0])
  const remaining = allKeys.filter(k => !HEADER_FIRST.includes(k))
  const ordered = HEADER_CUSTOM.filter(k => remaining.includes(k))
  return [...HEADER_FIRST, ...ordered]
})

function formatDate(val: unknown) {
  if (!val) return val
  const d = new Date(val as string)
  if (isNaN(d.getTime())) return val
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatNum(num: unknown) {
  if (num === null || num === undefined || num === '') return '0'
  const n = Number(num)
  if (isNaN(n)) return String(num)
  return n.toLocaleString('en-IN')
}

const SKIP_DIFF = new Set(['created_on', 'created_by', 'date_with_day', 'entry_date'])

function getCellClass(row: Record<string, unknown>, index: number, key: string) {
  if (SKIP_DIFF.has(key) || index === contractDetails.value.length - 1) return ''
  const prev = Number(contractDetails.value[index + 1][key])
  const curr = Number(row[key])
  const diff = curr - prev
  if (diff > 0) return 'cell-up'
  if (diff < 0) return 'cell-down'
  return ''
}

function getArrow(row: Record<string, unknown>, index: number, key: string) {
  if (SKIP_DIFF.has(key) || index === contractDetails.value.length - 1) return ''
  const diff = Number(row[key]) - Number(contractDetails.value[index + 1][key])
  return diff > 0 ? '▲' : diff < 0 ? '▼' : ''
}

function getArrowClass(row: Record<string, unknown>, index: number, key: string) {
  if (SKIP_DIFF.has(key) || index === contractDetails.value.length - 1) return ''
  const diff = Number(row[key]) - Number(contractDetails.value[index + 1][key])
  return diff > 0 ? 'arrow-up' : diff < 0 ? 'arrow-down' : ''
}

function switchTab(tab: 'reports' | 'contracts') {
  activeTab.value = tab
  if (tab === 'contracts' && !contractDetails.value.length && !contractsLoading.value) {
    store.dispatch('contracts/getContractDetails')
  }
}

onUnmounted(() => {
  store.commit('contracts/setContractDetails', [])
})
</script>

<template>
  <!-- Tab nav -->
  <div class="tabs-underline" style="margin-bottom:18px">
    <button :class="{ active: activeTab === 'reports' }" @click="switchTab('reports')">Reports</button>
    <button :class="{ active: activeTab === 'contracts' }" @click="switchTab('contracts')">Contracts</button>
  </div>

  <!-- ── Reports tab ─────────────────────────────────────────────────────── -->
  <template v-if="activeTab === 'reports'">
    <div class="stripe" style="margin-bottom:18px">
      <div><div class="label-mono">Reports available</div><div class="value">142</div></div>
      <div><div class="label-mono">Generated today</div><div class="value">38</div></div>
      <div><div class="label-mono">Scheduled</div><div class="value">22</div></div>
      <div><div class="label-mono">Failed (24h)</div><div class="value">2</div></div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <button v-for="(p, i) in PILLS" :key="p.id" type="button" class="cm-pill" :class="{ active: i === 0 }">
          {{ p.lbl }}<span class="cm-pill-count">{{ p.count }}</span>
        </button>
      </div>
      <div class="filter-input" style="margin-left:auto">
        <Icon name="search" :size="13" /><input placeholder="Search reports…" />
      </div>
    </div>

    <div class="card">
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr>
              <th>Report ID</th><th>Name</th><th>Category</th><th>Frequency</th>
              <th>Last generated</th><th>Format</th>
              <th style="text-align:right">Size</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in REPORTS" :key="r.id">
              <td><span class="col-id">{{ r.id }}</span></td>
              <td style="font-weight:500">{{ r.name }}</td>
              <td><span class="pill">{{ r.cat }}</span></td>
              <td>{{ r.freq }}</td>
              <td class="num" style="color:var(--muted)">{{ r.last }}</td>
              <td class="mono" style="font-size:11.5px;color:var(--muted)">{{ r.fmt }}</td>
              <td class="num" style="text-align:right">{{ r.size }}</td>
              <td>
                <span class="badge" :class="RPT_BADGE[r.status][0]" style="min-width:82px;justify-content:center">
                  <span class="badge-dot" />{{ RPT_BADGE[r.status][1] }}
                </span>
              </td>
              <td style="text-align:right">
                <button class="btn btn-sm" :disabled="r.status !== 'ready'">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span>Showing 1–6 of 142</span>
        <div class="pages">
          <button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>›</button>
        </div>
      </div>
    </div>
  </template>

  <!-- ── Contracts tab ───────────────────────────────────────────────────── -->
  <template v-else-if="activeTab === 'contracts'">
    <!-- Loading -->
    <div v-if="contractsLoading" class="card" style="padding:48px;text-align:center;color:var(--muted)">
      Loading contract details…
    </div>

    <!-- Empty -->
    <div v-else-if="!contractDetails.length" class="card" style="padding:48px;text-align:center;color:var(--muted)">
      No contract data available.
    </div>

    <!-- Table -->
    <div v-else class="card" style="overflow:auto">
      <table class="data contracts-table">
        <thead>
          <tr>
            <th v-for="key in orderedHeaders" :key="key" :class="{ 'col-sticky-0': key === 'entry_date', 'col-sticky-1': key === 'date_with_day' }">
              {{ key.replace(/_/g, ' ').toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in contractDetails" :key="index">
            <td
              v-for="key in orderedHeaders"
              :key="key"
              :class="[getCellClass(row, index, key), { 'col-sticky-0': key === 'entry_date', 'col-sticky-1': key === 'date_with_day' }]"
              class="num"
            >
              <template v-if="key === 'entry_date'">{{ formatDate(row[key]) }}</template>
              <template v-else-if="key === 'date_with_day'">{{ row[key] }}</template>
              <template v-else>
                {{ formatNum(row[key]) }}
                <span v-if="getArrow(row, index, key)" :class="getArrowClass(row, index, key)" class="arrow">{{ getArrow(row, index, key) }}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <CodifiFoot />
</template>

<style scoped>
.contracts-table {
  min-width: max-content;
  border-collapse: collapse;
  font-size: 13px;
}
.contracts-table th,
.contracts-table td {
  white-space: nowrap;
  padding: 8px 14px;
  text-align: right;
}
.contracts-table th:first-child,
.contracts-table td:first-child,
.contracts-table th:nth-child(2),
.contracts-table td:nth-child(2) {
  text-align: left;
}
.col-sticky-0 {
  position: sticky;
  left: 0;
  z-index: 2;
  min-width: 120px;
  width: 120px;
  background: var(--surface);
}
.col-sticky-1 {
  position: sticky;
  left: 120px;
  z-index: 1;
  background: var(--surface);
  box-shadow: 2px 0 4px rgba(15,22,36,0.06);
}
.contracts-table thead .col-sticky-0,
.contracts-table thead .col-sticky-1 {
  z-index: 3;
  background: var(--canvas);
}
.cell-up {
  background: var(--emerald-50);
  color: var(--emerald);
}
.cell-down {
  background: var(--rose-50);
  color: var(--rose);
}
.arrow {
  font-size: 9px;
  margin-left: 3px;
}
.arrow-up { color: var(--emerald); }
.arrow-down { color: var(--rose); }
</style>
