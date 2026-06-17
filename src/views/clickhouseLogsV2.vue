<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from '../store'
import { httpService } from '../services/httpservices'
import LogDetailDialog from '../components/LogDetailDialog.vue'

const store = useStore()

// ─── Filter state ─────────────────────────────────────────────────────────────
const filterDate      = ref('')
const filterFromTime  = ref('')
const filterToTime    = ref('')
const filterUserId    = ref('')
const filterSource    = ref('')
const filterModule    = ref('')
const filterMethod    = ref('')
const filterUrl       = ref('')
const filterOpen      = ref(false)

// ─── Pagination ───────────────────────────────────────────────────────────────
const pageNo    = ref(1)
const pageSize  = ref(100)
const PAGE_SIZES = [10, 100, 200, 300, 400, 500]

// ─── Data state ───────────────────────────────────────────────────────────────
const localData     = ref<any[]>([])
const hasSearched   = ref(false)
const noRecordsMsg  = ref('')
const isLoading     = ref(false)

// ─── Detail state ─────────────────────────────────────────────────────────────
const detailVisible  = ref(false)
const selectedRow    = ref<any>(null)

// ─── Toast ────────────────────────────────────────────────────────────────────
const toast = reactive({ show: false, msg: '' })

// ─── Computed ─────────────────────────────────────────────────────────────────
const isDataArray = computed(() => localData.value.length > 0)

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  const now = new Date()
  filterDate.value     = fmtDate(now)
  filterToTime.value   = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  const fromHour       = now.getHours() > 0 ? now.getHours() - 1 : 0
  filterFromTime.value = `${pad(fromHour)}:00`
})

// ─── API payload ──────────────────────────────────────────────────────────────
function buildPayload() {
  const advFilters = buildAdvFilters()
  return {
    fromDate : `${filterDate.value} ${filterFromTime.value}`,
    toDate   : `${filterDate.value} ${filterToTime.value}`,
    pageNo   : pageNo.value,
    pageSize : pageSize.value,
    userId   : filterUserId.value || null,
    condition: null,
    filters  : advFilters,
  }
}

function buildAdvFilters() {
  const operatorMap: Record<string, string> = { source: 'IS', module: 'IS', method: 'IS', url: 'LIKE' }
  const map: Record<string, string> = {
    source: filterSource.value,
    module: filterModule.value,
    method: filterMethod.value,
    url: filterUrl.value,
  }
  const filters: { field: string; operator: string; value: string }[] = []
  for (const key of Object.keys(map)) {
    if (map[key].trim()) {
      filters.push({ field: key, operator: operatorMap[key] || 'LIKE', value: map[key].trim() })
    }
  }
  return filters.length > 0 ? filters : null
}

// ─── Fetch ────────────────────────────────────────────────────────────────────
async function fetchData(isNextPage = false) {
  isLoading.value = true
  store.commit('accessLog/setClickhouseV2Loader', true)
  try {
    const { status, data } = await httpService.getClickhouseAccessLogV2(buildPayload())
    if (status === 200 && data.status?.toString().trim() === 'Ok' && data.result?.length > 0) {
      localData.value    = data.result
      noRecordsMsg.value = ''
      store.commit('accessLog/setClickhouseV2LogDetails', data.result)
    } else {
      if (isNextPage) {
        pageNo.value--
        showToast('No Records Found')
      } else {
        localData.value    = []
        noRecordsMsg.value = data.message || 'No Records Found'
        store.commit('accessLog/setClickhouseV2LogDetails', noRecordsMsg.value)
      }
    }
  } catch (e: any) {
    if (isNextPage) {
      pageNo.value--
      showToast('Request failed')
    } else {
      noRecordsMsg.value = e.message || 'Request failed'
    }
  } finally {
    isLoading.value = false
    store.commit('accessLog/setClickhouseV2Loader', false)
  }
}

function doSearch() {
  pageNo.value  = 1
  hasSearched.value = true
  fetchData(false)
}

function nextPage() {
  pageNo.value++
  fetchData(true)
}

function prevPage() {
  if (pageNo.value <= 1) return
  pageNo.value--
  fetchData(false)
}

function onPageSizeChange() {
  pageNo.value = 1
  if (hasSearched.value) fetchData(false)
}

// ─── Advanced filters ─────────────────────────────────────────────────────────
function clearAdvFilters() {
  filterSource.value = ''
  filterModule.value = ''
  filterMethod.value = ''
  filterUrl.value    = ''
}

function applyAdvFilters() {
  filterOpen.value = false
  doSearch()
}

// ─── Detail modal ─────────────────────────────────────────────────────────────
function openDetail(row: any) {
  selectedRow.value   = { ...row }
  detailVisible.value = true
}

