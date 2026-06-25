<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from './Icon.vue'
import { useLoginDetails } from '../composables/useLoginDetails'
import { httpService } from '../services/httpservices'

const { totalCount, loading: loginsLoading, fetchedAtLabel } = useLoginDetails()

const activeClientsCount = ref<number | null>(null)
const activeClientsLoading = ref(true)

onMounted(async () => {
  activeClientsLoading.value = true
  activeClientsCount.value = null
  try {
    const res = await httpService.getStatusCount()
    const item = res.data?.result?.find((r: { statusName: string }) => r.statusName === 'ACTIVE_USER')
    if (item) activeClientsCount.value = item.userCount
  } finally {
    activeClientsLoading.value = false
  }
})

const fmt = (n: number) => n.toLocaleString('en-IN')

const totalLoginsLabel = computed(() =>
  fetchedAtLabel.value ? `Total Logins (${fetchedAtLabel.value})` : 'Total Logins',
)

interface Kpi {
  label: string
  value: string
  unit: string
  trend: string
  up: boolean
  color: string
  loading: boolean
}

const KPIs = computed<Kpi[]>(() => [
  {
    label: 'Active Clients (BOD)',
    value: activeClientsCount.value !== null ? fmt(activeClientsCount.value) : '—',
    unit: '', trend: '+2.4%', up: true, color: 'var(--coral)',
    loading: activeClientsLoading.value,
  },
  {
    label: totalLoginsLabel.value,
    value: loginsLoading.value ? '—' : fmt(totalCount.value),
    unit: '', trend: '+11.0%', up: true, color: 'var(--primary)',
    loading: loginsLoading.value,
  },
  { label: 'Total Trades', value: '38,412', unit: '', trend: '+6.2%', up: true, color: 'var(--violet)', loading: false },
  { label: 'AUM', value: '₹2,847', unit: 'Cr', trend: '+0.8%', up: true, color: 'var(--emerald)', loading: false },
])
</script>

<template>
  <div class="kpi-grid">
    <div class="kpi" v-for="(k, i) in KPIs" :key="i">
      <template v-if="k.loading">
        <div class="kpi-head">
          <span class="kpi-dot" :style="{ background: k.color }"></span>
          <div class="skel-line skel-kpi-label" />
        </div>
        <div class="skel-line skel-kpi-value" />
        <div class="skel-line skel-kpi-trend" />
      </template>
      <template v-else>
        <div class="kpi-head">
          <span class="kpi-dot" :style="{ background: k.color }"></span>
          {{ k.label }}
        </div>
        <div class="kpi-value">
          {{ k.value }}<span class="unit" v-if="k.unit">{{ k.unit }}</span>
        </div>
        <span class="kpi-trend" :class="k.up ? 'up' : 'down'">
          <Icon :name="k.up ? 'arrowUp' : 'arrowDown'" :size="11" :stroke="2" />{{ k.trend }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.skel-line {
  border-radius: 4px;
  background: linear-gradient(90deg, var(--line-2) 25%, var(--surface-2, #efefef) 50%, var(--line-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.skel-kpi-label { height: 11px; width: 65%; }
.skel-kpi-value { height: 30px; width: 55%; margin: 10px 0 8px; }
.skel-kpi-trend { height: 11px; width: 30%; }
@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
</style>
