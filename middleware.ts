/**
 * Session maintenance and legacy-account routing before matched requests.
 * Cookie refresh and private cache headers do not authorize operations. Account
 * APIs verify the user independently; database ownership/admin rules decide which
 * records may be accessed.
 */

import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { authCookieOptions, publicSupabaseConfig } from "@/lib/supabase/config"
import { migrateLegacySessionCookies } from "@/lib/supabase/session-migration"

/**
 * Refresh/migrate cookies and normalize old account URLs, returning the appropriate Next response.
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/^\/australia(?=\/)/, "")
  // The bridge writes its own response. Never consume its old cookies here.
  if (path === "/auth/session") return NextResponse.next({ request })
  const migration = await migrateLegacySessionCookies(request.cookies.getAll())
  for (const cookie of migration.cookies) {
    if (cookie.options.maxAge === 0) request.cookies.delete(cookie.name)
    else request.cookies.set(cookie.name, cookie.value)
  }
  const carryMigration = (target: NextResponse) => {
    for (const cookie of migration.cookies) target.cookies.set(cookie.name, cookie.value, cookie.options)
    return target
  }
  // The main-site proxy sets this routing hint. It is not an owner/authentication
  // credential: spoofing it must not bypass the independent account API checks.
  if ((path === "/account" || path.startsWith("/account/")) && request.headers.get("x-aves-account-proxy") !== "1") {
    const target = NextResponse.redirect(new URL(path + request.nextUrl.search, process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio"), 307)
    target.headers.set("Cache-Control", "private, no-store")
    target.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
    target.cookies.set("aves-session-checked", "1", { path: "/", sameSite: "lax", httpOnly: true, secure: authCookieOptions.secure, maxAge: 300 })
    return carryMigration(target)
  }
  let response = NextResponse.next({ request })
  try {
    const { url, key } = publicSupabaseConfig()
    const client = createServerClient(url, key, {
      cookieOptions: authCookieOptions,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = carryMigration(NextResponse.next({ request }))
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, path: authCookieOptions.path }))
          Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value))
        },
      },
    })
    // Fresh server verification also detects a session revoked elsewhere.
    await client.auth.getUser()
  } catch {
    // APIs independently fail closed; public auth screens explain availability.
  }
  response.headers.set("Cache-Control", "private, no-store")
  // Apply migration first so fresh session writes from getUser keep precedence.
  for (const cookie of migration.cookies) if (!response.cookies.has(cookie.name)) response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}

export const config = { matcher: ["/account/:path*", "/admin/:path*", "/auth/:path*", "/api/account/:path*", "/api/admin/:path*"] }
