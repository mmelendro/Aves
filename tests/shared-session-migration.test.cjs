const { test } = require("node:test")
const assert = require("node:assert/strict")
const { NextRequest } = require("next/server")
const loader = require("./helpers/load-ts.cjs")

const verified = { id: "19603428-6cb3-4c05-b280-d873ea13d9a4", email: "client@example.test", email_confirmed_at: "2026-11-05T00:00:00Z" }
function setup({ result = { data: { user: verified }, error: null }, refresh = [], failure = false } = {}) {
  const calls = []
  const load = loader({ env: { NODE_ENV: "production", NEXT_PUBLIC_SUPABASE_URL: "https://project.example.test", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_synthetic_only" }, mocks: {
    "@supabase/ssr": { createServerClient: (_url, _key, options) => {
      calls.push(options)
      return { auth: { getUser: async () => {
        if (failure) throw new Error("private provider failure")
        if (refresh.length) options.cookies.setAll(refresh)
        return result
      } } }
    } },
  } })
  return { calls, load, migrate: load("lib/supabase/session-migration.ts").migrateLegacySessionCookies }
}

test("verified legacy chunks migrate to a distinct root session and old chunks expire", async () => {
  const { migrate, calls } = setup()
  const result = await migrate([{ name: "aves-au-auth.0", value: "synthetic-one" }, { name: "aves-au-auth.1", value: "synthetic-two" }, { name: "unrelated", value: "private-unrelated" }])
  assert.equal(result.migrated, true)
  assert.equal(calls[0].cookieOptions.path, "/australia")
  const roots = result.cookies.filter(cookie => cookie.options.path === "/")
  assert.deepEqual(roots.map(cookie => [cookie.name, cookie.value]), [["aves-auth.0", "synthetic-one"], ["aves-auth.1", "synthetic-two"]])
  assert.ok(roots.every(cookie => cookie.options.secure && cookie.options.sameSite === "lax" && cookie.options.maxAge > 0 && !cookie.options.domain))
  assert.deepEqual(result.cookies.filter(cookie => cookie.options.maxAge === 0).map(cookie => [cookie.name, cookie.options.path]), [["aves-au-auth.0", "/australia"], ["aves-au-auth.1", "/australia"]])
  assert.doesNotMatch(JSON.stringify(result), /private-unrelated/)
})

test("migration copies refreshed cookies and discards obsolete chunk boundaries", async () => {
  const { migrate } = setup({ refresh: [
    { name: "aves-au-auth.0", value: "", options: { maxAge: 0 } },
    { name: "aves-au-auth.1", value: "", options: { maxAge: 0 } },
    { name: "aves-au-auth", value: "synthetic-refreshed", options: { maxAge: 100 } },
  ] })
  const result = await migrate([{ name: "aves-au-auth.0", value: "old-first" }, { name: "aves-au-auth.1", value: "old-second" }])
  assert.deepEqual(result.cookies.filter(cookie => cookie.options.path === "/").map(cookie => [cookie.name, cookie.value]), [["aves-auth", "synthetic-refreshed"]])
  assert.equal(result.cookies.filter(cookie => cookie.options.maxAge === 0).length, 3)
})

for (const [name, result] of [
  ["revoked", { data: { user: verified }, error: { message: "private" } }],
  ["missing", { data: { user: null }, error: null }],
  ["unconfirmed", { data: { user: { ...verified, email_confirmed_at: null } }, error: null }],
  ["anonymous", { data: { user: { ...verified, is_anonymous: true } }, error: null }],
]) test(`${name} legacy user cannot create a shared session`, async () => {
  const migration = await setup({ result }).migrate([{ name: "aves-au-auth", value: "synthetic" }])
  assert.equal(migration.migrated, false)
  assert.deepEqual(migration.cookies, [])
})

test("transient verification failure preserves the old cookie without authorizing it", async () => {
  assert.deepEqual(await setup({ failure: true }).migrate([{ name: "aves-au-auth", value: "synthetic" }]), { cookies: [], migrated: false })
})

test("a newer shared session wins without reauthenticating or overwriting it", async () => {
  const { migrate, calls } = setup()
  const result = await migrate([{ name: "aves-auth.0", value: "new-session" }, { name: "aves-au-auth", value: "old-session" }])
  assert.equal(calls.length, 0)
  assert.equal(result.migrated, false)
  assert.equal(result.cookies.length, 1)
  assert.equal(result.cookies[0].name, "aves-au-auth")
  assert.equal(result.cookies[0].options.maxAge, 0)
})

