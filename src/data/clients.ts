export interface Bank { name: string; acct: string; ifsc?: string; primary?: boolean }
export interface Session { date: string; source: string; ip: string; status: string }

export interface Client {
  id: string; name: string; gender: 'M' | 'F'; dob: string; pan: string
  email: string; mobile: string; segments: string[]
  status: 'active' | 'blocked' | 'dormant'
  loggedInToday: boolean; mtfActive: boolean; lastSeen: string; ordersToday: number
  emailVerified: boolean; mobileVerified: boolean
  banks: Bank[]
  activity: { orders: number; cancelled: number; rejected: number; api: number }
  funds: { payIn: number; payOut: number; net: number; mtf: string }
  sessions: Session[]
}

export const CLIENT_DATA: Client[] = [
  { id: 'CDF000142', name: 'Aarav Mehta', gender: 'M', dob: '14 Mar 1991', pan: 'AVPVK9821J', email: 'aarav.mehta@gmail.com', mobile: '9821345210', segments: ['EQ', 'F&O'], status: 'active', loggedInToday: true, mtfActive: true, lastSeen: '2m ago', ordersToday: 24, emailVerified: true, mobileVerified: true, banks: [{ name: 'HDFC Bank', acct: '50100384282428', ifsc: 'HDFC0000123', primary: true }, { name: 'ICICI Bank', acct: '628401534921', ifsc: 'ICIC0006284', primary: false }], activity: { orders: 24, cancelled: 2, rejected: 1, api: 6 }, funds: { payIn: 250000, payOut: 80000, net: 170000, mtf: 'Active · ₹4.2 L exposure' }, sessions: [{ date: '07 May 2026, 09:14', source: 'Mobile · iOS 18.1', ip: '49.207.218.42', status: 'Active' }, { date: '06 May 2026, 14:42', source: 'Web · Chrome 124', ip: '49.207.218.42', status: 'Ended' }, { date: '06 May 2026, 09:08', source: 'Mobile · iOS 18.1', ip: '103.21.58.190', status: 'Ended' }] },
  { id: 'CDF000287', name: 'Saanvi Iyer', gender: 'F', dob: '02 Sep 1988', pan: 'AAQPS3401C', email: 'saanvi.iyer@outlook.com', mobile: '9742891034', segments: ['EQ', 'F&O', 'CDS'], status: 'active', loggedInToday: true, mtfActive: true, lastSeen: '12m ago', ordersToday: 18, emailVerified: true, mobileVerified: true, banks: [{ name: 'Kotak Mahindra Bank', acct: '4112089834510', ifsc: 'KKBK0000412', primary: true }], activity: { orders: 18, cancelled: 1, rejected: 0, api: 0 }, funds: { payIn: 0, payOut: 124000, net: -124000, mtf: 'Active · ₹2.1 L exposure' }, sessions: [{ date: '07 May 2026, 09:11', source: 'Web · Safari 17', ip: '157.49.224.18', status: 'Active' }, { date: '06 May 2026, 13:24', source: 'Mobile · Android 14', ip: '157.49.224.18', status: 'Ended' }] },
  { id: 'CDF001054', name: 'Vihaan Banerjee', gender: 'M', dob: '21 Jul 1995', pan: 'KZRPB1290D', email: 'vihaan.b@protonmail.com', mobile: '8884124928', segments: ['EQ'], status: 'active', loggedInToday: true, mtfActive: false, lastSeen: '1h ago', ordersToday: 8, emailVerified: true, mobileVerified: true, banks: [{ name: 'Axis Bank', acct: '922010012845091', ifsc: 'UTIB0000922', primary: true }], activity: { orders: 8, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 50000, payOut: 0, net: 50000, mtf: 'Inactive' }, sessions: [{ date: '07 May 2026, 08:58', source: 'Mobile · Android 14', ip: '103.92.118.4', status: 'Active' }] },
  { id: 'CDF000981', name: 'Ananya Kapoor', gender: 'F', dob: '11 Dec 1992', pan: 'BJTPK7762E', email: 'ananya.kapoor@yahoo.in', mobile: '9819772201', segments: ['EQ', 'F&O'], status: 'blocked', loggedInToday: false, mtfActive: false, lastSeen: '4d ago', ordersToday: 0, emailVerified: true, mobileVerified: true, banks: [{ name: 'SBI', acct: '34928104732', ifsc: 'SBIN0000711', primary: true }], activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' }, sessions: [{ date: '03 May 2026, 11:08', source: 'Mobile · iOS 17.5', ip: '202.142.118.91', status: 'Revoked' }] },
  { id: 'CDF000642', name: 'Reyansh Subramanian', gender: 'M', dob: '06 Feb 1990', pan: 'CKIPI9930F', email: 'reyansh.s@infy.com', mobile: '9986542310', segments: ['EQ', 'F&O', 'CDS'], status: 'active', loggedInToday: true, mtfActive: true, lastSeen: '3m ago', ordersToday: 31, emailVerified: true, mobileVerified: true, banks: [{ name: 'HDFC Bank', acct: '50100728401920', ifsc: 'HDFC0000456', primary: true }, { name: 'IndusInd Bank', acct: '201928374650', ifsc: 'INDB0000201', primary: false }], activity: { orders: 31, cancelled: 4, rejected: 1, api: 12 }, funds: { payIn: 500000, payOut: 200000, net: 300000, mtf: 'Active · ₹6.8 L exposure' }, sessions: [{ date: '07 May 2026, 09:15', source: 'Web · Chrome 124', ip: '120.138.42.18', status: 'Active' }, { date: '07 May 2026, 09:15', source: 'API · Algo bot', ip: '52.66.184.220', status: 'Active' }] },
  { id: 'CDF000418', name: 'Diya Chowdhury', gender: 'F', dob: '19 May 1996', pan: 'GMNPA1102A', email: 'diya.chowdhury@gmail.com', mobile: '9818204182', segments: ['EQ'], status: 'active', loggedInToday: true, mtfActive: false, lastSeen: '22m ago', ordersToday: 5, emailVerified: true, mobileVerified: false, banks: [{ name: 'Yes Bank', acct: '014291084526', ifsc: 'YESB0000142', primary: true }], activity: { orders: 5, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 25000, payOut: 0, net: 25000, mtf: 'Inactive' }, sessions: [{ date: '07 May 2026, 08:46', source: 'Mobile · iOS 18.0', ip: '49.36.218.4', status: 'Active' }] },
  { id: 'CDF002134', name: 'Aditya Pillai', gender: 'M', dob: '24 Aug 1985', pan: 'XDPGT4421R', email: 'aditya.pillai@startup.in', mobile: '9849210038', segments: ['EQ', 'F&O'], status: 'dormant', loggedInToday: false, mtfActive: false, lastSeen: '32d ago', ordersToday: 0, emailVerified: true, mobileVerified: true, banks: [{ name: 'ICICI Bank', acct: '628490102218', ifsc: 'ICIC0006284', primary: true }], activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' }, sessions: [{ date: '05 Apr 2026, 15:18', source: 'Web · Firefox 120', ip: '49.207.118.4', status: 'Ended' }] },
  { id: 'CDF000573', name: 'Ishaan Reddy', gender: 'M', dob: '03 Nov 1993', pan: 'BBNPN7782W', email: 'ishaan.reddy@gmail.com', mobile: '9740118203', segments: ['EQ', 'F&O'], status: 'active', loggedInToday: true, mtfActive: true, lastSeen: '15m ago', ordersToday: 12, emailVerified: true, mobileVerified: true, banks: [{ name: 'HDFC Bank', acct: '50100847290412', ifsc: 'HDFC0000789', primary: true }], activity: { orders: 12, cancelled: 1, rejected: 0, api: 0 }, funds: { payIn: 100000, payOut: 50000, net: 50000, mtf: 'Active · ₹3.4 L exposure' }, sessions: [{ date: '07 May 2026, 09:02', source: 'Mobile · Android 14', ip: '103.42.118.220', status: 'Active' }] },
  { id: 'CDF001872', name: 'Kavya Nair', gender: 'F', dob: '28 Jan 1989', pan: 'EFFPR3201T', email: 'kavya.nair@startup.in', mobile: '9821740028', segments: ['F&O'], status: 'active', loggedInToday: false, mtfActive: false, lastSeen: '1d ago', ordersToday: 0, emailVerified: false, mobileVerified: true, banks: [{ name: 'Federal Bank', acct: '17890021840012', ifsc: 'FDRL0001789', primary: true }], activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' }, sessions: [{ date: '06 May 2026, 14:18', source: 'Mobile · iOS 18.1', ip: '49.207.42.118', status: 'Ended' }] },
  { id: 'CDF000199', name: 'Arjun Deshmukh', gender: 'M', dob: '07 Jun 1987', pan: 'YFPBN8801M', email: 'arjun.deshmukh@bose.in', mobile: '9912038481', segments: ['EQ', 'CDS'], status: 'dormant', loggedInToday: false, mtfActive: false, lastSeen: '48d ago', ordersToday: 0, emailVerified: true, mobileVerified: true, banks: [{ name: 'Bank of Baroda', acct: '20910028471092', ifsc: 'BARB0BARODA', primary: true }], activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 }, funds: { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' }, sessions: [{ date: '20 Mar 2026, 10:42', source: 'Web · Chrome 122', ip: '157.49.218.4', status: 'Ended' }] },
]

export const STATUS_BADGE: Record<Client['status'], [string, string]> = {
  active: ['badge-success', 'Active'],
  blocked: ['badge-danger', 'Blocked'],
  dormant: ['badge', 'Dormant'],
}

export const maskEmail = (e: string): string => {
  const [u, d] = e.split('@')
  if (!u || !d) return e
  return u.slice(0, 2) + '***@' + d
}
export const maskMobile = (m: string): string =>
  m.length < 6 ? m : m.slice(0, 2) + '*****' + m.slice(-3)
export const maskAccount = (a: string): string => '****' + a.slice(-4)
export const fmtINR = (n: number): string => '₹' + Math.abs(n).toLocaleString('en-IN')
