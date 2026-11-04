const assert = require('node:assert/strict')
const { test } = require('node:test')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const { createRequire } = require('node:module')

const source = join(__dirname, '..')
const projectRequire = createRequire(join(source, 'package.json'))
const ts = projectRequire('typescript')
const compiled = ts.transpileModule(readFileSync(join(source, 'lib', 'form-options.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const loaded = { exports: {} }
new Function('module', 'exports', compiled)(loaded, loaded.exports)
const { resolveTourTypePreset } = loaded.exports

const tours = [
  ['adventure', 'Adventure Tours', '🍃 Adventure Tours'],
  ['vision', 'Vision Tours', '🪶 Vision Tours'],
  ['elevate', 'Elevate Tours', '🌼 Elevate Tours'],
  ['souls', 'Souls Tours', '🍓 Souls Tours'],
]

for (const [slug, label, expected] of tours) {
  test(`${label}: real detail-page links preserve the selected tour`, () => {
    const page = readFileSync(join(source, 'app', 'tours', slug, 'page.tsx'), 'utf8')
    const urls = [...page.matchAll(/href="([^\"]*\/shopping\?[^\"]*)"/g)].map(match => new URL(match[1], 'https://aves.bio'))
    assert.ok(urls.length > 0, 'detail page has planning links')
    for (const url of urls) assert.equal(resolveTourTypePreset(url.searchParams.get('preset')), expected)
  })
  test(`${label}: existing recommendation and full-label URLs remain supported`, () => {
    assert.equal(resolveTourTypePreset(label), expected)
    assert.equal(resolveTourTypePreset(expected), expected)
    assert.equal(resolveTourTypePreset(`  ${slug.toUpperCase()}  `), expected)
  })
}

test('unknown or empty presets do not create a false selection', () => {
  for (const value of [null, undefined, '', ' ', 'does-not-exist', '__proto__', 'constructor']) {
    assert.equal(resolveTourTypePreset(value), undefined)
  }
})

test('custom itinerary options retain their exact form value', () => {
  assert.equal(resolveTourTypePreset('Custom Itinerary'), 'Custom Itinerary')
  assert.equal(resolveTourTypePreset('Not sure yet'), 'Not sure yet')
})
