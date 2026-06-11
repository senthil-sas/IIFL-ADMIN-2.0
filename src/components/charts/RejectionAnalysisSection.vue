<script setup lang="ts">
import { ref, computed } from 'vue'

const hoverH = ref<number | null>(null)

const reasons = [
  { lbl: 'Insufficient margin', n: 1248, sev: 'rose', desc: 'Available margin < required' },
  { lbl: 'Price out of circuit', n: 842, sev: 'amber', desc: 'LTP outside DPR band' },
  { lbl: 'Symbol not allowed', n: 612, sev: 'amber', desc: 'Restricted scrip / GSM stage' },
  { lbl: 'Order qty > freeze limit', n: 428, sev: 'amber', desc: 'Per-order quantity cap exceeded' },
  { lbl: 'Session timeout', n: 318, sev: 'muted', desc: 'Token expired mid-flight' },
  { lbl: 'Risk-rule (MIS square-off)', n: 204, sev: 'rose', desc: 'Auto square-off window' },
  { lbl: 'Connectivity · exchange', n: 142, sev: 'muted', desc: 'Gateway timeout or 5xx' },
  { lbl: 'Duplicate client order id', n: 84, sev: 'muted', desc: 'COID collision in 5s window' },
]
const totalRej = reasons.reduce((a, r) => a + r.n, 0)
const maxReason = Math.max(...reasons.map((r) => r.n))
const sevColor = (s: string) => (s === 'rose' ? 'var(--rose)' : s === 'amber' ? 'var(--amber)' : 'var(--muted)')

const hourly = Array.from({ length: 24 }, (_, h) => {
  if (h < 9 || h > 15) return Math.round(8 + Math.sin(h) * 4 + Math.abs(Math.cos(h * 1.3)) * 6)
  const t = (h - 9) / 6
  const profile = 280 * Math.exp(-Math.pow((t - 0.05) * 4, 2)) + 120 * Math.exp(-Math.pow((t - 0.95) * 4, 2)) + 80
  const noise = Math.sin(h * 7.3) * 28 + Math.cos(h * 3.1) * 18
  return Math.max(0, Math.round(profile + noise))
})
const peakH = hourly.indexOf(Math.max(...hourly))

