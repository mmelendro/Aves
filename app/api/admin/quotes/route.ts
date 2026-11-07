/**
 * Server route adapter. Load the owner inbox; the handler/database verify an active administrator grant.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { adminQuotesGet } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const GET = adminQuotesGet
