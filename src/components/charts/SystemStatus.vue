<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon.vue'
import { SERVICES, tone, tileColor, sevDot, statusPill, type Service } from '../../data/systemStatus'

const open = ref<string | null>(null)
const services = SERVICES

const spark = (s: Service) =>
  s.tiles.slice(-12).map((t) => (t === 'ok' ? 4 : t === 'warn' ? 7 : 9))
</script>

<template>
  <div class="card">
    <div class="card-head">
      <h3>System health</h3>
      <span class="badge"><span class="badge-dot" style="background:var(--emerald)" />6 of 7 healthy</span>
      <span class="label-mono" style="font-size:11px;color:var(--muted);display:inline-flex;align-items:center;gap:6px">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--emerald);box-shadow:0 0 0 3px rgba(15,157,110,0.18)" />
        Last checked 12s ago
      </span>
      <div class="card-actions">
        <button class="btn btn-sm btn-ghost">View status page <Icon name="arrowRight" :size="11" /></button>
      </div>
    </div>
    <div class="card-body" style="padding:12px 14px 14px">
      <div v-for="s in services" :key="s.key" class="svc-row" :class="{ open: open === s.key }">
        <div class="svc-head" @click="open = open === s.key ? null : s.key">
          <span class="svc-icon" :style="{ color: tone[s.status] }">{{ s.glyph }}</span>
          <div style="min-width:0">
            <div class="svc-name">{{ s.name }}</div>
            <div style="font-size:11.5px;color:var(--muted);font-family:var(--mono);margin-top:2px">p95 {{ s.latency.val }}{{ s.latency.unit }} · uptime {{ s.uptime }}</div>
          </div>
          <span class="sr-spark" title="latency — last 12 checks">
            <span
              v-for="(v, j) in spark(s)"
              :key="j"
              :style="{ height: Math.max(2, (v / 9) * 18) + 'px', background: tone[s.status], opacity: 0.35 + (j / spark(s).length) * 0.65 }"
            />
          </span>
          <span class="badge" :class="statusPill[s.status][1]" style="width:86px;justify-content:center">
            <span class="badge-dot" />{{ statusPill[s.status][0] }}
          </span>
          <span class="svc-chev">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1.5L7 5L3 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>

        <div v-if="open === s.key" class="svc-detail">
          <div class="panel" style="grid-column:1 / -1">
            <div class="svc-stats" style="padding:0;margin-bottom:12px">
              <div class="svc-stat">
                <div class="lbl">Avg latency</div>
                <div class="val">{{ s.latency.val }}<span class="u">{{ s.latency.unit }}</span></div>
              </div>
              <div class="svc-stat">
                <div class="lbl">Failure rate</div>
                <div class="val">{{ s.failRate.val }}<span class="u">{{ s.failRate.unit }}</span></div>
              </div>
            </div>
            <div class="svc-tiles" style="padding:0" title="last 60 health checks · oldest → newest">
              <span v-for="(t, i) in s.tiles" :key="i" class="t" :style="{ background: tileColor[t] }" />
            </div>
          </div>

          <div class="panel">
            <div class="panel-h">
              <span>Last 24 hours</span>
              <span class="label-mono" style="text-transform:none;letter-spacing:0;color:var(--muted)">SLO 99.9%</span>
            </div>
            <div class="svc-metric-grid">
              <div class="svc-metric"><div class="lbl">Throughput</div><div class="val">{{ s.throughput }}</div></div>
              <div class="svc-metric"><div class="lbl">Uptime · 30d</div><div class="val">{{ s.uptime }}</div></div>
              <div class="svc-metric">
                <div class="lbl">Error budget</div>
                <div class="val" :style="{ color: s.status === 'down' ? 'var(--rose)' : s.status === 'deg' ? 'var(--amber)' : 'var(--ink)' }">{{ s.errorBudget }}</div>
              </div>
              <div class="svc-metric"><div class="lbl">p95 trend</div><div class="val" style="font-size:14px">{{ s.latency.delta || '—' }}</div></div>
              <div class="svc-metric"><div class="lbl">Failure Δ vs 7d</div><div class="val" style="font-size:14px">{{ s.failRate.delta || '0' }}</div></div>
              <div class="svc-metric"><div class="lbl">Region</div><div class="val" style="font-size:14px">{{ s.region }}</div></div>
            </div>
            <div style="margin-top:14px">
              <div class="panel-h" style="margin-bottom:8px">Dependencies</div>
              <div class="svc-deps">
                <span v-for="([n, st]) in s.deps" :key="n" class="svc-dep">
                  <span class="dot" :style="{ background: tone[st] }" />{{ n }}
                </span>
              </div>
            </div>
            <div class="svc-actions">
              <button class="btn btn-sm"><Icon name="refresh" :size="11" /> Re-run health check</button>
              <button class="btn btn-sm">View logs</button>
            </div>
          </div>

          <div class="panel">
            <div class="panel-h">
              <span>Recent incidents</span>
              <span class="label-mono" style="text-transform:none;letter-spacing:0;color:var(--muted)">{{ s.incidents.length }} active</span>
            </div>
            <div v-if="s.incidents.length === 0" style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);padding:8px 0">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--emerald)" />
              No incidents in the last 7 days. Last failure 11d ago.
            </div>
            <div v-else class="svc-incidents">
              <div v-for="(inc, i) in s.incidents" :key="i" class="row">
                <span class="pip" :style="{ background: sevDot[inc.sev] }" />
                <span style="color:var(--ink)">{{ inc.m }}</span>
                <span class="label-mono" style="color:var(--muted)">{{ inc.t }}</span>
              </div>
            </div>
            <div style="margin-top:14px">
              <div class="panel-h" style="margin-bottom:8px">On-call</div>
              <div style="display:flex;align-items:center;gap:10px;font-size:12px">
                <span style="width:26px;height:26px;border-radius:50%;background:#4762E3;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">RM</span>
                <div style="flex:1">
                  <div style="font-weight:500">Rohan Mehta</div>
                  <div style="font-size:11px;color:var(--muted)">SRE · pager active · responds &lt; 5 min</div>
                </div>
                <button class="btn btn-sm">Notify</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
