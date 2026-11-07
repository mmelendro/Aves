/**
 * Email follows a record already saved in the database.
 * This server-only module asks Resend to send an owner/client notice, then records
 * the separate provider outcome. Acceptance is not proof of inbox delivery, and a
 * failed notification must not erase a saved request or issued proposal.
 */

import "server-only"
import { Resend } from "resend"
import { z } from "zod"
import { accountRpc } from "@/lib/account-service"

/**
 * For a stored quote/proposal ID, send plaintext to the supplied recipient and return accepted/failed.
 * The caller supplies an authorized recipient; recording the provider outcome is best-effort.
 */
export async function notifyAccount(kind: "quote" | "proposal", id: string, to: string, subject: string, text: string) {
  const outcomeRpc = kind === "quote" ? "record_quote_notification" : "record_proposal_notification"
  const identity = kind === "quote" ? { p_request_id: id } : { p_proposal_id: id }
  const record = async (status: "accepted" | "failed", providerId: string | null, errorCode: string | null) => {
    try { await accountRpc(outcomeRpc, { ...identity, p_status: status, p_provider_id: providerId, p_error_code: errorCode }) } catch { /* Durable request/proposal remains successful. */ }
  }
  const key = process.env.RESEND_API_KEY?.trim()
  const from = process.env.CONTACT_FROM?.trim() || "AVES <noreply@aves.bio>"
  if (!key || !z.email().safeParse(to).success || /[\r\n]/.test(from)) { await record("failed", null, "email_configuration_missing"); return "failed" as const }
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    // The stable provider key belongs to this saved record. The timeout bounds
    // our wait but does not cancel delivery: acceptance can remain unknown.
    const result = await Promise.race([
      new Resend(key).emails.send({ from, to, subject, text, replyTo: "mmelendro@gmail.com" }, { idempotencyKey: `${kind}/${id}` }),
      new Promise<never>((_resolve, reject) => { timer = setTimeout(() => reject(new Error("Unconfirmed")), 8000) }),
    ])
    if (result.error || !result.data?.id) { await record("failed", null, "email_provider_rejected"); return "failed" as const }
    // A provider receipt confirms acceptance, not that the client read/received it.
    await record("accepted", result.data.id, null)
    return "accepted" as const
  } catch { await record("failed", null, "email_provider_unconfirmed"); return "failed" as const }
  finally { clearTimeout(timer) }
}
