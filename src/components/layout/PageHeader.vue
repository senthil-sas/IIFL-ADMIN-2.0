<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PAGE_TITLES } from '../../data/nav'
import type { ViewId } from '../../types'

const props = defineProps<{ subtitleOverride?: string }>()

const route = useRoute()
const meta = computed(() => PAGE_TITLES[route.name as ViewId] ?? PAGE_TITLES.dashboard)
const subtitle = computed(() => props.subtitleOverride || meta.value.subtitle)
</script>

<template>
  <div class="page-header">
    <div v-if="meta.title || subtitle">
      <h1 v-if="meta.title">{{ meta.title }}</h1>
      <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
    </div>
    <div class="actions"><slot name="actions" /></div>
  </div>
</template>
