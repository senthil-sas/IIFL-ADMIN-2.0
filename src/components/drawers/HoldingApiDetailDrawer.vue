<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'
import { httpService } from '../../services/httpservices'

export interface HoldingUser {
  userId: string
  uniqueStocks: number
  totalStocks: number
  invested: number
  currentValue: number
  pnl: number
  pnlPercentage: number
  edis: string
}

interface HoldingDetail {
  userId: string
  isin: string
  qty: number
  buyAvg: number
  currentPrice: number
  buyValue: number
  currentValue: number
  holdingType: string | null
  authFlag: string
  product: string
  createdOn: string
  updatedOn: string
}

const props = defineProps<{ user: HoldingUser }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const loading = ref(true)
const details = ref<HoldingDetail[]>([])

async function fetchDetails(userId: string) {
  loading.value = true
  details.value = []
  try {
    const res = await httpService.getHoldingDetails({ userId })
    if (res.data?.result) details.value = res.data.result
  } finally {
    loading.value = false
  }
}

watch(() => props.user.userId, (id) => fetchDetails(id), { immediate: true })

// Derived summary from detail rows
const totalInvested = computed(() => details.value.reduce((a, d) => a + d.buyValue, 0))
const totalCurrent  = computed(() => details.value.reduce((a, d) => a + d.currentValue, 0))
const totalPnl      = computed(() => totalCurrent.value - totalInvested.value)
const totalReturn   = computed(() => totalInvested.value ? (totalPnl.value / totalInvested.value) * 100 : 0)

// Use parent row data as fallback while loading
const displayInvested = computed(() => loading.value ? props.user.invested    : totalInvested.value)
const displayCurrent  = computed(() => loading.value ? props.user.currentValue : totalCurrent.value)
const displayPnl      = computed(() => loading.value ? props.user.pnl          : totalPnl.value)
const displayReturn   = computed(() => loading.value ? props.user.pnlPercentage : totalReturn.value)

const createdOn = computed(() => details.value[0]?.createdOn?.split(' ')[0] ?? '—')
const updatedOn = computed(() => details.value[0]?.updatedOn?.split(' ')[0] ?? '—')

const fmt = (n: number) => '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })
</script>

