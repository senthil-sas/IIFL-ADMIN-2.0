<script setup lang="ts">
const contracts = [
  { sym: 'NIFTY 22500 CE', type: 'CE', expiry: '08 May', volume: 12480000, oi: 18.2, price: 142.85 },
  { sym: 'BANKNIFTY 48000 PE', type: 'PE', expiry: '08 May', volume: 9824000, oi: 12.4, price: 218.40 },
  { sym: 'NIFTY 22400 PE', type: 'PE', expiry: '08 May', volume: 8612000, oi: -4.8, price: 84.20 },
  { sym: 'RELIANCE 2900 CE', type: 'CE', expiry: '29 May', volume: 4204000, oi: 24.6, price: 62.10 },
  { sym: 'BANKNIFTY 48500 CE', type: 'CE', expiry: '08 May', volume: 3982000, oi: 8.9, price: 184.65 },
  { sym: 'HDFCBANK 1500 CE', type: 'CE', expiry: '29 May', volume: 3428000, oi: 14.2, price: 18.40 },
  { sym: 'NIFTY 22600 CE', type: 'CE', expiry: '08 May', volume: 3104000, oi: -2.1, price: 72.35 },
  { sym: 'TCS 3800 PE', type: 'PE', expiry: '29 May', volume: 2864000, oi: 32.4, price: 46.80 },
  { sym: 'INFY 1450 CE', type: 'CE', expiry: '29 May', volume: 2412000, oi: 6.8, price: 24.60 },
  { sym: 'NIFTY 22300 PE', type: 'PE', expiry: '08 May', volume: 2208000, oi: -10.4, price: 42.10 },
]
const fmtPrice = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">F&amp;O leaderboard</div>
        <div class="lid-block-title">Top 10 contracts by volume</div>
      </div>
      <div class="lid-block-meta">NSE F&amp;O · today</div>
    </div>
    <div style="overflow:hidden;border:1px solid var(--line);border-radius:8px">
      <table class="data" style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="width:44px">#</th>
            <th>Contract</th>
            <th>Type</th>
            <th>Expiry</th>
            <th class="num" style="text-align:right">Volume</th>
            <th class="num" style="text-align:right">OI Δ</th>
            <th class="num" style="text-align:right">Avg price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, i) in contracts" :key="c.sym">
            <td>
              <span :style="{ display: 'inline-grid', placeItems: 'center', width: '22px', height: '22px', borderRadius: '6px', background: i < 3 ? 'var(--primary-50)' : 'var(--canvas)', color: i < 3 ? 'var(--primary)' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '10.5px', fontWeight: 600 }">{{ i + 1 }}</span>
            </td>
            <td style="font-weight:500;color:var(--ink)">{{ c.sym }}</td>
            <td>
              <span class="badge" :class="c.type === 'CE' ? 'badge-success' : 'badge-danger'"><span class="badge-dot"></span>{{ c.type }}</span>
            </td>
            <td style="color:var(--muted);font-family:var(--mono);font-size:11.5px">{{ c.expiry }}</td>
            <td class="num" style="text-align:right">{{ c.volume.toLocaleString() }}</td>
            <td class="num" :style="{ textAlign: 'right', color: c.oi >= 0 ? 'var(--emerald)' : 'var(--rose)' }">
              {{ c.oi >= 0 ? '+' : '' }}{{ c.oi.toFixed(1) }}%
            </td>
            <td class="num" style="text-align:right">₹{{ fmtPrice(c.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
