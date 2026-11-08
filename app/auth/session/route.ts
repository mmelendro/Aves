/**
 * One-time bridge for browsers with the older /australia session cookie.
 * The redirect carries cookie updates to the shared root account portal. The short
 * aves-session-checked cookie prevents redirect loops; it is not an Auth credential.
 */

import { NextResponse, type NextRequest } from "next/server"
import { safeAuthNext } from "@/lib/auth-redirect"
import { authCookieOptions } from "@/lib/supabase/config"
import { migrateLegacySessionCookies } from "@/lib/supabase/session-migration"

export const dynamic = "force-dynamic"

/**
 * Apply validated legacy-cookie migration writes and redirect without exposing tokens in the URL/body.
 */
export async function GET(request: NextRequest) {
  const target = safeAuthNext(request.nextUrl.searchParams.get("next"))
  const response = new NextResponse(null, { status: 303, headers: {
    Location: target, "Cache-Control": "private, no-store", Pragma: "no-cache",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  } })
  const result = await migrateLegacySessionCookies(request.cookies.getAll())
  for (const cookie of result.cookies) response.cookies.set(cookie.name, cookie.value, cookie.options)
  // A short, non-authentication guard prevents a bootstrap loop for visitors
  // without an older session. Never use this flag to authorize anything.
  response.cookies.set("aves-session-checked", "1", { path: "/", sameSite: "lax", secure: authCookieOptions.secure, httpOnly: true, maxAge: 300 })
  return response
}
