// Real schema/NextResponse/crypto; storage, email and environment are isolated.
// No actual provider import, network call, email or credential is used.
const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const { createRequire } = require("node:module")
const crypto = require("node:crypto")

const appRoot = resolve(__dirname, "..")
const appRequire = createRequire(resolve(appRoot, "package.json"))
const ts = appRequire("typescript")
const nextServer = appRequire("next/server")
const zod = appRequire("zod")
const tripOptions = require("./helpers/load-ts.cjs")()("content/trip-options.ts")
const compiled = ts.transpileModule(readFileSync(resolve(appRoot, "app/api/contact/route.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText

const validInquiry = {
  intent: "inquiry", name: "  Test Birder  ", email: "visitor@example.com", updates: false,
  region: "Tropical North Queensland", travelWhen: "April 2027", partySize: 2,
  message: "First line\nSecond line",
}
const accepted = { data: { id: "test-acceptance-id" }, error: null }
const idempotencyKey = "a13b0801-1c6d-41d4-94da-12e3adeebf13"
const receipt = {
  request_id: "f4fa711d-3730-49df-8c5b-bd90394b428f", created: true,
  submitted_at: "2026-10-01T01:02:03.456Z", notification_status: "pending", subscriber_status: null,
}
class ContactStoreError extends Error {
  constructor(status) { super("private storage details"); this.status = status }
}

function harness(outcome = accepted, environment = {}, storage = {}, timers = { setTimeout, clearTimeout }) {
  const calls = [], logs = [], saves = [], notifications = [], events = [], options = [], exports = {}
  class FakeResend {
    constructor(key) {
      assert.equal(key, "test-only-key")
      this.emails = {
        send: async (payload, sendOptions) => {
          events.push("email")
          calls.push(payload)
          options.push(sendOptions)
          if (outcome instanceof Error) throw outcome
          return outcome
        },
      }
    }
  }
  const safeRequire = (name) => {
    if (name === "resend") return { Resend: FakeResend }
    if (name === "next/server") return nextServer
    if (name === "zod") return zod
    if (name === "node:crypto") return crypto
    if (name === "@/content/trip-options") return tripOptions
    if (name === "@/lib/contact-store") return {
      ContactStoreError,
      saveContactRequest: async (input) => {
        events.push("save")
        saves.push(input)
        if (storage.save) return storage.save(input, saves.length)
        return { ...receipt, ...storage.receipt }
      },
      recordContactNotification: async (...args) => {
        events.push("notification")
        notifications.push(args)
        if (storage.record) return storage.record(...args)
      },
    }
    throw new Error(`Unexpected dependency: ${name}`)
  }
  new Function("require", "exports", "process", "console", "setTimeout", "clearTimeout", compiled)(
    safeRequire, exports,
    { env: { RESEND_API_KEY: "test-only-key", ...environment } },
    { error: (...args) => logs.push(args) },
    timers.setTimeout, timers.clearTimeout,
  )
  return {
    calls, logs, saves, notifications, events, options, invoke: exports.POST,
    submit: (body = validInquiry, headers = { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey }) =>
      exports.POST(new Request("https://example.test/api/contact", {
        method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body),
      })),
  }
}

test("inquiry saves before sending one owner notification and records provider acceptance", async () => {
  const h = harness()
  const response = await h.submit()
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
  assert.deepEqual(h.events, ["save", "email", "notification"])
  assert.deepEqual(h.options, [{ idempotencyKey: `contact/${receipt.request_id}` }])
  assert.deepEqual(h.notifications, [[receipt.request_id, "accepted", "test-acceptance-id", null]])
  assert.equal(h.calls.length, 1)
  assert.equal(h.calls[0].to, "mmelendro@gmail.com")
  assert.equal(h.calls[0].from, "AVES <noreply@aves.bio>")
  assert.equal(h.calls[0].replyTo, "visitor@example.com")
  assert.equal(h.calls[0].subject, "[AVES Australia] Custom tour inquiry from Test Birder")
  assert.match(h.calls[0].text, /Intent: inquiry/)
  assert.match(h.calls[0].text, /Updates consent submitted: No/)
  assert.match(h.calls[0].text, /Consent timestamp \(UTC\): No opt-in submitted/)
  assert.match(h.calls[0].text, /Party size: 2/)
  assert.match(h.calls[0].text, /First line\nSecond line/)
})

test("Colombia enquiry stores country and exact consent scope before owner notification", async () => {
  const h = harness()
  const response = await h.submit({ ...validInquiry, country: "colombia", region: "cauca-valley", updates: true })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "colombia" })
  assert.equal(h.saves[0].country, "colombia")
  assert.equal(h.saves[0].consentVersion, "co-travel-updates-2026-11-06")
  assert.match(h.calls[0].subject, /AVES Colombia/)
  assert.match(h.calls[0].text, /Country: Colombia/)
  assert.deepEqual(h.events, ["save", "email", "notification"])
})

