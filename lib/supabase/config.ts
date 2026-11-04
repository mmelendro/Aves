import { SITE_BASE_PATH } from "@/lib/site-path"

export const authCookieOptions = { name: "aves-au-auth", path: SITE_BASE_PATH, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" }

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
