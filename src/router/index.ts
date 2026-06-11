import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
