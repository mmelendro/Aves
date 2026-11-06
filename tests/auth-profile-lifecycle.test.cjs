const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function load(relative, mocks) {
  const code = ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '..', relative), 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX},
  }).outputText
  const mod = {exports: {}}
  new Function('require', 'module', 'exports', code)(name => {
    if (!(name in mocks)) throw new Error(`Unexpected dependency: ${name}`)
    return mocks[name]
  }, mod, mod.exports)
  return mod.exports
}

function deferred() {
  let resolve
  const promise = new Promise(done => {resolve = done})
  return {promise, resolve}
}
const settle = () => new Promise(resolve => setImmediate(resolve))
const session = id => ({user: {id}})
const profile = id => ({id, first_name: id, last_name: null, profile_image_url: null})

// A small hook dispatcher exercises the actual provider's effect, refs and async
// methods. Transport is deferred so tests control response ordering; no network.
function mountProvider({initial = Promise.resolve({session: null})} = {}) {
  const slots = [], effects = [], requests = [], updates = [], signOuts = []
  let cursor = 0, callback, unsubscribed = false, unmounted = false
  const react = {
    createContext: () => ({Provider: 'Provider'}),
    useContext: () => {throw new Error('Consumer not used by this harness')},
    useState(value) {
      const index = cursor++
      if (!(index in slots)) slots[index] = value
      return [slots[index], next => {
        assert.equal(unmounted, false, 'No state may be updated after cleanup')
        slots[index] = typeof next === 'function' ? next(slots[index]) : next
      }]
    },
    useRef(value) {
      const index = cursor++
      if (!(index in slots)) slots[index] = {current: value}
      return slots[index]
    },
    useEffect(effect) {
      const index = cursor++
      if (!(index in slots)) {slots[index] = true; effects.push(effect)}
    },
  }
  const service = {
    getCurrentSession: () => initial,
    onAuthStateChange(listener) {
      callback = listener
      return {data: {subscription: {unsubscribe() {unsubscribed = true}}}}
    },
    getUserProfile(id) {const pending = deferred(); requests.push({id, ...pending}); return pending.promise},
    updateUserProfile(id, changes) {const pending = deferred(); updates.push({id, changes, ...pending}); return pending.promise},
    signOut() {const pending = deferred(); signOuts.push(pending); return pending.promise},
  }
  const {AuthProvider} = load('hooks/use-auth-enhanced.tsx', {
    react,
    '@/lib/auth-service': {AuthService: service},
    'react/jsx-runtime': {jsx: (type, props) => ({type, props})},
  })
  const value = () => {cursor = 0; return AuthProvider({children: null}).props.value}
  value()
  const cleanups = effects.map(effect => effect())
  return {
    value, requests, updates, signOuts,
    emit(id) {return callback(id ? 'SIGNED_IN' : 'SIGNED_OUT', id ? session(id) : null)},
    unmount() {cleanups.forEach(cleanup => cleanup()); unmounted = true; assert.equal(unsubscribed, true)},
  }
}

test('a profile response after sign-out cannot restore the previous profile', async () => {
  const app = mountProvider(); await settle()
  assert.equal(app.emit('A'), undefined, 'The auth listener must be synchronous')
  await settle()
  app.emit(null)
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
  assert.equal(app.value().user, null)
  assert.equal(app.value().profile, null)
  app.unmount()
})

test('account switching immediately clears the old profile and rejects its delayed refresh', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
  const refresh = app.value().refreshProfile()
  app.emit('B')
  assert.equal(app.value().profile, null)
  await settle()
  app.requests[2].resolve({data: profile('B'), error: null}); await settle()
  app.requests[1].resolve({data: profile('A'), error: null}); await refresh
  assert.equal(app.value().user.id, 'B')
  assert.equal(app.value().profile.id, 'B')
  app.unmount()
})

test('the newest same-account refresh wins when responses arrive out of order', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  const refresh = app.value().refreshProfile()
  app.requests[1].resolve({data: {...profile('A'), first_name: 'Latest'}, error: null}); await refresh
  app.requests[0].resolve({data: {...profile('A'), first_name: 'Stale'}, error: null}); await settle()
  assert.equal(app.value().profile.first_name, 'Latest')
  app.unmount()
})

test('a profile update completing after account switching cannot replace the new profile', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
  const update = app.value().updateProfile({first_name: 'Changed'})
  app.emit('B'); await settle()
  app.requests[1].resolve({data: profile('B'), error: null}); await settle()
  app.updates[0].resolve({data: profile('A'), error: null}); await update
  assert.equal(app.value().profile.id, 'B')
  app.unmount()
})

test('a delayed initial session cannot undo a newer sign-out event', async () => {
  const initial = deferred(), app = mountProvider({initial: initial.promise})
  app.emit(null)
  initial.resolve({session: session('A')}); await settle()
  assert.equal(app.value().user, null)
  assert.equal(app.value().profile, null)
  assert.equal(app.requests.length, 0)
  app.unmount()
})

test('a method retained by an old account view cannot update a newly signed-in account', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  const oldView = app.value()
  app.emit('B'); await settle()
  const result = await oldView.updateProfile({first_name: 'From old form'})
  assert.equal(result.data, null)
  assert.ok(result.error)
  assert.equal(app.updates.length, 0)
  app.unmount()
})

test('explicit sign-out invalidates pending loads before its response and cannot clear a newer account', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  const signOut = app.value().signOut()
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
  assert.equal(app.value().profile, null)
  app.emit('B'); await settle()
  app.requests[1].resolve({data: profile('B'), error: null}); await settle()
  app.signOuts[0].resolve({error: null}); await signOut
  assert.equal(app.value().user.id, 'B')
  assert.equal(app.value().profile.id, 'B')
  app.unmount()
})

test('cleanup prevents pending requests from writing state', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  app.unmount()
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
})

test('failed sign-out restores only a fresh profile for the still-current account', async () => {
  const app = mountProvider(); await settle(); app.emit('A'); await settle()
  const signOut = app.value().signOut()
  app.signOuts[0].resolve({error: 'Synthetic network failure'}); await signOut
  app.requests[1].resolve({data: {...profile('A'), first_name: 'Fresh'}, error: null}); await settle()
  app.requests[0].resolve({data: profile('A'), error: null}); await settle()
  assert.equal(app.value().profile.first_name, 'Fresh')
  app.unmount()
})

test('global profile reads and mutation responses request display fields only', async () => {
  const selects = [], ownership = []
  const query = {
    select(columns) {selects.push(columns); return this},
    eq(column, id) {ownership.push([column, id]); return this},
    insert() {return this}, update() {return this},
    async single() {return {data: profile('A'), error: null}},
  }
  const {AuthService} = load('lib/auth-service.ts', {
    './supabase-client': {supabase: {from(table) {assert.equal(table, 'user_profiles'); return query}}},
  })
  await AuthService.getUserProfile('A')
  await AuthService.updateUserProfile('A', {first_name: 'Changed'})
  await AuthService.createUserProfile({id: 'A', email: 'synthetic@example.invalid'})
  assert.deepEqual(selects, Array(3).fill('id,first_name,last_name,profile_image_url'))
  assert.deepEqual(ownership, [['id', 'A'], ['id', 'A']])
})
