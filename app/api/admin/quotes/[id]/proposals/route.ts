/**
 * Server route adapter. Create a draft priced proposal for this quote request after owner authorization.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { proposalPost } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) { return proposalPost(request, (await context.params).id) }
