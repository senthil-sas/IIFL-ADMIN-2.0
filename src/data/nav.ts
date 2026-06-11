import type { NavGroup, PageMeta, ViewId } from '../types'

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Workspace',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'clients', label: 'Client Management', icon: 'users', count: '14.2k' },
      { id: 'portfolio', label: 'Portfolio & Watchlist', icon: 'portfolio' },
      { id: 'funds', label: 'Funds & Payments', icon: 'funds', count: '23' },
      { id: 'sip', label: 'SIP Management', icon: 'sip' },
      { id: 'reports', label: 'Reports', icon: 'file' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'operations', label: 'Operations', icon: 'operations' },
      { id: 'communications', label: 'Communications', icon: 'chat' },
      { id: 'infra', label: 'Infrastructure', icon: 'server' },
    ],
  },
  {
    label: 'Admin',
    items: [{ id: 'settings', label: 'Settings', icon: 'settings' }],
  },
]

export const PAGE_TITLES: Record<ViewId, PageMeta> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Real-time overview of platform activity, login traffic, and trading load.',
  },
  'login-insights': {
    title: 'Insights',
    parent: 'Dashboard',
    subtitle: 'Deep look at logins, trades and behavior across today’s session.',
  },
  clients: {
    title: 'Client Management',
    subtitle: 'All onboarded investors, KYC status and account states.',
  },
  portfolio: {
    title: 'Portfolio & Watchlist',
    subtitle: 'Client holdings, watchlists and order flow.',
  },
  funds: { title: '', subtitle: '' },
  sip: {
    title: 'SIP Management',
    subtitle: 'Active mandates, schedules and exception queue.',
  },
  reports: {
    title: 'Reports',
    subtitle: 'Scheduled exports, regulatory filings and ad-hoc downloads.',
  },
  operations: {
    title: 'Operations',
    subtitle: 'Market content, app banners, holdings and positions.',
  },
  communications: {
    title: 'Communications',
    subtitle: 'Push, in-app messages and announcements.',
  },
  infra: {
    title: 'Infrastructure · LAMA',
    subtitle: 'LAMA fleet, regions, queue depth and health.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Workspace branding, admins, roles and integrations.',
  },
}
