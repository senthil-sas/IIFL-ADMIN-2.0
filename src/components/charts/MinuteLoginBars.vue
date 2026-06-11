<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon.vue'
import { useStore } from '../../store'

const store = useStore()
const windowMin = computed(() => store.state.tweaks.windowMin || 60)
const accent = computed(() => store.state.tweaks.accent || 'var(--primary)')
const showRolling = computed(() => store.state.tweaks.showRolling !== false)

const seed = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const W = 760, H = 180
const pad = { l: 36, r: 16, t: 14, b: 24 }
const innerW = W - pad.l - pad.r
const innerH = H - pad.t - pad.b

const model = computed(() => {
  const wm = windowMin.value
  const data = Array.from({ length: wm }, (_, i) => {
    const t = i / wm
    const trend = 40 + 60 * Math.exp(-Math.pow((t - 0.7) * 3, 2))
    const noise = (seed(i + 17) - 0.5) * 30
    return Math.max(8, Math.round(trend + noise))
  })
  const max = Math.max(...data) * 1.15
  const rolling = data.map((_, i) => {
    const s = Math.max(0, i - 4)
    const slice = data.slice(s, i + 1)
    return slice.reduce((a, b) => a + b, 0) / slice.length
  })
  const barW = (innerW / data.length) * 0.72
  const gap = innerW / data.length
  const ys = (v: number) => pad.t + innerH - (v / max) * innerH
  const total = data.reduce((a, b) => a + b, 0)
  const peak = Math.max(...data)
  const peakIdx = data.indexOf(peak)
  const rollingPath = rolling
    .map((v, i) => `${i ? 'L' : 'M'}${pad.l + i * gap + gap / 2},${ys(v)}`)
    .join(' ')
  const bars = data.map((v, i) => ({
    x: pad.l + i * gap + (gap - barW) / 2,
    y: ys(v),
    h: innerH - (ys(v) - pad.t),
    isPeak: i === peakIdx,
  }))
  return { data, max, total, peak, peakIdx, barW, bars, rollingPath }
})

const gridY = [0, 1, 2, 3].map((i) => pad.t + (i * innerH) / 3)
const yTicks = [0, 0.5, 1]
const xTicks = [0, 15, 30, 45, 60]
</script>

<template>
  <div class="card">
    <div class="card-head">
      <h3>Logins · per minute</h3>
      <span class="badge"><span class="badge-dot" style="background:var(--emerald)" />Streaming</span>
      <div class="card-actions">
        <span class="muted" style="font-size:12px">Last {{ windowMin }} min</span>
        <button class="btn btn-sm btn-ghost"><Icon name="download" :size="12" /></button>
      </div>
    </div>
    <div class="card-body" style="padding-bottom:12px">
      <div style="display:flex;gap:18px;margin-bottom:10px">
        <div>
          <div class="label-mono">Total · window</div>
          <div style="font-family:var(--display);font-size:20px;font-weight:600;letter-spacing:-0.01em">{{ model.total.toLocaleString() }}</div>
        </div>
        <div>
          <div class="label-mono">Peak · {{ windowMin - model.peakIdx }}m ago</div>
          <div style="font-family:var(--display);font-size:20px;font-weight:600;letter-spacing:-0.01em">{{ model.peak }}/min</div>
        </div>
        <div>
          <div class="label-mono">Avg / min</div>
          <div style="font-family:var(--display);font-size:20px;font-weight:600;letter-spacing:-0.01em">{{ Math.round(model.total / windowMin) }}</div>
        </div>
      </div>
      <svg :viewBox="`0 0 ${W} ${H}`" width="100%" :height="H" preserveAspectRatio="none">
        <line v-for="(y, i) in gridY" :key="'g' + i" :x1="pad.l" :x2="W - pad.r" :y1="y" :y2="y" stroke="#EFF1F5" stroke-width="1" />
        <text
          v-for="(p, i) in yTicks"
          :key="'y' + i"
          :x="pad.l - 6" :y="pad.t + (1 - p) * innerH + 3"
          text-anchor="end" font-size="10" font-family="var(--mono)" fill="#8A93A6"
        >{{ Math.round(model.max * p) }}</text>
        <text
          v-for="m in xTicks"
          :key="'x' + m"
          :x="pad.l + (1 - m / 60) * innerW" :y="H - 6"
          text-anchor="middle" font-size="10" font-family="var(--mono)" fill="#8A93A6"
        >{{ m === 0 ? 'now' : `-${m}m` }}</text>
        <rect
          v-for="(b, i) in model.bars"
          :key="'b' + i"
          :x="b.x" :y="b.y" :width="model.barW" :height="b.h" rx="1.5"
          :fill="b.isPeak ? 'var(--coral)' : accent"
          :opacity="b.isPeak ? 1 : 0.78"
        />
        <path v-if="showRolling" :d="model.rollingPath" stroke="#0B0F17" stroke-opacity="0.45" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="3 3" />
      </svg>
    </div>
  </div>
</template>
