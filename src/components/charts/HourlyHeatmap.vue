<script setup lang="ts">
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const heat = (v: number) => `rgba(71,98,227,${0.08 + v * 0.85})`

// Computed once on setup (matches the original's render-time generation).
const data: number[][] = Array.from({ length: 7 }, (_, d) =>
  Array.from({ length: 24 }, (_, h) => {
    const peak = Math.exp(-Math.pow(h - 18, 2) / 40) + 0.3 * Math.exp(-Math.pow(h - 10, 2) / 40)
    const wk = d === 5 || d === 6 ? 0.6 : 1
    return Math.min(1, peak * wk * (0.7 + Math.random() * 0.6))
  })
)
const legend = [0.1, 0.3, 0.5, 0.7, 0.9]
const hours = Array.from({ length: 24 }, (_, h) => h)
</script>

<template>
  <div class="card">
    <div class="card-head">
      <h3>Login heatmap</h3>
      <span class="muted" style="font-size:12px">Last 7 days · IST</span>
      <div class="card-actions">
        <span class="label-mono">low</span>
        <div style="display:flex;gap:2px">
          <div v-for="v in legend" :key="v" :style="{ width: '12px', height: '12px', borderRadius: '3px', background: heat(v) }" />
        </div>
        <span class="label-mono">high</span>
      </div>
    </div>
    <div class="card-body">
      <div style="display:grid;grid-template-columns:36px 1fr;gap:6px;align-items:center">
        <template v-for="(row, d) in data" :key="d">
          <div class="label-mono">{{ days[d] }}</div>
          <div style="display:grid;grid-template-columns:repeat(24, 1fr);gap:2px">
            <div
              v-for="(v, h) in row"
              :key="h"
              :title="`${days[d]} ${h}:00 — ${Math.round(v * 1200)}`"
              :style="{ aspectRatio: 1, borderRadius: '3px', background: heat(v) }"
            />
          </div>
        </template>
        <div></div>
        <div style="display:grid;grid-template-columns:repeat(24, 1fr);gap:2px;margin-top:4px">
          <div v-for="h in hours" :key="h" class="label-mono" style="text-align:center;font-size:9px">{{ h % 4 === 0 ? h : '' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
