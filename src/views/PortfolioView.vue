<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import RangeSlider from '../components/RangeSlider.vue'
import HoldingsDetailDrawer from '../components/drawers/HoldingsDetailDrawer.vue'
import UploadDataModal from '../components/drawers/UploadDataModal.vue'
import { avatarColor, initials } from '../data/avatar'
import { HOLDINGS, POSITIONS, WATCH, PRODUCT_BADGE, holdingsByClient, type Position, type ClientHolding } from '../data/portfolio'

type Tab = 'holdings' | 'positions' | 'watch'
interface Filters { symbol: string; poa: string; minCurrent: string; maxCurrent: string; minPnl: string; maxPnl: string; minStocks: string }
const EMPTY: Filters = { symbol: '', poa: 'any', minCurrent: '', maxCurrent: '', minPnl: '', maxPnl: '', minStocks: '' }

const tab = ref<Tab>('holdings')
const query = ref('')
const openHoldingId = ref<string | null>(null)
const openPosClient = ref<any | null>(null)
const uploadOpen = ref<'holdings' | 'positions' | null>(null)
const watchType = ref('dynamic')
const advOpen = ref(false)
const advFilters = ref<Filters>({ ...EMPTY })
const draftFilters = ref<Filters>({ ...EMPTY })

watch(advOpen, (v) => { if (v) draftFilters.value = { ...advFilters.value } })

const today = 'Fri, 8 May 2026 · 09:15 AM'
const HOLDINGS_BY_CLIENT = holdingsByClient()

const longPos = POSITIONS.filter((p) => p.side === 'LONG').length
const shortPos = POSITIONS.filter((p) => p.side === 'SHORT').length
const liveLists = WATCH.filter((w) => w.status === 'live').length
const totalSubs = WATCH.reduce((s, w) => s + w.clients, 0)
const totalSyms = WATCH.reduce((s, w) => s + w.symbols, 0)

const niceFloor = (n: number) => Math.floor(n / 1000) * 1000
const niceCeil = (n: number) => Math.ceil(n / 1000) * 1000
const bounds = {
  currentMin: niceFloor(Math.min(...HOLDINGS_BY_CLIENT.map((h) => h.current))),
  currentMax: niceCeil(Math.max(...HOLDINGS_BY_CLIENT.map((h) => h.current))),
  pnlMin: niceFloor(Math.min(...HOLDINGS_BY_CLIENT.map((h) => h.pnl))),
  pnlMax: niceCeil(Math.max(...HOLDINGS_BY_CLIENT.map((h) => h.pnl))),
}

