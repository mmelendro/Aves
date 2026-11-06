const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, dirname } = require("node:path")
const { randomUUID } = require("node:crypto")
const ts = require("typescript")
const loader = require("./helpers/load-ts.cjs")
const load = loader()
const options = load("content/trip-options.ts")
const intent = load("components/account/plan-intent.ts")
const navigation = load("components/account/account-navigation.ts")
const api = load("components/account/account-api.ts")

// Execute actual component handlers with local hook state and inert JSX.
// No browser, provider, account credentials or network requests are used.
function componentHarness(file, name, props, overrides = {}) {
  const root = resolve(__dirname, "..")
  const state = [], cache = new Map()
  let cursor = 0
  const react = {
    useId: () => "test-id",
    useState(initial) {
      const index = cursor++
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial
      return [state[index], value => { state[index] = typeof value === "function" ? value(state[index]) : value }]
    },
    useRef(initial) { const index = cursor++; if (!(index in state)) state[index] = { current: initial }; return state[index] },
    useEffect() {}, useCallback: callback => callback,
  }
  const jsx = (type, props) => ({ type, props: props || {} })
  class FormValues {
    constructor(form) { this.values = form.values }
    get(key) { return this.values[key] ?? null }
    getAll(key) { return this.values[key] || [] }
  }
  const mocks = {
    react,
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "Fragment" },
    "next/link": { __esModule: true, default: "Link" },
    "next/image": { __esModule: true, default: "Image" },
    "next/navigation": { usePathname: () => "/account" },
    "@/lib/supabase/client": { createClient() { throw new Error("Unexpected provider call") } },
    ...overrides.mocks,
  }
  function module(filename) {
    if (cache.has(filename)) return cache.get(filename)
    const exports = {}
    cache.set(filename, exports)
    const code = ts.transpileModule(readFileSync(filename, "utf8"), { fileName: filename, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
    const requireModule = id => {
      if (Object.hasOwn(mocks, id)) return mocks[id]
      if (id === "lucide-react" || id.startsWith("@/components/ui/")) return new Proxy({}, { get: (_, key) => String(key) })
      if (id === "@/components/mobile-navigation-overlay") return { MobileNavigationOverlay: "MobileNavigationOverlay" }
      if (id.startsWith("@/") || id.startsWith(".")) {
        const base = id.startsWith("@/") ? resolve(root, id.slice(2)) : resolve(dirname(filename), id)
        const target = [base + ".ts", base + ".tsx"].find(existsSync)
        if (!target) throw new Error("Missing test import " + id)
        return module(target)
      }
      return require(id)
    }
    new Function("require", "exports", "FormData", "crypto", "window", code)(requireModule, exports, FormValues, { randomUUID }, overrides.window || {})
    return exports
  }
  const Component = module(resolve(root, file))[name]
  return { render() { cursor = 0; return Component(props) } }
}

function nodes(tree) {
  if (!tree || typeof tree !== "object") return []
  if (Array.isArray(tree)) return tree.flatMap(nodes)
  return [tree, ...nodes(tree.props?.children)]
}
function find(tree, predicate) { const result = nodes(tree).find(predicate); assert.ok(result, "Expected rendered element"); return result }
function boxes(tree) { return nodes(tree).filter(node => node.props.name === "regions") }

test("all 20 regional entry links prefill only their country", () => {
  assert.equal(options.countryRegionOptions.australia.length, 9)
  assert.equal(options.countryRegionOptions.colombia.length, 11)
  for (const [country, regions] of Object.entries(options.countryRegionOptions)) {
    for (const { id } of regions) {
      const result = intent.planIntentFromSearch({ country, region: id })
      assert.deepEqual(result, { country, regions: [id] })
      assert.equal(intent.accountPlanPath(result), `/account?country=${country}&region=${id}`)
    }
  }
  assert.deepEqual(intent.planIntentFromSearch({ country: "colombia", region: "queensland" }), { country: "colombia", regions: [] })
  assert.deepEqual(intent.planIntentFromSearch({ country: "australia", region: "pacific" }), { country: "australia", regions: [] })
  for (const country of ["__proto__", "elsewhere", ["colombia", "australia"]]) assert.equal(intent.planIntentFromSearch({ country }), undefined)
  assert.equal(intent.planIntentFromSearch({}), undefined)
})

test("safe sign-in returns preserve Colombia intent without open redirects or a doubled base path", () => {
  const next = "/account?country=colombia&region=central-andes"
  assert.equal(navigation.accountReturnPath("/australia" + next), next)
  assert.equal(navigation.accountNextFromSearch({ next }), next)
  const href = navigation.accountEntryHref("/account/sign-in", next)
  assert.equal(new URL(href, "https://aves.bio").searchParams.get("next"), next)
  for (const value of ["https://attacker.test", "//attacker.test", "/%2f%2fattacker.test", "/account/../../outside"]) assert.equal(navigation.accountReturnPath(value), "/account")
})

test("old Australian plans keep country and region labels; Colombia labels are distinct", () => {
  assert.equal(api.countryLabel(), "Australia")
  assert.equal(api.regionSummary(["queensland", "new-south-wales"]), "Queensland, New South Wales")
  assert.equal(api.regionSummary(["sierra-nevada-de-santa-marta", "colombian-massif"], "colombia"), "Sierra Nevada de Santa Marta, Colombian Massif")
  assert.deepEqual(intent.normalizePlanRegions("australia", ["Queensland", "queensland", "Earlier custom place"]), ["queensland", "Earlier custom place"])
})

test("registered future countries stay unavailable and cannot become Australian intentions", () => {
  assert.deepEqual(options.enabledCountries.map(country => country.id), ["australia", "colombia"])
  for (const country of ["ecuador", "costa-rica"]) {
    assert.equal(options.destinationRegistry[country].enabled, false)
    assert.equal(options.destinationRegistry[country].consentVersion, null)
    assert.deepEqual(options.countryRegionOptions[country], [])
    assert.equal(intent.planIntentFromSearch({ country }), undefined)
    assert.equal(api.tripCountry(country), country)
  }
  for (const country of ["unknown", "__proto__", "", null]) assert.throws(() => api.tripCountry(country), /Unknown destination/)
  const harness = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { onSaved() {}, onCancel() {} })
  let tree = harness.render()
  const select = find(tree, node => node.props.name === "country")
  assert.deepEqual(nodes(select).filter(node => node.type === "option").map(node => node.props.value), ["australia", "colombia"])
  select.props.onChange({ target: { value: "ecuador" } })
  tree = harness.render()
  assert.equal(find(tree, node => node.props.name === "country").props.value, "australia")
})

