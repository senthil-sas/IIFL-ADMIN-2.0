<script setup lang="ts">
import Icon from '../Icon.vue'

interface Task {
  id: string; group: string; label: string; sub: string
  status: 'done' | 'pending' | 'failed' | 'running' | 'scheduled'
  when: string; action: { label: string; kind: string } | null
}

const tasks: Task[] = [
  { id: 'bod', group: 'Open of day', label: 'BOD process', sub: 'Symbol master · risk limits · margins', status: 'done', when: '09:01 IST · ops@codifi', action: null },
  { id: 'health', group: 'Open of day', label: 'Health check', sub: 'API · DB · order gateway · feeds', status: 'done', when: '09:04 IST · 24 / 24 services green', action: null },
  { id: 'holdings', group: 'Files', label: 'Holdings upload', sub: 'DP + T1 holdings file', status: 'done', when: '09:18 IST · 41,820 rows', action: null },
  { id: 'positions', group: 'Files', label: 'Position file upload', sub: '04 of 12 segments ingested', status: 'pending', when: 'expected by 09:30 IST', action: { label: 'Upload positions', kind: 'positions' } },
  { id: 'margin', group: 'Files', label: 'Margin file upload', sub: 'SPAN · ELM · exposure', status: 'failed', when: 'last attempt 09:22 · checksum mismatch', action: { label: 'Upload margin file', kind: 'margin' } },
  { id: 'ohlc', group: 'Files', label: 'OHLC chart synchronisation', sub: 'NSE EQ · BSE EQ · NFO · CDS', status: 'running', when: 'syncing · 38% complete', action: null },
  { id: 'contract', group: 'Close of day', label: 'Contract note dispatch', sub: 'Email + WhatsApp delivery', status: 'scheduled', when: 'scheduled 16:30 IST', action: null },
  { id: 'eod', group: 'Close of day', label: 'EOD reconciliation', sub: 'Trades · ledger · obligation', status: 'scheduled', when: 'scheduled 17:15 IST', action: null },
]

const statusMap: Record<Task['status'], { label: string; color: string; icon: string }> = {
  done: { label: 'Completed', color: 'var(--emerald)', icon: 'check' },
  pending: { label: 'Pending', color: 'var(--amber)', icon: 'bolt' },
  failed: { label: 'Failed', color: 'var(--rose)', icon: 'flag' },
  running: { label: 'Running', color: 'var(--primary)', icon: 'refresh' },
  scheduled: { label: 'Scheduled', color: 'var(--muted)', icon: 'activity' },
}

const groups = ['Open of day', 'Files', 'Close of day']
const total = tasks.length
const doneCount = tasks.filter((t) => t.status === 'done').length
const pendingCount = tasks.filter((t) => t.status === 'pending' || t.status === 'failed').length

const rowsFor = (g: string) => tasks.filter((t) => t.group === g)
const rowBg = (s: Task['status']) =>
  s === 'failed' ? 'rgba(239,68,68,0.05)' : s === 'pending' ? 'rgba(245,158,11,0.05)' : 'var(--bg)'
const rowBorder = (s: Task['status']) =>
  '1px solid ' + (s === 'failed' ? 'rgba(239,68,68,0.18)' : s === 'pending' ? 'rgba(245,158,11,0.18)' : 'var(--line-2)')

const triggerUpload = (kind: string) => {
  try {
    window.dispatchEvent(new CustomEvent('codifi:open-upload', { detail: { kind } }))
  } catch {
    /* noop */
  }
}
</script>

<template>
  <div class="card">
    <div class="card-head">
      <h3>Today's tasks</h3>
      <div class="card-actions" style="display:flex;align-items:center;gap:10px">
        <span style="font-size:11.5px;color:var(--muted);font-family:var(--mono)">
          <span style="color:var(--ink);font-weight:600">{{ doneCount }}</span>/{{ total }} done
          <template v-if="pendingCount > 0"> · <span style="color:var(--rose);font-weight:600">{{ pendingCount }}</span> need attention</template>
        </span>
        <button class="btn btn-sm btn-ghost">View runbook <Icon name="arrowRight" :size="11" /></button>
      </div>
    </div>
    <div class="card-body" style="padding-top:4px">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div v-for="g in groups" :key="g">
          <template v-if="rowsFor(g).length">
            <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2);margin-bottom:8px">{{ g }}</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              <div
                v-for="t in rowsFor(g)"
                :key="t.id"
                :style="{ display: 'grid', gridTemplateColumns: '22px 1fr auto auto', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', background: rowBg(t.status), border: rowBorder(t.status) }"
              >
                <span
                  aria-hidden="true"
                  :style="{ width: '22px', height: '22px', borderRadius: '50%', background: statusMap[t.status].color, color: '#fff', display: 'inline-grid', placeItems: 'center', opacity: t.status === 'scheduled' ? 0.55 : 1 }"
                >
                  <Icon :name="statusMap[t.status].icon" :size="12" :stroke="2.2" />
                </span>
                <div style="min-width:0">
                  <div style="font-size:13px;font-weight:500;color:var(--ink)">{{ t.label }}</div>
                  <div style="font-size:11.5px;color:var(--muted);margin-top:1px">
                    {{ t.sub }} <span style="color:var(--muted-2)">· {{ t.when }}</span>
                  </div>
                </div>
                <span :style="{ fontSize: '10.5px', fontFamily: 'var(--mono)', fontWeight: 600, color: statusMap[t.status].color, textTransform: 'uppercase', letterSpacing: '0.06em' }">{{ statusMap[t.status].label }}</span>
                <button
                  v-if="t.action"
                  class="btn btn-sm"
                  @click="triggerUpload(t.action.kind)"
                  :style="t.status === 'failed' ? { borderColor: 'var(--rose)', color: 'var(--rose)' } : {}"
                >
                  <Icon name="upload" :size="12" /> {{ t.action.label }}
                </button>
                <span v-else />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
