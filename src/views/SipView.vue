<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import SipDetailDrawer from '../components/drawers/SipDetailDrawer.vue'
import { SIPS, SIP_BADGE, type Sip } from '../data/sips'

const view = ref<'equity' | 'mutualfund' | 'analytics'>('equity')
const openSip = ref<Sip | null>(null)

const PILLS = [
  { id: 'all', lbl: 'All', count: 38412 },
  { id: 'active', lbl: 'Active', count: 36890 },
  { id: 'failed', lbl: 'Failed', count: 218 },
  { id: 'paused', lbl: 'Paused', count: 1124 },
]

const rowClick = (s: Sip) => {
  if (view.value === 'equity') openSip.value = s
}
</script>

<template>
  <div class="tabs" style="margin-bottom:14px">
    <button :class="view === 'equity' ? 'active' : ''" @click="view = 'equity'">Equity</button>
    <button :class="view === 'mutualfund' ? 'active' : ''" @click="view = 'mutualfund'">Mutual Fund</button>
    <button :class="view === 'analytics' ? 'active' : ''" @click="view = 'analytics'">Analytics</button>
  </div>

  <div class="stripe" style="margin-bottom:18px">
    <div><div class="label-mono">Active mandates</div><div class="value">38,412</div></div>
    <div><div class="label-mono">SIP Inflow (30D)</div><div class="value">₹14.2 Cr <span style="font-size:12px;color:var(--emerald);font-family:var(--mono);font-weight:500">+6.8%</span></div></div>
    <div><div class="label-mono">Failed SIP (30D)</div><div class="value">218</div></div>
    <div><div class="label-mono">Paused</div><div class="value">1,124</div></div>
    <div><div class="label-mono">Next 7D Execution</div><div class="value">₹4.18 Cr</div></div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <button v-for="(p, i) in PILLS" :key="p.id" type="button" class="cm-pill" :class="{ active: i === 0 }">
        {{ p.lbl }}<span class="cm-pill-count">{{ p.count.toLocaleString('en-IN') }}</span>
      </button>
    </div>
    <div class="filter-input" style="margin-left:auto"><Icon name="search" :size="13" /><input placeholder="SIP id, client, scheme…" /></div>
  </div>

  <div class="card">
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr>
            <th>SIP</th><th>UCC</th><th>Client</th>
            <th v-if="view === 'mutualfund'">Scheme</th>
            <th style="text-align:right">Amount</th>
            <th>Frequency</th><th>Next debit</th><th>Status</th><th>Retries</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in SIPS"
            :key="s.id"
            @click="rowClick(s)"
            :style="view === 'equity' ? { cursor: 'pointer' } : undefined"
          >
            <td><span class="col-id">{{ s.id }}</span></td>
            <td class="mono" style="font-size:12px;color:var(--muted)">{{ s.ucc }}</td>
            <td>{{ s.client }}</td>
            <td v-if="view === 'mutualfund'">{{ s.scheme }}</td>
            <td class="num" style="text-align:right;font-weight:500">₹{{ s.amount }}</td>
            <td><span class="pill">{{ s.freq }}</span></td>
            <td class="num">{{ s.next }}</td>
            <td>
              <span class="badge" :class="SIP_BADGE[s.status][0]" style="min-width:82px;justify-content:center">
                <span class="badge-dot" />{{ SIP_BADGE[s.status][1] }}
              </span>
            </td>
            <td class="num">{{ s.attempts }}/3</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Showing 1–6 of 38,412</span>
      <div class="pages">
        <button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>›</button>
      </div>
    </div>
  </div>
  <CodifiFoot />
  <SipDetailDrawer v-if="openSip" :sip="openSip" @close="openSip = null" />
</template>
