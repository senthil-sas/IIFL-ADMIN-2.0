<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../Icon.vue'
import { useStore } from '../../store'
import { loginSeries, SESSION, NOW } from '../../data/loginData'
import { useLoginDetails } from '../../composables/useLoginDetails'

const router = useRouter()
const store = useStore()
const accent = computed(() => store.state.tweaks.accent || '#1B5BD9')
const { androidCount, iosCount, mobileCount, webCount, apiCount } = useLoginDetails()

const svgRef = ref<SVGSVGElement | null>(null)
const hover = ref<{ idx: number } | null>(null)

const { minuteTrades, cumLogins, avgCum, totalToday } = loginSeries()

// Geometry
const W = 1200, HLine = 280, HBar = 70, GAP = 8
const H = HLine + GAP + HBar
const pad = { l: 18, r: 24, t: 16, b: 28 }
const innerW = W - pad.l - pad.r
const innerHL = HLine - pad.t - pad.b
const xs = (i: number) => pad.l + (i / (SESSION - 1)) * innerW
const lineMax = Math.max(cumLogins[NOW], avgCum[SESSION - 1]) * 1.06
const ys = (v: number) => pad.t + innerHL - (v / lineMax) * innerHL

const todayLine = cumLogins.slice(0, NOW + 1).map((v, i) => `${i ? 'L' : 'M'}${xs(i)},${ys(v)}`).join(' ')
const avgLine = avgCum.map((v, i) => `${i ? 'L' : 'M'}${xs(i)},${ys(v)}`).join(' ')
const todayArea = `${todayLine} L${xs(NOW)},${pad.t + innerHL} L${xs(0)},${pad.t + innerHL} Z`

const nowX = xs(NOW)
const nowY = ys(cumLogins[NOW])

const barTop = HLine + GAP
const barBot = barTop + HBar - 14
const barMaxV = Math.max(...minuteTrades) || 1
const barW = (innerW / SESSION) * 0.85

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)
const tickIdx = [0, 240, 480, 720, 960, 1200, 1439]
const tickLabels = ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM', '11:59 PM']

const gridY = [0, 1, 2, 3, 4, 5].map((i) => pad.t + (i * innerHL) / 5)
const bars = minuteTrades
  .map((v, i) => ({ v, i }))
  .filter((b) => b.v)
  .map((b) => {
    const h = (b.v / barMaxV) * (HBar - 18)
    return { x: xs(b.i) - barW / 2, y: barBot - h, h }
  })

// Donut — real device breakdown from API (falls back to proportions of chart data when API not yet loaded)
const dist = computed(() => {
  const hasReal = mobileCount.value + webCount.value + apiCount.value > 0
  if (hasReal) {
    return [
      { lbl: 'Android', n: androidCount.value, c: '#1B5BD9' },
      { lbl: 'iOS', n: iosCount.value, c: '#7C3AED' },
      { lbl: 'Web', n: webCount.value, c: '#5B8DEF' },
      { lbl: 'APIs', n: apiCount.value, c: '#A6B6D4' },
    ]
  }
  return [
    { lbl: 'Android', n: Math.round(totalToday * 0.42), c: '#1B5BD9' },
    { lbl: 'iOS', n: Math.round(totalToday * 0.16), c: '#7C3AED' },
    { lbl: 'Web', n: Math.round(totalToday * 0.30), c: '#5B8DEF' },
    { lbl: 'APIs', n: Math.round(totalToday * 0.12), c: '#A6B6D4' },
  ]
})
const donutSum = computed(() => dist.value.reduce((a, b) => a + b.n, 0))
const C = 2 * Math.PI * 22
const donutSegs = computed(() => {
  let off = 0
  return dist.value.map((d) => {
    const len = (d.n / donutSum.value) * C
    const seg = { c: d.c, dash: `${len} ${C - len}`, offset: -off }
    off += len
    return seg
  })
})

// Tooltip
const onMove = (e: MouseEvent) => {
  const svg = svgRef.value
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  const px = ((e.clientX - rect.left) / rect.width) * W
  const t = (px - pad.l) / innerW
  const i = Math.max(0, Math.min(SESSION - 1, Math.round(t * (SESSION - 1))))
  hover.value = { idx: i }
}
const onLeave = () => (hover.value = null)

