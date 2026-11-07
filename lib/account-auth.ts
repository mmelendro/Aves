/**
 * Account identity checks that run only on the server.
 * The browser's cookies describe a claimed session; Supabase Auth verifies it with
 * getUser(). The returned client still acts as that visitor, so database row-level
 * security (RLS) applies. It is not the privileged service-key client.
 */

import "server-only"
import { createClient } from "@/lib/supabase/server"
import { AccountError } from "@/lib/account-errors"

/**
 * Verify the current session and return { user, client }; throw a safe 401/403/503 error otherwise.
 * The confirmed, non-anonymous user ID is the trusted actor for subsequent operations.
 */
export async function requireAccountUser() {
  let client
  try { client = await createClient() } catch { throw new AccountError(503, "Account access is temporarily unavailable.") }
  let result
  try { result = await client.auth.getUser() } catch { throw new AccountError(503, "Account access is temporarily unavailable.") }
  if (result.error || !result.data.user) throw new AccountError(401, "Please sign in to continue.")
  const user = result.data.user
  if (!user.email || !user.email_confirmed_at || user.is_anonymous) throw new AccountError(403, "Please confirm your email address before continuing.")
  return { user, client }
}

/**
 * Page-friendly wrapper: return the verified account or null on sign-in/configuration/provider failure.
 * Callers must not interpret null as proof that an account does not exist.
 */
export async function getAccountUser() {
  try { return (await requireAccountUser()).user } catch { return null }
}
