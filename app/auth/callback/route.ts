import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { safeAuthNext } from "@/lib/auth-redirect"
import { sitePath } from "@/lib/site-path"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  let target = sitePath("/account/sign-in?error=confirmation")
  try {
    if (code) {
      const client = await createClient()
      const { error } = await client.auth.exchangeCodeForSession(code)
      if (!error) target = safeAuthNext(request.nextUrl.searchParams.get("next"))
    }
  } catch { /* Keep provider details and tokens out of redirects. */ }
  return new NextResponse(null, { status: 303, headers: { Location: target, "Cache-Control": "private, no-store" } })
}