const tip = computed(() => {
  if (!hover.value) return null
  const i = hover.value.idx
  const tx = xs(i)
  const inToday = i <= NOW
  const ty = inToday ? ys(cumLogins[i]) : ys(avgCum[i])
  const trades = minuteTrades[i] || 0
  const mobile = Math.round(trades * 0.58)
  const web = Math.round(trades * 0.28)
  const desktop = trades - mobile - web
  const flipLeft = tx > W * 0.62
  const hour = Math.floor(i / 60)
  const min = i % 60
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour > 12 ? hour - 12 : hour
  const label = `${h12}:${String(min).padStart(2, '0')} ${ampm}`
  const loginsMin = inToday ? (i === 0 ? cumLogins[0] : cumLogins[i] - cumLogins[i - 1]) : null
  return {
    i, tx, ty, inToday, trades, mobile, web, desktop, flipLeft, label,
    cum: inToday ? cumLogins[i] : null, avg: avgCum[i], loginsMin,
    totalLoginsToday: cumLogins[NOW],
    rows: [
      { lbl: 'Mobile', n: mobile, c: '#FF7A59' },
      { lbl: 'Web', n: web, c: '#5B8DEF' },
      { lbl: 'Desktop', n: desktop, c: '#9CA3AF' },
    ],
  }
})
const tipPct = (n: number, trades: number) => (trades ? Math.round((n / trades) * 100) : 0)
</script>

