import "server-only"
import { createClient } from "@/lib/supabase/server"
import { AccountError } from "@/lib/account-errors"

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

export async function getAccountUser() {
  try { return (await requireAccountUser()).user } catch { return null }
}
