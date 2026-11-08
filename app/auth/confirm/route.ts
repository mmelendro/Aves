/**
 * Confirm an allowed email token type with Supabase Auth, then redirect.
 * A recovery token leads to the password-reset form; other allowed types use the
 * safe account return path. The token itself is not returned in the response.
 */

import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isReadOnlyPreview } from "@/lib/deployment-mode"
import { safeAuthNext } from "@/lib/auth-redirect"

/**
 * Verify the supplied email token/type with Auth; return a safe uncached redirect for success or failure.
 */
export async function GET(request: NextRequest) {
  if (isReadOnlyPreview()) return new NextResponse(null, { status: 303, headers: { Location: "/account/sign-in", "Cache-Control": "private, no-store" } })
  const tokenHash = request.nextUrl.searchParams.get("token_hash")
  const type = request.nextUrl.searchParams.get("type")
  let target = "/account/sign-in?error=confirmation"
  try {
    if (tokenHash && (type === "email" || type === "signup" || type === "recovery")) {
      const client = await createClient()
      const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type })
      if (!error) target = safeAuthNext(type === "recovery" ? "/account/reset-password" : request.nextUrl.searchParams.get("next"))
    }
  } catch { /* Never reflect verification errors or tokens. */ }
  return new NextResponse(null, { status: 303, headers: { Location: target, "Cache-Control": "private, no-store" } })
}
