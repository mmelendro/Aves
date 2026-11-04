const { readFileSync } = require("node:fs")
const { resolve, dirname } = require("node:path")
const ts = require("typescript")
const root = resolve(__dirname, "../..")

module.exports = function loader({ mocks = {}, globals = {}, env = {} } = {}) {
  const cache = new Map()
  function load(path) {
    const filename = resolve(root, path)
    if (cache.has(filename)) return cache.get(filename)
    const exports = {}
    cache.set(filename, exports)
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText
    const isolatedRequire = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name]
      if (name === "server-only") return {}
      if (name.startsWith("@/")) return load(name.slice(2) + ".ts")
      if (name.startsWith(".")) return load(resolve(dirname(filename), name + ".ts"))
      return require(name)
    }
    const bindings = { process: { env: { NEXT_PUBLIC_SITE_URL: "https://aves.bio", ...env } }, ...globals }
    new Function("require", "exports", ...Object.keys(bindings), code)(isolatedRequire, exports, ...Object.values(bindings))
    return exports
  }
  return load
}
