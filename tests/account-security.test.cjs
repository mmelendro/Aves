const { test } = require("node:test")
const assert = require("node:assert/strict")
const loader = require("./helpers/load-ts.cjs")
const { NextRequest } = require("next/server")
const userId = "19603428-6cb3-4c05-b280-d873ea13d9a4"
const verified = { id: userId, email: "verified@example.test", email_confirmed_at: "2026-11-05T00:00:00Z" }

for (const [label, result, expected] of [
  ["forged session without server user", { data: { user: null }, error: null }, 401],
  ["revoked session", { data: { user: verified }, error: { message: "private authentication error" } }, 401],
  ["unconfirmed email", { data: { user: { ...verified, email_confirmed_at: null } }, error: null }, 403],
  ["anonymous sign-in", { data: { user: { ...verified, is_anonymous: true } }, error: null }, 403],
]) {
  test(`${label} cannot authorize account access`, async () => {
    let calls = 0
    const client = { auth: { getUser: async () => { calls++; return result }, getSession: () => { throw new Error("Must not authorize by getSession") } } }
    const load = loader({ mocks: { "@/lib/supabase/server": { createClient: async () => client } } })
    await assert.rejects(() => load("lib/account-auth.ts").requireAccountUser(), error => error.status === expected && !error.message.includes("private"))
    assert.equal(calls, 1)
  })
}

test("authorization returns the fresh verified user, not editable metadata identity", async () => {
  const user = { ...verified, user_metadata: { id: "forged", role: "owner" } }
  const client = { auth: { getUser: async () => ({ data: { user }, error: null }) } }
  const load = loader({ mocks: { "@/lib/supabase/server": { createClient: async () => client } } })
  const result = await load("lib/account-auth.ts").requireAccountUser()
  assert.equal(result.user.id, userId)
  assert.equal(result.client, client)
})

test("auth transport/configuration errors fail closed without exposing details", async () => {
  for (const createClient of [async () => { throw new Error("private config") }, async () => ({ auth: { getUser: async () => { throw new Error("private transport") } } })]) {
    const load = loader({ mocks: { "@/lib/supabase/server": { createClient } } })
    await assert.rejects(() => load("lib/account-auth.ts").requireAccountUser(), error => error.status === 503 && !error.message.includes("private"))
  }
})

test("auth redirects allow only internal account/admin destinations with a single base path", () => {
  const { safeAuthNext } = loader()("lib/auth-redirect.ts")
  assert.equal(safeAuthNext("/account/reset-password"), "/australia/account/reset-password")
  assert.equal(safeAuthNext("/australia/account"), "/australia/account")
  assert.equal(safeAuthNext("/admin/quotes"), "/australia/admin/quotes")
  for (const input of [null, "https://attacker.test", "//attacker.test", "/\\attacker.test", "/%2f%2fattacker.test", "/account/../../outside", "/australia/accountant", "/contact", "/account\nX:bad"]) {
    assert.equal(safeAuthNext(input), "/australia/account", String(input))
  }
})

test("PKCE callback strips credentials and uses a relative redirect on a proxy origin", async () => {
  const calls = []
  const load = loader({ mocks: { "@/lib/supabase/server": { createClient: async () => ({ auth: { exchangeCodeForSession: async code => { calls.push(code); return { error: null } } } }) } } })
  const response = await load("app/auth/callback/route.ts").GET(new NextRequest("https://backend.example.test/australia/auth/callback?code=synthetic-code&next=/account/reset-password"))
  assert.deepEqual(calls, ["synthetic-code"])
  assert.equal(response.status, 303)
  assert.equal(response.headers.get("location"), "/australia/account/reset-password")
  assert.equal(response.headers.get("cache-control"), "private, no-store")
})

test("invalid auth confirmation neither exchanges arbitrary token types nor reflects tokens", async () => {
  const calls = []
  const load = loader({ mocks: { "@/lib/supabase/server": { createClient: async () => ({ auth: { verifyOtp: async data => { calls.push(data); return { error: null } } } }) } } })
  const route = load("app/auth/confirm/route.ts")
  const invalid = await route.GET(new NextRequest("https://aves.bio/australia/auth/confirm?token_hash=private-token&type=invite&next=//attacker.test"))
  assert.equal(calls.length, 0)
  assert.equal(invalid.headers.get("location"), "/australia/account/sign-in?error=confirmation")
  const recovery = await route.GET(new NextRequest("https://aves.bio/australia/auth/confirm?token_hash=synthetic-token&type=recovery&next=/admin/quotes"))
  assert.deepEqual(calls, [{ token_hash: "synthetic-token", type: "recovery" }])
  assert.equal(recovery.headers.get("location"), "/australia/account/reset-password")
})

