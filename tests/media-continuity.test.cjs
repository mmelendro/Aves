const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const cache = new Map()
function load(file) {
  if (cache.has(file)) return cache.get(file)
  const result = {}
  cache.set(file, result)
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  new Function('require', 'exports', code)(name => name.startsWith('@/') ? load(name.slice(2) + '.ts') : require(name), result)
  return result
}
const { readMediaHandoff } = load('lib/media-handoff.ts')
const { mediaClientHref } = load('lib/media-navigation.ts')

test('handoff accepts only bounded public resource state and strips all extra fields', () => {
  const state = { version: 1, resourceId: 'mohua-podcast', position: 123.5, muted: true, savedAt: 1000 }
  assert.deepEqual(readMediaHandoff(JSON.stringify({ ...state, account: 'discard', src: 'https://untrusted.invalid', playing: true }), 2000), state)
  assert.equal(readMediaHandoff(JSON.stringify({ ...state, resourceId: 'kiwi-diaries' }), 2000).resourceId, 'kiwi-diaries')
  for (const changes of [{version:2}, {resourceId:'kea-reading'}, {resourceId:'unknown'}, {position:-1}, {position:604801}, {position:'12'}, {muted:'true'}, {savedAt:2001}, {savedAt:0}]) {
    const now = changes.savedAt === 0 ? 21600001 : 2000
    assert.equal(readMediaHandoff(JSON.stringify({...state, ...changes}), now), null, JSON.stringify(changes))
  }
  for (const raw of [null, '', '{bad', '[]', 'null', '42']) assert.equal(readMediaHandoff(raw), null)
})

test('only known same-app public routes receive client navigation', () => {
  const paths = ['/', '/colombia', '/regions/pacific', '/new-zealand/south-island']
  const current = 'https://aves.bio/new-zealand/south-island'
  assert.equal(mediaClientHref('/colombia', current, paths), '/colombia')
  assert.equal(mediaClientHref('https://aves.bio/regions/pacific?lang=es#birds', current, paths), '/regions/pacific?lang=es#birds')
  assert.equal(mediaClientHref('/colombia/', current, paths), '/colombia/')
  assert.equal(mediaClientHref('/#destinations', current, paths), '/#destinations')
  for (const href of ['#resources', current, '/account', '/auth/callback', '/api/test', '/australia', '/unknown', 'https://example.org/colombia', 'javascript:alert(1)', 'https://user:password@aves.bio/colombia']) assert.equal(mediaClientHref(href, current, paths), null, href)
  assert.equal(mediaClientHref('/australia/regions/victoria#birds', 'https://aves.bio/australia', ['/australia', '/australia/regions/victoria'], '/australia'), '/regions/victoria#birds')
  assert.equal(mediaClientHref('/account', 'https://aves.bio/australia', ['/australia'], '/australia'), null)
})
