<script setup lang="ts">
import { computed } from 'vue'

const stamp = computed(() =>
  new Date().toISOString().slice(0, 16).replace('T', ' ')
)
</script>

<template>
  <div class="cf-footer">
    <span>Powered by CodiFi · session secure · {{ stamp }}</span>
  </div>
</template>