const W = 720, H = 180
const pad = { l: 36, r: 12, t: 14, b: 26 }
const innerW = W - pad.l - pad.r
const innerH = H - pad.t - pad.b
const yMax = Math.max(...hourly) * 1.12
const xAt = (i: number) => pad.l + (i / 23) * innerW
const yAt = (v: number) => pad.t + innerH - (v / yMax) * innerH
const linePath = hourly.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(v)}`).join(' ')
const areaPath = `${linePath} L ${xAt(23)} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`
const yTicks = [0, Math.round(yMax / 2), Math.round(yMax)]
const xTicks = [0, 6, 9, 12, 15, 18, 23]

const onMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
  const xRel = ((e.clientX - rect.left) / rect.width) * W
  const i = Math.round(((xRel - pad.l) / innerW) * 23)
  hoverH.value = i >= 0 && i <= 23 ? i : null
}

const tip = computed(() => {
  if (hoverH.value === null) return null
  const h = hoverH.value
  const v = hourly[h]
  const xPct = (xAt(h) / W) * 100
  const flipLeft = xPct > 70
  const session = h < 9 || h > 15 ? 'Off-hours' : h < 10 ? 'Open' : h > 14 ? 'Close' : 'Mid-day'
  return {
    h, v, xPct, flipLeft, session,
    topPct: (yAt(v) / H) * 100,
    pctOfPeak: Math.round((v / hourly[peakH]) * 100),
    pctOfDay: ((v / totalRej) * 100).toFixed(1),
  }
})
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">Rejection analysis</div>
        <div class="lid-block-title">Why orders were rejected today</div>
      </div>
      <div class="lid-block-meta">
        {{ totalRej.toLocaleString() }} rejections · peak <strong style="color:var(--ink)">{{ peakH }}:00</strong>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
      <div>
        <div style="font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:10px">By reason</div>
        <div style="display:flex;flex-direction:column;gap:9px">
          <div v-for="(r, i) in reasons" :key="r.lbl" style="display:grid;grid-template-columns:20px 1fr;gap:10px;align-items:center">
            <span style="font-family:var(--mono);font-size:10px;color:var(--muted-2);text-align:right">{{ i + 1 }}</span>
            <div>
              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                <div>
                  <span style="font-size:12.5px;color:var(--ink);font-weight:500">{{ r.lbl }}</span>
                  <span style="font-size:10.5px;color:var(--muted-2);margin-left:8px">{{ r.desc }}</span>
                </div>
                <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">
                  <strong style="color:var(--ink)">{{ r.n.toLocaleString() }}</strong> · {{ ((r.n / totalRej) * 100).toFixed(1) }}%
                </span>
              </div>
              <div style="height:8px;background:var(--canvas);border-radius:4px;overflow:hidden">
                <div :style="{ width: `${(r.n / maxReason) * 100}%`, height: '100%', background: sevColor(r.sev), borderRadius: '4px' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:10px">Hourly trend</div>
        <div style="position:relative">
          <svg :viewBox="`0 0 ${W} ${H}`" width="100%" :height="H" preserveAspectRatio="none" @mousemove="onMove" @mouseleave="hoverH = null">
            <g v-for="(t, i) in yTicks" :key="i">
              <line :x1="pad.l" :x2="W - pad.r" :y1="yAt(t)" :y2="yAt(t)" stroke="var(--line-2)" stroke-dasharray="3 3" />
              <text :x="pad.l - 6" :y="yAt(t) + 3" font-size="9.5" font-family="var(--mono)" fill="var(--muted-2)" text-anchor="end">{{ t.toLocaleString() }}</text>
            </g>
            <path :d="areaPath" fill="var(--rose)" fill-opacity="0.08" />
            <path :d="linePath" stroke="var(--rose)" stroke-width="1.6" fill="none" />
            <g v-if="hoverH === null">
              <line :x1="xAt(peakH)" :x2="xAt(peakH)" :y1="yAt(hourly[peakH])" :y2="pad.t + innerH" stroke="var(--rose)" stroke-dasharray="2 2" stroke-opacity="0.5" />
              <circle :cx="xAt(peakH)" :cy="yAt(hourly[peakH])" r="3.5" fill="var(--rose)" stroke="var(--surface)" stroke-width="1.5" />
              <text :x="xAt(peakH)" :y="yAt(hourly[peakH]) - 8" font-size="10" font-family="var(--mono)" fill="var(--rose)" text-anchor="middle" font-weight="600">{{ hourly[peakH].toLocaleString() }}</text>
            </g>
            <g v-if="hoverH !== null" style="pointer-events:none">
              <line :x1="xAt(hoverH)" :x2="xAt(hoverH)" :y1="pad.t" :y2="pad.t + innerH" stroke="var(--ink)" stroke-opacity="0.18" />
              <circle :cx="xAt(hoverH)" :cy="yAt(hourly[hoverH])" r="4" fill="var(--rose)" stroke="var(--surface)" stroke-width="2" />
            </g>
            <text v-for="h in xTicks" :key="h" :x="xAt(h)" :y="H - 8" font-size="9.5" font-family="var(--mono)" fill="var(--muted-2)" text-anchor="middle">
              {{ h === 23 ? '23:00' : `${h}:00` }}
            </text>
          </svg>
          <div
            v-if="tip"
            :style="{ position: 'absolute', left: `${tip.xPct}%`, top: `${tip.topPct}%`, transform: `translate(${tip.flipLeft ? '-100%' : '0%'}, calc(-100% - 10px))`, marginLeft: (tip.flipLeft ? -8 : 8) + 'px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '6px', padding: '8px 10px', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.12)', pointerEvents: 'none', minWidth: '140px', zIndex: 5 }"
          >
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:4px">
              <span style="font-family:var(--mono);font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em">
                {{ String(tip.h).padStart(2, '0') }}:00 – {{ String((tip.h + 1) % 24).padStart(2, '0') }}:00
              </span>
              <span style="font-family:var(--mono);font-size:10px;color:var(--muted-2)">{{ tip.session }}</span>
            </div>
            <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
              <span style="font-family:var(--display);font-size:18px;font-weight:600;color:var(--rose);letter-spacing:-0.01em">{{ tip.v.toLocaleString() }}</span>
              <span style="font-size:11px;color:var(--muted)">rejections</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--muted);font-family:var(--mono)">
              <span>{{ tip.pctOfPeak }}% of peak</span>
              <span>{{ tip.pctOfDay }}% of day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