test("shared contact rejects foreign origins and explicit cross-site before storage", async () => {
  for (const extra of [{ Origin: "https://attacker.test" }, { Origin: "https://aves.bio", "Sec-Fetch-Site": "cross-site" }]) {
    const h = harness()
    assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey, ...extra })).status, 403)
    assert.equal(h.saves.length, 0)
  }
  for (const origin of [undefined, "https://aves.bio", "https://example.test"]) {
    const h = harness()
    assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey, ...(origin ? { Origin: origin } : {}) })).status, 200)
  }
})

test("local contact accepts only same-port same-scheme loopback aliases", async () => {
  for (const [origin, status] of [["http://127.0.0.1:3000", 200], ["http://127.0.0.1:3001", 403], ["https://127.0.0.1:3000", 403], ["http://attacker.test:3000", 403]]) {
    const h = harness()
    const response = await h.invoke(new Request("http://localhost:3000/australia/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey, Origin: origin }, body: JSON.stringify(validInquiry),
    }))
    assert.equal(response.status, status)
    assert.equal(h.saves.length, status === 200 ? 1 : 0)
  }
})

for (const body of [
  { ...validInquiry, country: "peru" },
  { ...validInquiry, country: "colombia", region: "tasmania" },
  { ...validInquiry, country: "australia", region: "pacific" },
  { ...validInquiry, country: "colombia", region: "unknown" },
  { ...validInquiry, country: "colombia", region: "pacific", intent: "waitlist", updates: false },
]) test("invalid destination or consent cannot reach shared contact storage", async () => {
  const h = harness()
  assert.equal((await h.submit(body)).status, 400)
  assert.equal(h.saves.length, 0)
  assert.equal(h.calls.length, 0)
})

test("waitlist requires explicit updates consent and records timestamp in owner notification", async () => {
  const h = harness()
  const response = await h.submit({ intent: "waitlist", name: "Test Birder", email: "visitor@example.com", updates: true })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "waitlist", country: "australia" })
  assert.equal(h.calls.length, 1)
  assert.match(h.calls[0].subject, /Waitlist request/)
  assert.match(h.calls[0].text, /Updates consent submitted: Yes/)
  assert.ok(h.calls[0].text.includes(`Consent timestamp (UTC): ${receipt.submitted_at}`))
  assert.ok(h.calls[0].text.includes(`Submitted at (UTC): ${receipt.submitted_at}`))
})

test("inquiry may also opt into updates and preserves flexible party-size text", async () => {
  const h = harness()
  assert.equal((await h.submit({ ...validInquiry, updates: true, partySize: "Not sure yet" })).status, 200)
  assert.match(h.calls[0].text, /Updates consent submitted: Yes/)
  assert.match(h.calls[0].text, /Party size: Not sure yet/)
})

for (const sender of ["AVES Test <sender@example.com>", "sender@example.com"]) {
  test(`respects validated owner inbox and sender: ${sender}`, async () => {
    const h = harness(undefined, { CONTACT_EMAIL: " team@example.com ", CONTACT_FROM: sender })
    assert.equal((await h.submit()).status, 200)
    assert.equal(h.calls[0].to, "team@example.com")
    assert.equal(h.calls[0].from, sender)
  })
}

for (const [label, input] of [
  ["malformed JSON", "{"],
  ["null body", null],
  ["array body", []],
  ["missing intent", { ...validInquiry, intent: undefined }],
  ["unknown intent", { ...validInquiry, intent: "booking" }],
  ["blank name", { ...validInquiry, name: "  " }],
  ["name header injection", { ...validInquiry, name: "Test\r\nBcc: other@example.com" }],
  ["invalid email", { ...validInquiry, email: "not-an-email" }],
  ["missing consent boolean", { ...validInquiry, updates: undefined }],
  ["string consent value", { ...validInquiry, updates: "true" }],
  ["waitlist without consent", { ...validInquiry, intent: "waitlist", updates: false }],
  ["non-empty honeypot", { ...validInquiry, website: "https://bot.example" }],
  ["whitespace honeypot", { ...validInquiry, website: " " }],
  ["object region", { ...validInquiry, region: {} }],
  ["too-long timing", { ...validInquiry, travelWhen: "a".repeat(161) }],
  ["zero party size", { ...validInquiry, partySize: 0 }],
  ["fractional party size", { ...validInquiry, partySize: 2.5 }],
  ["excessive party size", { ...validInquiry, partySize: 51 }],
  ["too-long message", { ...validInquiry, message: "a".repeat(5001) }],
]) {
  test(`rejects ${label} before storage or email`, async () => {
    const h = harness()
    assert.equal((await h.submit(input)).status, 400)
    assert.equal(h.calls.length, 0)
    assert.equal(h.saves.length, 0)
  })
}