test("a new configured destination drives labels, intents, region options and the selector", () => {
  const destinations = require("./helpers/destination-fixture.cjs")()
  const thirdLoad = loader({ mocks: { "@/content/trip-options": destinations } })
  const thirdIntent = thirdLoad("components/account/plan-intent.ts")
  const thirdApi = thirdLoad("components/account/account-api.ts")
  const selected = { country: "test-islands", regions: ["test-cloud-forest"] }
  assert.deepEqual(thirdIntent.planIntentFromSearch({ country: "test-islands", region: "test-cloud-forest" }), selected)
  assert.equal(thirdIntent.accountPlanPath(selected), "/account?country=test-islands&region=test-cloud-forest")
  assert.equal(thirdApi.tripCountry("test-islands"), "test-islands")
  assert.equal(thirdApi.countryLabel("test-islands"), "Test Islands")
  assert.equal(thirdApi.regionSummary(selected.regions, "test-islands"), "Test Cloud Forest")
  const harness = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { initial: selected, onSaved() {}, onCancel() {} }, { mocks: { "@/content/trip-options": destinations } })
  const tree = harness.render()
  const select = find(tree, node => node.props.name === "country")
  assert.deepEqual(nodes(select).filter(node => node.type === "option").map(node => node.props.value), ["australia", "colombia", "test-islands"])
  assert.deepEqual(boxes(tree).filter(node => node.props.checked).map(node => node.props.value), selected.regions)
})

test("a saved retired destination remains correctly selected without becoming a new-plan choice", () => {
  const destinations = require("./helpers/destination-fixture.cjs")({ enabled: false })
  const plan = { id: "saved", country: "test-islands", title: "Saved journey", regions: ["test-cloud-forest"], travelWhen: "", partySize: "", message: "", status: "draft", updatedAt: "2026-11-07T00:00:00Z" }
  const mocks = { "@/content/trip-options": destinations }
  const editor = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { plan, onSaved() {}, onCancel() {} }, { mocks })
  let tree = editor.render()
  let select = find(tree, node => node.props.name === "country")
  assert.equal(select.props.value, "test-islands")
  assert.ok(nodes(select).some(node => node.type === "option" && node.props.value === "test-islands" && nodes(node).length > 0))
  assert.match(JSON.stringify(nodes(select).find(node => node.props.value === "test-islands" && node.type === "option").props.children), /saved destination/)
  assert.deepEqual(boxes(tree).filter(node => node.props.checked).map(node => node.props.value), ["test-cloud-forest"])
  select.props.onChange({ target: { value: "australia" } })
  tree = editor.render()
  find(tree, node => node.props.name === "country").props.onChange({ target: { value: "test-islands" } })
  tree = editor.render()
  assert.equal(find(tree, node => node.props.name === "country").props.value, "test-islands")
  assert.deepEqual(boxes(tree).filter(node => node.props.checked), [])
  const fresh = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { onSaved() {}, onCancel() {} }, { mocks })
  const freshSelect = find(fresh.render(), node => node.props.name === "country")
  assert.deepEqual(nodes(freshSelect).filter(node => node.type === "option").map(node => node.props.value), ["australia", "colombia"])
  const retiredIntent = loader({ mocks })("components/account/plan-intent.ts")
  assert.equal(retiredIntent.planIntentFromSearch({ country: "test-islands", region: "test-cloud-forest" }), undefined)
})

