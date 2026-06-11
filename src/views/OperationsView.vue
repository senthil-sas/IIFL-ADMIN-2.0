<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import PageHeader from '../components/layout/PageHeader.vue'

const tab = ref('content')

const BANNERS = [
  { title: 'Login banner', sub: 'Shown above sign-in form', status: 'Live', img: '#4762E3', cta: 'Open festival offers' },
  { title: 'Signup banner', sub: 'New user welcome', status: 'Scheduled', img: '#FF7A59', cta: 'Free 1-yr advisory' },
]

const MARKET = [
  { tag: 'Nifty 50', val: '24,812.40', chg: '+0.84%', up: true },
  { tag: 'Bank Nifty', val: '52,108.20', chg: '-0.21%', up: false },
  { tag: 'India VIX', val: '13.42', chg: '-2.18%', up: false },
]

// Faithful reproduction of the original inline sparkline path math.
const sparkPoints = (up: boolean, i: number) =>
  Array.from(
    { length: 20 },
    (_, j) => `${j * 10},${20 + (up ? -1 : 1) * Math.sin(j * 0.6 + i) * 8 - (up ? j * 0.5 : -j * 0.5)}`
  ).join(' ')
</script>

<template>
  <PageHeader>
    <template #actions>
      <button class="btn"><Icon name="eye" :size="13" /> Preview app</button>
      <button class="btn btn-accent"><Icon name="plus" :size="13" /> New banner</button>
    </template>
  </PageHeader>

  <div class="tabs-underline">
    <button :class="tab === 'content' ? 'active' : ''" @click="tab = 'content'">App content</button>
    <button :class="tab === 'market' ? 'active' : ''" @click="tab = 'market'">Market content</button>
    <button :class="tab === 'holdings' ? 'active' : ''" @click="tab = 'holdings'">Holdings</button>
    <button :class="tab === 'positions' ? 'active' : ''" @click="tab = 'positions'">Positions</button>
    <button :class="tab === 'logs' ? 'active' : ''" @click="tab = 'logs'">Login logs</button>
  </div>

  <div class="section-grid-2" style="margin-bottom:14px">
    <div v-for="(b, i) in BANNERS" :key="i" class="card">
      <div class="card-head">
        <h3>{{ b.title }}</h3>
        <span class="badge" :class="b.status === 'Live' ? 'badge-success' : 'badge-warn'"><span class="badge-dot" />{{ b.status }}</span>
        <div class="card-actions">
          <button class="btn btn-sm"><Icon name="edit" :size="12" /> Edit</button>
        </div>
      </div>
      <div style="padding:18px">
        <div :style="{ height: '140px', borderRadius: '10px', background: `linear-gradient(135deg, ${b.img}, ${b.img}99)`, position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center', color: '#fff' }">
          <div style="text-align:center">
            <div style="font-family:var(--display);font-weight:600;font-size:18px">{{ b.cta }}</div>
            <div style="font-size:12px;opacity:0.85;margin-top:4px">1080 × 540 · WebP · 84KB</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;font-size:12px;color:var(--muted)">
          <span>Impressions: <strong style="color:var(--ink);font-family:var(--mono)">184.2k</strong></span>
          <span>CTR: <strong style="color:var(--ink);font-family:var(--mono)">4.18%</strong></span>
          <span style="margin-left:auto">{{ b.sub }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-head">
      <h3>Featured market content</h3>
      <span class="muted" style="font-size:12px">Pinned · home tab</span>
      <div class="card-actions">
        <button class="btn btn-sm"><Icon name="plus" :size="12" /> Add card</button>
      </div>
    </div>
    <div class="card-body">
      <div class="section-grid-3">
        <div v-for="(m, i) in MARKET" :key="i" class="server-tile">
          <div class="label-mono">{{ m.tag }}</div>
          <div style="display:flex;align-items:baseline;gap:10px">
            <div style="font-family:var(--display);font-size:22px;font-weight:600;letter-spacing:-0.01em">{{ m.val }}</div>
            <div class="kpi-trend" :class="m.up ? 'up' : 'down'">
              <Icon :name="m.up ? 'arrowUp' : 'arrowDown'" :size="11" :stroke="2" />{{ m.chg }}
            </div>
          </div>
          <svg viewBox="0 0 200 40" style="width:100%;height:40px">
            <polyline :points="sparkPoints(m.up, i)" :stroke="m.up ? 'var(--emerald)' : 'var(--rose)'" fill="none" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <CodifiFoot />
</template>
