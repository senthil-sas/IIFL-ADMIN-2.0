<script setup lang="ts">
import { ref, watch } from 'vue'
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

watch(collapsed, (v) => {
  try {
    localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
  } catch {
    /* ignore */
  }
})
</script>

<template>
  <div class="app" :class="{ 'sidebar-collapsed': collapsed }">
    <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
    <div class="main">
      <Topbar />
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>
