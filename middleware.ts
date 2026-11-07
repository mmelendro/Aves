import { NextResponse, type NextRequest } from "next/server"

// Account pages are served by the existing shared backend. Only this fixed
// upstream receives the request; no user-supplied host or destination is used.
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname + request.nextUrl.search
  const hasSharedCookie = request.cookies.getAll().some(({ name }) => /^aves-auth(?:\.\d+)?$/.test(name))
  let response: NextResponse
  if (!hasSharedCookie && !request.cookies.has("aves-session-checked")) {
    // The old Path=/australia cookie cannot be read here. Visit its original
    // scope once to verify/migrate the session without asking for a new login.
    response = NextResponse.redirect(new URL(`/australia/auth/session?${new URLSearchParams({ next: path })}`, request.url), 307)
  } else {
    const headers = new Headers(request.headers)
    headers.set("x-aves-account-proxy", "1")
    const upstream = process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "https://aves-australia.vercel.app"
    response = NextResponse.rewrite(new URL(`/australia${path}`, upstream), { request: { headers } })
  }
  response.headers.set("Cache-Control", "private, no-store")
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
  return response
}

export const config = { matcher: ["/account/:path*"] }
