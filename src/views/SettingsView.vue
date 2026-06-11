<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../components/Icon.vue'
import CodifiFoot from '../components/CodifiFoot.vue'
import PageHeader from '../components/layout/PageHeader.vue'
import { avatarColor, initials } from '../data/avatar'

const tab = ref('branding')
const logo = ref<string | null>(null)
const fileRef = ref<HTMLInputElement | null>(null)

const onUpload = (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  logo.value = URL.createObjectURL(f)
}

const NAV = [
  { id: 'branding', icon: 'image', label: 'Branding' },
  { id: 'admins', icon: 'users', label: 'Admins & roles' },
  { id: 'security', icon: 'shield', label: 'Security' },
  { id: 'integrations', icon: 'cloud', label: 'Integrations' },
  { id: 'webhooks', icon: 'globe', label: 'API & webhooks' },
  { id: 'billing', icon: 'funds', label: 'Billing' },
]

const BRAND_COLORS = ['#4762E3', '#FF7A59', '#0F9D6E', '#8B5CF6', '#0EA5B7', '#0B0F17']

const ADMINS = [
  { n: 'Rohan Mehta', e: 'rohan@aspire.in', role: 'Super Admin', scope: 'All workspaces', mfa: true, last: '2m' },
  { n: 'Neha Sridhar', e: 'neha.s@aspire.in', role: 'Compliance', scope: 'KYC, Risk', mfa: true, last: '18m' },
  { n: 'Vikram Joshi', e: 'vikram.j@aspire.in', role: 'Operations', scope: 'Trading, Funds', mfa: true, last: '2h' },
  { n: 'Ananya Pillai', e: 'ananya@aspire.in', role: 'Support L2', scope: 'Clients (read)', mfa: false, last: '1d' },
  { n: 'Suresh Rao', e: 'suresh.r@aspire.in', role: 'Finance', scope: 'Funds, Reports', mfa: true, last: '4h' },
]

const SECURITY = [
  { t: 'Require 2FA for all admins', s: 'Authenticator app or hardware key', on: true },
  { t: 'Session timeout', s: 'Auto sign-out after 30 minutes of inactivity', on: true },
  { t: 'IP allow-list', s: 'Restrict admin access to office IPs', on: false },
  { t: 'Sensitive action approvals', s: 'Require 2 admins for blocks, refunds, mass actions', on: true },
  { t: 'Audit log retention', s: 'Retain admin audit logs for 365 days', on: true },
]

const INTEGRATIONS = [
  { n: 'NSE', d: 'Market feed', on: true, c: 'var(--primary)' },
  { n: 'BSE', d: 'Market feed', on: true, c: 'var(--coral)' },
  { n: 'ICICI', d: 'Payments', on: true, c: 'var(--amber)' },
  { n: 'HDFC', d: 'Payments', on: true, c: 'var(--emerald)' },
  { n: 'CVL', d: 'KYC', on: true, c: 'var(--violet)' },
  { n: 'Razorpay', d: 'Payments', on: false, c: 'var(--ink)' },
]
</script>

