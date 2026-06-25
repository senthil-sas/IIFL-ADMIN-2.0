<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import UserDetailPanel, { type ApiUser } from '../components/drawers/UserDetailPanel.vue'
import { avatarColor, initials } from '../data/avatar'
import { httpService } from '../services/httpservices'

// ── Stat cards ──────────────────────────────────────────────────────────────
interface StatusCountItem { status: string; statusName: string; userCount: number }

const statusCountsLoading = ref(true)
const statusCountsData = ref<StatusCountItem[]>([])

const STATUS_CARD_CONFIG: Record<string, { label: string; sub: string; color: string }> = {
  ALL_USERS:        { label: 'All Customers',   sub: 'total onboarded',  color: 'var(--primary)' },
  ACTIVE_USER:      { label: 'Active Users',     sub: 'currently active', color: 'var(--emerald)' },
  DORMANT:          { label: 'Dormant',          sub: '30d+ inactive',    color: 'var(--amber)' },
  FREEZE:           { label: 'Freeze',           sub: 'account frozen',   color: 'var(--rose)' },
  VOLUNTARY_FREEZE: { label: 'Voluntary Freeze', sub: 'self-frozen',      color: 'var(--violet)' },
  CLOSED:           { label: 'Closed',           sub: 'account closed',   color: 'var(--muted)' },
}
const CARD_ORDER = ['ALL_USERS', 'ACTIVE_USER', 'DORMANT', 'FREEZE', 'VOLUNTARY_FREEZE', 'CLOSED']

interface StatCard { id: string; label: string; value: number; sub: string; color: string }
const statCards = computed<StatCard[]>(() => {
  if (statusCountsLoading.value || !statusCountsData.value.length) return []
  return CARD_ORDER.reduce<StatCard[]>((acc, name) => {
    const item = statusCountsData.value.find((s) => s.statusName === name)
    const cfg = STATUS_CARD_CONFIG[name]
    if (item && cfg) acc.push({ id: name, label: cfg.label, value: item.userCount, sub: cfg.sub, color: cfg.color })
    return acc
  }, [])
})

// ── User table ──────────────────────────────────────────────────────────────
const openUser = ref<ApiUser | null>(null)

const STATUS_DISPLAY: Record<string, [string, string]> = {
  A: ['badge-green',  'Active'],
  D: ['badge-amber',  'Dormant'],
  F: ['badge-rose',   'Freeze'],
  V: ['badge-violet', 'Vol. Freeze'],
  X: ['badge-gray',   'Closed'],
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
const pageSize = ref(10)
const usersLoading = ref(true)
const users = ref<ApiUser[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalRecords = ref(0)

async function fetchUsers(page: number) {
  usersLoading.value = true
  try {
    const res = await httpService.getUserDetails({ pageNo: page, pageSize: pageSize.value })
    const result = res.data?.result?.[0]
    if (result) {
      users.value = result.users ?? []
      totalPages.value = result.totalPages
      totalRecords.value = result.totalRecords
      currentPage.value = result.currentPage
    }
  } finally {
    usersLoading.value = false
  }
}

onMounted(() => {
  Promise.all([
    httpService.getStatusCount().then((res) => {
      if (res.data?.result) statusCountsData.value = res.data.result
    }).catch(() => {}).finally(() => { statusCountsLoading.value = false }),
    fetchUsers(1),
  ])
})

// ── Pagination ──────────────────────────────────────────────────────────────
const pageWindow = computed<(number | '…')[]>(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = [1]
  if (cur > 3) pages.push('…')
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p)
  if (cur < total - 2) pages.push('…')
  pages.push(total)
  return pages
})

function goToPage(p: number | '…') {
  if (typeof p !== 'number' || p === currentPage.value || p < 1 || p > totalPages.value) return
  fetchUsers(p)
}

const rangeStart = computed(() => (currentPage.value - 1) * pageSize.value + 1)
const rangeEnd = computed(() => Math.min(currentPage.value * pageSize.value, totalRecords.value))

