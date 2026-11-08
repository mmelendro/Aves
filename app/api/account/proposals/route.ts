/**
 * Server route adapter. List only the verified client's issued proposals via the shared handler.
 * URL IDs are untrusted; account-handlers.ts owns validation and authorization.
 * force-dynamic avoids static rendering of private responses; it is not permission.
 */

import { proposalsGet } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const GET = proposalsGet
