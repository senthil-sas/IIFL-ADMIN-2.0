<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'

const props = defineProps<{ kind: 'holdings' | 'positions' }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const isHoldings = computed(() => props.kind === 'holdings')
const title = computed(() => (isHoldings.value ? 'Upload Holdings' : 'Upload Positions'))

const UPLOAD_TYPES = computed(() =>
  isHoldings.value
    ? [
        { id: 'dp_t1', lbl: 'DP + T1 Holdings' },
        { id: 'dp_only', lbl: 'DP Holdings only' },
        { id: 't1_only', lbl: 'T1 Holdings only' },
        { id: 'corp_act', lbl: 'Corporate actions adjustment' },
      ]
    : [
        { id: 'eod', lbl: 'End-of-day positions' },
        { id: 'intraday', lbl: 'Intraday positions' },
        { id: 'fno', lbl: 'F&O positions' },
        { id: 'currency', lbl: 'Currency positions' },
      ]
)

const uploadType = ref(UPLOAD_TYPES.value[0].id)
const scope = ref<'all' | 'individual'>('all')
const mode = ref<'append' | 'replace'>('append')
const client = ref('')
const files = ref<{ dp: File | null; t1: File | null; pos: File | null }>({ dp: null, t1: null, pos: null })
const drag = ref<string | null>(null)

const meta = computed(() =>
  isHoldings.value
    ? { time: '24 Mar 2026, 10:15 AM', by: 'Jane Smith', latest: 12, previous: 10, label: 'Holdings' }
    : { time: '08 May 2026, 09:08 AM', by: 'Jane Smith', latest: 384, previous: 361, label: 'Positions' }
)
const delta = computed(() => meta.value.latest - meta.value.previous)

const HISTORY = [
  { date: '08/04/2026', by: 'Lucas Garcia', userType: 'All', file: 'pos_nse_fo_98768.xls', fileC: 19, dbC: 19, segC: 19, beC: 19 },
  { date: '08/05/2026', by: 'Olivia Thomas', userType: 'Individual', file: 'daily_combined_all.xlsx', fileC: 18, dbC: 18, segC: 18, beC: 18 },
  { date: '08/06/2026', by: 'Matthew Anderson', userType: 'All', file: 'pos_nse_fo_98773.xls', fileC: 17, dbC: 17, segC: 17, beC: 17 },
  { date: '08/07/2026', by: 'Daniel Martinez', userType: 'Individual', file: 'pos_nse_fo_98775.xls', fileC: 21, dbC: 21, segC: 21, beC: 21 },
  { date: '08/08/2026', by: 'James Wilson', userType: 'All', file: 'pos_nse_fo_98771.xls', fileC: 16, dbC: 16, segC: 16, beC: 16 },
]

type FileKey = 'dp' | 't1' | 'pos'
const onPick = (key: FileKey) => (e: Event) => {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0]
  if (f) files.value = { ...files.value, [key]: f }
  input.value = ''
}
const onDropFile = (key: FileKey) => (e: DragEvent) => {
  e.preventDefault()
  drag.value = null
  const f = e.dataTransfer?.files?.[0]
  if (f) files.value = { ...files.value, [key]: f }
}
const onDragOver = (key: FileKey) => (e: DragEvent) => {
  e.preventDefault()
  drag.value = key
}
const removeFile = (key: FileKey) => (files.value = { ...files.value, [key]: null })

const footerStatus = computed(() => {
  const ready = isHoldings.value ? (files.value.dp ? 1 : 0) + (files.value.t1 ? 1 : 0) : files.value.pos ? 1 : 0
  const total = isHoldings.value ? 2 : 1
  if (ready === 0) return 'No files selected'
  return `${ready} of ${total} file${total > 1 ? 's' : ''} ready`
})

const dropKeys = computed<{ key: FileKey; label: string }[]>(() =>
  isHoldings.value
    ? [{ key: 'dp', label: 'DP Holdings' }, { key: 't1', label: 'T1 Holdings' }]
    : [{ key: 'pos', label: 'Positions File' }]
)
const fileOf = (k: FileKey) => files.value[k]
</script>

