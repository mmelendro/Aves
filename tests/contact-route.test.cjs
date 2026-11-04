// Real schema/NextResponse; email transport and environment are isolated.
// No actual Resend import, network call, email or credential is used.
const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const { createRequire } = require("node:module")

const appRoot = resolve(__dirname, "..")
const appRequire = createRequire(resolve(appRoot, "package.json"))
const ts = appRequire("typescript")
const nextServer = appRequire("next/server")
const zod = appRequire("zod")
const compiled = ts.transpileModule(readFileSync(resolve(appRoot, "app/api/contact/route.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText

const validInquiry = {
  intent: "inquiry", name: "  Test Birder  ", email: "visitor@example.com", updates: false,
  region: "Tropical North Queensland", travelWhen: "April 2027", partySize: 2,
  message: "First line\nSecond line",
}
const accepted = { data: { id: "test-acceptance-id" }, error: null }

function harness(outcome = accepted, environment = {}) {
  const calls = [], logs = [], exports = {}
  class FakeResend {
    constructor(key) {
      assert.equal(key, "test-only-key")
      this.emails = {
        send: async (payload) => {
          calls.push(payload)
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
    throw new Error(`Unexpected dependency: ${name}`)
  }
  new Function("require", "exports", "process", "console", compiled)(
    safeRequire, exports,
    { env: { RESEND_API_KEY: "test-only-key", ...environment } },
    { error: (...args) => logs.push(args) },
  )
  return {
    calls, logs, invoke: exports.POST,
    submit: (body = validInquiry, headers = { "Content-Type": "application/json" }) =>
      exports.POST(new Request("https://example.test/api/contact", {
        method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body),
      })),
  }
}

test("inquiry accepts optional updates=false and sends exactly one owner notification", async () => {
  const h = harness()
  const response = await h.submit()
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { success: true, status: "accepted", intent: "inquiry" })
  assert.equal(h.calls.length, 1)
  assert.equal(h.calls[0].to, "info@aves.bio")
  assert.equal(h.calls[0].from, "AVES Australia <noreply@aves.bio>")
  assert.equal(h.calls[0].replyTo, "visitor@example.com")
  assert.equal(h.calls[0].subject, "[AVES Australia] Custom tour inquiry from Test Birder")
  assert.match(h.calls[0].text, /Intent: inquiry/)
  assert.match(h.calls[0].text, /Updates consent submitted: No/)
  assert.match(h.calls[0].text, /Consent timestamp \(UTC\): No opt-in submitted/)
  assert.match(h.calls[0].text, /Party size: 2/)
  assert.match(h.calls[0].text, /First line\nSecond line/)
})

test("waitlist requires explicit updates consent and records timestamp in owner notification", async () => {
  const h = harness()
  const response = await h.submit({ intent: "waitlist", name: "Test Birder", email: "visitor@example.com", updates: true })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, status: "accepted", intent: "waitlist" })
  assert.equal(h.calls.length, 1)
  assert.match(h.calls[0].subject, /Waitlist request/)
  assert.match(h.calls[0].text, /Updates consent submitted: Yes/)
  assert.match(h.calls[0].text, /Consent timestamp \(UTC\): \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)
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
  test(`rejects ${label} without requesting email`, async () => {
    const h = harness()
    assert.equal((await h.submit(input)).status, 400)
    assert.equal(h.calls.length, 0)
  })
}

test("rejects unsupported content type", async () => {
  const h = harness()
  assert.equal((await h.submit(validInquiry, { "Content-Type": "text/plain" })).status, 415)
  assert.equal(h.calls.length, 0)
})

test("limits actual UTF-8 bytes without trusting Content-Length", async () => {
  const h = harness()
  assert.equal((await h.submit({ ...validInquiry, message: "é".repeat(17_000) })).status, 413)
  assert.equal(h.calls.length, 0)
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
})

test("rejects invalid UTF-8 instead of silently changing submitted text", async () => {
  const h = harness()
  const response = await h.invoke(new Request("https://example.test/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: new Uint8Array([0xc0]),
  }))
  assert.equal(response.status, 400)
  assert.equal(h.calls.length, 0)
})

for (const [label, env] of [
  ["missing API key", { RESEND_API_KEY: undefined }],
  ["blank API key", { RESEND_API_KEY: " " }],
  ["invalid owner inbox", { CONTACT_EMAIL: "not-an-email" }],
  ["invalid sender address", { CONTACT_FROM: "AVES <not-an-email>" }],
  ["sender header injection", { CONTACT_FROM: "AVES <sender@example.com>\r\nBcc: other@example.com" }],
]) {
  test(`handles ${label} truthfully without sending`, async () => {
    const h = harness(undefined, env)
    assert.equal((await h.submit()).status, 503)
    assert.equal(h.calls.length, 0)
  })
}

for (const [label, result] of [
  ["provider rejection", { data: null, error: { name: "validation_error", message: "private provider details" } }],
  ["missing acceptance ID", { data: {}, error: null }],
  ["transport failure", new Error("private transport details")],
]) {
  test(`${label} never produces false success`, async () => {
    const h = harness(result)
    const response = await h.submit()
    assert.equal(response.status, 502)
    assert.equal(h.calls.length, 1)
    assert.doesNotMatch(await response.text(), /private|success/)
    assert.doesNotMatch(JSON.stringify(h.logs), /private provider|private transport|visitor@example.com/)
  })
}
