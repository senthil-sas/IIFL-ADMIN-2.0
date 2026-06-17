<template>
  <div class="toolbar">
    <div class="tb-grp">
      <span class="tb-lbl">Showing</span>
      <span class="tb-val">{{ eventCount }}</span>
    </div>
    <div class="tb-sep"></div>
    <div class="tb-grp">
      <span class="tb-lbl">Range</span>
      <span class="tb-val">{{ timeRange }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  eventCount: { type: String, default: '—' },
  timeRange:  { type: String, default: '—' },
})
</script>

<style scoped>
.toolbar {
  height: 44px; border-bottom: 1px solid var(--line); background: var(--surface-2);
  display: flex; align-items: center; padding: 0 20px; gap: 14px;
  flex-shrink: 0;
}
.tb-grp  { display: flex; align-items: center; gap: 8px; }
.tb-lbl  { font-size: 12px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.tb-val  { font-size: 13px; color: var(--ink-2); font-weight: 600; }
.tb-sep  { width: 1px; height: 20px; background: var(--line); }
</style>
