<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KpiStrip from '../components/KpiStrip.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import LoginAnalysisChart from '../components/charts/LoginAnalysisChart.vue'
import LoginAnalyticsExtra from '../components/charts/LoginAnalyticsExtra.vue'
import SystemStatus from '../components/charts/SystemStatus.vue'
import ActivityFeed from '../components/charts/ActivityFeed.vue'
import { useLoginDetails } from '../composables/useLoginDetails'

const tab = ref<'login' | 'health' | 'actions'>('login')
const { reload } = useLoginDetails()
onMounted(reload)
watch(tab, (val) => { if (val === 'login') reload() })
</script>

<template>
  <div class="tabs" style="margin-bottom:16px">
    <button :class="tab === 'login' ? 'active' : ''" @click="tab = 'login'">Login Analytics</button>
    <button :class="tab === 'health' ? 'active' : ''" @click="tab = 'health'">System Health</button>
    <button :class="tab === 'actions' ? 'active' : ''" @click="tab = 'actions'">Daily Actions</button>
  </div>

  <template v-if="tab === 'login'">
    <KpiStrip />
    <LoginAnalysisChart />
    <LoginAnalyticsExtra />
  </template>
  <SystemStatus v-else-if="tab === 'health'" />
  <ActivityFeed v-else-if="tab === 'actions'" />

  <CodifiFoot />
</template>
