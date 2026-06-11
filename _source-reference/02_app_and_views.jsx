


// ===== icons.jsx =====
// Tiny inline SVG icon set (1.5px stroke, 16px) — Lucide-inspired
const Icon = ({ name, size = 16, stroke = 1.5, className = '', style = {} }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    className, style
  };
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 4a3 3 0 010 6" /><path d="M21 20c0-2.5-1.5-4.5-4-5.5" /></>,
    portfolio: <><path d="M3 12l4-4 4 4 4-4 6 6" /><path d="M3 21h18" /></>,
    funds: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></>,
    operations: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.4l-.1.1A2 2 0 113.3 17l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H2a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.4-1.9L3.1 7A2 2 0 116 4.2l.1.1a1.7 1.7 0 001.9.4h.1a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.4l.1-.1A2 2 0 1120.7 7l-.1.1a1.7 1.7 0 00-.4 1.9V9a1.7 1.7 0 001.5 1H22a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h13a2 2 0 012 2z" /></>,
    repeat: <><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></>,
    server: <><rect x="3" y="3" width="18" height="7" rx="1.5" /><rect x="3" y="14" width="18" height="7" rx="1.5" /><line x1="6" y1="6.5" x2="6.01" y2="6.5" /><line x1="6" y1="17.5" x2="6.01" y2="17.5" /></>,
    settings: <><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    bell: <><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    upload: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
    chev: <><polyline points="6 9 12 15 18 9" /></>,
    chevR: <><polyline points="9 18 15 12 9 6" /></>,
    more: <><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></>,
    close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    filter: <><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 113 3L12 15l-4 1 1-4z" /></>,
    trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    refresh: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15" /></>,
    bolt: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    pin: <><path d="M12 22s-1-3-3-5-3-3.5-3-6a6 6 0 0112 0c0 2.5-1 4-3 6s-3 5-3 5z" /><circle cx="12" cy="11" r="2" /></>,
    flag: <><path d="M4 22V4a1 1 0 011-1h10l1 2h4v10h-5l-1-2H6v9" /></>,
    play: <><polygon points="5 3 19 12 5 21 5 3" /></>,
    pause: <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>,
    cloud: <><path d="M18 10a4 4 0 00-7.6-1.5A4 4 0 003 13a4 4 0 004 4h11a3 3 0 000-6h0z" /></>,
    sip: <><path d="M3 12a9 9 0 1118 0" /><path d="M12 7v5l3 2" /></>,
    book: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" /><line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="15" x2="22" y2="15" /><line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="15" x2="4" y2="15" /></>,
    db: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.7-4 3-9 3s-9-1.3-9-3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>,
    branch: <><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 01-9 9" /></>
  };
  return <svg {...props}>{paths[name] || null}</svg>;
};

window.Icon = Icon;


// ===== chrome.jsx =====
// Shared chrome: Sidebar, Topbar, layout helpers
const { useState, useEffect, useRef, useMemo } = React;

const NAV_GROUPS = [
{
  label: 'Workspace',
  items: [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'clients', label: 'Client Management', icon: 'users', count: '14.2k' },
  { id: 'portfolio', label: 'Portfolio & Watchlist', icon: 'portfolio' },
  { id: 'funds', label: 'Funds & Payments', icon: 'funds', count: '23' },
  { id: 'sip', label: 'SIP Management', icon: 'sip' },
  { id: 'reports', label: 'Reports', icon: 'file' }]

},
{
  label: 'Operations',
  items: [
  { id: 'operations', label: 'Operations', icon: 'operations' },
  { id: 'communications', label: 'Communications', icon: 'chat' },
  { id: 'infra', label: 'Infrastructure', icon: 'server' }]

},
{
  label: 'Admin',
  items: [
  { id: 'settings', label: 'Settings', icon: 'settings' }]

}];


function Sidebar({ active, onSelect, collapsed, onToggle }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo" data-comment-anchor="d3b6d08a01-img-99-9" aria-label="Aliceblue" title="Aliceblue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#1976F2" />
            <path d="M6.5 16.5L11 7.5h2L17.5 16.5h-2.2l-1-2.2H9.7l-1 2.2H6.5zm3.9-3.9h3.2L12 8.9l-1.6 3.7z" fill="#fff" />
          </svg>
        </div>
        <div className="brand-text">
          <div className="brand-name">Aliceblue</div>
          <div className="brand-tag">Admin · v4.2</div>
        </div>
        <button
          className="sidebar-collapse-btn"
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          
          <Icon name="chevR" size={12} stroke={2.2} style={{ transform: collapsed ? 'none' : 'rotate(180deg)' }} />
        </button>
      </div>

      {NAV_GROUPS.map((g) =>
      <div className="nav-group" key={g.label}>
          <div className="nav-label">{g.label}</div>
          {g.items.map((it) =>
        <button
          key={it.id}
          className={"nav-item" + (active === it.id ? " active" : "")}
          onClick={() => onSelect(it.id)}
          data-label={it.label}
          title={collapsed ? it.label : undefined}>
          
              <Icon name={it.icon} className="ni-icon" />
              <span>{it.label}</span>
            </button>
        )}
        </div>
      )}

      <div className="sidebar-footer">
        <div className="profile-chip">
          <div className="avatar">RM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pc-name">Rohan Mehta</div>
            <div className="pc-role">Super Admin</div>
          </div>
          <Icon name="chev" size={14} className="pc-chev" style={{ color: '#6E7793' }} />
        </div>
      </div>
    </aside>);

}

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', subtitle: 'Real-time overview of platform activity, login traffic, and trading load.' },
  'login-insights': { title: 'Insights', parent: 'Dashboard', subtitle: 'Deep look at logins, trades and behavior across today’s session.' },
  clients: { title: 'Client Management', subtitle: 'All onboarded investors, KYC status and account states.' },
  portfolio: { title: 'Portfolio & Watchlist', subtitle: 'Client holdings, watchlists and order flow.' },
  funds: { title: '', subtitle: '' },
  sip: { title: 'SIP Management', subtitle: 'Active mandates, schedules and exception queue.' },
  reports: { title: 'Reports', subtitle: 'Scheduled exports, regulatory filings and ad-hoc downloads.' },
  operations: { title: 'Operations', subtitle: 'Market content, app banners, holdings and positions.' },
  communications: { title: 'Communications', subtitle: 'Push, in-app messages and announcements.' },
  infra: { title: 'Infrastructure · LAMA', subtitle: 'LAMA fleet, regions, queue depth and health.' },
  settings: { title: 'Settings', subtitle: 'Workspace branding, admins, roles and integrations.' }
};

function Topbar({ active }) {
  const meta = PAGE_TITLES[active] || PAGE_TITLES.dashboard;
  return (
    <div className="topbar">
      <div className="crumbs">
        {meta.parent && (
          <>
            <span
              className="crumb-link"
              role="link"
              tabIndex={0}
              onClick={() => window.__navigate && window.__navigate('dashboard')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.__navigate && window.__navigate('dashboard'); } }}
              style={{ cursor: 'pointer' }}
            >{meta.parent}</span>
            <span className="sep">/</span>
          </>
        )}
        <span className="current">{meta.title}</span>
      </div>
      <div className="search">
        <Icon name="search" size={14} />
        <input placeholder="Search clients, orders, mandates…" />
        <span className="kbd">⌘K</span>
      </div>
      <button className="icon-btn" title="Refresh"><Icon name="refresh" size={15} /></button>
      <button className="icon-btn" title="Notifications"><Icon name="bell" size={15} /><span className="dot"></span></button>
    </div>);

}

function PageHeader({ active, actions, subtitleOverride }) {
  const meta = PAGE_TITLES[active] || PAGE_TITLES.dashboard;
  return (
    <div className="page-header">
      {(meta.title || meta.subtitle || subtitleOverride) && (
        <div>
          {meta.title && <h1>{meta.title}</h1>}
          {(subtitleOverride || meta.subtitle) && <div className="subtitle">{subtitleOverride || meta.subtitle}</div>}
        </div>
      )}
      <div className="actions">{actions}</div>
    </div>);

}

function CodifiFoot() {
  return (
    <div className="cf-footer">
      <span>Powered by CodiFi · session secure · {new Date().toISOString().slice(0, 16).replace('T', ' ')}</span>
    </div>);

}

Object.assign(window, { Sidebar, Topbar, PageHeader, CodifiFoot, NAV_GROUPS, PAGE_TITLES });


// ===== view-dashboard.jsx =====
// Dashboard view
const KPIs = [
{ label: 'Active Clients (BOD)', value: '14,283', unit: '', trend: '+2.4%', up: true, foot: '', color: 'var(--coral)' },
{ label: 'Total Logins (12.25 PM)', value: '7,383', unit: '', trend: '+11.0%', up: true, foot: '', color: 'var(--primary)' },
{ label: 'Total Trades', value: '38,412', unit: '', trend: '+6.2%', up: true, foot: '', color: 'var(--violet)' },
{ label: 'AUM', value: '₹2,847', unit: 'Cr', trend: '+0.8%', up: true, foot: '', color: 'var(--emerald)' }];


