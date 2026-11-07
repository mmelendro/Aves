const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const { NextRequest } = require('next/server')
const source = fs.readFileSync(require('node:path').join(__dirname, '../middleware.ts'), 'utf8')
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const loaded = { exports: {} }
new Function('require', 'module', 'exports', output)(require, loaded, loaded.exports)
const { middleware } = loaded.exports

test('first root account visit checks the old cookie scope once and preserves the requested trip', () => {
  const response = middleware(new NextRequest('https://aves.bio/account?country=colombia&region=llanos'))
  assert.equal(response.status, 307)
  const target = new URL(response.headers.get('location'), 'https://aves.bio')
  assert.equal(target.pathname, '/australia/auth/session')
  assert.equal(target.searchParams.get('next'), '/account?country=colombia&region=llanos')
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
})

test('new session or completed bootstrap uses only the fixed upstream without exposing account data', () => {
  for (const cookie of ['aves-auth=synthetic', 'aves-auth.0=synthetic', 'aves-session-checked=1']) {
    const response = middleware(new NextRequest('https://aves.bio/account/sign-in?next=/account', { headers: { cookie, 'x-aves-account-proxy': 'attacker', host: 'untrusted.test' } }))
    assert.equal(response.headers.get('x-middleware-rewrite'), 'https://aves-australia.vercel.app/australia/account/sign-in?next=/account')
    assert.equal(response.headers.get('x-middleware-request-x-aves-account-proxy'), '1')
    assert.equal(response.headers.get('cache-control'), 'private, no-store')
    assert.match(response.headers.get('x-robots-tag'), /noindex/)
  }
})

test('similar cookie names do not accidentally skip legacy handover', () => {
  const response = middleware(new NextRequest('https://aves.bio/account', { headers: { cookie: 'aves-auth-code-verifier=synthetic; aves-authentication=synthetic' } }))
  assert.equal(response.status, 307)
})
