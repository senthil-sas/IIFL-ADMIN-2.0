<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Topbar from './components/layout/Topbar.vue'

const STORAGE_KEY = 'codifi-sidebar-collapsed'

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const collapsed = ref<boolean>(readCollapsed())
const route = useRoute()
const isAuthRoute  = computed(() => route.name === 'login')
const isStandalone = computed(() => !!route.meta?.standalone)

watch(collapsed, (v) => {
  try {
    localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
  } catch {
    /* ignore */
  }
})
</script>

<template>
  <!-- Auth pages: full-screen, no chrome -->
  <router-view v-if="isAuthRoute" />

  <!-- App shell -->
  <div v-else class="app" :class="{ 'sidebar-collapsed': collapsed }">
    <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
    <div class="main" :class="{ 'main--fill': isStandalone }">
      <Topbar />
      <!-- Standalone pages (e.g. Journey Analyzer) fill the remaining height without padding -->
      <div v-if="isStandalone" class="page-fill">
        <router-view />
      </div>
      <div v-else class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>