test("country selector clears incompatible checked regions and announces the change", () => {
  const harness = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { initial: { country: "australia", regions: ["queensland"] }, onSaved() {}, onCancel() {} })
  let tree = harness.render()
  assert.equal(boxes(tree).length, 9)
  assert.deepEqual(boxes(tree).filter(node => node.props.checked).map(node => node.props.value), ["queensland"])
  const select = find(tree, node => node.props.name === "country")
  assert.ok(find(tree, node => node.type === "label" && node.props.htmlFor === select.props.id))
  select.props.onChange({ target: { value: "colombia" } })
  tree = harness.render()
  assert.equal(boxes(tree).length, 11)
  assert.equal(boxes(tree).filter(node => node.props.checked).length, 0)
  assert.match(find(tree, node => node.props.role === "status").props.children, /Colombia.*cleared/)
  boxes(tree).find(node => node.props.value === "pacific").props.onChange({ target: { checked: true } })
  tree = harness.render()
  assert.deepEqual(boxes(tree).filter(node => node.props.checked).map(node => node.props.value), ["pacific"])
  find(tree, node => node.props.name === "country").props.onChange({ target: { value: "australia" } })
  tree = harness.render()
  assert.equal(boxes(tree).length, 9)
  assert.equal(boxes(tree).filter(node => node.props.checked).length, 0)
})

test("legacy Australian selections remain visible until the user changes country", () => {
  const harness = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { plan: { id: "legacy", title: "Saved", regions: ["Queensland", "Earlier custom place"] }, onSaved() {}, onCancel() {} })
  let tree = harness.render()
  assert.equal(find(tree, node => node.props.name === "country").props.value, "australia")
  assert.deepEqual(boxes(tree).filter(node => node.props.checked).map(node => node.props.value), ["queensland", "Earlier custom place"])
  find(tree, node => node.props.name === "country").props.onChange({ target: { value: "colombia" } })
  tree = harness.render()
  assert.equal(boxes(tree).some(node => node.props.value === "Earlier custom place"), false)
})

test("Colombia draft submits its country and retains its request key after an uncertain response", async () => {
  const attempts = []
  const harness = componentHarness("components/account/trip-plan-editor.tsx", "TripPlanEditor", { initial: { country: "colombia", regions: ["pacific"] }, onSaved() {}, onCancel() {} }, { mocks: { "./account-api": { ...api, accountRequest: async (path, options) => { attempts.push({ path, ...options }); throw new Error("Unconfirmed response") } } } })
  const event = { preventDefault() {}, currentTarget: { values: { title: "Pacific ideas", regions: ["pacific"], travelWhen: "Flexible", partySize: "2 people", message: "Forest birds" } } }
  await find(harness.render(), node => node.type === "form").props.onSubmit(event)
  await find(harness.render(), node => node.type === "form").props.onSubmit(event)
  assert.equal(attempts.length, 2)
  assert.equal(attempts[0].headers["Idempotency-Key"], attempts[1].headers["Idempotency-Key"])
  assert.equal(attempts[0].body, attempts[1].body)
  const body = JSON.parse(attempts[0].body)
  assert.equal(body.country, "colombia")
  assert.deepEqual(body.regions, ["pacific"])
})

test("successful sign-in returns to the intended Colombia plan", async () => {
  const destinations = []
  const harness = componentHarness("components/account/auth-form.tsx", "AuthForm", { mode: "sign-in", next: "/account?country=colombia&region=llanos" }, { mocks: { "@/lib/supabase/client": { createClient: () => ({ auth: { signInWithPassword: async () => ({ error: null }) } }) } }, window: { location: { assign: value => destinations.push(value) } } })
  await find(harness.render(), node => node.type === "form").props.onSubmit({ preventDefault() {}, currentTarget: { values: { email: "test@example.test", password: "test-only-password" } } })
  assert.deepEqual(destinations, ["/australia/account?country=colombia&region=llanos"])
})

