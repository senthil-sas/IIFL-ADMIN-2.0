import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { store } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { public: true },
  },
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/login-insights', name: 'login-insights', component: () => import('../views/LoginInsightsView.vue') },
  { path: '/clients', name: 'clients', component: () => import('../views/ClientsView.vue') },
  { path: '/portfolio', name: 'portfolio', component: () => import('../views/PortfolioView.vue') },
  { path: '/funds', name: 'funds', component: () => import('../views/FundsView.vue') },
  { path: '/sip', name: 'sip', component: () => import('../views/SipView.vue') },
  { path: '/reports', name: 'reports', component: () => import('../views/ReportsView.vue') },
  { path: '/operations', name: 'operations', component: () => import('../views/OperationsView.vue') },
  { path: '/communications', name: 'communications', component: () => import('../views/CommsView.vue') },
  { path: '/infra', name: 'infra', component: () => import('../views/InfraView.vue') },
  { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
  { path: '/logs', name: 'logs', component: () => import('../views/logs.vue') },
  {
    path: '/userjourney',
    name: 'journey-analyzer',
    component: () => import('../views/userJourney/index.vue'),
    meta: { public: false, standalone: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'] as boolean
  const isPublic = to.meta.public === true

  if (isPublic) {
    // Already logged in → skip login page, go to dashboard
    if (isAuthenticated && to.name === 'login') return next({ name: 'dashboard' })
    return next()
  }

  if (!isAuthenticated) {
    // Pass along SSO params if they landed on a protected route directly
    const { clientid, authcode, appsecret } = to.query as Record<string, string>
    if (clientid && authcode && appsecret) {
      return next({ name: 'login', query: { clientid, authcode, appsecret, redirect: to.fullPath } })
    }
    return next({ name: 'login' })
  }

  next()
})

export default router
