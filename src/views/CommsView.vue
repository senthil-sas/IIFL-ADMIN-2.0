<script setup lang="ts">
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import PageHeader from '../components/layout/PageHeader.vue'

interface Campaign {
  id: string; name: string; channel: 'Push' | 'In-app' | 'Email'
  audience: string; sent: string; open: string; click: string
  status: 'sent' | 'scheduled' | 'draft'; time: string
}

const CAMPAIGNS: Campaign[] = [
  { id: 'CAMP-2042', name: 'Pre-market alert · 06 May', channel: 'Push', audience: 'Active traders', sent: '84,212', open: '62.1%', click: '18.4%', status: 'sent', time: '2h ago' },
  { id: 'CAMP-2041', name: 'SIP failure recovery', channel: 'In-app', audience: 'Failed SIPs', sent: '218', open: '48.2%', click: '21.1%', status: 'sent', time: '6h ago' },
  { id: 'CAMP-2040', name: 'KYC re-verify reminder', channel: 'Email', audience: 'Pending KYC', sent: '812', open: '38.4%', click: '9.2%', status: 'sent', time: '1d ago' },
  { id: 'CAMP-2039', name: 'Festival offer · banner', channel: 'In-app', audience: 'All clients', sent: '—', open: '—', click: '—', status: 'scheduled', time: 'in 2d' },
  { id: 'CAMP-2038', name: 'New SIP launches', channel: 'Push', audience: 'SIP investors', sent: '—', open: '—', click: '—', status: 'draft', time: '—' },
]

const CAMP_BADGE: Record<Campaign['status'], [string, string]> = {
  sent: ['badge-success', 'Sent'],
  scheduled: ['badge-info', 'Scheduled'],
  draft: ['badge', 'Draft'],
}

const CHANNEL_COLOR: Record<Campaign['channel'], string> = {
  Push: 'var(--primary)',
  'In-app': 'var(--coral)',
  Email: 'var(--violet)',
}

interface KpiCard { label: string; value: string; unit?: string; trend: string; up: boolean; foot: string; color: string }
const KPIS: KpiCard[] = [
  { label: 'Sent (7d)', value: '1.24M', trend: '+12%', up: true, foot: '5 campaigns', color: 'var(--primary)' },
  { label: 'Open rate', value: '52.4', unit: '%', trend: '+3.1pp', up: true, foot: 'industry: 38%', color: 'var(--emerald)' },
  { label: 'CTR', value: '14.8', unit: '%', trend: '+1.2pp', up: true, foot: 'best: SIP recovery', color: 'var(--coral)' },
  { label: 'Unsubscribes', value: '124', trend: '+22', up: false, foot: 'last 7d', color: 'var(--rose)' },
]
</script>

<template>
  <PageHeader>
    <template #actions>
      <button class="btn"><Icon name="upload" :size="13" /> Import audience</button>
      <button class="btn btn-accent"><Icon name="plus" :size="13" /> New campaign</button>
    </template>
  </PageHeader>

  <div class="kpi-grid">
    <div class="kpi" v-for="(k, i) in KPIS" :key="i">
      <div class="kpi-head"><span class="kpi-dot" :style="{ background: k.color }" />{{ k.label }}</div>
      <div class="kpi-value">{{ k.value }}<span class="unit" v-if="k.unit">{{ k.unit }}</span></div>
      <span class="kpi-trend" :class="k.up ? 'up' : 'down'">
        <Icon :name="k.up ? 'arrowUp' : 'arrowDown'" :size="11" :stroke="2" />{{ k.trend }}
      </span>
      <div class="kpi-foot">{{ k.foot }}</div>
    </div>
  </div>

  <div class="chart-grid" style="grid-template-columns:1.5fr 1fr">
    <div class="card">
      <div class="card-head">
        <h3>Campaigns</h3>
        <div class="card-actions">
          <div class="tabs"><button class="active">All</button><button>Push</button><button>In-app</button><button>Email</button></div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr>
              <th>Campaign</th><th>Channel</th><th>Audience</th>
              <th style="text-align:right">Sent</th><th>Open</th><th>CTR</th><th>Status</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in CAMPAIGNS" :key="c.id">
              <td>
                <div class="uc-name">{{ c.name }}</div>
                <div class="uc-sub">{{ c.id }}</div>
              </td>
              <td>
                <span class="badge" :style="{ borderColor: CHANNEL_COLOR[c.channel], color: CHANNEL_COLOR[c.channel] }">
                  <span class="badge-dot" :style="{ background: CHANNEL_COLOR[c.channel] }" />{{ c.channel }}
                </span>
              </td>
              <td style="font-size:12px;color:var(--muted)">{{ c.audience }}</td>
              <td class="num" style="text-align:right">{{ c.sent }}</td>
              <td class="num">{{ c.open }}</td>
              <td class="num">{{ c.click }}</td>
              <td><span class="badge" :class="CAMP_BADGE[c.status][0]"><span class="badge-dot" />{{ CAMP_BADGE[c.status][1] }}</span></td>
              <td class="num" style="color:var(--muted)">{{ c.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3>Compose</h3><span class="muted" style="font-size:12px">Quick announcement</span></div>
      <div class="card-body">
        <div class="field" style="margin-bottom:12px">
          <div class="field-label">Channel</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm" style="border-color:var(--ink);background:var(--ink);color:#fff">Push</button>
            <button class="btn btn-sm">In-app</button>
            <button class="btn btn-sm">Email</button>
          </div>
        </div>
        <div class="field" style="margin-bottom:12px">
          <div class="field-label">Audience</div>
          <input class="input" value="All active clients · 13,184" />
        </div>
        <div class="field" style="margin-bottom:12px">
          <div class="field-label">Title</div>
          <input class="input" placeholder="Title shown to user" />
        </div>
        <div class="field" style="margin-bottom:12px">
          <div class="field-label">Message</div>
          <textarea class="input" placeholder="Your message…">Markets close early today at 14:00 IST. Place your orders before the bell.</textarea>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button class="btn">Save draft</button>
          <button class="btn btn-accent">Send · 13.1k</button>
        </div>
      </div>
    </div>
  </div>
  <CodifiFoot />
</template>
