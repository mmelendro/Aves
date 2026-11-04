import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { safeAuthNext } from "@/lib/auth-redirect"
import { sitePath } from "@/lib/site-path"

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash")
  const type = request.nextUrl.searchParams.get("type")
  let target = sitePath("/account/sign-in?error=confirmation")
  try {
    if (tokenHash && (type === "email" || type === "signup" || type === "recovery")) {
      const client = await createClient()
      const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type })
      if (!error) target = safeAuthNext(type === "recovery" ? "/account/reset-password" : request.nextUrl.searchParams.get("next"))
    }
  } catch { /* Never reflect verification errors or tokens. */ }
  return new NextResponse(null, { status: 303, headers: { Location: target, "Cache-Control": "private, no-store" } })
}