test("middleware refreshes verified sessions while preserving private cache headers and AU cookie path", async () => {
  let options
  const load = loader({ env: { NODE_ENV: "production", NEXT_PUBLIC_SUPABASE_URL: "https://project.example.test", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_synthetic_only" }, mocks: {
    "@supabase/ssr": { createServerClient: (_url, _key, supplied) => {
      options = supplied
      return { auth: { getUser: async () => { supplied.cookies.setAll([{ name: "aves-au-auth", value: "synthetic", options: { path: "/" } }], { "Cache-Control": "private, no-store", Pragma: "no-cache" }); return { data: { user: verified }, error: null } } } }
    } },
  } })
  const response = await load("middleware.ts").middleware(new NextRequest("https://aves.bio/australia/account"))
  assert.equal(options.cookieOptions.path, "/australia")
  assert.equal(options.cookieOptions.name, "aves-au-auth")
  assert.equal(options.cookieOptions.secure, true)
  assert.equal(response.cookies.get("aves-au-auth").path, "/australia")
  assert.equal(response.headers.get("cache-control"), "private, no-store")
  assert.equal(response.headers.get("pragma"), "no-cache")
})

test("private RPC uses only modern apikey and has no redirect/cache plus bounded timeout", async () => {
  const calls = []
  const load = loader({ env: { SUPABASE_URL: "https://project.example.test", SUPABASE_SECRET_KEY: "sb_secret_synthetic_only" }, globals: {
    fetch: async (url, options) => { calls.push({ url, options }); return new Response("true") },
  } })
  assert.equal(await load("lib/account-service.ts").accountRpc("account_admin_status", { p_user_id: userId }), true)
  assert.equal(calls[0].url, "https://project.example.test/rest/v1/rpc/account_admin_status")
  assert.equal(calls[0].options.headers.apikey, "sb_secret_synthetic_only")
  assert.equal(calls[0].options.headers.Authorization, undefined)
  assert.equal(calls[0].options.cache, "no-store")
  assert.equal(calls[0].options.redirect, "error")
  assert.ok(calls[0].options.signal instanceof AbortSignal)
})

for (const [code, expected] of [["PT403", 403], ["PT404", 404], ["PT409", 409], ["PT429", 429], ["XX000", 503]]) {
  test(`privileged RPC ${code} is safely mapped without private error exposure`, async () => {
    const load = loader({ env: { SUPABASE_URL: "https://project.example.test", SUPABASE_SECRET_KEY: "sb_secret_synthetic_only" }, globals: { fetch: async () => new Response(JSON.stringify({ code, message: "private error or credential" }), { status: 400 }) } })
    await assert.rejects(() => load("lib/account-service.ts").accountRpc("submit_quote_request", {}), error => error.status === expected && !error.message.includes("private"))
  })
}

for (const [label, outcome, expected] of [
  ["accepted", { data: { id: "provider-test" }, error: null }, "accepted"],
  ["rejected", { data: null, error: { message: "private provider details" } }, "failed"],
  ["transport failure", new Error("private transport"), "failed"],
]) {
  test(`proposal notification ${label} records separate status and stable provider idempotency`, async () => {
    const sent = [], records = []
    const load = loader({ env: { RESEND_API_KEY: "synthetic-only" }, mocks: {
      resend: { Resend: class { constructor() { this.emails = { send: async (...args) => { sent.push(args); if (outcome instanceof Error) throw outcome; return outcome } } } } },
      "@/lib/account-service": { accountRpc: async (...args) => { records.push(args) } },
    } })
    const status = await load("lib/account-notifications.ts").notifyAccount("proposal", userId, "client@example.test", "Test", "Test only")
    assert.equal(status, expected)
    assert.deepEqual(sent[0][1], { idempotencyKey: `proposal/${userId}` })
    assert.equal(sent[0][0].replyTo, "mmelendro@gmail.com")
    assert.equal(records[0][0], "record_proposal_notification")
    assert.equal(records[0][1].p_status, expected)
    assert.equal(records[0][1].p_proposal_id, userId)
    assert.doesNotMatch(JSON.stringify(records), /private provider|private transport/)
  })
}

test("missing email configuration records failure without throwing or calling Resend", async () => {
  const records = []
  const load = loader({ mocks: {
    resend: { Resend: class { constructor() { throw new Error("Must not send") } } },
    "@/lib/account-service": { accountRpc: async (...args) => { records.push(args); throw new Error("unavailable") } },
  } })
  await load("lib/account-notifications.ts").notifyAccount("quote", userId, "owner@example.test", "Test", "Test only")
  assert.equal(records[0][1].p_status, "failed")
  assert.equal(records[0][1].p_error_code, "email_configuration_missing")
})

test("local origin validation handles Next's localhost normalization without opening remote origins", () => {
  const { requireSameOrigin } = loader()("lib/account-http.ts")
  const local = origin => new Request("http://localhost:3000/australia/api/account/plans", { headers: { Origin: origin } })
  assert.doesNotThrow(() => requireSameOrigin(local("http://127.0.0.1:3000")))
  assert.doesNotThrow(() => requireSameOrigin(local("http://[::1]:3000")))
  for (const origin of ["http://127.0.0.1:4000", "https://127.0.0.1:3000", "http://attacker.test:3000", "null", "http://localhost:3000/extra"]) {
    assert.throws(() => requireSameOrigin(local(origin)), error => error.status === 403)
  }
  assert.throws(() => requireSameOrigin(new Request("https://aves.bio/australia/api/account/plans", { headers: { Origin: "http://127.0.0.1:3000" } })), error => error.status === 403)
  assert.throws(() => requireSameOrigin(new Request("http://localhost:3000/australia/api/account/plans", { headers: { Origin: "http://127.0.0.1:3000", "Sec-Fetch-Site": "cross-site" } })), error => error.status === 403)
})
