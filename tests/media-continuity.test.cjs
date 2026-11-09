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

test('restoring and returning from history require Resume, and closing removes the checkpoint', () => {
  const React = require('react')
  const slots = [], listeners = {}, documentListeners = {}, saved = new Map(), pushed = []
  let index = 0, effects = [], dependencies = []
  const hooks = {
    ...React,
    useState(initial) { const slot = index++; if (!(slot in slots)) slots[slot] = initial; return [slots[slot], value => { slots[slot] = typeof value === 'function' ? value(slots[slot]) : value }] },
    useRef(initial) { const slot = index++; return slots[slot] ??= { current: initial } },
    useCallback(fn) { index++; return fn },
    useEffect(fn, deps) { const slot = index++; if (!dependencies[slot] || deps.some((item, i) => item !== dependencies[slot][i])) { dependencies[slot] = deps; effects.push(fn) } },
  }
  const storage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value), removeItem: key => saved.delete(key) }
  const windowMock = { location: { href: 'https://aves.bio/new-zealand/south-island' }, addEventListener: (key, fn) => { listeners[key] = fn }, removeEventListener() {} }
  const documentMock = { activeElement: null, addEventListener: (key, fn) => { documentListeners[key] = fn }, removeEventListener() {} }
  const router = { push: href => pushed.push(href) }
  class Element { constructor(href) { this.href = href } closest() { return this } hasAttribute() { return false } getAttribute(name) { return name === 'href' ? this.href : null } }
  const modules = new Map()
  function component(file) {
    if (modules.has(file)) return modules.get(file)
    if (file.endsWith('.module.css')) return { default: new Proxy({}, {get: (_, key) => key}), __esModule: true }
    const output = {}
    modules.set(file, output)
    const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
    new Function('require','exports','window','document','sessionStorage','Element','HTMLElement',code)(name => {
      if (name === 'react') return hooks
      if (name === 'next/navigation') return { useRouter: () => router }
      if (name === 'next/image') return () => null
      if (name.startsWith('@/')) return component(name.slice(2) + '.ts')
      if (name.startsWith('.')) return component(path.join(path.dirname(file), name))
      return require(name)
    }, output, windowMock, documentMock, storage, Element, Element)
    return output
  }
  const Provider = component('components/aves-media-provider.tsx').AvesMediaProvider
  const key = load('lib/media-handoff.ts').MEDIA_HANDOFF_KEY
  saved.set(key, JSON.stringify({version:1,resourceId:'mohua-podcast',position:125,muted:false,savedAt:Date.now()}))
  const render = () => { index = 0; effects = []; const tree = Provider({ children: 'Page', navigationPaths: ['/', '/colombia'] }); for (const effect of effects) effect(); return tree }
  const nodes = tree => !React.isValidElement(tree) ? [] : [tree, ...React.Children.toArray(tree.props.children).flatMap(nodes)]
  render()
  let tree = render(), all = nodes(tree)
  assert.ok(all.some(node => node.type === 'button' && React.Children.toArray(node.props.children).includes('Resume media')))
  assert.ok(!all.some(node => node.type?.name === 'MediaDock' || node.type === 'audio' || node.type === 'iframe'))
  assert.ok(all.some(node => node.type === 'p' && String(node.props.children).includes('2:05')))
  for (const changes of [{defaultPrevented:true}, {ctrlKey:true}, {metaKey:true}, {shiftKey:true}, {altKey:true}, {button:1}]) {
    documentListeners.click({button:0, target:new Element('/colombia'), preventDefault(){throw Error('Must stay native')}, ...changes})
  }
  let prevented = false
  documentListeners.click({button:0,target:new Element('/colombia'),preventDefault(){prevented=true}})
  assert.equal(prevented,true); assert.deepEqual(pushed,['/colombia'])
  documentListeners.click({button:0,target:new Element('/account'),preventDefault(){throw Error('Account must stay native')}})
  all.find(node => node.props['aria-label'] === 'Close player and stop playback').props.onClick()
  assert.equal(storage.getItem(key), null)
  tree = render()
  assert.ok(!nodes(tree).some(node => node.type === 'aside'))
  // Simulate returning to a frozen old document after closing in another app.
  tree.props.value.open('mohua-podcast'); render()
  saved.delete(key); listeners.pageshow({persisted:true}); tree = render()
  assert.ok(!nodes(tree).some(node => node.type === 'aside' || node.type?.name === 'MediaDock'))
})
