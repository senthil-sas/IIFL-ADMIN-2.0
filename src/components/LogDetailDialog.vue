<template>
  <Teleport to="body">
    <div v-if="visible" class="ldl-overlay" @click.self="$emit('close')">
      <div class="ldl-modal">

        <div class="ldl-head">
          <span class="ldl-title">Log Detail</span>
          <span v-if="localRow?.method" class="badge" :style="methodStyle(localRow.method)">
            {{ localRow.method }}
          </span>
          <span class="ldl-url" :title="localRow?.url || localRow?.uri">
            {{ localRow?.url || localRow?.uri || '—' }}
          </span>
          <button class="ldl-close" @click="$emit('close')">✕</button>
        </div>

        <div class="ldl-body">
          <div v-if="loading" class="ldl-loading">
            <span class="ldl-spin"></span>
            Fetching detail…
          </div>

          <div v-else-if="error" class="ldl-error">{{ error }}</div>

          <template v-else-if="localRow">
            <div class="ldl-grid">
              <div v-for="f in BASIC_FIELDS" :key="f.key" class="ldl-kv">
                <span class="ldl-kv-lbl">{{ f.label }}</span>
                <span class="ldl-kv-val">{{ localRow[f.key] ?? '—' }}</span>
              </div>
              <template v-if="detail">
                <div v-for="f in EXTRA_FIELDS" :key="f.key" class="ldl-kv">
                  <span class="ldl-kv-lbl">{{ f.label }}</span>
                  <span class="ldl-kv-val">{{ detail[f.key] ?? '—' }}</span>
                </div>
              </template>
            </div>

            <template v-if="detail">
              <div class="ldl-body-section">
                <div class="ldl-body-head">
                  <span>Request Body</span>
                  <button class="btn btn-sm" @click="copy(detail.reqBodyParsed ?? detail.reqBody)">Copy</button>
                </div>
                <div class="ldl-json-wrap">
                  <pre class="ldl-raw-body" v-html="formatJson(detail.reqBodyParsed ?? detail.reqBody)"></pre>
                </div>
              </div>

              <div class="ldl-body-section">
                <div class="ldl-body-head">
                  <span>Response Body</span>
                  <button class="btn btn-sm" @click="copy(detail.resBodyParsed ?? detail.resBody)">Copy</button>
                </div>
                <div class="ldl-json-wrap">
                  <pre class="ldl-raw-body" v-html="formatJson(detail.resBodyParsed ?? detail.resBody)"></pre>
                </div>
              </div>
            </template>
          </template>
        </div>

      </div>
    </div>
  </Teleport>

  <Teleport to="body">
    <Transition name="ldl-toast">
      <div v-if="toast.show" class="ldl-toast">{{ toast.msg }}</div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ungzip } from 'pako'
import { httpService } from '../services/httpservices'

const props = defineProps({
  visible: { type: Boolean, default: false },
  row:     { type: Object,  default: null },
  logDate: { type: String,  default: '' },   // optional override; falls back to row.logDate
})

defineEmits(['close'])

const loading  = ref(false)
const error    = ref('')
const localRow = ref(null)
const detail   = ref(null)
const toast    = reactive({ show: false, msg: '' })

const BASIC_FIELDS = [
  { key: 'userId',      label: 'User ID'         },
  { key: 'id',          label: 'ID'              },
  { key: 'url',         label: 'URL'             },
  { key: 'method',      label: 'Method'          },
  { key: 'inTime',      label: 'In Time'         },
  { key: 'outTime',     label: 'Out Time'        },
  { key: 'source',      label: 'Source'          },
  { key: 'module',      label: 'Module'          },
  { key: 'vendor',      label: 'Vendor'          },
  { key: 'deviceIp',    label: 'Device IP'       },
  { key: 'totalTimeUs', label: 'Total Time (µs)' },
  { key: 'logDate',     label: 'Log Date'        },
]

const EXTRA_FIELDS = [
  { key: 'deviceId',       label: 'Device ID'     },
  { key: 'userAgent',      label: 'User Agent'    },
  { key: 'domain',         label: 'Domain'        },
  { key: 'contentType',    label: 'Content Type'  },
  { key: 'tokenCreatedOn', label: 'Token Created' },
  { key: 'tokenExpiry',    label: 'Token Expiry'  },
]

watch(() => [props.visible, props.row], async ([vis, row]) => {
  if (!vis || !row) { localRow.value = null; detail.value = null; error.value = ''; return }

  // Seed with the passed row immediately so fields render before API responds
  localRow.value = {
    ...row,
    url:    row.url    || row.uri    || '',
    inTime: row.inTime || row.time   || '',
    id:     row.id     || row._id    || '',
  }
  detail.value  = null
  error.value   = ''
  loading.value = true

  try {
    const id      = row.id || row._id || ''
    const logDate = props.logDate || row.logDate || ''
    const logTime = (row.inTime || row.time || '0').split(':')[0]

    const { status, data } = await httpService.postClickhouseAccessLogV2Details({ id, logDate, logTime })

    if (status === 200 && data.result?.length > 0) {
      const r = { ...data.result[0] }
      r.reqBodyParsed = parseBody(r.reqBody)
      r.resBodyParsed = parseBody(r.resBody)
      detail.value = r
      Object.assign(localRow.value, data.result[0])
    } else {
      error.value = data.message || 'No detail found'
    }
  } catch (e) {
    error.value = e?.message || 'Failed to load detail'
  } finally {
    loading.value = false
  }
}, { immediate: false })

