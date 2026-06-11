import { store } from '../store'
import router from '../router'

/**
 * Authenticated fetch wrapper.
 * - Injects Authorization: Bearer <token> on every request.
 * - On 401: clears auth, sets sessionExpired flag, redirects to /login.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = store.getters['auth/token'] as string | null

  const headers = new Headers(options.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    store.commit('auth/setSessionExpired', true)
    store.commit('auth/clearAuth')
    router.push({ name: 'login' })
  }

  return res
}
