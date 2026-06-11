<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Icon from '../Icon.vue'
import { NAV_GROUPS } from '../../data/nav'
import type { ViewId } from '../../types'

defineProps<{ collapsed: boolean }>()
defineEmits<{ (e: 'toggle'): void }>()

const route = useRoute()
const router = useRouter()
const go = (id: ViewId) => router.push({ name: id })
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo" aria-label="IIFL" title="IIFL">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1976F2" />
          <path
            d="M6.5 16.5L11 7.5h2L17.5 16.5h-2.2l-1-2.2H9.7l-1 2.2H6.5zm3.9-3.9h3.2L12 8.9l-1.6 3.7z"
            fill="#fff"
          />
        </svg>
      </div>
      <div class="brand-text">
        <div class="brand-name">IIFL</div>
        <div class="brand-tag">Admin · v2.0</div>
      </div>
      <button
        class="sidebar-collapse-btn"
        @click="$emit('toggle')"
        :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <Icon
          name="chevR"
          :size="12"
          :stroke="2.2"
          :style="{ transform: collapsed ? 'none' : 'rotate(180deg)' }"
        />
      </button>
    </div>

    <div class="nav-group" v-for="g in NAV_GROUPS" :key="g.label">
      <div class="nav-label">{{ g.label }}</div>
      <button
        v-for="it in g.items"
        :key="it.id"
        class="nav-item"
        :class="{ active: route.name === it.id }"
        @click="go(it.id)"
        :data-label="it.label"
        :title="collapsed ? it.label : undefined"
      >
        <Icon :name="it.icon" class="ni-icon" />
        <span>{{ it.label }}</span>
      </button>
    </div>

    <div class="sidebar-footer">
      <div class="profile-chip">
        <div class="avatar">RM</div>
        <div style="flex: 1; min-width: 0">
          <div class="pc-name">Rohan Mehta</div>
          <div class="pc-role">Super Admin</div>
        </div>
        <Icon name="chev" :size="14" class="pc-chev" :style="{ color: '#6E7793' }" />
      </div>
    </div>
  </aside>
</template>
