<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'
import { STATUS_BADGE, maskEmail, maskMobile, maskAccount, fmtINR, type Client } from '../../data/clients'
import { payInRows, payOutRows, feedbackRows, mtfRows } from '../../data/clientTabs'

const props = defineProps<{ client: Client }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const sessionTab = ref<'all' | 'live'>('all')
const activeTab = ref('basic')
const confirmBlock = ref(false)
const blockReason = ref('')

const c = computed(() => props.client)
const badge = computed(() => STATUS_BADGE[c.value.status])
const sessions = computed(() =>
  sessionTab.value === 'live' ? c.value.sessions.filter((s) => s.status === 'Active') : c.value.sessions
)
const panLast4 = computed(() => (c.value.pan ? '••••••' + c.value.pan.slice(-4) : '—'))
const isBlocked = computed(() => c.value.status === 'blocked')

const TABS = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'bank', label: 'Bank Details' },
  { id: 'access', label: 'Access & Security' },
  { id: 'payin', label: 'Pay-in' },
  { id: 'payout', label: 'Pay-out' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'mtf', label: 'MTF Release' },
]

const basicInfo = computed<Array<[string, string]>>(() => [
  ['Name', c.value.name],
  ['UCC', c.value.id],
  ['PAN (last 4)', panLast4.value],
  ['DOB', c.value.dob],
  ['Gender', c.value.gender === 'M' ? 'Male' : 'Female'],
  ['Email', maskEmail(c.value.email)],
  ['Mobile', maskMobile(c.value.mobile)],
  ['RMS status', badge.value[1]],
  ['Account state', c.value.status === 'blocked' ? 'Blocked' : 'Active'],
  ['MTF', c.value.mtfActive ? 'Enabled' : 'Disabled'],
  ['Email verified', c.value.emailVerified ? 'Yes' : 'No'],
  ['Mobile verified', c.value.mobileVerified ? 'Yes' : 'No'],
])

const payIn = computed(() => payInRows(c.value))
const payOut = computed(() => payOutRows(c.value))
const feedback = computed(() => feedbackRows(c.value))
const mtf = computed(() => mtfRows(c.value))

const payInBadge = (s: string) =>
  s === 'Success' ? 'badge badge-success' : s === 'Pending' ? 'badge badge-warn' : s === 'Failed' ? 'badge badge-danger' : 'badge'
const payOutBadge = (s: string) =>
  s === 'Success' ? 'badge badge-success' : s === 'In-process' ? 'badge badge-warn' : s === 'Rejected' ? 'badge badge-danger' : 'badge'
const mtfBadge = (s: string) =>
  s === 'Released' ? 'badge badge-success' : s === 'Pending' ? 'badge badge-warn' : s === 'Rejected' ? 'badge badge-danger' : 'badge'
const sessionBadge = (s: string) =>
  'badge ' + (s === 'Active' ? 'badge-success' : s === 'Revoked' ? 'badge-danger' : '')

const last4 = (a: string) => '••••' + String(a).slice(-4)
const closeConfirm = () => { confirmBlock.value = false; blockReason.value = '' }
</script>

