import { authFetch } from './api'

const BASE_URL = import.meta.env.VITE_BASEURL as string
const IS_LIVE = import.meta.env.VITE_ENV === 'live'

class HttpService {
  async get(endpoint: string) {
    const res = await authFetch(`${BASE_URL}${endpoint}`)
    const data = await res.json()
    return { status: res.status, data }
  }

  async post(endpoint: string, payload: unknown) {
    const res = await authFetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    return { status: res.status, data }
  }

  getClickhouseAccessLogV2(payload: unknown) {
    const prefix = 'adminrest';
    return this.post(`${prefix}/log/filter/access/v1`, payload)
  }

  postClickhouseAccessLogV2Details(payload: unknown) {
    const prefix = 'adminrest';
    return this.post(`${prefix}/log/filter/access/v1/details`, payload)
  }
}

export const httpService = new HttpService()
