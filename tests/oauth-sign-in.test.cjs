const { test } = require("node:test")
const assert = require("node:assert/strict")
const { NextRequest } = require("next/server")
const loader = require("./helpers/load-ts.cjs")

test("OAuth provider allowlist is disabled by default and rejects unsupported providers", () => {
  for (const value of [undefined, "", " ", "apple,github,*", "GOOGLE"]) {
    const load = loader({ env: { AVES_OAUTH_PROVIDERS: value } })
    assert.deepEqual(load("lib/oauth-providers.ts").configuredOAuthProviders(), [])
  }
  for (const [value, expected] of [["google", ["google"]], ["facebook", ["facebook"]], [" facebook,google,google,apple ", ["google", "facebook"]]]) {
    const load = loader({ env: { AVES_OAUTH_PROVIDERS: value } })
    assert.deepEqual(load("lib/oauth-providers.ts").configuredOAuthProviders(), expected)
  }
})

function callback(params, exchange = async () => ({ error: null })) {
  const calls = []
  const load = loader({ mocks: { "@/lib/supabase/server": { createClient: async () => ({ auth: { exchangeCodeForSession: async code => { calls.push(code); return exchange() } } }) } } })
  return { calls, run: () => load("app/auth/callback/route.ts").GET(new NextRequest(`https://proxy.example.test/australia/auth/callback?${new URLSearchParams(params)}`)) }
}

for (const next of ["/account?country=colombia&region=pacific", "/australia/account?country=australia&region=queensland"]) {
  test(`OAuth callback preserves a safe trip destination: ${next}`, async () => {
    const route = callback({ flow: "oauth", code: "synthetic-only", next })
    const response = await route.run()
    assert.deepEqual(route.calls, ["synthetic-only"])
    assert.equal(response.status, 303)
    assert.equal(response.headers.get("location"), next.startsWith("/australia/") ? next : `/australia${next}`)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
    assert.doesNotMatch(response.headers.get("location"), /synthetic|proxy/)
  })
}

test("OAuth success cannot redirect to an offsite or traversed destination", async () => {
  for (const next of ["https://attacker.test", "//attacker.test", "/%2f%2fattacker.test", "/account/../../outside"]) {
    const response = await callback({ flow: "oauth", code: "synthetic-only", next }).run()
    assert.equal(response.headers.get("location"), "/australia/account")
  }
})

for (const [params, expected] of [
  [{ error: "access_denied", code: "must-not-exchange" }, "oauth-cancelled"],
  [{ error_code: "access_denied" }, "oauth-cancelled"],
  [{ error: "server_error", error_description: "private-provider-details" }, "oauth"],
  [{}, "oauth"],
]) {
  test(`OAuth failure is friendly and sanitized: ${JSON.stringify(params)}`, async () => {
    const route = callback({ flow: "oauth", next: "/account?country=colombia&region=llanos", ...params })
    const response = await route.run()
    const location = response.headers.get("location")
    const parsed = new URL(location, "https://aves.bio")
    assert.equal(parsed.pathname, "/australia/account/sign-in")
    assert.equal(parsed.searchParams.get("error"), expected)
    assert.equal(parsed.searchParams.get("next"), "/australia/account?country=colombia&region=llanos")
    assert.ok(location.endsWith("#"), "clear any original provider error fragment")
    assert.doesNotMatch(location, /private-provider|must-not-exchange|error_description/)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
    assert.equal(route.calls.length, 0)
  })
}

test("OAuth code rejection and transport failure preserve only a sanitized retry destination", async () => {
  for (const exchange of [async () => ({ error: { message: "private-exchange-details" } }), async () => { throw new Error("private-transport-details") }]) {
    const response = await callback({ flow: "oauth", code: "private-code", next: "//attacker.test" }, exchange).run()
    const location = response.headers.get("location")
    const params = new URL(location, "https://aves.bio").searchParams
    assert.equal(params.get("error"), "oauth")
    assert.equal(params.get("next"), "/australia/account")
    assert.doesNotMatch(location, /private|attacker/)
  }
})

test("email confirmation failure retains its existing message route", async () => {
  const response = await callback({ next: "/account" }).run()
  assert.equal(response.headers.get("location"), "/australia/account/sign-in?error=confirmation")
})
