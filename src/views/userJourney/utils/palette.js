export const PAL = {
  AUTH:           { h: '#3b82f6', bg: 'rgba(59,130,246,.18)',  br: 'rgba(59,130,246,.5)'  },
  HOLDINGS:       { h: '#10b981', bg: 'rgba(16,185,129,.18)',  br: 'rgba(16,185,129,.5)'  },
  ORDER_BOOK:     { h: '#f59e0b', bg: 'rgba(245,158,11,.18)',  br: 'rgba(245,158,11,.5)'  },
  POSITIONS:      { h: '#ec4899', bg: 'rgba(236,72,153,.18)',  br: 'rgba(236,72,153,.5)'  },
  CLIENT_UTIL:    { h: '#94a3b8', bg: 'rgba(148,163,184,.18)', br: 'rgba(148,163,184,.5)' },
  PROFILE:        { h: '#8b5cf6', bg: 'rgba(139,92,246,.18)',  br: 'rgba(139,92,246,.5)'  },
  COMM_UTIL:      { h: '#06b6d4', bg: 'rgba(6,182,212,.18)',   br: 'rgba(6,182,212,.5)'   },
  LIMITS:         { h: '#f97316', bg: 'rgba(249,115,22,.18)',  br: 'rgba(249,115,22,.5)'  },
  PREORDERMARGIN: { h: '#ef4444', bg: 'rgba(239,68,68,.18)',   br: 'rgba(239,68,68,.5)'   },
  PLACE_ORDER:    { h: '#22d3ee', bg: 'rgba(34,211,238,.20)',  br: 'rgba(34,211,238,.55)' },
  USER_SESSION:   { h: '#6b7280', bg: 'rgba(107,114,128,.18)', br: 'rgba(107,114,128,.5)' },
  GENERAL:        { h: '#84cc16', bg: 'rgba(132,204,22,.18)',  br: 'rgba(132,204,22,.5)'  },
  TRADE_BOOK:     { h: '#d946ef', bg: 'rgba(217,70,239,.18)',  br: 'rgba(217,70,239,.5)'  },
}

export const pc = ev => PAL[ev] || { h: '#888', bg: 'rgba(128,128,128,.15)', br: 'rgba(128,128,128,.4)' }
