<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'
import { SIP_BADGE, type Sip } from '../../data/sips'

const props = defineProps<{ sip: Sip }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const badge = computed(() => SIP_BADGE[props.sip.status])

let prevOverflow = ''
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => {
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.body.style.overflow = prevOverflow
  window.removeEventListener('keydown', onKey)
})

// [key, value, mono?]
type KV = [string, string | number, boolean?]
const mandate = computed<KV[]>(() => [
  ['Created on', props.sip.createdOn, true],
  ['User ID', props.sip.ucc, true],
  ['Symbol', props.sip.symbol, true],
  ['Exchange', props.sip.exchange],
  ['Frequency', props.sip.freq],
  ['Type', props.sip.type],
])
const schedule = computed<KV[]>(() => [
  ['Amount', '₹' + props.sip.amount, true],
  ['Qty', props.sip.qty, true],
  ['Cap Price', '₹' + props.sip.capPrice, true],
  ['Start Date', props.sip.start, true],
  ['End Date', props.sip.end, true],
  ['Installment', props.sip.installment, true],
])
const summary = computed<Array<[string, string | number]>>(() => [
  ['Amount', '₹' + props.sip.amount],
  ['Quantity', props.sip.qty],
  ['Frequency', props.sip.freq],
  ['Installment', props.sip.installment],
])
const execStats = computed<Array<[string, number, string]>>(() => [
  ['Pending', props.sip.pending, 'var(--ink)'],
  ['Failed', props.sip.failed, props.sip.failed > 0 ? 'var(--rose)' : 'var(--ink)'],
  ['Execution Count', props.sip.execCount, 'var(--ink)'],
])
</script>

<template>
  <Teleport to="body">
    <div class="cm-drawer-overlay" @click="emit('close')">
      <div class="card cm-drawer" @click.stop style="width:min(720px, 96vw)">
        <div class="cm-drawer-body">
          <div class="cm-detail-head">
            <div class="user-cell" style="flex:1">
              <div class="av" :style="{ background: avatarColor(sip.client), width: '42px', height: '42px', fontSize: '14px' }">{{ initials(sip.client) }}</div>
              <div>
                <h3 style="margin:0;font-family:var(--display);font-size:17px;font-weight:600;letter-spacing:-0.01em;color:var(--ink)">{{ sip.client }}</h3>
                <div style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:8px;margin-top:2px">
                  <span class="col-id">{{ sip.id }}</span>
                  <span style="color:var(--muted-2)">·</span>
                  <span class="mono" style="font-family:var(--mono);font-size:11px">{{ sip.ucc }}</span>
                  <span style="color:var(--muted-2)">·</span>
                  <span>Equity SIP</span>
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <span class="badge" :class="badge[0]" style="min-width:82px;justify-content:center"><span class="badge-dot" />{{ badge[1] }}</span>
              <span class="badge"><span class="badge-dot" />{{ sip.exchange }} · {{ sip.symbol }}</span>
            </div>
          </div>

          <div style="padding:14px 18px;border-bottom:1px solid var(--line-2);display:grid;grid-template-columns:repeat(4, 1fr);gap:14px">
            <div v-for="([l, v]) in summary" :key="l">
              <div style="font-size:11px;color:var(--muted);margin-bottom:4px">{{ l }}</div>
              <div style="font-family:var(--display);font-size:17px;font-weight:600;color:var(--ink);letter-spacing:-0.01em">{{ v }}</div>
            </div>
          </div>

          <div class="cm-detail-body">
            <div class="cm-col">
              <div class="cm-col-h" style="margin-bottom:10px">Mandate</div>
              <div class="cm-kv-list">
                <div class="cm-kv" v-for="([k, v, mono]) in mandate" :key="k">
                  <span>{{ k }}</span>
                  <span :class="mono ? 'mono' : ''" :style="mono ? { fontFamily: 'var(--mono)', fontSize: '12px' } : undefined">{{ v }}</span>
                </div>
              </div>
            </div>
            <div class="cm-col">
              <div class="cm-col-h" style="margin-bottom:10px">Schedule</div>
              <div class="cm-kv-list">
                <div class="cm-kv" v-for="([k, v, mono]) in schedule" :key="k">
                  <span>{{ k }}</span>
                  <span :class="mono ? 'mono' : ''" :style="mono ? { fontFamily: 'var(--mono)', fontSize: '12px' } : undefined">{{ v }}</span>
                </div>
              </div>
            </div>
            <div class="cm-col" style="grid-column:1 / -1">
              <div class="cm-col-h" style="margin-bottom:10px">Execution &amp; audit</div>
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:12px">
                <div v-for="([l, v, c]) in execStats" :key="l" style="background:var(--bg);border:1px solid var(--line-2);border-radius:8px;padding:10px 12px">
                  <div style="font-size:10.5px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.08em;font-weight:600">{{ l }}</div>
                  <div :style="{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 600, color: c, letterSpacing: '-0.01em', marginTop: '4px' }">{{ v }}</div>
                </div>
              </div>
              <div class="cm-kv-list">
                <div class="cm-kv"><span>Status</span><span><span class="badge" :class="badge[0]" style="min-width:82px;justify-content:center"><span class="badge-dot" />{{ badge[1] }}</span></span></div>
                <div class="cm-kv"><span>Initiated By</span><span>{{ sip.initiatedBy }}</span></div>
                <div class="cm-kv"><span>Modified By</span><span>{{ sip.modifiedBy }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="emit('close')"
        aria-label="Close"
        style="position:fixed;right:24px;bottom:24px;z-index:110;height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fff;border:none;font-size:13px;font-weight:500;font-family:inherit;display:inline-flex;align-items:center;gap:8px;cursor:pointer;box-shadow:0 10px 30px rgba(15,23,42,0.28), 0 2px 6px rgba(15,23,42,0.18)"
      >
        <Icon name="close" :size="14" /> Close
      </button>
    </div>
  </Teleport>
</template>
