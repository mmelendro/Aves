/**
 * Server route adapter. Submit the identified owned plan for a quote; the handler freezes it before attempting notification.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { quotePost } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const maxDuration = 30
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) { return quotePost(request, (await context.params).id) }
