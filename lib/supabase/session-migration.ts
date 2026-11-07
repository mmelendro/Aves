import "server-only"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { authCookieOptions, legacyAuthCookieOptions, publicSupabaseConfig } from "./config"

type CookieValue = { name: string; value: string }
export type MigratedCookie = CookieValue & { options: CookieOptions }

const legacySession = /^aves-au-auth(?:\.\d{1,2})?$/
const legacyVerifier = /^aves-au-auth-code-verifier(?:\.\d{1,2})?$/
const sharedSession = /^aves-auth(?:\.\d{1,2})?$/
const sharedVerifier = /^aves-auth-code-verifier(?:\.\d{1,2})?$/
const sessionMaxAge = 400 * 24 * 60 * 60 // Same lifetime as @supabase/ssr.

/** Called only where legacy Path=/australia cookies are visible. Never returns
 * tokens in a body or URL; callers apply these writes as same-site cookies. */
export async function migrateLegacySessionCookies(cookies: CookieValue[]): Promise<{ cookies: MigratedCookie[]; migrated: boolean }> {
  const legacy = cookies.filter(cookie => legacySession.test(cookie.name) || legacyVerifier.test(cookie.name))
  const writes: MigratedCookie[] = []
  if (!legacy.length || legacy.length > 16 || legacy.some(cookie => cookie.value.length > 4096)) return { cookies: writes, migrated: false }
  const current = new Map(legacy.map(cookie => [cookie.name, cookie.value]))
  const hasSharedSession = cookies.some(cookie => sharedSession.test(cookie.name) && cookie.value)
  const hasSharedVerifier = cookies.some(cookie => sharedVerifier.test(cookie.name) && cookie.value)
  const remove = (name: string) => writes.push({ name, value: "", options: { ...legacyAuthCookieOptions, maxAge: 0 } })
  const copy = (name: string, value: string, maxAge: number) => writes.push({
    name: name.replace(/^aves-au-auth/, authCookieOptions.name), value,
    options: { ...authCookieOptions, maxAge },
  })

  // A verifier is not a session. Preserve pending PKCE email/social callbacks,
  // even if that browser has never signed in; never replace a newer verifier.
  if (!hasSharedVerifier) {
    for (const [name, value] of current) if (legacyVerifier.test(name) && value) {
      copy(name, value, 3600)
      remove(name)
    }
  }

  // A newly signed-in shared account always wins over a leftover old session.
  if (hasSharedSession) {
    for (const name of current.keys()) if (legacySession.test(name)) remove(name)
    return { cookies: writes, migrated: false }
  }
  if (![...current].some(([name, value]) => legacySession.test(name) && value)) return { cookies: writes, migrated: false }

  try {
    const { url, key } = publicSupabaseConfig()
    const client = createServerClient(url, key, {
      cookieOptions: legacyAuthCookieOptions,
      cookies: {
        getAll: () => [...current].map(([name, value]) => ({ name, value })),
        setAll: updated => {
          // getUser may refresh the session. Migrate those newest chunks, not
          // a stale refresh token from the incoming request.
          for (const cookie of updated) if (legacySession.test(cookie.name) || legacyVerifier.test(cookie.name)) {
            if (!cookie.value || cookie.options.maxAge === 0) current.delete(cookie.name)
            else current.set(cookie.name, cookie.value)
          }
        },
      },
    })
    const { data, error } = await client.auth.getUser()
    if (error || !data.user?.email || !data.user.email_confirmed_at || data.user.is_anonymous) return { cookies: writes, migrated: false }
    const tokens = [...current].filter(([name, value]) => legacySession.test(name) && value)
    if (!tokens.length) return { cookies: writes, migrated: false }
    for (const [name, value] of tokens) copy(name, value, sessionMaxAge)
    for (const name of new Set([...legacy.map(cookie => cookie.name), ...current.keys()])) if (legacySession.test(name)) remove(name)
    return { cookies: writes, migrated: true }
  } catch {
    // Keep old credentials intact on a temporary provider/configuration error.
    // Account APIs still independently require a verified current user.
    return { cookies: writes, migrated: false }
  }
}
