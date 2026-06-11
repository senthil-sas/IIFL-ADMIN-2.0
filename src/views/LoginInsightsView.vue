<script setup lang="ts">
import CustomerFunnelSection from '../components/charts/CustomerFunnelSection.vue'
import DevicesSection from '../components/charts/DevicesSection.vue'
import ModuleOriginSection from '../components/charts/ModuleOriginSection.vue'
import TopTradersSection from '../components/charts/TopTradersSection.vue'
import TopFnoSection from '../components/charts/TopFnoSection.vue'
import RejectionAnalysisSection from '../components/charts/RejectionAnalysisSection.vue'

const totalTrades = 18964
</script>

<template>
  <div style="margin-top:-4px;display:flex;flex-direction:column">
    <CustomerFunnelSection />
    <DevicesSection accent="var(--primary)" :total-trades="totalTrades" />
    <ModuleOriginSection />
    <TopTradersSection />
    <TopFnoSection />
    <RejectionAnalysisSection />
  </div>
</template>
