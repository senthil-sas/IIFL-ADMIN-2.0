<script setup lang="ts">
import Icon from '../Icon.vue'
import { avatarColor, initials } from '../../data/avatar'

export interface ApiUser {
  ucc: string
  clientName: string | null
  email: string
  mobile: string
  pan: string
  status: string
  statusName: string | null
  firstName: string
  lastName: string
  userRole: string
  oms: string
  dob: string
  createdOn: string
  poa: string | null
}

const props = defineProps<{ user: ApiUser }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const STATUS_DISPLAY: Record<string, [string, string]> = {
  A: ['badge-green',  'Active'],
  D: ['badge-amber',  'Dormant'],
  F: ['badge-rose',   'Freeze'],
  V: ['badge-violet', 'Voluntary Freeze'],
  X: ['badge-gray',   'Closed'],
}

function displayName(u: ApiUser) {
  const last = u.lastName && u.lastName !== 'NA' ? u.lastName : ''
  return [u.firstName, last].filter(Boolean).join(' ')
}

function formatDate(dt: string) {
  if (!dt) return '—'
  return dt.split(' ')[0]
}

function infoRows(u: ApiUser): Array<{ label: string; value: string }> {
  return [
    { label: 'Full Name',    value: displayName(u) || '—' },
    { label: 'UCC',          value: u.ucc || '—' },
    { label: 'Email',        value: u.email || '—' },
    { label: 'Mobile',       value: u.mobile || '—' },
    { label: 'PAN',          value: u.pan || '—' },
    { label: 'Date of Birth',value: formatDate(u.dob) },
    { label: 'Status',       value: STATUS_DISPLAY[u.status]?.[1] ?? u.status ?? '—' },
    { label: 'User Role',    value: u.userRole || '—' },
    { label: 'OMS',          value: u.oms || '—' },
    { label: 'POA',          value: u.poa || '—' },
    { label: 'Created On',   value: formatDate(u.createdOn) },
  ]
}
</script>

<template>
  <Teleport to="body">
    <div class="ud-overlay" @click="emit('close')">
      <div class="card ud-drawer" @click.stop>

        <!-- Header -->
        <div class="ud-head">
          <div class="user-cell" style="width:100%">
            <div
              class="av"
              :style="{ background: avatarColor(user.firstName), width: '48px', height: '48px', fontSize: '15px' }"
            >{{ initials(user.firstName) }}</div>
            <div style="flex:1;min-width:0">
              <h3 class="ud-name">{{ displayName(user) || user.ucc }}</h3>
              <div class="ud-meta">
                <span class="col-id">{{ user.ucc }}</span>
                <span class="ud-sep">·</span>
                <span>{{ user.pan }}</span>
              </div>
            </div>
            <button class="btn btn-sm ud-close-btn" @click="emit('close')">
              <Icon name="close" :size="13" />
            </button>
          </div>

          <!-- Badges row -->
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:12px">
            <span class="badge badge-tall" :class="STATUS_DISPLAY[user.status]?.[0] ?? 'badge-gray'">
              <span class="badge-dot" />{{ STATUS_DISPLAY[user.status]?.[1] ?? user.status }}
            </span>
            <span v-if="user.userRole" class="badge badge-tall">
              <span class="badge-dot" />{{ user.userRole }}
            </span>
            <span v-if="user.oms" class="badge badge-tall">OMS: {{ user.oms }}</span>
          </div>
        </div>

        <!-- Body -->
        <div class="ud-body">
          <div class="ud-section-title">Basic Info</div>
          <div class="ud-grid">
            <div v-for="row in infoRows(user)" :key="row.label" class="ud-field">
              <div class="ud-field-label">{{ row.label }}</div>
              <div class="ud-field-value">{{ row.value }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Floating close -->
      <button
        @click="emit('close')"
        aria-label="Close"
        class="ud-fab-close"
      >
        <Icon name="close" :size="14" /> Close
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.ud-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.ud-drawer {
  width: min(480px, 100vw);
  height: 100dvh;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -8px 0 40px rgba(15, 23, 42, 0.18);
  animation: slideIn 0.22s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

.ud-head {
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--line-2);
  flex-shrink: 0;
}

.ud-name {
  margin: 0;
  font-family: var(--display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ud-meta {
  font-size: 12px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
  flex-wrap: wrap;
}

.ud-sep { color: var(--muted-2); }

.ud-close-btn {
  align-self: flex-start;
  flex-shrink: 0;
}

.ud-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 20px;
}

.ud-section-title {
  font-size: 10.5px;
  font-family: var(--display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted-2);
  margin-bottom: 12px;
}

.ud-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.ud-field {
  background: var(--bg);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  padding: 10px 12px;
}

.ud-field-label {
  font-size: 10.5px;
  color: var(--muted-2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--display);
  margin-bottom: 4px;
}

.ud-field-value {
  font-size: 13px;
  color: var(--ink);
  font-weight: 500;
  word-break: break-all;
}

.ud-fab-close {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 210;
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.28), 0 2px 6px rgba(15, 23, 42, 0.18);
}
</style>
