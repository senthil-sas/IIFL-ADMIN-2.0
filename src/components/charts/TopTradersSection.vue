<script setup lang="ts">
const traders = [
  { id: 'CDF000142', name: 'Aarav Mehta', trades: 184, turnover: 12480000, segs: ['NSE-EQ', 'NSE-FO'], pnl: 248400 },
  { id: 'CDF000287', name: 'Saanvi Iyer', trades: 162, turnover: 9842000, segs: ['NSE-FO', 'MCX'], pnl: 184200 },
  { id: 'CDF001054', name: 'Vihaan Banerjee', trades: 148, turnover: 8960000, segs: ['NSE-EQ', 'BSE-EQ'], pnl: 92840 },
  { id: 'CDF000981', name: 'Ananya Kapoor', trades: 132, turnover: 7240000, segs: ['NSE-FO'], pnl: -148200 },
  { id: 'CDF000642', name: 'Reyansh Subramanian', trades: 121, turnover: 6580000, segs: ['NSE-EQ', 'NSE-FO', 'MCX'], pnl: 62400 },
  { id: 'CDF000418', name: 'Diya Chowdhury', trades: 118, turnover: 5910000, segs: ['NSE-EQ'], pnl: 42180 },
  { id: 'CDF002134', name: 'Aditya Pillai', trades: 109, turnover: 5240000, segs: ['NSE-FO', 'CDS'], pnl: -28400 },
  { id: 'CDF000573', name: 'Ishaan Reddy', trades: 102, turnover: 4860000, segs: ['NSE-EQ', 'BSE-EQ'], pnl: 18420 },
  { id: 'CDF001872', name: 'Kavya Nair', trades: 96, turnover: 4280000, segs: ['NSE-FO'], pnl: 34980 },
  { id: 'CDF000199', name: 'Arjun Deshmukh', trades: 91, turnover: 3920000, segs: ['MCX'], pnl: -12480 },
]
const fmtINR = (n: number) => '₹' + Math.abs(n).toLocaleString('en-IN')
</script>

<template>
  <div class="lid-block">
    <div class="lid-block-h">
      <div>
        <div class="lid-block-eyebrow">Leaderboard</div>
        <div class="lid-block-title">Top 10 traders today</div>
      </div>
      <div class="lid-block-meta">By trade count · session 09:15–15:30</div>
    </div>
    <div style="overflow:hidden;border:1px solid var(--line);border-radius:8px">
      <table class="data" style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="width:44px">#</th>
            <th>Client</th>
            <th class="num" style="text-align:right">Trades</th>
            <th class="num" style="text-align:right">Turnover</th>
            <th>Segments</th>
            <th class="num" style="text-align:right">P&amp;L</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in traders" :key="t.id">
            <td>
              <span :style="{ display: 'inline-grid', placeItems: 'center', width: '22px', height: '22px', borderRadius: '6px', background: i < 3 ? 'var(--primary-50)' : 'var(--canvas)', color: i < 3 ? 'var(--primary)' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '10.5px', fontWeight: 600 }">{{ i + 1 }}</span>
            </td>
            <td>
              <div style="font-weight:500;color:var(--ink)">{{ t.name }}</div>
              <div class="col-id" style="font-size:11px;margin-top:1px">{{ t.id }}</div>
            </td>
            <td class="num" style="text-align:right">{{ t.trades.toLocaleString() }}</td>
            <td class="num" style="text-align:right">{{ fmtINR(t.turnover) }}</td>
            <td>
              <span style="display:inline-flex;flex-wrap:wrap;gap:4px">
                <span v-for="s in t.segs" :key="s" class="badge" style="font-size:10px">{{ s }}</span>
              </span>
            </td>
            <td class="num" :style="{ textAlign: 'right', color: t.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)', fontWeight: 500 }">
              {{ t.pnl >= 0 ? '+' : '−' }}{{ fmtINR(t.pnl) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
