<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'
import type { ClientHolding, Holding } from '../../data/portfolio'

const props = defineProps<{ row: ClientHolding; rawHoldings: Holding[] }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const fmtINR0 = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
const fmtINR2 = (n: number) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const totalPct = computed(() => (props.row.invested ? (props.row.pnl / props.row.invested) * 100 : 0))

const stockRows = computed(() =>
  props.rawHoldings.map((h, i) => {
    const seed = (h.symbol.charCodeAt(0) + h.qty + i) >>> 0
    const isin = 'INE' + ((seed * 7919) % 1000).toString().padStart(3, '0') + '01' + ((seed * 31) % 100).toString().padStart(2, '0')
    const buyAvg = parseFloat(h.avg.replace(/,/g, ''))
    return {
      qty: h.qty,
      isin,
      stock: h.symbol,
      buyAvg,
      buyVal: buyAvg * h.qty,
      authFlag: ((seed >> 2) & 1) === 0,
      holdingType: ['DEMAT', 'BENEFICIARY', 'POOL', 'COLLATERAL'][seed % 4],
      reqId: 'REQ' + (1000000 + ((seed * 13) % 9000000)),
      tenId: 'TEN' + ((seed * 17) % 100000).toString().padStart(5, '0'),
    }
  })
)

const header = computed(() => {
  const earliestDays = Math.max(...props.rawHoldings.map((h, i) => (((h.symbol.charCodeAt(0) + h.qty + i) >>> 0) % 90) + 5))
  const latestUpdHrs = Math.min(...props.rawHoldings.map((h, i) => (((h.symbol.charCodeAt(0) + h.qty + i) >>> 0) % 23) + 1))
  const createdDate = new Date(Date.now() - earliestDays * 86400000)
  const updatedDate = new Date(Date.now() - latestUpdHrs * 3600000)
  return {
    created: createdDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    updated: updatedDate.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }),
  }
})

const summary = computed<Array<[string, string, string?]>>(() => [
  ['Invested', fmtINR0(props.row.invested)],
  ['Current (BOD)', fmtINR0(props.row.current)],
  ['P&L', (props.row.pnl >= 0 ? '+' : '−') + fmtINR0(Math.abs(props.row.pnl)), props.row.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)'],
  ['Return', (totalPct.value >= 0 ? '+' : '') + totalPct.value.toFixed(2) + '%', totalPct.value >= 0 ? 'var(--emerald)' : 'var(--rose)'],
])
</script>

<template>
  <Teleport to="body">
    <div class="cm-drawer-overlay" @click="emit('close')">
      <div class="card cm-drawer" @click.stop style="width:min(1180px, 96vw)">
        <div class="cm-drawer-body">
          <div class="cm-detail-head">
            <div class="user-cell" style="flex:1">
              <div class="av" :style="{ background: avatarColor(row.client), width: '42px', height: '42px', fontSize: '14px' }">{{ initials(row.client) }}</div>
              <div>
                <h3 style="margin:0;font-family:var(--display);font-size:17px;font-weight:600;letter-spacing:-0.01em;color:var(--ink)">{{ row.client }}</h3>
                <div style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:8px;margin-top:2px">
                  <span class="col-id">{{ row.cid }}</span>
                  <span style="color:var(--muted-2)">·</span>
                  <span>Holdings status</span>
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <span class="badge" :class="row.poa ? 'badge-success' : 'badge-danger'"><span class="badge-dot" />POA · {{ row.poa ? 'Yes' : 'No' }}</span>
              <span class="badge"><span class="badge-dot" />Created · {{ header.created }}</span>
              <span class="badge"><span class="badge-dot" />Updated · {{ header.updated }}</span>
            </div>
          </div>

          <div style="padding:14px 18px;border-bottom:1px solid var(--line-2);display:grid;grid-template-columns:repeat(4, 1fr);gap:14px">
            <div v-for="([l, v, c]) in summary" :key="l">
              <div style="font-size:11px;color:var(--muted);margin-bottom:4px">{{ l }}</div>
              <div :style="{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 600, color: c || 'var(--ink)', letterSpacing: '-0.01em' }">{{ v }}</div>
            </div>
          </div>

          <div class="table-wrap" style="padding:0 8px 18px">
            <table class="data" style="font-size:12px">
              <thead>
                <tr>
                  <th>Stock</th><th class="mono">ISIN</th>
                  <th class="num" style="text-align:right">Qty</th>
                  <th class="num" style="text-align:right">Buy avg</th>
                  <th class="num" style="text-align:right">Buy value</th>
                  <th>Holding type</th>
                  <th style="text-align:center">Auth flag</th>
                  <th class="mono">Req ID</th><th class="mono">Ten ID</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(s, i) in stockRows" :key="i">
                  <td><span style="font-weight:500">{{ s.stock }}</span></td>
                  <td class="mono" style="font-size:11.5px;color:var(--muted)">{{ s.isin }}</td>
                  <td class="num" style="text-align:right">{{ s.qty }}</td>
                  <td class="num" style="text-align:right;color:var(--muted)">{{ fmtINR2(s.buyAvg) }}</td>
                  <td class="num" style="text-align:right;font-weight:500">{{ fmtINR0(s.buyVal) }}</td>
                  <td><span class="pill" style="font-size:10.5px">{{ s.holdingType }}</span></td>
                  <td style="text-align:center">
                    <span class="badge" :class="s.authFlag ? 'badge-info' : ''" style="min-width:36px;justify-content:center">{{ s.authFlag ? 'AUTH' : 'PEND' }}</span>
                  </td>
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ s.reqId }}</td>
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ s.tenId }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button @click="emit('close')" aria-label="Close" style="position:fixed;right:24px;bottom:24px;z-index:110;height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fff;border:none;font-size:13px;font-weight:500;font-family:inherit;display:inline-flex;align-items:center;gap:8px;cursor:pointer;box-shadow:0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)">
        <Icon name="close" :size="14" /> Close
      </button>
    </div>
  </Teleport>
</template>
