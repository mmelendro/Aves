const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function loadPage(authResult) {
  const filename = path.resolve(__dirname, '../app/account/settings/page.tsx')
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const calls = []
  const query = {
    select(value) { calls.push(['select', value]); return this },
    eq(key, value) { calls.push(['eq', key, value]); return this },
    async single() { return { data: { first_name: 'Synthetic' } } },
  }
  const client = {
    auth: {
      async getUser() { calls.push(['getUser']); return authResult },
      getSession() { throw new Error('An unverified session must never authorize profile access') },
    },
    from(table) { calls.push(['from', table]); return query },
  }
  const jsx = (type, props) => ({ type, props })
  const mocks = {
    'next/navigation': { redirect(url) { const error = new Error('redirect'); error.url = url; throw error } },
    '@supabase/auth-helpers-nextjs': { createServerComponentClient: () => client },
    'next/headers': { cookies: () => ({}) },
    './AccountSettingsClient': { default: 'SettingsClient' },
    'react/jsx-runtime': { jsx, jsxs: jsx },
  }
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => {
    if (!(name in mocks)) throw new Error(`Unexpected dependency: ${name}`)
    return mocks[name]
  }, mod, mod.exports)
  return { render: mod.exports.default, calls }
}

test('account settings redirects an unauthenticated visitor without querying profiles', async () => {
  const { render, calls } = loadPage({ data: { user: null }, error: null })
  await assert.rejects(render, error => error.url === '/auth/login?redirect=/account/settings')
  assert.deepEqual(calls, [['getUser']])
})

test('account settings rejects a failed verification even if a user object is present', async () => {
  const { render, calls } = loadPage({ data: { user: { id: 'untrusted' } }, error: new Error('invalid token') })
  await assert.rejects(render, error => error.url === '/auth/login?redirect=/account/settings')
  assert.deepEqual(calls, [['getUser']])
})

test('account settings queries only the verified user profile', async () => {
  const { render, calls } = loadPage({ data: { user: { id: 'verified-user', email: 'synthetic@example.invalid' } }, error: null })
  await render()
  assert.deepEqual(calls, [['getUser'], ['from', 'user_profiles'], ['select', '*'], ['eq', 'user_id', 'verified-user']])
})
