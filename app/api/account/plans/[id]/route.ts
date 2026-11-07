/**
 * Server route adapter. Edit/delete a draft identified by the URL; handlers verify ownership, draft status, and revision.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { planPatch, planDelete } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
type Context = { params: Promise<{ id: string }> }
export async function PATCH(request: Request, context: Context) { return planPatch(request, (await context.params).id) }
export async function DELETE(request: Request, context: Context) { return planDelete(request, (await context.params).id) }
