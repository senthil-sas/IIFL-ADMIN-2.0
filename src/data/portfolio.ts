export interface Order { id: string; client: string; symbol: string; side: string; qty: number; price: string; value: string; status: string; exch: string; time: string }
export interface Holding { client: string; cid: string; symbol: string; exch: string; qty: number; avg: string; ltp: string; invested: string; current: string; pnl: number; pct: number }
export interface Position { client: string; cid: string; symbol: string; product: string; qty: number; side: string; avg: string; ltp: string; mtm: number; margin: string; exch: string }
export interface Watch { name: string; owner: string; type: string; clients: number; symbols: number; top: string[]; updated: string; status: string }

export const HOLDINGS: Holding[] = [
  { client: 'Aman Verma', cid: 'CF-10241', symbol: 'RELIANCE', exch: 'NSE', qty: 120, avg: '2,612.40', ltp: '2,841.20', invested: '3,13,488.00', current: '3,40,944.00', pnl: 27456, pct: 8.76 },
  { client: 'Priya Subramaniam', cid: 'CF-10198', symbol: 'TCS', exch: 'NSE', qty: 80, avg: '3,720.10', ltp: '4,012.55', invested: '2,97,608.00', current: '3,21,004.00', pnl: 23396, pct: 7.86 },
  { client: 'Rajat Kapoor', cid: 'CF-10312', symbol: 'INFY', exch: 'BSE', qty: 250, avg: '1,930.20', ltp: '1,884.10', invested: '4,82,550.00', current: '4,71,025.00', pnl: -11525, pct: -2.39 },
  { client: 'Tanvi Joshi', cid: 'CF-10287', symbol: 'HDFCBANK', exch: 'NSE', qty: 60, avg: '1,580.80', ltp: '1,672.30', invested: '94,848.00', current: '1,00,338.00', pnl: 5490, pct: 5.79 },
  { client: 'Karthik Iyer', cid: 'CF-10422', symbol: 'WIPRO', exch: 'NSE', qty: 400, avg: '512.20', ltp: '538.65', invested: '2,04,880.00', current: '2,15,460.00', pnl: 10580, pct: 5.16 },
  { client: 'Mehrunissa Ali', cid: 'CF-10509', symbol: 'ITC', exch: 'NSE', qty: 850, avg: '432.10', ltp: '448.90', invested: '3,67,285.00', current: '3,81,565.00', pnl: 14280, pct: 3.89 },
  { client: 'Devansh Gupta', cid: 'CF-10618', symbol: 'BAJFINANCE', exch: 'BSE', qty: 18, avg: '7,440.00', ltp: '7,221.05', invested: '1,33,920.00', current: '1,29,978.90', pnl: -3941, pct: -2.94 },
  { client: 'Saanvi Nair', cid: 'CF-10741', symbol: 'LT', exch: 'NSE', qty: 45, avg: '3,510.00', ltp: '3,612.40', invested: '1,57,950.00', current: '1,62,558.00', pnl: 4608, pct: 2.92 },
]

