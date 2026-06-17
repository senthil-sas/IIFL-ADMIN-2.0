import { ref } from 'vue'
import { useStore } from '../../../store'
import { fDate } from '../utils/timeHelpers'

export function useJourneyData() {
  const store = useStore()

  const journeyData = ref(null)
  const loading = ref(false)
  const fetchError = ref(null)
  const headerUser = ref('—')
  const headerDate = ref('—')

  async function fetchJourney({ uid, date }) {
    // date arrives as DDMMYYYY (already converted by JourneySidebar)
    const token = store.state.auth.token || localStorage.getItem('codifi-auth-token')
    if (!token) {
      fetchError.value = 'No active session. Please log in again.'
      return
    }

    loading.value = true
    fetchError.value = null

    try {
      const res = await fetch(
        'https://marketsapi.iiflcapital.com/adminrest/log/access/userjourney',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ userId: uid, date }),
        }
      )
      if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + res.statusText)

      const json = await res.json()
      if (!['Ok', 'ok', 'OK', 'success', 'Success'].includes(json.status))
        throw new Error(json.message || 'API status: ' + json.status)
      if (!json.result?.length) throw new Error('No data for this user/date')

      journeyData.value = json.result[0]
      headerUser.value  = uid
      headerDate.value  = fDate(date)   // date is DDMMYYYY → "11 Jun 2026"
    } catch (e) {
      fetchError.value  = e.message || 'Unknown error'
      journeyData.value = null
    } finally {
      loading.value = false
    }
  }

  return { journeyData, loading, fetchError, headerUser, headerDate, fetchJourney }
}
