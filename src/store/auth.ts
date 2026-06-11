import type { Module } from 'vuex'
import type { RootState } from './index'
import type { AuthState, AuthUser } from '../types'

const TOKEN_KEY = 'codifi-auth-token'
const USER_KEY = 'codifi-auth-user'

function loadToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    const user: AuthUser = JSON.parse(raw)
    // Discard expired sessions
    if (user.exp && Date.now() / 1000 > user.exp) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      return null
    }
    return user
  } catch {
    return null
  }
}

function initToken(): string | null {
  const user = loadUser()
  if (!user) return null
  return loadToken()
}

export const authModule: Module<AuthState, RootState> = {
  namespaced: true,

  state: (): AuthState => ({
    token: initToken(),
    user: loadUser(),
    loading: false,
    error: null,
    sessionExpired: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    user: (state) => state.user,
    token: (state) => state.token,
    initials: (state) => {
      if (!state.user) return '?'
      const parts = state.user.name.trim().split(/\s+/).filter(Boolean)
      if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      return parts[0]?.substring(0, 2).toUpperCase() ?? '?'
    },
  },

  mutations: {
    setLoading(state, val: boolean) {
      state.loading = val
    },
    setError(state, msg: string | null) {
      state.error = msg
    },
    setSessionExpired(state, val: boolean) {
      state.sessionExpired = val
    },
    setAuth(state, payload: { token: string; user: AuthUser }) {
      state.token = payload.token
      state.user = payload.user
      state.error = null
      state.sessionExpired = false
      try {
        localStorage.setItem(TOKEN_KEY, payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
      } catch { /* ignore */ }
    },
    clearAuth(state) {
      state.token = null
      state.user = null
      try {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      } catch { /* ignore */ }
    },
  },

  actions: {
    async login({ commit }, params: { clientid: string; authcode: string }) {
      commit('setLoading', true)
      commit('setError', null)
      try {
        const { fetchUserSession } = await import('../services/auth')
        const result = await fetchUserSession(params)
        commit('setAuth', result)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Authentication failed'
        commit('setError', msg)
      } finally {
        commit('setLoading', false)
      }
    },

    logout({ commit }) {
      commit('clearAuth')
    },
  },
}
