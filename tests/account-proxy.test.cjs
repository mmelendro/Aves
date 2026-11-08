const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const { NextRequest } = require('next/server')
const load = require('./helpers/load-ts.cjs')({mocks: {
  '@supabase/ssr': {createServerClient: () => ({auth: {getUser: async () => ({data: {user: null}})}})},
}})
const { middleware } = load('middleware.ts')

test('first root account visit checks the old cookie scope once and preserves the requested trip', async () => {
  const response = await middleware(new NextRequest('https://aves.bio/account?country=colombia&region=llanos'))
  assert.equal(response.status, 307)
  const target = new URL(response.headers.get('location'), 'https://aves.bio')
  assert.equal(target.pathname, '/australia/auth/session')
  assert.equal(target.searchParams.get('next'), '/account?country=colombia&region=llanos')
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
})

test('new session or completed bootstrap stays in the unified app without exposing account data', async () => {
  for (const cookie of ['aves-auth=synthetic', 'aves-auth.0=synthetic', 'aves-session-checked=1']) {
    const response = await middleware(new NextRequest('https://aves.bio/account/sign-in?next=/account', { headers: { cookie, 'x-aves-account-proxy': 'attacker', host: 'untrusted.test' } }))
    assert.equal(response.headers.get('x-middleware-rewrite'), null)
    assert.equal(response.headers.get('location'), null)
    assert.equal(response.headers.get('cache-control'), 'private, no-store')
    assert.match(response.headers.get('x-robots-tag'), /noindex/)
  }
})

test('similar cookie names do not accidentally skip legacy handover', async () => {
  const response = await middleware(new NextRequest('https://aves.bio/account', { headers: { cookie: 'aves-auth-code-verifier=synthetic; aves-authentication=synthetic' } }))
  assert.equal(response.status, 307)
})
