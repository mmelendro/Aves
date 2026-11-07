// One browser session across every AVES destination. The distinct name avoids
// ambiguous duplicate cookies while the old /australia session is migrated.
export const authCookieOptions = { name: "aves-auth", path: "/", sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" }
export const legacyAuthCookieOptions = { ...authCookieOptions, name: "aves-au-auth", path: "/australia" }

export function publicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !key?.startsWith("sb_publishable_")) throw new Error("Account sign-in is not configured")
  const parsed = new URL(url)
  if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("Account sign-in is not configured")
  }
  return { url: parsed.origin, key }
}
