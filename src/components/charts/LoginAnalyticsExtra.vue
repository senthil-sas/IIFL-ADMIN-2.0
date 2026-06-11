<script setup lang="ts">
const accent = '#1B5BD9'
const emerald = '#0F9D6E'
const amber = '#C2790B'
const rose = '#D43A45'

const funnel = [
  { lbl: 'Placed a trade', n: 4128, c: accent, sub: '₹248.4 Cr turnover' },
  { lbl: 'Viewed, no trade', n: 2284, c: '#7E97D9', sub: 'orderbook · watchlist' },
  { lbl: 'Logged in, idle', n: 971, c: '#D7DEEA', sub: 'no actions in session' },
]
const fSum = funnel.reduce((a, b) => a + b.n, 0)
const C = 2 * Math.PI * 36
const tradePct = ((funnel[0].n / fSum) * 100).toFixed(1)
let off = 0
const funnelSegs = funnel.map((d) => {
  const len = (d.n / fSum) * C
  const seg = { c: d.c, dash: `${len} ${C - len}`, offset: -off }
  off += len
  return seg
})

const tiers = [
  { lbl: 'HNI (₹50L+)', active: 412, total: 487, delta: '+8.2%' },
  { lbl: 'Premium (₹10–50L)', active: 1284, total: 1542, delta: '+4.1%' },
  { lbl: 'Pro trader', active: 928, total: 1102, delta: '+12.4%' },
  { lbl: 'Retail', active: 4218, total: 9241, delta: '−2.1%' },
  { lbl: 'Dormant >30d', active: 541, total: 1911, delta: '+24.8%' },
]
const tierBar = (t: (typeof tiers)[number]) => {
  const isHni = t.lbl.startsWith('HNI')
  const isDormant = t.lbl.startsWith('Dormant')
  return isDormant ? amber : isHni ? emerald : accent
}

const streaks = [
  { lbl: '30+ days', n: 1842, c: accent },
  { lbl: '14–29', n: 2104, c: '#3D77E0' },
  { lbl: '7–13', n: 1521, c: '#6E94E5' },
  { lbl: '3–6', n: 982, c: '#A0B8EC' },
  { lbl: '1–2', n: 854, c: '#CFDBF2' },
]
const sMax = Math.max(...streaks.map((s) => s.n))
const sSum = streaks.reduce((a, b) => a + b.n, 0)
const stickyPct = (((streaks[0].n + streaks[1].n) / sSum) * 100).toFixed(0)

const reEngage = [
  { lbl: 'Dormant returned today', n: 184, sub: 'idle 30–90d · ₹6.2 Cr AUM', tone: 'good', action: 'Trigger welcome-back nudge' },
  { lbl: 'HNI not seen in 7d', n: 38, sub: '₹14.8 Cr AUM at risk', tone: 'warn', action: 'Assign to RM' },
  { lbl: 'Churn-risk (no login 14d)', n: 421, sub: 'avg AUM ₹2.1 L', tone: 'bad', action: 'Send reactivation campaign' },
  { lbl: 'Funded but never traded', n: 92, sub: '₹48 L unutilized margin', tone: 'warn', action: 'Onboarding outreach' },
]
const toneColor: Record<string, string> = { good: emerald, warn: amber, bad: rose }
</script>

