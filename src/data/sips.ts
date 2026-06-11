export interface Sip {
  id: string; ucc: string; client: string; scheme: string; symbol: string
  exchange: string; type: string; amount: string; qty: number; capPrice: string
  freq: string; next: string; start: string; end: string; installment: string
  pending: number; failed: number; execCount: number
  status: 'active' | 'failed' | 'paused' | 'pending'
  attempts: number; createdOn: string; initiatedBy: string; modifiedBy: string
}

export const SIPS: Sip[] = [
  { id: 'SIP-118832', ucc: 'CF118832', client: 'Aman Verma', scheme: 'Parag Parikh Flexi Cap', symbol: 'RELIANCE', exchange: 'NSE', type: 'Amount', amount: '5,000', qty: 2, capPrice: '2,950.00', freq: 'Monthly', next: '05 May 2026', start: '05 Jan 2025', end: '05 Jan 2030', installment: '16/60', pending: 44, failed: 2, execCount: 14, status: 'failed', attempts: 2, createdOn: '04 Jan 2025 11:42', initiatedBy: 'Aman Verma', modifiedBy: 'ops.kavitha@codifi.in' },
  { id: 'SIP-118780', ucc: 'CF118780', client: 'Priya Subramaniam', scheme: 'HDFC Mid-Cap Opp', symbol: 'INFY', exchange: 'NSE', type: 'Quantity', amount: '25,000', qty: 15, capPrice: '1,720.00', freq: 'Monthly', next: '12 May 2026', start: '12 Aug 2024', end: '12 Aug 2027', installment: '21/36', pending: 15, failed: 0, execCount: 21, status: 'active', attempts: 0, createdOn: '10 Aug 2024 09:18', initiatedBy: 'Priya Subramaniam', modifiedBy: 'Priya Subramaniam' },
  { id: 'SIP-118742', ucc: 'CF118742', client: 'Saanvi Nair', scheme: 'Axis Long Term Equity', symbol: 'TCS', exchange: 'NSE', type: 'Amount', amount: '2,500', qty: 1, capPrice: '4,250.00', freq: 'Monthly', next: '07 May 2026', start: '07 Mar 2024', end: '07 Mar 2029', installment: '26/60', pending: 34, failed: 0, execCount: 26, status: 'active', attempts: 0, createdOn: '05 Mar 2024 16:04', initiatedBy: 'Saanvi Nair', modifiedBy: 'Saanvi Nair' },
  { id: 'SIP-118710', ucc: 'CF118710', client: 'Karthik Iyer', scheme: 'Mirae Asset ELSS', symbol: 'HDFCBANK', exchange: 'NSE', type: 'Amount', amount: '10,000', qty: 6, capPrice: '1,680.00', freq: 'Quarterly', next: '01 Jun 2026', start: '01 Sep 2023', end: '01 Sep 2028', installment: '11/20', pending: 9, failed: 0, execCount: 11, status: 'paused', attempts: 0, createdOn: '28 Aug 2023 12:30', initiatedBy: 'Karthik Iyer', modifiedBy: 'ops.suresh@codifi.in' },
  { id: 'SIP-118702', ucc: 'CF118702', client: 'Mehrunissa Ali', scheme: 'ICICI Pru Bluechip', symbol: 'BAJFINANCE', exchange: 'NSE', type: 'Amount', amount: '50,000', qty: 7, capPrice: '7,400.00', freq: 'Monthly', next: '10 May 2026', start: '10 Oct 2024', end: '10 Oct 2027', installment: '19/36', pending: 17, failed: 0, execCount: 19, status: 'active', attempts: 0, createdOn: '08 Oct 2024 10:55', initiatedBy: 'Mehrunissa Ali', modifiedBy: 'Mehrunissa Ali' },
  { id: 'SIP-118688', ucc: 'CF118688', client: 'Faiz Rahman', scheme: 'Nippon Small Cap', symbol: '500325', exchange: 'BSE', type: 'Quantity', amount: '1,000', qty: 1, capPrice: '2,990.00', freq: 'Weekly', next: '06 May 2026', start: '06 Feb 2026', end: '06 Feb 2027', installment: '13/52', pending: 39, failed: 0, execCount: 13, status: 'pending', attempts: 0, createdOn: '04 Feb 2026 14:10', initiatedBy: 'Faiz Rahman', modifiedBy: 'Faiz Rahman' },
]

export const SIP_BADGE: Record<Sip['status'], [string, string]> = {
  active: ['badge-success', 'Active'],
  failed: ['badge-danger', 'Failed'],
  paused: ['badge-warn', 'Paused'],
  pending: ['badge-info', 'Pending'],
}
