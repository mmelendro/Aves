const { test } = require("node:test")
const assert = require("node:assert/strict")
const { NextRequest } = require("next/server")
const loader = require("./helpers/load-ts.cjs")

test("preview rejects private writes at root and legacy URLs before provider access", async () => {
  let calls = 0
  const load = loader({ env: { VERCEL_ENV: "preview" }, mocks: {
    "@supabase/ssr": { createServerClient() { calls++; throw Error("Must not connect") } },
  } })
  const { middleware } = load("middleware.ts")
  for (const path of ["/api/account/plans", "/api/admin/proposals", "/australia/api/account/plans", "/australia/api/admin/proposals"]) {
    const response = await middleware(new NextRequest(`https://preview.example.test${path}`, { method: "POST" }))
    assert.equal(response.status, 503, path)
    assert.equal(response.headers.get("cache-control"), "private, no-store")
    assert.match(response.headers.get("x-robots-tag"), /noindex/)
  }
  assert.equal(calls, 0)
})

test("preview does not redeem callback codes or email tokens", async () => {
  let calls = 0
  const load = loader({ env: { VERCEL_ENV: "preview" }, mocks: {
    "@/lib/supabase/server": { createClient() { calls++; throw Error("Must not connect") } },
  } })
  for (const route of ["callback", "confirm"]) {
    const response = await load(`app/auth/${route}/route.ts`).GET(new NextRequest(`https://preview.example.test/auth/${route}?code=synthetic&token_hash=synthetic&type=signup`))
    assert.equal(response.status, 303)
    assert.equal(response.headers.get("location"), "/account/sign-in")
  }
  assert.equal(calls, 0)
})