const fmtCompactINR = (n: number) => {
  const a = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (a >= 1e7) return sign + '₹' + (n / 1e7).toFixed(a >= 1e8 ? 0 : 1).replace(/\.0$/, '') + 'Cr'
  if (a >= 1e5) return sign + '₹' + (n / 1e5).toFixed(a >= 1e6 ? 0 : 1).replace(/\.0$/, '') + 'L'
  if (a >= 1e3) return sign + '₹' + (n / 1e3).toFixed(a >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'K'
  return sign + '₹' + a.toLocaleString('en-IN')
}

const advActiveCount = computed(() => {
  const f = advFilters.value
  return (f.symbol ? 1 : 0) + (f.poa !== 'any' ? 1 : 0) + (f.minCurrent ? 1 : 0) + (f.maxCurrent ? 1 : 0) + (f.minPnl ? 1 : 0) + (f.maxPnl ? 1 : 0) + (f.minStocks ? 1 : 0)
})

const activeChips = computed(() => {
  const f = advFilters.value
  const chips: { key: string; label: string; value: string; reset: Partial<Filters> }[] = []
  if (f.symbol) chips.push({ key: 'symbol', label: 'Symbol', value: f.symbol.toUpperCase(), reset: { symbol: '' } })
  if (f.poa !== 'any') chips.push({ key: 'poa', label: 'POA', value: f.poa === 'yes' ? 'Yes' : 'No', reset: { poa: 'any' } })
  if (f.minStocks) chips.push({ key: 'stocks', label: 'Min stocks', value: f.minStocks, reset: { minStocks: '' } })
  if (f.minCurrent || f.maxCurrent) chips.push({ key: 'current', label: 'Current', value: fmtCompactINR(parseFloat(f.minCurrent || String(bounds.currentMin))) + ' – ' + fmtCompactINR(parseFloat(f.maxCurrent || String(bounds.currentMax))), reset: { minCurrent: '', maxCurrent: '' } })
  if (f.minPnl || f.maxPnl) chips.push({ key: 'pnl', label: 'P&L', value: fmtCompactINR(parseFloat(f.minPnl || String(bounds.pnlMin))) + ' – ' + fmtCompactINR(parseFloat(f.maxPnl || String(bounds.pnlMax))), reset: { minPnl: '', maxPnl: '' } })
  return chips
})

const fHold = computed(() =>
  HOLDINGS_BY_CLIENT.filter((h) => {
    const f = advFilters.value
    if (query.value && ![h.client, h.cid].some((s) => s.toLowerCase().includes(query.value.toLowerCase()))) return false
    if (f.symbol && !h.symbols.some((s) => s.toLowerCase().includes(f.symbol.toLowerCase()))) return false
    if (f.poa === 'yes' && !h.poa) return false
    if (f.poa === 'no' && h.poa) return false
    if (f.minCurrent && h.current < parseFloat(f.minCurrent)) return false
    if (f.maxCurrent && h.current > parseFloat(f.maxCurrent)) return false
    if (f.minPnl && h.pnl < parseFloat(f.minPnl)) return false
    if (f.maxPnl && h.pnl > parseFloat(f.maxPnl)) return false
    if (f.minStocks && h.uniqueStocks < parseInt(f.minStocks, 10)) return false
    return true
  })
)
const fPos = computed(() => POSITIONS.filter((p) => !query.value || [p.client, p.cid, p.symbol].some((s) => s.toLowerCase().includes(query.value.toLowerCase()))))
const fWat = computed(() => WATCH.filter((w) => w.type === watchType.value && (!query.value || [w.name, w.owner, ...w.top].some((s) => s.toLowerCase().includes(query.value.toLowerCase())))))

const posByClient = computed(() => {
  const byClient: Record<string, any> = {}
  fPos.value.forEach((p) => {
    if (!byClient[p.cid]) byClient[p.cid] = { cid: p.cid, name: p.client, total: 0, nseFno: 0, bseFno: 0, mcx: 0, rows: [] as Position[] }
    const b = byClient[p.cid]
    b.total += 1
    b.rows.push(p)
    if (p.exch === 'MCX') b.mcx += 1
    else if (p.exch === 'BSE') b.bseFno += 1
    else b.nseFno += 1
  })
  return Object.values(byClient)
})

const stats = computed(() => {
  if (tab.value === 'holdings')
    return [
      { label: 'AUM', value: '₹284.62 Cr', sub: 'as per BOD', tally: false, valueSuffix: '' },
      { label: 'Clients with holdings', value: '12,418', sub: '83.7% of active base', tally: false, valueSuffix: '' },
      { label: 'Unique holding count', value: '1,842', sub: 'across NSE · BSE', tally: false, valueSuffix: '' },
      { label: 'Tally', value: '9', valueSuffix: 'matched', sub: 'File · DB · Segment · Backend', tally: true },
    ]
  if (tab.value === 'positions')
    return [
      { label: 'Open Positions (all)', value: String(POSITIONS.length), sub: `${longPos} long · ${shortPos} short`, tally: false, valueSuffix: '' },
      { label: 'NSE F&O', value: String(Math.round(POSITIONS.length * 0.62)), sub: 'F&O · index + stock', tally: false, valueSuffix: '' },
      { label: 'BSE F&O', value: String(Math.round(POSITIONS.length * 0.18)), sub: 'F&O · sensex derivatives', tally: false, valueSuffix: '' },
      { label: 'MCX', value: String(Math.round(POSITIONS.length * 0.2)), sub: 'commodities · futures', tally: false, valueSuffix: '' },
    ]
  return [
    { label: 'Active watchlists', value: String(WATCH.length), sub: `${liveLists} live · ${WATCH.length - liveLists} paused`, tally: false, valueSuffix: '' },
    { label: 'Subscribed clients', value: totalSubs.toLocaleString('en-IN'), sub: 'across all lists', tally: false, valueSuffix: '' },
    { label: 'Symbols tracked', value: String(totalSyms), sub: `avg ${Math.round(totalSyms / WATCH.length)} / list`, tally: false, valueSuffix: '' },
    { label: 'Alerts triggered', value: '128', sub: 'price · last 24h', tally: false, valueSuffix: '' },
  ]
})

const placeholder = computed(() =>
  tab.value === 'holdings' ? 'Client, user ID or symbol…' : tab.value === 'positions' ? 'Client, contract or user ID…' : 'Watchlist, owner or symbol…'
)

const watchPills = [
  { id: 'dynamic', lbl: 'Broker Created' },
  { id: 'predef', lbl: 'Pre Defined' },
  { id: 'user', lbl: 'User Created' },
]
const watchCount = (id: string) => WATCH.filter((w) => w.type === id).length

const openHolding = computed(() => HOLDINGS_BY_CLIENT.find((r) => r.cid === openHoldingId.value) || null)
const rawHoldingsFor = (cid: string) => HOLDINGS.filter((h) => h.cid === cid)

const dirty = computed(() => JSON.stringify(draftFilters.value) !== JSON.stringify(advFilters.value))
const applyDraft = () => { advFilters.value = { ...draftFilters.value }; advOpen.value = false }
const resetChip = (reset: Partial<Filters>) => { advFilters.value = { ...advFilters.value, ...reset } }
</script>

<template>
  <div class="tabs" style="margin-bottom:14px">
    <button :class="tab === 'holdings' ? 'active' : ''" @click="tab = 'holdings'">Holdings</button>
    <button :class="tab === 'positions' ? 'active' : ''" @click="tab = 'positions'">Positions</button>
    <button :class="tab === 'watch' ? 'active' : ''" @click="tab = 'watch'">Market Watch</button>
  </div>

  <div class="cm-stat-card" style="margin-bottom:14px">
    <div v-for="k in stats" :key="k.label" class="cm-stat" style="padding:16px 20px">
      <div class="cm-stat-lbl" style="display:inline-flex;align-items:center;gap:6px;color:var(--muted);font-size:11.5px;font-weight:500;text-transform:none;letter-spacing:0">{{ k.label }}</div>
      <div class="cm-stat-v" style="margin-top:8px;display:block">
        <div style="font-family:var(--display);font-size:24px;font-weight:600;letter-spacing:-0.02em;color:var(--ink);line-height:1.1;display:flex;align-items:baseline;gap:8px">
          <span>{{ k.value }}</span>
          <span v-if="k.valueSuffix" style="font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:0;color:var(--emerald)">({{ k.valueSuffix }})</span>
        </div>
        <div v-if="k.tally" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
          <span v-for="t in ['File', 'DB', 'Segment', 'Backend']" :key="t" style="display:inline-flex;align-items:center;gap:5px;font-size:10.5px;color:var(--muted);font-weight:500">
            <span style="width:5px;height:5px;border-radius:50%;background:var(--emerald)" />{{ t }}
          </span>
        </div>
        <div v-else style="font-size:11.5px;color:var(--muted-2);font-weight:400;margin-top:4px">{{ k.sub }}</div>
      </div>
    </div>
  </div>

  <div class="cm-filter-row" style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;margin-bottom:14px">
    <div style="font-size:12px;color:var(--muted)">
      <template v-if="tab !== 'watch'">Last updated on : <span style="color:var(--ink);font-weight:500">{{ today }}</span></template>
      <div v-else style="display:flex;gap:6px;flex-wrap:wrap">
        <button v-for="p in watchPills" :key="p.id" type="button" class="cm-pill" :class="{ active: watchType === p.id }" @click="watchType = p.id">
          {{ p.lbl }}<span class="cm-pill-count">{{ watchCount(p.id) }}</span>
        </button>
      </div>
    </div>
    <div style="display:flex;gap:8px;align-items:center;position:relative;justify-self:center">
      <div class="filter-input" :style="{ width: tab === 'watch' ? '260px' : '420px', paddingRight: '4px' }">
        <Icon name="search" :size="13" />
        <input v-model="query" :placeholder="placeholder" style="flex:1;width:auto" />
        <button
          v-if="tab === 'holdings'"
          @click="advOpen = !advOpen"
          title="Advanced search"
          :style="{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '24px', padding: '0 8px', background: advOpen || advActiveCount ? 'var(--ink)' : 'transparent', color: advOpen || advActiveCount ? '#fff' : 'var(--muted)', border: '1px solid ' + (advOpen || advActiveCount ? 'var(--ink)' : 'var(--border)'), borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 500 }"
        >
          <Icon name="filter" :size="11" />
          <span v-if="advActiveCount > 0">{{ advActiveCount }}</span>
        </button>
      </div>

      <Teleport to="body">
        <template v-if="tab === 'holdings' && advOpen">
          <div @click="advOpen = false" style="position:fixed;inset:0;background:rgba(15,23,42,0.32);z-index:95;backdrop-filter:blur(2px)" />
          <div style="position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:96;width:min(520px, calc(100vw - 32px));max-height:calc(100vh - 32px);background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 20px 60px rgba(15,20,40,0.24), 0 4px 12px rgba(15,20,40,0.10);overflow:hidden;display:flex;flex-direction:column">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--line-2);background:var(--bg)">
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--ink);letter-spacing:-0.005em">Advanced filters</div>
                <div style="font-size:11px;color:var(--muted);margin-top:2px">Refine clients by holdings, value or status</div>
              </div>
              <button @click="advOpen = false" style="background:var(--surface);border:1px solid var(--border);cursor:pointer;color:var(--muted);padding:0;width:26px;height:26px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center">
                <Icon name="close" :size="13" />
              </button>
            </div>
            <div style="padding:18px;display:flex;flex-direction:column;gap:16px;overflow-y:auto;flex:1 1 auto;min-height:0">
              <div>
                <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2);margin-bottom:8px">Holdings</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  <label style="display:block">
                    <div style="font-size:11.5px;color:var(--ink);font-weight:500;margin-bottom:5px">Holds symbol</div>
                    <input class="adv-input" placeholder="e.g. RELIANCE" v-model="draftFilters.symbol" />
                  </label>
                  <label style="display:block">
                    <div style="font-size:11.5px;color:var(--ink);font-weight:500;margin-bottom:5px">Min quantity</div>
                    <input class="adv-input" type="number" placeholder="0" v-model="draftFilters.minStocks" />
                  </label>
                </div>
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2);margin-bottom:8px">POA status</div>
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px">
                  <button
                    v-for="([v, l]) in [['any','Any'],['yes','Yes'],['no','No']]"
                    :key="v"
                    @click="draftFilters.poa = v"
                    :style="{ height: '34px', fontSize: '12.5px', fontWeight: 600, border: '1px solid ' + (draftFilters.poa === v ? 'var(--ink)' : 'var(--line)'), background: draftFilters.poa === v ? 'var(--ink)' : 'var(--surface)', color: draftFilters.poa === v ? 'var(--surface)' : 'var(--ink)', borderRadius: '7px', cursor: 'pointer' }"
                  >{{ l }}</button>
                </div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
                  <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2)">Current value (BOD)</div>
                  <div style="font-family:var(--mono);font-size:11.5px;color:var(--ink);font-weight:600">
                    {{ fmtCompactINR(parseFloat(draftFilters.minCurrent || String(bounds.currentMin))) }}<span style="color:var(--muted-2);font-weight:500"> – </span>{{ fmtCompactINR(parseFloat(draftFilters.maxCurrent || String(bounds.currentMax))) }}
                  </div>
                </div>
                <RangeSlider
                  :min="bounds.currentMin" :max="bounds.currentMax" :step="1000"
                  :value-min="parseFloat(draftFilters.minCurrent || String(bounds.currentMin))"
                  :value-max="parseFloat(draftFilters.maxCurrent || String(bounds.currentMax))"
                  :fmt="fmtCompactINR"
                  @change="(lo, hi) => { draftFilters.minCurrent = lo === bounds.currentMin ? '' : String(lo); draftFilters.maxCurrent = hi === bounds.currentMax ? '' : String(hi) }"
                />
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
                  <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2)">P&amp;L</div>
                  <div style="font-family:var(--mono);font-size:11.5px;color:var(--ink);font-weight:600">
                    {{ fmtCompactINR(parseFloat(draftFilters.minPnl || String(bounds.pnlMin))) }}<span style="color:var(--muted-2);font-weight:500"> – </span>{{ fmtCompactINR(parseFloat(draftFilters.maxPnl || String(bounds.pnlMax))) }}
                  </div>
                </div>
                <RangeSlider
                  :min="bounds.pnlMin" :max="bounds.pnlMax" :step="1000"
                  :value-min="parseFloat(draftFilters.minPnl || String(bounds.pnlMin))"
                  :value-max="parseFloat(draftFilters.maxPnl || String(bounds.pnlMax))"
                  :fmt="fmtCompactINR"
                  @change="(lo, hi) => { draftFilters.minPnl = lo === bounds.pnlMin ? '' : String(lo); draftFilters.maxPnl = hi === bounds.pnlMax ? '' : String(hi) }"
                />
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-top:1px solid var(--line-2);background:var(--bg)">
              <div style="font-size:11.5px;color:var(--muted)">
                {{ dirty ? 'Unsaved changes' : advActiveCount > 0 ? advActiveCount + ' filter' + (advActiveCount > 1 ? 's' : '') + ' active' : 'No filters applied' }}
              </div>
              <div style="display:flex;gap:8px">
                <button @click="draftFilters = { ...{ symbol: '', poa: 'any', minCurrent: '', maxCurrent: '', minPnl: '', maxPnl: '', minStocks: '' } }" style="background:var(--surface);border:1px solid var(--line);color:var(--ink);cursor:pointer;font-size:12px;font-weight:500;height:30px;padding:0 14px;border-radius:7px">Reset</button>
                <button @click="applyDraft" style="background:var(--ink);color:#fff;border:none;height:30px;padding:0 16px;border-radius:7px;cursor:pointer;font-size:12px;font-weight:500">Apply</button>
              </div>
            </div>
          </div>
        </template>
      </Teleport>
    </div>
    <div style="justify-self:end">
      <button v-if="tab === 'watch'" class="btn btn-accent"><Icon name="plus" :size="13" /> New watchlist</button>
      <button v-else-if="tab === 'holdings'" class="btn" @click="uploadOpen = 'holdings'"><Icon name="upload" :size="13" /> Upload holdings</button>
      <button v-else class="btn" @click="uploadOpen = 'positions'"><Icon name="upload" :size="13" /> Upload positions</button>
    </div>
  </div>

  <div v-if="tab === 'holdings' && activeChips.length > 0" class="fc-strip">
    <span class="fc-strip-label">Filters</span>
    <span v-for="c in activeChips" :key="c.key" class="fc-chip">
      <span class="fc-key">{{ c.label }}:</span>
      <b>{{ c.value }}</b>
      <button type="button" class="fc-chip-x" @click="resetChip(c.reset)"><Icon name="close" :size="11" /></button>
    </span>
    <button type="button" class="fc-clear" @click="advFilters = { symbol: '', poa: 'any', minCurrent: '', maxCurrent: '', minPnl: '', maxPnl: '', minStocks: '' }">Clear all</button>
  </div>

  <!-- Holdings -->
  <div v-if="tab === 'holdings'" class="card" style="margin-bottom:18px">
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr>
            <th style="width:36px"><input type="checkbox" class="cm-check" /></th>
            <th>UCC</th><th>Name</th>
            <th class="num" style="text-align:right">Unique stocks</th>
            <th class="num" style="text-align:right">Total stocks</th>
            <th class="num" style="text-align:right">Invested</th>
            <th class="num" style="text-align:right">Current (BOD)</th>
            <th class="num" style="text-align:right">P&amp;L</th>
            <th class="num" style="text-align:right">%</th>
            <th style="text-align:center">POA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(h, i) in fHold" :key="i" @click="openHoldingId = openHoldingId === h.cid ? null : h.cid" :style="{ cursor: 'pointer', background: openHoldingId === h.cid ? 'var(--primary-50)' : undefined }">
            <td @click.stop><input type="checkbox" class="cm-check" /></td>
            <td class="col-id">{{ h.cid }}</td>
            <td>
              <div class="user-cell">
                <div class="av" :style="{ background: avatarColor(h.client), width: '24px', height: '24px', fontSize: '10px' }">{{ initials(h.client) }}</div>
                <div class="uc-name" style="font-size:12.5px">{{ h.client }}</div>
              </div>
            </td>
            <td class="num" style="text-align:right">{{ h.uniqueStocks }}</td>
            <td class="num" style="text-align:right">{{ h.totalQty.toLocaleString('en-IN') }}</td>
            <td class="num" style="text-align:right;color:var(--muted)">₹{{ h.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</td>
            <td class="num" style="text-align:right;font-weight:500">₹{{ h.current.toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}</td>
            <td class="num" :style="{ textAlign: 'right', fontWeight: 600, color: h.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)' }">
              {{ h.pnl >= 0 ? '+' : '−' }}₹{{ Math.abs(h.pnl).toLocaleString('en-IN') }}
            </td>
            <td class="num" :style="{ textAlign: 'right', fontWeight: 500, color: (h.invested ? (h.pnl / h.invested) * 100 : 0) >= 0 ? 'var(--emerald)' : 'var(--rose)' }">
              {{ (h.invested ? (h.pnl / h.invested) * 100 : 0) >= 0 ? '+' : '' }}{{ (h.invested ? (h.pnl / h.invested) * 100 : 0).toFixed(2) }}%
            </td>
            <td style="text-align:center">
              <span class="badge" :class="h.poa ? 'badge-success' : 'badge-danger'" style="min-width:36px;justify-content:center">{{ h.poa ? 'Yes' : 'No' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Showing 1–{{ fHold.length }} of 12,418 clients</span>
      <div class="pages"><button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>›</button></div>
    </div>
  </div>

  <HoldingsDetailDrawer v-if="tab === 'holdings' && openHolding" :row="openHolding" :raw-holdings="rawHoldingsFor(openHolding.cid)" @close="openHoldingId = null" />

  <!-- Positions -->
  <div v-if="tab === 'positions'" class="card" style="margin-bottom:18px">
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr>
            <th style="width:36px"><span class="cbx" /></th>
            <th>User ID</th><th>Name</th>
            <th class="num" style="text-align:right">Open Position</th>
            <th class="num" style="text-align:right">NSE F&amp;O</th>
            <th class="num" style="text-align:right">BSE F&amp;O</th>
            <th class="num" style="text-align:right">MCX</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in posByClient" :key="i" @click="openPosClient = r" style="cursor:pointer">
            <td @click.stop><span class="cbx" /></td>
            <td class="col-id">{{ r.cid }}</td>
            <td>
              <div class="user-cell">
                <div class="av" :style="{ background: avatarColor(r.name), width: '24px', height: '24px', fontSize: '10px' }">{{ initials(r.name) }}</div>
                <div class="uc-name" style="font-size:12.5px">{{ r.name }}</div>
              </div>
            </td>
            <td class="num" style="text-align:right;font-weight:600">{{ r.total }}</td>
            <td class="num" :style="{ textAlign: 'right', color: r.nseFno ? 'var(--ink)' : 'var(--muted-2)' }">{{ r.nseFno || '—' }}</td>
            <td class="num" :style="{ textAlign: 'right', color: r.bseFno ? 'var(--ink)' : 'var(--muted-2)' }">{{ r.bseFno || '—' }}</td>
            <td class="num" :style="{ textAlign: 'right', color: r.mcx ? 'var(--ink)' : 'var(--muted-2)' }">{{ r.mcx || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Showing 1–{{ posByClient.length }} of 384 clients</span>
      <div class="pages"><button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>›</button></div>
    </div>
  </div>

  <!-- Positions drawer -->
  <Teleport to="body">
    <div v-if="openPosClient" class="cm-drawer-overlay" @click="openPosClient = null">
      <div class="card cm-drawer" @click.stop style="width:min(960px, 96vw)">
        <div class="cm-detail-head">
          <div class="user-cell" style="flex:1">
            <div class="av" :style="{ background: avatarColor(openPosClient.name), width: '42px', height: '42px', fontSize: '14px' }">{{ initials(openPosClient.name) }}</div>
            <div>
              <h3 style="margin:0;font-family:var(--display);font-size:16px;font-weight:600;color:var(--ink)">{{ openPosClient.name }}</h3>
              <div style="font-size:12px;color:var(--muted);margin-top:2px">
                <span class="col-id">{{ openPosClient.cid }}</span>
                <span style="margin:0 6px;color:var(--muted-2)">·</span>Open positions as per BOD
              </div>
            </div>
          </div>
          <div style="display:inline-flex;gap:6px">
            <span class="badge badge-tall"><span class="badge-dot" />Total {{ openPosClient.total }}</span>
            <span v-if="openPosClient.nseFno > 0" class="badge badge-tall badge-info"><span class="badge-dot" />NSE F&amp;O · {{ openPosClient.nseFno }}</span>
            <span v-if="openPosClient.bseFno > 0" class="badge badge-tall"><span class="badge-dot" />BSE F&amp;O · {{ openPosClient.bseFno }}</span>
            <span v-if="openPosClient.mcx > 0" class="badge badge-tall"><span class="badge-dot" />MCX · {{ openPosClient.mcx }}</span>
          </div>
        </div>
        <div class="cm-drawer-body" style="padding:18px">
          <table class="data cm-sessions" style="table-layout:auto">
            <thead>
              <tr>
                <th>Contract</th><th style="width:56px">Exch</th><th style="width:64px">Product</th><th style="width:44px">Side</th>
                <th class="num" style="text-align:right">Qty</th>
                <th class="num" style="text-align:right">Avg</th>
                <th class="num" style="text-align:right">MTM</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in openPosClient.rows" :key="i">
                <td style="font-weight:500;font-size:12px;white-space:nowrap">{{ p.symbol }}</td>
                <td><span class="pill" style="font-size:10.5px">{{ p.exch }}</span></td>
                <td><span class="badge" :class="(PRODUCT_BADGE[p.product] || ['', p.product])[0]">{{ (PRODUCT_BADGE[p.product] || ['', p.product])[1] }}</span></td>
                <td><span :style="{ fontSize: '11.5px', fontWeight: 600, color: p.side === 'LONG' ? 'var(--emerald)' : 'var(--rose)' }">{{ p.side === 'LONG' ? 'Buy' : 'Sell' }}</span></td>
                <td class="num" style="text-align:right">{{ p.qty }}</td>
                <td class="num" style="text-align:right;color:var(--muted)">₹{{ p.avg }}</td>
                <td class="num" :style="{ textAlign: 'right', fontWeight: 600, color: p.mtm >= 0 ? 'var(--emerald)' : 'var(--rose)' }">{{ p.mtm >= 0 ? '+' : '−' }}₹{{ Math.abs(p.mtm).toLocaleString('en-IN') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button @click="openPosClient = null" aria-label="Close" style="position:fixed;right:24px;bottom:24px;z-index:110;height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fff;border:none;font-size:13px;font-weight:500;font-family:inherit;display:inline-flex;align-items:center;gap:8px;cursor:pointer;box-shadow:0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)">
        <Icon name="close" :size="14" /> Close
      </button>
    </div>
  </Teleport>

  <!-- Watch -->
  <div v-if="tab === 'watch'" class="card" style="margin-bottom:18px">
    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr><th>Watchlist</th><th>Owner</th><th class="num" style="text-align:right">Symbols</th><th class="num" style="text-align:right">Subscribers</th><th>Top symbols</th><th>Status</th><th>Updated</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in fWat" :key="i">
            <td style="font-weight:500">{{ w.name }}</td>
            <td>
              <div class="user-cell">
                <div class="av" :style="{ background: avatarColor(w.owner), width: '24px', height: '24px', fontSize: '10px' }">{{ initials(w.owner) }}</div>
                <div class="uc-name" style="font-size:12.5px">{{ w.owner }}</div>
              </div>
            </td>
            <td class="num" style="text-align:right">{{ w.symbols }}</td>
            <td class="num" style="text-align:right;font-weight:500">{{ w.clients.toLocaleString('en-IN') }}</td>
            <td>
              <span style="display:inline-flex;flex-wrap:wrap;gap:4px">
                <span v-for="s in w.top.slice(0, 4)" :key="s" class="pill">{{ s }}</span>
              </span>
            </td>
            <td><span class="badge" :class="w.status === 'live' ? 'badge-success' : 'badge-warn'"><span class="badge-dot" />{{ w.status === 'live' ? 'Live' : 'Paused' }}</span></td>
            <td class="num" style="color:var(--muted)">{{ w.updated }}</td>
            <td><button class="icon-btn" style="width:28px;height:28px"><Icon name="more" :size="13" /></button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>Showing 1–{{ fWat.length }} of {{ WATCH.length }} watchlists</span>
      <div class="pages"><button>‹</button><button class="active">1</button><button>›</button></div>
    </div>
  </div>

  <UploadDataModal v-if="uploadOpen" :kind="uploadOpen" @close="uploadOpen = null" />
  <CodifiFoot />
</template>