function parseBody(raw) {
  if (!raw) return null
  try { return JSON.parse(raw) } catch { /* */ }
  try { return JSON.parse(atob(raw)) } catch { /* */ }
  try {
    const bytes = Uint8Array.from(atob(raw), c => c.charCodeAt(0))
    return JSON.parse(ungzip(bytes, { to: 'string' }))
  } catch { /* */ }
  return raw
}

function formatJson(value) {
  if (value == null) return '(empty)'
  const raw = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  return raw.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match))
        return /:$/.test(match)
          ? `<span class="jn-key">${match}</span>`
          : `<span class="jn-str">${match}</span>`
      if (/true|false/.test(match)) return `<span class="jn-bool">${match}</span>`
      if (/null/.test(match))       return `<span class="jn-null">${match}</span>`
      return `<span class="jn-num">${match}</span>`
    }
  )
}

function methodStyle(method) {
  const MAP = {
    GET:    { background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' },
    POST:   { background: '#dbeafe', color: '#1d4ed8', borderColor: '#bfdbfe' },
    PUT:    { background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' },
    DELETE: { background: '#fee2e2', color: '#b91c1c', borderColor: '#fecaca' },
    PATCH:  { background: '#f3e8ff', color: '#7e22ce', borderColor: '#e9d5ff' },
  }
  return MAP[(method || '').toUpperCase()] ?? { background: '#f3f4f6', color: '#4b5563', borderColor: '#e5e7eb' }
}

async function copy(data) {
  if (data == null) return
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  try {
    await navigator.clipboard.writeText(text)
    showToast('Copied to clipboard')
  } catch {
    showToast('Copy failed')
  }
}

function showToast(msg, ms = 2500) {
  toast.msg  = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, ms)
}
</script>

<style scoped>
.ldl-overlay {
  position: fixed; inset: 0;
  background: rgba(11,15,23,.52);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.ldl-modal {
  background: var(--surface);
  border-radius: 14px;
  width: 860px; max-width: 100%; max-height: 95vh;
  display: flex; flex-direction: column;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--line);
  overflow: hidden;
}

.ldl-head {
  display: flex; align-items: center; gap: 12px;
  padding: 15px 20px; border-bottom: 1px solid var(--line);
  flex-shrink: 0; background: var(--surface-2);
}
.ldl-title {
  font-family: var(--display);
  font-size: 15px; font-weight: 600; color: var(--ink);
  white-space: nowrap;
}
.ldl-url {
  font-size: 12px; color: var(--muted); flex: 1;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--mono);
}
.ldl-close {
  margin-left: auto; background: none; border: none;
  color: var(--muted); font-size: 16px; cursor: pointer;
  padding: 4px 8px; border-radius: 6px; line-height: 1;
  transition: background 0.12s, color 0.12s; flex-shrink: 0;
}
.ldl-close:hover { background: var(--canvas); color: var(--ink); }

.ldl-body {
  flex: 1; min-height: 0; overflow-y: auto;
  padding: 20px; display: flex; flex-direction: column; gap: 18px;
  scrollbar-width: thin;
}

/* Loading / Error */
.ldl-loading {
  display: flex; align-items: center; gap: 10px;
  color: var(--muted); font-size: 13px; padding: 24px 0;
}
.ldl-spin {
  display: inline-block; width: 16px; height: 16px;
  border: 2px solid var(--line); border-top-color: var(--primary);
  border-radius: 50%; animation: ldlspin 0.7s linear infinite;
}
@keyframes ldlspin { to { transform: rotate(360deg); } }
.ldl-error {
  background: var(--rose-50); color: var(--rose);
  padding: 10px 14px; border-radius: 8px; font-size: 13px;
  border: 1px solid rgba(212,58,69,.18);
}

/* Info grid */
.ldl-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 14px 12px;
  background: var(--surface-2); border: 1px solid var(--line-2);
  border-radius: 10px; padding: 16px;
}
.ldl-kv { display: flex; flex-direction: column; gap: 3px; }
.ldl-kv-lbl {
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: .07em; color: var(--muted-2); font-family: var(--mono);
}
.ldl-kv-val { font-size: 12.5px; color: var(--ink); word-break: break-all; line-height: 1.4; }

/* Body sections */
.ldl-body-section { display: flex; flex-direction: column; gap: 8px; }
.ldl-body-head {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .08em; color: var(--muted);
}
.ldl-json-wrap {
  border: 1px solid var(--line-2); border-radius: 8px;
  max-height: 380px; overflow-y: auto;
}
.ldl-raw-body {
  margin: 0; padding: 12px 14px;
  background: var(--surface-2);
  font-family: var(--mono); font-size: 12px; color: var(--ink-2);
  white-space: pre-wrap; word-break: break-all; line-height: 1.5;
}
.ldl-raw-body :deep(.jn-key)  { color: #7c3aed; }
.ldl-raw-body :deep(.jn-str)  { color: #16a34a; }
.ldl-raw-body :deep(.jn-num)  { color: #2563eb; }
.ldl-raw-body :deep(.jn-bool) { color: #b5892f; }
.ldl-raw-body :deep(.jn-null) { color: #6b7280; font-style: italic; }

/* Toast */
.ldl-toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--ink); color: #fff;
  padding: 10px 22px; border-radius: 10px;
  font-size: 13px; font-weight: 500;
  z-index: 9999; box-shadow: var(--shadow-lg);
  pointer-events: none; white-space: nowrap;
}
.ldl-toast-enter-active { transition: opacity .18s ease, transform .18s ease; }
.ldl-toast-leave-active { transition: opacity .22s ease, transform .22s ease; }
.ldl-toast-enter-from,
.ldl-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(8px); }
</style>