// ─── Download ─────────────────────────────────────────────────────────────────
function downloadLogs() {
  if (!localData.value.length) return
  const cols = ['userId', 'url', 'method', 'inTime', 'outTime', 'source', 'module', 'vendor', 'deviceIp', 'totalTimeUs', 'logDate', 'id']
  const escape = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = [
    cols.join(','),
    ...localData.value.map(r => cols.map(c => escape(r[c])).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `clickhouse-logs-${filterDate.value}-p${pageNo.value}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(msg: string, duration = 3000) {
  toast.msg  = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, duration)
}

// ─── Style helpers ────────────────────────────────────────────────────────────
function methodStyle(method: string) {
  const MAP: Record<string, { background: string; color: string; borderColor: string }> = {
    GET   : { background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' },
    POST  : { background: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' },
    PUT   : { background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' },
    DELETE: { background: '#fee2e2', color: '#b91c1c', borderColor: '#fecaca' },
    PATCH : { background: '#f3e8ff', color: '#7e22ce', borderColor: '#e9d5ff' },
  }
  return MAP[method?.toUpperCase()] ?? { background: '#f3f4f6', color: '#4b5563', borderColor: '#e5e7eb' }
}


// ─── Source icon ─────────────────────────────────────────────────────────────
function sourceIcon(source: string) {
  const s = (source || '').toUpperCase()
  if (s.includes('ANDROID')) return { icon: 'android', color: '#3ddc84' }
  if (s.includes('IOS'))     return { icon: 'ios',     color: '#555' }
  if (s.includes('WEB'))     return { icon: 'web',     color: '#4f84c4' }
  return                              { icon: '-',  color: '' }
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function fmtDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function pad(n: number) { return String(n).padStart(2, '0') }

</script>

<template>
<div class="ch2-root">
  <!-- ── Priority filter bar ────────────────────────────────────────────── -->
  <div class="card ch2-filter-card">
    <div class="ch2-filter-body">
      <div class="ch2-filters-row">
        <label class="ch2-label">
          Date
          <input type="date" class="input ch2-input" v-model="filterDate" />
        </label>
        <label class="ch2-label">
          From
          <input type="time" class="input ch2-input" v-model="filterFromTime" />
        </label>
        <label class="ch2-label">
          To
          <input type="time" class="input ch2-input" v-model="filterToTime" />
        </label>
        <label class="ch2-label">
          User ID
          <input
            type="text"
            class="input ch2-input ch2-userid"
            v-model="filterUserId"
            placeholder="e.g. 45382515"
            @keyup.enter="doSearch"
          />
        </label>
        <button
          class="btn btn-accent ch2-find-btn"
          :disabled="isLoading"
          @click="doSearch"
        >
          <span v-if="isLoading" class="ch2-spin ch2-spin-white"></span>
          Find
        </button>

        <div class="ch2-toolbar-actions">
          <button
            v-if="isDataArray"
            :disabled="isLoading"
            class="btn btn-accent btn-sm"
            @click="downloadLogs"
          >Download</button>
          <button class="btn btn-sm" @click="filterOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.553.894l-4 2A1 1 0 017 17v-6.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
            </svg>
            Filter
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Main data card ─────────────────────────────────────────────────── -->
  <div class="card ch2-main-card">

    <!-- Before first search -->
    <div v-if="!hasSearched" class="ch2-empty-state">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <p class="ch2-empty-title">No data loaded</p>
      <p class="ch2-empty-sub">Set filters above and click <strong>Find</strong> to load Clickhouse access logs.</p>
    </div>

    <!-- No records / error after search -->
    <div v-else-if="!isDataArray && !isLoading" class="ch2-empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <p class="ch2-empty-title">{{ noRecordsMsg || 'No Records Found' }}</p>
    </div>

    <!-- Table -->
    <template v-else-if="isDataArray">
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr>
              <th>User ID</th>
              <th>URL</th>
              <th>Method</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in localData"
              :key="row.id"
              class="ch2-data-row"
              @click="openDetail(row)"
            >
              <td class="num">{{ row.userId }}</td>
              <td class="ch2-url-cell" :title="row.url">{{ row.url }}</td>
              <td>
                <span class="badge" :style="methodStyle(row.method)">{{ row.method }}</span>
              </td>
              <td class="num">{{ row.inTime }}</td>
              <td class="num">{{ row.outTime }}</td>
              <td>
                <span class="src-cell" :title="row.source">
                  <!-- Android -->
                  <svg v-if="sourceIcon(row.source).icon === 'android'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" :style="{ color: sourceIcon(row.source).color }">
                    <path d="M17.523 15.341A5 5 0 0 0 19 12a5 5 0 0 0-1.477-3.341l1.55-2.687a.5.5 0 0 0-.866-.5l-1.55 2.687A7.966 7.966 0 0 0 12 7a7.966 7.966 0 0 0-4.657 1.159L5.793 5.472a.5.5 0 0 0-.866.5l1.55 2.687A5 5 0 0 0 5 12a5 5 0 0 0 1.477 3.341C5.558 16.452 5 17.657 5 19h14c0-1.343-.558-2.548-1.477-3.659zM9.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg>
                  <!-- iOS / Apple -->
                  <svg v-else-if="sourceIcon(row.source).icon === 'ios'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" :style="{ color: sourceIcon(row.source).color }">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <!-- Web -->
                  <svg v-else-if="sourceIcon(row.source).icon === 'web'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :style="{ color: sourceIcon(row.source).color }">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span>{{ row.source || '—' }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <div class="ch2-pagesize-wrap">
          <span>Rows per page</span>
          <select class="input ch2-select" v-model.number="pageSize" @change="onPageSizeChange">
            <option v-for="s in PAGE_SIZES" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <span class="ch2-page-info">Page {{ pageNo }}</span>
        <div class="pages">
          <button :disabled="pageNo <= 1 || isLoading" @click="prevPage">
            <svg width="7" height="12" viewBox="0 0 10 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="8,2 2,8 8,14"/>
            </svg>
          </button>
          <button :disabled="isLoading" @click="nextPage">
            <svg width="7" height="12" viewBox="0 0 10 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="2,2 8,8 2,14"/>
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>

  <!-- ── Slide-in filter panel ──────────────────────────────────────────── -->
  <div
    class="drawer-backdrop"
    :class="{ open: filterOpen }"
    @click="filterOpen = false"
  ></div>
  <div class="drawer ch2-drawer" :class="{ open: filterOpen }">
    <div class="drawer-head">
      <h3>Advanced Filters</h3>
      <button class="btn btn-ghost btn-sm ch2-close-btn" @click="filterOpen = false">✕</button>
    </div>
    <div class="drawer-body">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div class="field">
          <label class="field-label">Source</label>
          <input type="text" class="input" v-model="filterSource" placeholder="e.g. mobile" />
        </div>
        <div class="field">
          <label class="field-label">Module</label>
          <input type="text" class="input" v-model="filterModule" placeholder="e.g. order" />
        </div>
        <div class="field">
          <label class="field-label">Method</label>
          <select class="input" v-model="filterMethod">
            <option value="">All methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">URL contains</label>
          <input type="text" class="input" v-model="filterUrl" placeholder="e.g. /trade" />
        </div>
      </div>
    </div>
    <div class="drawer-foot">
      <button class="btn" @click="clearAdvFilters">Clear</button>
      <button class="btn btn-accent" @click="applyAdvFilters">Apply &amp; Search</button>
    </div>
  </div>

  <!-- ── Detail modal ───────────────────────────────────────────────────── -->
  <LogDetailDialog
    :visible="detailVisible"
    :row="selectedRow"
    @close="detailVisible = false"
  />

  <!-- ── Toast ──────────────────────────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="ch2-toast-anim">
      <div v-if="toast.show" class="ch2-toast">{{ toast.msg }}</div>
    </Transition>
  </Teleport>
</div>
</template>

<style scoped>
.ch2-root { display: contents; }

/* ── Filter bar ───────────────────────────────────────────────────────────── */
.ch2-filter-card { margin-bottom: 12px; }
.ch2-filter-body { padding: 14px 18px; }
.ch2-filters-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}
.ch2-label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-2);
}
.ch2-input  { height: 34px; }
.ch2-userid { width: 170px; }
.ch2-find-btn {
  height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-end;
}
.ch2-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  align-self: flex-end;
}

/* ── Main card ────────────────────────────────────────────────────────────── */
.ch2-main-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ch2-main-card .table-wrap {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 260px);
  min-height: 0;
  scrollbar-width: thin;
}
.ch2-main-card table.data thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}
.ch2-data-row { cursor: pointer; }

/* ── URL cell – truncate long paths ──────────────────────────────────────── */
.ch2-url-cell {
  max-width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--mono);
  font-size: 12px;
}

/* ── Empty states ────────────────────────────────────────────────────────── */
.ch2-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 64px 24px;
  color: var(--muted-2);
}
.ch2-empty-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--muted);
  margin: 0;
}
.ch2-empty-sub {
  font-size: 13px;
  color: var(--muted-2);
  margin: 0;
  text-align: center;
  max-width: 380px;
  line-height: 1.6;
}

/* ── Pagination extras ───────────────────────────────────────────────────── */
.pagination .pages button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ch2-pagesize-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
}
.ch2-select {
  height: 28px;
  padding: 0 8px;
  width: auto;
  font-size: 12.5px;
}
.ch2-page-info { color: var(--muted); font-size: 12.5px; }

/* ── Spinner ─────────────────────────────────────────────────────────────── */
.ch2-spin {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: ch2spin 0.7s linear infinite;
  flex-shrink: 0;
}
.ch2-spin-white   { border-color: rgba(255,255,255,.35); border-top-color: #fff; }
.ch2-spin-primary { border-color: var(--line); border-top-color: var(--primary); }
@keyframes ch2spin { to { transform: rotate(360deg); } }

/* ── Drawer ──────────────────────────────────────────────────────────────── */
.ch2-drawer { width: 360px; }
.ch2-close-btn { margin-left: auto; }

/* ── Source cell ─────────────────────────────────────────────────────────── */
.src-cell {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
}
.src-cell svg { flex-shrink: 0; }

/* ── Toast ───────────────────────────────────────────────────────────────── */
.ch2-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: #fff;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  white-space: nowrap;
}
.ch2-toast-anim-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.ch2-toast-anim-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.ch2-toast-anim-enter-from  { opacity: 0; transform: translateX(-50%) translateY(8px); }
.ch2-toast-anim-leave-to    { opacity: 0; transform: translateX(-50%) translateY(8px); }
</style>
