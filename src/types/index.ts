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
  | 'journey-analyzer'
  | 'logs'

export interface NavItem {
  id: ViewId
  label: string
  icon: string
  count?: string
  newTab?: boolean
  externalPath?: string
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

export interface AuthUser {
  ucc: string
  name: string
  givenName: string
  familyName: string
  email: string
  roles: string[]
  sub: string
  exp: number
}

export interface AuthState {
  token: string | null
  user: AuthUser | null
  loading: boolean
  error: string | null
  sessionExpired: boolean
}
