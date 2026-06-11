export type ViewId =
  | 'dashboard'
  | 'login-insights'
  | 'clients'
  | 'portfolio'
  | 'funds'
  | 'sip'
  | 'reports'
  | 'operations'
  | 'communications'
  | 'infra'
  | 'settings'

export interface NavItem {
  id: ViewId
  label: string
  icon: string
  count?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface PageMeta {
  title: string
  subtitle: string
  parent?: string
}

export type TweakRange = '1H' | '24H' | '7D' | '30D'

export interface TweaksState {
  range: TweakRange
  showAvg: boolean
  fillToday: boolean
  smooth: boolean
  accent: string
  windowMin: number
  showRolling: boolean
}