test("sign-in ignores an offsite return even after successful authentication", async () => {
  const destinations = []
  const harness = componentHarness("components/account/auth-form.tsx", "AuthForm", { mode: "sign-in", next: "https://attacker.test/collect" }, { mocks: { "@/lib/supabase/client": { createClient: () => ({ auth: { signInWithPassword: async () => ({ error: null }) } }) } }, window: { location: { assign: value => destinations.push(value) } } })
  await find(harness.render(), node => node.type === "form").props.onSubmit({ preventDefault() {}, currentTarget: { values: { email: "test@example.test", password: "test-only-password" } } })
  assert.deepEqual(destinations, ["/australia/account"])
})

test("signup preserves the entry link but keeps the already configured email callback", async () => {
  const requests = [], destinations = []
  const harness = componentHarness("components/account/auth-form.tsx", "AuthForm", { mode: "sign-up", next: "/account?country=colombia&region=amazonia" }, { mocks: { "@/lib/supabase/client": { createClient: () => ({ auth: { signUp: async input => { requests.push(input); return { error: null } } } }) } }, window: { location: { origin: "https://aves.bio", assign: value => destinations.push(value) } } })
  await find(harness.render(), node => node.type === "form").props.onSubmit({ preventDefault() {}, currentTarget: { values: { email: "test@example.test", password: "test-only-password", confirmPassword: "test-only-password" } } })
  assert.equal(requests[0].options.emailRedirectTo, "https://aves.bio/australia/auth/callback?next=%2Faccount")
  assert.equal(new URL(destinations[0], "https://aves.bio").searchParams.get("next"), "/account?country=colombia&region=amazonia")
})

test("only account/admin/auth paths use shared AVES navigation", () => {
  for (const path of ["/account", "/australia/account/sign-in", "/admin/quotes", "/auth/confirm"]) {
    const harness = componentHarness("components/navigation-header.tsx", "NavigationHeader", {}, { mocks: { "next/navigation": { usePathname: () => path } } })
    assert.equal(harness.render().type.name, "PortalNavigation", path)
  }
  for (const path of ["/", "/australia/regions/queensland", "/accountant"]) {
    const harness = componentHarness("components/navigation-header.tsx", "NavigationHeader", {}, { mocks: { "next/navigation": { usePathname: () => path } } })
    const tree = harness.render()
    assert.ok(find(tree, node => node.props["aria-label"] === "AVES Australia home"), path)
    assert.ok(find(tree, node => node.props.href === "/aves-explorer"), path)
  }
})

test("shared desktop and mobile navigation distinguishes all destinations from the Colombia home", () => {
  const harness = componentHarness("components/account/portal-navigation.tsx", "PortalNavigation", { currentPage: "/account" })
  const tree = harness.render()
  assert.equal(find(tree, node => node.props.href === "https://aves.bio/").props.children, "All destinations")
  assert.equal(find(tree, node => node.props.href === "https://aves.bio/colombia").props.children, "Colombia")
  assert.ok(find(tree, node => node.props.href === "https://aves.bio/australia"))
  const mobile = find(tree, node => node.type === "MobileNavigationOverlay")
  assert.equal(mobile.props.title, "AVES Account")
  assert.deepEqual(mobile.props.links.map(link => link.href), ["/account", "https://aves.bio/", "https://aves.bio/colombia", "https://aves.bio/australia"])
})

test("Australia desktop and mobile navigation can return to the global destination chooser", () => {
  const harness = componentHarness("components/navigation-header.tsx", "NavigationHeader", {}, { mocks: { "next/navigation": { usePathname: () => "/australia" } } })
  const tree = harness.render()
  const globalLink = find(tree, node => node.props.href === "https://aves.bio/")
  assert.equal(globalLink.props.children, "All destinations")
  assert.equal(globalLink.props["aria-current"], undefined)
  assert.equal(find(tree, node => node.props["aria-label"] === "AVES Australia home").props.href, "/")
  const mobile = find(tree, node => node.type === "MobileNavigationOverlay")
  assert.ok(mobile.props.links.some(link => link.href === "https://aves.bio/" && link.label === "All destinations"))
})

test("public and account footers link to Colombia separately from all destinations", () => {
  const publicFooter = componentHarness("components/footer.tsx", "Footer", {}).render()
  const accountShell = componentHarness("components/account/account-shell.tsx", "AccountShell", { title: "Account", description: "Trips" }, { mocks: { "@/components/page-shell": { PageShell: "PageShell" } } }).render()
  for (const footer of [publicFooter, accountShell.props.footer]) {
    assert.equal(find(footer, node => node.props.href === "https://aves.bio/").props.children, "All destinations")
    assert.match(find(footer, node => node.props.href === "https://aves.bio/colombia").props.children, /Colombia/)
    assert.equal(nodes(footer).some(node => node.props.href === "/colombia" || node.props.href === "/australia/colombia"), false)
  }
})
