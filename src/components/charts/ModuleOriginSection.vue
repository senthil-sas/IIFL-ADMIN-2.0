<script setup lang="ts">
import { ref } from 'vue'

interface Mod { lbl: string; n: number; c: string; desc: string; subs: { lbl: string; n: number }[] }
const modules: Mod[] = [
  { lbl: 'Market Watch', n: 7842, c: 'var(--primary)', desc: 'Quote tile · keyboard shortcuts', subs: [{ lbl: 'Mobile', n: 5096 }, { lbl: 'Web', n: 2746 }] },
  { lbl: 'Scalper', n: 4218, c: 'var(--emerald)', desc: 'Algo · single-click entry', subs: [{ lbl: 'Mobile', n: 1518 }, { lbl: 'Web', n: 2700 }] },
  { lbl: 'Options Chain', n: 3604, c: 'var(--amber)', desc: 'Strike table · OI ladder', subs: [{ lbl: 'Mobile', n: 2234 }, { lbl: 'Web', n: 1370 }] },
  { lbl: 'Basket', n: 1968, c: 'var(--violet)', desc: 'Multi-leg · staggered execution', subs: [{ lbl: 'Mobile', n: 784 }, { lbl: 'Web', n: 1184 }] },
  { lbl: 'Others', n: 1332, c: 'var(--coral)', desc: 'Charts, Holdings, API, Watchlist', subs: [{ lbl: 'Mobile', n: 786 }, { lbl: 'Web', n: 546 }] },
]
const total = modules.reduce((a, m) => a + m.n, 0)
const C = 2 * Math.PI * 64
let off = 0
const segs = modules.map((m) => {
  const len = (m.n / total) * C
  const seg = { ...m, len, off }
  off += len
  return seg
})
const hover = ref<number | null>(null)
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">Trades · origin by module</div>
        <div class="lid-block-title">Where orders were placed from</div>
      </div>
      <div class="lid-block-meta">{{ total.toLocaleString() }} orders</div>
    </div>
    <div style="display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:center">
      <div style="position:relative;width:180px;height:180px">
        <svg viewBox="0 0 180 180" width="180" height="180" style="transform:rotate(-90deg)">
          <circle cx="90" cy="90" r="64" fill="none" stroke="var(--line-2)" stroke-width="22" />
          <circle
            v-for="(s, i) in segs"
            :key="i"
            cx="90" cy="90" r="64" fill="none" :stroke="s.c" stroke-width="22"
            :stroke-dasharray="`${Math.max(0, s.len - 2)} ${C - Math.max(0, s.len - 2)}`" :stroke-dashoffset="-s.off"
            :style="{ opacity: hover != null && hover !== i ? 0.25 : 1, transition: 'opacity .12s', cursor: 'pointer' }"
            @mouseenter="hover = i" @mouseleave="hover = null"
          />
        </svg>
        <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none">
          <div v-if="hover != null">
            <div style="font-family:var(--mono);font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted)">{{ modules[hover].lbl }}</div>
            <div :style="{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: modules[hover].c }">{{ modules[hover].n.toLocaleString() }}</div>
            <div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:2px">{{ Math.round((modules[hover].n / total) * 100) }}% of orders</div>
          </div>
          <div v-else>
            <div style="font-family:var(--mono);font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted)">Orders</div>
            <div style="font-family:var(--display);font-size:22px;font-weight:700;letter-spacing:-0.02em;color:var(--ink)">{{ total.toLocaleString() }}</div>
          </div>
        </div>
        <div
          v-if="hover != null"
          style="position:absolute;left:50%;top:-8px;transform:translate(-50%, -100%);background:var(--ink);color:#fff;padding:8px 12px;border-radius:8px;font-size:11.5px;line-height:1.5;min-width:160px;pointer-events:none;box-shadow:var(--shadow-lg);z-index:5"
        >
          <div style="display:flex;align-items:center;gap:6px;font-weight:600;margin-bottom:4px">
            <span :style="{ width: '8px', height: '8px', borderRadius: '2px', background: modules[hover].c }" />{{ modules[hover].lbl }}
          </div>
          <div style="display:flex;justify-content:space-between;gap:12px;font-family:var(--mono)">
            <span style="opacity:0.7">Orders</span><span>{{ modules[hover].n.toLocaleString() }}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:12px;font-family:var(--mono)">
            <span style="opacity:0.7">Share</span><span>{{ Math.round((modules[hover].n / total) * 100) }}%</span>
          </div>
          <div v-for="s in modules[hover].subs" :key="s.lbl" style="display:flex;justify-content:space-between;gap:12px;font-family:var(--mono);opacity:0.85">
            <span style="opacity:0.7">{{ s.lbl }}</span>
            <span>{{ s.n.toLocaleString() }} · {{ Math.round((s.n / modules[hover].n) * 100) }}%</span>
          </div>
          <div style="position:absolute;left:50%;bottom:-5px;transform:translateX(-50%) rotate(45deg);width:10px;height:10px;background:var(--ink)" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:10px">
        <div v-for="m in modules" :key="m.lbl" :style="{ borderLeft: `3px solid ${m.c}`, paddingLeft: '10px' }">
          <div style="font-family:var(--display);font-size:13px;font-weight:600;color:var(--ink)">{{ m.lbl }}</div>
          <div style="font-size:10px;color:var(--muted-2);margin-top:1px;line-height:1.35">{{ m.desc }}</div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-top:6px">
            <span :style="{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em', color: m.c }">{{ m.n.toLocaleString() }}</span>
            <span style="font-family:var(--mono);font-size:10.5px;color:var(--muted)">{{ Math.round((m.n / total) * 100) }}%</span>
          </div>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
            <div v-for="s in m.subs" :key="s.lbl">
              <div style="display:flex;justify-content:space-between;align-items:baseline;gap:6px">
                <span style="font-size:10.5px;color:var(--ink-2)">{{ s.lbl }}</span>
                <span style="font-family:var(--mono);font-size:10px;color:var(--muted);font-variant-numeric:tabular-nums">{{ s.n.toLocaleString() }}</span>
              </div>
              <div style="height:3px;background:var(--canvas);border-radius:2px;margin-top:3px;overflow:hidden">
                <div :style="{ width: `${Math.round((s.n / m.n) * 100)}%`, height: '100%', background: m.c, borderRadius: '2px' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
