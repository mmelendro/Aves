const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

test('browser-shared Supabase module never reads or initializes privileged credentials', () => {
  const filename = path.resolve(__dirname, '../lib/supabase-client.ts')
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
  }).outputText
  const env = new Proxy({
    NEXT_PUBLIC_SUPABASE_URL: 'https://synthetic.example.invalid',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'synthetic-public-key',
  }, {
    get(target, name) {
      assert.ok(Object.hasOwn(target, name), `Client module attempted to read non-public configuration: ${String(name)}`)
      return target[name]
    },
  })
  const calls = []
  const publicClient = { synthetic: true }
  const mod = {exports: {}}
  new Function('require', 'module', 'exports', 'process', code)(name => {
    assert.equal(name, '@supabase/supabase-js')
    return { createClient(url, key, options) { calls.push({url, key, options}); return publicClient } }
  }, mod, mod.exports, {env})
  assert.equal(calls.length, 1)
  assert.equal(calls[0].key, 'synthetic-public-key')
  assert.deepEqual(calls[0].options.auth, {autoRefreshToken:true, persistSession:true, detectSessionInUrl:true})
  assert.equal(mod.exports.supabase, publicClient)
  assert.equal('supabaseServer' in mod.exports, false)
  assert.equal('getSupabaseServer' in mod.exports, false)
})
