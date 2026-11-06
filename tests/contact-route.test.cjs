// Isolated route tests: real validation/NextResponse, stubbed email transport.
// These tests never import Resend or send email, and never use real credentials.
const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const { createRequire } = require("node:module")

const sourceRoot = resolve(__dirname, "..")
const sourceRequire = createRequire(resolve(sourceRoot, "package.json"))
const ts = sourceRequire("typescript")
const nextServer = sourceRequire("next/server")
const zod = sourceRequire("zod")
const compiled = ts.transpileModule(readFileSync(resolve(sourceRoot, "app/api/contact/route.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText

const validInquiry = {
  firstName: "  Test  ", lastName: "Birder", email: "visitor@example.com",
  travelDate: "2026-12-10", tourTypes: ["adventure"], regions: ["western-andes"],
  message: "First line\nSecond line",
}
const accepted = (id) => ({ data: { id }, error: null })

function harness(outcomes = [accepted("primary")], environment = {}) {
  const calls = [], logs = [], exports = {}
  class FakeResend {
    constructor(key) {
      assert.equal(typeof key, "string")
      this.emails = {
        send: async (payload) => {
          calls.push(payload)
          const outcome = outcomes.shift()
          if (outcome instanceof Error) throw outcome
          if (outcome === undefined) throw new Error("Unexpected email request")
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
    calls, logs,
    submit: (body = validInquiry, headers = { "Content-Type": "application/json" }) =>
      exports.POST(new Request("https://example.test/api/contact", {
        method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body),
      })),
  }
}

test("valid inquiry is normalized and accepted only for the AVES inbox", async () => {
  const h = harness()
  const response = await h.submit()
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.deepEqual(await response.json(), { success: true, status: "accepted" })
  assert.equal(h.calls.length, 1)
  assert.equal(h.calls[0].to, "mmelendro@gmail.com")
  assert.equal(h.calls[0].replyTo, "visitor@example.com")
  assert.equal(h.calls[0].subject, "Tour Inquiry from Test Birder")
  assert.match(h.calls[0].text, /First line\nSecond line/)
  assert.ok(h.calls.every(call => call.to !== validInquiry.email))
})

test("configured inbox is respected", async () => {
  const h = harness(undefined, { CONTACT_EMAIL: "  team@example.com  " })
  assert.equal((await h.submit()).status, 200)
  assert.equal(h.calls[0].to, "team@example.com")
})

for (const [label, input] of [
  ["malformed JSON", "{"],
  ["null body", null],
  ["array body", []],
  ["missing name", { ...validInquiry, firstName: undefined }],
  ["blank name", { ...validInquiry, firstName: "  " }],
  ["invalid email", { ...validInquiry, email: "not-an-email" }],
  ["wrong field type", { ...validInquiry, phone: {} }],
  ["header newline", { ...validInquiry, lastName: "Birder\nInjected" }],
  ["invalid calendar date", { ...validInquiry, travelDate: "2026-02-30" }],
  ["long message", { ...validInquiry, message: "a".repeat(5001) }],
  ["too many regions", { ...validInquiry, regions: Array(21).fill("western-andes") }],
  ["non-array selections", { ...validInquiry, tourTypes: "adventure" }],
]) {
  test(`rejects ${label} without calling the email provider`, async () => {
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

test("rejects oversized JSON even without Content-Length", async () => {
  const h = harness()
  assert.equal((await h.submit({ ...validInquiry, message: "a".repeat(33_000) })).status, 413)
  assert.equal(h.calls.length, 0)
})

for (const [label, env] of [
  ["missing API key", { RESEND_API_KEY: undefined }],
  ["blank API key", { RESEND_API_KEY: " " }],
  ["invalid configured inbox", { CONTACT_EMAIL: "not-an-email" }],
]) {
  test(`handles ${label} without calling the provider`, async () => {
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
  test(`${label} fails the inquiry without claiming success`, async () => {
    const h = harness([result])
    const response = await h.submit()
    assert.equal(response.status, 502)
    assert.equal(h.calls.length, 1)
    assert.doesNotMatch(await response.text(), /private|success/)
    assert.doesNotMatch(JSON.stringify(h.logs), /private provider|private transport|visitor@example.com/)
  })
}

for (const origin of [
  "https://attacker.test", "https://aves.bio.attacker.test", "https://aves.bio@attacker.test",
  "http://aves.bio", "null", "", "https://aves.bio/path", "https://aves.bio/",
  "https://user:password@aves.bio", "https://aves.bio https://attacker.test", "file://",
]) {
  test("rejects untrusted or malformed Origin: " + JSON.stringify(origin), async () => {
    const h = harness()
    const response = await h.submit(validInquiry, { "Content-Type": "application/json", Origin: origin })
    assert.equal(response.status, 403)
    assert.equal(response.headers.get("cache-control"), "no-store")
    assert.equal(h.calls.length, 0)
  })
}

test("accepts the request origin and the configured public origin behind a reverse proxy", async () => {
  for (const origin of ["https://example.test", "https://aves.bio"]) {
    const h = harness(undefined, { NEXT_PUBLIC_SITE_URL: "https://aves.bio" })
    assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", Origin: origin, "Sec-Fetch-Site": "same-origin" })).status, 200)
    assert.equal(h.calls.length, 1)
  }
})

test("rejects explicit cross-site browser requests even with a missing or trusted Origin", async () => {
  for (const headers of [{}, { Origin: "https://aves.bio" }]) {
    const h = harness()
    assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", "Sec-Fetch-Site": "cross-site", ...headers })).status, 403)
    assert.equal(h.calls.length, 0)
  }
})

test("invalid optional site configuration never permits an unrelated Origin", async () => {
  const h = harness(undefined, { NEXT_PUBLIC_SITE_URL: "not-a-url" })
  assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", Origin: "https://attacker.test" })).status, 403)
  assert.equal(h.calls.length, 0)
  assert.equal((await h.submit(validInquiry, { "Content-Type": "application/json", Origin: "https://example.test" })).status, 200)
})

test("a visitor-supplied destination cannot redirect the owner notification or trigger a visitor email", async () => {
  const h = harness()
  const response = await h.submit({ ...validInquiry, email: "unverified@example.test", to: "unverified@example.test", contactEmail: "unverified@example.test" })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, status: "accepted" })
  assert.equal(h.calls.length, 1)
  assert.equal(h.calls[0].to, "mmelendro@gmail.com")
  assert.equal(h.calls[0].replyTo, "unverified@example.test")
})

test("the contact form does not depend on the removed confirmation response field", () => {
  const component = readFileSync(resolve(sourceRoot, "components/contact-form-section.tsx"), "utf8")
  assert.doesNotMatch(component, /confirmationAccepted/)
  assert.match(component, /Your enquiry has been submitted to AVES/)
})
