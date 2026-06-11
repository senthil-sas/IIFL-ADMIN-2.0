<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '../Icon.vue'
import { PAGE_TITLES } from '../../data/nav'
import type { ViewId } from '../../types'

const route = useRoute()
const router = useRouter()
const meta = computed(() => PAGE_TITLES[route.name as ViewId] ?? PAGE_TITLES.dashboard)
</script>

<template>
  <div class="topbar">
    <div class="crumbs">
      <template v-if="meta.parent">
        <span
          class="crumb-link"
          role="link"
          tabindex="0"
          style="cursor: pointer"
          @click="router.push({ name: 'dashboard' })"
          @keydown.enter.prevent="router.push({ name: 'dashboard' })"
          @keydown.space.prevent="router.push({ name: 'dashboard' })"
          >{{ meta.parent }}</span
        >
        <span class="sep">/</span>
      </template>
      <span class="current">{{ meta.title }}</span>
    </div>

    <div class="search">
      <Icon name="search" :size="14" />
      <input placeholder="Search clients, orders, mandates…" />
      <span class="kbd">⌘K</span>
    </div>

    <button class="icon-btn" title="Refresh"><Icon name="refresh" :size="15" /></button>
    <button class="icon-btn" title="Notifications">
      <Icon name="bell" :size="15" /><span class="dot"></span>
    </button>
  </div>
</template>
