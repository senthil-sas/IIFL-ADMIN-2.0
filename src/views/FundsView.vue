<script setup lang="ts">
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import PageHeader from '../components/layout/PageHeader.vue'

interface Txn {
  id: string; client: string; type: string; channel: string
  amount: string; status: 'success' | 'pending' | 'failed'; ref: string; time: string
}

const TXNS: Txn[] = [
  { id: 'TXN-87241', client: 'Aman Verma', type: 'Add Money', channel: 'UPI', amount: '25,000.00', status: 'success', ref: 'icici-9821', time: '14:32' },
  { id: 'TXN-87240', client: 'Priya Subramaniam', type: 'Withdrawal', channel: 'NEFT', amount: '1,50,000.00', status: 'pending', ref: 'hdfc-3201', time: '14:30' },
  { id: 'TXN-87239', client: 'Rajat Kapoor', type: 'Add Money', channel: 'NetBanking', amount: '10,000.00', status: 'failed', ref: 'icici-9820', time: '14:28' },
  { id: 'TXN-87238', client: 'Tanvi Joshi', type: 'Add Money', channel: 'UPI', amount: '5,000.00', status: 'success', ref: 'icici-9819', time: '14:26' },
  { id: 'TXN-87237', client: 'Karthik Iyer', type: 'Withdrawal', channel: 'NEFT', amount: '80,000.00', status: 'success', ref: 'hdfc-3200', time: '14:21' },
  { id: 'TXN-87236', client: 'Mehrunissa Ali', type: 'Add Money', channel: 'IMPS', amount: '2,00,000.00', status: 'success', ref: 'sbi-7740', time: '14:18' },
  { id: 'TXN-87235', client: 'Saanvi Nair', type: 'Withdrawal', channel: 'UPI', amount: '8,420.00', status: 'failed', ref: 'icici-9818', time: '14:11' },
]

const TXN_BADGE: Record<Txn['status'], [string, string]> = {
  success: ['badge-success', 'Success'],
  pending: ['badge-warn', 'Pending'],
  failed: ['badge-danger', 'Failed'],
}

interface KpiCard { label: string; value: string; unit?: string; trend: string; up: boolean; foot: string; color: string }
const KPIS: KpiCard[] = [
  { label: 'Add Money · today', value: '₹3.84', unit: 'Cr', trend: '+18.2%', up: true, foot: '1,284 successful', color: 'var(--emerald)' },
  { label: 'Withdrawals · today', value: '₹1.92', unit: 'Cr', trend: '+4.1%', up: true, foot: '412 processed', color: 'var(--primary)' },
  { label: 'Failed · today', value: '47', trend: '-32.1%', up: false, foot: '0.18% rate · auto-retry on', color: 'var(--rose)' },
  { label: 'Webhook lag p95', value: '212', unit: 'ms', trend: '+18ms', up: false, foot: 'ICICI degraded', color: 'var(--amber)' },
]

interface Hook { ev: string; code: number; p: string; tries: number; ok: boolean }
const WEBHOOKS: Hook[] = [
  { ev: 'icici.payment.success', code: 200, p: '12ms', tries: 1, ok: true },
  { ev: 'hdfc.withdrawal.queued', code: 200, p: '89ms', tries: 1, ok: true },
  { ev: 'icici.payment.success', code: 504, p: '5.1s', tries: 3, ok: false },
  { ev: 'sbi.mandate.created', code: 200, p: '320ms', tries: 1, ok: true },
  { ev: 'razorpay.refund.processed', code: 502, p: '2.3s', tries: 2, ok: false },
  { ev: 'kyc.cvl.update', code: 200, p: '410ms', tries: 1, ok: true },
]
</script>

<template>
  <PageHeader>
    <template #actions>
      <button class="btn"><Icon name="repeat" :size="13" /> Reconcile</button>
      <button class="btn"><Icon name="download" :size="13" /> Webhook log</button>
      <button class="btn btn-accent"><Icon name="plus" :size="13" /> Manual payment</button>
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

  <div class="chart-grid" style="grid-template-columns:1.6fr 1fr">
    <div class="card">
      <div class="card-head">
        <h3>Transaction stream</h3>
        <div class="card-actions">
          <div class="tabs"><button class="active">All</button><button>Add money</button><button>Withdraw</button><button>Failed only</button></div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr>
              <th>Txn</th><th>Client</th><th>Type</th><th>Channel</th>
              <th style="text-align:right">Amount</th><th>Status</th><th>Ref</th><th>Time</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in TXNS" :key="t.id">
              <td><span class="col-id">{{ t.id }}</span></td>
              <td>{{ t.client }}</td>
              <td><span class="pill">{{ t.type }}</span></td>
              <td class="num" style="color:var(--muted)">{{ t.channel }}</td>
              <td class="num" style="text-align:right;font-weight:500">₹{{ t.amount }}</td>
              <td>
                <span class="badge" :class="TXN_BADGE[t.status][0]"><span class="badge-dot" />{{ TXN_BADGE[t.status][1] }}</span>
              </td>
              <td class="num" style="color:var(--muted)">{{ t.ref }}</td>
              <td class="num" style="color:var(--muted)">{{ t.time }}</td>
              <td><button class="icon-btn" style="width:28px;height:28px"><Icon name="more" :size="13" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <h3>Webhooks</h3>
        <span class="badge badge-warn"><span class="badge-dot" />3 retrying</span>
      </div>
      <div class="card-body" style="padding:4px 18px 14px">
        <div v-for="(w, i) in WEBHOOKS" :key="i" class="status-row" style="gap:8px">
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--mono);font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ w.ev }}</div>
            <div style="font-size:11px;color:var(--muted);font-family:var(--mono)">HTTP {{ w.code }} · {{ w.p }} · attempt {{ w.tries }}</div>
          </div>
          <span class="badge" :class="w.ok ? 'badge-success' : 'badge-danger'"><span class="badge-dot" />{{ w.ok ? '200' : 'fail' }}</span>
        </div>
      </div>
    </div>
  </div>
  <CodifiFoot />
</template>
