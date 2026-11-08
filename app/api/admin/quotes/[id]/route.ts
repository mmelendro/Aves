/**
 * Server route adapter. Update quote workflow status after owner authorization; this route does not send email.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { adminQuotePatch } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { return adminQuotePatch(request, (await context.params).id) }