export const POSITIONS: Position[] = [
  { client: 'Aman Verma', cid: 'CF-10241', symbol: 'NIFTY 25APR FUT', product: 'NRML', qty: 50, side: 'LONG', avg: '22,418.50', ltp: '22,512.80', mtm: 4715, margin: '1,84,200', exch: 'NSE' },
  { client: 'Priya Subramaniam', cid: 'CF-10198', symbol: 'BANKNIFTY 24APR 48000 CE', product: 'MIS', qty: 25, side: 'LONG', avg: '342.10', ltp: '388.40', mtm: 1157, margin: '38,400', exch: 'NSE' },
  { client: 'Rajat Kapoor', cid: 'CF-10312', symbol: 'TCS 25APR FUT', product: 'NRML', qty: 175, side: 'SHORT', avg: '4,025.00', ltp: '4,012.55', mtm: 2178, margin: '2,42,000', exch: 'NSE' },
  { client: 'Tanvi Joshi', cid: 'CF-10287', symbol: 'NIFTY 24APR 22500 PE', product: 'MIS', qty: 50, side: 'LONG', avg: '128.20', ltp: '94.50', mtm: -1685, margin: '21,400', exch: 'NSE' },
  { client: 'Karthik Iyer', cid: 'CF-10422', symbol: 'CRUDEOIL 19APR FUT', product: 'NRML', qty: 100, side: 'LONG', avg: '6,890.00', ltp: '6,948.00', mtm: 5800, margin: '94,500', exch: 'MCX' },
  { client: 'Mehrunissa Ali', cid: 'CF-10509', symbol: 'RELIANCE 25APR FUT', product: 'NRML', qty: 250, side: 'LONG', avg: '2,820.00', ltp: '2,841.20', mtm: 5300, margin: '3,12,000', exch: 'NSE' },
  { client: 'Saanvi Nair', cid: 'CF-10741', symbol: 'BANKNIFTY 24APR 47500 PE', product: 'MIS', qty: 25, side: 'SHORT', avg: '210.40', ltp: '178.20', mtm: 805, margin: '46,200', exch: 'NSE' },
]

export const WATCH: Watch[] = [
  { name: 'Default', owner: 'System', type: 'dynamic', clients: 1842, symbols: 24, top: ['NIFTY 50', 'RELIANCE', 'TCS', 'INFY'], updated: '12 min ago', status: 'live' },
  { name: 'F&O Movers', owner: 'Trading desk', type: 'predef', clients: 612, symbols: 18, top: ['BANKNIFTY', 'BAJFINANCE', 'HDFCBANK'], updated: '4 min ago', status: 'live' },
  { name: 'IT Pack', owner: 'Research', type: 'predef', clients: 388, symbols: 12, top: ['TCS', 'INFY', 'WIPRO', 'HCLTECH'], updated: '22 min ago', status: 'live' },
  { name: 'PSU Banks', owner: 'Research', type: 'predef', clients: 274, symbols: 9, top: ['SBIN', 'BANKBARODA', 'PNB'], updated: '1 hr ago', status: 'paused' },
  { name: 'Smallcap 30', owner: 'Aman Verma', type: 'user', clients: 96, symbols: 30, top: ['IRCON', 'KEI', 'CUB', 'POLYCAB'], updated: '8 min ago', status: 'live' },
  { name: 'Energy', owner: 'Karthik Iyer', type: 'user', clients: 142, symbols: 14, top: ['ONGC', 'IOC', 'GAIL', 'NTPC'], updated: '36 min ago', status: 'live' },
]

export const PRODUCT_BADGE: Record<string, [string, string]> = { NRML: ['', 'NRML'], MIS: ['badge-info', 'MIS'], CNC: ['', 'CNC'] }

export interface ClientHolding {
  client: string; cid: string; uniqueStocks: number; totalQty: number
  invested: number; current: number; pnl: number; symbols: string[]; poa: boolean
}

export function holdingsByClient(): ClientHolding[] {
  const map = new Map<string, ClientHolding>()
  HOLDINGS.forEach((h) => {
    const inv = parseFloat(h.invested.replace(/,/g, ''))
    const cur = parseFloat(h.current.replace(/,/g, ''))
    if (!map.has(h.cid)) {
      const poa = h.cid.charCodeAt(h.cid.length - 1) % 4 !== 0
      map.set(h.cid, { client: h.client, cid: h.cid, uniqueStocks: 0, totalQty: 0, invested: 0, current: 0, pnl: 0, symbols: [], poa })
    }
    const row = map.get(h.cid)!
    row.uniqueStocks += 1
    row.totalQty += h.qty
    row.invested += inv
    row.current += cur
    row.pnl += h.pnl
    row.symbols.push(h.symbol)
  })
  return Array.from(map.values())
}
