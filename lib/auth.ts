import type { UserSession } from '@/types/auth'

const COOKIE_NAME = 'crm_session'
const MAX_AGE = 60 * 60 * 24 // 24 hours in seconds

export function setSessionCookie(user: UserSession): void {
  const encoded = btoa(JSON.stringify(user))
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${MAX_AGE}; SameSite=Lax`
}

export function getSessionFromCookie(): UserSession | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  try {
    const encoded = match.split('=')[1]
    return JSON.parse(atob(encoded)) as UserSession
  } catch {
    return null
  }
}

export function clearSessionCookie(): void {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}
