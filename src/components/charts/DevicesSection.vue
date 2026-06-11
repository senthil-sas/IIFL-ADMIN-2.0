<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{ accent?: string; totalTrades: number }>(), {
  accent: 'var(--primary)',
})

const hover = ref<{ ring: 'inner' | 'outer'; idx: number; x: number; y: number } | null>(null)

const parents = computed(() => [
  { lbl: 'Mobile', n: Math.round(props.totalTrades * 0.62), c: '#1B5BD9' },
  { lbl: 'Web', n: Math.round(props.totalTrades * 0.28), c: '#16A36B' },
  { lbl: 'APIs', n: Math.round(props.totalTrades * 0.10), c: '#E5A41A' },
])
const children = computed(() => {
  const p = parents.value
  return [
    { parent: 'Mobile', lbl: 'Android', n: Math.round(p[0].n * 0.71), c: '#3D2C8D' },
    { parent: 'Mobile', lbl: 'iOS', n: p[0].n - Math.round(p[0].n * 0.71), c: '#8E5CD9' },
    { parent: 'Web', lbl: 'Windows', n: Math.round(p[1].n * 0.62), c: '#0E8FA8' },
    { parent: 'Web', lbl: 'macOS', n: Math.round(p[1].n * 0.31), c: '#E36AA8' },
    { parent: 'Web', lbl: 'Linux', n: p[1].n - Math.round(p[1].n * 0.62) - Math.round(p[1].n * 0.31), c: '#C13F8A' },
    { parent: 'APIs', lbl: 'Algo partners', n: Math.round(p[2].n * 0.68), c: '#D55B2C' },
    { parent: 'APIs', lbl: 'Direct', n: p[2].n - Math.round(p[2].n * 0.68), c: '#A33A4F' },
  ]
})
const total = computed(() => parents.value.reduce((a, b) => a + b.n, 0))

const R_IN = 56, R_OUT = 78
const C_IN = 2 * Math.PI * R_IN
const C_OUT = 2 * Math.PI * R_OUT

const innerSegs = computed(() => {
  let off = 0
  return parents.value.map((p) => {
    const len = (p.n / total.value) * C_IN
    const seg = { ...p, len, off }
    off += len
    return seg
  })
})
const outerSegs = computed(() => {
  let off = 0
  const out: { parent: string; lbl: string; n: number; c: string; len: number; off: number }[] = []
  parents.value.forEach((p) => {
    const subs = children.value.filter((s) => s.parent === p.lbl)
    const parentArc = (p.n / total.value) * C_OUT
    subs.forEach((s) => {
      const len = (s.n / p.n) * parentArc
      out.push({ ...s, len, off })
      off += len
    })
  })
  return out
})

const showTip = (e: MouseEvent, ring: 'inner' | 'outer', idx: number) => {
  const svg = (e.currentTarget as SVGElement).ownerSVGElement
  if (!svg) return
  const r = svg.getBoundingClientRect()
  hover.value = { ring, idx, x: e.clientX - r.left, y: e.clientY - r.top }
}
const hideTip = () => (hover.value = null)

const innerOpacity = (i: number) =>
  hover.value && !(hover.value.ring === 'inner' && hover.value.idx === i) &&
  !(hover.value.ring === 'outer' && children.value[hover.value.idx].parent === parents.value[i].lbl)
    ? 0.4 : 1
const outerOpacity = (i: number) =>
  hover.value && !(hover.value.ring === 'outer' && hover.value.idx === i) &&
  !(hover.value.ring === 'inner' && parents.value[hover.value.idx].lbl === outerSegs.value[i].parent)
    ? 0.4 : 1

const tip = computed(() => {
  if (!hover.value) return null
  if (hover.value.ring === 'inner') {
    const seg = parents.value[hover.value.idx]
    const subs = children.value.filter((c) => c.parent === seg.lbl)
    return {
      lbl: seg.lbl, c: seg.c,
      headline: `${seg.n.toLocaleString()} trades · ${((seg.n / total.value) * 100).toFixed(1)}% of total`,
      rows: subs.map((s) => ({ lbl: s.lbl, c: s.c, n: s.n, pct: ((s.n / seg.n) * 100).toFixed(1) })),
      x: hover.value.x, y: hover.value.y,
    }
  }
  const seg = children.value[hover.value.idx]
  const parent = parents.value.find((o) => o.lbl === seg.parent)!
  return {
    lbl: `${seg.parent} → ${seg.lbl}`, c: seg.c,
    headline: `${seg.n.toLocaleString()} trades · ${((seg.n / parent.n) * 100).toFixed(1)}% of ${seg.parent} · ${((seg.n / total.value) * 100).toFixed(1)}% of total`,
    rows: null as null | { lbl: string; c: string; n: number; pct: string }[],
    x: hover.value.x, y: hover.value.y,
  }
})

