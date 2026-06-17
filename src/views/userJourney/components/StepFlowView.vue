<template>
  <div class="step-scroll">
    <div class="step-track">
      <div class="step-axis"></div>

      <div
        v-for="(grp, gi) in groups"
        :key="gi"
        class="step-group"
        :class="{ cluster: grp.events.length > 1 }"
        @click="onGroupClick(grp)"
      >
        <!-- Above-axis layout (even groups) -->
        <template v-if="gi % 2 === 0">
          <div class="sg-top">
            <div class="sg-time">{{ f8(grp.events[0].time) }}</div>
            <div class="sg-uri">{{ uriTail(grp.events[0].uri) }}</div>
            <div class="sg-chip" :style="chipStyle(grp)">
              {{ grp.events.length > 1 ? '× ' + grp.events.length + ' calls' : grp.events[0].event.replace(/_/g, ' ') }}
            </div>
          </div>
          <div class="sg-pin-top" style="height:48px"></div>
          <div
            class="sg-dot"
            :style="dotStyle(grp)"
            @mouseenter="evt => onDotEnter(evt, grp)"
            @mouseleave="$emit('tooltip-hide')"
          >
            <div v-if="grp.events.length > 1" class="sg-stack">{{ grp.events.length }}</div>
          </div>
          <div class="sg-pin-bot" style="height:48px"></div>
          <div class="sg-bot" style="visibility:hidden;height:60px"></div>
        </template>

        <!-- Below-axis layout (odd groups) -->
        <template v-else>
          <div class="sg-top" style="visibility:hidden;height:60px"></div>
          <div class="sg-pin-top" style="height:48px"></div>
          <div
            class="sg-dot"
            :style="dotStyle(grp)"
            @mouseenter="evt => onDotEnter(evt, grp)"
            @mouseleave="$emit('tooltip-hide')"
          >
            <div v-if="grp.events.length > 1" class="sg-stack">{{ grp.events.length }}</div>
          </div>
          <div class="sg-pin-bot" style="height:48px"></div>
          <div class="sg-bot">
            <div class="sg-chip" :style="chipStyle(grp)">
              {{ grp.events.length > 1 ? '× ' + grp.events.length + ' calls' : grp.events[0].event.replace(/_/g, ' ') }}
            </div>
            <div class="sg-uri">{{ uriTail(grp.events[0].uri) }}</div>
            <div class="sg-time">{{ f8(grp.events[0].time) }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { pc } from '../utils/palette'
import { f8, toMs, uriTail } from '../utils/timeHelpers'

const CLUSTER_GAP_MS = 2000

const props = defineProps({
  data:         { type: Object, default: null },
  hiddenEvents: { type: Set,    default: () => new Set() },
})

const emit = defineEmits(['highlight', 'open-popup', 'tooltip-show', 'tooltip-hide'])

const groups = computed(() => {
  if (!props.data) return []
  const visible = props.data.timeline.filter(e => !props.hiddenEvents.has(e.event))
  const result = []
  let cur = null
  visible.forEach(e => {
    const ms = toMs(e.time)
    const origIdx = props.data.timeline.indexOf(e)
    if (!cur || ms - toMs(cur.events[cur.events.length - 1].time) > CLUSTER_GAP_MS) {
      cur = { ms, events: [e], origIdxs: [origIdx] }
      result.push(cur)
    } else {
      cur.events.push(e)
      cur.origIdxs.push(origIdx)
    }
  })
  return result
})

function dotStyle(grp) {
  const multi = grp.events.length > 1
  const c = pc(grp.events[0].event)
  return `border-color:${multi ? 'rgba(128,128,128,.5)' : c.br};background:var(--step-dot-bg)`
}
function chipStyle(grp) {
  const c = pc(grp.events[0].event)
  return `color:${c.h};background:${c.bg};border-color:${c.br}`
}
function onDotEnter(evt, grp) {
  if (grp.events.length === 1) emit('tooltip-show', evt, grp.events[0], grp.origIdxs[0] + 1)
}
function onGroupClick(grp) {
  emit('open-popup', grp)   // always show detail popup (single or multi)
}
</script>

<style scoped>
.step-scroll  { flex: 1; overflow: auto; scrollbar-width: thin; scrollbar-color: var(--surface3) transparent; }
/* min-width: max-content ensures the track always stretches to hold all groups,
   so the absolutely-positioned axis line can span the full scrollable width */
.step-track   { display: flex; align-items: stretch; min-height: 260px; min-width: max-content; position: relative; padding: 20px 40px; }

.step-axis {
  position: absolute; left: 0; right: 0; top: 50%; height: 2px;
  background: var(--border2);
  pointer-events: none; transform: translateY(-50%);
}

.step-group {
  display: flex; flex-direction: column; align-items: center;
  position: relative; cursor: pointer; flex-shrink: 0; margin: 0 6px;
}
.step-group:hover .sg-dot   { transform: scale(1.35); box-shadow: 0 0 0 4px var(--lane-hover), 0 0 14px rgba(59,130,246,.4); }
.step-group.cluster .sg-dot { border-style: dashed; }

.sg-dot {
  width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid;
  background: var(--step-dot-bg); position: relative; z-index: 10;
  transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
}
.sg-stack {
  position: absolute; top: -7px; right: -7px; width: 18px; height: 18px; border-radius: 50%;
  background: #ef4444; color: #fff; font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; border: 2px solid var(--step-dot-bg); z-index: 12;
}
.sg-pin-top { width: 2px; background: var(--step-line); flex-shrink: 0; }
.sg-pin-bot { width: 2px; background: var(--step-line); flex-shrink: 0; }
.sg-top     { display: flex; flex-direction: column; align-items: center; gap: 3px; padding-bottom: 8px; }
.sg-bot     { display: flex; flex-direction: column; align-items: center; gap: 3px; padding-top: 8px; }

.sg-time { font-family: inherit;font-size: 10.5px; font-weight: 600; color: var(--text3); white-space: nowrap; }
.sg-chip {
  font-family: inherit;font-size: 10.5px; font-weight: 700;
  padding: 3px 9px; border-radius: 20px; border: 1.5px solid; white-space: nowrap;
  max-width: 110px; overflow: hidden; text-overflow: ellipsis; transition: filter 0.15s;
}
.step-group:hover .sg-chip { filter: brightness(1.2); }
.sg-uri {
  font-family: inherit;font-size: 9.5px; color: var(--text3);
  white-space: nowrap; max-width: 110px; overflow: hidden; text-overflow: ellipsis; text-align: center;
}
</style>