const Sparkline = ({ up = true }) => {
  const pts = up ?
  "0,28 8,24 16,26 24,18 32,20 40,12 48,14 56,8 64,10" :
  "0,8 8,12 16,10 24,18 32,16 40,22 48,20 56,26 64,24";
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none">
      <polyline points={pts} stroke={up ? "var(--emerald)" : "var(--rose)"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

};

function KpiStrip() {
  return (
    <div className="kpi-grid">
      {KPIs.map((k, i) =>
      <div className="kpi" key={i}>
          <div className="kpi-head">
            <span className="kpi-dot" style={{ background: k.color }}></span>
            {k.label}
          </div>
          <div className="kpi-value">
            {k.value}{k.unit && <span className="unit">{k.unit}</span>}
          </div>
          <span className={"kpi-trend " + (k.up ? 'up' : 'down')}>
            <Icon name={k.up ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />{k.trend}
          </span>
          <div className="kpi-foot">{k.foot}</div>
        </div>
      )}
    </div>);

}

// Login analysis — minute-resolution stock-style line + per-minute trade bars
// Login analysis — minute-resolution stock-style line + per-minute trade bars
function DevicesSection({ accent, totalTrades }) {
  const [hover, setHover] = React.useState(null); // { ring, idx, x, y }
  // Parents (inner ring) — Blue / Green / Yellow as specified
  const parents = [
    { lbl: 'Mobile', n: Math.round(totalTrades * 0.62), c: '#1B5BD9' },
    { lbl: 'Web',    n: Math.round(totalTrades * 0.28), c: '#16A36B' },
    { lbl: 'APIs',   n: Math.round(totalTrades * 0.10), c: '#E5A41A' },
  ];
  // Children (outer ring) — distinct hues per child, deliberately different from their parent's color
  const children = [
    { parent: 'Mobile', lbl: 'Android',       n: Math.round(parents[0].n * 0.71), c: '#3D2C8D' },
    { parent: 'Mobile', lbl: 'iOS',           n: parents[0].n - Math.round(parents[0].n * 0.71), c: '#8E5CD9' },
    { parent: 'Web',    lbl: 'Windows',       n: Math.round(parents[1].n * 0.62), c: '#0E8FA8' },
    { parent: 'Web',    lbl: 'macOS',         n: Math.round(parents[1].n * 0.31), c: '#E36AA8' },
    { parent: 'Web',    lbl: 'Linux',         n: parents[1].n - Math.round(parents[1].n * 0.62) - Math.round(parents[1].n * 0.31), c: '#C13F8A' },
    { parent: 'APIs',   lbl: 'Algo partners', n: Math.round(parents[2].n * 0.68), c: '#D55B2C' },
    { parent: 'APIs',   lbl: 'Direct',        n: parents[2].n - Math.round(parents[2].n * 0.68), c: '#A33A4F' },
  ];
  const total = parents.reduce((a, b) => a + b.n, 0);
  // Geometry: inner ring = parents (smaller r), outer ring = children (larger r). No gaps — touching segments.
  const R_IN  = 56;
  const R_OUT = 78;
  const C_IN  = 2 * Math.PI * R_IN;
  const C_OUT = 2 * Math.PI * R_OUT;
  // Inner segments — one per parent
  let inOff = 0;
  const innerSegs = parents.map((p) => {
    const len = (p.n / total) * C_IN;
    const seg = { ...p, len, off: inOff };
    inOff += len;
    return seg;
  });
  // Outer segments — children grouped under their parent so each child's arc sits within parent's arc
  let outOff = 0;
  const outerSegs = [];
  parents.forEach((p) => {
    const subs = children.filter(s => s.parent === p.lbl);
    const parentArcLen = (p.n / total) * C_OUT;
    subs.forEach((s) => {
      const len = (s.n / p.n) * parentArcLen;
      outerSegs.push({ ...s, len, off: outOff });
      outOff += len;
    });
  });

  const showTip = (e, ring, idx) => {
    const svgRect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    setHover({ ring, idx, x: e.clientX - svgRect.left, y: e.clientY - svgRect.top });
  };
  const hideTip = () => setHover(null);

  let tip = null;
  if (hover) {
    if (hover.ring === 'inner') {
      const seg = parents[hover.idx];
      const pct = (seg.n / total * 100).toFixed(1);
      const subs = children.filter(c => c.parent === seg.lbl);
      tip = {
        kind: 'parent',
        lbl: seg.lbl,
        c: seg.c,
        headline: `${seg.n.toLocaleString()} trades · ${pct}% of total`,
        rows: subs.map(s => ({
          lbl: s.lbl,
          c: s.c,
          n: s.n,
          pct: (s.n / seg.n * 100).toFixed(1),
        })),
        x: hover.x, y: hover.y,
      };
    } else {
      const seg = children[hover.idx];
      const parent = parents.find(o => o.lbl === seg.parent);
      tip = {
        kind: 'child',
        lbl: `${seg.parent} → ${seg.lbl}`,
        c: seg.c,
        headline: `${seg.n.toLocaleString()} trades · ${(seg.n / parent.n * 100).toFixed(1)}% of ${seg.parent} · ${(seg.n / total * 100).toFixed(1)}% of total`,
        rows: null,
        x: hover.x, y: hover.y,
      };
    }
  }

  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Trades · origin by device</div>
          <div className="lid-block-title">Where trades came from today</div>
        </div>
        <div className="lid-block-meta">{total.toLocaleString()} trades</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <svg viewBox="0 0 200 200" width="200" height="200" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
            {/* Outer ring — children */}
            {outerSegs.map((s, i) => (
              <circle key={'o' + i} cx="100" cy="100" r={R_OUT} fill="none" stroke={s.c} strokeWidth="20"
                strokeDasharray={`${s.len} ${C_OUT - s.len}`} strokeDashoffset={-s.off}
                style={{ cursor: 'pointer', transition: 'opacity .15s', opacity: hover && !(hover.ring === 'outer' && hover.idx === i) && !(hover.ring === 'inner' && parents[hover.idx].lbl === s.parent) ? 0.4 : 1 }}
                onMouseMove={(e) => showTip(e, 'outer', i)} onMouseLeave={hideTip} />
            ))}
            {/* Inner ring — parents */}
            {innerSegs.map((s, i) => (
              <circle key={'i' + i} cx="100" cy="100" r={R_IN} fill="none" stroke={s.c} strokeWidth="14"
                strokeDasharray={`${s.len} ${C_IN - s.len}`} strokeDashoffset={-s.off}
                style={{ cursor: 'pointer', transition: 'opacity .15s', opacity: hover && !(hover.ring === 'inner' && hover.idx === i) && !(hover.ring === 'outer' && children[hover.idx].parent === s.lbl) ? 0.4 : 1 }}
                onMouseMove={(e) => showTip(e, 'inner', i)} onMouseLeave={hideTip} />
            ))}
          </svg>
          {tip && (
            <div style={{
              position: 'absolute', left: tip.x + 12, top: tip.y + 12, pointerEvents: 'none',
              background: '#0E1320', color: '#fff', padding: '10px 12px', borderRadius: 6,
              fontSize: 11.5, lineHeight: 1.4, whiteSpace: 'nowrap', zIndex: 5,
              boxShadow: '0 6px 20px rgba(14,19,32,0.25)',
              fontFamily: 'var(--display)', minWidth: 180,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: tip.c }} />
                {tip.lbl}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, opacity: 0.75, marginTop: 3 }}>{tip.headline}</div>
              {tip.rows && tip.rows.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {tip.rows.map((r) => (
                    <div key={r.lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                        <span style={{ width: 7, height: 7, borderRadius: 2, background: r.c }} />
                        {r.lbl}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, opacity: 0.85 }}>
                        {r.n.toLocaleString()} <span style={{ opacity: 0.55, marginLeft: 4 }}>{r.pct}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {parents.map((parent) => {
            const subs = children.filter(s => s.parent === parent.lbl);
            const pct = Math.round(parent.n / total * 100);
            return (
              <div key={parent.lbl} style={{ borderLeft: `3px solid ${parent.c}`, paddingLeft: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{parent.lbl}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{pct}%</span>
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', color: parent.c }}>{parent.n.toLocaleString()}</div>
                <div style={{ fontSize: 10.5, color: 'var(--muted-2)', marginTop: 2, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>trades</div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {subs.map(s => {
                    const subPct = parent.n ? Math.round(s.n / parent.n * 100) : 0;
                    return (
                      <div key={s.lbl} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 12, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c, flexShrink: 0 }} />
                            {s.lbl}
                          </div>
                          <div style={{ height: 3, background: 'var(--bg)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${subPct}%`, height: '100%', background: s.c, borderRadius: 2 }} />
                          </div>
                        </div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', minWidth: 26, textAlign: 'right' }}>{subPct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LoginsByChannelSection({ accent }) {
  const [range, setRange] = React.useState('30d');
  const seed = (n) => { const x = Math.sin(n * 12.9898 + 41.3) * 43758.5453; return x - Math.floor(x); };
  const RANGES = {
    '30d': { count: 30, labels: Array.from({ length: 30 }, (_, i) => `${30 - i}d`), tickEvery: 5 },
    '12w': { count: 12, labels: Array.from({ length: 12 }, (_, i) => `W${52 - 11 + i}`), tickEvery: 2 },
    '12m': { count: 12, labels: ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'], tickEvery: 1 },
  };
  const { count, labels, tickEvery } = RANGES[range];
  const data = Array.from({ length: count }, (_, i) => {
    const base = range === '30d' ? 8200 : range === '12w' ? 52000 : 220000;
    const trend = 1 + (i / count) * 0.4;
    const noise = 0.85 + seed(i + range.charCodeAt(0)) * 0.3;
    const total = Math.round(base * trend * noise);
    const mob = Math.round(total * (0.58 + (seed(i + 1) - 0.5) * 0.04));
    const web = Math.round(total * (0.30 + (seed(i + 2) - 0.5) * 0.04));
    const api = total - mob - web;
    return { mob, web, api, total };
  });
  const max = Math.max(...data.map(d => d.total)) * 1.08;
  const W = 760, H = 280;
  const pad = { l: 44, r: 16, t: 16, b: 36 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const slot = innerW / count;
  const barW = Math.max(8, slot * 0.62);
  const fmt = (n) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;
  const sumMob = data.reduce((a, d) => a + d.mob, 0);
  const sumWeb = data.reduce((a, d) => a + d.web, 0);
  const sumApi = data.reduce((a, d) => a + d.api, 0);
  const sumAll = sumMob + sumWeb + sumApi;
  const colors = { mob: '#1B5BD9', web: '#5B8DEF', api: '#A6B6D4' };
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Logins · by channel</div>
          <div className="lid-block-title">Mobile, Web and API logins over time</div>
        </div>
        <div style={{ display: 'inline-flex', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 2 }}>
          {[{ id: '30d', l: '30 days' }, { id: '12w', l: '12 weeks' }, { id: '12m', l: '12 months' }].map(r => (
            <button key={r.id} onClick={() => setRange(r.id)}
              style={{ padding: '6px 12px', fontSize: 12, fontWeight: 500,
                background: range === r.id ? 'var(--surface)' : 'transparent',
                color: range === r.id ? 'var(--primary)' : 'var(--muted)',
                border: 'none', borderRadius: 6, cursor: 'pointer' }}>{r.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 28, marginBottom: 14 }}>
        {[{ lbl: 'Mobile', n: sumMob, c: colors.mob }, { lbl: 'Web', n: sumWeb, c: colors.web }, { lbl: 'APIs', n: sumApi, c: colors.api }].map(s => (
          <div key={s.lbl}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mono)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />{s.lbl}
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--ink)' }}>{s.n.toLocaleString()}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{Math.round(s.n / sumAll * 100)}% of total</div>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={pad.l} x2={W - pad.r} y1={pad.t + (i / 4) * innerH} y2={pad.t + (i / 4) * innerH} stroke="#EEF1F6" strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <text key={i} x={pad.l - 8} y={pad.t + ((4 - i) / 4) * innerH + 3} textAnchor="end" fontSize="10" fontFamily="var(--mono)" fill="rgba(15,18,28,0.55)">{fmt(Math.round((i / 4) * max))}</text>
        ))}
        {data.map((d, i) => {
          const x = pad.l + i * slot + (slot - barW) / 2;
          const mobH = (d.mob / max) * innerH;
          const webH = (d.web / max) * innerH;
          const apiH = (d.api / max) * innerH;
          const baseY = pad.t + innerH;
          return (
            <g key={i}>
              <rect x={x} y={baseY - mobH} width={barW} height={mobH} fill={colors.mob} />
              <rect x={x} y={baseY - mobH - webH} width={barW} height={webH} fill={colors.web} />
              <rect x={x} y={baseY - mobH - webH - apiH} width={barW} height={apiH} fill={colors.api} rx="2" />
            </g>
          );
        })}
        {data.map((d, i) => i % tickEvery === 0 && (
          <text key={'x' + i} x={pad.l + i * slot + slot / 2} y={H - 16} textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="rgba(15,18,28,0.55)">{labels[i]}</text>
        ))}
      </svg>
    </div>
  );
}

function OrderOriginSection({ accent }) {
  const modules = [
    { lbl: 'Market Watch', n: 4218, c: '#1B5BD9', desc: 'Quote tile · keyboard shortcuts',  delta: '+9.4%' },
    { lbl: 'Order Pad',    n: 2104, c: '#3F76E0', desc: 'Standalone order ticket',          delta: '+1.2%' },
    { lbl: 'Positions',    n: 1736, c: '#5B8DEF', desc: 'Square-off & adjust',              delta: '-3.8%' },
    { lbl: 'Holdings',     n: 1085, c: '#85A8F2', desc: 'Sell from holdings',               delta: '+0.6%' },
    { lbl: 'Scalpers',     n: 968,  c: '#0F9D6E', desc: 'Algo · scalper module',            delta: '+22.1%' },
    { lbl: 'Charts',       n: 742,  c: '#A6B6D4', desc: 'Trade-from-chart',                 delta: '+4.3%' },
    { lbl: 'Watchlist',    n: 612,  c: '#FF7A59', desc: 'Watchlist quick trade',            delta: '-1.5%' },
    { lbl: 'Basket',       n: 432,  c: '#E0A82E', desc: 'Basket / multi-leg orders',        delta: '+11.0%' },
    { lbl: 'API · 3rd party', n: 372, c: '#9CA3AF', desc: 'Algo partners',                  delta: '+8.0%' },
  ];
  const sumOrders = modules.reduce((a, m) => a + m.n, 0);
  const max = Math.max(...modules.map(m => m.n));
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Origin · by module</div>
          <div className="lid-block-title">Where orders were placed from</div>
        </div>
        <div className="lid-block-meta">{sumOrders.toLocaleString()} orders</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {modules.map(m => {
          const pct = m.n / max;
          const sharePct = Math.round(m.n / sumOrders * 100);
          const up = m.delta.startsWith('+');
          return (
            <div key={m.lbl} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 96px 70px', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: m.c }} />{m.lbl}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--muted-2)', marginTop: 1 }}>{m.desc}</div>
              </div>
              <div style={{ height: 22, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct * 100}%`, background: `linear-gradient(90deg, ${m.c}, ${m.c}cc)`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', minWidth: 50 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#fff', fontWeight: 500 }}>{m.n.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--ink)' }}>{sharePct}%</strong> of orders
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: up ? 'var(--emerald)' : 'var(--rose)', textAlign: 'right' }}>{m.delta}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoginInsightsDrawer({ accent, onClose, totalToday, avgToday, minuteTrades, cumLogins, NOW, embedded }) {
  const [day, setDay] = React.useState('today');
  const [section, setSection] = React.useState('devices');

  // Body scroll lock + ESC to close (drawer mode only)
  React.useEffect(() => {
    if (embedded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose, embedded]);

  // Hourly aggregate from minuteTrades
  const hourly = Array.from({ length: 24 }, (_, h) => {
    const slice = minuteTrades.slice(h * 60, (h + 1) * 60);
    return slice.reduce((a, b) => a + b, 0);
  });
  const peakHour = hourly.indexOf(Math.max(...hourly));
  const totalTrades = hourly.reduce((a, b) => a + b, 0);
  const avgTradesPerLogin = (totalTrades / Math.max(1, totalToday)).toFixed(2);

  // Behaviour cohorts
  const cohorts = [
    { name: 'Active traders',    n: 4127, share: 0.39, c: '#1B5BD9', delta: '+8.2%', up: true,
      desc: 'Logged in 3+ times and placed at least one order.' },
    { name: 'Browsers',          n: 3284, share: 0.31, c: '#5B8DEF', delta: '+2.1%', up: true,
      desc: 'Logged in but did not place an order.' },
    { name: 'Funds movers',      n: 1582, share: 0.15, c: '#0F9D6E', delta: '+12.4%', up: true,
      desc: 'Initiated a deposit, withdrawal or SIP action.' },
    { name: 'Watchlist watchers',n: 1086, share: 0.10, c: '#FF7A59', delta: '-3.0%', up: false,
      desc: 'Modified watchlist or set price alert; no trade.' },
    { name: 'Single-tap exits',  n: 538,  share: 0.05, c: '#A6B6D4', delta: '-14.6%', up: false,
      desc: 'Session shorter than 12 seconds, no action.' }
  ];

  // Drop-off funnel
  const funnel = [
    { lbl: 'Opened app',           n: 11_204, },
    { lbl: 'Authenticated',        n: 10_861, },
    { lbl: 'Reached home',         n: 10_402, },
    { lbl: 'Viewed quote / chart', n: 8_947,  },
    { lbl: 'Tapped order ticket',  n: 5_318,  },
    { lbl: 'Placed order',         n: 4_127,  },
  ];
  const funnelMax = funnel[0].n;

  // Top instruments traded
  const instruments = [
    { sym: 'RELIANCE',  trades: 1284, vol: '₹4.82 Cr', dir: 'buy', },
    { sym: 'HDFCBANK',  trades: 968,  vol: '₹3.41 Cr', dir: 'buy', },
    { sym: 'NIFTY 24800 CE', trades: 742,  vol: '₹1.12 Cr', dir: 'buy',  isOpt: true },
    { sym: 'INFY',      trades: 612,  vol: '₹2.04 Cr', dir: 'sell',},
    { sym: 'TATAMOTORS',trades: 504,  vol: '₹1.78 Cr', dir: 'buy', },
    { sym: 'BANKNIFTY 51500 PE', trades: 488, vol: '₹0.92 Cr', dir: 'sell', isOpt: true },
    { sym: 'ICICIBANK', trades: 421,  vol: '₹1.61 Cr', dir: 'buy', },
    { sym: 'SBIN',      trades: 398,  vol: '₹1.18 Cr', dir: 'sell',},
  ];

  // Anomalies / flags
  const flags = [
    { time: '09:21', sev: 'warn',   text: 'Login spike +312% vs 30-day avg at market open',  src: 'auth-svc' },
    { time: '10:48', sev: 'info',   text: '4,127 active traders crossed — earliest in 30 days', src: 'analytics' },
    { time: '11:14', sev: 'danger', text: '38 SIP mandates failed (insufficient funds)',     src: 'sip-engine' },
    { time: '11:42', sev: 'warn',   text: 'Median order-confirm latency rose to 312 ms',     src: 'order-gw' },
  ];

  // Mini hourly bar geometry
  const HW = 660, HH = 90;
  const hMax = Math.max(...hourly) * 1.15;
  const barGap = 3;
  const barColW = (HW - barGap * 23) / 24;

  const fmt = (n) => n >= 100_000 ? `${(n / 100_000).toFixed(2)} L` : n.toLocaleString();

  const sections = [
    { id: 'devices',     label: 'Devices · trades' },
    { id: 'logins',      label: 'Logins by channel' },
    { id: 'modules',     label: 'Order origin' },
    { id: 'overview',    label: 'Overview' },
    { id: 'behavior',    label: 'Behaviour cohorts' },
    { id: 'funnel',      label: 'Login → Trade funnel' },
    { id: 'instruments', label: 'Top instruments' },
    { id: 'flags',       label: 'Flags & anomalies' },
  ];

  return (
    <div className="lid-overlay" onClick={onClose}>
      <div className="lid-drawer" onClick={(e) => e.stopPropagation()}>
        {!embedded && (
          <button className="lid-close lid-close-floating" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
          </button>
        )}

        <div className="lid-body">
          {section === 'overview' && (
            <>
              <div className="lid-stat-grid">
                {[
                  { lbl: 'Total logins',       v: totalToday.toLocaleString(),          d: '+11.0%', up: true,  foot: `vs 30-day avg ${avgToday.toLocaleString()}` },
                  { lbl: 'Trades placed',      v: totalTrades.toLocaleString(),         d: '+8.4%',  up: true,  foot: 'incl. options · cash · commodities' },
                  { lbl: 'Avg trades / user',  v: avgTradesPerLogin,                    d: '-2.1%',  up: false, foot: '4,127 of 10,617 logged users traded' },
                  { lbl: 'Peak login hour',    v: `${peakHour}:00`,                     d: hourly[peakHour].toLocaleString() + ' trades', up: true, foot: 'Highest activity window' },
                ].map(s => (
                  <div key={s.lbl} className="lid-stat">
                    <div className="lid-stat-lbl">{s.lbl}</div>
                    <div className="lid-stat-v" style={s.lbl === 'Total logins' ? { color: accent } : null}>{s.v}</div>
                    <div className={'lid-stat-d ' + (s.up ? 'up' : 'down')}>{s.d}</div>
                    <div className="lid-stat-foot">{s.foot}</div>
                  </div>
                ))}
              </div>

              <div className="lid-block">
                <div className="lid-block-h">
                  <div>
                    <div className="lid-block-eyebrow">Hourly</div>
                    <div className="lid-block-title">Trades per hour</div>
                  </div>
                  <div className="lid-block-meta">Peak <strong>{peakHour}:00</strong> · {hourly[peakHour].toLocaleString()} trades</div>
                </div>
                <svg viewBox={`0 0 ${HW} ${HH + 22}`} width="100%" height={HH + 22} preserveAspectRatio="none">
                  {hourly.map((v, i) => {
                    const h = (v / hMax) * HH;
                    const x = i * (barColW + barGap);
                    const isPeak = i === peakHour;
                    return (
                      <g key={i}>
                        <rect x={x} y={HH - h} width={barColW} height={h} rx="2"
                          fill={isPeak ? '#FF7A59' : accent}
                          fillOpacity={isPeak ? 1 : 0.78}/>
                      </g>
                    );
                  })}
                  {[0, 6, 12, 18, 23].map(i => (
                    <text key={i} x={i * (barColW + barGap) + barColW / 2} y={HH + 14}
                      textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="rgba(15,18,28,0.5)">
                      {i === 23 ? '23:00' : `${i}:00`}
                    </text>
                  ))}
                </svg>
              </div>

              <div className="lid-block">
                <div className="lid-block-h">
                  <div>
                    <div className="lid-block-eyebrow">Composition</div>
                    <div className="lid-block-title">Where trades happened</div>
                  </div>
                </div>
                <div className="lid-stack">
                  {[
                    { lbl: 'NSE Cash',         pct: 41, c: accent },
                    { lbl: 'NSE F&O',          pct: 32, c: '#5B8DEF' },
                    { lbl: 'BSE Cash',         pct: 14, c: '#0F9D6E' },
                    { lbl: 'Commodities',      pct: 8,  c: '#FF7A59' },
                    { lbl: 'Currency',         pct: 5,  c: '#A6B6D4' },
                  ].map(seg => (
                    <div key={seg.lbl} className="lid-stack-seg" style={{ flex: seg.pct, background: seg.c }} title={`${seg.lbl} ${seg.pct}%`} />
                  ))}
                </div>
                <div className="lid-stack-legend">
                  {[
                    { lbl: 'NSE Cash',  pct: 41, c: accent },
                    { lbl: 'NSE F&O',   pct: 32, c: '#5B8DEF' },
                    { lbl: 'BSE Cash',  pct: 14, c: '#0F9D6E' },
                    { lbl: 'Commodities', pct: 8, c: '#FF7A59' },
                    { lbl: 'Currency',  pct: 5,  c: '#A6B6D4' },
                  ].map(seg => (
                    <span key={seg.lbl} className="lid-legend-item">
                      <span className="lid-legend-sw" style={{ background: seg.c }} />
                      {seg.lbl} <strong>{seg.pct}%</strong>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {section === 'devices' && (
            <DevicesSection accent={accent} totalTrades={totalTrades} />
          )}

          {section === 'logins' && (
            <LoginsByChannelSection accent={accent} />
          )}

          {section === 'modules' && (
            <OrderOriginSection accent={accent} totalTrades={totalTrades} />
          )}

          {section === 'behavior' && (
            <div className="lid-block">
              <div className="lid-block-h">
                <div>
                  <div className="lid-block-eyebrow">Cohorts</div>
                  <div className="lid-block-title">How {totalToday.toLocaleString()} sessions broke down</div>
                </div>
                <div className="lid-block-meta">Click a cohort to filter the dashboard</div>
              </div>
              <div className="lid-cohorts">
                {cohorts.map(c => (
                  <div key={c.name} className="lid-cohort">
                    <div className="lid-cohort-bar">
                      <div className="lid-cohort-fill" style={{ width: `${c.share * 100}%`, background: c.c }} />
                    </div>
                    <div className="lid-cohort-row">
                      <div>
                        <div className="lid-cohort-name"><span className="lid-cohort-sw" style={{ background: c.c }} />{c.name}</div>
                        <div className="lid-cohort-desc">{c.desc}</div>
                      </div>
                      <div className="lid-cohort-stat">
                        <div className="lid-cohort-n">{c.n.toLocaleString()}</div>
                        <div className={'lid-cohort-d ' + (c.up ? 'up' : 'down')}>{c.delta} <span className="lid-cohort-pct">{Math.round(c.share * 100)}%</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'funnel' && (
            <div className="lid-block">
              <div className="lid-block-h">
                <div>
                  <div className="lid-block-eyebrow">Funnel</div>
                  <div className="lid-block-title">From open to placed order</div>
                </div>
                <div className="lid-block-meta">Conversion <strong>{Math.round(funnel[funnel.length - 1].n / funnel[0].n * 100)}%</strong></div>
              </div>
              <div className="lid-funnel">
                {funnel.map((step, i) => {
                  const w = step.n / funnelMax;
                  const drop = i > 0 ? (funnel[i - 1].n - step.n) : 0;
                  const dropPct = i > 0 ? Math.round(drop / funnel[i - 1].n * 100) : 0;
                  return (
                    <div key={step.lbl} className="lid-funnel-row">
                      <div className="lid-funnel-lbl">{step.lbl}</div>
                      <div className="lid-funnel-track">
                        <div className="lid-funnel-fill" style={{ width: `${w * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}cc)` }}>
                          <span className="lid-funnel-n">{step.n.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="lid-funnel-side">
                        {i === 0 ? <span className="muted">start</span> : (
                          <><span className="lid-funnel-drop">−{drop.toLocaleString()}</span><span className="lid-funnel-droppct">{dropPct}% drop</span></>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {section === 'instruments' && (
            <div className="lid-block">
              <div className="lid-block-h">
                <div>
                  <div className="lid-block-eyebrow">Top instruments</div>
                  <div className="lid-block-title">Most traded today</div>
                </div>
              </div>
              <table className="lid-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th style={{ textAlign: 'right' }}>Trades</th>
                    <th style={{ textAlign: 'right' }}>Volume</th>
                    <th>Net dir.</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {instruments.map(it => {
                    const max = Math.max(...instruments.map(x => x.trades));
                    return (
                      <tr key={it.sym}>
                        <td>
                          <span className="lid-sym">{it.sym}</span>
                          {it.isOpt && <span className="lid-opt-tag">OPT</span>}
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>{it.trades.toLocaleString()}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>{it.vol}</td>
                        <td>
                          <span className={'lid-dir lid-dir-' + it.dir}>
                            {it.dir === 'buy' ? '↑ Buy' : '↓ Sell'}
                          </span>
                        </td>
                        <td>
                          <div className="lid-mini-bar"><div style={{ width: `${(it.trades / max) * 100}%`, background: accent }} /></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {section === 'flags' && (
            <div className="lid-block">
              <div className="lid-block-h">
                <div>
                  <div className="lid-block-eyebrow">Flags</div>
                  <div className="lid-block-title">Anomalies & alerts today</div>
                </div>
                <div className="lid-block-meta">{flags.length} events</div>
              </div>
              <div className="lid-flags">
                {flags.map((f, i) => (
                  <div key={i} className={'lid-flag lid-flag-' + f.sev}>
                    <div className="lid-flag-time">{f.time}</div>
                    <div className="lid-flag-text">{f.text}</div>
                    <div className="lid-flag-src">{f.src}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lid-foot">
          <div className="muted" style={{ fontSize: 12 }}>
            Data from <strong>analytics-svc</strong> · refreshed every 60s
          </div>

        </div>
      </div>
    </div>
  );
}

// Login analysis — minute-resolution stock-style line + per-minute trade bars
function LoginAnalysisChart() {
  const tw = (typeof window !== 'undefined' && window.__loginTweaks) || {};
  const accent = tw.accent || '#1B5BD9';
  const svgRef = React.useRef(null);
  const [hover, setHover] = React.useState(null);
  const [insightsOpen, setInsightsOpen] = React.useState(false);

  // Full day: 12 AM → 11:59 PM = 1440 minutes. "Now" = ~12:25 PM = minute 745.
  const SESSION = 1440;
  const NOW = 745;

  // Deterministic per-minute trade counts (jagged, with quiet pockets)
  const seed = (n) => { const x = Math.sin(n * 12.9898 + 7.13) * 43758.5453; return x - Math.floor(x); };
  const minuteTrades = Array.from({ length: SESSION }, (_, i) => {
    if (i > NOW) return 0;
    const t = i / SESSION;
    // Bell-ish profile: open burst, mid-day dip, close ramp
    const profile = 90 + 110 * Math.exp(-Math.pow((t - 0.05) * 6, 2)) +
                          70 * Math.exp(-Math.pow((t - 0.95) * 6, 2)) -
                          50 * Math.exp(-Math.pow((t - 0.55) * 5, 2));
    const noise = (seed(i) - 0.5) * 70 + (seed(i + 99) - 0.5) * 30;
    const v = Math.max(0, Math.round(profile + noise));
    // Inject a few quiet (zero-trade) minutes
    return seed(i + 31) < 0.06 ? 0 : v;
  });
  const cumLogins = minuteTrades.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + Math.round(v * 0.42 + 6 + seed(i + 5) * 8)); return acc; }, []);
  const totalToday = cumLogins[NOW] || 0;

  // 30-day avg cumulative @ same point — a smoother, slightly lower curve to whole session
  const avgCum = Array.from({ length: SESSION }, (_, i) => {
    const t = i / SESSION;
    const peak = totalToday * 0.94 / Math.tanh(3); // scale
    return Math.round(peak * Math.tanh(t * 3));
  });

  const W = 1200, HLine = 280, HBar = 70, GAP = 8, H = HLine + GAP + HBar;
  const pad = { l: 18, r: 24, t: 16, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerHL = HLine - pad.t - pad.b;
  const xs = (i) => pad.l + i / (SESSION - 1) * innerW;
  const lineMax = Math.max(cumLogins[NOW], avgCum[SESSION - 1]) * 1.06;
  const ys = (v) => pad.t + innerHL - v / lineMax * innerHL;

  // Sharp polyline (jagged, no smoothing) up to NOW
  const todayLine = cumLogins.slice(0, NOW + 1).map((v, i) => `${i ? 'L' : 'M'}${xs(i)},${ys(v)}`).join(' ');
  const avgLine = avgCum.map((v, i) => `${i ? 'L' : 'M'}${xs(i)},${ys(v)}`).join(' ');
  const todayArea = `${todayLine} L${xs(NOW)},${pad.t + innerHL} L${xs(0)},${pad.t + innerHL} Z`;

  const nowX = xs(NOW);
  const nowY = ys(cumLogins[NOW]);

  // Bar row geometry
  const barTop = HLine + GAP;
  const barBot = barTop + HBar - 14;
  const barMaxV = Math.max(...minuteTrades) || 1;
  const barW = innerW / SESSION * 0.85;

  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
  const tickIdx = [0, 240, 480, 720, 960, 1200, 1439];
  const tickLabels = ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM', '11:59 PM'];

  const onMove = (e) => {
    const svg = svgRef.current; if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * W;
    const t = (px - pad.l) / innerW;
    const i = Math.max(0, Math.min(SESSION - 1, Math.round(t * (SESSION - 1))));
    setHover({ idx: i });
  };
  const onLeave = () => setHover(null);

  let tip = null;
  if (hover) {
    const i = hover.idx;
    const tx = xs(i);
    const inToday = i <= NOW;
    const ty = inToday ? ys(cumLogins[i]) : ys(avgCum[i]);
    const trades = minuteTrades[i] || 0;
    const mobile = Math.round(trades * 0.58);
    const web = Math.round(trades * 0.28);
    const desktop = trades - mobile - web;
    const flipLeft = tx > W * 0.62;
    const hour = Math.floor(i / 60);
    const min = i % 60;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour > 12 ? hour - 12 : hour;
    const label = `${h12}:${String(min).padStart(2, '0')} ${ampm}`;
    const loginsMin = inToday ? (i === 0 ? cumLogins[0] : cumLogins[i] - cumLogins[i - 1]) : null;
    const totalLoginsToday = cumLogins[NOW];
    tip = { i, tx, ty, inToday, trades, mobile, web, desktop, flipLeft, label,
            cum: inToday ? cumLogins[i] : null, avg: avgCum[i], loginsMin, totalLoginsToday };
  }

  return (
    <>
    <div className="card">
      <div className="card-head">
        <h3>Login analysis</h3>
        <span className="badge badge-info"><span className="badge-dot"></span>Live · 5s</span>
        <span className="badge" style={{ background: 'rgba(15,157,110,0.10)', color: 'var(--emerald)', borderColor: 'rgba(15,157,110,0.25)' }}>
          <span className="badge-dot" style={{ background: 'var(--emerald)' }}></span>Login API · 142 ms
        </span>
        <div className="card-actions">
          <button className="btn btn-sm btn-accent insights-btn" onClick={() => window.__navigate && window.__navigate('login-insights')}>
            <Icon name="bolt" size={12} stroke={2} /> Insights
            <Icon name="arrowRight" size={11} stroke={2} />
          </button>
        </div>
      </div>
      <div className="card-body" style={{ paddingBottom: 12 }}>

        <div style={{ display: 'flex', gap: 56, marginBottom: 14 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />Today
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', color: accent, lineHeight: 1.1, marginTop: 2 }}>
              {fmt(totalToday)}<span style={{ fontSize: 14, fontWeight: 500, color: accent, opacity: 0.8, marginLeft: 6 }}>logins</span>
            </div>
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--muted)' }} />30D Average
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--muted)', lineHeight: 1.1, marginTop: 2 }}>
              {fmt(avgCum[NOW])}<span style={{ fontSize: 14, fontWeight: 500, opacity: 0.85, marginLeft: 6 }}>logins</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 12 }}>
            {(() => {
              const dist = [
                { lbl: 'Mobile', n: Math.round(totalToday * 0.58), c: '#1B5BD9' },
                { lbl: 'Web',    n: Math.round(totalToday * 0.30), c: '#5B8DEF' },
                { lbl: 'APIs',   n: Math.round(totalToday * 0.12), c: '#A6B6D4' }
              ];
              const sum = dist.reduce((a, b) => a + b.n, 0);
              const C = 2 * Math.PI * 22; // r=22
              let off = 0;
              return (
                <>
                  <svg viewBox="0 0 60 60" width="60" height="60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                    <circle cx="30" cy="30" r="22" fill="none" stroke="#EEF1F6" strokeWidth="10" />
                    {dist.map((d, i) => {
                      const len = (d.n / sum) * C;
                      const seg = <circle key={i} cx="30" cy="30" r="22" fill="none"
                        stroke={d.c} strokeWidth="10"
                        strokeDasharray={`${len} ${C - len}`}
                        strokeDashoffset={-off} />;
                      off += len;
                      return seg;
                    })}
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 12, fontFamily: 'var(--sans)' }}>
                    {dist.map(d => (
                      <div key={d.lbl} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink)' }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: d.c, flexShrink: 0 }} />
                        <span style={{ minWidth: 46 }}>{d.lbl}</span>
                        <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{Math.round(d.n / sum * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none"
            onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'block', cursor: 'crosshair' }}>
            <defs>
              <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
                <stop offset="100%" stopColor={accent} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal gridlines */}
            {[0, 1, 2, 3, 4, 5].map(i =>
              <line key={i} x1={pad.l} x2={W - pad.r}
                y1={pad.t + i * innerHL / 5} y2={pad.t + i * innerHL / 5}
                stroke="#EEF1F6" strokeWidth="1" />
            )}

            {/* Today area + jagged stock-style line */}
            <path d={todayArea} fill="url(#area-grad)" />
            {/* 30-day avg subtle gray */}
            <path d={avgLine} stroke="#C8CDD8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={todayLine} stroke={accent} strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />

            {/* Now marker */}
            <line x1={nowX} x2={nowX} y1={pad.t} y2={pad.t + innerHL} stroke="rgba(15,18,28,0.12)" strokeWidth="1" />
            <circle cx={nowX} cy={nowY} r="4.5" fill={accent} stroke="#fff" strokeWidth="1.5" />

            {/* Per-minute trade bars (only when trades > 0) */}
            <line x1={pad.l} x2={W - pad.r} y1={barBot} y2={barBot} stroke="#E6E9F0" strokeWidth="1" />
            {minuteTrades.map((v, i) => {
              if (!v) return null;
              const h = (v / barMaxV) * (HBar - 18);
              const x = xs(i) - barW / 2;
              return <rect key={i} x={x} y={barBot - h} width={barW} height={h}
                fill={accent} fillOpacity="0.55" />;
            })}

            {/* Time tick labels */}
            {tickIdx.map((i, k) =>
              <text key={k} x={xs(i)} y={H - 6}
                textAnchor={k === 0 ? 'start' : k === tickIdx.length - 1 ? 'end' : 'middle'}
                fontSize="11" fontFamily="var(--mono)" fill="rgba(15,18,28,0.55)">
                {tickLabels[k]}
              </text>
            )}
            {tickIdx.map((i, k) =>
              <line key={'t' + k} x1={xs(i)} x2={xs(i)} y1={barBot} y2={barBot + 4}
                stroke="rgba(15,18,28,0.3)" strokeWidth="1" />
            )}

            {/* Hover crosshair */}
            {tip && (
              <g style={{ pointerEvents: 'none' }}>
                <line x1={tip.tx} x2={tip.tx} y1={pad.t} y2={barBot}
                  stroke={accent} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={tip.tx} cy={tip.ty} r="4.5" fill={tip.inToday ? accent : '#8A93A6'} stroke="#fff" strokeWidth="1.5" />
              </g>
            )}
          </svg>

          {tip && (
            <div style={{
              position: 'absolute',
              left: tip.flipLeft ? 'auto' : `calc(${tip.tx / W * 100}% + 14px)`,
              right: tip.flipLeft ? `calc(${(1 - tip.tx / W) * 100}% + 14px)` : 'auto',
              top: `calc(${tip.ty / H * 100}% - 8px)`,
              transform: 'translateY(-50%)',
              background: '#0F121C', color: '#fff', borderRadius: 10,
              padding: '12px 14px', minWidth: 230,
              boxShadow: '0 10px 30px rgba(15,18,28,0.25)',
              fontFamily: 'var(--sans)', fontSize: 12, pointerEvents: 'none', zIndex: 4
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {tip.label}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: 4 }}>
                <span style={{ color: accent }}>Total logins · today</span>
                <span style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700, color: accent }}>{tip.totalLoginsToday != null ? tip.totalLoginsToday.toLocaleString() : '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Logins this minute</span>
                <span style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600 }}>{tip.loginsMin != null ? tip.loginsMin.toLocaleString() : '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Trades this minute</span>
                <span style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600 }}>{tip.trades.toLocaleString()}</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>By device</div>
              {[
                { lbl: 'Mobile',  n: tip.mobile,  c: '#FF7A59' },
                { lbl: 'Web',     n: tip.web,     c: '#5B8DEF' },
                { lbl: 'Desktop', n: tip.desktop, c: '#9CA3AF' }
              ].map(row => {
                const pct = tip.trades ? Math.round(row.n / tip.trades * 100) : 0;
                return (
                  <div key={row.lbl} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 36px', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{row.lbl}</span>
                    <span style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                      <span style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: row.c, borderRadius: 2 }} />
                    </span>
                    <span style={{ fontFamily: 'var(--mono)', textAlign: 'right', color: 'rgba(255,255,255,0.85)' }}>{row.n}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    {insightsOpen && (
      <LoginInsightsDrawer
        accent={accent}
        onClose={() => setInsightsOpen(false)}
        totalToday={totalToday}
        avgToday={avgCum[NOW]}
        minuteTrades={minuteTrades}
        cumLogins={cumLogins}
        NOW={NOW}
      />
    )}
    </>);

}

// Minute-by-minute login bar chart — last 60 minutes
function MinuteLoginBars() {
  const tw = (typeof window !== 'undefined' && window.__loginTweaks) || {};
  const window_min = tw.windowMin || 60;
  const accent = tw.accent || 'var(--primary)';
  const showRolling = tw.showRolling !== false;

  // Generate stable minute counts (hash-based) so the chart doesn't jitter on re-render
  const seed = (n) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const data = Array.from({ length: window_min }, (_, i) => {
    const t = i / window_min;
    const trend = 40 + 60 * Math.exp(-Math.pow((t - 0.7) * 3, 2));
    const noise = (seed(i + 17) - 0.5) * 30;
    return Math.max(8, Math.round(trend + noise));
  });
  const max = Math.max(...data) * 1.15;

  // Rolling mean (window 5)
  const rolling = data.map((_, i) => {
    const s = Math.max(0, i - 4);
    const slice = data.slice(s, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });

  const W = 760, H = 180, pad = { l: 36, r: 16, t: 14, b: 24 };
  const innerW = W - pad.l - pad.r, innerH = H - pad.t - pad.b;
  const barW = innerW / data.length * 0.72;
  const gap = innerW / data.length;
  const ys = (v) => pad.t + innerH - v / max * innerH;
  const total = data.reduce((a, b) => a + b, 0);
  const peak = Math.max(...data);
  const peakIdx = data.indexOf(peak);

  const rollingPath = rolling.map((v, i) => {
    const x = pad.l + i * gap + gap / 2;
    return `${i ? 'L' : 'M'}${x},${ys(v)}`;
  }).join(' ');

  return (
    <div className="card">
      <div className="card-head">
        <h3>Logins · per minute</h3>
        <span className="badge"><span className="badge-dot" style={{ background: 'var(--emerald)' }} />Streaming</span>
        <div className="card-actions">
          <span className="muted" style={{ fontSize: 12 }}>Last {window_min} min</span>
          <button className="btn btn-sm btn-ghost"><Icon name="download" size={12} /></button>
        </div>
      </div>
      <div className="card-body" style={{ paddingBottom: 12 }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 10 }}>
          <div>
            <div className="label-mono">Total · window</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{total.toLocaleString()}</div>
          </div>
          <div>
            <div className="label-mono">Peak · {window_min - peakIdx}m ago</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{peak}/min</div>
          </div>
          <div>
            <div className="label-mono">Avg / min</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{Math.round(total / window_min)}</div>
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
          {[0, 1, 2, 3].map((i) =>
            <line key={i} x1={pad.l} x2={W - pad.r}
              y1={pad.t + i * innerH / 3} y2={pad.t + i * innerH / 3}
              stroke="#EFF1F5" strokeWidth="1" />
          )}
          {[0, 0.5, 1].map((p, i) =>
            <text key={i} x={pad.l - 6} y={pad.t + (1 - p) * innerH + 3}
              textAnchor="end" fontSize="10" fontFamily="var(--mono)" fill="#8A93A6">
              {Math.round(max * p)}
            </text>
          )}
          {[0, 15, 30, 45, 60].map((m, i) =>
            <text key={m} x={pad.l + (1 - m / 60) * innerW} y={H - 6}
              textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="#8A93A6">
              {m === 0 ? 'now' : `-${m}m`}
            </text>
          )}
          {data.map((v, i) => {
            const x = pad.l + i * gap + (gap - barW) / 2;
            const h = innerH - (ys(v) - pad.t);
            const isPeak = i === peakIdx;
            return (
              <rect key={i} x={x} y={ys(v)} width={barW} height={h} rx="1.5"
                fill={isPeak ? 'var(--coral)' : accent}
                opacity={isPeak ? 1 : 0.78} />
            );
          })}
          {showRolling &&
            <path d={rollingPath} stroke="#0B0F17" strokeOpacity="0.45"
              strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
          }
        </svg>
      </div>
    </div>);

}

// Right column — system status
function genTiles(status, n = 60) {
  // returns ['ok'|'warn'|'err', ...] of length n
  const out = [];
  const failRate = status === 'op' ? 0.02 : status === 'deg' ? 0.18 : 0.55;
  const warnRate = status === 'op' ? 0.06 : status === 'deg' ? 0.30 : 0.20;
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    // recent slice (last 8 tiles) skews worse for non-op
    const recent = i > n - 10 && status !== 'op';
    if (recent && r < failRate * 1.4) out.push('err');
    else if (r < failRate) out.push('err');
    else if (r < failRate + warnRate) out.push('warn');
    else out.push('ok');
  }
  return out;
}

function SystemStatus() {
  const [open, setOpen] = useState(null);
  const services = useMemo(() => [
    {
      key: 'trade',
      name: 'Trading Engine',
      status: 'op',
      glyph: '⤴',
      latency: { val: 38, unit: 'ms', delta: '−4ms' },
      lastRun: '00:08 sec ago',
      failRate: { val: '0.00', unit: '%', delta: '−0.01pp' },
      uptime: '99.99%',
      throughput: '4,128 req/min',
      errorBudget: '98% remaining',
      region: 'BLR · 3 AZs',
      deps: [['NSE', 'op'], ['BSE', 'op'], ['Risk Engine', 'op']],
      incidents: [],
      runbook: 'rb/trading-engine'
    },
    {
      key: 'kyc',
      name: 'KYC Pipeline',
      status: 'op',
      glyph: '✓',
      latency: { val: 142, unit: 'ms', delta: '+12ms' },
      lastRun: '00:14 sec ago',
      failRate: { val: '0.18', unit: '%', delta: '−0.04pp' },
      uptime: '99.96%',
      throughput: '218 req/min',
      errorBudget: '92% remaining',
      region: 'BLR · 2 AZs',
      deps: [['CVL', 'op'], ['Aadhaar OKYC', 'op'], ['DigiLocker', 'op']],
      incidents: [{ t: '2d ago', m: 'CVL slowness · auto-resolved in 4m', sev: 'warn' }],
      runbook: 'rb/kyc-pipeline'
    },
    {
      key: 'pay',
      name: 'Payments · ICICI',
      status: 'deg',
      glyph: '₹',
      latency: { val: 480, unit: 'ms', delta: '+312ms' },
      lastRun: '00:21 sec ago',
      failRate: { val: '2.41', unit: '%', delta: '+1.8pp' },
      uptime: '99.42%',
      throughput: '92 req/min',
      errorBudget: '38% remaining',
      region: 'MUM · 2 AZs',
      deps: [['ICICI VPN', 'deg'], ['HDFC fallback', 'op'], ['Razorpay', 'op']],
      incidents: [
        { t: '08 min ago', m: 'p95 above 400ms threshold (ICICI primary)', sev: 'warn' },
        { t: '22 min ago', m: '7× upstream timeouts in 60s window',         sev: 'err' }
      ],
      runbook: 'rb/payments-icici'
    },
    {
      key: 'nse',
      name: 'NSE Feed',
      status: 'op',
      glyph: '◆',
      latency: { val: 18, unit: 'ms', delta: '+1ms' },
      lastRun: '00:02 sec ago',
      failRate: { val: '0.00', unit: '%', delta: '0' },
      uptime: '99.99%',
      throughput: '12,840 ticks/sec',
      errorBudget: '99% remaining',
      region: 'BOM colo',
      deps: [['NSE multicast A', 'op'], ['NSE multicast B', 'op']],
      incidents: [],
      runbook: 'rb/nse-feed'
    },
    {
      key: 'bse',
      name: 'BSE Feed',
      status: 'op',
      glyph: '◆',
      latency: { val: 22, unit: 'ms', delta: '−2ms' },
      lastRun: '00:02 sec ago',
      failRate: { val: '0.00', unit: '%', delta: '0' },
      uptime: '99.99%',
      throughput: '4,210 ticks/sec',
      errorBudget: '99% remaining',
      region: 'BOM colo',
      deps: [['BSE multicast', 'op']],
      incidents: [],
      runbook: 'rb/bse-feed'
    },
    {
      key: 'notif',
      name: 'Notifications',
      status: 'op',
      glyph: '✉',
      latency: { val: 210, unit: 'ms', delta: '+8ms' },
      lastRun: '00:31 sec ago',
      failRate: { val: '0.42', unit: '%', delta: '+0.1pp' },
      uptime: '99.91%',
      throughput: '14,212 sent/min',
      errorBudget: '82% remaining',
      region: 'Multi-region',
      deps: [['Twilio', 'op'], ['SES', 'op'], ['FCM', 'op'], ['MSG91', 'deg']],
      incidents: [{ t: '14m ago', m: 'MSG91 SMS retry rate elevated', sev: 'warn' }],
      runbook: 'rb/notifications'
    },
    {
      key: 'sip',
      name: 'SIP Scheduler',
      status: 'down',
      glyph: '⧖',
      latency: { val: '—', unit: '', delta: '' },
      lastRun: '04:12 min ago',
      failRate: { val: '100', unit: '%', delta: '+99.8pp' },
      uptime: '—',
      throughput: '0 jobs/min',
      errorBudget: '0% remaining',
      region: 'BLR · 2 AZs',
      deps: [['Mandate API', 'op'], ['Worker pool', 'down']],
      incidents: [
        { t: '04 min ago', m: 'Worker pool unresponsive · pager fired', sev: 'err' },
        { t: '08 min ago', m: 'Heartbeat missed (3 consecutive)',       sev: 'err' }
      ],
      runbook: 'rb/sip-scheduler'
    }
  ].map(s => ({ ...s, tiles: genTiles(s.status, 60) })), []);

  const tone = { op: 'var(--emerald)', deg: 'var(--amber)', down: 'var(--rose)' };
  const tileColor = { ok: 'var(--emerald)', warn: 'var(--amber)', err: 'var(--rose)' };
  const sevDot = { warn: 'var(--amber)', err: 'var(--rose)', info: 'var(--primary)' };
  const statusPill = { op: ['Healthy', 'badge-success'], deg: ['Degraded', 'badge-warn'], down: ['Critical', 'badge-danger'] };

  return (
    <div className="card">
      <div className="card-head">
        <h3>System health</h3>
        <span className="badge"><span className="badge-dot" style={{ background: 'var(--emerald)' }} />6 of 7 healthy</span>
        <span className="label-mono" style={{ fontSize: 11, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 0 3px rgba(15,157,110,0.18)' }} />
          Last checked 12s ago
        </span>
        <div className="card-actions">
          <button className="btn btn-sm btn-ghost">View status page <Icon name="arrowRight" size={11} /></button>
        </div>
      </div>
      <div className="card-body" style={{ padding: '12px 14px 14px' }}>
        {services.map(s => {
          const c = tone[s.status];
          const [pillTxt, pillCls] = statusPill[s.status];
          const isOpen = open === s.key;
          return (
            <div key={s.key} className={"svc-row" + (isOpen ? ' open' : '')}>
              <div className="svc-head" onClick={() => setOpen(isOpen ? null : s.key)}>
                <span className="svc-icon" style={{ color: c }}>{s.glyph}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="svc-name">{s.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>p95 {s.latency.val}{s.latency.unit} · uptime {s.uptime}</div>
                </div>
                <span className="sr-spark" title="latency — last 12 checks">
                  {(s.spark || s.tiles.slice(-12).map(t => t === 'ok' ? 4 : t === 'warn' ? 7 : 9)).map((v, j, a) => (
                    <span key={j} style={{ height: Math.max(2, (typeof v === 'number' ? v : 4) / 9 * 18), background: c, opacity: 0.35 + (j / a.length) * 0.65 }} />
                  ))}
                </span>
                <span className={"badge " + pillCls} style={{ width: 86, justifyContent: 'center' }}>
                  <span className="badge-dot" />{pillTxt}
                </span>
                <span className="svc-chev">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              {isOpen && (
                <div className="svc-detail">
                  <div className="panel" style={{ gridColumn: '1 / -1' }}>
                    <div className="svc-stats" style={{ padding: 0, marginBottom: 12 }}>
                      <div className="svc-stat">
                        <div className="lbl">Avg latency</div>
                        <div className="val">{s.latency.val}<span className="u">{s.latency.unit}</span></div>
                      </div>
                      <div className="svc-stat">
                        <div className="lbl">Failure rate</div>
                        <div className="val">{s.failRate.val}<span className="u">{s.failRate.unit}</span></div>
                      </div>
                    </div>
                    <div className="svc-tiles" style={{ padding: 0 }} title="last 60 health checks · oldest → newest">
                      {s.tiles.map((t, i) => (
                        <span key={i} className="t" style={{ background: tileColor[t] }} />
                      ))}
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-h">
                      <span>Last 24 hours</span>
                      <span className="label-mono" style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--muted)' }}>SLO 99.9%</span>
                    </div>
                    <div className="svc-metric-grid">
                      <div className="svc-metric">
                        <div className="lbl">Throughput</div>
                        <div className="val">{s.throughput}</div>
                      </div>
                      <div className="svc-metric">
                        <div className="lbl">Uptime · 30d</div>
                        <div className="val">{s.uptime}</div>
                      </div>
                      <div className="svc-metric">
                        <div className="lbl">Error budget</div>
                        <div className="val" style={{ color: s.status === 'down' ? 'var(--rose)' : s.status === 'deg' ? 'var(--amber)' : 'var(--ink)' }}>{s.errorBudget}</div>
                      </div>
                      <div className="svc-metric">
                        <div className="lbl">p95 trend</div>
                        <div className="val" style={{ fontSize: 14 }}>{s.latency.delta || '—'}</div>
                      </div>
                      <div className="svc-metric">
                        <div className="lbl">Failure Δ vs 7d</div>
                        <div className="val" style={{ fontSize: 14 }}>{s.failRate.delta || '0'}</div>
                      </div>
                      <div className="svc-metric">
                        <div className="lbl">Region</div>
                        <div className="val" style={{ fontSize: 14 }}>{s.region}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <div className="panel-h" style={{ marginBottom: 8 }}>Dependencies</div>
                      <div className="svc-deps">
                        {s.deps.map(([n, st]) => (
                          <span key={n} className="svc-dep">
                            <span className="dot" style={{ background: tone[st] }} />{n}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="svc-actions">
                      <button className="btn btn-sm"><Icon name="refresh" size={11} /> Re-run health check</button>
                      <button className="btn btn-sm">View logs</button>
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-h">
                      <span>Recent incidents</span>
                      <span className="label-mono" style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--muted)' }}>{s.incidents.length} active</span>
                    </div>
                    {s.incidents.length === 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)', padding: '8px 0' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)' }} />
                        No incidents in the last 7 days. Last failure 11d ago.
                      </div>
                    ) : (
                      <div className="svc-incidents">
                        {s.incidents.map((inc, i) => (
                          <div key={i} className="row">
                            <span className="pip" style={{ background: sevDot[inc.sev] }} />
                            <span style={{ color: 'var(--ink)' }}>{inc.m}</span>
                            <span className="label-mono" style={{ color: 'var(--muted)' }}>{inc.t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: 14 }}>
                      <div className="panel-h" style={{ marginBottom: 8 }}>On-call</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                        <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#4762E3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>RM</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500 }}>Rohan Mehta</div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>SRE · pager active · responds &lt; 5 min</div>
                        </div>
                        <button className="btn btn-sm">Notify</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>);

}

function HourlyHeatmap() {
  // 7 days × 24 hours
  const data = Array.from({ length: 7 }, (_, d) => Array.from({ length: 24 }, (_, h) => {
    const peak = Math.exp(-Math.pow(h - 18, 2) / 40) + 0.3 * Math.exp(-Math.pow(h - 10, 2) / 40);
    const wk = d === 5 || d === 6 ? 0.6 : 1;
    return Math.min(1, peak * wk * (0.7 + Math.random() * 0.6));
  }));
  const heat = (v) => `rgba(71,98,227,${0.08 + v * 0.85})`;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="card" data-comment-anchor="ef8ca847fc-div-395-5">
      <div className="card-head">
        <h3>Login heatmap</h3>
        <span className="muted" style={{ fontSize: 12 }}>Last 7 days · IST</span>
        <div className="card-actions">
          <span className="label-mono">low</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => <div key={v} style={{ width: 12, height: 12, borderRadius: 3, background: heat(v) }} />)}
          </div>
          <span className="label-mono">high</span>
        </div>
      </div>
      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 6, alignItems: 'center' }}>
          {data.map((row, d) =>
          <React.Fragment key={d}>
              <div className="label-mono">{days[d]}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: 2 }}>
                {row.map((v, h) => <div key={h} title={`${days[d]} ${h}:00 — ${Math.round(v * 1200)}`} style={{ aspectRatio: 1, borderRadius: 3, background: heat(v) }} />)}
              </div>
            </React.Fragment>
          )}
          <div></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: 2, marginTop: 4 }}>
            {Array.from({ length: 24 }, (_, h) =>
            <div key={h} className="label-mono" style={{ textAlign: 'center', fontSize: 9 }}>{h % 4 === 0 ? h : ''}</div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

function ActivityFeed() {
  // Daily operational checklist — replaces a generic activity feed.
  // Each task has a status: done | pending | failed | running | scheduled.
  // Pending/failed tasks expose an inline action button so ops can complete
  // them from the dashboard without navigating elsewhere.
  const tasks = [
    { id: 'bod',       group: 'Open of day',  label: 'BOD process',                 sub: 'Symbol master · risk limits · margins',   status: 'done',     when: '09:01 IST · ops@codifi',                action: null },
    { id: 'health',    group: 'Open of day',  label: 'Health check',                sub: 'API · DB · order gateway · feeds',        status: 'done',     when: '09:04 IST · 24 / 24 services green',     action: null },
    { id: 'holdings',  group: 'Files',        label: 'Holdings upload',             sub: 'DP + T1 holdings file',                   status: 'done',     when: '09:18 IST · 41,820 rows',                action: null },
    { id: 'positions', group: 'Files',        label: 'Position file upload',        sub: '04 of 12 segments ingested',              status: 'pending',  when: 'expected by 09:30 IST',                  action: { label: 'Upload positions', kind: 'positions' } },
    { id: 'margin',    group: 'Files',        label: 'Margin file upload',          sub: 'SPAN · ELM · exposure',                   status: 'failed',   when: 'last attempt 09:22 · checksum mismatch', action: { label: 'Upload margin file', kind: 'margin' } },
    { id: 'ohlc',      group: 'Files',        label: 'OHLC chart synchronisation',  sub: 'NSE EQ · BSE EQ · NFO · CDS',             status: 'running',  when: 'syncing · 38% complete',                 action: null },
    { id: 'contract',  group: 'Close of day', label: 'Contract note dispatch',      sub: 'Email + WhatsApp delivery',               status: 'scheduled', when: 'scheduled 16:30 IST',                   action: null },
    { id: 'eod',       group: 'Close of day', label: 'EOD reconciliation',          sub: 'Trades · ledger · obligation',            status: 'scheduled', when: 'scheduled 17:15 IST',                   action: null },
  ];

  const statusMap = {
    done:      { label: 'Completed', color: 'var(--emerald)', icon: 'check' },
    pending:   { label: 'Pending',   color: 'var(--amber)',   icon: 'bolt' },
    failed:    { label: 'Failed',    color: 'var(--rose)',    icon: 'flag' },
    running:   { label: 'Running',   color: 'var(--primary)', icon: 'refresh' },
    scheduled: { label: 'Scheduled', color: 'var(--muted)',   icon: 'activity' },
  };

  const groups = ['Open of day', 'Files', 'Close of day'];
  const total = tasks.length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const pendingCount = tasks.filter(t => t.status === 'pending' || t.status === 'failed').length;

  // Hook into the existing upload modal in PortfolioView when possible — fall
  // back to a no-op if the dashboard is open standalone.
  const triggerUpload = (kind) => {
    try {
      window.dispatchEvent(new CustomEvent('codifi:open-upload', { detail: { kind } }));
    } catch (e) { /* noop */ }
  };

  return (
    <div className="card">
      <div className="card-head">
        <h3>Today's tasks</h3>
        <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{doneCount}</span>/{total} done
            {pendingCount > 0 && <> · <span style={{ color: 'var(--rose)', fontWeight: 600 }}>{pendingCount}</span> need attention</>}
          </span>
          <button className="btn btn-sm btn-ghost">View runbook <Icon name="arrowRight" size={11} /></button>
        </div>
      </div>
      <div className="card-body" style={{ paddingTop: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {groups.map(g => {
            const rows = tasks.filter(t => t.group === g);
            if (!rows.length) return null;
            return (
              <div key={g}>
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>{g}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {rows.map(t => {
                    const s = statusMap[t.status];
                    const isAction = !!t.action;
                    return (
                      <div
                        key={t.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '22px 1fr auto auto',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 12px',
                          borderRadius: 8,
                          background: t.status === 'failed' ? 'rgba(239,68,68,0.05)' : t.status === 'pending' ? 'rgba(245,158,11,0.05)' : 'var(--bg)',
                          border: '1px solid ' + (t.status === 'failed' ? 'rgba(239,68,68,0.18)' : t.status === 'pending' ? 'rgba(245,158,11,0.18)' : 'var(--line-2)'),
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            width: 22, height: 22, borderRadius: '50%',
                            background: s.color, color: '#fff',
                            display: 'inline-grid', placeItems: 'center',
                            opacity: t.status === 'scheduled' ? 0.55 : 1,
                          }}
                        >
                          <Icon name={s.icon} size={12} stroke={2.2} />
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{t.label}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>
                            {t.sub} <span style={{ color: 'var(--muted-2)' }}>· {t.when}</span>
                          </div>
                        </div>
                        <span style={{
                          fontSize: 10.5, fontFamily: 'var(--mono)', fontWeight: 600,
                          color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>{s.label}</span>
                        {isAction ? (
                          <button
                            className="btn btn-sm"
                            onClick={() => triggerUpload(t.action.kind)}
                            style={t.status === 'failed' ? { borderColor: 'var(--rose)', color: 'var(--rose)' } : {}}
                          >
                            <Icon name="upload" size={12} /> {t.action.label}
                          </button>
                        ) : <span />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>);

}

function DashboardView() {
  const [tab, setTab] = React.useState('login');
  return (
    <>
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login Analytics</button>
        <button className={tab === 'health' ? 'active' : ''} onClick={() => setTab('health')}>System Health</button>
        <button className={tab === 'actions' ? 'active' : ''} onClick={() => setTab('actions')}>Daily Actions</button>
      </div>
      {tab === 'login' && <>
        <KpiStrip />
        <LoginAnalysisChart />
        <LoginAnalyticsExtra />
      </>}
      {tab === 'health' && <SystemStatus />}
      {tab === 'actions' && <ActivityFeed />}
      <CodifiFoot />
    </>);

}

window.DashboardView = DashboardView;

// ============================================================================
// Login Insights page — 6 sections: Funnel, Devices, Module origin, Top traders,
// Top F&O contracts, Rejection analysis. Pure CSS-variable theming.
// ============================================================================

function CustomerFunnelSection() {
  const steps = [
    { lbl: 'Active customers', n: 124680, sub: 'KYC complete · account live',         c: 'var(--primary)' },
    { lbl: 'Logged in today',  n:  68420, sub: 'unique sessions · 09:00–15:30',       c: 'var(--primary)' },
    { lbl: 'With funds',       n:  41280, sub: 'available margin > ₹1,000',      c: 'var(--primary)' },
    { lbl: 'Traded',           n:  18964, sub: 'placed at least one order',           c: 'var(--primary)' },
  ];
  const top = steps[0].n;
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Customer funnel</div>
          <div className="lid-block-title">From active base to today’s traders</div>
        </div>
        <div className="lid-block-meta">
          {steps[0].n.toLocaleString()} → {steps[steps.length - 1].n.toLocaleString()}
          {' · '}
          <strong style={{ color: 'var(--ink)' }}>
            {(steps[steps.length - 1].n / steps[0].n * 100).toFixed(1)}%
          </strong> end-to-end
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((s, i) => {
          const w = s.n / top;
          const fromPrev = i === 0 ? null : (s.n / steps[i - 1].n);
          const dropped = i === 0 ? 0 : steps[i - 1].n - s.n;
          return (
            <div key={s.lbl} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 110px 130px', alignItems: 'center', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)', minWidth: 14 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{s.lbl}</span>
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--muted-2)', marginTop: 2, marginLeft: 22 }}>{s.sub}</div>
              </div>
              <div style={{ position: 'relative', height: 32, background: 'var(--canvas)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${w * 100}%`,
                  background: s.c,
                  opacity: 1 - i * 0.18,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  minWidth: 80,
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#fff', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                    {s.n.toLocaleString()}
                  </span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--muted)', textAlign: 'right' }}>
                <strong style={{ color: 'var(--ink)' }}>{(s.n / top * 100).toFixed(1)}%</strong> of base
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, textAlign: 'right' }}>
                {fromPrev == null
                  ? <span style={{ color: 'var(--muted-2)' }}>baseline</span>
                  : <>
                      <span style={{ color: 'var(--ink)' }}>{(fromPrev * 100).toFixed(1)}%</span>
                      <span style={{ color: 'var(--rose)', marginLeft: 6 }}>−{dropped.toLocaleString()}</span>
                    </>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModuleOriginSection() {
  const [hover, setHover] = React.useState(null);
  // 5 modules per spec, each with sub-breakdown
  const modules = [
    {
      lbl: 'Market Watch',
      n: 7842,
      c: 'var(--primary)',
      desc: 'Quote tile · keyboard shortcuts',
      subs: [
        { lbl: 'Mobile', n: 5096 },
        { lbl: 'Web',    n: 2746 },
      ],
    },
    {
      lbl: 'Scalper',
      n: 4218,
      c: 'var(--emerald)',
      desc: 'Algo · single-click entry',
      subs: [
        { lbl: 'Mobile', n: 1518 },
        { lbl: 'Web',    n: 2700 },
      ],
    },
    {
      lbl: 'Options Chain',
      n: 3604,
      c: 'var(--amber)',
      desc: 'Strike table · OI ladder',
      subs: [
        { lbl: 'Mobile', n: 2234 },
        { lbl: 'Web',    n: 1370 },
      ],
    },
    {
      lbl: 'Basket',
      n: 1968,
      c: 'var(--violet)',
      desc: 'Multi-leg · staggered execution',
      subs: [
        { lbl: 'Mobile', n:  784 },
        { lbl: 'Web',    n: 1184 },
      ],
    },
    {
      lbl: 'Others',
      n: 1332,
      c: 'var(--coral)',
      desc: 'Charts, Holdings, API, Watchlist',
      subs: [
        { lbl: 'Mobile', n: 786 },
        { lbl: 'Web',    n: 546 },
      ],
    },
  ];
  const total = modules.reduce((a, m) => a + m.n, 0);
  const C = 2 * Math.PI * 64;
  let off = 0;
  const segs = modules.map(m => {
    const len = (m.n / total) * C;
    const seg = { ...m, len, off };
    off += len;
    return seg;
  });
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Trades · origin by module</div>
          <div className="lid-block-title">Where orders were placed from</div>
        </div>
        <div className="lid-block-meta">{total.toLocaleString()} orders</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 180, height: 180 }}>
          <svg viewBox="0 0 180 180" width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="90" cy="90" r="64" fill="none" stroke="var(--line-2)" strokeWidth="22" />
            {segs.map((s, i) => {
              const dim = hover != null && hover !== i;
              return (
                <circle key={i} cx="90" cy="90" r="64" fill="none" stroke={s.c} strokeWidth="22"
                  strokeDasharray={`${Math.max(0, s.len - 2)} ${C - Math.max(0, s.len - 2)}`} strokeDashoffset={-s.off}
                  style={{ opacity: dim ? 0.25 : 1, transition: 'opacity .12s', cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                    setHover(i);
                  }}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', pointerEvents: 'none' }}>
            {hover != null ? (
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>{modules[hover].lbl}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: modules[hover].c }}>{modules[hover].n.toLocaleString()}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{Math.round(modules[hover].n / total * 100)}% of orders</div>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Orders</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{total.toLocaleString()}</div>
              </div>
            )}
          </div>
          {hover != null && (
            <div style={{
              position: 'absolute', left: '50%', top: -8,
              transform: 'translate(-50%, -100%)',
              background: 'var(--ink)', color: '#fff',
              padding: '8px 12px', borderRadius: 8,
              fontSize: 11.5, lineHeight: 1.5,
              minWidth: 160, pointerEvents: 'none',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: modules[hover].c }} />
                {modules[hover].lbl}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--mono)' }}>
                <span style={{ opacity: 0.7 }}>Orders</span>
                <span>{modules[hover].n.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--mono)' }}>
                <span style={{ opacity: 0.7 }}>Share</span>
                <span>{Math.round(modules[hover].n / total * 100)}%</span>
              </div>
              {modules[hover].subs.map(s => (
                <div key={s.lbl} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--mono)', opacity: 0.85 }}>
                  <span style={{ opacity: 0.7 }}>{s.lbl}</span>
                  <span>{s.n.toLocaleString()} · {Math.round(s.n / modules[hover].n * 100)}%</span>
                </div>
              ))}
              <div style={{
                position: 'absolute', left: '50%', bottom: -5,
                transform: 'translateX(-50%) rotate(45deg)',
                width: 10, height: 10, background: 'var(--ink)',
              }} />
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {modules.map(m => {
            const pct = Math.round(m.n / total * 100);
            const max = Math.max(...m.subs.map(s => s.n));
            return (
              <div key={m.lbl} style={{ borderLeft: `3px solid ${m.c}`, paddingLeft: 10 }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{m.lbl}</div>
                <div style={{ fontSize: 10, color: 'var(--muted-2)', marginTop: 1, lineHeight: 1.35 }}>{m.desc}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: m.c }}>{m.n.toLocaleString()}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)' }}>{pct}%</span>
                </div>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.subs.map(s => {
                    const subPct = Math.round(s.n / m.n * 100);
                    return (
                      <div key={s.lbl}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                          <span style={{ fontSize: 10.5, color: 'var(--ink-2)' }}>{s.lbl}</span>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{s.n.toLocaleString()}</span>
                        </div>
                        <div style={{ height: 3, background: 'var(--canvas)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${subPct * 100 / 100}%`, height: '100%', background: m.c, borderRadius: 2 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TopTradersSection() {
  const segOpts = ['NSE-EQ', 'NSE-FO', 'BSE-EQ', 'MCX', 'CDS'];
  const traders = [
    { id: 'CDF000142', name: 'Aarav Mehta',         trades: 184, turnover: 12480000, segs: ['NSE-EQ','NSE-FO'],         pnl:  248400 },
    { id: 'CDF000287', name: 'Saanvi Iyer',         trades: 162, turnover:  9842000, segs: ['NSE-FO','MCX'],             pnl:  184200 },
    { id: 'CDF001054', name: 'Vihaan Banerjee',     trades: 148, turnover:  8960000, segs: ['NSE-EQ','BSE-EQ'],          pnl:   92840 },
    { id: 'CDF000981', name: 'Ananya Kapoor',       trades: 132, turnover:  7240000, segs: ['NSE-FO'],                   pnl: -148200 },
    { id: 'CDF000642', name: 'Reyansh Subramanian', trades: 121, turnover:  6580000, segs: ['NSE-EQ','NSE-FO','MCX'],    pnl:   62400 },
    { id: 'CDF000418', name: 'Diya Chowdhury',      trades: 118, turnover:  5910000, segs: ['NSE-EQ'],                   pnl:   42180 },
    { id: 'CDF002134', name: 'Aditya Pillai',       trades: 109, turnover:  5240000, segs: ['NSE-FO','CDS'],             pnl:  -28400 },
    { id: 'CDF000573', name: 'Ishaan Reddy',        trades: 102, turnover:  4860000, segs: ['NSE-EQ','BSE-EQ'],          pnl:   18420 },
    { id: 'CDF001872', name: 'Kavya Nair',          trades:  96, turnover:  4280000, segs: ['NSE-FO'],                   pnl:   34980 },
    { id: 'CDF000199', name: 'Arjun Deshmukh',      trades:  91, turnover:  3920000, segs: ['MCX'],                      pnl:  -12480 },
  ];
  const fmtINR = (n) => '₹' + Math.abs(n).toLocaleString('en-IN');
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Leaderboard</div>
          <div className="lid-block-title">Top 10 traders today</div>
        </div>
        <div className="lid-block-meta">By trade count · session 09:15–15:30</div>
      </div>
      <div style={{ overflow: 'hidden', border: '1px solid var(--line)', borderRadius: 8 }}>
        <table className="data" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 44 }}>#</th>
              <th>Client</th>
              <th className="num" style={{ textAlign: 'right' }}>Trades</th>
              <th className="num" style={{ textAlign: 'right' }}>Turnover</th>
              <th>Segments</th>
              <th className="num" style={{ textAlign: 'right' }}>P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {traders.map((t, i) => (
              <tr key={t.id}>
                <td>
                  <span style={{
                    display: 'inline-grid', placeItems: 'center',
                    width: 22, height: 22, borderRadius: 6,
                    background: i < 3 ? 'var(--primary-50)' : 'var(--canvas)',
                    color: i < 3 ? 'var(--primary)' : 'var(--muted)',
                    fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600,
                  }}>{i + 1}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{t.name}</div>
                  <div className="col-id" style={{ fontSize: 11, marginTop: 1 }}>{t.id}</div>
                </td>
                <td className="num" style={{ textAlign: 'right' }}>{t.trades.toLocaleString()}</td>
                <td className="num" style={{ textAlign: 'right' }}>{fmtINR(t.turnover)}</td>
                <td>
                  <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 4 }}>
                    {t.segs.map(s => (
                      <span key={s} className="badge" style={{ fontSize: 10 }}>{s}</span>
                    ))}
                  </span>
                </td>
                <td className="num" style={{ textAlign: 'right', color: t.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)', fontWeight: 500 }}>
                  {t.pnl >= 0 ? '+' : '−'}{fmtINR(t.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TopFnoSection() {
  const contracts = [
    { sym: 'NIFTY 22500 CE',     type: 'CE', expiry: '08 May', volume: 12480000, oi:  +18.2, price: 142.85 },
    { sym: 'BANKNIFTY 48000 PE', type: 'PE', expiry: '08 May', volume:  9824000, oi:  +12.4, price: 218.40 },
    { sym: 'NIFTY 22400 PE',     type: 'PE', expiry: '08 May', volume:  8612000, oi:   -4.8, price:  84.20 },
    { sym: 'RELIANCE 2900 CE',   type: 'CE', expiry: '29 May', volume:  4204000, oi:  +24.6, price:  62.10 },
    { sym: 'BANKNIFTY 48500 CE', type: 'CE', expiry: '08 May', volume:  3982000, oi:   +8.9, price: 184.65 },
    { sym: 'HDFCBANK 1500 CE',   type: 'CE', expiry: '29 May', volume:  3428000, oi:  +14.2, price:  18.40 },
    { sym: 'NIFTY 22600 CE',     type: 'CE', expiry: '08 May', volume:  3104000, oi:   -2.1, price:  72.35 },
    { sym: 'TCS 3800 PE',        type: 'PE', expiry: '29 May', volume:  2864000, oi:  +32.4, price:  46.80 },
    { sym: 'INFY 1450 CE',       type: 'CE', expiry: '29 May', volume:  2412000, oi:   +6.8, price:  24.60 },
    { sym: 'NIFTY 22300 PE',     type: 'PE', expiry: '08 May', volume:  2208000, oi:  -10.4, price:  42.10 },
  ];
  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">F&amp;O leaderboard</div>
          <div className="lid-block-title">Top 10 contracts by volume</div>
        </div>
        <div className="lid-block-meta">NSE F&amp;O · today</div>
      </div>
      <div style={{ overflow: 'hidden', border: '1px solid var(--line)', borderRadius: 8 }}>
        <table className="data" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 44 }}>#</th>
              <th>Contract</th>
              <th>Type</th>
              <th>Expiry</th>
              <th className="num" style={{ textAlign: 'right' }}>Volume</th>
              <th className="num" style={{ textAlign: 'right' }}>OI Δ</th>
              <th className="num" style={{ textAlign: 'right' }}>Avg price</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, i) => (
              <tr key={c.sym}>
                <td>
                  <span style={{
                    display: 'inline-grid', placeItems: 'center',
                    width: 22, height: 22, borderRadius: 6,
                    background: i < 3 ? 'var(--primary-50)' : 'var(--canvas)',
                    color: i < 3 ? 'var(--primary)' : 'var(--muted)',
                    fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600,
                  }}>{i + 1}</span>
                </td>
                <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{c.sym}</td>
                <td>
                  <span className={'badge ' + (c.type === 'CE' ? 'badge-success' : 'badge-danger')}>
                    <span className="badge-dot"></span>{c.type}
                  </span>
                </td>
                <td style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11.5 }}>{c.expiry}</td>
                <td className="num" style={{ textAlign: 'right' }}>{c.volume.toLocaleString()}</td>
                <td className="num" style={{ textAlign: 'right', color: c.oi >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>
                  {c.oi >= 0 ? '+' : ''}{c.oi.toFixed(1)}%
                </td>
                <td className="num" style={{ textAlign: 'right' }}>₹{c.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RejectionAnalysisSection() {
  const [hoverH, setHoverH] = React.useState(null);
  const reasons = [
    { lbl: 'Insufficient margin',         n: 1248, sev: 'rose',    desc: 'Available margin < required' },
    { lbl: 'Price out of circuit',        n:  842, sev: 'amber',   desc: 'LTP outside DPR band' },
    { lbl: 'Symbol not allowed',          n:  612, sev: 'amber',   desc: 'Restricted scrip / GSM stage' },
    { lbl: 'Order qty > freeze limit',    n:  428, sev: 'amber',   desc: 'Per-order quantity cap exceeded' },
    { lbl: 'Session timeout',             n:  318, sev: 'muted',   desc: 'Token expired mid-flight' },
    { lbl: 'Risk-rule (MIS square-off)',  n:  204, sev: 'rose',    desc: 'Auto square-off window' },
    { lbl: 'Connectivity · exchange',n:  142, sev: 'muted',   desc: 'Gateway timeout or 5xx' },
    { lbl: 'Duplicate client order id',   n:   84, sev: 'muted',   desc: 'COID collision in 5s window' },
  ];
  const totalRej = reasons.reduce((a, r) => a + r.n, 0);
  const max = Math.max(...reasons.map(r => r.n));
  const sevColor = (s) => s === 'rose' ? 'var(--rose)' : s === 'amber' ? 'var(--amber)' : 'var(--muted)';

  // Hourly rejection trend (24 hours, only market hours have meaningful data)
  const hourly = Array.from({ length: 24 }, (_, h) => {
    if (h < 9 || h > 15) return Math.round(8 + Math.sin(h) * 4 + Math.abs(Math.cos(h * 1.3)) * 6);
    const t = (h - 9) / 6;
    const profile = 280 * Math.exp(-Math.pow((t - 0.05) * 4, 2)) + 120 * Math.exp(-Math.pow((t - 0.95) * 4, 2)) + 80;
    const noise = Math.sin(h * 7.3) * 28 + Math.cos(h * 3.1) * 18;
    return Math.max(0, Math.round(profile + noise));
  });
  const peakH = hourly.indexOf(Math.max(...hourly));

  // Line geometry
  const W = 720, H = 180;
  const pad = { l: 36, r: 12, t: 14, b: 26 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const yMax = Math.max(...hourly) * 1.12;
  const xAt = (i) => pad.l + (i / 23) * innerW;
  const yAt = (v) => pad.t + innerH - (v / yMax) * innerH;
  const linePath = hourly.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(v)}`).join(' ');
  const areaPath = `${linePath} L ${xAt(23)} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`;
  const yTicks = [0, Math.round(yMax / 2), Math.round(yMax)];

  return (
    <div className="lid-block">
      <div className="lid-block-h">
        <div>
          <div className="lid-block-eyebrow">Rejection analysis</div>
          <div className="lid-block-title">Why orders were rejected today</div>
        </div>
        <div className="lid-block-meta">
          {totalRej.toLocaleString()} rejections · peak <strong style={{ color: 'var(--ink)' }}>{peakH}:00</strong>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 10 }}>By reason</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {reasons.map((r, i) => {
              const w = r.n / max;
              const pct = (r.n / totalRej * 100).toFixed(1);
              return (
                <div key={r.lbl} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)', textAlign: 'right' }}>{i + 1}</span>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <div>
                        <span style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{r.lbl}</span>
                        <span style={{ fontSize: 10.5, color: 'var(--muted-2)', marginLeft: 8 }}>{r.desc}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--ink)' }}>{r.n.toLocaleString()}</strong> · {pct}%
                      </span>
                    </div>
                    <div style={{ height: 8, background: 'var(--canvas)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${w * 100}%`, height: '100%', background: sevColor(r.sev), borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 10 }}>Hourly trend</div>
          <div style={{ position: 'relative' }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const xRel = ((e.clientX - rect.left) / rect.width) * W;
              const i = Math.round(((xRel - pad.l) / innerW) * 23);
              setHoverH(i >= 0 && i <= 23 ? i : null);
            }}
            onMouseLeave={() => setHoverH(null)}>
            {yTicks.map((t, i) => (
              <g key={i}>
                <line x1={pad.l} x2={W - pad.r} y1={yAt(t)} y2={yAt(t)} stroke="var(--line-2)" strokeDasharray="3 3" />
                <text x={pad.l - 6} y={yAt(t) + 3} fontSize="9.5" fontFamily="var(--mono)" fill="var(--muted-2)" textAnchor="end">{t.toLocaleString()}</text>
              </g>
            ))}
            <path d={areaPath} fill="var(--rose)" fillOpacity="0.08" />
            <path d={linePath} stroke="var(--rose)" strokeWidth="1.6" fill="none" />
            {hourly.map((v, i) => i === peakH && hoverH === null && (
              <g key={i}>
                <line x1={xAt(i)} x2={xAt(i)} y1={yAt(v)} y2={pad.t + innerH} stroke="var(--rose)" strokeDasharray="2 2" strokeOpacity="0.5" />
                <circle cx={xAt(i)} cy={yAt(v)} r="3.5" fill="var(--rose)" stroke="var(--surface)" strokeWidth="1.5" />
                <text x={xAt(i)} y={yAt(v) - 8} fontSize="10" fontFamily="var(--mono)" fill="var(--rose)" textAnchor="middle" fontWeight="600">{v.toLocaleString()}</text>
              </g>
            ))}
            {hoverH !== null && (
              <g style={{ pointerEvents: 'none' }}>
                <line x1={xAt(hoverH)} x2={xAt(hoverH)} y1={pad.t} y2={pad.t + innerH} stroke="var(--ink)" strokeOpacity="0.18" />
                <circle cx={xAt(hoverH)} cy={yAt(hourly[hoverH])} r="4" fill="var(--rose)" stroke="var(--surface)" strokeWidth="2" />
              </g>
            )}
            {[0, 6, 9, 12, 15, 18, 23].map(h => (
              <text key={h} x={xAt(h)} y={H - 8} fontSize="9.5" fontFamily="var(--mono)" fill="var(--muted-2)" textAnchor="middle">
                {h === 23 ? '23:00' : `${h}:00`}
              </text>
            ))}
          </svg>
          {hoverH !== null && (() => {
            const v = hourly[hoverH];
            const pctOfPeak = Math.round(v / hourly[peakH] * 100);
            const session = hoverH < 9 || hoverH > 15 ? 'Off-hours' : (hoverH < 10 ? 'Open' : hoverH > 14 ? 'Close' : 'Mid-day');
            // Position tooltip; keep within container
            const xPct = (xAt(hoverH) / W) * 100;
            const flipLeft = xPct > 70;
            return (
              <div style={{
                position: 'absolute',
                left: `${xPct}%`,
                top: `${(yAt(v) / H) * 100}%`,
                transform: `translate(${flipLeft ? '-100%' : '0%'}, calc(-100% - 10px))`,
                marginLeft: flipLeft ? -8 : 8,
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 6,
                padding: '8px 10px',
                boxShadow: '0 6px 18px rgba(15, 23, 42, 0.12)',
                pointerEvents: 'none',
                minWidth: 140,
                zIndex: 5,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {String(hoverH).padStart(2, '0')}:00 – {String((hoverH + 1) % 24).padStart(2, '0')}:00
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)' }}>{session}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, color: 'var(--rose)', letterSpacing: '-0.01em' }}>
                    {v.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>rejections</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  <span>{pctOfPeak}% of peak</span>
                  <span>{(v / totalRej * 100).toFixed(1)}% of day</span>
                </div>
              </div>
            );
          })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginInsightsView() {
  // Synthesise totalTrades for the existing DevicesSection (kept as-is per spec)
  const totalTrades = 18964;
  return (
    <div style={{ marginTop: -4, display: 'flex', flexDirection: 'column' }}>
      <CustomerFunnelSection />
      <DevicesSection accent="var(--primary)" totalTrades={totalTrades} />
      <ModuleOriginSection />
      <TopTradersSection />
      <TopFnoSection />
      <RejectionAnalysisSection />
    </div>
  );
}
window.LoginInsightsView = LoginInsightsView;

function LoginAnalyticsExtra() {
  const accent = '#1B5BD9';
  const emerald = '#0F9D6E';
  const amber = '#C2790B';
  const rose = '#D43A45';

  // 1. Login → Trade conversion (revenue funnel)
  const funnel = [
    { lbl: 'Placed a trade',       n: 4128, c: accent,  sub: '₹248.4 Cr turnover' },
    { lbl: 'Viewed, no trade',     n: 2284, c: '#7E97D9', sub: 'orderbook · watchlist' },
    { lbl: 'Logged in, idle',      n:  971, c: '#D7DEEA', sub: 'no actions in session' }
  ];
  const fSum = funnel.reduce((a, b) => a + b.n, 0);
  const C = 2 * Math.PI * 36;
  let off = 0;
  const tradePct = (funnel[0].n / fSum * 100).toFixed(1);

  // 2. Engagement by client tier (revenue concentration)
  const tiers = [
    { lbl: 'HNI (₹50L+)',       active: 412,  total: 487,  delta: '+8.2%' },
    { lbl: 'Premium (₹10–50L)', active: 1284, total: 1542, delta: '+4.1%' },
    { lbl: 'Pro trader',        active: 928,  total: 1102, delta: '+12.4%' },
    { lbl: 'Retail',            active: 4218, total: 9241, delta: '−2.1%' },
    { lbl: 'Dormant >30d',      active: 541,  total: 1911, delta: '+24.8%' }
  ];

  // 3. Consecutive login streak — stickiness cohorts
  const streaks = [
    { lbl: '30+ days',  n: 1842, c: accent },
    { lbl: '14–29',     n: 2104, c: '#3D77E0' },
    { lbl: '7–13',      n: 1521, c: '#6E94E5' },
    { lbl: '3–6',       n: 982,  c: '#A0B8EC' },
    { lbl: '1–2',       n: 854,  c: '#CFDBF2' }
  ];
  const sMax = Math.max(...streaks.map(s => s.n));
  const sSum = streaks.reduce((a, b) => a + b.n, 0);
  const stickyPct = ((streaks[0].n + streaks[1].n) / sSum * 100).toFixed(0);

  // 4. Re-engagement opportunities (upsell pipeline)
  const reEngage = [
    { lbl: 'Dormant returned today',  n: 184, sub: 'idle 30–90d · ₹6.2 Cr AUM',   tone: 'good',   action: 'Trigger welcome-back nudge' },
    { lbl: 'HNI not seen in 7d',      n: 38,  sub: '₹14.8 Cr AUM at risk',        tone: 'warn',   action: 'Assign to RM' },
    { lbl: 'Churn-risk (no login 14d)', n: 421, sub: 'avg AUM ₹2.1 L',            tone: 'bad',    action: 'Send reactivation campaign' },
    { lbl: 'Funded but never traded', n: 92,  sub: '₹48 L unutilized margin',     tone: 'warn',   action: 'Onboarding outreach' }
  ];
  const toneColor = { good: emerald, warn: amber, bad: rose };

  const cardSty = { padding: '16px 18px' };
  const ttl = { fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>

      {/* 1. Login → Trade conversion */}
      <div className="card" style={cardSty}>
        <div style={ttl}>
          <span>Login → trade conversion · today</span>
          <span className="label-mono">{fSum.toLocaleString()} sessions</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg viewBox="0 0 90 90" width="92" height="92" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="45" cy="45" r="36" fill="none" stroke="#EEF1F6" strokeWidth="12" />
              {funnel.map((d, i) => {
                const len = (d.n / fSum) * C;
                const seg = <circle key={i} cx="45" cy="45" r="36" fill="none"
                  stroke={d.c} strokeWidth="12"
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-off} />;
                off += len;
                return seg;
              })}
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 18, color: accent, lineHeight: 1 }}>{tradePct}%</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>traded</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {funnel.map(d => (
              <div key={d.lbl} style={{ display: 'grid', gridTemplateColumns: '8px 1fr auto', alignItems: 'baseline', columnGap: 8, rowGap: 0, fontSize: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: d.c, alignSelf: 'center' }} />
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{d.lbl}</span>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 13 }}>{d.n.toLocaleString()}</span>
                <span></span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{d.sub}</span>
                <span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Engagement by client tier */}
      <div className="card" style={cardSty}>
        <div style={ttl}>
          <span>Engagement by client tier · today</span>
          <span className="label-mono">active / total · vs 7d avg</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tiers.map(t => {
            const pct = t.active / t.total * 100;
            const isHni = t.lbl.startsWith('HNI');
            const isDormant = t.lbl.startsWith('Dormant');
            const positive = t.delta.startsWith('+');
            return (
              <div key={t.lbl} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 70px 56px', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isHni && <span style={{ fontSize: 10 }}>★</span>}
                  <span style={{ fontWeight: isHni ? 600 : 400 }}>{t.lbl}</span>
                </span>
                <span style={{ position: 'relative', height: 8, background: '#F1F3F8', borderRadius: 3, overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: isDormant ? amber : isHni ? emerald : accent, borderRadius: 3 }} />
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>{t.active.toLocaleString()}/{t.total.toLocaleString()}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, color: positive ? emerald : rose, textAlign: 'right' }}>{t.delta}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Consecutive login streaks */}
      <div className="card" style={cardSty}>
        <div style={ttl}>
          <span>Consecutive-login streaks</span>
          <span className="label-mono">{stickyPct}% sticky (14d+)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {streaks.map(s => (
            <div key={s.lbl} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 56px', alignItems: 'center', gap: 10, fontSize: 12 }}>
              <span style={{ color: 'var(--ink)' }}>{s.lbl}</span>
              <span style={{ position: 'relative', height: 8, background: '#F1F3F8', borderRadius: 3, overflow: 'hidden' }}>
                <span style={{ position: 'absolute', inset: 0, width: `${s.n / sMax * 100}%`, background: s.c, borderRadius: 3 }} />
              </span>
              <span style={{ fontFamily: 'var(--mono)', textAlign: 'right', color: 'var(--muted)' }}>{s.n.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--line-2)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
          <span>Median streak <span style={{ fontFamily: 'var(--mono)', color: 'var(--ink)', fontWeight: 500 }}>11 days</span></span>
          <span>Longest active <span style={{ fontFamily: 'var(--mono)', color: 'var(--ink)', fontWeight: 500 }}>284 days</span></span>
        </div>
      </div>

      {/* 4. Re-engagement opportunities */}
      <div className="card" style={cardSty}>
        <div style={ttl}>
          <span>Re-engagement opportunities</span>
          <span className="label-mono">action queue</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reEngage.map(r => (
            <div key={r.lbl} style={{ display: 'grid', gridTemplateColumns: '4px 1fr auto', gap: 10, alignItems: 'center', padding: '8px 10px', background: '#FAFBFD', borderRadius: 6 }}>
              <span style={{ width: 3, alignSelf: 'stretch', background: toneColor[r.tone], borderRadius: 2 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14 }}>{r.n.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink)' }}>{r.lbl}</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{r.sub}</span>
              </div>
              <button className="btn btn-sm" style={{ whiteSpace: 'nowrap' }}>{r.action}</button>
            </div>
          ))}
        </div>
      </div>

    </div>);

}


// ===== view-clients.jsx =====
// Client Management view — flat, no tabs, inline detail panel
// Stockbroker middleware admin: NSE EQ/F&O/CDS, Indian banks, ₹

const CLIENT_DATA = [
  { id: 'CDF000142', name: 'Aarav Mehta',         gender: 'M', dob: '14 Mar 1991', pan: 'AVPVK9821J',
    email: 'aarav.mehta@gmail.com',          mobile: '9821345210', segments: ['EQ','F&O'],
    status: 'active',  loggedInToday: true,  mtfActive: true,  lastSeen: '2m ago',     ordersToday: 24,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'HDFC Bank',  acct: '50100384282428', ifsc: 'HDFC0000123', primary: true },
            { name: 'ICICI Bank', acct: '628401534921',   ifsc: 'ICIC0006284', primary: false }],
    activity: { orders: 24, cancelled: 2, rejected: 1, api: 6 },
    funds:    { payIn: 250000, payOut: 80000, net: 170000, mtf: 'Active · ₹4.2 L exposure' },
    sessions: [
      { date: '07 May 2026, 09:14', source: 'Mobile · iOS 18.1',   ip: '49.207.218.42',  status: 'Active' },
      { date: '06 May 2026, 14:42', source: 'Web · Chrome 124',    ip: '49.207.218.42',  status: 'Ended' },
      { date: '06 May 2026, 09:08', source: 'Mobile · iOS 18.1',   ip: '103.21.58.190',  status: 'Ended' },
    ],
  },
  { id: 'CDF000287', name: 'Saanvi Iyer',         gender: 'F', dob: '02 Sep 1988', pan: 'AAQPS3401C',
    email: 'saanvi.iyer@outlook.com',        mobile: '9742891034', segments: ['EQ','F&O','CDS'],
    status: 'active',  loggedInToday: true,  mtfActive: true,  lastSeen: '12m ago',    ordersToday: 18,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'Kotak Mahindra Bank', acct: '4112089834510', ifsc: 'KKBK0000412', primary: true }],
    activity: { orders: 18, cancelled: 1, rejected: 0, api: 0 },
    funds:    { payIn: 0, payOut: 124000, net: -124000, mtf: 'Active · ₹2.1 L exposure' },
    sessions: [
      { date: '07 May 2026, 09:11', source: 'Web · Safari 17',     ip: '157.49.224.18',  status: 'Active' },
      { date: '06 May 2026, 13:24', source: 'Mobile · Android 14', ip: '157.49.224.18',  status: 'Ended' },
    ],
  },
  { id: 'CDF001054', name: 'Vihaan Banerjee',     gender: 'M', dob: '21 Jul 1995', pan: 'KZRPB1290D',
    email: 'vihaan.b@protonmail.com',        mobile: '8884124928', segments: ['EQ'],
    status: 'active',  loggedInToday: true,  mtfActive: false, lastSeen: '1h ago',     ordersToday: 8,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'Axis Bank', acct: '922010012845091', ifsc: 'UTIB0000922', primary: true }],
    activity: { orders: 8, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 50000, payOut: 0, net: 50000, mtf: 'Inactive' },
    sessions: [
      { date: '07 May 2026, 08:58', source: 'Mobile · Android 14', ip: '103.92.118.4',   status: 'Active' },
    ],
  },
  { id: 'CDF000981', name: 'Ananya Kapoor',       gender: 'F', dob: '11 Dec 1992', pan: 'BJTPK7762E',
    email: 'ananya.kapoor@yahoo.in',         mobile: '9819772201', segments: ['EQ','F&O'],
    status: 'blocked', loggedInToday: false, mtfActive: false, lastSeen: '4d ago',     ordersToday: 0,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'SBI', acct: '34928104732', ifsc: 'SBIN0000711', primary: true }],
    activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' },
    sessions: [
      { date: '03 May 2026, 11:08', source: 'Mobile · iOS 17.5',   ip: '202.142.118.91', status: 'Revoked' },
    ],
  },
  { id: 'CDF000642', name: 'Reyansh Subramanian', gender: 'M', dob: '06 Feb 1990', pan: 'CKIPI9930F',
    email: 'reyansh.s@infy.com',             mobile: '9986542310', segments: ['EQ','F&O','CDS'],
    status: 'active',  loggedInToday: true,  mtfActive: true,  lastSeen: '3m ago',     ordersToday: 31,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'HDFC Bank',   acct: '50100728401920', ifsc: 'HDFC0000456', primary: true },
            { name: 'IndusInd Bank', acct: '201928374650', ifsc: 'INDB0000201', primary: false }],
    activity: { orders: 31, cancelled: 4, rejected: 1, api: 12 },
    funds:    { payIn: 500000, payOut: 200000, net: 300000, mtf: 'Active · ₹6.8 L exposure' },
    sessions: [
      { date: '07 May 2026, 09:15', source: 'Web · Chrome 124',    ip: '120.138.42.18',  status: 'Active' },
      { date: '07 May 2026, 09:15', source: 'API · Algo bot',      ip: '52.66.184.220',  status: 'Active' },
    ],
  },
  { id: 'CDF000418', name: 'Diya Chowdhury',      gender: 'F', dob: '19 May 1996', pan: 'GMNPA1102A',
    email: 'diya.chowdhury@gmail.com',       mobile: '9818204182', segments: ['EQ'],
    status: 'active',  loggedInToday: true,  mtfActive: false, lastSeen: '22m ago',    ordersToday: 5,
    emailVerified: true, mobileVerified: false,
    banks: [{ name: 'Yes Bank', acct: '014291084526', ifsc: 'YESB0000142', primary: true }],
    activity: { orders: 5, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 25000, payOut: 0, net: 25000, mtf: 'Inactive' },
    sessions: [
      { date: '07 May 2026, 08:46', source: 'Mobile · iOS 18.0',   ip: '49.36.218.4',    status: 'Active' },
    ],
  },
  { id: 'CDF002134', name: 'Aditya Pillai',       gender: 'M', dob: '24 Aug 1985', pan: 'XDPGT4421R',
    email: 'aditya.pillai@startup.in',       mobile: '9849210038', segments: ['EQ','F&O'],
    status: 'dormant', loggedInToday: false, mtfActive: false, lastSeen: '32d ago',    ordersToday: 0,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'ICICI Bank', acct: '628490102218', ifsc: 'ICIC0006284', primary: true }],
    activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' },
    sessions: [
      { date: '05 Apr 2026, 15:18', source: 'Web · Firefox 120',   ip: '49.207.118.4',   status: 'Ended' },
    ],
  },
  { id: 'CDF000573', name: 'Ishaan Reddy',        gender: 'M', dob: '03 Nov 1993', pan: 'BBNPN7782W',
    email: 'ishaan.reddy@gmail.com',         mobile: '9740118203', segments: ['EQ','F&O'],
    status: 'active',  loggedInToday: true,  mtfActive: true,  lastSeen: '15m ago',    ordersToday: 12,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'HDFC Bank', acct: '50100847290412', ifsc: 'HDFC0000789', primary: true }],
    activity: { orders: 12, cancelled: 1, rejected: 0, api: 0 },
    funds:    { payIn: 100000, payOut: 50000, net: 50000, mtf: 'Active · ₹3.4 L exposure' },
    sessions: [
      { date: '07 May 2026, 09:02', source: 'Mobile · Android 14', ip: '103.42.118.220', status: 'Active' },
    ],
  },
  { id: 'CDF001872', name: 'Kavya Nair',          gender: 'F', dob: '28 Jan 1989', pan: 'EFFPR3201T',
    email: 'kavya.nair@startup.in',          mobile: '9821740028', segments: ['F&O'],
    status: 'active',  loggedInToday: false, mtfActive: false, lastSeen: '1d ago',     ordersToday: 0,
    emailVerified: false, mobileVerified: true,
    banks: [{ name: 'Federal Bank', acct: '17890021840012', ifsc: 'FDRL0001789', primary: true }],
    activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' },
    sessions: [
      { date: '06 May 2026, 14:18', source: 'Mobile · iOS 18.1',   ip: '49.207.42.118',  status: 'Ended' },
    ],
  },
  { id: 'CDF000199', name: 'Arjun Deshmukh',      gender: 'M', dob: '07 Jun 1987', pan: 'YFPBN8801M',
    email: 'arjun.deshmukh@bose.in',         mobile: '9912038481', segments: ['EQ','CDS'],
    status: 'dormant', loggedInToday: false, mtfActive: false, lastSeen: '48d ago',    ordersToday: 0,
    emailVerified: true, mobileVerified: true,
    banks: [{ name: 'Bank of Baroda', acct: '20910028471092', ifsc: 'BARB0BARODA', primary: true }],
    activity: { orders: 0, cancelled: 0, rejected: 0, api: 0 },
    funds:    { payIn: 0, payOut: 0, net: 0, mtf: 'Inactive' },
    sessions: [
      { date: '20 Mar 2026, 10:42', source: 'Web · Chrome 122',    ip: '157.49.218.4',   status: 'Ended' },
    ],
  },
];

const STATUS_BADGE = {
  active:  ['badge-success', 'Active'],
  blocked: ['badge-danger',  'Blocked'],
  dormant: ['badge',         'Dormant']
};

const AVATAR_COLORS = ['#4762E3', '#FF7A59', '#0F9D6E', '#8B5CF6', '#C2790B', '#D43A45', '#0EA5B7'];
const avatarColor = (s) => AVATAR_COLORS[s.charCodeAt(0) % AVATAR_COLORS.length];
const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase();

const maskEmail = (e) => {
  const [u, d] = e.split('@');
  if (!u || !d) return e;
  return u.slice(0, 2) + '***@' + d;
};
const maskMobile = (m) => m.length < 6 ? m : m.slice(0, 2) + '*****' + m.slice(-3);
const maskAccount = (a) => '****' + a.slice(-4);
const fmtINR = (n) => '₹' + Math.abs(n).toLocaleString('en-IN');

function ClientsView() {
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [query, setQuery] = useState('');

  const matches = (c) => {
    if (filter === 'active' && c.status !== 'active') return false;
    if (filter === 'logged-in' && !c.loggedInToday) return false;
    if (filter === 'blocked' && c.status !== 'blocked') return false;
    if (filter === 'dormant' && c.status !== 'dormant') return false;
    if (filter === 'mtf' && !c.mtfActive) return false;
    if (query) {
      const q = query.toLowerCase();
      if (![c.name, c.id, c.email, c.mobile].some(s => s.toLowerCase().includes(q))) return false;
    }
    return true;
  };
  const filtered = CLIENT_DATA.filter(matches);

  const counts = {
    all: CLIENT_DATA.length,
    active: CLIENT_DATA.filter(c => c.status === 'active').length,
    'logged-in': CLIENT_DATA.filter(c => c.loggedInToday).length,
    blocked: CLIENT_DATA.filter(c => c.status === 'blocked').length,
    dormant: CLIENT_DATA.filter(c => c.status === 'dormant').length,
    mtf: CLIENT_DATA.filter(c => c.mtfActive).length,
  };

  const pills = [
    { id: 'all',       lbl: 'All' },
    { id: 'active',    lbl: 'Active' },
    { id: 'logged-in', lbl: 'Logged in today' },
    { id: 'blocked',   lbl: 'Blocked' },
    { id: 'dormant',   lbl: 'Dormant' },
    { id: 'mtf',       lbl: 'MTF active' },
  ];

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <div className="cm-stat-card" style={{ marginBottom: 14 }}>
        {[
          { id: 'all',       label: 'All customers',   value: counts.all,           sub: 'onboarded',  color: 'var(--primary)' },
          { id: 'logged-in', label: 'Logged-in today', value: counts['logged-in'],  sub: `${Math.round(counts['logged-in'] / counts.all * 100)}% of base`, color: 'var(--emerald)' },
          { id: 'dormant',   label: 'Dormant',         value: counts.dormant,       sub: '30d+ inactive', color: 'var(--amber)' },
          { id: 'mtf',       label: 'MTF active',      value: counts.mtf,           sub: 'margin funded', color: 'var(--violet)' },
        ].map(k => (
          <div key={k.id} className="cm-stat">
            <div className="cm-stat-lbl">{k.label}</div>
            <div className="cm-stat-v">
              <span className="num" style={{ color: k.color }}>{k.value.toLocaleString('en-IN')}</span>
              <span className="sub">{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cm-filter-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'all',       lbl: 'All' },
            { id: 'active',    lbl: 'Active' },
            { id: 'logged-in', lbl: 'Logged in' },
            { id: 'blocked',   lbl: 'Blocked' },
          ].map(p => (
            <button
              key={p.id}
              type="button"
              className={'cm-pill' + (filter === p.id ? ' active' : '')}
              onClick={() => setFilter(p.id)}
            >
              {p.lbl}
              <span className="cm-pill-count">{counts[p.id].toLocaleString('en-IN')}</span>
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="filter-input">
            <Icon name="search" size={13} />
            <input placeholder="Name, user ID, email, mobile…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="btn btn-accent"><Icon name="plus" size={13} /> Add client</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        {selected.size > 0 && (
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--line-2)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary)' }}>
              {selected.size} selected
            </span>
            <button className="btn btn-sm">Bulk logout</button>
            <button className="btn btn-sm" style={{ color: 'var(--rose)' }}>Block</button>
            <button className="btn btn-sm">Revoke sessions</button>
            <button className="btn btn-sm btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => setSelected(new Set())}>Clear</button>
          </div>
        )}
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <span className={'cbx' + (selected.size === filtered.length && filtered.length ? ' checked' : '')}
                    onClick={() => setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(x => x.id)))} />
                </th>
                <th>Client</th>
                <th>User ID</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Last login</th>
                <th className="num" style={{ textAlign: 'right' }}>Orders today</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const [sCls, sLab] = STATUS_BADGE[c.status];
                const isOpen = openId === c.id;
                return (
                  <tr key={c.id}
                    onClick={() => setOpenId(isOpen ? null : c.id)}
                    style={{ cursor: 'pointer', background: isOpen ? 'var(--primary-50)' : undefined }}>
                    <td onClick={(e) => { e.stopPropagation(); toggle(c.id); }}>
                      <span className={'cbx' + (selected.has(c.id) ? ' checked' : '')} />
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="av" style={{ background: avatarColor(c.name) }}>{initials(c.name)}</div>
                        <div>
                          <div className="uc-name">{c.name}</div>
                          <div className="uc-sub">{maskEmail(c.email)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="col-id">{c.id}</td>
                    <td className="num" style={{ color: 'var(--muted)' }}>{maskMobile(c.mobile)}</td>
                    <td><span className={'badge ' + sCls}><span className="badge-dot" />{sLab}</span></td>
                    <td className="num" style={{ color: 'var(--muted)' }}>{c.lastSeen}</td>
                    <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>{c.ordersToday.toLocaleString('en-IN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Showing 1–{filtered.length} of {CLIENT_DATA.length.toLocaleString('en-IN')}</span>
          <div className="pages">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>…</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {openId && <ClientDetailPanel client={CLIENT_DATA.find(c => c.id === openId)} onClose={() => setOpenId(null)} />}

      <CodifiFoot />
    </>
  );
}

function ClientDetailPanel({ client, onClose }) {
  const [sessionTab, setSessionTab] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('basic');
  const [confirmBlock, setConfirmBlock] = React.useState(false);
  const [blockReason, setBlockReason] = React.useState('');
  const c = client;
  const [sCls, sLab] = STATUS_BADGE[c.status];
  const sessions = sessionTab === 'live' ? c.sessions.filter(s => s.status === 'Active') : c.sessions;
  const panLast4 = c.pan ? '••••••' + c.pan.slice(-4) : '—';
  const isBlocked = c.status === 'blocked';
  const TABS = [
    { id: 'basic',    label: 'Basic Info' },
    { id: 'bank',     label: 'Bank Details' },
    { id: 'access',   label: 'Access & Security' },
    { id: 'payin',    label: 'Pay-in' },
    { id: 'payout',   label: 'Pay-out' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'mtf',      label: 'MTF Release' },
  ];

  return (
    <div className="cm-drawer-overlay" onClick={onClose}>
    <div className="card cm-detail cm-drawer" onClick={(e) => e.stopPropagation()}>
      <div className="cm-detail-head">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <div className="user-cell" style={{ width: '100%' }}>
            <div className="av" style={{ background: avatarColor(c.name), width: 48, height: 48, fontSize: 15 }}>{initials(c.name)}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{c.name}</h3>
              <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                <span className="col-id">{c.id}</span>
                <span style={{ color: 'var(--muted-2)' }}>·</span>
                <span>{panLast4}</span>
                <span style={{ color: 'var(--muted-2)' }}>·</span>
                <span>{c.gender === 'M' ? 'Male' : 'Female'}, born {c.dob}</span>
              </div>
            </div>
            <div style={{ display: 'inline-flex', gap: 6, alignSelf: 'flex-start' }}>
              <button className="btn btn-sm"><Icon name="edit" size={11} /> Edit</button>
              <button className="btn btn-sm" style={{ color: 'var(--rose)' }} onClick={() => setConfirmBlock(true)}>{isBlocked ? 'Unblock' : 'Block'}</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className={'badge badge-tall ' + sCls}><span className="badge-dot" />{sLab}</span>
            {c.emailVerified && <span className="badge badge-info badge-tall"><span className="badge-dot" />Email verified</span>}
            {c.mobileVerified && <span className="badge badge-info badge-tall"><span className="badge-dot" />Mobile verified</span>}
            <span className="badge badge-tall"><span className="badge-dot" />RMS : OMK</span>
            <div style={{ flex: 1 }} />
            {c.segments && c.segments.length > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10.5, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--display)', fontWeight: 600 }}>Segments</span>
                {c.segments.map(s => <span key={s} className="badge badge-tall">{s}</span>)}
              </span>
            )}
          </div>
        </div>
      </div>

      {confirmBlock && (
        <div onClick={() => setConfirmBlock(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 12, width: 'min(440px, 92vw)', boxShadow: '0 20px 60px rgba(15,23,42,0.25)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line-2)' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{isBlocked ? 'Unblock client?' : 'Block client?'}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
                {isBlocked
                  ? `This will restore trading access for ${c.name} (${c.id}).`
                  : `${c.name} (${c.id}) will be unable to place new orders or log in until unblocked.`}
              </div>
            </div>
            <div style={{ padding: '14px 20px' }}>
              <label style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--display)' }}>Reason</label>
              <textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder={isBlocked ? 'Why are you unblocking?' : 'Why are you blocking?'}
                rows={3}
                style={{ width: '100%', marginTop: 6, border: '1px solid var(--border)', borderRadius: 7, padding: '8px 10px', fontSize: 12.5, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', background: 'var(--bg)', color: 'var(--ink)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--line-2)', background: 'var(--bg)' }}>
              <button className="btn btn-sm" onClick={() => { setConfirmBlock(false); setBlockReason(''); }}>Cancel</button>
              <button
                className="btn btn-sm"
                onClick={() => { setConfirmBlock(false); setBlockReason(''); }}
                style={{ background: isBlocked ? 'var(--emerald)' : 'var(--rose)', color: '#fff', border: 'none' }}
              >Confirm {isBlocked ? 'unblock' : 'block'}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 2, padding: '0 18px', borderBottom: '1px solid var(--line-2)', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '12px 14px', fontSize: 12.5, fontWeight: 500,
              fontFamily: 'var(--display)', letterSpacing: '-0.005em',
              color: activeTab === t.id ? 'var(--ink)' : 'var(--muted)',
              borderBottom: '2px solid ' + (activeTab === t.id ? 'var(--ink)' : 'transparent'),
              marginBottom: -1, whiteSpace: 'nowrap',
            }}
          >{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '18px', overflowY: 'auto', flex: 1 }}>
        {activeTab === 'basic' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              ['Name', c.name],
              ['UCC', c.id],
              ['PAN (last 4)', panLast4],
              ['DOB', c.dob],
              ['Gender', c.gender === 'M' ? 'Male' : 'Female'],
              ['Email', maskEmail(c.email)],
              ['Mobile', maskMobile(c.mobile)],
              ['RMS status', sLab],
              ['Account state', c.status === 'blocked' ? 'Blocked' : 'Active'],
              ['MTF', c.mtfActive ? 'Enabled' : 'Disabled'],
              ['Email verified', c.emailVerified ? 'Yes' : 'No'],
              ['Mobile verified', c.mobileVerified ? 'Yes' : 'No'],
            ].map(([l, v]) => (
              <div key={l} style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10.5, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--display)', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bank' && (
          <>
            <div className="cm-col-h" style={{ marginBottom: 10 }}>Linked bank accounts</div>
            <table className="data cm-sessions">
              <thead>
                <tr><th>Bank</th><th>Account</th><th>IFSC</th><th>Type</th><th></th></tr>
              </thead>
              <tbody>
                {c.banks.length === 0 && (
                  <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted-2)', padding: '20px 0' }}>No bank accounts linked</td></tr>
                )}
                {c.banks.map((b, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{b.name}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{maskAccount(b.acct)}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{b.ifsc}</td>
                    <td>
                      {b.primary
                        ? <span className="badge badge-success"><span className="badge-dot" />Primary</span>
                        : <span className="badge"><span className="badge-dot" />Linked</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {!b.primary && <button className="btn btn-sm">Set primary</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'access' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div className="cm-col-h" style={{ marginBottom: 0 }}>Sessions</div>
              <div className="cm-toggle">
                <button className={sessionTab === 'all' ? 'active' : ''} onClick={() => setSessionTab('all')}>All</button>
                <button className={sessionTab === 'live' ? 'active' : ''} onClick={() => setSessionTab('live')}>Live</button>
              </div>
            </div>
            <table className="data cm-sessions">
              <thead>
                <tr><th>Date</th><th>Source</th><th>IP</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {sessions.length === 0 && (
                  <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted-2)', padding: '20px 0' }}>No live sessions</td></tr>
                )}
                {sessions.map((s, i) => (
                  <tr key={i}>
                    <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{s.date}</td>
                    <td style={{ fontSize: 12 }}>{s.source}</td>
                    <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{s.ip}</td>
                    <td><span className={'badge ' + (s.status === 'Active' ? 'badge-success' : s.status === 'Revoked' ? 'badge-danger' : '')}><span className="badge-dot" />{s.status}</span></td>
                    <td style={{ textAlign: 'right' }}>{s.status === 'Active' && <button className="btn btn-sm" style={{ color: 'var(--rose)' }}>Revoke</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'payin' && (() => {
          const seed = (c.id.charCodeAt(c.id.length - 1) || 7) >>> 0;
          const rng = (i) => {
            const x = Math.sin((seed + 1) * (i + 11) * 9.731) * 10000;
            return x - Math.floor(x);
          };
          const modes = ['UPI', 'Net Banking', 'UPI', 'IMPS', 'Net Banking'];
          const statuses = ['Success', 'Success', 'Success', 'Pending', 'Failed', 'Success'];
          const dates = ['07 May 2026, 10:14', '06 May 2026, 14:32', '05 May 2026, 09:08', '03 May 2026, 18:45', '02 May 2026, 11:21', '28 Apr 2026, 16:02'];
          const banks = c.banks.length ? c.banks : [{ name: 'Bank account', acct: '••••••••0000' }];
          const count = Math.max(3, c.banks.length + 3);
          const rows = Array.from({ length: count }, (_, i) => {
            const bank = banks[i % banks.length];
            const amt = Math.round(((rng(i) * 95000) + 5000) / 100) * 100;
            return {
              date: dates[i % dates.length],
              acct: bank.acct,
              bank: bank.name,
              mode: modes[Math.floor(rng(i + 3) * modes.length)],
              amount: amt,
              status: statuses[Math.floor(rng(i + 7) * statuses.length)],
            };
          });
          const statusBadge = (s) => {
            if (s === 'Success') return 'badge badge-success';
            if (s === 'Pending') return 'badge badge-warn';
            if (s === 'Failed')  return 'badge badge-danger';
            return 'badge';
          };
          return (
            <>
              <div className="cm-col-h" style={{ marginBottom: 10 }}>Pay-in history</div>
              <table className="data cm-sessions">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bank</th>
                    <th>Account</th>
                    <th>Mode</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{r.date}</td>
                      <td style={{ fontSize: 12 }}>{r.bank}</td>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>••••{String(r.acct).slice(-4)}</td>
                      <td style={{ fontSize: 12 }}>{r.mode}</td>
                      <td className="mono" style={{ fontSize: 12, fontWeight: 500, textAlign: 'right' }}>{fmtINR(r.amount)}</td>
                      <td><span className={statusBadge(r.status)} style={{ minWidth: 92, justifyContent: 'center' }}><span className="badge-dot" />{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}

        {activeTab === 'payout' && (() => {
          const seed = (c.id.charCodeAt(c.id.length - 1) || 7) >>> 0;
          const rng = (i) => { const x = Math.sin((seed + 2) * (i + 13) * 7.317) * 10000; return x - Math.floor(x); };
          const dates = ['07 May 2026, 12:08', '05 May 2026, 16:42', '02 May 2026, 10:11', '29 Apr 2026, 14:05', '24 Apr 2026, 11:38'];
          const statuses = ['Success', 'Success', 'In-process', 'Success', 'Rejected'];
          const banks = c.banks.length ? c.banks : [{ name: 'Bank account', acct: '••••••••0000' }];
          const count = Math.max(3, c.banks.length + 2);
          const rows = Array.from({ length: count }, (_, i) => {
            const bank = banks[i % banks.length];
            const amt = Math.round(((rng(i) * 75000) + 5000) / 100) * 100;
            return { date: dates[i % dates.length], bank: bank.name, acct: bank.acct, amount: amt, status: statuses[Math.floor(rng(i + 5) * statuses.length)] };
          });
          const statusBadge = (s) => s === 'Success' ? 'badge badge-success' : s === 'In-process' ? 'badge badge-warn' : s === 'Rejected' ? 'badge badge-danger' : 'badge';
          return (
            <>
              <div className="cm-col-h" style={{ marginBottom: 10 }}>Pay-out history</div>
              <table className="data cm-sessions">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bank</th>
                    <th>Account</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{r.date}</td>
                      <td style={{ fontSize: 12 }}>{r.bank}</td>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>••••{String(r.acct).slice(-4)}</td>
                      <td className="mono" style={{ fontSize: 12, fontWeight: 500, textAlign: 'right', color: 'var(--rose)' }}>−{fmtINR(r.amount)}</td>
                      <td><span className={statusBadge(r.status)} style={{ minWidth: 92, justifyContent: 'center' }}><span className="badge-dot" />{r.status}</span></td>
                      <td style={{ textAlign: 'right' }}>{r.status === 'In-process' && <button className="btn btn-sm" style={{ color: 'var(--rose)' }}>Cancel</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}

        {activeTab === 'feedback' && (() => {
          const seed = (c.id.charCodeAt(c.id.length - 1) || 7) >>> 0;
          const products = ['Web', 'iOS', 'Android', 'Desktop', 'API'];
          const versions = ['v4.12.1', 'v4.11.0', 'v4.10.3', 'v4.9.5'];
          const titles = [
            'Order placement felt slow',
            'Charts loaded smoothly',
            'OTP delay during login',
            'Watchlist sync worked great',
            'Pay-out reflected on time',
            'Confusing margin breakdown',
          ];
          const descs = [
            'Took longer than usual during the opening bell, especially on options.',
            'TradingView integration was responsive across timeframes.',
            'OTP arrived after ~40 seconds, login attempt timed out twice.',
            'Symbols added on web showed up on mobile within seconds.',
            'Funds reflected in bank within 30 minutes of request.',
            'Difficult to figure out span vs exposure margin in the UI.',
          ];
          const rows = Array.from({ length: 4 }, (_, i) => {
            const s = (seed + i * 31) >>> 0;
            const d = new Date(Date.now() - ((s % 28) + i) * 86400000);
            return {
              date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
              title: titles[s % titles.length],
              desc: descs[(s + 2) % descs.length],
              product: products[s % products.length],
              stars: ((s >> 3) % 5) + 1,
              version: versions[s % versions.length],
            };
          });
          const Star = ({ filled }) => (
            <span style={{ color: filled ? '#F5A524' : 'var(--line)', fontSize: 13, lineHeight: 1 }}>★</span>
          );
          return (
            <div className="table-wrap" style={{ padding: 0 }}>
              <table className="data" style={{ fontSize: 12.5 }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Product</th>
                    <th>Stars</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 11.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{r.date}</td>
                      <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{r.title}</td>
                      <td style={{ color: 'var(--muted)', maxWidth: 320 }}>{r.desc}</td>
                      <td><span className="pill" style={{ fontSize: 10.5 }}>{r.product}</span></td>
                      <td>
                        <span style={{ display: 'inline-flex', gap: 1 }}>
                          {[1,2,3,4,5].map(n => <Star key={n} filled={n <= r.stars} />)}
                        </span>
                      </td>
                      <td className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{r.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}

        {activeTab === 'mtf' && (() => {
          if (!c.mtfActive) {
            return (
              <>
                <div className="cm-col-h" style={{ marginBottom: 10 }}>MTF release</div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '20px 16px', textAlign: 'center', color: 'var(--muted)', fontSize: 12.5 }}>MTF facility is inactive for this client.</div>
              </>
            );
          }
          const seed = (c.id.charCodeAt(c.id.length - 1) || 7) >>> 0;
          const rng = (i) => { const x = Math.sin((seed + 4) * (i + 17) * 5.421) * 10000; return x - Math.floor(x); };
          const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'ICICIBANK', 'INFY', 'AXISBANK', 'KOTAKBANK', 'SBIN'];
          const dates = ['07 May 2026, 11:24', '06 May 2026, 09:48', '04 May 2026, 15:11', '02 May 2026, 13:30', '30 Apr 2026, 10:08'];
          const statuses = ['Released', 'Released', 'Pending', 'Released', 'Rejected'];
          const count = 5;
          const rows = Array.from({ length: count }, (_, i) => {
            const sym = symbols[Math.floor(rng(i) * symbols.length)];
            const qty = Math.floor(rng(i + 2) * 200) + 10;
            const amt = Math.round((rng(i + 4) * 80000 + 5000) / 100) * 100;
            return { date: dates[i % dates.length], symbol: sym, qty, amount: amt, status: statuses[Math.floor(rng(i + 6) * statuses.length)] };
          });
          const statusBadge = (s) => s === 'Released' ? 'badge badge-success' : s === 'Pending' ? 'badge badge-warn' : s === 'Rejected' ? 'badge badge-danger' : 'badge';
          return (
            <>
              <div className="cm-col-h" style={{ marginBottom: 10 }}>MTF release</div>
              <table className="data cm-sessions">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Symbol</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td className="mono" style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{r.date}</td>
                      <td style={{ fontSize: 12, fontWeight: 500 }}>{r.symbol}</td>
                      <td className="mono" style={{ fontSize: 12, textAlign: 'right' }}>{r.qty}</td>
                      <td className="mono" style={{ fontSize: 12, fontWeight: 500, textAlign: 'right' }}>{fmtINR(r.amount)}</td>
                      <td><span className={statusBadge(r.status)} style={{ minWidth: 92, justifyContent: 'center' }}><span className="badge-dot" />{r.status}</span></td>
                      <td style={{ textAlign: 'right' }}>{r.status === 'Pending' && <button className="btn btn-sm">Approve</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })()}
      </div>
    </div>
    <button
      onClick={onClose}
      aria-label="Close"
      style={{
        position: 'fixed', right: 24, bottom: 24, zIndex: 110,
        height: 44, padding: '0 18px', borderRadius: 999,
        background: 'var(--ink)', color: '#fff', border: 'none',
        fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)'
      }}
    ><Icon name="close" size={14} /> Close</button>
    </div>
  );
}

window.ClientsView = ClientsView;


// ===== view-trading.jsx =====
// Portfolio & Trading + Funds & Payments + SIP views

const ORDERS = [
{ id: 'ORD-91204', client: 'Aman Verma', symbol: 'RELIANCE', side: 'BUY', qty: 12, price: '2,841.20', value: '34,094.40', status: 'filled', exch: 'NSE', time: '14:32:18' },
{ id: 'ORD-91203', client: 'Priya Subramaniam', symbol: 'TCS', side: 'SELL', qty: 50, price: '4,012.55', value: '2,00,627.50', status: 'filled', exch: 'NSE', time: '14:31:42' },
{ id: 'ORD-91202', client: 'Rajat Kapoor', symbol: 'INFY', side: 'BUY', qty: 25, price: '1,884.10', value: '47,102.50', status: 'pending', exch: 'BSE', time: '14:31:01' },
{ id: 'ORD-91201', client: 'Tanvi Joshi', symbol: 'HDFCBANK', side: 'BUY', qty: 8, price: '1,672.30', value: '13,378.40', status: 'rejected', exch: 'NSE', time: '14:29:55' },
{ id: 'ORD-91200', client: 'Karthik Iyer', symbol: 'WIPRO', side: 'SELL', qty: 120, price: '538.65', value: '64,638.00', status: 'partial', exch: 'NSE', time: '14:28:11' },
{ id: 'ORD-91199', client: 'Mehrunissa Ali', symbol: 'ITC', side: 'BUY', qty: 200, price: '448.90', value: '89,780.00', status: 'filled', exch: 'NSE', time: '14:27:48' },
{ id: 'ORD-91198', client: 'Devansh Gupta', symbol: 'BAJFINANCE', side: 'SELL', qty: 5, price: '7,221.05', value: '36,105.25', status: 'filled', exch: 'BSE', time: '14:26:30' },
{ id: 'ORD-91197', client: 'Saanvi Nair', symbol: 'LT', side: 'BUY', qty: 10, price: '3,612.40', value: '36,124.00', status: 'filled', exch: 'NSE', time: '14:25:12' }];

const ORDER_BADGE = {
  filled: ['badge-success', 'Filled'],
  partial: ['badge-warn', 'Partial'],
  pending: ['badge-info', 'Pending'],
  rejected: ['badge-danger', 'Rejected']
};

const HOLDINGS = [
  { client: 'Aman Verma',         cid: 'CF-10241', symbol: 'RELIANCE',   exch: 'NSE', qty: 120,  avg: '2,612.40', ltp: '2,841.20', invested: '3,13,488.00', current: '3,40,944.00', pnl: 27456,   pct: 8.76 },
  { client: 'Priya Subramaniam',  cid: 'CF-10198', symbol: 'TCS',        exch: 'NSE', qty: 80,   avg: '3,720.10', ltp: '4,012.55', invested: '2,97,608.00', current: '3,21,004.00', pnl: 23396,   pct: 7.86 },
  { client: 'Rajat Kapoor',       cid: 'CF-10312', symbol: 'INFY',       exch: 'BSE', qty: 250,  avg: '1,930.20', ltp: '1,884.10', invested: '4,82,550.00', current: '4,71,025.00', pnl: -11525, pct: -2.39 },
  { client: 'Tanvi Joshi',        cid: 'CF-10287', symbol: 'HDFCBANK',   exch: 'NSE', qty: 60,   avg: '1,580.80', ltp: '1,672.30', invested: '94,848.00',   current: '1,00,338.00', pnl: 5490,    pct: 5.79 },
  { client: 'Karthik Iyer',       cid: 'CF-10422', symbol: 'WIPRO',      exch: 'NSE', qty: 400,  avg: '512.20',   ltp: '538.65',   invested: '2,04,880.00', current: '2,15,460.00', pnl: 10580,   pct: 5.16 },
  { client: 'Mehrunissa Ali',     cid: 'CF-10509', symbol: 'ITC',        exch: 'NSE', qty: 850,  avg: '432.10',   ltp: '448.90',   invested: '3,67,285.00', current: '3,81,565.00', pnl: 14280,   pct: 3.89 },
  { client: 'Devansh Gupta',      cid: 'CF-10618', symbol: 'BAJFINANCE', exch: 'BSE', qty: 18,   avg: '7,440.00', ltp: '7,221.05', invested: '1,33,920.00', current: '1,29,978.90', pnl: -3941,  pct: -2.94 },
  { client: 'Saanvi Nair',        cid: 'CF-10741', symbol: 'LT',         exch: 'NSE', qty: 45,   avg: '3,510.00', ltp: '3,612.40', invested: '1,57,950.00', current: '1,62,558.00', pnl: 4608,    pct: 2.92 },
];

const POSITIONS = [
  { client: 'Aman Verma',        cid: 'CF-10241', symbol: 'NIFTY 25APR FUT', product: 'NRML', qty: 50,  side: 'LONG',  avg: '22,418.50', ltp: '22,512.80', mtm: 4715,   margin: '1,84,200', exch: 'NSE' },
  { client: 'Priya Subramaniam', cid: 'CF-10198', symbol: 'BANKNIFTY 24APR 48000 CE', product: 'MIS',  qty: 25,  side: 'LONG',  avg: '342.10',    ltp: '388.40',    mtm: 1157,   margin: '38,400',   exch: 'NSE' },
  { client: 'Rajat Kapoor',      cid: 'CF-10312', symbol: 'TCS 25APR FUT',    product: 'NRML', qty: 175, side: 'SHORT', avg: '4,025.00',  ltp: '4,012.55',  mtm: 2178,   margin: '2,42,000', exch: 'NSE' },
  { client: 'Tanvi Joshi',       cid: 'CF-10287', symbol: 'NIFTY 24APR 22500 PE', product: 'MIS', qty: 50,  side: 'LONG',  avg: '128.20',    ltp: '94.50',     mtm: -1685,  margin: '21,400',   exch: 'NSE' },
  { client: 'Karthik Iyer',      cid: 'CF-10422', symbol: 'CRUDEOIL 19APR FUT', product: 'NRML', qty: 100, side: 'LONG',  avg: '6,890.00',  ltp: '6,948.00',  mtm: 5800,   margin: '94,500',   exch: 'MCX' },
  { client: 'Mehrunissa Ali',    cid: 'CF-10509', symbol: 'RELIANCE 25APR FUT', product: 'NRML', qty: 250, side: 'LONG',  avg: '2,820.00',  ltp: '2,841.20',  mtm: 5300,   margin: '3,12,000', exch: 'NSE' },
  { client: 'Saanvi Nair',       cid: 'CF-10741', symbol: 'BANKNIFTY 24APR 47500 PE', product: 'MIS', qty: 25, side: 'SHORT', avg: '210.40', ltp: '178.20', mtm: 805, margin: '46,200', exch: 'NSE' },
];

const WATCH = [
  { name: 'Default',     owner: 'System',           type: 'dynamic', clients: 1842, symbols: 24, top: ['NIFTY 50', 'RELIANCE', 'TCS', 'INFY'],            updated: '12 min ago', status: 'live' },
  { name: 'F&O Movers',  owner: 'Trading desk',     type: 'predef',  clients: 612,  symbols: 18, top: ['BANKNIFTY', 'BAJFINANCE', 'HDFCBANK'],            updated: '4 min ago',  status: 'live' },
  { name: 'IT Pack',     owner: 'Research',         type: 'predef',  clients: 388,  symbols: 12, top: ['TCS', 'INFY', 'WIPRO', 'HCLTECH'],                updated: '22 min ago', status: 'live' },
  { name: 'PSU Banks',   owner: 'Research',         type: 'predef',  clients: 274,  symbols: 9,  top: ['SBIN', 'BANKBARODA', 'PNB'],                      updated: '1 hr ago',   status: 'paused' },
  { name: 'Smallcap 30', owner: 'Aman Verma',       type: 'user',    clients: 96,   symbols: 30, top: ['IRCON', 'KEI', 'CUB', 'POLYCAB'],                 updated: '8 min ago',  status: 'live' },
  { name: 'Energy',      owner: 'Karthik Iyer',     type: 'user',    clients: 142,  symbols: 14, top: ['ONGC', 'IOC', 'GAIL', 'NTPC'],                    updated: '36 min ago', status: 'live' },
];

const PRODUCT_BADGE = { NRML: ['', 'NRML'], MIS: ['badge-info', 'MIS'], CNC: ['', 'CNC'] };

function RangeSlider({ min, max, step = 1, valueMin, valueMax, onChange, fmt }) {
  const lo = Math.max(min, Math.min(valueMin, valueMax));
  const hi = Math.min(max, Math.max(valueMin, valueMax));
  const span = max - min || 1;
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;
  const handleMin = (e) => {
    const v = Math.min(parseFloat(e.target.value), hi - step);
    onChange(v, hi);
  };
  const handleMax = (e) => {
    const v = Math.max(parseFloat(e.target.value), lo + step);
    onChange(lo, v);
  };
  return (
    <div className="rs-wrap">
      <div className="rs-track-row">
        <div className="rs-track" />
        <div className="rs-fill" style={{ left: loPct + '%', right: (100 - hiPct) + '%' }} />
        <input className="rs-input" type="range" min={min} max={max} step={step} value={lo} onChange={handleMin} style={{ zIndex: lo > max - step * 5 ? 5 : 3 }} />
        <input className="rs-input" type="range" min={min} max={max} step={step} value={hi} onChange={handleMax} style={{ zIndex: 4 }} />
      </div>
      <div className="rs-readout">
        <span>{fmt ? fmt(min) : min.toLocaleString('en-IN')}</span>
        <span>{fmt ? fmt(max) : max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

function PortfolioView() {
  const [tab, setTab] = useState('holdings');
  const [query, setQuery] = useState('');
  const [openHoldingId, setOpenHoldingId] = useState(null);
  const [openPosClient, setOpenPosClient] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(null); // null | 'holdings' | 'positions'
  const [watchType, setWatchType] = useState('dynamic');
  const [advOpen, setAdvOpen] = useState(false);
  const EMPTY_FILTERS = { symbol: '', poa: 'any', minCurrent: '', maxCurrent: '', minPnl: '', maxPnl: '', minStocks: '' };
  const [advFilters, setAdvFilters] = useState(EMPTY_FILTERS);
  // Draft state edited inside the popover; only committed to advFilters on Apply.
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  // Sync draft when popover opens
  React.useEffect(() => { if (advOpen) setDraftFilters(advFilters); }, [advOpen]);

  const today = 'Fri, 8 May 2026 · 09:15 AM';
  const totalInv  = HOLDINGS.reduce((s,h) => s + parseFloat(h.invested.replace(/,/g,'')), 0);
  const totalCur  = HOLDINGS.reduce((s,h) => s + parseFloat(h.current.replace(/,/g,'')), 0);
  const totalPnL  = HOLDINGS.reduce((s,h) => s + h.pnl, 0);
  const winners   = HOLDINGS.filter(h => h.pnl > 0).length;

  const longPos   = POSITIONS.filter(p => p.side === 'LONG').length;
  const shortPos  = POSITIONS.filter(p => p.side === 'SHORT').length;
  const totalMtm  = POSITIONS.reduce((s,p) => s + p.mtm, 0);
  const totalMargin = POSITIONS.reduce((s,p) => s + parseFloat(p.margin.replace(/,/g,'')), 0);

  const liveLists  = WATCH.filter(w => w.status === 'live').length;
  const totalSubs  = WATCH.reduce((s,w) => s + w.clients, 0);
  const totalSyms  = WATCH.reduce((s,w) => s + w.symbols, 0);

  const fmtCr = (n) => '₹' + (n/10000000).toFixed(2) + ' Cr';
  const fmtL  = (n) => '₹' + (n/100000).toFixed(2) + ' L';

  // Aggregate holdings per UCC (client account)
  const HOLDINGS_BY_CLIENT = React.useMemo(() => {
    const map = new Map();
    HOLDINGS.forEach(h => {
      const key = h.cid;
      const inv = parseFloat(h.invested.replace(/,/g, ''));
      const cur = parseFloat(h.current.replace(/,/g, ''));
      if (!map.has(key)) {
        // POA flag derived deterministically from UCC so it's stable
        const poa = (h.cid.charCodeAt(h.cid.length - 1) % 4) !== 0;
        map.set(key, {
          client: h.client, cid: h.cid,
          uniqueStocks: 0, totalQty: 0,
          invested: 0, current: 0, pnl: 0,
          symbols: [], poa,
        });
      }
      const row = map.get(key);
      row.uniqueStocks += 1;
      row.totalQty += h.qty;
      row.invested += inv;
      row.current += cur;
      row.pnl += h.pnl;
      row.symbols.push(h.symbol);
    });
    return Array.from(map.values());
  }, []);

  // Bounds for range sliders, derived from data
  const bounds = React.useMemo(() => {
    const cs = HOLDINGS_BY_CLIENT.map(h => h.current);
    const ps = HOLDINGS_BY_CLIENT.map(h => h.pnl);
    const niceFloor = (n) => Math.floor(n / 1000) * 1000;
    const niceCeil  = (n) => Math.ceil(n / 1000) * 1000;
    return {
      currentMin: niceFloor(Math.min(...cs)),
      currentMax: niceCeil(Math.max(...cs)),
      pnlMin: niceFloor(Math.min(...ps)),
      pnlMax: niceCeil(Math.max(...ps)),
    };
  }, [HOLDINGS_BY_CLIENT]);

  const advActiveCount =
    (advFilters.symbol ? 1 : 0) +
    (advFilters.poa !== 'any' ? 1 : 0) +
    (advFilters.minCurrent ? 1 : 0) + (advFilters.maxCurrent ? 1 : 0) +
    (advFilters.minPnl ? 1 : 0) + (advFilters.maxPnl ? 1 : 0) +
    (advFilters.minStocks ? 1 : 0);

  // Compact INR formatter for slider labels: 12,345 → ₹12.3K, 1,250,000 → ₹12.5L
  const fmtCompactINR = (n) => {
    const a = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (a >= 1e7) return sign + '₹' + (n / 1e7).toFixed(a >= 1e8 ? 0 : 1).replace(/\.0$/, '') + 'Cr';
    if (a >= 1e5) return sign + '₹' + (n / 1e5).toFixed(a >= 1e6 ? 0 : 1).replace(/\.0$/, '') + 'L';
    if (a >= 1e3) return sign + '₹' + (n / 1e3).toFixed(a >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return sign + '₹' + a.toLocaleString('en-IN');
  };

  // Active filter chips for the bar above the table
  const activeChips = [
    advFilters.symbol     && { key: 'symbol',  label: 'Symbol',     value: advFilters.symbol.toUpperCase(), reset: { symbol: '' } },
    advFilters.poa !== 'any' && { key: 'poa',  label: 'POA',        value: advFilters.poa === 'yes' ? 'Yes' : 'No', reset: { poa: 'any' } },
    advFilters.minStocks  && { key: 'stocks',  label: 'Min stocks', value: advFilters.minStocks, reset: { minStocks: '' } },
    (advFilters.minCurrent || advFilters.maxCurrent) && {
      key: 'current', label: 'Current',
      value: fmtCompactINR(parseFloat(advFilters.minCurrent || bounds.currentMin)) + ' – ' + fmtCompactINR(parseFloat(advFilters.maxCurrent || bounds.currentMax)),
      reset: { minCurrent: '', maxCurrent: '' },
    },
    (advFilters.minPnl || advFilters.maxPnl) && {
      key: 'pnl', label: 'P&L',
      value: fmtCompactINR(parseFloat(advFilters.minPnl || bounds.pnlMin)) + ' – ' + fmtCompactINR(parseFloat(advFilters.maxPnl || bounds.pnlMax)),
      reset: { minPnl: '', maxPnl: '' },
    },
  ].filter(Boolean);

  // Filter helpers
  const fHold = HOLDINGS_BY_CLIENT.filter(h => {
    if (query && ![h.client, h.cid].some(s => s.toLowerCase().includes(query.toLowerCase()))) return false;
    if (advFilters.symbol && !h.symbols.some(s => s.toLowerCase().includes(advFilters.symbol.toLowerCase()))) return false;
    if (advFilters.poa === 'yes' && !h.poa) return false;
    if (advFilters.poa === 'no'  &&  h.poa) return false;
    if (advFilters.minCurrent && h.current < parseFloat(advFilters.minCurrent)) return false;
    if (advFilters.maxCurrent && h.current > parseFloat(advFilters.maxCurrent)) return false;
    if (advFilters.minPnl && h.pnl < parseFloat(advFilters.minPnl)) return false;
    if (advFilters.maxPnl && h.pnl > parseFloat(advFilters.maxPnl)) return false;
    if (advFilters.minStocks && h.uniqueStocks < parseInt(advFilters.minStocks, 10)) return false;
    return true;
  });
  const fPos  = POSITIONS.filter(p => !query || [p.client, p.cid, p.symbol].some(s => s.toLowerCase().includes(query.toLowerCase())));
  const fWat  = WATCH.filter(w => w.type === watchType && (!query || [w.name, w.owner, ...w.top].some(s => s.toLowerCase().includes(query.toLowerCase()))));

  const stats =
    tab === 'holdings' ? [
      { label: 'AUM',                    value: '₹284.62 Cr',    sub: 'as per BOD',                            accent: 'var(--primary)' },
      { label: 'Clients with holdings',  value: '12,418',        sub: '83.7% of active base',                 accent: 'var(--coral)'   },
      { label: 'Unique holding count',   value: '1,842',         sub: 'across NSE · BSE',                     accent: 'var(--violet)'  },
      { label: 'Tally',                  value: '9',             valueSuffix: 'matched', sub: 'File · DB · Segment · Backend',        accent: 'var(--emerald)', tally: true },
    ] :
    tab === 'positions' ? [
      { label: 'Open Positions (all)', value: POSITIONS.length, sub: longPos + ' long · ' + shortPos + ' short', accent: 'var(--primary)' },
      { label: 'NSE F&O',  value: Math.round(POSITIONS.length * 0.62), sub: 'F&O · index + stock',     accent: 'var(--primary)' },
      { label: 'BSE F&O',  value: Math.round(POSITIONS.length * 0.18), sub: 'F&O · sensex derivatives', accent: 'var(--coral)' },
      { label: 'MCX',      value: Math.round(POSITIONS.length * 0.20), sub: 'commodities · futures',    accent: 'var(--violet)' },
    ] : [
      { label: 'Active watchlists', value: WATCH.length,             sub: liveLists + ' live · ' + (WATCH.length - liveLists) + ' paused', accent: 'var(--primary)' },
      { label: 'Subscribed clients', value: totalSubs.toLocaleString('en-IN'), sub: 'across all lists',                  accent: 'var(--coral)' },
      { label: 'Symbols tracked',    value: totalSyms,                sub: 'avg ' + Math.round(totalSyms/WATCH.length) + ' / list',         accent: 'var(--violet)' },
      { label: 'Alerts triggered',   value: '128',                    sub: 'price · last 24h',                   accent: 'var(--amber)' },
    ];

  const placeholder =
    tab === 'holdings'  ? 'Client, user ID or symbol…' :
    tab === 'positions' ? 'Client, contract or user ID…' :
                          'Watchlist, owner or symbol…';

  return (
    <>
      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className={tab === 'holdings'  ? 'active' : ''} onClick={() => setTab('holdings')}>Holdings</button>
        <button className={tab === 'positions' ? 'active' : ''} onClick={() => setTab('positions')}>Positions</button>
        <button className={tab === 'watch'     ? 'active' : ''} onClick={() => setTab('watch')}>Market Watch</button>
      </div>

      <div className="cm-stat-card" style={{ marginBottom: 14 }}>
        {stats.map(k => (
          <div key={k.label} className="cm-stat" style={{ padding: '16px 20px' }}>
            <div className="cm-stat-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 11.5, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
              {k.label}
            </div>
            <div className="cm-stat-v" style={{ marginTop: 8, display: 'block' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.1, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span>{k.value}</span>
                {k.valueSuffix && (
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, letterSpacing: 0, color: 'var(--emerald)' }}>
                    ({k.valueSuffix})
                  </span>
                )}
              </div>
              {k.tally ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {['File', 'DB', 'Segment', 'Backend'].map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: 'var(--muted)', fontWeight: 500 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--emerald)' }} />{t}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 11.5, color: 'var(--muted-2)', fontWeight: 400, marginTop: 4 }}>{k.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cm-filter-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{tab !== 'watch' ? <>Last updated on : <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{today}</span></> : (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'dynamic', lbl: 'Broker Created' },
              { id: 'predef',  lbl: 'Pre Defined' },
              { id: 'user',    lbl: 'User Created' },
            ].map(p => {
              const n = WATCH.filter(w => w.type === p.id).length;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={'cm-pill' + (watchType === p.id ? ' active' : '')}
                  onClick={() => setWatchType(p.id)}
                >
                  {p.lbl}
                  <span className="cm-pill-count">{n}</span>
                </button>
              );
            })}
          </div>
        )}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative', justifySelf: 'center' }}>
          <div className="filter-input" style={{ width: tab === 'watch' ? 260 : 420, paddingRight: 4 }}>
            <Icon name="search" size={13} />
            <input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, width: 'auto' }}
            />
            {tab === 'holdings' && (
              <button
                onClick={() => setAdvOpen(v => !v)}
                title="Advanced search"
                aria-label="Advanced search"
                aria-expanded={advOpen}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  height: 24, padding: '0 8px',
                  background: advOpen || advActiveCount ? 'var(--ink)' : 'transparent',
                  color: advOpen || advActiveCount ? '#fff' : 'var(--muted)',
                  border: '1px solid ' + (advOpen || advActiveCount ? 'var(--ink)' : 'var(--border)'),
                  borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 500,
                }}
              >
                <Icon name="filter" size={11} />
                {advActiveCount > 0 && <span>{advActiveCount}</span>}
              </button>
            )}
          </div>
          {tab === 'holdings' && advOpen && (
            <>
              <div onClick={() => setAdvOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.32)', zIndex: 95, backdropFilter: 'blur(2px)' }} />
              <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 96,
                width: 'min(520px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 32px)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, boxShadow: '0 20px 60px rgba(15,20,40,0.24), 0 4px 12px rgba(15,20,40,0.10)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--line-2)', background: 'var(--bg)' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.005em' }}>Advanced filters</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Refine clients by holdings, value or status</div>
                </div>
                <button
                  onClick={() => setAdvOpen(false)}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--muted)', padding: 0, width: 26, height: 26, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Close advanced filters"
                >
                  <Icon name="close" size={13} />
                </button>
              </div>

              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', flex: '1 1 auto', minHeight: 0 }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>Holdings</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <label style={{ display: 'block' }}>
                      <div style={{ fontSize: 11.5, color: 'var(--ink)', fontWeight: 500, marginBottom: 5 }}>Holds symbol</div>
                      <input
                        className="adv-input"
                        placeholder="e.g. RELIANCE"
                        value={draftFilters.symbol}
                        onChange={(e) => setDraftFilters(f => ({ ...f, symbol: e.target.value }))}
                      />
                    </label>
                    <label style={{ display: 'block' }}>
                      <div style={{ fontSize: 11.5, color: 'var(--ink)', fontWeight: 500, marginBottom: 5 }}>Min quantity</div>
                      <input
                        className="adv-input"
                        type="number" placeholder="0"
                        value={draftFilters.minStocks}
                        onChange={(e) => setDraftFilters(f => ({ ...f, minStocks: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>POA status</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {[['any','Any'],['yes','Yes'],['no','No']].map(([v,l]) => {
                      const isActive = draftFilters.poa === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setDraftFilters(f => ({ ...f, poa: v }))}
                          style={{
                            height: 34, fontSize: 12.5, fontWeight: 600,
                            border: '1px solid ' + (isActive ? 'var(--ink)' : 'var(--line)'),
                            background: isActive ? 'var(--ink)' : 'var(--surface)',
                            color: isActive ? 'var(--surface)' : 'var(--ink)',
                            borderRadius: 7,
                            cursor: 'pointer',
                            transition: 'background 120ms, color 120ms, border-color 120ms',
                          }}
                        >{l}</button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>Current value (BOD)</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', fontWeight: 600 }}>
                      {fmtCompactINR(parseFloat(draftFilters.minCurrent || bounds.currentMin))}
                      <span style={{ color: 'var(--muted-2)', fontWeight: 500 }}>{' – '}</span>
                      {fmtCompactINR(parseFloat(draftFilters.maxCurrent || bounds.currentMax))}
                    </div>
                  </div>
                  <RangeSlider
                    min={bounds.currentMin}
                    max={bounds.currentMax}
                    step={1000}
                    valueMin={parseFloat(draftFilters.minCurrent || bounds.currentMin)}
                    valueMax={parseFloat(draftFilters.maxCurrent || bounds.currentMax)}
                    onChange={(lo, hi) => setDraftFilters(f => ({
                      ...f,
                      minCurrent: lo === bounds.currentMin ? '' : String(lo),
                      maxCurrent: hi === bounds.currentMax ? '' : String(hi),
                    }))}
                    fmt={fmtCompactINR}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>P&amp;L</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', fontWeight: 600 }}>
                      {fmtCompactINR(parseFloat(draftFilters.minPnl || bounds.pnlMin))}
                      <span style={{ color: 'var(--muted-2)', fontWeight: 500 }}>{' – '}</span>
                      {fmtCompactINR(parseFloat(draftFilters.maxPnl || bounds.pnlMax))}
                    </div>
                  </div>
                  <RangeSlider
                    min={bounds.pnlMin}
                    max={bounds.pnlMax}
                    step={1000}
                    valueMin={parseFloat(draftFilters.minPnl || bounds.pnlMin)}
                    valueMax={parseFloat(draftFilters.maxPnl || bounds.pnlMax)}
                    onChange={(lo, hi) => setDraftFilters(f => ({
                      ...f,
                      minPnl: lo === bounds.pnlMin ? '' : String(lo),
                      maxPnl: hi === bounds.pnlMax ? '' : String(hi),
                    }))}
                    fmt={fmtCompactINR}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--line-2)', background: 'var(--bg)' }}>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                  {(() => {
                    const dirty = JSON.stringify(draftFilters) !== JSON.stringify(advFilters);
                    if (dirty) return 'Unsaved changes';
                    return advActiveCount > 0 ? advActiveCount + ' filter' + (advActiveCount > 1 ? 's' : '') + ' active' : 'No filters applied';
                  })()}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setDraftFilters(EMPTY_FILTERS)}
                    style={{ background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink)', cursor: 'pointer', fontSize: 12, fontWeight: 500, height: 30, padding: '0 14px', borderRadius: 7 }}
                  >Reset</button>
                  <button
                    onClick={() => { setAdvFilters(draftFilters); setAdvOpen(false); }}
                    style={{ background: 'var(--ink)', color: '#fff', border: 'none', height: 30, padding: '0 16px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}
                  >Apply</button>
                </div>
              </div>
            </div>
            </>
          )}
        </div>
        <div style={{ justifySelf: 'end' }}>
          {tab === 'watch'     && <button className="btn btn-accent"><Icon name="plus" size={13} /> New watchlist</button>}
          {tab === 'holdings'  && <button className="btn" onClick={() => setUploadOpen('holdings')}><Icon name="upload" size={13} /> Upload holdings</button>}
          {tab === 'positions' && <button className="btn" onClick={() => setUploadOpen('positions')}><Icon name="upload" size={13} /> Upload positions</button>}
        </div>
      </div>

      {tab === 'holdings' && activeChips.length > 0 && (
        <div className="fc-strip">
          <span className="fc-strip-label">Filters</span>
          {activeChips.map(c => (
            <span key={c.key} className="fc-chip">
              <span className="fc-key">{c.label}:</span>
              <b>{c.value}</b>
              <button
                type="button"
                className="fc-chip-x"
                aria-label={'Remove ' + c.label + ' filter'}
                onClick={() => setAdvFilters(f => ({ ...f, ...c.reset }))}
              ><Icon name="close" size={11} /></button>
            </span>
          ))}
          <button
            type="button"
            className="fc-clear"
            onClick={() => setAdvFilters({ symbol: '', poa: 'any', minCurrent: '', maxCurrent: '', minPnl: '', maxPnl: '', minStocks: '' })}
          >Clear all</button>
        </div>
      )}

      {tab === 'holdings' && (
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th style={{ width: 36 }}>
                    <input type="checkbox" className="cm-check" />
                  </th>
                  <th>UCC</th>
                  <th>Name</th>
                  <th className="num" style={{ textAlign: 'right' }}>Unique stocks</th>
                  <th className="num" style={{ textAlign: 'right' }}>Total stocks</th>
                  <th className="num" style={{ textAlign: 'right' }}>Invested</th>
                  <th className="num" style={{ textAlign: 'right' }}>Current (BOD)</th>
                  <th className="num" style={{ textAlign: 'right' }}>P&amp;L</th>
                  <th className="num" style={{ textAlign: 'right' }}>%</th>
                  <th style={{ textAlign: 'center' }}>POA</th>
                </tr>
              </thead>
              <tbody>
                {fHold.map((h, i) => {
                  const pct = h.invested ? (h.pnl / h.invested) * 100 : 0;
                  const isOpen = openHoldingId === h.cid;
                  return (
                    <tr
                      key={i}
                      onClick={() => setOpenHoldingId(isOpen ? null : h.cid)}
                      style={{ cursor: 'pointer', background: isOpen ? 'var(--primary-50)' : undefined }}
                    >
                      <td onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="cm-check" />
                      </td>
                      <td className="col-id">{h.cid}</td>
                      <td>
                        <div className="user-cell">
                          <div className="av" style={{ background: avatarColor(h.client), width: 24, height: 24, fontSize: 10 }}>{initials(h.client)}</div>
                          <div className="uc-name" style={{ fontSize: 12.5 }}>{h.client}</div>
                        </div>
                      </td>
                      <td className="num" style={{ textAlign: 'right' }}>{h.uniqueStocks}</td>
                      <td className="num" style={{ textAlign: 'right' }}>{h.totalQty.toLocaleString('en-IN')}</td>
                      <td className="num" style={{ textAlign: 'right', color: 'var(--muted)' }}>₹{h.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>₹{h.current.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="num" style={{ textAlign: 'right', fontWeight: 600, color: h.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>
                        {h.pnl >= 0 ? '+' : '−'}₹{Math.abs(h.pnl).toLocaleString('en-IN')}
                      </td>
                      <td className="num" style={{ textAlign: 'right', fontWeight: 500, color: pct >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>
                        {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={'badge ' + (h.poa ? 'badge-success' : 'badge-danger')} style={{ minWidth: 36, justifyContent: 'center' }}>
                          {h.poa ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing 1–{fHold.length} of 12,418 clients</span>
            <div className="pages">
              <button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>…</button><button>›</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'holdings' && openHoldingId && (
        <HoldingsDetailDrawer
          row={HOLDINGS_BY_CLIENT.find(r => r.cid === openHoldingId)}
          rawHoldings={HOLDINGS.filter(h => h.cid === openHoldingId)}
          onClose={() => setOpenHoldingId(null)}
        />
      )}

      {tab === 'positions' && (() => {
        // Aggregate per client
        const byClient = {};
        fPos.forEach(p => {
          if (!byClient[p.cid]) byClient[p.cid] = { cid: p.cid, name: p.client, total: 0, nseFno: 0, bseFno: 0, mcx: 0, rows: [] };
          const b = byClient[p.cid];
          b.total += 1;
          b.rows.push(p);
          if (p.exch === 'MCX') b.mcx += 1;
          else if (p.exch === 'BSE') b.bseFno += 1;
          else b.nseFno += 1;
        });
        const clientRows = Object.values(byClient);
        return (
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th style={{ width: 36 }}><span className="cbx" /></th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th className="num" style={{ textAlign: 'right' }}>Open Position</th>
                  <th className="num" style={{ textAlign: 'right' }}>NSE F&amp;O</th>
                  <th className="num" style={{ textAlign: 'right' }}>BSE F&amp;O</th>
                  <th className="num" style={{ textAlign: 'right' }}>MCX</th>
                </tr>
              </thead>
              <tbody>
                {clientRows.map((r, i) => (
                  <tr key={i} onClick={() => setOpenPosClient(r)} style={{ cursor: 'pointer' }}>
                    <td onClick={(e) => e.stopPropagation()}><span className="cbx" /></td>
                    <td className="col-id">{r.cid}</td>
                    <td>
                      <div className="user-cell">
                        <div className="av" style={{ background: avatarColor(r.name), width: 24, height: 24, fontSize: 10 }}>{initials(r.name)}</div>
                        <div className="uc-name" style={{ fontSize: 12.5 }}>{r.name}</div>
                      </div>
                    </td>
                    <td className="num" style={{ textAlign: 'right', fontWeight: 600 }}>{r.total}</td>
                    <td className="num" style={{ textAlign: 'right', color: r.nseFno ? 'var(--ink)' : 'var(--muted-2)' }}>{r.nseFno || '—'}</td>
                    <td className="num" style={{ textAlign: 'right', color: r.bseFno ? 'var(--ink)' : 'var(--muted-2)' }}>{r.bseFno || '—'}</td>
                    <td className="num" style={{ textAlign: 'right', color: r.mcx ? 'var(--ink)' : 'var(--muted-2)' }}>{r.mcx || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing 1–{clientRows.length} of 384 clients</span>
            <div className="pages">
              <button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button>
            </div>
          </div>
        </div>
        );
      })()}

      {openPosClient && (
        <div className="cm-drawer-overlay" onClick={() => setOpenPosClient(null)}>
          <div className="card cm-drawer" onClick={(e) => e.stopPropagation()} style={{ width: 'min(960px, 96vw)' }}>
            <div className="cm-detail-head">
              <div className="user-cell" style={{ flex: 1 }}>
                <div className="av" style={{ background: avatarColor(openPosClient.name), width: 42, height: 42, fontSize: 14 }}>{initials(openPosClient.name)}</div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{openPosClient.name}</h3>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    <span className="col-id">{openPosClient.cid}</span>
                    <span style={{ margin: '0 6px', color: 'var(--muted-2)' }}>·</span>
                    Open positions as per BOD
                  </div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', gap: 6 }}>
                <span className="badge badge-tall"><span className="badge-dot" />Total {openPosClient.total}</span>
                {openPosClient.nseFno > 0 && <span className="badge badge-tall badge-info"><span className="badge-dot" />NSE F&amp;O · {openPosClient.nseFno}</span>}
                {openPosClient.bseFno > 0 && <span className="badge badge-tall"><span className="badge-dot" />BSE F&amp;O · {openPosClient.bseFno}</span>}
                {openPosClient.mcx > 0 && <span className="badge badge-tall"><span className="badge-dot" />MCX · {openPosClient.mcx}</span>}
              </div>
            </div>
            <div className="cm-drawer-body" style={{ padding: 18 }}>
              <table className="data cm-sessions" style={{ tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th>Contract</th>
                    <th style={{ width: 56 }}>Exch</th>
                    <th style={{ width: 64 }}>Product</th>
                    <th style={{ width: 44 }}>Side</th>
                    <th className="num" style={{ textAlign: 'right' }}>Qty</th>
                    <th className="num" style={{ textAlign: 'right' }}>Avg</th>
                    <th className="num" style={{ textAlign: 'right' }}>MTM</th>
                  </tr>
                </thead>
                <tbody>
                  {openPosClient.rows.map((p, i) => {
                    const [pCls, pLab] = PRODUCT_BADGE[p.product] || ['', p.product];
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 500, fontSize: 12, whiteSpace: 'nowrap' }}>{p.symbol}</td>
                        <td><span className="pill" style={{ fontSize: 10.5 }}>{p.exch}</span></td>
                        <td><span className={'badge ' + pCls}>{pLab}</span></td>
                        <td><span style={{ fontSize: 11.5, fontWeight: 600, color: p.side === 'LONG' ? 'var(--emerald)' : 'var(--rose)' }}>{p.side === 'LONG' ? 'Buy' : 'Sell'}</span></td>
                        <td className="num" style={{ textAlign: 'right' }}>{p.qty}</td>
                        <td className="num" style={{ textAlign: 'right', color: 'var(--muted)' }}>₹{p.avg}</td>
                        <td className="num" style={{ textAlign: 'right', fontWeight: 600, color: p.mtm >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>{p.mtm >= 0 ? '+' : '−'}₹{Math.abs(p.mtm).toLocaleString('en-IN')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => setOpenPosClient(null)} aria-label="Close" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 110, height: 44, padding: '0 18px', borderRadius: 999, background: 'var(--ink)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)' }}><Icon name="close" size={14} /> Close</button>
        </div>
      )}

      {tab === 'watch' && (
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Watchlist</th>
                  <th>Owner</th>
                  <th className="num" style={{ textAlign: 'right' }}>Symbols</th>
                  <th className="num" style={{ textAlign: 'right' }}>Subscribers</th>
                  <th>Top symbols</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fWat.map((w, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{w.name}</td>
                    <td>
                      <div className="user-cell">
                        <div className="av" style={{ background: avatarColor(w.owner), width: 24, height: 24, fontSize: 10 }}>{initials(w.owner)}</div>
                        <div className="uc-name" style={{ fontSize: 12.5 }}>{w.owner}</div>
                      </div>
                    </td>
                    <td className="num" style={{ textAlign: 'right' }}>{w.symbols}</td>
                    <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>{w.clients.toLocaleString('en-IN')}</td>
                    <td>
                      <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 4 }}>
                        {w.top.slice(0, 4).map(s => <span key={s} className="pill">{s}</span>)}
                      </span>
                    </td>
                    <td>
                      <span className={'badge ' + (w.status === 'live' ? 'badge-success' : 'badge-warn')}>
                        <span className="badge-dot" />{w.status === 'live' ? 'Live' : 'Paused'}
                      </span>
                    </td>
                    <td className="num" style={{ color: 'var(--muted)' }}>{w.updated}</td>
                    <td><button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="more" size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing 1–{fWat.length} of {WATCH.length} watchlists</span>
            <div className="pages">
              <button>‹</button><button className="active">1</button><button>›</button>
            </div>
          </div>
        </div>
      )}

      {uploadOpen && (
        <UploadDataModal kind={uploadOpen} onClose={() => setUploadOpen(null)} />
      )}

      <CodifiFoot />
    </>);

}

// ─── Funds & Payments ───────────────────────────────────────────────
const TXNS = [
{ id: 'TXN-87241', client: 'Aman Verma', type: 'Add Money', channel: 'UPI', amount: '25,000.00', status: 'success', ref: 'icici-9821', time: '14:32' },
{ id: 'TXN-87240', client: 'Priya Subramaniam', type: 'Withdrawal', channel: 'NEFT', amount: '1,50,000.00', status: 'pending', ref: 'hdfc-3201', time: '14:30' },
{ id: 'TXN-87239', client: 'Rajat Kapoor', type: 'Add Money', channel: 'NetBanking', amount: '10,000.00', status: 'failed', ref: 'icici-9820', time: '14:28' },
{ id: 'TXN-87238', client: 'Tanvi Joshi', type: 'Add Money', channel: 'UPI', amount: '5,000.00', status: 'success', ref: 'icici-9819', time: '14:26' },
{ id: 'TXN-87237', client: 'Karthik Iyer', type: 'Withdrawal', channel: 'NEFT', amount: '80,000.00', status: 'success', ref: 'hdfc-3200', time: '14:21' },
{ id: 'TXN-87236', client: 'Mehrunissa Ali', type: 'Add Money', channel: 'IMPS', amount: '2,00,000.00', status: 'success', ref: 'sbi-7740', time: '14:18' },
{ id: 'TXN-87235', client: 'Saanvi Nair', type: 'Withdrawal', channel: 'UPI', amount: '8,420.00', status: 'failed', ref: 'icici-9818', time: '14:11' }];

const TXN_BADGE = { success: ['badge-success', 'Success'], pending: ['badge-warn', 'Pending'], failed: ['badge-danger', 'Failed'] };

function FundsView() {
  return (
    <>
      <PageHeader active="funds" actions={
      <>
          <button className="btn"><Icon name="repeat" size={13} /> Reconcile</button>
          <button className="btn"><Icon name="download" size={13} /> Webhook log</button>
          <button className="btn btn-accent"><Icon name="plus" size={13} /> Manual payment</button>
        </>
      } />

      <div className="kpi-grid">
        {[
        { label: 'Add Money · today', value: '₹3.84', unit: 'Cr', trend: '+18.2%', up: true, foot: '1,284 successful', color: 'var(--emerald)' },
        { label: 'Withdrawals · today', value: '₹1.92', unit: 'Cr', trend: '+4.1%', up: true, foot: '412 processed', color: 'var(--primary)' },
        { label: 'Failed · today', value: '47', trend: '-32.1%', up: false, foot: '0.18% rate · auto-retry on', color: 'var(--rose)' },
        { label: 'Webhook lag p95', value: '212', unit: 'ms', trend: '+18ms', up: false, foot: 'ICICI degraded', color: 'var(--amber)' }].
        map((k, i) =>
        <div className="kpi" key={i}>
            <div className="kpi-head"><span className="kpi-dot" style={{ background: k.color }} />{k.label}</div>
            <div className="kpi-value">{k.value}{k.unit && <span className="unit">{k.unit}</span>}</div>
            <span className={"kpi-trend " + (k.up ? 'up' : 'down')}>
              <Icon name={k.up ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />{k.trend}
            </span>
            <div className="kpi-foot">{k.foot}</div>
          </div>
        )}
      </div>

      <div className="chart-grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <h3>Transaction stream</h3>
            <div className="card-actions">
              <div className="tabs"><button className="active">All</button><button>Add money</button><button>Withdraw</button><button>Failed only</button></div>
            </div>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Txn</th><th>Client</th><th>Type</th><th>Channel</th>
                  <th style={{ textAlign: 'right' }}>Amount</th><th>Status</th><th>Ref</th><th>Time</th><th></th>
                </tr>
              </thead>
              <tbody>
                {TXNS.map((t) => {
                  const [cls, lab] = TXN_BADGE[t.status];
                  return (
                    <tr key={t.id}>
                      <td><span className="col-id">{t.id}</span></td>
                      <td>{t.client}</td>
                      <td><span className="pill">{t.type}</span></td>
                      <td className="num" style={{ color: 'var(--muted)' }}>{t.channel}</td>
                      <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>₹{t.amount}</td>
                      <td><span className={"badge " + cls}><span className="badge-dot" />{lab}</span></td>
                      <td className="num" style={{ color: 'var(--muted)' }}>{t.ref}</td>
                      <td className="num" style={{ color: 'var(--muted)' }}>{t.time}</td>
                      <td><button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="more" size={13} /></button></td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-head">
            <h3>Webhooks</h3>
            <span className="badge badge-warn"><span className="badge-dot" />3 retrying</span>
          </div>
          <div className="card-body" style={{ padding: '4px 18px 14px' }}>
            {[
            { ev: 'icici.payment.success', code: 200, p: '12ms', tries: 1, ok: true },
            { ev: 'hdfc.withdrawal.queued', code: 200, p: '89ms', tries: 1, ok: true },
            { ev: 'icici.payment.success', code: 504, p: '5.1s', tries: 3, ok: false },
            { ev: 'sbi.mandate.created', code: 200, p: '320ms', tries: 1, ok: true },
            { ev: 'razorpay.refund.processed', code: 502, p: '2.3s', tries: 2, ok: false },
            { ev: 'kyc.cvl.update', code: 200, p: '410ms', tries: 1, ok: true }].
            map((w, i) =>
            <div key={i} className="status-row" style={{ gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ev}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>HTTP {w.code} · {w.p} · attempt {w.tries}</div>
                </div>
                <span className={"badge " + (w.ok ? 'badge-success' : 'badge-danger')}><span className="badge-dot" />{w.ok ? '200' : 'fail'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CodifiFoot />
    </>);

}

// ─── SIP Management ───────────────────────────────────────────────
const SIPS = [
{ id: 'SIP-118832', ucc: 'CF118832', client: 'Aman Verma', scheme: 'Parag Parikh Flexi Cap', symbol: 'RELIANCE', exchange: 'NSE', type: 'Amount', amount: '5,000', qty: 2, capPrice: '2,950.00', freq: 'Monthly', next: '05 May 2026', start: '05 Jan 2025', end: '05 Jan 2030', installment: '16/60', pending: 44, failed: 2, execCount: 14, status: 'failed', attempts: 2, createdOn: '04 Jan 2025 11:42', initiatedBy: 'Aman Verma', modifiedBy: 'ops.kavitha@codifi.in' },
{ id: 'SIP-118780', ucc: 'CF118780', client: 'Priya Subramaniam', scheme: 'HDFC Mid-Cap Opp', symbol: 'INFY', exchange: 'NSE', type: 'Quantity', amount: '25,000', qty: 15, capPrice: '1,720.00', freq: 'Monthly', next: '12 May 2026', start: '12 Aug 2024', end: '12 Aug 2027', installment: '21/36', pending: 15, failed: 0, execCount: 21, status: 'active', attempts: 0, createdOn: '10 Aug 2024 09:18', initiatedBy: 'Priya Subramaniam', modifiedBy: 'Priya Subramaniam' },
{ id: 'SIP-118742', ucc: 'CF118742', client: 'Saanvi Nair', scheme: 'Axis Long Term Equity', symbol: 'TCS', exchange: 'NSE', type: 'Amount', amount: '2,500', qty: 1, capPrice: '4,250.00', freq: 'Monthly', next: '07 May 2026', start: '07 Mar 2024', end: '07 Mar 2029', installment: '26/60', pending: 34, failed: 0, execCount: 26, status: 'active', attempts: 0, createdOn: '05 Mar 2024 16:04', initiatedBy: 'Saanvi Nair', modifiedBy: 'Saanvi Nair' },
{ id: 'SIP-118710', ucc: 'CF118710', client: 'Karthik Iyer', scheme: 'Mirae Asset ELSS', symbol: 'HDFCBANK', exchange: 'NSE', type: 'Amount', amount: '10,000', qty: 6, capPrice: '1,680.00', freq: 'Quarterly', next: '01 Jun 2026', start: '01 Sep 2023', end: '01 Sep 2028', installment: '11/20', pending: 9, failed: 0, execCount: 11, status: 'paused', attempts: 0, createdOn: '28 Aug 2023 12:30', initiatedBy: 'Karthik Iyer', modifiedBy: 'ops.suresh@codifi.in' },
{ id: 'SIP-118702', ucc: 'CF118702', client: 'Mehrunissa Ali', scheme: 'ICICI Pru Bluechip', symbol: 'BAJFINANCE', exchange: 'NSE', type: 'Amount', amount: '50,000', qty: 7, capPrice: '7,400.00', freq: 'Monthly', next: '10 May 2026', start: '10 Oct 2024', end: '10 Oct 2027', installment: '19/36', pending: 17, failed: 0, execCount: 19, status: 'active', attempts: 0, createdOn: '08 Oct 2024 10:55', initiatedBy: 'Mehrunissa Ali', modifiedBy: 'Mehrunissa Ali' },
{ id: 'SIP-118688', ucc: 'CF118688', client: 'Faiz Rahman', scheme: 'Nippon Small Cap', symbol: '500325', exchange: 'BSE', type: 'Quantity', amount: '1,000', qty: 1, capPrice: '2,990.00', freq: 'Weekly', next: '06 May 2026', start: '06 Feb 2026', end: '06 Feb 2027', installment: '13/52', pending: 39, failed: 0, execCount: 13, status: 'pending', attempts: 0, createdOn: '04 Feb 2026 14:10', initiatedBy: 'Faiz Rahman', modifiedBy: 'Faiz Rahman' }];

const SIP_BADGE = {
  active: ['badge-success', 'Active'],
  failed: ['badge-danger', 'Failed'],
  paused: ['badge-warn', 'Paused'],
  pending: ['badge-info', 'Pending']
};
function SipView() {
  const [view, setView] = React.useState('equity');
  const [openSip, setOpenSip] = React.useState(null);
  return (
    <>
      <div className="tabs" style={{ marginBottom: 14 }}>
        <button className={view === 'equity'      ? 'active' : ''} onClick={() => setView('equity')}>Equity</button>
        <button className={view === 'mutualfund'  ? 'active' : ''} onClick={() => setView('mutualfund')}>Mutual Fund</button>
        <button className={view === 'analytics'   ? 'active' : ''} onClick={() => setView('analytics')}>Analytics</button>
      </div>
      <div className="stripe" style={{ marginBottom: 18 }}>
        <div><div className="label-mono">Active mandates</div><div className="value">38,412</div></div>
        <div><div className="label-mono">SIP Inflow (30D)</div><div className="value">₹14.2 Cr <span style={{ fontSize: 12, color: 'var(--emerald)', fontFamily: 'var(--mono)', fontWeight: 500 }}>+6.8%</span></div></div>
        <div><div className="label-mono">Failed SIP (30D)</div><div className="value">218</div></div>
        <div><div className="label-mono">Paused</div><div className="value">1,124</div></div>
        <div><div className="label-mono">Next 7D Execution</div><div className="value">₹4.18 Cr</div></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all',     lbl: 'All',     count: 38412 },
            { id: 'active',  lbl: 'Active',  count: 36890 },
            { id: 'failed',  lbl: 'Failed',  count: 218 },
            { id: 'paused',  lbl: 'Paused',  count: 1124 },
          ].map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={'cm-pill' + (i === 0 ? ' active' : '')}
            >
              {p.lbl}
              <span className="cm-pill-count">{p.count.toLocaleString('en-IN')}</span>
            </button>
          ))}
        </div>
        <div className="filter-input" style={{ marginLeft: 'auto' }}><Icon name="search" size={13} /><input placeholder="SIP id, client, scheme…" /></div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>SIP</th><th>UCC</th><th>Client</th>
                {view === 'mutualfund' && <th>Scheme</th>}
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th>Frequency</th><th>Next debit</th><th>Status</th><th>Retries</th>
              </tr>
            </thead>
            <tbody>
              {SIPS.map((s) => {
                const [cls, lab] = SIP_BADGE[s.status];
                const clickable = view === 'equity';
                return (
                  <tr key={s.id} onClick={clickable ? () => setOpenSip(s) : undefined} style={clickable ? { cursor: 'pointer' } : undefined}>
                    <td><span className="col-id">{s.id}</span></td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{s.ucc}</td>
                    <td>{s.client}</td>
                    {view === 'mutualfund' && <td>{s.scheme}</td>}
                    <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>₹{s.amount}</td>
                    <td><span className="pill">{s.freq}</span></td>
                    <td className="num">{s.next}</td>
                    <td><span className={"badge " + cls} style={{ minWidth: 82, justifyContent: 'center' }}><span className="badge-dot" />{lab}</span></td>
                    <td className="num">{s.attempts}/3</td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Showing 1–6 of 38,412</span>
          <div className="pages">
            <button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button>
          </div>
        </div>
      </div>
      <CodifiFoot />
      {openSip && <SipDetailDrawer sip={openSip} onClose={() => setOpenSip(null)} />}
    </>);

}

function SipDetailDrawer({ sip, onClose }) {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  const [cls, lab] = SIP_BADGE[sip.status];
  const Section = ({ title, items }) => (
    <div className="cm-col">
      <div className="cm-col-h" style={{ marginBottom: 10 }}>{title}</div>
      <div className="cm-kv-list">
        {items.map(([k, v, mono]) => (
          <div className="cm-kv" key={k}>
            <span>{k}</span>
            <span className={mono ? 'mono' : ''} style={mono ? { fontFamily: 'var(--mono)', fontSize: 12 } : undefined}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="cm-drawer-overlay" onClick={onClose}>
      <div className="card cm-drawer" onClick={(e) => e.stopPropagation()} style={{ width: 'min(720px, 96vw)' }}>
        <div className="cm-drawer-body">
          <div className="cm-detail-head">
            <div className="user-cell" style={{ flex: 1 }}>
              <div className="av" style={{ background: avatarColor(sip.client), width: 42, height: 42, fontSize: 14 }}>{initials(sip.client)}</div>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{sip.client}</h3>
                <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <span className="col-id">{sip.id}</span>
                  <span style={{ color: 'var(--muted-2)' }}>·</span>
                  <span className="mono" style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{sip.ucc}</span>
                  <span style={{ color: 'var(--muted-2)' }}>·</span>
                  <span>Equity SIP</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span className={'badge ' + cls} style={{ minWidth: 82, justifyContent: 'center' }}><span className="badge-dot" />{lab}</span>
              <span className="badge"><span className="badge-dot" />{sip.exchange} · {sip.symbol}</span>
            </div>
          </div>

          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line-2)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              ['Amount', '₹' + sip.amount],
              ['Quantity', sip.qty],
              ['Frequency', sip.freq],
              ['Installment', sip.installment],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{l}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{v}</div>
              </div>
            ))}
          </div>

          <div className="cm-detail-body">
            <Section title="Mandate" items={[
              ['Created on', sip.createdOn, true],
              ['User ID', sip.ucc, true],
              ['Symbol', sip.symbol, true],
              ['Exchange', sip.exchange],
              ['Frequency', sip.freq],
              ['Type', sip.type],
            ]} />
            <Section title="Schedule" items={[
              ['Amount', '₹' + sip.amount, true],
              ['Qty', sip.qty, true],
              ['Cap Price', '₹' + sip.capPrice, true],
              ['Start Date', sip.start, true],
              ['End Date', sip.end, true],
              ['Installment', sip.installment, true],
            ]} />
            <div className="cm-col" style={{ gridColumn: '1 / -1' }}>
              <div className="cm-col-h" style={{ marginBottom: 10 }}>Execution &amp; audit</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
                {[
                  ['Pending', sip.pending, 'var(--ink)'],
                  ['Failed', sip.failed, sip.failed > 0 ? 'var(--rose)' : 'var(--ink)'],
                  ['Execution Count', sip.execCount, 'var(--ink)'],
                ].map(([l, v, c]) => (
                  <div key={l} style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{l}</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, color: c, letterSpacing: '-0.01em', marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="cm-kv-list">
                <div className="cm-kv"><span>Status</span><span><span className={'badge ' + cls} style={{ minWidth: 82, justifyContent: 'center' }}><span className="badge-dot" />{lab}</span></span></div>
                <div className="cm-kv"><span>Initiated By</span><span>{sip.initiatedBy}</span></div>
                <div className="cm-kv"><span>Modified By</span><span>{sip.modifiedBy}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onClose} aria-label="Close" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 110, height: 44, padding: '0 18px', borderRadius: 999, background: 'var(--ink)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)' }}><Icon name="close" size={14} /> Close</button>
    </div>
  );
}

function ReportsView() {
  const REPORTS = [
    { id: 'RPT-EOD-001', name: 'EOD Trade Book', cat: 'Trading', freq: 'Daily', last: '07 May 2026 18:42', size: '4.8 MB', fmt: 'XLSX', status: 'ready' },
    { id: 'RPT-MIS-014', name: 'Margin Shortfall Statement', cat: 'Risk', freq: 'Daily', last: '07 May 2026 18:30', size: '1.2 MB', fmt: 'CSV', status: 'ready' },
    { id: 'RPT-SIP-022', name: 'SIP Failures (30D)', cat: 'SIP', freq: 'Weekly', last: '05 May 2026 09:00', size: '320 KB', fmt: 'CSV', status: 'ready' },
    { id: 'RPT-REG-008', name: 'SEBI Quarterly Filing', cat: 'Regulatory', freq: 'Quarterly', last: '01 Apr 2026 10:15', size: '12.4 MB', fmt: 'PDF', status: 'ready' },
    { id: 'RPT-CLI-031', name: 'New Client Activations', cat: 'Onboarding', freq: 'Weekly', last: '05 May 2026 09:02', size: '186 KB', fmt: 'XLSX', status: 'queued' },
    { id: 'RPT-FUN-019', name: 'Pay-in / Pay-out Reconciliation', cat: 'Funds', freq: 'Daily', last: '07 May 2026 19:05', size: '2.1 MB', fmt: 'CSV', status: 'ready' },
  ];
  const RPT_BADGE = { ready: ['badge-success', 'Ready'], queued: ['badge-info', 'Queued'], failed: ['badge-danger', 'Failed'] };
  return (
    <>
      <div className="stripe" style={{ marginBottom: 18 }}>
        <div><div className="label-mono">Reports available</div><div className="value">142</div></div>
        <div><div className="label-mono">Generated today</div><div className="value">38</div></div>
        <div><div className="label-mono">Scheduled</div><div className="value">22</div></div>
        <div><div className="label-mono">Failed (24h)</div><div className="value">2</div></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', lbl: 'All', count: 142 },
            { id: 'trading', lbl: 'Trading', count: 36 },
            { id: 'risk', lbl: 'Risk', count: 18 },
            { id: 'reg', lbl: 'Regulatory', count: 24 },
            { id: 'sip', lbl: 'SIP', count: 12 },
          ].map((p, i) => (
            <button key={p.id} type="button" className={'cm-pill' + (i === 0 ? ' active' : '')}>
              {p.lbl}<span className="cm-pill-count">{p.count}</span>
            </button>
          ))}
        </div>
        <div className="filter-input" style={{ marginLeft: 'auto' }}><Icon name="search" size={13} /><input placeholder="Search reports…" /></div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table className="data">
            <thead><tr>
              <th>Report ID</th><th>Name</th><th>Category</th><th>Frequency</th><th>Last generated</th><th>Format</th><th style={{ textAlign: 'right' }}>Size</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              {REPORTS.map((r) => {
                const [bcls, blab] = RPT_BADGE[r.status];
                return (
                  <tr key={r.id}>
                    <td><span className="col-id">{r.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{r.name}</td>
                    <td><span className="pill">{r.cat}</span></td>
                    <td>{r.freq}</td>
                    <td className="num" style={{ color: 'var(--muted)' }}>{r.last}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{r.fmt}</td>
                    <td className="num" style={{ textAlign: 'right' }}>{r.size}</td>
                    <td><span className={'badge ' + bcls} style={{ minWidth: 82, justifyContent: 'center' }}><span className="badge-dot" />{blab}</span></td>
                    <td style={{ textAlign: 'right' }}><button className="btn btn-sm" disabled={r.status !== 'ready'}>Download</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Showing 1–6 of 142</span>
          <div className="pages"><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div>
        </div>
      </div>
      <CodifiFoot />
    </>
  );
}

window.SipView = SipView;
window.SipDetailDrawer = SipDetailDrawer;
window.ReportsView = ReportsView;
window.PortfolioView = PortfolioView;

function UploadDataModal({ kind, onClose }) {
  const isHoldings = kind === 'holdings';
  const title = isHoldings ? 'Upload Holdings' : 'Upload Positions';
  const UPLOAD_TYPES = isHoldings
    ? [
        { id: 'dp_t1',     lbl: 'DP + T1 Holdings' },
        { id: 'dp_only',   lbl: 'DP Holdings only' },
        { id: 't1_only',   lbl: 'T1 Holdings only' },
        { id: 'corp_act',  lbl: 'Corporate actions adjustment' },
      ]
    : [
        { id: 'eod',       lbl: 'End-of-day positions' },
        { id: 'intraday',  lbl: 'Intraday positions' },
        { id: 'fno',       lbl: 'F&O positions' },
        { id: 'currency',  lbl: 'Currency positions' },
      ];
  const [uploadType, setUploadType] = React.useState(UPLOAD_TYPES[0].id);
  const [scope, setScope] = React.useState('all'); // all | individual
  const [mode, setMode]   = React.useState('append'); // append | replace
  const [client, setClient] = React.useState('');
  const [files, setFiles] = React.useState({ dp: null, t1: null, pos: null });
  const [drag, setDrag] = React.useState(null);

  const meta = isHoldings
    ? { time: '24 Mar 2026, 10:15 AM', by: 'Jane Smith', latest: 12, previous: 10, label: 'Holdings' }
    : { time: '08 May 2026, 09:08 AM', by: 'Jane Smith', latest: 384, previous: 361, label: 'Positions' };
  const delta = meta.latest - meta.previous;

  const HISTORY = [
    { date: '08/04/2026', by: 'Lucas Garcia',     userType: 'All',        file: 'pos_nse_fo_98768.xls',   fileC: 19, dbC: 19, segC: 19, beC: 19 },
    { date: '08/05/2026', by: 'Olivia Thomas',    userType: 'Individual', file: 'daily_combined_all.xlsx', fileC: 18, dbC: 18, segC: 18, beC: 18 },
    { date: '08/06/2026', by: 'Matthew Anderson', userType: 'All',        file: 'pos_nse_fo_98773.xls',   fileC: 17, dbC: 17, segC: 17, beC: 17 },
    { date: '08/07/2026', by: 'Daniel Martinez',  userType: 'Individual', file: 'pos_nse_fo_98775.xls',   fileC: 21, dbC: 21, segC: 21, beC: 21 },
    { date: '08/08/2026', by: 'James Wilson',     userType: 'All',        file: 'pos_nse_fo_98771.xls',   fileC: 16, dbC: 16, segC: 16, beC: 16 },
  ];

  const onPick = (key) => (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFiles(prev => ({ ...prev, [key]: f }));
    e.target.value = '';
  };
  const onDropFile = (key) => (e) => {
    e.preventDefault();
    setDrag(null);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) setFiles(prev => ({ ...prev, [key]: f }));
  };

  const dropZone = (key, label) => {
    const f = files[key];
    const active = drag === key;
    return (
      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(key); }}
        onDragLeave={() => setDrag(null)}
        onDrop={onDropFile(key)}
        style={{
          flex: 1, minWidth: 0,
          border: '1.5px dashed ' + (active ? 'var(--ink)' : f ? 'var(--emerald)' : 'var(--line)'),
          background: active ? 'var(--surface-2)' : f ? 'rgba(15,157,110,0.04)' : 'var(--surface)',
          borderRadius: 12, padding: '22px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer', textAlign: 'center',
          transition: 'border-color 120ms, background 120ms',
        }}
      >
        <input type="file" accept=".xls,.xlsx,.csv" hidden onChange={onPick(key)} />
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: f ? 'rgba(15,157,110,0.12)' : 'var(--primary-50)', display: 'grid', placeItems: 'center', color: f ? 'var(--emerald)' : 'var(--primary)' }}>
          <Icon name={f ? 'check' : 'upload'} size={18} />
        </div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.005em' }}>{label}</div>
        {f ? (
          <>
            <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 500, fontFamily: 'var(--mono)', wordBreak: 'break-all' }}>{f.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{(f.size / 1024).toFixed(1)} KB · ready to submit</div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setFiles(prev => ({ ...prev, [key]: null })); }}
              style={{ background: 'transparent', border: 0, color: 'var(--rose)', fontSize: 11.5, fontWeight: 500, cursor: 'pointer', padding: 4 }}
            >Remove</button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Click to upload or drag and drop</div>
            <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>.xls · less than 1 MB</div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); }}
              style={{ background: 'transparent', border: 0, color: 'var(--primary)', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginTop: 2 }}
            ><Icon name="download" size={12} /> Download template</button>
          </>
        )}
      </label>
    );
  };

  const seg = (value, options, set) => (
    <div style={{ display: 'inline-flex', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 3, gap: 2 }}>
      {options.map(o => {
        const a = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => set(o.id)}
            style={{
              height: 28, padding: '0 14px', borderRadius: 6,
              fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
              background: a ? 'var(--surface)' : 'transparent',
              color: a ? 'var(--ink)' : 'var(--muted)',
              border: 0, cursor: 'pointer',
              boxShadow: a ? 'var(--shadow-xs)' : 'none',
            }}
          >{o.lbl}</button>
        );
      })}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.42)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 101,
          width: 'min(960px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 32px)',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
          boxShadow: '0 24px 70px rgba(15,20,40,0.28), 0 6px 18px rgba(15,20,40,0.10)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid var(--line-2)', background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)', flex: '0 0 auto' }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{title}</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>Bulk upload · all users or a specific client</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--muted)', padding: 0, width: 28, height: 28, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="close" size={13} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div style={{ overflowY: 'auto', flex: '1 1 auto', minHeight: 0 }}>
          {/* Metadata strip — compact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '10px 22px', borderBottom: '1px solid var(--line-2)', background: 'var(--bg)', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Last updated</span>
              <span style={{ fontSize: 12, color: 'var(--ink)', fontFamily: 'var(--mono)', fontWeight: 500 }}>{meta.time}</span>
            </div>
            <div style={{ width: 1, height: 14, background: 'var(--line)' }} />
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>By</span>
              <span style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>{meta.by}</span>
            </div>
            <div style={{ width: 1, height: 14, background: 'var(--line)' }} />
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{meta.label} count</span>
              <span style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{meta.latest}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>vs</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', textDecoration: 'line-through' }}>{meta.previous}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 500, color: delta >= 0 ? 'var(--emerald)' : 'var(--rose)' }}>
                {delta >= 0 ? '+' : ''}{delta}
              </span>
            </div>
          </div>

          <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Upload Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>Upload Type</div>
              <div style={{ position: 'relative', width: 320, maxWidth: '100%' }}>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  style={{
                    appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                    width: '100%', height: 34, padding: '0 32px 0 12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)', borderRadius: 7,
                    fontFamily: 'inherit', fontSize: 13, color: 'var(--ink)',
                    fontWeight: 500, cursor: 'pointer', outline: 'none',
                  }}
                >
                  {UPLOAD_TYPES.map(t => (
                    <option key={t.id} value={t.id}>{t.lbl}</option>
                  ))}
                </select>
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', display: 'inline-flex' }}>
                  <Icon name="chevron-down" size={13} />
                </span>
              </div>
            </div>

            {/* Scope */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>Apply to</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div role="radiogroup" aria-label="Apply to" style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
                {[{ id: 'all', lbl: 'All Users' }, { id: 'individual', lbl: 'Individual User' }].map(o => {
                  const checked = scope === o.id;
                  return (
                    <label
                      key={o.id}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--ink)', fontWeight: 500, userSelect: 'none' }}
                    >
                      <input
                        type="radio"
                        name="upload-scope"
                        value={o.id}
                        checked={checked}
                        onChange={() => setScope(o.id)}
                        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: '1.5px solid ' + (checked ? 'var(--primary)' : 'var(--line)'),
                          background: 'var(--surface)',
                          display: 'inline-grid', placeItems: 'center',
                          transition: 'border-color 120ms',
                          flex: '0 0 auto',
                        }}
                      >
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: 'var(--primary)',
                          transform: checked ? 'scale(1)' : 'scale(0)',
                          transition: 'transform 120ms',
                        }} />
                      </span>
                      {o.lbl}
                    </label>
                  );
                })}
              </div>
              {scope === 'individual' && (
                <div className="filter-input" style={{ width: 280, paddingRight: 4 }}>
                  <Icon name="search" size={13} />
                  <input placeholder="Client ID, name or PAN…" value={client} onChange={(e) => setClient(e.target.value)} style={{ flex: 1, width: 'auto' }} />
                </div>
              )}
              </div>
            </div>

            {/* Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>Mode</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div role="radiogroup" aria-label="Mode" style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
                {[{ id: 'append', lbl: 'Add new files' }, { id: 'replace', lbl: 'Replace existing' }].map(o => {
                  const checked = mode === o.id;
                  return (
                    <label
                      key={o.id}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--ink)', fontWeight: 500, userSelect: 'none' }}
                    >
                      <input
                        type="radio"
                        name="upload-mode"
                        value={o.id}
                        checked={checked}
                        onChange={() => setMode(o.id)}
                        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: '1.5px solid ' + (checked ? 'var(--primary)' : 'var(--line)'),
                          background: 'var(--surface)',
                          display: 'inline-grid', placeItems: 'center',
                          transition: 'border-color 120ms',
                          flex: '0 0 auto',
                        }}
                      >
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: 'var(--primary)',
                          transform: checked ? 'scale(1)' : 'scale(0)',
                          transition: 'transform 120ms',
                        }} />
                      </span>
                      {o.lbl}
                    </label>
                  );
                })}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', flex: '1 1 220px', minWidth: 0 }}>
                {mode === 'append' ? 'Merge into the latest snapshot, keep existing rows.' : 'Discard previous file and replace with new upload.'}
              </div>
              </div>
            </div>

            {/* Drop zones */}
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>{isHoldings ? 'Holdings file' : 'Positions file'}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {isHoldings ? (
                  <>
                    {dropZone('dp', 'DP Holdings')}
                    {dropZone('t1', 'T1 Holdings')}
                  </>
                ) : (
                  dropZone('pos', 'Positions File')
                )}
              </div>
            </div>

            {/* Upload history */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.005em' }}>Upload history</div>
                  <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>last 5 days</span>
                </div>
                <button type="button" style={{ background: 'transparent', border: 0, color: 'var(--primary)', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="download" size={12} /> Download
                </button>
              </div>
              <div style={{ border: '1px solid var(--line-2)', borderRadius: 10, overflow: 'hidden' }}>
                <table className="data" style={{ fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Uploaded by</th>
                      <th>User type</th>
                      <th>File name</th>
                      <th className="num" style={{ textAlign: 'right' }}>File</th>
                      <th className="num" style={{ textAlign: 'right' }}>DB</th>
                      <th className="num" style={{ textAlign: 'right' }}>Segment</th>
                      <th className="num" style={{ textAlign: 'right' }}>Backend</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORY.map((r, i) => (
                      <tr key={i}>
                        <td className="mono" style={{ color: 'var(--muted)' }}>{r.date}</td>
                        <td>
                          <div className="user-cell">
                            <div className="av" style={{ background: avatarColor(r.by), width: 22, height: 22, fontSize: 9.5 }}>{initials(r.by)}</div>
                            <div className="uc-name" style={{ fontSize: 12 }}>{r.by}</div>
                          </div>
                        </td>
                        <td><span className="pill" style={{ fontSize: 10.5 }}>{r.userType}</span></td>
                        <td style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11.5 }}>{r.file}</td>
                        <td className="num" style={{ textAlign: 'right' }}>{r.fileC}</td>
                        <td className="num" style={{ textAlign: 'right' }}>{r.dbC}</td>
                        <td className="num" style={{ textAlign: 'right' }}>{r.segC}</td>
                        <td className="num" style={{ textAlign: 'right' }}>{r.beC}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-sm" style={{ height: 24, padding: '0 8px', fontSize: 11 }}><Icon name="eye" size={11} /> View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 22px', borderTop: '1px solid var(--line-2)', background: 'var(--bg)', flex: '0 0 auto' }}>
          <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>
            {(() => {
              const ready = isHoldings ? (files.dp ? 1 : 0) + (files.t1 ? 1 : 0) : (files.pos ? 1 : 0);
              const total = isHoldings ? 2 : 1;
              if (ready === 0) return 'No files selected';
              return ready + ' of ' + total + ' file' + (total > 1 ? 's' : '') + ' ready';
            })()}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-accent" onClick={onClose}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
window.UploadDataModal = UploadDataModal;

function HoldingsDetailDrawer({ row, rawHoldings, onClose }) {
  if (!row) return null;
  const totalPct = row.invested ? (row.pnl / row.invested) * 100 : 0;

  // Build per-stock status rows from raw holdings, padded with realistic stock-broker fields
  const ISIN_PREFIX = 'INE';
  const stockRows = rawHoldings.map((h, i) => {
    const seed = (h.symbol.charCodeAt(0) + h.qty + i) >>> 0;
    const isin = ISIN_PREFIX + ((seed * 7919) % 1000).toString().padStart(3, '0') + '01' + ((seed * 31) % 100).toString().padStart(2, '0');
    const buyAvg = parseFloat(h.avg.replace(/,/g, ''));
    const buyVal = buyAvg * h.qty;
    const days = (seed % 90) + 5;
    const updHrs = (seed % 23) + 1;
    const created = new Date(Date.now() - days * 86400000);
    const updated = new Date(Date.now() - updHrs * 3600000);
    const fmt = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const fmtT = (d) => d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    const authFlag = ((seed >> 2) & 1) === 0;
    const holdingType = ['DEMAT', 'BENEFICIARY', 'POOL', 'COLLATERAL'][seed % 4];
    const reqId = 'REQ' + (1000000 + ((seed * 13) % 9000000));
    const tenId = 'TEN' + ((seed * 17) % 100000).toString().padStart(5, '0');
    return {
      created: fmt(created),
      updated: fmtT(updated),
      qty: h.qty,
      isin,
      stock: h.symbol,
      exch: h.exch,
      buyAvg,
      buyVal,
      poa: row.poa,
      authFlag,
      holdingType,
      reqId,
      tenId,
    };
  });

  const fmtINR0 = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const fmtINR2 = (n) => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Earliest created and most recent updated across all stocks for the header summary
  const seedRow = (row.cid.charCodeAt(0) + row.uniqueStocks) >>> 0;
  const earliestDays = Math.max(...rawHoldings.map((h, i) => (((h.symbol.charCodeAt(0) + h.qty + i) >>> 0) % 90) + 5));
  const latestUpdHrs = Math.min(...rawHoldings.map((h, i) => (((h.symbol.charCodeAt(0) + h.qty + i) >>> 0) % 23) + 1));
  const createdDate = new Date(Date.now() - earliestDays * 86400000);
  const updatedDate = new Date(Date.now() - latestUpdHrs * 3600000);
  const fmtDate = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const fmtDateTime = (d) => d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="cm-drawer-overlay" onClick={onClose}>
      <div className="card cm-drawer" onClick={(e) => e.stopPropagation()} style={{ width: 'min(1180px, 96vw)' }}>
        <div className="cm-drawer-body">
        <div className="cm-detail-head">
          <div className="user-cell" style={{ flex: 1 }}>
            <div className="av" style={{ background: avatarColor(row.client), width: 42, height: 42, fontSize: 14 }}>{initials(row.client)}</div>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{row.client}</h3>
              <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span className="col-id">{row.cid}</span>
                <span style={{ color: 'var(--muted-2)' }}>·</span>
                <span>Holdings status</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span className={'badge ' + (row.poa ? 'badge-success' : 'badge-danger')}><span className="badge-dot" />POA · {row.poa ? 'Yes' : 'No'}</span>
            <span className="badge" title="Earliest created across stocks"><span className="badge-dot" />Created · {fmtDate(createdDate)}</span>
            <span className="badge" title="Most recent update across stocks"><span className="badge-dot" />Updated · {fmtDateTime(updatedDate)}</span>
          </div>
        </div>

        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line-2)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            ['Invested', fmtINR0(row.invested)],
            ['Current (BOD)', fmtINR0(row.current)],
            ['P&L', (row.pnl >= 0 ? '+' : '−') + fmtINR0(Math.abs(row.pnl)), row.pnl >= 0 ? 'var(--emerald)' : 'var(--rose)'],
            ['Return', (totalPct >= 0 ? '+' : '') + totalPct.toFixed(2) + '%', totalPct >= 0 ? 'var(--emerald)' : 'var(--rose)'],
          ].map(([l, v, c]) => (
            <div key={l}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{l}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, color: c || 'var(--ink)', letterSpacing: '-0.01em' }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="table-wrap" style={{ padding: '0 8px 18px' }}>
          <table className="data" style={{ fontSize: 12 }}>
            <thead>
              <tr>
                <th>Stock</th>
                <th className="mono">ISIN</th>
                <th className="num" style={{ textAlign: 'right' }}>Qty</th>
                <th className="num" style={{ textAlign: 'right' }}>Buy avg</th>
                <th className="num" style={{ textAlign: 'right' }}>Buy value</th>
                <th>Holding type</th>
                <th style={{ textAlign: 'center' }}>Auth flag</th>
                <th className="mono">Req ID</th>
                <th className="mono">Ten ID</th>
              </tr>
            </thead>
            <tbody>
              {stockRows.map((s, i) => (
                <tr key={i}>
                  <td>
                    <span style={{ fontWeight: 500 }}>{s.stock}</span>
                  </td>
                  <td className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s.isin}</td>
                  <td className="num" style={{ textAlign: 'right' }}>{s.qty}</td>
                  <td className="num" style={{ textAlign: 'right', color: 'var(--muted)' }}>{fmtINR2(s.buyAvg)}</td>
                  <td className="num" style={{ textAlign: 'right', fontWeight: 500 }}>{fmtINR0(s.buyVal)}</td>
                  <td><span className="pill" style={{ fontSize: 10.5 }}>{s.holdingType}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={'badge ' + (s.authFlag ? 'badge-info' : '')} style={{ minWidth: 36, justifyContent: 'center' }}>{s.authFlag ? 'AUTH' : 'PEND'}</span>
                  </td>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{s.reqId}</td>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{s.tenId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <button onClick={onClose} aria-label="Close" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 110, height: 44, padding: '0 18px', borderRadius: 999, background: 'var(--ink)', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)' }}><Icon name="close" size={14} /> Close</button>
    </div>
  );
}

window.HoldingsDetailDrawer = HoldingsDetailDrawer;
window.FundsView = FundsView;
window.SipView = SipView;


// ===== view-other.jsx =====
// Operations + Communications + Infrastructure + Settings views

// ─── Operations ─────────────────────────────────────────────
function OperationsView() {
  const [tab, setTab] = useState('content');
  return (
    <>
      <PageHeader active="operations" actions={
      <>
          <button className="btn"><Icon name="eye" size={13} /> Preview app</button>
          <button className="btn btn-accent"><Icon name="plus" size={13} /> New banner</button>
        </>
      } />

      <div className="tabs-underline">
        <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>App content</button>
        <button className={tab === 'market' ? 'active' : ''} onClick={() => setTab('market')}>Market content</button>
        <button className={tab === 'holdings' ? 'active' : ''} onClick={() => setTab('holdings')}>Holdings</button>
        <button className={tab === 'positions' ? 'active' : ''} onClick={() => setTab('positions')}>Positions</button>
        <button className={tab === 'logs' ? 'active' : ''} onClick={() => setTab('logs')}>Login logs</button>
      </div>

      <div className="section-grid-2" style={{ marginBottom: 14 }}>
        {[
        { title: 'Login banner', sub: 'Shown above sign-in form', status: 'Live', img: '#4762E3', cta: 'Open festival offers' },
        { title: 'Signup banner', sub: 'New user welcome', status: 'Scheduled', img: '#FF7A59', cta: 'Free 1-yr advisory' }].
        map((b, i) =>
        <div key={i} className="card">
            <div className="card-head">
              <h3>{b.title}</h3>
              <span className={"badge " + (b.status === 'Live' ? 'badge-success' : 'badge-warn')}><span className="badge-dot" />{b.status}</span>
              <div className="card-actions">
                <button className="btn btn-sm"><Icon name="edit" size={12} /> Edit</button>
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ height: 140, borderRadius: 10, background: `linear-gradient(135deg, ${b.img}, ${b.img}99)`, position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center', color: '#fff' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 18 }}>{b.cta}</div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>1080 × 540 · WebP · 84KB</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 12, color: 'var(--muted)' }}>
                <span>Impressions: <strong style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>184.2k</strong></span>
                <span>CTR: <strong style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>4.18%</strong></span>
                <span style={{ marginLeft: 'auto' }}>{b.sub}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Featured market content</h3>
          <span className="muted" style={{ fontSize: 12 }}>Pinned · home tab</span>
          <div className="card-actions">
            <button className="btn btn-sm"><Icon name="plus" size={12} /> Add card</button>
          </div>
        </div>
        <div className="card-body">
          <div className="section-grid-3">
            {[
            { tag: 'Nifty 50', val: '24,812.40', chg: '+0.84%', up: true },
            { tag: 'Bank Nifty', val: '52,108.20', chg: '-0.21%', up: false },
            { tag: 'India VIX', val: '13.42', chg: '-2.18%', up: false }].
            map((m, i) =>
            <div key={i} className="server-tile">
                <div className="label-mono">{m.tag}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>{m.val}</div>
                  <div className={"kpi-trend " + (m.up ? 'up' : 'down')}>
                    <Icon name={m.up ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />{m.chg}
                  </div>
                </div>
                <svg viewBox="0 0 200 40" style={{ width: '100%', height: 40 }}>
                  <polyline
                  points={Array.from({ length: 20 }, (_, j) => `${j * 10},${20 + (m.up ? -1 : 1) * Math.sin(j * 0.6 + i) * 8 - (m.up ? j * 0.5 : -j * 0.5)}`).join(' ')}
                  stroke={m.up ? 'var(--emerald)' : 'var(--rose)'} fill="none" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <CodifiFoot />
    </>);

}

// ─── Communications ─────────────────────────────────────────────
const CAMPAIGNS = [
{ id: 'CAMP-2042', name: 'Pre-market alert · 06 May', channel: 'Push', audience: 'Active traders', sent: '84,212', open: '62.1%', click: '18.4%', status: 'sent', time: '2h ago' },
{ id: 'CAMP-2041', name: 'SIP failure recovery', channel: 'In-app', audience: 'Failed SIPs', sent: '218', open: '48.2%', click: '21.1%', status: 'sent', time: '6h ago' },
{ id: 'CAMP-2040', name: 'KYC re-verify reminder', channel: 'Email', audience: 'Pending KYC', sent: '812', open: '38.4%', click: '9.2%', status: 'sent', time: '1d ago' },
{ id: 'CAMP-2039', name: 'Festival offer · banner', channel: 'In-app', audience: 'All clients', sent: '—', open: '—', click: '—', status: 'scheduled', time: 'in 2d' },
{ id: 'CAMP-2038', name: 'New SIP launches', channel: 'Push', audience: 'SIP investors', sent: '—', open: '—', click: '—', status: 'draft', time: '—' }];

const CAMP_BADGE = { sent: ['badge-success', 'Sent'], scheduled: ['badge-info', 'Scheduled'], draft: ['badge', 'Draft'] };

function CommsView() {
  return (
    <>
      <PageHeader active="communications" actions={
      <>
          <button className="btn"><Icon name="upload" size={13} /> Import audience</button>
          <button className="btn btn-accent"><Icon name="plus" size={13} /> New campaign</button>
        </>
      } />

      <div className="kpi-grid">
        {[
        { label: 'Sent (7d)', value: '1.24M', trend: '+12%', up: true, foot: '5 campaigns', color: 'var(--primary)' },
        { label: 'Open rate', value: '52.4', unit: '%', trend: '+3.1pp', up: true, foot: 'industry: 38%', color: 'var(--emerald)' },
        { label: 'CTR', value: '14.8', unit: '%', trend: '+1.2pp', up: true, foot: 'best: SIP recovery', color: 'var(--coral)' },
        { label: 'Unsubscribes', value: '124', trend: '+22', up: false, foot: 'last 7d', color: 'var(--rose)' }].
        map((k, i) =>
        <div className="kpi" key={i}>
            <div className="kpi-head"><span className="kpi-dot" style={{ background: k.color }} />{k.label}</div>
            <div className="kpi-value">{k.value}{k.unit && <span className="unit">{k.unit}</span>}</div>
            <span className={"kpi-trend " + (k.up ? 'up' : 'down')}>
              <Icon name={k.up ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />{k.trend}
            </span>
            <div className="kpi-foot">{k.foot}</div>
          </div>
        )}
      </div>

      <div className="chart-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <h3>Campaigns</h3>
            <div className="card-actions">
              <div className="tabs"><button className="active">All</button><button>Push</button><button>In-app</button><button>Email</button></div>
            </div>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Campaign</th><th>Channel</th><th>Audience</th><th style={{ textAlign: 'right' }}>Sent</th><th>Open</th><th>CTR</th><th>Status</th><th>Time</th></tr></thead>
              <tbody>
                {CAMPAIGNS.map((c) => {
                  const [cls, lab] = CAMP_BADGE[c.status];
                  const channelColor = { Push: 'var(--primary)', 'In-app': 'var(--coral)', Email: 'var(--violet)' };
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="uc-name">{c.name}</div>
                        <div className="uc-sub">{c.id}</div>
                      </td>
                      <td><span className="badge" style={{ borderColor: channelColor[c.channel], color: channelColor[c.channel] }}><span className="badge-dot" style={{ background: channelColor[c.channel] }} />{c.channel}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--muted)' }}>{c.audience}</td>
                      <td className="num" style={{ textAlign: 'right' }}>{c.sent}</td>
                      <td className="num">{c.open}</td>
                      <td className="num">{c.click}</td>
                      <td><span className={"badge " + cls}><span className="badge-dot" />{lab}</span></td>
                      <td className="num" style={{ color: 'var(--muted)' }}>{c.time}</td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Compose</h3><span className="muted" style={{ fontSize: 12 }}>Quick announcement</span></div>
          <div className="card-body">
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="field-label">Channel</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-sm" style={{ borderColor: 'var(--ink)', background: 'var(--ink)', color: '#fff' }}>Push</button>
                <button className="btn btn-sm">In-app</button>
                <button className="btn btn-sm">Email</button>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="field-label">Audience</div>
              <input className="input" defaultValue="All active clients · 13,184" />
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="field-label">Title</div>
              <input className="input" placeholder="Title shown to user" />
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="field-label">Message</div>
              <textarea className="input" placeholder="Your message…" defaultValue="Markets close early today at 14:00 IST. Place your orders before the bell." />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn">Save draft</button>
              <button className="btn btn-accent">Send · 13.1k</button>
            </div>
          </div>
        </div>
      </div>
      <CodifiFoot />
    </>);

}

// ─── Infrastructure ─────────────────────────────────────────────
const SERVERS = [
{ name: 'lama-01', region: 'ap-south-1', role: 'API', cpu: 62, mem: 48, conn: 412, status: 'op' },
{ name: 'lama-02', region: 'ap-south-1', role: 'API', cpu: 74, mem: 52, conn: 382, status: 'op' },
{ name: 'lama-03', region: 'ap-south-1', role: 'Worker', cpu: 38, mem: 40, conn: 21, status: 'op' },
{ name: 'lama-04', region: 'ap-south-1', role: 'Worker', cpu: 91, mem: 74, conn: 41, status: 'deg' },
{ name: 'lama-05', region: 'ap-south-2', role: 'API', cpu: 55, mem: 42, conn: 298, status: 'op' },
{ name: 'lama-06', region: 'ap-south-2', role: 'Stream', cpu: 28, mem: 35, conn: 118, status: 'op' },
{ name: 'lama-07', region: 'ap-south-2', role: 'Stream', cpu: 0, mem: 0, conn: 0, status: 'down' },
{ name: 'lama-08', region: 'ap-southeast-1', role: 'Edge', cpu: 42, mem: 38, conn: 84, status: 'op' }];

const SERVER_BADGE = { op: ['badge-success', 'Healthy'], deg: ['badge-warn', 'Degraded'], down: ['badge-danger', 'Offline'] };

function Gauge({ label, value, color }) {
  const v = Math.max(0, Math.min(100, value));
  const barColor = v > 80 ? 'var(--rose)' : v > 60 ? 'var(--amber)' : color || 'var(--primary)';
  return (
    <div className="gauge">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span className="label-mono" style={{ fontSize: 9 }}>{label}</span>
        <span className="num" style={{ fontSize: 11, fontWeight: 600 }}>{value}%</span>
      </div>
      <div className="bar"><span style={{ width: v + '%', background: barColor }} /></div>
    </div>);

}

function InfraView() {
  return (
    <>
      <PageHeader active="infra" actions={
      <>
          <button className="btn"><Icon name="refresh" size={13} /> Refresh</button>
          <button className="btn"><Icon name="book" size={13} /> Runbooks</button>
          <button className="btn btn-accent"><Icon name="plus" size={13} /> Add server</button>
        </>
      } />

      <div className="stripe" style={{ marginBottom: 18 }}>
        <div><div className="label-mono">Fleet size</div><div className="value">8 nodes <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 500 }}>3 regions</span></div></div>
        <div><div className="label-mono">Healthy</div><div className="value" style={{ color: 'var(--emerald)' }}>6</div></div>
        <div><div className="label-mono">Degraded</div><div className="value" style={{ color: 'var(--amber)' }}>1</div></div>
        <div><div className="label-mono">Offline</div><div className="value" style={{ color: 'var(--rose)' }}>1</div></div>
        <div><div className="label-mono">Queue depth</div><div className="value">1,284 <span style={{ fontSize: 11, color: 'var(--rose)', fontFamily: 'var(--mono)', fontWeight: 500 }}>+18%</span></div></div>
        <div><div className="label-mono">p95 latency</div><div className="value">82ms</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {SERVERS.map((s) => {
          const [cls, lab] = SERVER_BADGE[s.status];
          return (
            <div key={s.name} className="server-tile">
              <div className="st-head">
                <div className="st-icon"><Icon name="server" size={16} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--mono)', fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{s.region} · {s.role}</div>
                </div>
                <span className={"badge " + cls}><span className="badge-dot" />{lab}</span>
              </div>
              <div className="gauge-row">
                <Gauge label="CPU" value={s.cpu} />
                <Gauge label="MEM" value={s.mem} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                <span>conn {s.conn}</span>
                <span>uptime 99.{99 - Math.floor(Math.random() * 5)}%</span>
              </div>
            </div>);

        })}
      </div>

      <div className="card">
        <div className="card-head">
          <h3>Region overview</h3>
          <div className="card-actions">
            <span className="muted" style={{ fontSize: 12 }}>Auto-scaling: enabled</span>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>Region</th><th>Nodes</th><th>Load</th><th style={{ textAlign: 'right' }}>Throughput</th><th>p95</th><th>Errors</th><th>Status</th></tr></thead>
            <tbody>
              {[
              { r: 'ap-south-1 (Mumbai)', n: '4', load: 68, tp: '8.2k req/s', p: '78ms', err: '0.04%', s: 'op' },
              { r: 'ap-south-2 (Hyderabad)', n: '2', load: 42, tp: '3.1k req/s', p: '92ms', err: '0.18%', s: 'deg' },
              { r: 'ap-southeast-1 (Singapore)', n: '2', load: 38, tp: '1.8k req/s', p: '112ms', err: '0.02%', s: 'op' }].
              map((r, i) => {
                const [cls, lab] = SERVER_BADGE[r.s];
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{r.r}</td>
                    <td className="num">{r.n}</td>
                    <td style={{ width: 200 }}>
                      <div className="bar"><span style={{ width: r.load + '%' }} /></div>
                    </td>
                    <td className="num" style={{ textAlign: 'right' }}>{r.tp}</td>
                    <td className="num">{r.p}</td>
                    <td className="num">{r.err}</td>
                    <td><span className={"badge " + cls}><span className="badge-dot" />{lab}</span></td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </div>
      <CodifiFoot />
    </>);

}

// ─── Settings ─────────────────────────────────────────────
function SettingsView() {
  const [tab, setTab] = useState('branding');
  const [logo, setLogo] = useState(null);
  const fileRef = useRef(null);

  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setLogo(url);
  };

  return (
    <>
      <PageHeader active="settings" actions={
      <>
          <button className="btn">Discard</button>
          <button className="btn btn-accent"><Icon name="check" size={13} /> Save changes</button>
        </>
      } />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 8, height: 'fit-content' }}>
          {[
          { id: 'branding', icon: 'image', label: 'Branding' },
          { id: 'admins', icon: 'users', label: 'Admins & roles' },
          { id: 'security', icon: 'shield', label: 'Security' },
          { id: 'integrations', icon: 'cloud', label: 'Integrations' },
          { id: 'webhooks', icon: 'globe', label: 'API & webhooks' },
          { id: 'billing', icon: 'funds', label: 'Billing' }].
          map((s) =>
          <button key={s.id}
          onClick={() => setTab(s.id)}
          className="nav-item"
          style={{
            color: tab === s.id ? 'var(--ink)' : 'var(--muted)',
            background: tab === s.id ? 'var(--canvas)' : 'transparent',
            fontWeight: tab === s.id ? 600 : 500
          }}>
              <Icon name={s.icon} className="ni-icon" style={{ color: tab === s.id ? 'var(--primary)' : 'inherit' }} />
              <span>{s.label}</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tab === 'branding' &&
          <>
              <div className="card">
                <div className="card-head">
                  <h3>Workspace identity</h3>
                  <span className="muted" style={{ fontSize: 12 }}>Aspire Capital · Production</span>
                </div>
                <div className="card-body">
                  <div className="logo-uploader">
                    <div className="logo-preview">
                      {logo ? <img src={logo} alt="Client logo" /> : <div className="placeholder">120 × 120</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Client logo</div>
                      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 10 }}>
                        Square SVG or PNG, transparent background. Min 240×240. Shown on auth screens, statements and exported reports.
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} hidden />
                        <button className="btn btn-accent" onClick={() => fileRef.current?.click()}><Icon name="upload" size={13} /> Upload logo</button>
                        {logo && <button className="btn" onClick={() => setLogo(null)}>Remove</button>}
                      </div>
                    </div>
                  </div>

                  <hr className="divider" />

                  <div className="section-grid-2" style={{ gap: 14 }}>
                    <div className="field">
                      <div className="field-label">Workspace name</div>
                      <input className="input" defaultValue="Aspire Capital" />
                    </div>
                    <div className="field">
                      <div className="field-label">Display short code</div>
                      <input className="input" defaultValue="ASPIRE" />
                    </div>
                    <div className="field">
                      <div className="field-label">Primary brand color</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {['#4762E3', '#FF7A59', '#0F9D6E', '#8B5CF6', '#0EA5B7', '#0B0F17'].map((c) =>
                      <div key={c} style={{ width: 30, height: 30, borderRadius: 8, background: c, border: '2px solid ' + (c === '#4762E3' ? 'var(--ink)' : 'transparent'), cursor: 'pointer' }} />
                      )}
                        <input className="input" defaultValue="#4762E3" style={{ width: 120, fontFamily: 'var(--mono)' }} />
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-label">Support email</div>
                      <input className="input" defaultValue="support@aspire.in" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-head"><h3>Co-branding</h3><span className="muted" style={{ fontSize: 12 }}>How CodiFi is shown alongside your brand</span></div>
                <div className="card-body">
                  <div className="status-row">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>Show "Powered by CodiFi" on auth pages</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Subtle footer mark · recommended for trust signal</div>
                    </div>
                    <div className="toggle on"></div>
                  </div>
                  <div className="status-row">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>Include CodiFi mark on PDF statements</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Bottom-right corner, 12px</div>
                    </div>
                    <div className="toggle on"></div>
                  </div>
                  <div className="status-row">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>White-label mobile app icon</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Replace CodiFi monogram with your logo on iOS/Android</div>
                    </div>
                    <div className="toggle"></div>
                  </div>
                </div>
              </div>
            </>
          }

          {tab === 'admins' &&
          <div className="card">
              <div className="card-head">
                <h3>Admins & roles</h3>
                <span className="badge">7 admins</span>
                <div className="card-actions">
                  <button className="btn btn-accent btn-sm"><Icon name="plus" size={12} /> Invite admin</button>
                </div>
              </div>
              <div className="table-wrap">
                <table className="data">
                  <thead><tr><th>User</th><th>Role</th><th>Scope</th><th>2FA</th><th>Last active</th><th></th></tr></thead>
                  <tbody>
                    {[
                  { n: 'Rohan Mehta', e: 'rohan@aspire.in', role: 'Super Admin', scope: 'All workspaces', mfa: true, last: '2m' },
                  { n: 'Neha Sridhar', e: 'neha.s@aspire.in', role: 'Compliance', scope: 'KYC, Risk', mfa: true, last: '18m' },
                  { n: 'Vikram Joshi', e: 'vikram.j@aspire.in', role: 'Operations', scope: 'Trading, Funds', mfa: true, last: '2h' },
                  { n: 'Ananya Pillai', e: 'ananya@aspire.in', role: 'Support L2', scope: 'Clients (read)', mfa: false, last: '1d' },
                  { n: 'Suresh Rao', e: 'suresh.r@aspire.in', role: 'Finance', scope: 'Funds, Reports', mfa: true, last: '4h' }].
                  map((u) =>
                  <tr key={u.e}>
                        <td>
                          <div className="user-cell">
                            <div className="av" style={{ background: avatarColor(u.n) }}>{initials(u.n)}</div>
                            <div><div className="uc-name">{u.n}</div><div className="uc-sub">{u.e}</div></div>
                          </div>
                        </td>
                        <td><span className="pill">{u.role}</span></td>
                        <td style={{ fontSize: 12, color: 'var(--muted)' }}>{u.scope}</td>
                        <td>{u.mfa ? <span className="badge badge-success"><span className="badge-dot" />Enabled</span> : <span className="badge badge-warn"><span className="badge-dot" />Off</span>}</td>
                        <td className="num" style={{ color: 'var(--muted)' }}>{u.last} ago</td>
                        <td><button className="icon-btn" style={{ width: 28, height: 28 }}><Icon name="more" size={13} /></button></td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          }

          {tab === 'security' &&
          <div className="card">
              <div className="card-head"><h3>Security</h3></div>
              <div className="card-body">
                {[
              { t: 'Require 2FA for all admins', s: 'Authenticator app or hardware key', on: true },
              { t: 'Session timeout', s: 'Auto sign-out after 30 minutes of inactivity', on: true },
              { t: 'IP allow-list', s: 'Restrict admin access to office IPs', on: false },
              { t: 'Sensitive action approvals', s: 'Require 2 admins for blocks, refunds, mass actions', on: true },
              { t: 'Audit log retention', s: 'Retain admin audit logs for 365 days', on: true }].
              map((s, i) =>
              <div key={i} className="status-row">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{s.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.s}</div>
                    </div>
                    <div className={"toggle " + (s.on ? 'on' : '')}></div>
                  </div>
              )}
              </div>
            </div>
          }

          {tab === 'integrations' &&
          <div className="card">
              <div className="card-head"><h3>Integrations</h3></div>
              <div className="card-body">
                <div className="section-grid-3">
                  {[
                { n: 'NSE', d: 'Market feed', on: true, c: 'var(--primary)' },
                { n: 'BSE', d: 'Market feed', on: true, c: 'var(--coral)' },
                { n: 'ICICI', d: 'Payments', on: true, c: 'var(--amber)' },
                { n: 'HDFC', d: 'Payments', on: true, c: 'var(--emerald)' },
                { n: 'CVL', d: 'KYC', on: true, c: 'var(--violet)' },
                { n: 'Razorpay', d: 'Payments', on: false, c: 'var(--ink)' }].
                map((i, k) =>
                <div key={k} className="server-tile">
                      <div className="st-head">
                        <div className="st-icon" style={{ background: i.c + '22', color: i.c }}>{i.n[0]}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{i.n}</div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{i.d}</div>
                        </div>
                        <div className={"toggle " + (i.on ? 'on' : '')}></div>
                      </div>
                      <button className="btn btn-sm" style={{ alignSelf: 'flex-start' }}>Configure <Icon name="chevR" size={11} /></button>
                    </div>
                )}
                </div>
              </div>
            </div>
          }

          {(tab === 'webhooks' || tab === 'billing') &&
          <div className="card">
              <div className="card-head"><h3>{tab === 'webhooks' ? 'API & webhooks' : 'Billing'}</h3></div>
              <div className="card-body" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                <Icon name={tab === 'webhooks' ? 'globe' : 'funds'} size={32} style={{ opacity: 0.4, marginBottom: 8 }} />
                <div style={{ fontSize: 13 }}>This section is coming soon.</div>
              </div>
            </div>
          }
        </div>
      </div>

      <CodifiFoot />
    </>);

}

window.OperationsView = OperationsView;
window.CommsView = CommsView;
window.InfraView = InfraView;
window.SettingsView = SettingsView;




// ===== App =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "range": "24H",
  "showAvg": true,
  "fillToday": true,
  "smooth": true,
  "accent": "#4762E3",
  "windowMin": 60,
  "showRolling": true
}/*EDITMODE-END*/;

function App() {
  const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(() => {
    try {return localStorage.getItem('codifi-sidebar-collapsed') === '1';} catch (e) {return false;}
  });

  useEffect(() => {
    try {localStorage.setItem('codifi-sidebar-collapsed', collapsed ? '1' : '0');} catch (e) {}
  }, [collapsed]);

  // Expose tweaks to chart components (read fresh on each render via window)
  window.__loginTweaks = t;
  window.__setLoginTweak = setTweak;

  const VIEWS = {
    dashboard: DashboardView,
    'login-insights': LoginInsightsView,
    clients: ClientsView,
    portfolio: PortfolioView,
    funds: FundsView,
    sip: SipView,
    reports: ReportsView,
    operations: OperationsView,
    communications: CommsView,
    infra: InfraView,
    settings: SettingsView
  };

  // Expose nav so Insights button can switch view
  window.__navigate = setActive;

  const View = VIEWS[active] || DashboardView;

  return (
    <div className={"app" + (collapsed ? " sidebar-collapsed" : "")} data-screen-label={"Admin · " + active}>
      <Sidebar active={active} onSelect={setActive} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="main">
        <Topbar active={active} />
        <div className="page">
          <View />
        </div>
      </div>
      <TweaksPanel title="Login chart tweaks">
        <TweakSection label="Time range" />
        <TweakRadio label="Range" value={t.range}
          options={['1H', '24H', '7D', '30D']}
          onChange={(v) => setTweak('range', v)} />
        <TweakSection label="Line chart" />
        <TweakToggle label="30-day avg overlay" value={t.showAvg}
          onChange={(v) => setTweak('showAvg', v)} />
        <TweakToggle label="Fill under today" value={t.fillToday}
          onChange={(v) => setTweak('fillToday', v)} />
        <TweakToggle label="Smooth curve" value={t.smooth}
          onChange={(v) => setTweak('smooth', v)} />
        <TweakColor label="Accent" value={t.accent}
          options={['#4762E3', '#0F9D6E', '#FF7A59', '#8B5CF6', '#0B0F17']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Per-minute bars" />
        <TweakSlider label="Window" value={t.windowMin} min={15} max={120} step={15} unit="min"
          onChange={(v) => setTweak('windowMin', v)} />
        <TweakToggle label="Rolling 5-min mean" value={t.showRolling}
          onChange={(v) => setTweak('showRolling', v)} />
      </TweaksPanel>
    </div>);

}

function mount() {
  if (!window.useTweaks) { setTimeout(mount, 30); return; }
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
mount();