test("pending legacy PKCE verifier migrates without granting a session and cannot replace a new verifier", async () => {
  const { migrate, calls } = setup()
  const result = await migrate([{ name: "aves-au-auth-code-verifier", value: "synthetic-pkce" }])
  assert.equal(calls.length, 0)
  assert.equal(result.migrated, false)
  assert.equal(result.cookies[0].name, "aves-auth-code-verifier")
  assert.equal(result.cookies[0].options.maxAge, 3600)
  const newer = await migrate([{ name: "aves-auth-code-verifier", value: "new-pkce" }, { name: "aves-au-auth-code-verifier", value: "old-pkce" }])
  assert.deepEqual(newer.cookies, [])
})

test("unrelated or oversized cookies are ignored before contacting Supabase", async () => {
  const { migrate, calls } = setup()
  for (const cookies of [[], [{ name: "aves-au-auth-attacker", value: "synthetic" }], [{ name: "aves-au-auth", value: "x".repeat(4097) }]]) {
    assert.deepEqual(await migrate(cookies), { cookies: [], migrated: false })
  }
  assert.equal(calls.length, 0)
})

test("bootstrap redirects privately with an HttpOnly non-auth guard and never reflects tokens", async () => {
  const { load } = setup()
  const request = new NextRequest("https://proxy.example.test/australia/auth/session?next=https://attacker.test&token=private-token", { headers: { cookie: "aves-au-auth=synthetic-only" } })
  const response = await load("app/auth/session/route.ts").GET(request)
  assert.equal(response.status, 303)
  assert.equal(response.headers.get("location"), "/account")
  assert.equal(response.headers.get("cache-control"), "private, no-store")
  assert.match(response.headers.get("x-robots-tag"), /noindex/)
  assert.equal(response.cookies.get("aves-auth").path, "/")
  const guard = response.cookies.get("aves-session-checked")
  assert.equal(guard.httpOnly, true)
  assert.equal(guard.secure, true)
  assert.equal(guard.maxAge, 300)
  assert.equal(await response.text(), "")
  assert.doesNotMatch(response.headers.get("location"), /attacker|private-token|synthetic/)
})

test("bootstrap preserves a sign-in screen's encoded trip-return query", async () => {
  const { load } = setup()
  const next = "/account?country=colombia&region=central-andes"
  const signIn = `/account/sign-in?${new URLSearchParams({ next })}`
  const request = new NextRequest(`https://aves.bio/australia/auth/session?${new URLSearchParams({ next: signIn })}`)
  const response = await load("app/auth/session/route.ts").GET(request)
  assert.equal(response.headers.get("location"), signIn)
  const redirected = new URL(response.headers.get("location"), "https://aves.bio")
  assert.equal(redirected.pathname, "/account/sign-in")
  assert.equal(load("components/account/account-navigation.ts").accountNextFromSearch(Object.fromEntries(redirected.searchParams)), next)
})

test("bootstrap rejects encoded path separators and traversal while inner return values remain validated", async () => {
  const { load } = setup()
  const route = load("app/auth/session/route.ts")
  for (const next of ["/account%2f..%2foutside", "/account/%2e%2e/%2e%2e/outside", "/%2f%2fattacker.test", "/account%252foutside"]) {
    const response = await route.GET(new NextRequest(`https://aves.bio/australia/auth/session?${new URLSearchParams({ next })}`))
    assert.equal(response.headers.get("location"), "/account", next)
  }
  for (const next of ["https://attacker.test/collect", "//attacker.test", "/account/%2e%2e/outside", "/account\nX:bad"]) {
    const screen = `/account/sign-in?${new URLSearchParams({ next })}`
    const response = await route.GET(new NextRequest(`https://aves.bio/australia/auth/session?${new URLSearchParams({ next: screen })}`))
    const redirected = new URL(response.headers.get("location"), "https://aves.bio")
    assert.equal(redirected.origin, "https://aves.bio")
    assert.equal(redirected.pathname, "/account/sign-in")
    assert.equal(load("components/account/account-navigation.ts").accountNextFromSearch(Object.fromEntries(redirected.searchParams)), "/account")
  }
})
