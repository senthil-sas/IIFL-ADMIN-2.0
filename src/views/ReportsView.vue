<script setup lang="ts">
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'

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
</script>

<template>
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
  <CodifiFoot />
</template>
