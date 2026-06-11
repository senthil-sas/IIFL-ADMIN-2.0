import type { AuthUser } from '../types'

const SESSION_URL = `${import.meta.env.VITE_SSOLOGINURL}getusersession`
const APP_SECRET = import.meta.env.VITE_APPSECRET as string

async function sha256(message: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function parseJwt(token: string): Record<string, unknown> {
  const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(
    atob(b64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
  return JSON.parse(json)
}

export interface SsoParams {
  clientid: string
  authcode: string
}

export async function fetchUserSession(params: SsoParams): Promise<{ token: string; user: AuthUser }> {
  const checkSum = await sha256(`${params.clientid}${params.authcode}${APP_SECRET}`)

  const res = await fetch(SESSION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkSum }),
  })

  if (!res.ok) throw new Error(`Auth request failed (${res.status})`)

  const data: {
    status?: string
    userSession?: string
    message?: string
    stat?: string
    emsg?: string
  } = await res.json()

  if (data.stat === 'Not_ok' || data.status !== 'Ok' || !data.userSession) {
    throw new Error(data.emsg ?? data.message ?? 'Authentication failed')
  }

  const payload = parseJwt(data.userSession)
  const iiflRoles =
    ((payload.resource_access as Record<string, { roles: string[] }>)?.IIFL?.roles) ?? []

  const user: AuthUser = {
    ucc: payload.ucc as string,
    name: (payload.name as string).trim(),
    givenName: (payload.given_name as string).trim(),
    familyName: (payload.family_name as string).trim(),
    email: payload.email as string,
    roles: iiflRoles,
    sub: payload.sub as string,
    exp: payload.exp as number,
  }

  return { token: data.userSession, user }
}
