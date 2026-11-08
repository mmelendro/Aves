/**
 * Maintain the existing root-scoped AVES session in one application.
 * The legacy bridge reads old /australia cookies once. APIs verify every user;
 * no request is forwarded to a second deployment.
 */
import { isReadOnlyPreview } from "@/lib/deployment-mode"
import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { authCookieOptions, publicSupabaseConfig } from "@/lib/supabase/config"
import { migrateLegacySessionCookies } from "@/lib/supabase/session-migration"

export async function middleware(request: NextRequest) {
  const originalPath = request.nextUrl.pathname
  const path = originalPath.replace(/^\/australia(?=\/)/, "")
  if (isReadOnlyPreview() && !["GET", "HEAD", "OPTIONS"].includes(request.method) && /^\/api\/(?:account|admin)(?:\/|$)/.test(path)) {
    return NextResponse.json({ error: "Saving is disabled in this website preview. Please use live AVES." },
      { status: 503, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } })
  }
  if (path === "/auth/session") return NextResponse.next({ request })
  let localRewrite: URL | undefined
  if (/^\/australia\/(?:account|admin)(?:\/|$)/.test(originalPath)) {
    const url = request.nextUrl.clone()
    url.pathname = path
    if (request.headers.get("x-aves-account-proxy") === "1") localRewrite = url
    else {
      const response = NextResponse.redirect(url, 307)
      response.headers.set("Cache-Control", "private, no-store")
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
      return response
    }
  }
  const hasSharedCookie = request.cookies.getAll().some(({ name }) => /^aves-auth(?:\.\d+)?$/.test(name))
  if ((path === "/account" || path.startsWith("/account/")) && !localRewrite && !hasSharedCookie && !request.cookies.has("aves-session-checked")) {
    const url = request.nextUrl.clone()
    url.pathname = "/australia/auth/session"
    url.search = new URLSearchParams({ next: path + request.nextUrl.search }).toString()
    const response = NextResponse.redirect(url, 307)
    response.headers.set("Cache-Control", "private, no-store")
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
    return response
  }
  const migration = await migrateLegacySessionCookies(request.cookies.getAll())
  for (const cookie of migration.cookies) {
    if (cookie.options.maxAge === 0) request.cookies.delete(cookie.name)
    else request.cookies.set(cookie.name, cookie.value)
  }
  const downstream = () => localRewrite ? NextResponse.rewrite(localRewrite, { request }) : NextResponse.next({ request })
  let response = downstream()
  try {
    const { url, key } = publicSupabaseConfig()
    const client = createServerClient(url, key, {
      cookieOptions: authCookieOptions,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = downstream()
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, path: "/" }))
          Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value))
        },
      },
    })
    await client.auth.getUser()
  } catch { /* Private APIs independently fail closed when auth is unavailable. */ }
  for (const cookie of migration.cookies) if (!response.cookies.has(cookie.name)) response.cookies.set(cookie.name, cookie.value, cookie.options)
  response.headers.set("Cache-Control", "private, no-store")
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
  return response
}
export const config = { matcher: [
  "/account/:path*", "/admin/:path*", "/auth/:path*", "/api/account/:path*", "/api/admin/:path*",
  "/australia/account/:path*", "/australia/admin/:path*", "/australia/auth/:path*", "/australia/api/account/:path*", "/australia/api/admin/:path*",
] }