<template>
  <PageHeader>
    <template #actions>
      <button class="btn">Discard</button>
      <button class="btn btn-accent"><Icon name="check" :size="13" /> Save changes</button>
    </template>
  </PageHeader>

  <div style="display:grid;grid-template-columns:220px 1fr;gap:18px">
    <div class="card" style="padding:8px;height:fit-content">
      <button
        v-for="s in NAV"
        :key="s.id"
        @click="tab = s.id"
        class="nav-item"
        :style="{ color: tab === s.id ? 'var(--ink)' : 'var(--muted)', background: tab === s.id ? 'var(--canvas)' : 'transparent', fontWeight: tab === s.id ? 600 : 500 }"
      >
        <Icon :name="s.icon" class="ni-icon" :style="{ color: tab === s.id ? 'var(--primary)' : 'inherit' }" />
        <span>{{ s.label }}</span>
      </button>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- Branding -->
      <template v-if="tab === 'branding'">
        <div class="card">
          <div class="card-head">
            <h3>Workspace identity</h3>
            <span class="muted" style="font-size:12px">Aspire Capital · Production</span>
          </div>
          <div class="card-body">
            <div class="logo-uploader">
              <div class="logo-preview">
                <img v-if="logo" :src="logo" alt="Client logo" />
                <div v-else class="placeholder">120 × 120</div>
              </div>
              <div style="flex:1">
                <div style="font-weight:600;font-size:14px;margin-bottom:4px">Client logo</div>
                <div style="font-size:12.5px;color:var(--muted);margin-bottom:10px">
                  Square SVG or PNG, transparent background. Min 240×240. Shown on auth screens, statements and exported reports.
                </div>
                <div style="display:flex;gap:8px">
                  <input ref="fileRef" type="file" accept="image/*" @change="onUpload" hidden />
                  <button class="btn btn-accent" @click="fileRef?.click()"><Icon name="upload" :size="13" /> Upload logo</button>
                  <button v-if="logo" class="btn" @click="logo = null">Remove</button>
                </div>
              </div>
            </div>

            <hr class="divider" />

            <div class="section-grid-2" style="gap:14px">
              <div class="field">
                <div class="field-label">Workspace name</div>
                <input class="input" value="Aspire Capital" />
              </div>
              <div class="field">
                <div class="field-label">Display short code</div>
                <input class="input" value="ASPIRE" />
              </div>
              <div class="field">
                <div class="field-label">Primary brand color</div>
                <div style="display:flex;gap:6px">
                  <div
                    v-for="c in BRAND_COLORS"
                    :key="c"
                    :style="{ width: '30px', height: '30px', borderRadius: '8px', background: c, border: '2px solid ' + (c === '#4762E3' ? 'var(--ink)' : 'transparent'), cursor: 'pointer' }"
                  />
                  <input class="input" value="#4762E3" style="width:120px;font-family:var(--mono)" />
                </div>
              </div>
              <div class="field">
                <div class="field-label">Support email</div>
                <input class="input" value="support@aspire.in" />
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Co-branding</h3><span class="muted" style="font-size:12px">How CodiFi is shown alongside your brand</span></div>
          <div class="card-body">
            <div class="status-row">
              <div style="flex:1">
                <div style="font-weight:500;font-size:13px">Show "Powered by CodiFi" on auth pages</div>
                <div style="font-size:12px;color:var(--muted)">Subtle footer mark · recommended for trust signal</div>
              </div>
              <div class="toggle on"></div>
            </div>
            <div class="status-row">
              <div style="flex:1">
                <div style="font-weight:500;font-size:13px">Include CodiFi mark on PDF statements</div>
                <div style="font-size:12px;color:var(--muted)">Bottom-right corner, 12px</div>
              </div>
              <div class="toggle on"></div>
            </div>
            <div class="status-row">
              <div style="flex:1">
                <div style="font-weight:500;font-size:13px">White-label mobile app icon</div>
                <div style="font-size:12px;color:var(--muted)">Replace CodiFi monogram with your logo on iOS/Android</div>
              </div>
              <div class="toggle"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- Admins -->
      <div v-else-if="tab === 'admins'" class="card">
        <div class="card-head">
          <h3>Admins & roles</h3>
          <span class="badge">7 admins</span>
          <div class="card-actions">
            <button class="btn btn-accent btn-sm"><Icon name="plus" :size="12" /> Invite admin</button>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data">
            <thead><tr><th>User</th><th>Role</th><th>Scope</th><th>2FA</th><th>Last active</th><th></th></tr></thead>
            <tbody>
              <tr v-for="u in ADMINS" :key="u.e">
                <td>
                  <div class="user-cell">
                    <div class="av" :style="{ background: avatarColor(u.n) }">{{ initials(u.n) }}</div>
                    <div><div class="uc-name">{{ u.n }}</div><div class="uc-sub">{{ u.e }}</div></div>
                  </div>
                </td>
                <td><span class="pill">{{ u.role }}</span></td>
                <td style="font-size:12px;color:var(--muted)">{{ u.scope }}</td>
                <td>
                  <span v-if="u.mfa" class="badge badge-success"><span class="badge-dot" />Enabled</span>
                  <span v-else class="badge badge-warn"><span class="badge-dot" />Off</span>
                </td>
                <td class="num" style="color:var(--muted)">{{ u.last }} ago</td>
                <td><button class="icon-btn" style="width:28px;height:28px"><Icon name="more" :size="13" /></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Security -->
      <div v-else-if="tab === 'security'" class="card">
        <div class="card-head"><h3>Security</h3></div>
        <div class="card-body">
          <div v-for="(s, i) in SECURITY" :key="i" class="status-row">
            <div style="flex:1">
              <div style="font-weight:500;font-size:13px">{{ s.t }}</div>
              <div style="font-size:12px;color:var(--muted)">{{ s.s }}</div>
            </div>
            <div class="toggle" :class="{ on: s.on }"></div>
          </div>
        </div>
      </div>

      <!-- Integrations -->
      <div v-else-if="tab === 'integrations'" class="card">
        <div class="card-head"><h3>Integrations</h3></div>
        <div class="card-body">
          <div class="section-grid-3">
            <div v-for="(i, k) in INTEGRATIONS" :key="k" class="server-tile">
              <div class="st-head">
                <div class="st-icon" :style="{ background: i.c + '22', color: i.c }">{{ i.n[0] }}</div>
                <div style="flex:1">
                  <div style="font-weight:600;font-size:13px">{{ i.n }}</div>
                  <div style="font-size:11px;color:var(--muted)">{{ i.d }}</div>
                </div>
                <div class="toggle" :class="{ on: i.on }"></div>
              </div>
              <button class="btn btn-sm" style="align-self:flex-start">Configure <Icon name="chevR" :size="11" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Webhooks / Billing -->
      <div v-else-if="tab === 'webhooks' || tab === 'billing'" class="card">
        <div class="card-head"><h3>{{ tab === 'webhooks' ? 'API & webhooks' : 'Billing' }}</h3></div>
        <div class="card-body" style="padding:40px;text-align:center;color:var(--muted)">
          <Icon :name="tab === 'webhooks' ? 'globe' : 'funds'" :size="32" :style="{ opacity: 0.4, marginBottom: '8px' }" />
          <div style="font-size:13px">This section is coming soon.</div>
        </div>
      </div>
    </div>
  </div>

  <CodifiFoot />
</template>
