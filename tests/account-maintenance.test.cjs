const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

function load(relative, mocks = {}) {
  const filename = path.resolve(__dirname, '..', relative)
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const mod = {exports: {}}
  new Function('require', 'module', 'exports', code)(name => {
    if (Object.hasOwn(mocks, name)) return mocks[name]
    if (name === 'react' || name === 'react/jsx-runtime') return require(name)
    throw new Error(`Unexpected dependency: ${name}`)
  }, mod, mod.exports)
  return mod.exports
}

const notice = load('components/colombia-account-notice.tsx')

test('dashboard retains its body inside the real bookings context and displays maintenance help', () => {
  const bookingHooks = load('hooks/use-bookings.tsx', {
    '@/lib/supabase-client': {supabase: new Proxy({}, {get() {throw new Error('This render must not contact a database')}})},
  })
  function DashboardProbe({initialProfile}) {
    assert.equal(initialProfile, null)
    const context = bookingHooks.useBookings()
    assert.deepEqual(context.bookings, [])
    assert.equal(context.loading, true)
    return React.createElement('main', null, 'Existing dashboard component')
  }
  const {default: Page} = load('app/dashboard/page.tsx', {
    './DashboardClient': {default: DashboardProbe},
    '@/hooks/use-bookings': bookingHooks,
    '@/components/colombia-account-notice': notice,
  })
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.match(html, /Colombian accounts are being upgraded/)
  assert.match(html, /href="mailto:mmelendro@gmail.com"/)
  assert.match(html, /Existing dashboard component/)
  assert.ok(html.indexOf('Colombian accounts') < html.indexOf('Existing dashboard component'))
})

for (const [route, component] of [['login', 'LoginForm'], ['signup', 'SignupForm']]) {
  test(`${route} retains its existing form beneath the maintenance notice`, () => {
    const Form = () => React.createElement('form', {'aria-label': `Existing ${route} form`})
    const {default: Page} = load(`app/auth/${route}/page.tsx`, {
      [`./${component}`]: {default: Form},
      '@/components/colombia-account-notice': notice,
    })
    const html = renderToStaticMarkup(React.createElement(Page))
    assert.match(html, /Colombian accounts are being upgraded/)
    assert.match(html, /href="mailto:mmelendro@gmail.com"/)
    assert.ok(html.includes(`aria-label="Existing ${route} form"`))
  })
}