<template>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
    <!-- 1. Funnel -->
    <div class="card" style="padding:16px 18px">
      <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">
        <span>Login → trade conversion · today</span>
        <span class="label-mono">{{ fSum.toLocaleString() }} sessions</span>
      </div>
      <div style="display:flex;align-items:center;gap:22px">
        <div style="position:relative;flex-shrink:0">
          <svg viewBox="0 0 90 90" width="92" height="92" style="transform:rotate(-90deg)">
            <circle cx="45" cy="45" r="36" fill="none" stroke="#EEF1F6" stroke-width="12" />
            <circle v-for="(s, i) in funnelSegs" :key="i" cx="45" cy="45" r="36" fill="none" :stroke="s.c" stroke-width="12" :stroke-dasharray="s.dash" :stroke-dashoffset="s.offset" />
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <span :style="{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '18px', color: accent, lineHeight: 1 }">{{ tradePct }}%</span>
            <span style="font-family:var(--mono);font-size:9px;color:var(--muted);margin-top:2px">traded</span>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:8px">
          <div v-for="d in funnel" :key="d.lbl" style="display:grid;grid-template-columns:8px 1fr auto;align-items:baseline;column-gap:8px;font-size:12px">
            <span :style="{ width: '8px', height: '8px', borderRadius: '2px', background: d.c, alignSelf: 'center' }" />
            <span style="color:var(--ink);font-weight:500">{{ d.lbl }}</span>
            <span style="font-family:var(--display);font-weight:600;font-size:13px">{{ d.n.toLocaleString() }}</span>
            <span></span>
            <span style="font-size:11px;color:var(--muted)">{{ d.sub }}</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Tiers -->
    <div class="card" style="padding:16px 18px">
      <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">
        <span>Engagement by client tier · today</span>
        <span class="label-mono">active / total · vs 7d avg</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div v-for="t in tiers" :key="t.lbl" style="display:grid;grid-template-columns:130px 1fr 70px 56px;align-items:center;gap:10px;font-size:12px">
          <span style="display:flex;align-items:center;gap:6px">
            <span v-if="t.lbl.startsWith('HNI')" style="font-size:10px">★</span>
            <span :style="{ fontWeight: t.lbl.startsWith('HNI') ? 600 : 400 }">{{ t.lbl }}</span>
          </span>
          <span style="position:relative;height:8px;background:#F1F3F8;border-radius:3px;overflow:hidden">
            <span :style="{ position: 'absolute', inset: 0, width: `${(t.active / t.total) * 100}%`, background: tierBar(t), borderRadius: '3px' }" />
          </span>
          <span style="font-family:var(--mono);font-size:11px;color:var(--muted);text-align:right">{{ t.active.toLocaleString() }}/{{ t.total.toLocaleString() }}</span>
          <span :style="{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, color: t.delta.startsWith('+') ? emerald : rose, textAlign: 'right' }">{{ t.delta }}</span>
        </div>
      </div>
    </div>

    <!-- 3. Streaks -->
    <div class="card" style="padding:16px 18px">
      <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">
        <span>Consecutive-login streaks</span>
        <span class="label-mono">{{ stickyPct }}% sticky (14d+)</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:9px">
        <div v-for="s in streaks" :key="s.lbl" style="display:grid;grid-template-columns:78px 1fr 56px;align-items:center;gap:10px;font-size:12px">
          <span style="color:var(--ink)">{{ s.lbl }}</span>
          <span style="position:relative;height:8px;background:#F1F3F8;border-radius:3px;overflow:hidden">
            <span :style="{ position: 'absolute', inset: 0, width: `${(s.n / sMax) * 100}%`, background: s.c, borderRadius: '3px' }" />
          </span>
          <span style="font-family:var(--mono);text-align:right;color:var(--muted)">{{ s.n.toLocaleString() }}</span>
        </div>
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line-2);display:flex;justify-content:space-between;font-size:11px;color:var(--muted)">
        <span>Median streak <span style="font-family:var(--mono);color:var(--ink);font-weight:500">11 days</span></span>
        <span>Longest active <span style="font-family:var(--mono);color:var(--ink);font-weight:500">284 days</span></span>
      </div>
    </div>

    <!-- 4. Re-engagement -->
    <div class="card" style="padding:16px 18px">
      <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">
        <span>Re-engagement opportunities</span>
        <span class="label-mono">action queue</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div v-for="r in reEngage" :key="r.lbl" style="display:grid;grid-template-columns:4px 1fr auto;gap:10px;align-items:center;padding:8px 10px;background:#FAFBFD;border-radius:6px">
          <span :style="{ width: '3px', alignSelf: 'stretch', background: toneColor[r.tone], borderRadius: '2px' }" />
          <div style="display:flex;flex-direction:column;gap:2px;min-width:0">
            <div style="display:flex;align-items:baseline;gap:8px">
              <span style="font-family:var(--display);font-weight:600;font-size:14px">{{ r.n.toLocaleString() }}</span>
              <span style="font-size:12px;color:var(--ink)">{{ r.lbl }}</span>
            </div>
            <span style="font-size:11px;color:var(--muted)">{{ r.sub }}</span>
          </div>
          <button class="btn btn-sm" style="white-space:nowrap">{{ r.action }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