<template>
  <div class="card">
    <div class="card-head">
      <h3>Login analysis</h3>
      <span class="badge badge-info"><span class="badge-dot"></span>Live · 5s</span>
      <span class="badge" style="background:rgba(15,157,110,0.10);color:var(--emerald);border-color:rgba(15,157,110,0.25)">
        <span class="badge-dot" style="background:var(--emerald)"></span>Login API · 142 ms
      </span>
      <div class="card-actions">
        <button class="btn btn-sm btn-accent insights-btn" @click="router.push({ name: 'login-insights' })">
          <Icon name="bolt" :size="12" :stroke="2" /> Insights
          <Icon name="arrowRight" :size="11" :stroke="2" />
        </button>
      </div>
    </div>
    <div class="card-body" style="padding-bottom:12px">
      <div style="display:flex;gap:56px;margin-bottom:14px">
        <div>
          <div :style="{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.04em' }">
            <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: accent }" />Today
          </div>
          <div :style="{ fontFamily: 'var(--display)', fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em', color: accent, lineHeight: 1.1, marginTop: '2px' }">
            {{ fmt(totalToday) }}<span :style="{ fontSize: '14px', fontWeight: 500, color: accent, opacity: 0.8, marginLeft: '6px' }">logins</span>
          </div>
        </div>
        <div>
          <div style="display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--muted)" />30D Average
          </div>
          <div style="font-family:var(--display);font-size:34px;font-weight:700;letter-spacing:-0.02em;color:var(--muted);line-height:1.1;margin-top:2px">
            {{ fmt(avgCum[NOW]) }}<span style="font-size:14px;font-weight:500;opacity:0.85;margin-left:6px">logins</span>
          </div>
        </div>
        <div style="margin-left:auto;align-self:center;display:flex;align-items:center;gap:12px">
          <svg viewBox="0 0 60 60" width="60" height="60" style="transform:rotate(-90deg);flex-shrink:0">
            <circle cx="30" cy="30" r="22" fill="none" stroke="#EEF1F6" stroke-width="10" />
            <circle
              v-for="(s, i) in donutSegs"
              :key="i"
              cx="30" cy="30" r="22" fill="none"
              :stroke="s.c" stroke-width="10"
              :stroke-dasharray="s.dash"
              :stroke-dashoffset="s.offset"
            />
          </svg>
          <div style="display:flex;flex-direction:column;gap:2px;font-size:12px;font-family:var(--sans)">
            <div v-for="d in dist" :key="d.lbl" style="display:flex;align-items:center;gap:6px;color:var(--ink)">
              <span :style="{ width: '8px', height: '8px', borderRadius: '2px', background: d.c, flexShrink: 0 }" />
              <span style="min-width:46px">{{ d.lbl }}</span>
              <span style="font-family:var(--mono);color:var(--muted)">{{ Math.round((d.n / donutSum) * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div style="position:relative">
        <svg
          ref="svgRef"
          :viewBox="`0 0 ${W} ${H}`"
          width="100%"
          :height="H"
          preserveAspectRatio="none"
          @mousemove="onMove"
          @mouseleave="onLeave"
          style="display:block;cursor:crosshair"
        >
          <defs>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="accent" stop-opacity="0.14" />
              <stop offset="100%" :stop-color="accent" stop-opacity="0.0" />
            </linearGradient>
          </defs>

          <line v-for="(y, i) in gridY" :key="i" :x1="pad.l" :x2="W - pad.r" :y1="y" :y2="y" stroke="#EEF1F6" stroke-width="1" />

          <path :d="todayArea" fill="url(#area-grad)" />
          <path :d="avgLine" stroke="#C8CDD8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <path :d="todayLine" :stroke="accent" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round" />

          <line :x1="nowX" :x2="nowX" :y1="pad.t" :y2="pad.t + innerHL" stroke="rgba(15,18,28,0.12)" stroke-width="1" />
          <circle :cx="nowX" :cy="nowY" r="4.5" :fill="accent" stroke="#fff" stroke-width="1.5" />

          <line :x1="pad.l" :x2="W - pad.r" :y1="barBot" :y2="barBot" stroke="#E6E9F0" stroke-width="1" />
          <rect v-for="(b, i) in bars" :key="i" :x="b.x" :y="b.y" :width="barW" :height="b.h" :fill="accent" fill-opacity="0.55" />

          <text
            v-for="(i, k) in tickIdx"
            :key="'tl' + k"
            :x="xs(i)" :y="H - 6"
            :text-anchor="k === 0 ? 'start' : k === tickIdx.length - 1 ? 'end' : 'middle'"
            font-size="11" font-family="var(--mono)" fill="rgba(15,18,28,0.55)"
          >{{ tickLabels[k] }}</text>
          <line v-for="(i, k) in tickIdx" :key="'tt' + k" :x1="xs(i)" :x2="xs(i)" :y1="barBot" :y2="barBot + 4" stroke="rgba(15,18,28,0.3)" stroke-width="1" />

          <g v-if="tip" style="pointer-events:none">
            <line :x1="tip.tx" :x2="tip.tx" :y1="pad.t" :y2="barBot" :stroke="accent" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="3 3" />
            <circle :cx="tip.tx" :cy="tip.ty" r="4.5" :fill="tip.inToday ? accent : '#8A93A6'" stroke="#fff" stroke-width="1.5" />
          </g>
        </svg>

        <div
          v-if="tip"
          :style="{
            position: 'absolute',
            left: tip.flipLeft ? 'auto' : `calc(${(tip.tx / W) * 100}% + 14px)`,
            right: tip.flipLeft ? `calc(${(1 - tip.tx / W) * 100}% + 14px)` : 'auto',
            top: `calc(${(tip.ty / H) * 100}% - 8px)`,
            transform: 'translateY(-50%)',
            background: '#0F121C', color: '#fff', borderRadius: '10px',
            padding: '12px 14px', minWidth: '230px',
            boxShadow: '0 10px 30px rgba(15,18,28,0.25)',
            fontFamily: 'var(--sans)', fontSize: '12px', pointerEvents: 'none', zIndex: 4
          }"
        >
          <div style="font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">{{ tip.label }}</div>
          <div style="display:flex;justify-content:space-between;gap:18px;margin-bottom:4px">
            <span :style="{ color: accent }">Total logins · today</span>
            <span :style="{ fontFamily: 'var(--display)', fontSize: '16px', fontWeight: 700, color: accent }">{{ tip.totalLoginsToday != null ? tip.totalLoginsToday.toLocaleString() : '—' }}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:18px;margin-bottom:4px">
            <span style="color:rgba(255,255,255,0.7)">Logins this minute</span>
            <span style="font-family:var(--display);font-size:14px;font-weight:600">{{ tip.loginsMin != null ? tip.loginsMin.toLocaleString() : '—' }}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:18px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08)">
            <span style="color:rgba(255,255,255,0.7)">Trades this minute</span>
            <span style="font-family:var(--display);font-size:14px;font-weight:600">{{ tip.trades.toLocaleString() }}</span>
          </div>
          <div style="font-family:var(--mono);font-size:10px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">By device</div>
          <div v-for="row in tip.rows" :key="row.lbl" style="display:grid;grid-template-columns:60px 1fr 36px;align-items:center;gap:8px;margin-bottom:4px">
            <span style="color:rgba(255,255,255,0.7)">{{ row.lbl }}</span>
            <span style="position:relative;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden">
              <span :style="{ position: 'absolute', inset: 0, width: `${tipPct(row.n, tip.trades)}%`, background: row.c, borderRadius: '2px' }" />
            </span>
            <span style="font-family:var(--mono);text-align:right;color:rgba(255,255,255,0.85)">{{ row.n }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
