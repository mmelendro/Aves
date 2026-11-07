const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')
function load(file, mocks = {}) {
  const filename = path.resolve(root, file)
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX},
  }).outputText
  const mod = {exports: {}}
  new Function('require', 'module', 'exports', code)(name => {
    if (Object.hasOwn(mocks, name)) return mocks[name]
    if (name.startsWith('./')) return load(path.relative(root, path.resolve(path.dirname(filename), name + '.ts')))
    if (name.startsWith('@/lib/')) return load(name.slice(2) + '.ts')
    throw new Error(`Unexpected dependency: ${name}`)
  }, mod, mod.exports)
  return mod.exports
}
const shared = load('lib/shared-account.ts')
const {colombiaMapRegions} = load('lib/region-links.ts')
const redirection = {redirect(url) {throw Object.assign(new Error('redirect'), {url})}}

for (const [file, expected] of [
  ['app/auth/login/page.tsx', shared.sharedSignInHref()],
  ['app/auth/signup/page.tsx', shared.sharedSignInHref('sign-up')],
  ['app/dashboard/page.tsx', shared.sharedAccountHref()],
  ['app/dashboard/[...legacy]/page.tsx', shared.sharedAccountHref()],
  ['app/account/page.tsx', shared.sharedAccountHref()],
  ['app/account/settings/page.tsx', shared.sharedAccountHref()],
  ['app/account/[...legacy]/page.tsx', shared.sharedAccountHref()],
]) {
  test(`${file} redirects to the one shared account without database access`, () => {
    const {default: Page} = load(file, {'next/navigation': redirection})
    assert.throws(() => Page({searchParams: {redirect: 'https://attacker.invalid', next: '//attacker.invalid'}}), error => error.url === expected)
  })
}

test('every Colombian region has a safe shared draft link and preserved sign-in destination', () => {
  for (const {slug} of colombiaMapRegions) {
    const url = new URL(shared.sharedAccountHref(slug), 'https://aves.bio')
    assert.equal(url.pathname, '/account')
    assert.equal(url.searchParams.get('country'), 'colombia')
    assert.equal(url.searchParams.get('region'), slug)
    const auth = new URL(shared.sharedSignInHref('sign-in', slug), 'https://aves.bio')
    assert.equal(auth.searchParams.get('next'), `/account?country=colombia&region=${slug}`)
  }
  for (const value of ['https://attacker.invalid', '//attacker.invalid', '__proto__', 'queensland']) {
    assert.equal(shared.sharedAccountHref(value), '/account?country=colombia')
  }
})

test('legacy shopping preserves allowed planning choices and discards arbitrary redirects', async () => {
  const {default: Page} = load('app/shopping/page.tsx', {'next/navigation': redirection})
  await assert.rejects(Page({searchParams: Promise.resolve({region: 'choco', preset: 'vision', next: 'https://attacker.invalid'})}),
    error => error.url === '/contact?region=pacific&tour=vision')
  assert.equal(shared.legacyPlanningHref({preset: 'sierra-nevada'}), '/contact?region=sierra-nevada-de-santa-marta&tour=adventure')
  assert.equal(shared.legacyPlanningHref({regions: 'llanos,amazon,unknown'}), '/contact?regions=llanos%2Camazonia')
  assert.equal(shared.legacyPlanningHref({region: ['caribbean', '//attacker.invalid'], preset: 'unknown'}), '/contact')
})

test('old auth tokens are not forwarded; old recovery links start a fresh shared recovery', async () => {
  const {default: Page} = load('app/auth/[...legacy]/page.tsx', {'next/navigation': redirection})
  await assert.rejects(Page({params: Promise.resolve({legacy: ['callback']}), searchParams: {code: 'old-project-token'}}), error => error.url === shared.sharedSignInHref())
  await assert.rejects(Page({params: Promise.resolve({legacy: ['reset-password']})}), error => error.url === '/account/forgot-password')
})

test('Colombia runtime source contains no retired database clients, auth providers or credential reads', () => {
  const forbidden = /@supabase\/|@\/hooks\/use-auth|@\/hooks\/use-bookings|@\/lib\/(?:supabase|auth-service|database\.types)|NEXT_PUBLIC_SUPABASE|SUPABASE_SERVICE_ROLE_KEY/
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(filename)
      else if (/\.tsx?$/.test(entry.name)) assert.doesNotMatch(fs.readFileSync(filename, 'utf8'), forbidden, path.relative(root, filename))
    }
  }
  for (const dir of ['app', 'components', 'hooks', 'lib']) walk(path.join(root, dir))
})

test('desktop, mobile and regional shared-account entry points use full-page navigation', () => {
  for (const file of ['components/navigation-header.tsx', 'components/mobile-navigation-overlay.tsx']) {
    assert.match(fs.readFileSync(path.join(root, file), 'utf8'), /account.*\? "a" : Link/)
  }
  assert.match(fs.readFileSync(path.join(root, 'components/footer.tsx'), 'utf8'), /<a href=\{sharedAccountHref\(\)\}/)
  assert.match(fs.readFileSync(path.join(root, 'components/colombia-region-page.tsx'), 'utf8'), /<a href=\{sharedAccountHref\(region\.id\)\}/)
})