test("rejects unsupported content type", async () => {
  const h = harness()
  assert.equal((await h.submit(validInquiry, { "Content-Type": "text/plain" })).status, 415)
  assert.equal(h.calls.length, 0)
  assert.equal(h.saves.length, 0)
})

test("limits actual UTF-8 bytes without trusting Content-Length", async () => {
  const h = harness()
  assert.equal((await h.submit({ ...validInquiry, message: "é".repeat(17_000) })).status, 413)
  assert.equal(h.calls.length, 0)
  assert.equal(h.saves.length, 0)
})

test("stops reading and cancels a body once its streaming byte limit is exceeded", async () => {
  const h = harness()
  let cancelled = false
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(32_769)) },
    cancel() { cancelled = true },
  })
  const response = await h.invoke(new Request("https://example.test/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: stream, duplex: "half",
  }))
  assert.equal(response.status, 413)
  assert.equal(cancelled, true)
  assert.equal(h.calls.length, 0)
  assert.equal(h.saves.length, 0)
})

test("rejects invalid UTF-8 instead of silently changing submitted text", async () => {
  const h = harness()
  const response = await h.invoke(new Request("https://example.test/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: new Uint8Array([0xc0]),
  }))
  assert.equal(response.status, 400)
  assert.equal(h.calls.length, 0)
  assert.equal(h.saves.length, 0)
})

for (const [label, env] of [
  ["missing API key", { RESEND_API_KEY: undefined }],
  ["blank API key", { RESEND_API_KEY: " " }],
  ["invalid owner inbox", { CONTACT_EMAIL: "not-an-email" }],
  ["invalid sender address", { CONTACT_FROM: "AVES <not-an-email>" }],
  ["sender header injection", { CONTACT_FROM: "AVES <sender@example.com>\r\nBcc: other@example.com" }],
]) {
  test(`${label} does not turn durable storage into a false failure`, async () => {
    const h = harness(undefined, env)
    const response = await h.submit()
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
    assert.equal(h.calls.length, 0)
    assert.deepEqual(h.events, ["save", "notification"])
    assert.deepEqual(h.notifications, [[receipt.request_id, "failed", null, "email_configuration_missing"]])
  })
}

for (const [label, result] of [
  ["provider rejection", { data: null, error: { name: "validation_error", message: "private provider details" } }],
  ["missing acceptance ID", { data: {}, error: null }],
  ["transport failure", new Error("private transport details")],
]) {
  test(`${label} preserves the saved request and records notification failure`, async () => {
    const h = harness(result)
    const response = await h.submit()
    assert.equal(response.status, 200)
    assert.equal(h.calls.length, 1)
    assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
    assert.deepEqual(h.notifications, [[receipt.request_id, "failed", null,
      result instanceof Error ? "email_provider_unconfirmed" : "email_provider_rejected"]])
    assert.doesNotMatch(JSON.stringify(h.logs), /private provider|private transport|visitor@example.com/)
  })
}

for (const key of [undefined, "", "not-a-uuid", "a13b08011c6d41d494da12e3adeebf13"]) {
  test(`rejects invalid or absent idempotency header: ${String(key)}`, async () => {
    const h = harness()
    const headers = { "Content-Type": "application/json" }
    if (key !== undefined) headers["Idempotency-Key"] = key
    assert.equal((await h.submit(validInquiry, headers)).status, 400)
    assert.deepEqual(h.events, [])
  })
}

