/**
 * Server route adapter. Edit a current owner-authorized proposal draft; issued content cannot be edited here.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { proposalPatch } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { return proposalPatch(request, (await context.params).id) }
