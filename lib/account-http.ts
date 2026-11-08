/**
 * Shared HTTP safeguards for account endpoints.
 * These helpers limit/validate input, check request origin, avoid cached private
 * responses, and translate failures. They do not authenticate the caller: handlers
 * must also call requireAccountUser() and enforce record ownership or owner access.
 */

import { NextResponse } from "next/server"
import { z } from "zod"
import { AccountError } from "@/lib/account-errors"

/**
 * Return JSON with private/no-store caching; rate-limit responses also suggest a 15-minute retry delay.
 */
export function accountResponse(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store", ...(status === 429 ? { "Retry-After": "900" } : {}) } })
}

/**
 * Run one async handler and translate its result/error into a safe JSON HTTP response.
 */
export async function accountHandler(work: () => Promise<unknown>) {
  try { return accountResponse(await work()) } catch (error) {
    return accountResponse({ error: error instanceof AccountError ? error.message : "We couldn't confirm this request. Please try again." }, error instanceof AccountError ? error.status : 503)
  }
}

/**
 * Reject missing/foreign Origin or explicit cross-site account mutations.
 * This is a request-origin check, not a replacement for session verification.
 */
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const requestUrl = new URL(request.url)
  const allowed = [requestUrl.origin, new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio").origin]
  // Next's local server can normalize 127.0.0.1 to localhost internally. Only
  // equivalent loopback addresses on the same scheme and port may differ.
  let localAlias = false
  try {
    const originUrl = new URL(origin || "")
    const loopback = new Set(["localhost", "127.0.0.1", "[::1]"])
    localAlias = origin === originUrl.origin && loopback.has(requestUrl.hostname) && loopback.has(originUrl.hostname)
      && requestUrl.protocol === originUrl.protocol && requestUrl.port === originUrl.port
  } catch { /* An invalid Origin must fail closed. */ }
  if (!origin || (!allowed.includes(origin) && !localAlias) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new AccountError(403, "Please submit this request from the AVES website.")
  }
}

/**
 * Read a UUID retry reference from Idempotency-Key; throw 400 if absent or malformed.
 * The key identifies one attempted operation; it is not a secret or an ownership token.
 */
export function requestKey(request: Request) {
  const parsed = z.uuid().safeParse(request.headers.get("idempotency-key"))
  if (!parsed.success) throw new AccountError(400, "Please refresh this form and try again.")
  return parsed.data
}

/**
 * Read at most 32 KiB of same-origin JSON, validate with the supplied Zod schema, and return typed data.
 * Malformed/oversized input throws a safe error before database work begins.
 */
export async function accountBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  requireSameOrigin(request)
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new AccountError(415, "Please submit your request as JSON.")
  const reader = request.body?.getReader()
  if (!reader) throw new AccountError(400, "Please check your request details.")
  let text = "", size = 0
  const decoder = new TextDecoder("utf-8", { fatal: true })
  try {
    // Check bytes while streaming, not just a Content-Length header that a caller
    // can omit. Fatal UTF-8 decoding also rejects malformed byte sequences.
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 32_768) { await reader.cancel(); throw new AccountError(413, "Your request is too long.") }
      text += decoder.decode(value, { stream: true })
    }
    const result = schema.safeParse(JSON.parse(text + decoder.decode()))
    if (!result.success) throw new AccountError(400, "Please check your request details.")
    return result.data
  } catch (error) {
    if (error instanceof AccountError) throw error
    throw new AccountError(400, "Please check your request details.")
  } finally { reader.releaseLock() }
}
