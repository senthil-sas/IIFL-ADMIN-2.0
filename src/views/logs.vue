<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'
import ClickhouseLogsV2 from './clickhouseLogsV2.vue'

const store = useStore()

const validTab = ref(0)

const logsTabs = computed(() => store.getters['tabs/getLogsTabs'] as { name: string; id: number }[])

function setTab(idx: number) {
  validTab.value = idx
  store.commit('tabs/setActiveLogsTab', idx)
}
</script>

<template>
  <!-- Clickhouse V2 -->
  <ClickhouseLogsV2 v-show="validTab === 0" />
</template>

<style scoped>
</style>
