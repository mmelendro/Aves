/**
 * Finish a Supabase PKCE sign-in/email callback on the server.
 * The one-time code is exchanged for cookie-backed session credentials. Redirects
 * use an allowlisted next path, and provider errors/tokens are not echoed to users.
 */

import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isReadOnlyPreview } from "@/lib/deployment-mode"
import { safeAuthNext } from "@/lib/auth-redirect"

/**
 * Exchange a callback code for a session and issue a private, uncached redirect to the safe destination.
 */
export async function GET(request: NextRequest) {
  if (isReadOnlyPreview()) return new NextResponse(null, { status: 303, headers: { Location: "/account/sign-in", "Cache-Control": "private, no-store" } })
  const code = request.nextUrl.searchParams.get("code")
  const isOAuth = request.nextUrl.searchParams.get("flow") === "oauth"
  const providerError = request.nextUrl.searchParams.get("error") || request.nextUrl.searchParams.get("error_code")
  let target = "/account/sign-in?error=confirmation"
  if (isOAuth) {
    const params = new URLSearchParams({
      error: providerError === "access_denied" ? "oauth-cancelled" : "oauth",
      next: safeAuthNext(request.nextUrl.searchParams.get("next")),
    })
    // Empty fragment prevents provider error fragments surviving the redirect.
    target = `${"/account/sign-in"}?${params}#`
  }
  try {
    if (code && !providerError) {
      const client = await createClient()
      const { error } = await client.auth.exchangeCodeForSession(code)
      if (!error) target = safeAuthNext(request.nextUrl.searchParams.get("next"))
    }
  } catch { /* Keep provider details and tokens out of redirects. */ }
  return new NextResponse(null, { status: 303, headers: { Location: target, "Cache-Control": "private, no-store" } })
}
