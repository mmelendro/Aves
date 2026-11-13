const {readFileSync,existsSync}=require("node:fs")
const {resolve,dirname}=require("node:path")
const {randomUUID}=require("node:crypto")
const ts=require("typescript")
const assert=require("node:assert/strict")
function componentHarness(file, name, props, overrides = {}) {
  const root = resolve(__dirname, "../..")
  const state = [], cache = new Map()
  let cursor = 0
  const pendingEffects = [], effectDeps = new Map()
  const react = {
    createContext: value => ({Provider:"ContextProvider",defaultValue:value}),
    useId: () => "test-id",
    useContext: context => context.defaultValue?.copy ? context.defaultValue : overrides.context?.(context) ?? context.defaultValue,
    useState(initial) {
      const index = cursor++
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial
      return [state[index], value => { state[index] = typeof value === "function" ? value(state[index]) : value }]
    },
    useRef(initial) { const index = cursor++; if (!(index in state)) state[index] = { current: initial }; return state[index] },
    useEffect(callback, deps) {
      if (!overrides.runEffects) return
      const index = cursor++, previous = effectDeps.get(index)
      if (!previous || deps.some((value,i) => value !== previous[i])) { effectDeps.set(index,deps); pendingEffects.push(callback) }
    }, useCallback: callback => callback,
  }
  react.useLayoutEffect = react.useEffect
  const jsx = (type, props) => ({ type, props: props || {} })
  class FormValues {
    constructor(form) { this.values = form.values }
    get(key) { return this.values[key] ?? null }
    getAll(key) { return this.values[key] || [] }
  }
  const mocks = {
    react,
    "./unsaved-changes": {useUnsavedChanges(){},confirmDiscardPendingEdits:()=>true},
    "@/components/colombia-home-language": { useColombiaHomeCopy: () => node => node, ColombiaHomeLanguageToggle: "ColombiaHomeLanguageToggle" },
    "@/components/header-contour": { HeaderContour: "HeaderContour" },
    "@/components/header-landscape-context": { useHeaderLandscape: () => ({selection:null,publish(){}}) },
    "./header-landscape-context": { useHeaderLandscape: () => ({selection:null,publish(){}}) },
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "Fragment" },
    "next/link": { __esModule: true, default: "Link" },
    "next/image": { __esModule: true, default: "Image" },
    "next/navigation": { usePathname: () => "/account" },
    "@/lib/supabase/client": { createClient() { throw new Error("Unexpected provider call") } },
    ...overrides.mocks,
  }
  function module(filename) {
    if (cache.has(filename)) return cache.get(filename)
    if (filename.endsWith(".json")) return JSON.parse(readFileSync(filename, "utf8"))
    const exports = {}
    cache.set(filename, exports)
    const code = ts.transpileModule(readFileSync(filename, "utf8"), { fileName: filename.replace(/\.mjs$/, ".ts"), compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
    const requireModule = id => {
      if (Object.hasOwn(mocks, id)) return mocks[id]
      if (id.endsWith(".module.css")) return {__esModule:true,default:new Proxy({}, {get:(_,key)=>String(key)})}
      if (id === "lucide-react" || id.startsWith("@/components/ui/")) return new Proxy({}, { get: (_, key) => String(key) })
      if (id === "@/components/mobile-navigation-overlay") return { MobileNavigationOverlay: "MobileNavigationOverlay" }
      if (id.startsWith("@/") || id.startsWith(".")) {
        const base = id.startsWith("@/") ? resolve(root, id.slice(2)) : resolve(dirname(filename), id)
        const target = [base, base + ".ts", base + ".tsx"].find(existsSync)
        if (!target) throw new Error("Missing test import " + id)
        return module(target)
      }
      return require(id)
    }
    new Function("require", "exports", "FormData", "crypto", "window", "fetch", code)(requireModule, exports, FormValues, { randomUUID }, overrides.window || {}, overrides.fetch || (() => { throw new Error("Unexpected network request") }))
    return exports
  }
  const Component = module(resolve(root, file))[name]
  return { render() { cursor = 0; const tree=Component(props); while(pendingEffects.length) pendingEffects.shift()(); return tree } }
}

function nodes(tree) {
  if (!tree || typeof tree !== "object") return []
  if (Array.isArray(tree)) return tree.flatMap(nodes)
  return [tree, ...nodes(tree.props?.children)]
}
function find(tree, predicate) { const result = nodes(tree).find(predicate); assert.ok(result, "Expected rendered element"); return result }
function boxes(tree) { return nodes(tree).filter(node => node.props.name === "regions") }


module.exports={componentHarness,nodes,find}
