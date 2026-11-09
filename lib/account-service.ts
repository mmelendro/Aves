/**
 * Private transport for account RPCs (remote procedure calls: database functions).
 * This uses a server secret whose service role bypasses RLS, unlike the visitor
 * client in supabase/server.ts. Keep it out of browser imports/public variables.
 * The allowlist narrows calls; each database function must also verify the actor
 * ID that account-handlers.ts obtained from the authenticated session.
 */

import "server-only"
import { AccountError } from "@/lib/account-errors"

type AccountRpc = "admin_ai_draft" | "account_email_updates" | "account_admin_status" | "submit_quote_request" | "record_quote_notification" | "list_admin_quotes" | "update_quote_status" |
  "create_quote_proposal" | "update_quote_proposal" | "issue_quote_proposal" | "record_proposal_notification"

/**
 * POST an allowlisted function and server-built arguments; return its JSON typed as T.
 * T is a compile-time expectation, not runtime schema validation. Failures become safe account errors.
 */
export async function accountRpc<T>(name: AccountRpc, body: Record<string, unknown>): Promise<T> {
  try {
    const rawUrl = process.env.SUPABASE_URL?.trim()
    const key = process.env.SUPABASE_SECRET_KEY?.trim()
    if (!rawUrl || !key) throw new Error("Missing configuration")
    const url = new URL(rawUrl)
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw new Error("Invalid origin")
    const headers: Record<string, string> = { "Content-Type": "application/json", apikey: key }
    // Modern secret keys use apikey; legacy service-role JWTs also need Bearer.
    // Inspecting the legacy role is a format check, not signature verification;
    // Supabase validates the actual credential on the request.
    if (!key.startsWith("sb_secret_")) {
      if (key.split(".").length !== 3 || JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role !== "service_role") throw new Error("Invalid key")
      headers.Authorization = `Bearer ${key}`
    }
    const response = await fetch(`${url.origin}/rest/v1/rpc/${name}`, {
      method: "POST", body: JSON.stringify(body), headers, cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10_000),
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
      // Translate deliberately signalled database errors; do not expose raw SQL
      // messages, request bodies or service credentials in the HTTP response.
      const statuses: Record<string, [number, string]> = {
        PT403: [403, "You don't have access to this action."], PT404: [404, "This item could not be found."],
        PT409: [409, "This item has changed. Refresh it before trying again."], PT429: [429, "Please wait 15 minutes before sending another request."],
      }
      const mapped = statuses[data?.code]
      if (mapped) throw new AccountError(...mapped)
      throw new Error("Storage unavailable")
    }
    return data as T
  } catch (error) {
    if (error instanceof AccountError) throw error
    throw new AccountError(503, "We couldn't confirm this request was saved. Please retry with the same details.")
  }
}
