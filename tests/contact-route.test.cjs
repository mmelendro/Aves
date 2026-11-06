const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const ts = require("typescript")
const {NextResponse} = require("next/server")
const root = path.resolve(__dirname, "..")
const key = "a7ab9560-735d-49f4-b55d-dda98026fac9"
const fixture = {firstName: "Synthetic", lastName: "Visitor", email: "synthetic@example.invalid", phone: "", travelDate: "2027-03-01", groupSize: "2 people", duration: "8 days", experienceLevel: "Beginner birder", tourTypes: ["vision"], regions: ["pacific-choco"], message: "Synthetic inquiry"}
function load(file, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
  }).outputText
  const mod = {exports: {}}
  new Function("require", "module", "exports", "fetch", "process", code)(name => {
    if (name === "next/server") return {NextResponse}
    if (name === "zod") return require("zod")
    if (name.startsWith("@/")) return load(name.slice(2) + ".ts", mocks)
    if (name.startsWith("./")) return load(path.join(path.dirname(file), name + ".ts"), mocks)
    throw new Error("Unexpected dependency: " + name)
  }, mod, mod.exports, mocks.fetch, {env: new Proxy({}, {get() {throw new Error("The bridge must never read service credentials")}})})
  return mod.exports
}
function harness(response = () => Response.json({success: true, status: "stored", intent: "inquiry", country: "colombia"})) {
  const calls = []
  const route = load("app/api/contact/route.ts", {fetch: async (url, options) => {calls.push({url, options}); return response()}})
  return {
    calls,
    post(body = fixture, headers = {}) {
      return route.POST(new Request("https://aves.bio/api/contact", {
        method: "POST", headers: {"Content-Type": "application/json", "Idempotency-Key": key, Origin: "https://aves.bio", ...headers},
        body: typeof body === "string" ? body : JSON.stringify(body),
      }))
    },
    route,
  }
}
test("legacy endpoint stores through the fixed shared service without credentials or visitor confirmation email", async () => {
  const app = harness(), response = await app.post()
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), {success: true, status: "stored", intent: "inquiry", country: "colombia"})
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.equal(app.calls.length, 1)
  const {url, options} = app.calls[0]
  assert.equal(url, "https://aves.bio/australia/api/contact")
  assert.equal(options.redirect, "error")
  assert.equal(options.cache, "no-store")
  assert.deepEqual(options.headers, {"Content-Type": "application/json", "Idempotency-Key": key, Origin: "https://aves.bio"})
  const payload = JSON.parse(options.body)
  assert.equal(payload.country, "colombia")
  assert.equal(payload.region, "pacific")
  assert.equal(payload.name, "Synthetic Visitor")
  assert.equal(payload.updates, false)
  assert.match(payload.message, /Preferred duration: 8 days/)
  assert.match(payload.message, /Tour interests: vision/)
})
for (const [label, body, headers, expected] of [
  ["malformed JSON", "{", {}, 400],
  ["invalid email", {...fixture, email: "not-an-email"}, {}, 400],
  ["name header injection", {...fixture, firstName: "A\r\nB"}, {}, 400],
  ["filled honeypot", {...fixture, website: "spam.invalid"}, {}, 400],
  ["nonboolean opt-in", {...fixture, updates: "yes"}, {}, 400],
  ["unsupported tour", {...fixture, tourTypes: ["fake-tour"]}, {}, 400],
  ["foreign country region", {...fixture, regions: ["queensland"]}, {}, 400],
  ["overlong message", {...fixture, message: "x".repeat(4001)}, {}, 400],
  ["missing request key", fixture, {"Idempotency-Key": ""}, 400],
  ["bad request key", fixture, {"Idempotency-Key": "guess"}, 400],
  ["foreign Origin", fixture, {Origin: "https://attacker.invalid"}, 403],
  ["cross-site fetch", fixture, {"Sec-Fetch-Site": "cross-site"}, 403],
  ["wrong content type", fixture, {"Content-Type": "text/plain"}, 415],
  ["declared oversized body", fixture, {"Content-Length": "32769"}, 413],
  ["actual oversized body", "x".repeat(32769), {}, 413],
]) test(label + " is rejected before forwarding", async () => {
  const app = harness(), response = await app.post(body, headers)
  assert.equal(response.status, expected)
  assert.equal(app.calls.length, 0)
  assert.equal(response.headers.get("cache-control"), "no-store")
})
test("explicit opt-in survives mapping and multiple regions remain in the inquiry message", async () => {
  const app = harness(); await app.post({...fixture, regions: ["caribbean", "eastern-plains"], updates: true})
  const body = JSON.parse(app.calls[0].options.body)
  assert.equal(body.region, "")
  assert.equal(body.updates, true)
  assert.match(body.message, /Region interests: caribbean, llanos/)
  await app.post({...fixture, regions: ["multiple", "caribbean"]})
  const flexible = JSON.parse(app.calls[1].options.body)
  assert.equal(flexible.region, "")
  assert.match(flexible.message, /Multiple Colombian regions, including caribbean/)
})
test("same caller idempotency key is forwarded unchanged on retries", async () => {
  const app = harness(); await app.post(); await app.post()
  assert.deepEqual(app.calls.map(call => call.options.headers["Idempotency-Key"]), [key, key])
})
for (const [label, response, expected] of [
  ["unconfirmed success", () => Response.json({success: true}), 502],
  ["old provider acceptance", () => Response.json({success: true, status: "accepted", intent: "inquiry"}), 502],
  ["old service without country", () => Response.json({success: true, status: "stored", intent: "inquiry"}), 502],
  ["wrong country", () => Response.json({success: true, status: "stored", intent: "inquiry", country: "australia"}), 502],
  ["non-JSON response", () => new Response("<html>unavailable</html>"), 502],
  ["service unavailable", () => Response.json({error: "private internal detail"}, {status: 503}), 503],
  ["payload conflict", () => Response.json({error: "conflict"}, {status: 409}), 409],
  ["rate limit", () => Response.json({error: "limited"}, {status: 429}), 429],
  ["connection timeout", () => {throw new Error("network failed")}, 503],
]) test(label + " cannot become false success", async () => {
  const app = harness(response), result = await app.post()
  assert.equal(result.status, expected)
  const body = await result.json()
  assert.equal(body.success, undefined)
  assert.ok(body.error)
  assert.doesNotMatch(body.error, /private internal detail/)
  if (expected === 429) assert.equal(result.headers.get("retry-after"), "900")
})
test("new form uses the shared stored receipt contract and explicit Colombia update consent", () => {
  const source = fs.readFileSync(path.join(root, "components/contact-form-section.tsx"), "utf8")
  assert.match(source, /fetch\("\/australia\/api\/contact"/)
  assert.match(source, /"Idempotency-Key": submission.current.key/)
  assert.match(source, /submission.current\?\.body !== body/)
  assert.match(source, /result\?\.status !== "stored"/)
  assert.match(source, /const \[updates, setUpdates\] = useState\(false\)/)
  assert.match(source, /Email me AVES Colombia trip news and updates\. I can unsubscribe at any time\./)
})
