import { ref, computed, readonly } from 'vue'
import { authFetch } from '../services/api'

interface LoginDetailsResult {
  web: number
  mob: number
  api: number
  mobAndroid: number
  mobIos: number
  webExternal: number
  webInternal: number
  sso: number | null
  totalCount: number
}

// Module-level singletons — fetch runs once, all consumers share state
const data = ref<LoginDetailsResult | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const fetchedAt = ref<Date | null>(null)
let inflightPromise: Promise<void> | null = null

export function useLoginDetails() {
  function load(): Promise<void> {
    if (inflightPromise) return inflightPromise
    loading.value = true
    error.value = null
    inflightPromise = (async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_BASEURL}adminrest/user/login/details`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: { status: string; message?: string; result?: LoginDetailsResult[] } = await res.json()
        if (json.status !== 'Ok' || !json.result?.[0]) throw new Error(json.message ?? 'No data')
        data.value = json.result[0]
        fetchedAt.value = new Date()
      } catch (e: unknown) {
        error.value = e instanceof Error ? e.message : 'Failed to load login details'
        inflightPromise = null // allow retry
      } finally {
        loading.value = false
      }
    })()
    return inflightPromise
  }

  const androidCount = computed(() => data.value?.mobAndroid ?? 0)
  const iosCount = computed(() => data.value?.mobIos ?? 0)
  const mobileCount = computed(() => androidCount.value + iosCount.value)
  const webCount = computed(
    () => (data.value?.webInternal ?? 0) + (data.value?.webExternal ?? 0) + (data.value?.web ?? 0),
  )
  const apiCount = computed(() => data.value?.api ?? 0)
  const totalCount = computed(() => data.value?.totalCount ?? 0)

  const fetchedAtLabel = computed(() => {
    if (!fetchedAt.value) return ''
    return fetchedAt.value.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  })

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    androidCount,
    iosCount,
    mobileCount,
    webCount,
    apiCount,
    totalCount,
    fetchedAtLabel,
    load,
  }
}