<template>
  <Teleport to="body">
    <div class="cm-drawer-overlay" @click="emit('close')">
      <div class="card cm-detail cm-drawer" @click.stop>
        <div class="cm-detail-head">
          <div style="display:flex;flex-direction:column;gap:14px;width:100%">
            <div class="user-cell" style="width:100%">
              <div class="av" :style="{ background: avatarColor(c.name), width: '48px', height: '48px', fontSize: '15px' }">{{ initials(c.name) }}</div>
              <div style="flex:1">
                <h3 style="margin:0;font-family:var(--display);font-size:18px;font-weight:600;letter-spacing:-0.01em;color:var(--ink)">{{ c.name }}</h3>
                <div style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:8px;margin-top:3px;flex-wrap:wrap">
                  <span class="col-id">{{ c.id }}</span>
                  <span style="color:var(--muted-2)">·</span>
                  <span>{{ panLast4 }}</span>
                  <span style="color:var(--muted-2)">·</span>
                  <span>{{ c.gender === 'M' ? 'Male' : 'Female' }}, born {{ c.dob }}</span>
                </div>
              </div>
              <div style="display:inline-flex;gap:6px;align-self:flex-start">
                <button class="btn btn-sm"><Icon name="edit" :size="11" /> Edit</button>
                <button class="btn btn-sm" style="color:var(--rose)" @click="confirmBlock = true">{{ isBlocked ? 'Unblock' : 'Block' }}</button>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span class="badge badge-tall" :class="badge[0]"><span class="badge-dot" />{{ badge[1] }}</span>
              <span v-if="c.emailVerified" class="badge badge-info badge-tall"><span class="badge-dot" />Email verified</span>
              <span v-if="c.mobileVerified" class="badge badge-info badge-tall"><span class="badge-dot" />Mobile verified</span>
              <span class="badge badge-tall"><span class="badge-dot" />RMS : OMK</span>
              <div style="flex:1" />
              <span v-if="c.segments && c.segments.length" style="display:inline-flex;align-items:center;gap:6px">
                <span style="font-size:10.5px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-family:var(--display);font-weight:600">Segments</span>
                <span v-for="s in c.segments" :key="s" class="badge badge-tall">{{ s }}</span>
              </span>
            </div>
          </div>
        </div>

        <div v-if="confirmBlock" @click="closeConfirm" style="position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:100;display:flex;align-items:center;justify-content:center">
          <div @click.stop style="background:var(--surface);border-radius:12px;width:min(440px, 92vw);box-shadow:0 20px 60px rgba(15,23,42,0.25);overflow:hidden">
            <div style="padding:18px 20px;border-bottom:1px solid var(--line-2)">
              <div style="font-family:var(--display);font-size:15px;font-weight:600;color:var(--ink)">{{ isBlocked ? 'Unblock client?' : 'Block client?' }}</div>
              <div style="font-size:12.5px;color:var(--muted);margin-top:4px">
                {{ isBlocked ? `This will restore trading access for ${c.name} (${c.id}).` : `${c.name} (${c.id}) will be unable to place new orders or log in until unblocked.` }}
              </div>
            </div>
            <div style="padding:14px 20px">
              <label style="font-size:11px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-family:var(--display)">Reason</label>
              <textarea v-model="blockReason" :placeholder="isBlocked ? 'Why are you unblocking?' : 'Why are you blocking?'" rows="3" style="width:100%;margin-top:6px;border:1px solid var(--border);border-radius:7px;padding:8px 10px;font-size:12.5px;font-family:inherit;resize:vertical;box-sizing:border-box;background:var(--bg);color:var(--ink)" />
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;padding:12px 20px;border-top:1px solid var(--line-2);background:var(--bg)">
              <button class="btn btn-sm" @click="closeConfirm">Cancel</button>
              <button class="btn btn-sm" @click="closeConfirm" :style="{ background: isBlocked ? 'var(--emerald)' : 'var(--rose)', color: '#fff', border: 'none' }">Confirm {{ isBlocked ? 'unblock' : 'block' }}</button>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:2px;padding:0 18px;border-bottom:1px solid var(--line-2);overflow-x:auto">
          <button
            v-for="t in TABS"
            :key="t.id"
            @click="activeTab = t.id"
            :style="{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '12px 14px', fontSize: '12.5px', fontWeight: 500,
              fontFamily: 'var(--display)', letterSpacing: '-0.005em',
              color: activeTab === t.id ? 'var(--ink)' : 'var(--muted)',
              borderBottom: '2px solid ' + (activeTab === t.id ? 'var(--ink)' : 'transparent'),
              marginBottom: '-1px', whiteSpace: 'nowrap',
            }"
          >{{ t.label }}</button>
        </div>

        <div style="padding:18px;overflow-y:auto;flex:1">
          <!-- Basic -->
          <div v-if="activeTab === 'basic'" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px">
            <div v-for="([l, v]) in basicInfo" :key="l" style="background:var(--bg);border:1px solid var(--line-2);border-radius:8px;padding:10px 12px">
              <div style="font-size:10.5px;color:var(--muted-2);text-transform:uppercase;letter-spacing:0.06em;font-family:var(--display);margin-bottom:4px">{{ l }}</div>
              <div style="font-size:13px;color:var(--ink);font-weight:500">{{ v }}</div>
            </div>
          </div>

          <!-- Bank -->
          <template v-else-if="activeTab === 'bank'">
            <div class="cm-col-h" style="margin-bottom:10px">Linked bank accounts</div>
            <table class="data cm-sessions">
              <thead><tr><th>Bank</th><th>Account</th><th>IFSC</th><th>Type</th><th></th></tr></thead>
              <tbody>
                <tr v-if="!c.banks.length"><td colspan="5" style="text-align:center;color:var(--muted-2);padding:20px 0">No bank accounts linked</td></tr>
                <tr v-for="(b, i) in c.banks" :key="i">
                  <td style="font-size:12.5px;font-weight:500;color:var(--ink)">{{ b.name }}</td>
                  <td class="mono" style="font-size:11.5px;color:var(--muted)">{{ maskAccount(b.acct) }}</td>
                  <td class="mono" style="font-size:11.5px;color:var(--muted)">{{ b.ifsc }}</td>
                  <td>
                    <span v-if="b.primary" class="badge badge-success"><span class="badge-dot" />Primary</span>
                    <span v-else class="badge"><span class="badge-dot" />Linked</span>
                  </td>
                  <td style="text-align:right"><button v-if="!b.primary" class="btn btn-sm">Set primary</button></td>
                </tr>
              </tbody>
            </table>
          </template>

          <!-- Access -->
          <template v-else-if="activeTab === 'access'">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <div class="cm-col-h" style="margin-bottom:0">Sessions</div>
              <div class="cm-toggle">
                <button :class="sessionTab === 'all' ? 'active' : ''" @click="sessionTab = 'all'">All</button>
                <button :class="sessionTab === 'live' ? 'active' : ''" @click="sessionTab = 'live'">Live</button>
              </div>
            </div>
            <table class="data cm-sessions">
              <thead><tr><th>Date</th><th>Source</th><th>IP</th><th>Status</th><th></th></tr></thead>
              <tbody>
                <tr v-if="!sessions.length"><td colspan="5" style="text-align:center;color:var(--muted-2);padding:20px 0">No live sessions</td></tr>
                <tr v-for="(s, i) in sessions" :key="i">
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ s.date }}</td>
                  <td style="font-size:12px">{{ s.source }}</td>
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ s.ip }}</td>
                  <td><span :class="sessionBadge(s.status)"><span class="badge-dot" />{{ s.status }}</span></td>
                  <td style="text-align:right"><button v-if="s.status === 'Active'" class="btn btn-sm" style="color:var(--rose)">Revoke</button></td>
                </tr>
              </tbody>
            </table>
          </template>

          <!-- Pay-in -->
          <template v-else-if="activeTab === 'payin'">
            <div class="cm-col-h" style="margin-bottom:10px">Pay-in history</div>
            <table class="data cm-sessions">
              <thead><tr><th>Date</th><th>Bank</th><th>Account</th><th>Mode</th><th style="text-align:right">Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr v-for="(r, i) in payIn" :key="i">
                  <td class="mono" style="font-size:11px;color:var(--muted);white-space:nowrap">{{ r.date }}</td>
                  <td style="font-size:12px">{{ r.bank }}</td>
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ last4(r.acct) }}</td>
                  <td style="font-size:12px">{{ r.mode }}</td>
                  <td class="mono" style="font-size:12px;font-weight:500;text-align:right">{{ fmtINR(r.amount) }}</td>
                  <td><span :class="payInBadge(r.status)" style="min-width:92px;justify-content:center"><span class="badge-dot" />{{ r.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </template>

          <!-- Pay-out -->
          <template v-else-if="activeTab === 'payout'">
            <div class="cm-col-h" style="margin-bottom:10px">Pay-out history</div>
            <table class="data cm-sessions">
              <thead><tr><th>Date</th><th>Bank</th><th>Account</th><th style="text-align:right">Amount</th><th>Status</th><th></th></tr></thead>
              <tbody>
                <tr v-for="(r, i) in payOut" :key="i">
                  <td class="mono" style="font-size:11px;color:var(--muted);white-space:nowrap">{{ r.date }}</td>
                  <td style="font-size:12px">{{ r.bank }}</td>
                  <td class="mono" style="font-size:11px;color:var(--muted)">{{ last4(r.acct) }}</td>
                  <td class="mono" style="font-size:12px;font-weight:500;text-align:right;color:var(--rose)">−{{ fmtINR(r.amount) }}</td>
                  <td><span :class="payOutBadge(r.status)" style="min-width:92px;justify-content:center"><span class="badge-dot" />{{ r.status }}</span></td>
                  <td style="text-align:right"><button v-if="r.status === 'In-process'" class="btn btn-sm" style="color:var(--rose)">Cancel</button></td>
                </tr>
              </tbody>
            </table>
          </template>

          <!-- Feedback -->
          <template v-else-if="activeTab === 'feedback'">
            <div class="table-wrap" style="padding:0">
              <table class="data" style="font-size:12.5px">
                <thead><tr><th>Date</th><th>Title</th><th>Description</th><th>Product</th><th>Stars</th><th>Version</th></tr></thead>
                <tbody>
                  <tr v-for="(r, i) in feedback" :key="i">
                    <td style="font-size:11.5px;color:var(--muted);white-space:nowrap">{{ r.date }}</td>
                    <td style="font-weight:500;color:var(--ink)">{{ r.title }}</td>
                    <td style="color:var(--muted);max-width:320px">{{ r.desc }}</td>
                    <td><span class="pill" style="font-size:10.5px">{{ r.product }}</span></td>
                    <td>
                      <span style="display:inline-flex;gap:1px">
                        <span v-for="n in 5" :key="n" :style="{ color: n <= r.stars ? '#F5A524' : 'var(--line)', fontSize: '13px', lineHeight: 1 }">★</span>
                      </span>
                    </td>
                    <td class="mono" style="font-size:11.5px;color:var(--muted)">{{ r.version }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <!-- MTF -->
          <template v-else-if="activeTab === 'mtf'">
            <div class="cm-col-h" style="margin-bottom:10px">MTF release</div>
            <div v-if="!c.mtfActive" style="background:var(--bg);border:1px solid var(--line-2);border-radius:8px;padding:20px 16px;text-align:center;color:var(--muted);font-size:12.5px">
              MTF facility is inactive for this client.
            </div>
            <table v-else class="data cm-sessions">
              <thead><tr><th>Date</th><th>Symbol</th><th style="text-align:right">Qty</th><th style="text-align:right">Amount</th><th>Status</th><th></th></tr></thead>
              <tbody>
                <tr v-for="(r, i) in mtf" :key="i">
                  <td class="mono" style="font-size:11px;color:var(--muted);white-space:nowrap">{{ r.date }}</td>
                  <td style="font-size:12px;font-weight:500">{{ r.symbol }}</td>
                  <td class="mono" style="font-size:12px;text-align:right">{{ r.qty }}</td>
                  <td class="mono" style="font-size:12px;font-weight:500;text-align:right">{{ fmtINR(r.amount) }}</td>
                  <td><span :class="mtfBadge(r.status)" style="min-width:92px;justify-content:center"><span class="badge-dot" />{{ r.status }}</span></td>
                  <td style="text-align:right"><button v-if="r.status === 'Pending'" class="btn btn-sm">Approve</button></td>
                </tr>
              </tbody>
            </table>
          </template>
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