test("normalization produces a stable consent-versioned payload hash across retries", async () => {
  const h = harness()
  await h.submit({ ...validInquiry, email: "  VISITOR@example.com  ", ignored: "not persisted" })
  await h.submit({ ...validInquiry, name: "Test Birder", partySize: "2" })
  const { payloadHash, idempotencyKey: key, ...payload } = h.saves[0]
  assert.equal(key, idempotencyKey)
  assert.equal(payload.name, "Test Birder")
  assert.equal(payload.email, "visitor@example.com")
  assert.equal(payload.partySize, "2")
  assert.equal(payload.consentVersion, "au-launch-updates-2026-11-05")
  assert.equal(payload.ignored, undefined)
  assert.match(payloadHash, /^[a-f0-9]{64}$/)
  assert.equal(payloadHash, crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex"))
  assert.equal(h.saves[1].payloadHash, payloadHash)
  await h.submit({ ...validInquiry, updates: true })
  assert.notEqual(h.saves[2].payloadHash, payloadHash)
})

test("an unchanged replay returns stored without repeating email or notification updates", async () => {
  const h = harness(undefined, {}, { save: (_input, count) => ({ ...receipt, created: count === 1 }) })
  assert.equal((await h.submit()).status, 200)
  assert.equal((await h.submit()).status, 200)
  assert.equal(h.saves.length, 2)
  assert.equal(h.calls.length, 1)
  assert.equal(h.notifications.length, 1)
  assert.deepEqual(h.events, ["save", "email", "notification", "save"])
})

for (const status of [409, 429, 503]) {
  test(`storage ${status} prevents email and returns the matching public response`, async () => {
    const h = harness(undefined, {}, { save: () => { throw new ContactStoreError(status) } })
    const response = await h.submit()
    assert.equal(response.status, status)
    assert.equal(response.headers.get("cache-control"), "no-store")
    assert.equal(response.headers.get("retry-after"), status === 429 ? "900" : null)
    assert.deepEqual(h.events, ["save"])
    assert.doesNotMatch(await response.text(), /private|visitor@example.com|success|stored/)
    assert.doesNotMatch(JSON.stringify(h.logs), /private|visitor@example.com/)
  })
}

test("an unconfirmed storage result cannot send or report success; retry uses the same key", async () => {
  let rejectSave
  const deferred = new Promise((_resolve, reject) => { rejectSave = reject })
  const h = harness(undefined, {}, {
    save: (_input, count) => count === 1 ? deferred : { ...receipt, created: false },
  })
  let settled = false
  const pending = h.submit().then((response) => { settled = true; return response })
  await new Promise((resolve) => setImmediate(resolve))
  assert.deepEqual(h.events, ["save"])
  assert.equal(settled, false)
  rejectSave(new Error("private timeout detail"))
  const uncertain = await pending
  assert.equal(uncertain.status, 503)
  assert.doesNotMatch(await uncertain.text(), /private|success/)
  const retry = await h.submit()
  assert.deepEqual(await retry.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
  assert.equal(h.saves[0].idempotencyKey, h.saves[1].idempotencyKey)
  assert.equal(h.saves[0].payloadHash, h.saves[1].payloadHash)
  assert.equal(h.calls.length, 0)
})

for (const outcome of [accepted, new Error("private mail transport failure")]) {
  test(`notification status write failure preserves stored success after ${outcome === accepted ? "acceptance" : "mail failure"}`, async () => {
    const h = harness(outcome, {}, { record: () => { throw new Error("private status update details") } })
    const response = await h.submit()
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
    assert.equal(h.notifications.length, 1)
    assert.doesNotMatch(JSON.stringify(h.logs), /private|visitor@example.com/)
  })
}

test("a slow notification times out after its bound and still returns durable success", async () => {
  let fireTimeout
  let resolveEmail
  const timerHandle = { synthetic: true }
  const cleared = []
  const h = harness(new Promise((resolve) => { resolveEmail = resolve }), {}, {}, {
    setTimeout: (callback, delay) => { assert.equal(delay, 8_000); fireTimeout = callback; return timerHandle },
    clearTimeout: (handle) => cleared.push(handle),
  })
  const pending = h.submit()
  await new Promise((resolve) => setImmediate(resolve))
  assert.deepEqual(h.events, ["save", "email"])
  fireTimeout()
  const response = await pending
  assert.deepEqual(await response.json(), { success: true, status: "stored", intent: "inquiry", country: "australia" })
  assert.deepEqual(h.notifications, [[receipt.request_id, "failed", null, "email_provider_unconfirmed"]])
  assert.deepEqual(cleared, [timerHandle])
  resolveEmail(accepted)
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(h.notifications.length, 1)
})

test("fast notification acceptance clears its timeout without firing it", async () => {
  const handle = { synthetic: true }
  const cleared = []
  const h = harness(accepted, {}, {}, {
    setTimeout: (_callback, delay) => { assert.equal(delay, 8_000); return handle },
    clearTimeout: (value) => cleared.push(value),
  })
  assert.equal((await h.submit()).status, 200)
  assert.deepEqual(cleared, [handle])
  assert.equal(h.notifications[0][1], "accepted")
})
