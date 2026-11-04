import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { authCookieOptions, publicSupabaseConfig } from "@/lib/supabase/config"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  try {
    const { url, key } = publicSupabaseConfig()
    const client = createServerClient(url, key, {
      cookieOptions: authCookieOptions,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
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
  return response
}

export const config = { matcher: ["/account/:path*", "/admin/:path*", "/auth/:path*", "/api/account/:path*", "/api/admin/:path*"] }
