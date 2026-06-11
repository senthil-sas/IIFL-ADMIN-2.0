<script setup lang="ts">
const steps = [
  { lbl: 'Active customers', n: 124680, sub: 'KYC complete · account live', c: 'var(--primary)' },
  { lbl: 'Logged in today', n: 68420, sub: 'unique sessions · 09:00–15:30', c: 'var(--primary)' },
  { lbl: 'With funds', n: 41280, sub: 'available margin > ₹1,000', c: 'var(--primary)' },
  { lbl: 'Traded', n: 18964, sub: 'placed at least one order', c: 'var(--primary)' },
]
const top = steps[0].n
const rows = steps.map((s, i) => ({
  ...s,
  w: s.n / top,
  ofBase: ((s.n / top) * 100).toFixed(1),
  fromPrev: i === 0 ? null : ((s.n / steps[i - 1].n) * 100).toFixed(1),
  dropped: i === 0 ? 0 : steps[i - 1].n - s.n,
  idx: i,
}))
const endToEnd = ((steps[steps.length - 1].n / steps[0].n) * 100).toFixed(1)
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">Customer funnel</div>
        <div class="lid-block-title">From active base to today’s traders</div>
      </div>
      <div class="lid-block-meta">
        {{ steps[0].n.toLocaleString() }} → {{ steps[steps.length - 1].n.toLocaleString() }} ·
        <strong style="color:var(--ink)">{{ endToEnd }}%</strong> end-to-end
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div v-for="s in rows" :key="s.lbl" style="display:grid;grid-template-columns:180px 1fr 110px 130px;align-items:center;gap:14px">
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-family:var(--mono);font-size:10px;color:var(--muted-2);min-width:14px">{{ s.idx + 1 }}</span>
            <span style="font-size:13px;font-weight:500;color:var(--ink)">{{ s.lbl }}</span>
          </div>
          <div style="font-size:10.5px;color:var(--muted-2);margin-top:2px;margin-left:22px">{{ s.sub }}</div>
        </div>
        <div style="position:relative;height:32px;background:var(--canvas);border-radius:6px;overflow:hidden">
          <div :style="{ height: '100%', width: `${s.w * 100}%`, background: s.c, opacity: 1 - s.idx * 0.18, borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '12px', minWidth: '80px' }">
            <span style="font-family:var(--mono);font-size:12px;color:#fff;font-weight:500;font-variant-numeric:tabular-nums">{{ s.n.toLocaleString() }}</span>
          </div>
        </div>
        <div style="font-family:var(--mono);font-size:11.5px;color:var(--muted);text-align:right">
          <strong style="color:var(--ink)">{{ s.ofBase }}%</strong> of base
        </div>
        <div style="font-family:var(--mono);font-size:11.5px;text-align:right">
          <span v-if="s.fromPrev == null" style="color:var(--muted-2)">baseline</span>
          <template v-else>
            <span style="color:var(--ink)">{{ s.fromPrev }}%</span>
            <span style="color:var(--rose);margin-left:6px">−{{ s.dropped.toLocaleString() }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
