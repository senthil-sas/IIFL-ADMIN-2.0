import type { Client } from './clients'

// Deterministic per-client pseudo-random (matches the original prototype's seeded RNG).
function seedOf(c: Client): number {
  return (c.id.charCodeAt(c.id.length - 1) || 7) >>> 0
}
function makeRng(seed: number, offset: number, mult: number) {
  return (i: number) => {
    const x = Math.sin((seed + offset) * (i + mult) * 1) * 10000
    return x - Math.floor(x)
  }
}

export interface PayInRow { date: string; acct: string; bank: string; mode: string; amount: number; status: string }
export function payInRows(c: Client): PayInRow[] {
  const seed = seedOf(c)
  const rng = (i: number) => { const x = Math.sin((seed + 1) * (i + 11) * 9.731) * 10000; return x - Math.floor(x) }
  const modes = ['UPI', 'Net Banking', 'UPI', 'IMPS', 'Net Banking']
  const statuses = ['Success', 'Success', 'Success', 'Pending', 'Failed', 'Success']
  const dates = ['07 May 2026, 10:14', '06 May 2026, 14:32', '05 May 2026, 09:08', '03 May 2026, 18:45', '02 May 2026, 11:21', '28 Apr 2026, 16:02']
  const banks = c.banks.length ? c.banks : [{ name: 'Bank account', acct: '••••••••0000' }]
  const count = Math.max(3, c.banks.length + 3)
  return Array.from({ length: count }, (_, i) => {
    const bank = banks[i % banks.length]
    const amt = Math.round((rng(i) * 95000 + 5000) / 100) * 100
    return { date: dates[i % dates.length], acct: bank.acct, bank: bank.name, mode: modes[Math.floor(rng(i + 3) * modes.length)], amount: amt, status: statuses[Math.floor(rng(i + 7) * statuses.length)] }
  })
}

export interface PayOutRow { date: string; bank: string; acct: string; amount: number; status: string }
export function payOutRows(c: Client): PayOutRow[] {
  const seed = seedOf(c)
  const rng = (i: number) => { const x = Math.sin((seed + 2) * (i + 13) * 7.317) * 10000; return x - Math.floor(x) }
  const dates = ['07 May 2026, 12:08', '05 May 2026, 16:42', '02 May 2026, 10:11', '29 Apr 2026, 14:05', '24 Apr 2026, 11:38']
  const statuses = ['Success', 'Success', 'In-process', 'Success', 'Rejected']
  const banks = c.banks.length ? c.banks : [{ name: 'Bank account', acct: '••••••••0000' }]
  const count = Math.max(3, c.banks.length + 2)
  return Array.from({ length: count }, (_, i) => {
    const bank = banks[i % banks.length]
    const amt = Math.round((rng(i) * 75000 + 5000) / 100) * 100
    return { date: dates[i % dates.length], bank: bank.name, acct: bank.acct, amount: amt, status: statuses[Math.floor(rng(i + 5) * statuses.length)] }
  })
}

export interface FeedbackRow { date: string; title: string; desc: string; product: string; stars: number; version: string }
export function feedbackRows(c: Client): FeedbackRow[] {
  const seed = seedOf(c)
  const products = ['Web', 'iOS', 'Android', 'Desktop', 'API']
  const versions = ['v4.12.1', 'v4.11.0', 'v4.10.3', 'v4.9.5']
  const titles = ['Order placement felt slow', 'Charts loaded smoothly', 'OTP delay during login', 'Watchlist sync worked great', 'Pay-out reflected on time', 'Confusing margin breakdown']
  const descs = ['Took longer than usual during the opening bell, especially on options.', 'TradingView integration was responsive across timeframes.', 'OTP arrived after ~40 seconds, login attempt timed out twice.', 'Symbols added on web showed up on mobile within seconds.', 'Funds reflected in bank within 30 minutes of request.', 'Difficult to figure out span vs exposure margin in the UI.']
  return Array.from({ length: 4 }, (_, i) => {
    const s = (seed + i * 31) >>> 0
    const d = new Date(Date.now() - ((s % 28) + i) * 86400000)
    return {
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: titles[s % titles.length],
      desc: descs[(s + 2) % descs.length],
      product: products[s % products.length],
      stars: ((s >> 3) % 5) + 1,
      version: versions[s % versions.length],
    }
  })
}

export interface MtfRow { date: string; symbol: string; qty: number; amount: number; status: string }
export function mtfRows(c: Client): MtfRow[] {
  const seed = seedOf(c)
  const rng = (i: number) => { const x = Math.sin((seed + 4) * (i + 17) * 5.421) * 10000; return x - Math.floor(x) }
  const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'ICICIBANK', 'INFY', 'AXISBANK', 'KOTAKBANK', 'SBIN']
  const dates = ['07 May 2026, 11:24', '06 May 2026, 09:48', '04 May 2026, 15:11', '02 May 2026, 13:30', '30 Apr 2026, 10:08']
  const statuses = ['Released', 'Released', 'Pending', 'Released', 'Rejected']
  return Array.from({ length: 5 }, (_, i) => {
    const sym = symbols[Math.floor(rng(i) * symbols.length)]
    const qty = Math.floor(rng(i + 2) * 200) + 10
    const amt = Math.round((rng(i + 4) * 80000 + 5000) / 100) * 100
    return { date: dates[i % dates.length], symbol: sym, qty, amount: amt, status: statuses[Math.floor(rng(i + 6) * statuses.length)] }
  })
}

void makeRng // reserved helper