function onPageSizeChange() {
  fetchUsers(1)
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const query = ref('')
const filteredUsers = computed(() => {
  if (!query.value) return users.value
  const q = query.value.toLowerCase()
  return users.value.filter((u) =>
    [u.firstName, u.lastName, u.ucc, u.email, u.mobile, u.pan].some((s) => s?.toLowerCase().includes(q))
  )
})

function displayName(u: ApiUser) {
  const last = u.lastName && u.lastName !== 'NA' ? u.lastName : ''
  return [u.firstName, last].filter(Boolean).join(' ')
}

function formatDate(dt: string) {
  if (!dt) return '—'
  return dt.split(' ')[0]
}
</script>

<template>
  <!-- Stat cards -->
  <div class="cm-stat-card" style="margin-bottom:14px">
    <template v-if="statusCountsLoading">
      <div v-for="n in 6" :key="n" class="cm-stat cm-stat-skeleton">
        <div class="skel-line skel-lbl" />
        <div class="skel-line skel-val" />
      </div>
    </template>
    <template v-else>
      <div v-for="k in statCards" :key="k.id" class="cm-stat">
        <div class="cm-stat-lbl">{{ k.label }}</div>
        <div class="cm-stat-v">
          <span class="num" :style="{ color: k.color }">{{ k.value.toLocaleString('en-IN') }}</span>
          <span class="sub">{{ k.sub }}</span>
        </div>
      </div>
    </template>
  </div>

  <!-- Search row -->
  <div style="display:flex;justify-content:flex-end;margin-bottom:14px">
    <div class="filter-input">
      <Icon name="search" :size="13" />
      <input v-model="query" placeholder="Name, UCC, email, mobile, PAN…" />
    </div>
  </div>

  <!-- Table -->
  <div class="card" style="margin-bottom:18px">
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr>
            <th>Client</th>
            <th>UCC</th>
            <th>Mobile</th>
            <th>PAN</th>
            <th>Status</th>
            <th>Role</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody v-if="usersLoading">
          <tr v-for="n in pageSize" :key="n">
            <td colspan="7">
              <div class="skel-line" style="height:14px;width:100%;border-radius:4px" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="u in filteredUsers"
            :key="u.ucc"
            style="cursor:pointer"
            :style="{ background: openUser?.ucc === u.ucc ? 'var(--primary-50)' : undefined }"
            @click="openUser = openUser?.ucc === u.ucc ? null : u"
          >
            <td>
              <div class="user-cell">
                <div class="av" :style="{ background: avatarColor(u.firstName) }">{{ initials(u.firstName) }}</div>
                <div>
                  <div class="uc-name">{{ displayName(u) }}</div>
                  <div class="uc-sub">{{ u.email }}</div>
                </div>
              </div>
            </td>
            <td class="col-id">{{ u.ucc }}</td>
            <td class="num" style="color:var(--muted)">{{ u.mobile }}</td>
            <td class="num" style="color:var(--muted);font-family:monospace">{{ u.pan }}</td>
            <td>
              <span class="badge" :class="STATUS_DISPLAY[u.status]?.[0] ?? 'badge-gray'">
                <span class="badge-dot" />{{ STATUS_DISPLAY[u.status]?.[1] ?? u.status }}
              </span>
            </td>
            <td style="font-size:12px;color:var(--muted)">{{ u.userRole }}</td>
            <td class="num" style="color:var(--muted)">{{ formatDate(u.createdOn) }}</td>
          </tr>
          <tr v-if="!filteredUsers.length">
            <td colspan="7" style="text-align:center;padding:32px;color:var(--muted)">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span>Showing {{ rangeStart.toLocaleString('en-IN') }}–{{ rangeEnd.toLocaleString('en-IN') }} of {{ totalRecords.toLocaleString('en-IN') }}</span>
      <div class="page-size-select">
        Rows per page:
        <select v-model="pageSize" @change="onPageSizeChange">
          <option v-for="opt in PAGE_SIZE_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
      <div class="pages">
        <button :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">‹</button>
        <template v-for="p in pageWindow" :key="p">
          <button v-if="p === '…'" disabled>…</button>
          <button v-else :class="{ active: p === currentPage }" @click="goToPage(p)">{{ p }}</button>
        </template>
        <button :disabled="currentPage >= totalPages" @click="goToPage(currentPage + 1)">›</button>
      </div>
    </div>
  </div>

  <UserDetailPanel v-if="openUser" :user="openUser" @close="openUser = null" />
  <CodifiFoot />
</template>

<style scoped>
.cm-stat-skeleton { pointer-events: none; }
.skel-line {
  border-radius: 4px;
  background: linear-gradient(90deg, var(--line-2) 25%, var(--surface-2, #f0f0f0) 50%, var(--line-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.skel-lbl { height: 11px; width: 70%; margin-bottom: 10px; }
.skel-val { height: 22px; width: 50%; }
@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
.pages button:disabled { opacity: 0.35; cursor: default; }
.page-size-select {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  margin-left: auto;
}
.page-size-select select {
  border: 1px solid var(--line-2);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 12px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}
</style>
