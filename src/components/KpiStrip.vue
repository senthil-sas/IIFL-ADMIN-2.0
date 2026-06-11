<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { useLoginDetails } from '../composables/useLoginDetails'

const { totalCount, loading, fetchedAtLabel } = useLoginDetails()

const fmt = (n: number) => n.toLocaleString('en-IN')

const totalLoginsLabel = computed(() =>
  fetchedAtLabel.value ? `Total Logins (${fetchedAtLabel.value})` : 'Total Logins',
)

const totalLoginsValue = computed(() => (loading.value ? '—' : fmt(totalCount.value)))

interface Kpi {
  label: string
  value: string
  unit: string
  trend: string
  up: boolean
  color: string
}

const KPIs = computed<Kpi[]>(() => [
  { label: 'Active Clients (BOD)', value: '14,283', unit: '', trend: '+2.4%', up: true, color: 'var(--coral)' },
  { label: totalLoginsLabel.value, value: totalLoginsValue.value, unit: '', trend: '+11.0%', up: true, color: 'var(--primary)' },
  { label: 'Total Trades', value: '38,412', unit: '', trend: '+6.2%', up: true, color: 'var(--violet)' },
  { label: 'AUM', value: '₹2,847', unit: 'Cr', trend: '+0.8%', up: true, color: 'var(--emerald)' },
])
</script>

<template>
  <div class="kpi-grid">
    <div class="kpi" v-for="(k, i) in KPIs" :key="i">
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
    </div>
  </div>
</template>
