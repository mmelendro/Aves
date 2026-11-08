/**
 * Server route adapter. Issue the reviewed proposal and attempt notification; issued and email-delivered are different states.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { proposalSend } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const maxDuration = 30
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) { return proposalSend(request, (await context.params).id) }
