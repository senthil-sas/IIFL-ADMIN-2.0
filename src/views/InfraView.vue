<script setup lang="ts">
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import PageHeader from '../components/layout/PageHeader.vue'
import Gauge from '../components/charts/Gauge.vue'

interface Server {
  name: string; region: string; role: string
  cpu: number; mem: number; conn: number
  status: 'op' | 'deg' | 'down'
}

const SERVERS: Server[] = [
  { name: 'lama-01', region: 'ap-south-1', role: 'API', cpu: 62, mem: 48, conn: 412, status: 'op' },
  { name: 'lama-02', region: 'ap-south-1', role: 'API', cpu: 74, mem: 52, conn: 382, status: 'op' },
  { name: 'lama-03', region: 'ap-south-1', role: 'Worker', cpu: 38, mem: 40, conn: 21, status: 'op' },
  { name: 'lama-04', region: 'ap-south-1', role: 'Worker', cpu: 91, mem: 74, conn: 41, status: 'deg' },
  { name: 'lama-05', region: 'ap-south-2', role: 'API', cpu: 55, mem: 42, conn: 298, status: 'op' },
  { name: 'lama-06', region: 'ap-south-2', role: 'Stream', cpu: 28, mem: 35, conn: 118, status: 'op' },
  { name: 'lama-07', region: 'ap-south-2', role: 'Stream', cpu: 0, mem: 0, conn: 0, status: 'down' },
  { name: 'lama-08', region: 'ap-southeast-1', role: 'Edge', cpu: 42, mem: 38, conn: 84, status: 'op' },
]

const SERVER_BADGE: Record<Server['status'], [string, string]> = {
  op: ['badge-success', 'Healthy'],
  deg: ['badge-warn', 'Degraded'],
  down: ['badge-danger', 'Offline'],
}

interface Region { r: string; n: string; load: number; tp: string; p: string; err: string; s: Server['status'] }
const REGIONS: Region[] = [
  { r: 'ap-south-1 (Mumbai)', n: '4', load: 68, tp: '8.2k req/s', p: '78ms', err: '0.04%', s: 'op' },
  { r: 'ap-south-2 (Hyderabad)', n: '2', load: 42, tp: '3.1k req/s', p: '92ms', err: '0.18%', s: 'deg' },
  { r: 'ap-southeast-1 (Singapore)', n: '2', load: 38, tp: '1.8k req/s', p: '112ms', err: '0.02%', s: 'op' },
]

// uptime was Math.random in the original; fix per-server so it's stable
const uptime = (name: string) => 99 - (name.charCodeAt(name.length - 1) % 5)
</script>

<template>
  <PageHeader>
    <template #actions>
      <button class="btn"><Icon name="refresh" :size="13" /> Refresh</button>
      <button class="btn"><Icon name="book" :size="13" /> Runbooks</button>
      <button class="btn btn-accent"><Icon name="plus" :size="13" /> Add server</button>
    </template>
  </PageHeader>

  <div class="stripe" style="margin-bottom:18px">
    <div><div class="label-mono">Fleet size</div><div class="value">8 nodes <span style="font-size:11px;color:var(--muted);font-family:var(--mono);font-weight:500">3 regions</span></div></div>
    <div><div class="label-mono">Healthy</div><div class="value" style="color:var(--emerald)">6</div></div>
    <div><div class="label-mono">Degraded</div><div class="value" style="color:var(--amber)">1</div></div>
    <div><div class="label-mono">Offline</div><div class="value" style="color:var(--rose)">1</div></div>
    <div><div class="label-mono">Queue depth</div><div class="value">1,284 <span style="font-size:11px;color:var(--rose);font-family:var(--mono);font-weight:500">+18%</span></div></div>
    <div><div class="label-mono">p95 latency</div><div class="value">82ms</div></div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-bottom:18px">
    <div v-for="s in SERVERS" :key="s.name" class="server-tile">
      <div class="st-head">
        <div class="st-icon"><Icon name="server" :size="16" /></div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-family:var(--mono);font-size:13px">{{ s.name }}</div>
          <div style="font-size:11px;color:var(--muted);font-family:var(--mono)">{{ s.region }} · {{ s.role }}</div>
        </div>
        <span class="badge" :class="SERVER_BADGE[s.status][0]"><span class="badge-dot" />{{ SERVER_BADGE[s.status][1] }}</span>
      </div>
      <div class="gauge-row">
        <Gauge label="CPU" :value="s.cpu" />
        <Gauge label="MEM" :value="s.mem" />
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-family:var(--mono)">
        <span>conn {{ s.conn }}</span>
        <span>uptime 99.{{ uptime(s.name) }}%</span>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-head">
      <h3>Region overview</h3>
      <div class="card-actions">
        <span class="muted" style="font-size:12px">Auto-scaling: enabled</span>
      </div>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr><th>Region</th><th>Nodes</th><th>Load</th><th style="text-align:right">Throughput</th><th>p95</th><th>Errors</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in REGIONS" :key="i">
            <td style="font-weight:500">{{ r.r }}</td>
            <td class="num">{{ r.n }}</td>
            <td style="width:200px"><div class="bar"><span :style="{ width: r.load + '%' }" /></div></td>
            <td class="num" style="text-align:right">{{ r.tp }}</td>
            <td class="num">{{ r.p }}</td>
            <td class="num">{{ r.err }}</td>
            <td><span class="badge" :class="SERVER_BADGE[r.s][0]"><span class="badge-dot" />{{ SERVER_BADGE[r.s][1] }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CodifiFoot />
</template>