<template>
  <Teleport to="body">
    <div @click="emit('close')" style="position:fixed;inset:0;background:rgba(15,23,42,0.42);z-index:100;backdrop-filter:blur(2px)" />
    <div
      @click.stop
      style="position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:101;width:min(960px, calc(100vw - 32px));max-height:calc(100vh - 32px);background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 70px rgba(15,20,40,0.28), 0 6px 18px rgba(15,20,40,0.10);overflow:hidden;display:flex;flex-direction:column"
    >
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 22px;border-bottom:1px solid var(--line-2);background:linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);flex:0 0 auto">
        <div>
          <div style="font-family:var(--display);font-size:16px;font-weight:600;color:var(--ink);letter-spacing:-0.01em">{{ title }}</div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:2px">Bulk upload · all users or a specific client</div>
        </div>
        <button @click="emit('close')" aria-label="Close" style="background:var(--surface);border:1px solid var(--border);cursor:pointer;color:var(--muted);padding:0;width:28px;height:28px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center">
          <Icon name="close" :size="13" />
        </button>
      </div>

      <div style="overflow-y:auto;flex:1 1 auto;min-height:0">
        <div style="display:flex;align-items:center;gap:18px;padding:10px 22px;border-bottom:1px solid var(--line-2);background:var(--bg);flex-wrap:wrap">
          <div style="display:inline-flex;align-items:baseline;gap:6px">
            <span style="font-size:11px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-weight:600">Last updated</span>
            <span style="font-size:12px;color:var(--ink);font-family:var(--mono);font-weight:500">{{ meta.time }}</span>
          </div>
          <div style="width:1px;height:14px;background:var(--line)" />
          <div style="display:inline-flex;align-items:baseline;gap:6px">
            <span style="font-size:11px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-weight:600">By</span>
            <span style="font-size:12px;color:var(--ink);font-weight:500">{{ meta.by }}</span>
          </div>
          <div style="width:1px;height:14px;background:var(--line)" />
          <div style="display:inline-flex;align-items:baseline;gap:6px">
            <span style="font-size:11px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-weight:600">{{ meta.label }} count</span>
            <span style="font-size:13px;color:var(--ink);font-family:var(--mono);font-weight:600">{{ meta.latest }}</span>
            <span style="font-size:11px;color:var(--muted)">vs</span>
            <span style="font-size:12px;color:var(--muted);font-family:var(--mono);text-decoration:line-through">{{ meta.previous }}</span>
            <span :style="{ fontSize: '11px', fontFamily: 'var(--mono)', fontWeight: 500, color: delta >= 0 ? 'var(--emerald)' : 'var(--rose)' }">{{ delta >= 0 ? '+' : '' }}{{ delta }}</span>
          </div>
        </div>

        <div style="padding:20px 22px;display:flex;flex-direction:column;gap:18px">
          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2)">Upload Type</div>
            <div style="position:relative;width:320px;max-width:100%">
              <select v-model="uploadType" style="appearance:none;-webkit-appearance:none;width:100%;height:34px;padding:0 32px 0 12px;background:var(--surface);border:1px solid var(--line);border-radius:7px;font-family:inherit;font-size:13px;color:var(--ink);font-weight:500;cursor:pointer;outline:none">
                <option v-for="t in UPLOAD_TYPES" :key="t.id" :value="t.id">{{ t.lbl }}</option>
              </select>
              <span style="position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--muted);display:inline-flex">
                <Icon name="chev" :size="13" />
              </span>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2)">Apply to</div>
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div role="radiogroup" style="display:inline-flex;align-items:center;gap:18px">
                <label v-for="o in [{ id: 'all', lbl: 'All Users' }, { id: 'individual', lbl: 'Individual User' }]" :key="o.id" style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--ink);font-weight:500;user-select:none" @click="scope = o.id as 'all' | 'individual'">
                  <span aria-hidden="true" :style="{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid ' + (scope === o.id ? 'var(--primary)' : 'var(--line)'), background: 'var(--surface)', display: 'inline-grid', placeItems: 'center', flex: '0 0 auto' }">
                    <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', transform: scope === o.id ? 'scale(1)' : 'scale(0)', transition: 'transform 120ms' }" />
                  </span>
                  {{ o.lbl }}
                </label>
              </div>
              <div v-if="scope === 'individual'" class="filter-input" style="width:280px;padding-right:4px">
                <Icon name="search" :size="13" />
                <input v-model="client" placeholder="Client ID, name or PAN…" style="flex:1;width:auto" />
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2)">Mode</div>
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div role="radiogroup" style="display:inline-flex;align-items:center;gap:18px">
                <label v-for="o in [{ id: 'append', lbl: 'Add new files' }, { id: 'replace', lbl: 'Replace existing' }]" :key="o.id" style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--ink);font-weight:500;user-select:none" @click="mode = o.id as 'append' | 'replace'">
                  <span aria-hidden="true" :style="{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid ' + (mode === o.id ? 'var(--primary)' : 'var(--line)'), background: 'var(--surface)', display: 'inline-grid', placeItems: 'center', flex: '0 0 auto' }">
                    <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', transform: mode === o.id ? 'scale(1)' : 'scale(0)', transition: 'transform 120ms' }" />
                  </span>
                  {{ o.lbl }}
                </label>
              </div>
              <div style="font-size:11.5px;color:var(--muted);flex:1 1 220px;min-width:0">
                {{ mode === 'append' ? 'Merge into the latest snapshot, keep existing rows.' : 'Discard previous file and replace with new upload.' }}
              </div>
            </div>
          </div>

          <div>
            <div style="font-size:10.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted-2);margin-bottom:8px">{{ isHoldings ? 'Holdings file' : 'Positions file' }}</div>
            <div style="display:flex;gap:12px">
              <label
                v-for="dz in dropKeys"
                :key="dz.key"
                @dragover="onDragOver(dz.key)($event)"
                @dragleave="drag = null"
                @drop="onDropFile(dz.key)($event)"
                :style="{ flex: 1, minWidth: 0, border: '1.5px dashed ' + (drag === dz.key ? 'var(--ink)' : fileOf(dz.key) ? 'var(--emerald)' : 'var(--line)'), background: drag === dz.key ? 'var(--surface-2)' : fileOf(dz.key) ? 'rgba(15,157,110,0.04)' : 'var(--surface)', borderRadius: '12px', padding: '22px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', textAlign: 'center' }"
              >
                <input type="file" accept=".xls,.xlsx,.csv" hidden @change="onPick(dz.key)($event)" />
                <div :style="{ width: '38px', height: '38px', borderRadius: '50%', background: fileOf(dz.key) ? 'rgba(15,157,110,0.12)' : 'var(--primary-50)', display: 'grid', placeItems: 'center', color: fileOf(dz.key) ? 'var(--emerald)' : 'var(--primary)' }">
                  <Icon :name="fileOf(dz.key) ? 'check' : 'upload'" :size="18" />
                </div>
                <div style="font-family:var(--display);font-size:14px;font-weight:600;color:var(--ink);letter-spacing:-0.005em">{{ dz.label }}</div>
                <template v-if="fileOf(dz.key)">
                  <div style="font-size:12px;color:var(--ink);font-weight:500;font-family:var(--mono);word-break:break-all">{{ fileOf(dz.key)!.name }}</div>
                  <div style="font-size:11px;color:var(--muted)">{{ (fileOf(dz.key)!.size / 1024).toFixed(1) }} KB · ready to submit</div>
                  <button type="button" @click.prevent="removeFile(dz.key)" style="background:transparent;border:0;color:var(--rose);font-size:11.5px;font-weight:500;cursor:pointer;padding:4px">Remove</button>
                </template>
                <template v-else>
                  <div style="font-size:12px;color:var(--muted)">Click to upload or drag and drop</div>
                  <div style="font-size:11px;color:var(--muted-2)">.xls · less than 1 MB</div>
                  <button type="button" @click.prevent style="background:transparent;border:0;color:var(--primary);font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:4px;padding:4px 6px;margin-top:2px"><Icon name="download" :size="12" /> Download template</button>
                </template>
              </label>
            </div>
          </div>

          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div style="display:flex;align-items:baseline;gap:8px">
                <div style="font-family:var(--display);font-size:13px;font-weight:600;color:var(--ink);letter-spacing:-0.005em">Upload history</div>
                <span style="font-size:11px;color:var(--muted-2)">last 5 days</span>
              </div>
              <button type="button" style="background:transparent;border:0;color:var(--primary);font-size:12px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:4px"><Icon name="download" :size="12" /> Download</button>
            </div>
            <div style="border:1px solid var(--line-2);border-radius:10px;overflow:hidden">
              <table class="data" style="font-size:12px">
                <thead>
                  <tr>
                    <th>Date</th><th>Uploaded by</th><th>User type</th><th>File name</th>
                    <th class="num" style="text-align:right">File</th>
                    <th class="num" style="text-align:right">DB</th>
                    <th class="num" style="text-align:right">Segment</th>
                    <th class="num" style="text-align:right">Backend</th>
                    <th style="text-align:right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in HISTORY" :key="i">
                    <td class="mono" style="color:var(--muted)">{{ r.date }}</td>
                    <td>
                      <div class="user-cell">
                        <div class="av" :style="{ background: avatarColor(r.by), width: '22px', height: '22px', fontSize: '9.5px' }">{{ initials(r.by) }}</div>
                        <div class="uc-name" style="font-size:12px">{{ r.by }}</div>
                      </div>
                    </td>
                    <td><span class="pill" style="font-size:10.5px">{{ r.userType }}</span></td>
                    <td style="color:var(--primary);font-family:var(--mono);font-size:11.5px">{{ r.file }}</td>
                    <td class="num" style="text-align:right">{{ r.fileC }}</td>
                    <td class="num" style="text-align:right">{{ r.dbC }}</td>
                    <td class="num" style="text-align:right">{{ r.segC }}</td>
                    <td class="num" style="text-align:right">{{ r.beC }}</td>
                    <td style="text-align:right">
                      <button class="btn btn-sm" style="height:24px;padding:0 8px;font-size:11px"><Icon name="eye" :size="11" /> View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 22px;border-top:1px solid var(--line-2);background:var(--bg);flex:0 0 auto">
        <div style="font-size:11.5px;color:var(--muted)">{{ footerStatus }}</div>
        <div style="display:flex;gap:8px">
          <button class="btn" @click="emit('close')">Cancel</button>
          <button class="btn btn-accent" @click="emit('close')">Submit</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
