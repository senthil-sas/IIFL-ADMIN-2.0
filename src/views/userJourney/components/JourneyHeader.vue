<template>
  <!-- <header class="uj-hdr">
    <div class="uj-hdr-l">
      <span class="uj-hdr-title">Journey Analyzer</span>
    </div>
    <div class="uj-hdr-r">
      <span v-if="userDisplay !== '—'" class="uj-pill uj-pill-primary">{{ userDisplay }}</span>
      <span v-if="dateDisplay !== '—'" class="uj-pill uj-pill-muted">{{ dateDisplay }}</span>
    </div>
  </header> -->
</template>

<script setup>
defineProps({
  userDisplay: { type: String, default: '—' },
  dateDisplay: { type: String, default: '—' },
})
</script>

<style scoped>
.uj-hdr {
  height: 56px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; flex-shrink: 0; z-index: 400; position: relative;
  box-shadow: var(--shadow-xs);
}
.uj-hdr-l { display: flex; align-items: center; gap: 16px; }
.uj-hdr-r { display: flex; align-items: center; gap: 8px; }
.uj-hdr-title {
  font-family: var(--display);
  font-size: 16px; font-weight: 700; color: var(--ink); letter-spacing: -.02em;
}
.uj-pill {
  padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
  border: 1px solid; letter-spacing: .03em; white-space: nowrap;
}
.uj-pill-primary { color: var(--primary-700); border-color: var(--primary-100); background: var(--primary-50); }
.uj-pill-muted   { color: var(--muted); border-color: var(--line); background: var(--canvas); }
</style>
