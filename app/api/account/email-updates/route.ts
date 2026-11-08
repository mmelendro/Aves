import { z } from "zod"
import { requireAccountUser } from "@/lib/account-auth"
import { accountBody, accountHandler } from "@/lib/account-http"
import { accountRpc } from "@/lib/account-service"

/** Only the verified session supplies identity; a browser cannot subscribe someone else. */
export const GET = () => accountHandler(async () => {
  const { user } = await requireAccountUser()
  return accountRpc("account_email_updates", { p_user_id: user.id, p_subscribed: null })
})
export const PUT = (request: Request) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const { subscribed } = await accountBody(request, z.object({ subscribed: z.boolean() }).strict())
  return accountRpc("account_email_updates", { p_user_id: user.id, p_subscribed: subscribed })
})
