import { authFetch } from './api'

const BASE_URL = import.meta.env.VITE_BASEURL as string

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

  contractDetails() {
    const prefix = 'adminrest'
    return this.get(`${prefix}/contract/details`)
  }

  getStatusCount() {
    const prefix = 'adminrest'
    return this.get(`${prefix}/log/status/count`)
  }

  getUserDetails(payload: { pageNo: number; pageSize: number }) {
    const prefix = 'adminrest'
    return this.post(`${prefix}/log/user/details`, payload)
  }

  getHoldings(payload: { pageNo: number; pageSize: number }) {
    const prefix = 'adminrest'
    return this.post(`${prefix}/log/holding`, payload)
  }

  getHoldingDetails(payload: { userId: string }) {
    const prefix = 'adminrest'
    return this.post(`${prefix}/log/holding/details`, payload)
  }

  getLoginChart(date?: string) {
    const prefix = 'adminrest'
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const payload = { date: date ?? `${dd}${mm}${yyyy}` }
    return this.post(`${prefix}/log/login/chart`, payload)
  }
}

export const httpService = new HttpService()
