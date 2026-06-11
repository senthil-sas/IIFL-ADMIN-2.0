<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import ClientDetailPanel from '../components/drawers/ClientDetailPanel.vue'
import { avatarColor, initials } from '../data/avatar'
import { CLIENT_DATA, STATUS_BADGE, maskEmail, maskMobile, type Client } from '../data/clients'

const filter = ref('all')
const openId = ref<string | null>(null)
const selected = ref<Set<string>>(new Set())
const query = ref('')

const counts = computed<Record<string, number>>(() => ({
  all: CLIENT_DATA.length,
  active: CLIENT_DATA.filter((c) => c.status === 'active').length,
  'logged-in': CLIENT_DATA.filter((c) => c.loggedInToday).length,
  blocked: CLIENT_DATA.filter((c) => c.status === 'blocked').length,
  dormant: CLIENT_DATA.filter((c) => c.status === 'dormant').length,
  mtf: CLIENT_DATA.filter((c) => c.mtfActive).length,
}))

const matches = (c: Client): boolean => {
  if (filter.value === 'active' && c.status !== 'active') return false
  if (filter.value === 'logged-in' && !c.loggedInToday) return false
  if (filter.value === 'blocked' && c.status !== 'blocked') return false
  if (filter.value === 'dormant' && c.status !== 'dormant') return false
  if (filter.value === 'mtf' && !c.mtfActive) return false
  if (query.value) {
    const q = query.value.toLowerCase()
    if (![c.name, c.id, c.email, c.mobile].some((s) => s.toLowerCase().includes(q))) return false
  }
  return true
}
const filtered = computed(() => CLIENT_DATA.filter(matches))

const statCards = computed(() => [
  { id: 'all', label: 'All customers', value: counts.value.all, sub: 'onboarded', color: 'var(--primary)' },
  { id: 'logged-in', label: 'Logged-in today', value: counts.value['logged-in'], sub: `${Math.round((counts.value['logged-in'] / counts.value.all) * 100)}% of base`, color: 'var(--emerald)' },
  { id: 'dormant', label: 'Dormant', value: counts.value.dormant, sub: '30d+ inactive', color: 'var(--amber)' },
  { id: 'mtf', label: 'MTF active', value: counts.value.mtf, sub: 'margin funded', color: 'var(--violet)' },
])

const filterPills = [
  { id: 'all', lbl: 'All' },
  { id: 'active', lbl: 'Active' },
  { id: 'logged-in', lbl: 'Logged in' },
  { id: 'blocked', lbl: 'Blocked' },
]

const toggle = (id: string) => {
  const next = new Set(selected.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selected.value = next
}
const toggleAll = () => {
  selected.value =
    selected.value.size === filtered.value.length ? new Set() : new Set(filtered.value.map((x) => x.id))
}
const openClient = computed(() => CLIENT_DATA.find((c) => c.id === openId.value) || null)
</script>

<template>
  <div class="cm-stat-card" style="margin-bottom:14px">
    <div v-for="k in statCards" :key="k.id" class="cm-stat">
      <div class="cm-stat-lbl">{{ k.label }}</div>
      <div class="cm-stat-v">
        <span class="num" :style="{ color: k.color }">{{ k.value.toLocaleString('en-IN') }}</span>
        <span class="sub">{{ k.sub }}</span>
      </div>
    </div>
  </div>

  <div class="cm-filter-row" style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button
        v-for="p in filterPills"
        :key="p.id"
        type="button"
        class="cm-pill"
        :class="{ active: filter === p.id }"
        @click="filter = p.id"
      >
        {{ p.lbl }}<span class="cm-pill-count">{{ counts[p.id].toLocaleString('en-IN') }}</span>
      </button>
    </div>
    <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
      <div class="filter-input">
        <Icon name="search" :size="13" />
        <input v-model="query" placeholder="Name, user ID, email, mobile…" />
      </div>
      <button class="btn btn-accent"><Icon name="plus" :size="13" /> Add client</button>
    </div>
  </div>

  <div class="card" style="margin-bottom:18px">
    <div v-if="selected.size > 0" style="padding:10px 16px;border-bottom:1px solid var(--line-2);background:var(--primary-50);display:flex;align-items:center;gap:10px">
      <span style="font-size:13px;font-weight:500;color:var(--primary)">{{ selected.size }} selected</span>
      <button class="btn btn-sm">Bulk logout</button>
      <button class="btn btn-sm" style="color:var(--rose)">Block</button>
      <button class="btn btn-sm">Revoke sessions</button>
      <button class="btn btn-sm btn-ghost" style="margin-left:auto" @click="selected = new Set()">Clear</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr>
            <th style="width:36px">
              <span class="cbx" :class="{ checked: selected.size === filtered.length && filtered.length }" @click="toggleAll" />
            </th>
            <th>Client</th><th>User ID</th><th>Mobile</th><th>Status</th><th>Last login</th>
            <th class="num" style="text-align:right">Orders today</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in filtered"
            :key="c.id"
            @click="openId = openId === c.id ? null : c.id"
            :style="{ cursor: 'pointer', background: openId === c.id ? 'var(--primary-50)' : undefined }"
          >
            <td @click.stop="toggle(c.id)">
              <span class="cbx" :class="{ checked: selected.has(c.id) }" />
            </td>
            <td>
              <div class="user-cell">
                <div class="av" :style="{ background: avatarColor(c.name) }">{{ initials(c.name) }}</div>
                <div>
                  <div class="uc-name">{{ c.name }}</div>
                  <div class="uc-sub">{{ maskEmail(c.email) }}</div>
                </div>
              </div>
            </td>
            <td class="col-id">{{ c.id }}</td>
            <td class="num" style="color:var(--muted)">{{ maskMobile(c.mobile) }}</td>
            <td><span class="badge" :class="STATUS_BADGE[c.status][0]"><span class="badge-dot" />{{ STATUS_BADGE[c.status][1] }}</span></td>
            <td class="num" style="color:var(--muted)">{{ c.lastSeen }}</td>
            <td class="num" style="text-align:right;font-weight:500">{{ c.ordersToday.toLocaleString('en-IN') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Showing 1–{{ filtered.length }} of {{ CLIENT_DATA.length.toLocaleString('en-IN') }}</span>
      <div class="pages">
        <button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>›</button>
      </div>
    </div>
  </div>

  <ClientDetailPanel v-if="openClient" :client="openClient" @close="openId = null" />
  <CodifiFoot />
</template>
