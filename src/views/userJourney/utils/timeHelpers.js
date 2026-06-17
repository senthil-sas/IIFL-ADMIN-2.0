export function toMs(t) {
  if (!t) return 0
  const p = t.split(':')
  const s = parseFloat(p[2] || 0)
  return (+(p[0] || 0)) * 3600000 + (+(p[1] || 0)) * 60000 + Math.floor(s * 1000)
}

export function latency(a, b) {
  const d = toMs(b) - toMs(a)
  if (isNaN(d) || d < 0) return '—'
  return d < 1000 ? d + 'ms' : (d / 1000).toFixed(2) + 's'
}

export function f8(t) {
  return t ? t.substring(0, 8) : '—'
}

export function fDate(d) {
  if (!d || d.length < 8) return d
  const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${d.slice(0, 2)} ${M[+d.slice(2, 4) - 1] || '?'} ${d.slice(4)}`
}

export function uriTail(uri) {
  return uri.split('/').filter(Boolean).pop() || uri
}