<template>
  <Teleport to="body">
    <div class="hd-overlay" @click="emit('close')">
      <div class="hd-panel" @click.stop>

        <!-- Header -->
        <div class="hd-head">
          <div class="user-cell" style="flex:1;min-width:0">
            <div class="av" :style="{ background: avatarColor(user.userId), width:'48px', height:'48px', fontSize:'15px', flexShrink:0 }">
              {{ initials(user.userId) }}
            </div>
            <div style="min-width:0">
              <div style="font-family:var(--display);font-size:17px;font-weight:600;color:var(--ink);letter-spacing:-0.01em">{{ user.userId }}</div>
              <div style="font-size:12px;color:var(--muted);margin-top:3px">Holdings status</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
            <span class="badge badge-tall" :class="user.edis === 'Yes' ? 'badge-success' : 'badge-danger'">
              <span class="badge-dot" />POA · {{ user.edis }}
            </span>
            <span class="badge badge-tall" style="font-size:11px;color:var(--muted)">Created · {{ createdOn }}</span>
            <span class="badge badge-tall" style="font-size:11px;color:var(--muted)">Updated · {{ updatedOn }}</span>
            <button class="btn btn-sm" @click="emit('close')"><Icon name="close" :size="13" /></button>
          </div>
        </div>

        <!-- Summary strip -->
        <div class="hd-summary">
          <div class="hd-sum-item">
            <div class="hd-sum-lbl">Invested</div>
            <div class="hd-sum-val">{{ fmt(displayInvested) }}</div>
          </div>
          <div class="hd-sum-item">
            <div class="hd-sum-lbl">Current (BOD)</div>
            <div class="hd-sum-val">{{ fmt(displayCurrent) }}</div>
          </div>
          <div class="hd-sum-item">
            <div class="hd-sum-lbl">P&amp;L</div>
            <div class="hd-sum-val" :style="{ color: displayPnl >= 0 ? 'var(--emerald)' : 'var(--rose)' }">
              {{ displayPnl >= 0 ? '+' : '−' }}{{ fmt(displayPnl) }}
            </div>
          </div>
          <div class="hd-sum-item">
            <div class="hd-sum-lbl">Return</div>
            <div class="hd-sum-val" :style="{ color: displayReturn >= 0 ? 'var(--emerald)' : 'var(--rose)' }">
              {{ displayReturn >= 0 ? '+' : '' }}{{ displayReturn.toFixed(2) }}%
            </div>
          </div>
        </div>

        <!-- Detail table -->
        <div class="hd-body">
          <div class="table-wrap">
            <table class="data">
              <thead>
                <tr>
                  <th>ISIN</th>
                  <th class="num" style="text-align:right">QTY</th>
                  <th class="num" style="text-align:right">BUY AVG</th>
                  <th class="num" style="text-align:right">BUY VALUE</th>
                  <th class="num" style="text-align:right">CURRENT PRICE</th>
                  <th class="num" style="text-align:right">CURRENT VALUE</th>
                  <th style="text-align:center">HOLDING TYPE</th>
                  <th style="text-align:center">AUTH FLAG</th>
                  <th style="text-align:center">PRODUCT</th>
                </tr>
              </thead>
              <tbody v-if="loading">
                <tr v-for="n in 4" :key="n">
                  <td colspan="9"><div class="skel-line" style="height:13px;width:100%;border-radius:4px" /></td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-if="!details.length">
                  <td colspan="9" style="text-align:center;padding:32px;color:var(--muted)">No holding details found</td>
                </tr>
                <tr v-for="(d, i) in details" :key="i">
                  <td style="font-size:12px;font-family:var(--mono);font-weight:500">{{ d.isin }}</td>
                  <td class="num" style="text-align:right;font-weight:600">{{ d.qty.toLocaleString('en-IN') }}</td>
                  <td class="num" style="text-align:right;color:var(--muted)">₹{{ d.buyAvg.toLocaleString('en-IN', { maximumFractionDigits: 2 }) }}</td>
                  <td class="num" style="text-align:right">₹{{ d.buyValue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</td>
                  <td class="num" style="text-align:right;color:var(--muted)">₹{{ d.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 }) }}</td>
                  <td class="num" style="text-align:right;font-weight:500">₹{{ d.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</td>
                  <td style="text-align:center">
                    <span v-if="d.holdingType" class="badge">{{ d.holdingType }}</span>
                    <span v-else style="color:var(--muted-2)">—</span>
                  </td>
                  <td style="text-align:center">
                    <span class="badge" :class="d.authFlag === 'AUTH' ? 'badge-success' : 'badge-warn'" style="font-size:10.5px">{{ d.authFlag }}</span>
                  </td>
                  <td style="text-align:center">
                    <span class="badge" style="font-size:10.5px">{{ d.product }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <button @click="emit('close')" aria-label="Close" class="hd-fab">
        <Icon name="close" :size="14" /> Close
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.hd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  z-index: 200;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.hd-panel {
  width: min(900px, 96vw);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -8px 0 40px rgba(15, 23, 42, 0.18);
  animation: slideIn 0.22s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

.hd-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--line-2);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.hd-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--line-2);
  flex-shrink: 0;
}

.hd-sum-item {
  padding: 14px 20px;
  border-right: 1px solid var(--line-2);
}
.hd-sum-item:last-child { border-right: none; }

.hd-sum-lbl {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 6px;
}

.hd-sum-val {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.hd-body {
  flex: 1;
  overflow-y: auto;
}

.skel-line {
  border-radius: 4px;
  background: linear-gradient(90deg, var(--line-2) 25%, var(--surface-2, #efefef) 50%, var(--line-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  display: block;
}
@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

.hd-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 210;
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.28);
}
</style>