const subsOf = (lbl: string) => children.value.filter((s) => s.parent === lbl)
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">Trades · origin by device</div>
        <div class="lid-block-title">Where trades came from today</div>
      </div>
      <div class="lid-block-meta">{{ total.toLocaleString() }} trades</div>
    </div>
    <div style="display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:center">
      <div style="position:relative;width:200px;height:200px">
        <svg viewBox="0 0 200 200" width="200" height="200" style="transform:rotate(-90deg);overflow:visible">
          <circle
            v-for="(s, i) in outerSegs"
            :key="'o' + i"
            cx="100" cy="100" :r="R_OUT" fill="none" :stroke="s.c" stroke-width="20"
            :stroke-dasharray="`${s.len} ${C_OUT - s.len}`" :stroke-dashoffset="-s.off"
            :style="{ cursor: 'pointer', transition: 'opacity .15s', opacity: outerOpacity(i) }"
            @mousemove="showTip($event, 'outer', i)" @mouseleave="hideTip"
          />
          <circle
            v-for="(s, i) in innerSegs"
            :key="'i' + i"
            cx="100" cy="100" :r="R_IN" fill="none" :stroke="s.c" stroke-width="14"
            :stroke-dasharray="`${s.len} ${C_IN - s.len}`" :stroke-dashoffset="-s.off"
            :style="{ cursor: 'pointer', transition: 'opacity .15s', opacity: innerOpacity(i) }"
            @mousemove="showTip($event, 'inner', i)" @mouseleave="hideTip"
          />
        </svg>
        <div
          v-if="tip"
          :style="{ position: 'absolute', left: tip.x + 12 + 'px', top: tip.y + 12 + 'px', pointerEvents: 'none', background: '#0E1320', color: '#fff', padding: '10px 12px', borderRadius: '6px', fontSize: '11.5px', lineHeight: 1.4, whiteSpace: 'nowrap', zIndex: 5, boxShadow: '0 6px 20px rgba(14,19,32,0.25)', fontFamily: 'var(--display)', minWidth: '180px' }"
        >
          <div style="display:flex;align-items:center;gap:6px;font-weight:600">
            <span :style="{ width: '8px', height: '8px', borderRadius: '2px', background: tip.c }" />
            {{ tip.lbl }}
          </div>
          <div style="font-family:var(--mono);font-size:10.5px;opacity:0.75;margin-top:3px">{{ tip.headline }}</div>
          <div v-if="tip.rows && tip.rows.length" style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.12);display:flex;flex-direction:column;gap:4px">
            <div v-for="r in tip.rows" :key="r.lbl" style="display:flex;align-items:center;gap:8px;justify-content:space-between">
              <span style="display:inline-flex;align-items:center;gap:6px;font-size:11px">
                <span :style="{ width: '7px', height: '7px', borderRadius: '2px', background: r.c }" />{{ r.lbl }}
              </span>
              <span style="font-family:var(--mono);font-size:10.5px;opacity:0.85">{{ r.n.toLocaleString() }} <span style="opacity:0.55;margin-left:4px">{{ r.pct }}%</span></span>
            </div>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
        <div v-for="parent in parents" :key="parent.lbl" :style="{ borderLeft: `3px solid ${parent.c}`, paddingLeft: '12px' }">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px">
            <span style="font-family:var(--display);font-size:14px;font-weight:600;color:var(--ink)">{{ parent.lbl }}</span>
            <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">{{ Math.round((parent.n / total) * 100) }}%</span>
          </div>
          <div :style="{ fontFamily: 'var(--display)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.01em', color: parent.c }">{{ parent.n.toLocaleString() }}</div>
          <div style="font-size:10.5px;color:var(--muted-2);margin-top:2px;font-family:var(--mono);text-transform:uppercase;letter-spacing:0.06em">trades</div>
          <div style="margin-top:10px;display:flex;flex-direction:column;gap:5px">
            <div v-for="s in subsOf(parent.lbl)" :key="s.lbl" style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px">
              <div>
                <div style="font-size:12px;color:var(--ink);display:flex;align-items:center;gap:6px">
                  <span :style="{ width: '8px', height: '8px', borderRadius: '2px', background: s.c, flexShrink: 0 }" />{{ s.lbl }}
                </div>
                <div style="height:3px;background:var(--bg);border-radius:2px;margin-top:3px;overflow:hidden">
                  <div :style="{ width: `${Math.round((s.n / parent.n) * 100)}%`, height: '100%', background: s.c, borderRadius: '2px' }" />
                </div>
              </div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);min-width:26px;text-align:right">{{ Math.round((s.n / parent.n) * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
