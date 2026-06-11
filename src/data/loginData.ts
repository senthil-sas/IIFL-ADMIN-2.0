// Deterministic per-minute login/trade series shared by the Login Analysis
// chart and the Login Insights view. Mirrors the original prototype exactly.

export const SESSION = 1440 // minutes in a full day
export const NOW = 745 // ~12:25 PM

const seed = (n: number): number => {
  const x = Math.sin(n * 12.9898 + 7.13) * 43758.5453
  return x - Math.floor(x)
}

export interface LoginSeries {
  minuteTrades: number[]
  cumLogins: number[]
  avgCum: number[]
  totalToday: number
}

let cached: LoginSeries | null = null

export function loginSeries(): LoginSeries {
  if (cached) return cached

  const minuteTrades = Array.from({ length: SESSION }, (_, i) => {
    if (i > NOW) return 0
    const t = i / SESSION
    const profile =
      90 +
      110 * Math.exp(-Math.pow((t - 0.05) * 6, 2)) +
      70 * Math.exp(-Math.pow((t - 0.95) * 6, 2)) -
      50 * Math.exp(-Math.pow((t - 0.55) * 5, 2))
    const noise = (seed(i) - 0.5) * 70 + (seed(i + 99) - 0.5) * 30
    const v = Math.max(0, Math.round(profile + noise))
    return seed(i + 31) < 0.06 ? 0 : v
  })

  const cumLogins = minuteTrades.reduce<number[]>((acc, v, i) => {
    acc.push((acc[i - 1] || 0) + Math.round(v * 0.42 + 6 + seed(i + 5) * 8))
    return acc
  }, [])

  const totalToday = cumLogins[NOW] || 0

  const avgCum = Array.from({ length: SESSION }, (_, i) => {
    const t = i / SESSION
    const peak = (totalToday * 0.94) / Math.tanh(3)
    return Math.round(peak * Math.tanh(t * 3))
  })

  cached = { minuteTrades, cumLogins, avgCum, totalToday }
  return cached
}

export { seed as loginSeed }
