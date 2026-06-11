export type SvcStatus = 'op' | 'deg' | 'down'
export type TileState = 'ok' | 'warn' | 'err'

export interface Service {
  key: string; name: string; status: SvcStatus; glyph: string
  latency: { val: number | string; unit: string; delta: string }
  lastRun: string
  failRate: { val: string; unit: string; delta: string }
  uptime: string; throughput: string; errorBudget: string; region: string
  deps: [string, SvcStatus][]
  incidents: { t: string; m: string; sev: 'warn' | 'err' | 'info' }[]
  runbook: string
  tiles: TileState[]
}

// Non-deterministic in the original (Math.random); generated once at module load.
function genTiles(status: SvcStatus, n = 60): TileState[] {
  const out: TileState[] = []
  const failRate = status === 'op' ? 0.02 : status === 'deg' ? 0.18 : 0.55
  const warnRate = status === 'op' ? 0.06 : status === 'deg' ? 0.3 : 0.2
  for (let i = 0; i < n; i++) {
    const r = Math.random()
    const recent = i > n - 10 && status !== 'op'
    if (recent && r < failRate * 1.4) out.push('err')
    else if (r < failRate) out.push('err')
    else if (r < failRate + warnRate) out.push('warn')
    else out.push('ok')
  }
  return out
}

const base: Omit<Service, 'tiles'>[] = [
  { key: 'trade', name: 'Trading Engine', status: 'op', glyph: '⤴', latency: { val: 38, unit: 'ms', delta: '−4ms' }, lastRun: '00:08 sec ago', failRate: { val: '0.00', unit: '%', delta: '−0.01pp' }, uptime: '99.99%', throughput: '4,128 req/min', errorBudget: '98% remaining', region: 'BLR · 3 AZs', deps: [['NSE', 'op'], ['BSE', 'op'], ['Risk Engine', 'op']], incidents: [], runbook: 'rb/trading-engine' },
  { key: 'kyc', name: 'KYC Pipeline', status: 'op', glyph: '✓', latency: { val: 142, unit: 'ms', delta: '+12ms' }, lastRun: '00:14 sec ago', failRate: { val: '0.18', unit: '%', delta: '−0.04pp' }, uptime: '99.96%', throughput: '218 req/min', errorBudget: '92% remaining', region: 'BLR · 2 AZs', deps: [['CVL', 'op'], ['Aadhaar OKYC', 'op'], ['DigiLocker', 'op']], incidents: [{ t: '2d ago', m: 'CVL slowness · auto-resolved in 4m', sev: 'warn' }], runbook: 'rb/kyc-pipeline' },
  { key: 'pay', name: 'Payments · ICICI', status: 'deg', glyph: '₹', latency: { val: 480, unit: 'ms', delta: '+312ms' }, lastRun: '00:21 sec ago', failRate: { val: '2.41', unit: '%', delta: '+1.8pp' }, uptime: '99.42%', throughput: '92 req/min', errorBudget: '38% remaining', region: 'MUM · 2 AZs', deps: [['ICICI VPN', 'deg'], ['HDFC fallback', 'op'], ['Razorpay', 'op']], incidents: [{ t: '08 min ago', m: 'p95 above 400ms threshold (ICICI primary)', sev: 'warn' }, { t: '22 min ago', m: '7× upstream timeouts in 60s window', sev: 'err' }], runbook: 'rb/payments-icici' },
  { key: 'nse', name: 'NSE Feed', status: 'op', glyph: '◆', latency: { val: 18, unit: 'ms', delta: '+1ms' }, lastRun: '00:02 sec ago', failRate: { val: '0.00', unit: '%', delta: '0' }, uptime: '99.99%', throughput: '12,840 ticks/sec', errorBudget: '99% remaining', region: 'BOM colo', deps: [['NSE multicast A', 'op'], ['NSE multicast B', 'op']], incidents: [], runbook: 'rb/nse-feed' },
  { key: 'bse', name: 'BSE Feed', status: 'op', glyph: '◆', latency: { val: 22, unit: 'ms', delta: '−2ms' }, lastRun: '00:02 sec ago', failRate: { val: '0.00', unit: '%', delta: '0' }, uptime: '99.99%', throughput: '4,210 ticks/sec', errorBudget: '99% remaining', region: 'BOM colo', deps: [['BSE multicast', 'op']], incidents: [], runbook: 'rb/bse-feed' },
  { key: 'notif', name: 'Notifications', status: 'op', glyph: '✉', latency: { val: 210, unit: 'ms', delta: '+8ms' }, lastRun: '00:31 sec ago', failRate: { val: '0.42', unit: '%', delta: '+0.1pp' }, uptime: '99.91%', throughput: '14,212 sent/min', errorBudget: '82% remaining', region: 'Multi-region', deps: [['Twilio', 'op'], ['SES', 'op'], ['FCM', 'op'], ['MSG91', 'deg']], incidents: [{ t: '14m ago', m: 'MSG91 SMS retry rate elevated', sev: 'warn' }], runbook: 'rb/notifications' },
  { key: 'sip', name: 'SIP Scheduler', status: 'down', glyph: '⧖', latency: { val: '—', unit: '', delta: '' }, lastRun: '04:12 min ago', failRate: { val: '100', unit: '%', delta: '+99.8pp' }, uptime: '—', throughput: '0 jobs/min', errorBudget: '0% remaining', region: 'BLR · 2 AZs', deps: [['Mandate API', 'op'], ['Worker pool', 'down']], incidents: [{ t: '04 min ago', m: 'Worker pool unresponsive · pager fired', sev: 'err' }, { t: '08 min ago', m: 'Heartbeat missed (3 consecutive)', sev: 'err' }], runbook: 'rb/sip-scheduler' },
]

export const SERVICES: Service[] = base.map((s) => ({ ...s, tiles: genTiles(s.status, 60) }))

export const tone: Record<SvcStatus, string> = { op: 'var(--emerald)', deg: 'var(--amber)', down: 'var(--rose)' }
export const tileColor: Record<TileState, string> = { ok: 'var(--emerald)', warn: 'var(--amber)', err: 'var(--rose)' }
export const sevDot: Record<string, string> = { warn: 'var(--amber)', err: 'var(--rose)', info: 'var(--primary)' }
export const statusPill: Record<SvcStatus, [string, string]> = { op: ['Healthy', 'badge-success'], deg: ['Degraded', 'badge-warn'], down: ['Critical', 'badge-danger'] }
