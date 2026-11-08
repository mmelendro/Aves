/**
 * Server route adapter. List or create the verified visitor's trip drafts via shared handlers.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { plansGet, plansPost } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const GET = plansGet
export const POST = plansPost
