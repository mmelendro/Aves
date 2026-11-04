// Execute the real REST helper with isolated environment/fetch. No network or credentials.
const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const { createRequire } = require("node:module")
const appRoot = resolve(__dirname, "..")
const appRequire = createRequire(resolve(appRoot, "package.json"))
const ts = appRequire("typescript")
const zod = appRequire("zod")
const compiled = ts.transpileModule(readFileSync(resolve(appRoot, "lib/contact-store.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText
const input = {
  idempotencyKey: "a13b0801-1c6d-41d4-94da-12e3adeebf13", payloadHash: "a".repeat(64),
  intent: "inquiry", name: "Synthetic Test", email: "visitor@example.test", updates: false,
  consentVersion: "au-launch-updates-2026-11-05", region: "Tasmania", travelWhen: "Flexible",
  partySize: "2", message: "Synthetic test only",
}
const receipt = {
  request_id: "f4fa711d-3730-49df-8c5b-bd90394b428f", created: true,
  submitted_at: "2026-10-01T01:02:03.456Z", notification_status: "pending", subscriber_status: null,
}
const response = (body, status = 200) => new Response(JSON.stringify(body), { status })
const jwt = (role) => `header.${Buffer.from(JSON.stringify({ role })).toString("base64url")}.signature`

function harness({ env = {}, fetcher = () => response(receipt), signalFactory = AbortSignal } = {}) {
  const calls = [], deadlines = [], exports = {}
  const safeRequire = (name) => {
    if (name === "server-only") return {}
    if (name === "zod") return zod
    throw new Error(`Unexpected dependency: ${name}`)
  }
  new Function("require", "exports", "process", "fetch", "AbortSignal", compiled)(
    safeRequire, exports,
    { env: { SUPABASE_URL: "https://database.example.test", SUPABASE_SECRET_KEY: "sb_secret_synthetic_only", ...env } },
    async (url, options) => { calls.push({ url, options }); return fetcher(url, options) },
    { timeout: (ms) => { deadlines.push(ms); return signalFactory.timeout(ms) } },
  )
  return { ...exports, calls, deadlines }
}

async function storageError(h, status = 503) {
  await assert.rejects(() => h.saveContactRequest(input), (error) => {
    assert.ok(error instanceof h.ContactStoreError)
    assert.equal(error.status, status)
    assert.equal(error.message, "Contact storage is unavailable")
    return true
  })
}

test("modern secret calls exact RPC with private header, bounded timeout and no redirect/cache", async () => {
  const h = harness()
  assert.deepEqual(await h.saveContactRequest(input), receipt)
  assert.equal(h.calls.length, 1)
  const { url, options } = h.calls[0]
  assert.equal(url, "https://database.example.test/rest/v1/rpc/submit_contact_request")
  assert.equal(options.method, "POST")
  assert.equal(options.cache, "no-store")
  assert.equal(options.redirect, "error")
  assert.equal(options.headers.apikey, "sb_secret_synthetic_only")
  assert.equal(options.headers.Authorization, undefined)
  assert.equal(options.headers["Content-Type"], "application/json")
  assert.ok(options.signal instanceof AbortSignal)
  assert.deepEqual(h.deadlines, [10_000])
  assert.deepEqual(JSON.parse(options.body), {
    p_idempotency_key: input.idempotencyKey, p_payload_hash: input.payloadHash,
    p_intent: input.intent, p_name: input.name, p_email: input.email, p_updates: input.updates,
    p_consent_version: input.consentVersion, p_region: input.region, p_travel_when: input.travelWhen,
    p_party_size: input.partySize, p_message: input.message,
  })
})

test("legacy service-role JWT adds Authorization alongside apikey", async () => {
  const key = jwt("service_role")
  const h = harness({ env: { SUPABASE_SECRET_KEY: ` ${key} `, SUPABASE_URL: " https://database.example.test/ " } })
  await h.saveContactRequest(input)
  assert.equal(h.calls[0].options.headers.apikey, key)
  assert.equal(h.calls[0].options.headers.Authorization, `Bearer ${key}`)
})

for (const [label, env] of [
  ["missing URL", { SUPABASE_URL: undefined }],
  ["missing secret", { SUPABASE_SECRET_KEY: undefined }],
  ["blank secret", { SUPABASE_SECRET_KEY: " " }],
  ["malformed URL", { SUPABASE_URL: "not a URL" }],
  ["HTTP URL", { SUPABASE_URL: "http://database.example.test" }],
  ["URL user info", { SUPABASE_URL: "https://user:password@database.example.test" }],
  ["URL path", { SUPABASE_URL: "https://database.example.test/rest/v1" }],
  ["URL query", { SUPABASE_URL: "https://database.example.test/?x=y" }],
  ["URL fragment", { SUPABASE_URL: "https://database.example.test/#x" }],
  ["public publishable key", { SUPABASE_SECRET_KEY: "sb_publishable_synthetic_only" }],
  ["anonymous JWT", { SUPABASE_SECRET_KEY: jwt("anon") }],
  ["authenticated JWT", { SUPABASE_SECRET_KEY: jwt("authenticated") }],
  ["invalid legacy JSON", { SUPABASE_SECRET_KEY: "head.not-json.signature" }],
]) {
  test(`${label} cannot trigger a storage request`, async () => {
    const h = harness({ env })
    await storageError(h)
    assert.equal(h.calls.length, 0)
  })
}

for (const [code, status, expected] of [["PT409", 409, 409], ["PT429", 429, 429], ["42501", 403, 503], ["XX000", 500, 503]]) {
  test(`RPC error ${code} maps to ${expected} without exposing provider details`, async () => {
    const h = harness({ fetcher: () => response({ code, message: "private database details" }, status) })
    await storageError(h, expected)
  })
}

for (const [label, fetcher] of [
  ["transport rejection", () => { throw new Error("private transport details") }],
  ["non-JSON error", () => new Response("private gateway detail", { status: 502 })],
  ["non-JSON success", () => new Response("not a receipt")],
  ["null receipt", () => response(null)],
  ["array receipt", () => response([receipt])],
  ["invalid request ID", () => response({ ...receipt, request_id: "not-a-uuid" })],
  ["invalid timestamp", () => response({ ...receipt, submitted_at: "yesterday" })],
  ["missing creation flag", () => response({ ...receipt, created: undefined })],
  ["invalid notification status", () => response({ ...receipt, notification_status: "delivered" })],
  ["missing subscriber status", () => response({ ...receipt, subscriber_status: undefined })],
  ["unverified subscriber claim", () => response({ ...receipt, subscriber_status: "verified" })],
]) {
  test(`${label} cannot create a false storage receipt`, async () => {
    await storageError(harness({ fetcher }))
  })
}

test("an aborted request maps to uncertain storage, never a synthetic receipt", async () => {
  const controller = new AbortController()
  const h = harness({
    signalFactory: { timeout: () => controller.signal },
    fetcher: (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(new DOMException("timed out", "TimeoutError")), { once: true })
      queueMicrotask(() => controller.abort())
    }),
  })
  await storageError(h)
  assert.equal(h.calls[0].options.signal.aborted, true)
  assert.deepEqual(h.deadlines, [10_000])
})

test("replay preserves the original receipt including suppression status", async () => {
  const replay = { ...receipt, created: false, subscriber_status: "suppressed", notification_status: "accepted" }
  const h = harness({ fetcher: () => response(replay) })
  assert.deepEqual(await h.saveContactRequest(input), replay)
})

test("notification acceptance is recorded separately with provider receipt", async () => {
  const h = harness({ fetcher: () => response(null) })
  await h.recordContactNotification(receipt.request_id, "accepted", "provider-test-id", null)
  assert.equal(h.calls[0].url, "https://database.example.test/rest/v1/rpc/record_contact_notification")
  assert.deepEqual(JSON.parse(h.calls[0].options.body), {
    p_request_id: receipt.request_id, p_status: "accepted", p_provider_id: "provider-test-id", p_error_code: null,
  })
})

test("notification transport failure is reported to its caller for best-effort handling", async () => {
  const h = harness({ fetcher: () => { throw new Error("private notification details") } })
  await assert.rejects(() => h.recordContactNotification(receipt.request_id, "failed", null, "email_provider_rejected"),
    (error) => error instanceof h.ContactStoreError && error.status === 503)
})
