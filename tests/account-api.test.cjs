const { test } = require("node:test")
const assert = require("node:assert/strict")
const { createHash } = require("node:crypto")
const loader = require("./helpers/load-ts.cjs")
const ownerId = "19603428-6cb3-4c05-b280-d873ea13d9a4"
const planId = "a13b0801-1c6d-41d4-94da-12e3adeebf13"
const quoteId = "f4fa711d-3730-49df-8c5b-bd90394b428f"
const proposalId = "0dc1eacf-82e0-4b27-b318-4fe19bb95fa5"
const stamp = "2026-11-05T12:34:56.123456+00:00"
const values = { title: "Birding ideas", regions: ["Tasmania"], travelWhen: "Flexible", partySize: "2", message: "Synthetic inquiry" }
const { title, ...details } = values
const planRow = { id: planId, title, details, status: "draft", updated_at: stamp }
const quoteReceipt = { request_id: quoteId, created: true, plan_id: planId, submitted_at: stamp, status: "requested", notification_status: "pending", plan_snapshot: { title, details }, contact_name: "Test Client", contact_email: "client@example.test", plan_updated_at: stamp }
const proposalRow = { id: proposalId, quote_request_id: quoteId, version: 1, status: "draft", total_cents: 123456, currency: "AUD", itinerary: "A considered itinerary", inclusions: "Guiding", exclusions: "Flights", valid_until: "2027-01-01", issued_at: null, updated_at: stamp, notification_status: "pending" }
const proposalBody = { id: proposalId, totalCents: 123456, currency: "AUD", itinerary: proposalRow.itinerary, inclusions: "Guiding", exclusions: "Flights", validUntil: "2027-01-01" }
const request = (body, key = planId, extra = {}) => new Request("https://aves.bio/australia/api/account/plans", { method: "POST", headers: { Origin: "https://aves.bio", "Content-Type": "application/json", "Idempotency-Key": key, ...extra }, body: JSON.stringify(body) })

function harness({ results = [], rpcResult = quoteReceipt, authStatus, notificationError, user = {}, destinations } = {}) {
  const queries = [], rpcCalls = [], notices = [], events = []
  const queue = [...results]
  const client = { from(table) {
    const query = { table, operations: [] }
    queries.push(query)
    const builder = {}
    for (const method of ["select", "eq", "order", "limit", "insert", "update", "delete"]) builder[method] = (...args) => { query.operations.push([method, ...args]); return builder }
    const result = () => {
      if (!queue.length) throw new Error("Unexpected database query")
      return Promise.resolve(queue.shift())
    }
    builder.single = builder.maybeSingle = result
    builder.then = (yes, no) => result().then(yes, no)
    return builder
  } }
  let AccountError
  const load = loader({ mocks: {
    ...(destinations ? { "@/content/trip-options": destinations } : {}),
    "@/lib/account-auth": { requireAccountUser: async () => { if (authStatus) throw new AccountError(authStatus, "Access denied"); return { user: { id: ownerId, email: "client@example.test", ...user }, client } } },
    "@/lib/account-service": { accountRpc: async (name, body) => { events.push("store"); rpcCalls.push({ name, body }); if (typeof rpcResult === "function") return rpcResult(name, body, AccountError); return rpcResult } },
    "@/lib/account-notifications": { notifyAccount: async (...args) => { events.push("email"); notices.push(args); if (notificationError) throw new Error("private provider detail"); return "accepted" } },
  } })
  AccountError = load("lib/account-errors.ts").AccountError
  return { ...load("lib/account-handlers.ts"), queries, rpcCalls, notices, events }
}

test("a saved trip retains all newly selectable Australian regions", async () => {
  const { regionOptions } = loader()("content/region-options.ts")
  const selectedRegions = regionOptions.map(region => region.id)
  const expandedValues = { ...values, regions: selectedRegions }
  const h = harness({ results: [{ data: { ...planRow, details: { ...details, regions: selectedRegions } }, error: null }] })
  const response = await h.plansPost(request({ id: planId, ...expandedValues }))
  assert.equal(response.status, 200)
  const insertion = h.queries[0].operations.find(([method]) => method === "insert")[1]
  assert.deepEqual(insertion.details.regions, selectedRegions)
  assert.deepEqual((await response.json()).plan.regions, selectedRegions)
})

test("draft creation derives owner from verified session, not metadata", async () => {
  const h = harness({ results: [{ data: planRow, error: null }], user: { user_metadata: { user_id: "other", role: "admin" } } })
  const response = await h.plansPost(request({ id: planId, ...values }))
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "private, no-store")
  const insertion = h.queries[0].operations.find(([method]) => method === "insert")[1]
  assert.equal(insertion.user_id, ownerId)
  assert.equal(insertion.status, undefined)
  assert.match(insertion.create_payload_hash, /^[a-f0-9]{64}$/)
  assert.deepEqual((await response.json()).plan, { id: planId, ...values, country: "australia", status: "draft", updatedAt: stamp })
})

test("draft replay uses immutable creation hash even after later draft edits", async () => {
  const originalHash = createHash("sha256").update(JSON.stringify({ title, details })).digest("hex")
  const h = harness({ results: [{ data: null, error: { code: "23505" } }, { data: { ...planRow, title: "Edited", create_payload_hash: originalHash }, error: null }] })
  const response = await h.plansPost(request({ id: planId, ...values }))
  assert.equal(response.status, 200)
  assert.equal((await response.json()).plan.title, "Edited")
  assert.ok(h.queries[1].operations.some(op => op[0] === "eq" && op[1] === "user_id" && op[2] === ownerId))
})

test("draft reuse with a different payload conflicts", async () => {
  const h = harness({ results: [{ data: null, error: { code: "23505" } }, { data: { ...planRow, create_payload_hash: "different" }, error: null }] })
  assert.equal((await h.plansPost(request({ id: planId, ...values }))).status, 409)
})

test("explicit Australia and absent country preserve the old creation hash on replay", async () => {
  const originalHash = createHash("sha256").update(JSON.stringify({ title, details })).digest("hex")
  for (const country of [undefined, "australia"]) {
    const h = harness({ results: [{ data: null, error: { code: "23505" } }, { data: { ...planRow, create_payload_hash: originalHash }, error: null }] })
    const response = await h.plansPost(request({ id: planId, ...values, country }))
    assert.equal(response.status, 200)
    assert.equal((await response.json()).plan.country, "australia")
  }
})

test("all eleven Colombian regions are stored with their country", async () => {
  const regions = loader()("content/trip-options.ts").countryRegionOptions.colombia.map(region => region.id)
  assert.equal(regions.length, 11)
  const h = harness({ results: [{ data: { ...planRow, details: { ...details, country: "colombia", regions } }, error: null }] })
  const response = await h.plansPost(request({ id: planId, ...values, country: "colombia", regions }))
  assert.equal(response.status, 200)
  const stored = h.queries[0].operations.find(op => op[0] === "insert")[1]
  assert.equal(stored.details.country, "colombia")
  assert.deepEqual(stored.details.regions, regions)
  assert.equal((await response.json()).plan.country, "colombia")
})

for (const [country, regions] of [["colombia", ["pacific", "tasmania"]], ["australia", ["queensland", "llanos"]]]) {
  test(`${country} new plan rejects mixed-country regions before insertion`, async () => {
    const h = harness({ results: [{ data: null, error: null }] })
    assert.equal((await h.plansPost(request({ id: planId, ...values, country, regions }))).status, 400)
    assert.ok(h.queries.every(query => !query.operations.some(op => op[0] === "insert")))
  })
}

test("a legacy freeform plan can be replayed or edited without accepting new arbitrary regions", async () => {
  const legacyDetails = { ...details, regions: ["North Queensland rainforest"] }
  const original = { ...planRow, details: legacyDetails, create_payload_hash: createHash("sha256").update(JSON.stringify({ title, details: legacyDetails })).digest("hex") }
  const replay = harness({ results: [{ data: original, error: null }] })
  assert.equal((await replay.plansPost(request({ id: planId, ...values, regions: legacyDetails.regions }))).status, 200)
  assert.ok(replay.queries[0].operations.every(op => op[0] !== "insert"))
  const edit = harness({ results: [{ data: original, error: null }, { data: original, error: null }] })
  assert.equal((await edit.planPatch(request({ ...values, country: "australia", regions: legacyDetails.regions, expectedUpdatedAt: stamp }), planId)).status, 200)
  const added = harness({ results: [{ data: original, error: null }] })
  assert.equal((await added.planPatch(request({ ...values, regions: [...legacyDetails.regions, "Another unknown place"], expectedUpdatedAt: stamp }), planId)).status, 400)
})

test("Colombia quote response and owner notification preserve the frozen country", async () => {
  const h = harness({ rpcResult: { ...quoteReceipt, plan_snapshot: { title, details: { ...details, country: "colombia", regions: ["pacific"] } } } })
  const response = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test Client" }, quoteId), planId)
  assert.equal((await response.json()).plan.country, "colombia")
  assert.match(h.notices[0][3], /AVES Colombia/)
  assert.match(h.notices[0][4], /Country: Colombia/)
})

test("a newly enabled destination persists through create, edit, quote and owner notification", async () => {
  const destinations = require("./helpers/destination-fixture.cjs")()
  const thirdDetails = { ...details, regions: ["test-cloud-forest"], country: "test-islands" }
  const row = { ...planRow, details: thirdDetails }
  const h = harness({ destinations, results: [{ data: row, error: null }, { data: row, error: null }, { data: row, error: null }], rpcResult: { ...quoteReceipt, plan_snapshot: { title, details: thirdDetails } } })
  const create = await h.plansPost(request({ id: planId, title, ...thirdDetails }))
  assert.equal(create.status, 200)
  assert.equal((await create.json()).plan.country, "test-islands")
  assert.equal(h.queries[0].operations.find(op => op[0] === "insert")[1].details.country, "test-islands")
  const edit = await h.planPatch(request({ title, ...thirdDetails, expectedUpdatedAt: stamp }), planId)
  assert.equal(edit.status, 200)
  assert.equal(h.queries[2].operations.find(op => op[0] === "update")[1].details.country, "test-islands")
  const quote = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test Client" }, quoteId), planId)
  assert.equal((await quote.json()).plan.country, "test-islands")
  assert.match(h.notices[0][3], /AVES Test Islands/)
  assert.match(h.notices[0][4], /Country: Test Islands/)
})

test("unknown countries are rejected before account data access", async () => {
  for (const country of ["unknown", "__proto__", "", null]) {
    const h = harness()
    assert.equal((await h.plansPost(request({ id: planId, ...values, country }))).status, 400)
    assert.equal((await h.planPatch(request({ ...values, country, expectedUpdatedAt: stamp }), planId)).status, 400)
    assert.equal(h.queries.length, 0)
  }
})

test("disabled destinations cannot create a new plan or replace an existing plan country", async () => {
  for (const country of ["ecuador", "costa-rica", "test-islands"]) {
    const destinations = require("./helpers/destination-fixture.cjs")({ enabled: false })
    const h = harness({ destinations, results: [{ data: null, error: null }, { data: planRow, error: null }] })
    assert.equal((await h.plansPost(request({ id: planId, ...values, country, regions: [] }))).status, 400)
    assert.equal((await h.planPatch(request({ ...values, country, regions: [], expectedUpdatedAt: stamp }), planId)).status, 400)
    assert.equal(h.queries.length, 2)
    assert.ok(h.queries.every(query => query.operations.every(op => !["insert", "update"].includes(op[0]))))
  }
})

test("a destination disabled after launch preserves exact owned replays and same-country draft edits", async () => {
  const destinations = require("./helpers/destination-fixture.cjs")({ enabled: false })
  const savedDetails = { ...details, regions: ["test-cloud-forest"], country: "test-islands" }
  const originalHash = createHash("sha256").update(JSON.stringify({ title, details: savedDetails })).digest("hex")
  const row = { ...planRow, details: savedDetails, create_payload_hash: originalHash }
  const h = harness({ destinations, results: [{ data: row, error: null }, { data: row, error: null }, { data: row, error: null }] })
  const replay = await h.plansPost(request({ id: planId, title, ...savedDetails }))
  assert.equal(replay.status, 200)
  assert.equal((await replay.json()).plan.country, "test-islands")
  assert.equal(h.queries[0].operations.some(op => op[0] === "insert"), false)
  const edit = await h.planPatch(request({ title: "Refined saved trip", ...savedDetails, expectedUpdatedAt: stamp }), planId)
  assert.equal(edit.status, 200)
  const update = h.queries[2].operations.find(op => op[0] === "update")[1]
  assert.equal(update.title, "Refined saved trip")
  assert.equal(update.details.country, "test-islands")
  for (const condition of [["eq", "user_id", ownerId], ["eq", "status", "draft"], ["eq", "updated_at", stamp]]) assert.ok(h.queries[2].operations.some(op => JSON.stringify(op) === JSON.stringify(condition)))

  const changed = harness({ destinations, results: [{ data: row, error: null }] })
  assert.equal((await changed.plansPost(request({ id: planId, title: "Changed retry", ...savedDetails }))).status, 400)
  assert.equal(changed.queries.length, 1)
  const wrongCountry = harness({ destinations, results: [{ data: { ...row, details: { ...savedDetails, country: "colombia" } }, error: null }] })
  assert.equal((await wrongCountry.plansPost(request({ id: planId, title, ...savedDetails }))).status, 400)

  for (const [state, body, expected] of [
    [{ ...row, status: "quote_requested" }, { title, ...savedDetails, expectedUpdatedAt: stamp }, 409],
    [row, { title, ...savedDetails, regions: ["pacific"], expectedUpdatedAt: stamp }, 400],
    [row, { title, ...savedDetails, expectedUpdatedAt: "2026-11-01T00:00:00Z" }, 409],
  ]) {
    const rejected = harness({ destinations, results: [{ data: state, error: null }] })
    assert.equal((await rejected.planPatch(request(body), planId)).status, expected)
    assert.equal(rejected.queries.length, 1)
  }
})

test("Colombian plan creation preserves the pre-registry payload hash", async () => {
  const colombiaDetails = { regions: ["pacific"], travelWhen: values.travelWhen, partySize: values.partySize, message: values.message, country: "colombia" }
  const expectedHash = createHash("sha256").update(JSON.stringify({ title, details: colombiaDetails })).digest("hex")
  const h = harness({ results: [{ data: { ...planRow, details: colombiaDetails }, error: null }] })
  assert.equal((await h.plansPost(request({ id: planId, title, ...colombiaDetails }))).status, 200)
  assert.equal(h.queries[0].operations.find(op => op[0] === "insert")[1].create_payload_hash, expectedHash)
})

test("third-country regions cannot pass the Australian legacy edit exception", async () => {
  const destinations = require("./helpers/destination-fixture.cjs")()
  const legacy = { ...planRow, details: { ...details, regions: ["Test Cloud Forest"] } }
  const h = harness({ destinations, results: [{ data: legacy, error: null }] })
  assert.equal((await h.planPatch(request({ ...values, regions: legacy.details.regions, expectedUpdatedAt: stamp }), planId)).status, 400)
  assert.equal(h.queries.length, 1)
})

test("draft capacity conflict explains how to free space without a misleading retry timer", async () => {
  const h = harness({ results: [{ data: null, error: { code: "PT409", message: "private database detail" } }] })
  const response = await h.plansPost(request({ id: planId, ...values }))
  assert.equal(response.status, 409)
  assert.equal(response.headers.get("retry-after"), null)
  assert.match((await response.json()).error, /50 draft plans.*Delete.*submit/)
  assert.equal(h.queries.length, 1)
  assert.equal(h.notices.length, 0)
})

test("draft collision with another owner's ID reveals no plan", async () => {
  const h = harness({ results: [{ data: null, error: { code: "23505" } }, { data: null, error: null }] })
  assert.equal((await h.plansPost(request({ id: planId, ...values }))).status, 404)
})

for (const operation of ["planPatch", "planDelete"]) {
  test(`${operation} denies other-owner/missing plans before mutation`, async () => {
    const h = harness({ results: [{ data: null, error: null }] })
    assert.equal((await h[operation](request(operation === "planPatch" ? { ...values, expectedUpdatedAt: stamp } : { expectedUpdatedAt: stamp }), planId)).status, 404)
    assert.equal(h.queries.length, 1)
    assert.ok(h.queries[0].operations.some(op => op[0] === "eq" && op[1] === "user_id" && op[2] === ownerId))
  })
  test(`${operation} cannot change a submitted plan`, async () => {
    const h = harness({ results: [{ data: { ...planRow, status: "quote_requested" }, error: null }] })
    assert.equal((await h[operation](request(operation === "planPatch" ? { ...values, expectedUpdatedAt: stamp } : { expectedUpdatedAt: stamp }), planId)).status, 409)
    assert.equal(h.queries.length, 1)
  })
}

test("draft update binds ownership, draft state and exact microsecond revision atomically", async () => {
  const h = harness({ results: [{ data: planRow, error: null }, { data: planRow, error: null }] })
  assert.equal((await h.planPatch(request({ ...values, expectedUpdatedAt: stamp }), planId)).status, 200)
  for (const condition of [["eq", "id", planId], ["eq", "user_id", ownerId], ["eq", "status", "draft"], ["eq", "updated_at", stamp]]) assert.ok(h.queries[1].operations.some(op => JSON.stringify(op) === JSON.stringify(condition)))
})

test("an update racing with quote submission returns conflict", async () => {
  const h = harness({ results: [{ data: planRow, error: null }, { data: null, error: null }] })
  assert.equal((await h.planPatch(request({ ...values, expectedUpdatedAt: stamp }), planId)).status, 409)
})

for (const [label, body, headers] of [
  ["forged owner", { id: planId, ...values, user_id: "other" }, {}],
  ["forged status", { id: planId, ...values, status: "quote_requested" }, {}],
  ["cross-site form", { id: planId, ...values }, { Origin: "https://attacker.test" }],
  ["missing key", { id: planId, ...values }, { "Idempotency-Key": "" }],
]) {
  test(`${label} is rejected before database access`, async () => {
    const h = harness()
    const response = await h.plansPost(request(body, planId, headers))
    assert.ok([400, 403].includes(response.status))
    assert.equal(h.queries.length, 0)
  })
}

test("list plans and client proposals always filter by verified owner; drafts never appear as proposals", async () => {
  const h = harness({ results: [{ data: [], error: null }, { data: [], error: null }] })
  assert.deepEqual(await (await h.plansGet()).json(), { plans: [], isAdmin: false })
  assert.deepEqual(await (await h.proposalsGet()).json(), { proposals: [] })
  assert.ok(h.queries[0].operations.some(op => op[1] === "user_id" && op[2] === ownerId))
  assert.ok(h.queries[1].operations.some(op => op[1] === "client_user_id" && op[2] === ownerId))
  assert.ok(h.queries[1].operations.some(op => op[1] === "status" && op[2] === "sent"))
  assert.equal(h.queries[1].operations.find(op => op[0] === "select")[1],
    "id,quote_request_id,client_user_id,version,status,total_cents,currency,itinerary,inclusions,exclusions,valid_until,issued_at,updated_at,notification_status")
})

test("quote saves authenticated owner/email and immutable snapshot before owner notification", async () => {
  const h = harness()
  const response = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test Client" }, quoteId), planId)
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.status, "stored")
  assert.equal(body.plan.status, "quote_requested")
  assert.equal(body.plan.updatedAt, stamp)
  assert.deepEqual(h.events, ["store", "email"])
  assert.equal(h.rpcCalls[0].body.p_client_user_id, ownerId)
  assert.equal(h.rpcCalls[0].body.p_contact_email, "client@example.test")
  assert.equal(h.rpcCalls[0].body.p_expected_updated_at, stamp)
  assert.equal(h.notices[0][2], "mmelendro@gmail.com")
})

test("quote replay never repeats notification", async () => {
  const h = harness({ rpcResult: { ...quoteReceipt, created: false } })
  assert.equal((await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test Client" }, quoteId), planId)).status, 200)
  assert.equal(h.notices.length, 0)
})

test("quote notification failure cannot reverse durable stored success", async () => {
  const h = harness({ notificationError: true })
  const response = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test Client" }, quoteId), planId)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).status, "stored")
})

for (const status of [401, 403]) {
  test(`unverified session ${status} cannot reach data or privileged RPCs`, async () => {
    const h = harness({ authStatus: status })
    assert.equal((await h.plansGet()).status, status)
    assert.equal((await h.adminQuotesGet()).status, status)
    assert.equal((await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test" }), planId)).status, status)
    assert.equal(h.queries.length, 0)
    assert.equal(h.rpcCalls.length, 0)
  })
}

test("editable user metadata cannot grant owner inbox access", async () => {
  const h = harness({ user: { user_metadata: { role: "admin" } }, rpcResult: (_name, body, ErrorType) => { assert.deepEqual(body, { p_admin_user_id: ownerId, p_limit: 100 }); throw new ErrorType(403, "No access") } })
  assert.equal((await h.adminQuotesGet()).status, 403)
})

test("owner navigation flag comes only from a verified database boolean", async () => {
  for (const databaseValue of [true, false, { isAdmin: true }]) {
    const h = harness({ results: [{ data: [], error: null }], rpcResult: (name, body) => { assert.equal(name, "account_admin_status"); assert.deepEqual(body, { p_user_id: ownerId }); return databaseValue } })
    assert.equal((await (await h.plansGet()).json()).isAdmin, databaseValue === true)
  }
})

test("failed owner lookup hides the inbox link while leaving the client's own plans available", async () => {
  const h = harness({ results: [{ data: [planRow], error: null }], rpcResult: () => { throw new Error("private lookup error") } })
  const response = await h.plansGet()
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.isAdmin, false)
  assert.equal(body.plans.length, 1)
})

test("account payload size is bounded in UTF-8 bytes before any database query", async () => {
  const h = harness()
  assert.equal((await h.plansPost(request({ id: planId, ...values, message: "é".repeat(17000) }))).status, 413)
  assert.equal(h.queries.length, 0)
})

for (const amount of [0, -1, 12.34, 100000001, "123456"]) {
  test(`proposal amount ${amount} is rejected before privileged storage`, async () => {
    const h = harness()
    assert.equal((await h.proposalPost(request({ ...proposalBody, totalCents: amount }, proposalId), quoteId)).status, 400)
    assert.equal(h.rpcCalls.length, 0)
  })
}

test("proposal draft retains exact AUD cents and derives admin identity from session", async () => {
  const h = harness({ rpcResult: { created: true, proposal: proposalRow } })
  const response = await h.proposalPost(request(proposalBody, proposalId), quoteId)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).proposal.totalCents, 123456)
  assert.equal(h.rpcCalls[0].body.p_admin_user_id, ownerId)
  assert.equal(h.rpcCalls[0].body.p_details.totalCents, 123456)
  assert.equal(h.notices.length, 0)
})

test("issuing a proposal commits before notifying only its server-returned client address", async () => {
  const h = harness({ rpcResult: { issued: true, proposal: { ...proposalRow, status: "sent", issued_at: stamp }, contact_name: "Client", contact_email: "verified@example.test" } })
  const response = await h.proposalSend(request({ expectedUpdatedAt: stamp }, quoteId), proposalId)
  assert.equal(response.status, 200)
  const issued = await response.json()
  assert.equal(issued.status, "sent")
  assert.equal(issued.proposal.notificationStatus, "accepted")
  assert.deepEqual(h.events, ["store", "email"])
  assert.equal(h.notices[0][2], "verified@example.test")
  assert.match(h.notices[0][4], /https:\/\/aves.bio\/account/)
  assert.doesNotMatch(h.notices[0][4], /token=|secret=|proposalId=/)
})

test("issued proposal replay sends no duplicate email", async () => {
  const h = harness({ rpcResult: { issued: false, proposal: { ...proposalRow, status: "sent" } } })
  assert.equal((await h.proposalSend(request({ expectedUpdatedAt: stamp }, quoteId), proposalId)).status, 200)
  assert.equal(h.notices.length, 0)
})

test("client-visible issued proposal remains successful after notification failure", async () => {
  const h = harness({ rpcResult: { issued: true, proposal: { ...proposalRow, status: "sent" }, contact_name: "Client", contact_email: "verified@example.test" }, notificationError: true })
  const response = await h.proposalSend(request({ expectedUpdatedAt: stamp }, quoteId), proposalId)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).proposal.status, "sent")
})

for (const status of [403, 404, 409, 429, 503]) {
  test(`quote storage ${status} never sends email or claims success`, async () => {
    const h = harness({ rpcResult: (_name, _body, ErrorType) => { throw new ErrorType(status, "Unable to save") } })
    const response = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Test" }, quoteId), planId)
    assert.equal(response.status, status)
    assert.equal(h.notices.length, 0)
    assert.doesNotMatch(await response.text(), /success|stored/)
  })
}


const nzAnswers = { version: 1, pace: "balanced", birding: "alternate", comfort: "comfortable", interests: ["birds", "food"] }
const nzDetails = { ...details, country: "new-zealand", regions: ["south-island"], questionnaire: nzAnswers }

test("NZ questionnaire survives create, edit and frozen submission; email contains no answers", async () => {
  const row = { ...planRow, details: nzDetails }
  const h = harness({ results: [{ data: row, error: null }, { data: row, error: null }, { data: row, error: null }], rpcResult: { ...quoteReceipt, plan_snapshot: { title, details: nzDetails } } })
  const fields = { title, ...nzDetails }
  const created = await h.plansPost(request({ id: planId, ...fields }))
  assert.equal(created.status, 200)
  assert.deepEqual((await created.json()).plan.questionnaire, nzAnswers)
  const edited = await h.planPatch(request({ ...fields, expectedUpdatedAt: stamp }), planId)
  assert.equal(edited.status, 200)
  assert.deepEqual((await edited.json()).plan.questionnaire, nzAnswers)
  const submitted = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Synthetic Guest" }, quoteId), planId)
  assert.equal(submitted.status, 200)
  assert.deepEqual((await submitted.json()).plan.questionnaire, nzAnswers)
  const notice = h.notices[0]
  assert.match(notice[3], /New Zealand planning brief/)
  assert.match(notice[4], /https:\/\/aves.bio\/australia\/admin\/quotes/)
  assert.doesNotMatch(notice.join(" "), /Synthetic Guest|client@example.test|alternate|comfortable|Synthetic inquiry/)
})

test("NZ answers reject unknown fields, bad versions, duplicates and other-country association", async () => {
  for (const bad of [{ ...nzAnswers, role: "owner" }, { ...nzAnswers, version: 2 }, { ...nzAnswers, pace: "made-up" }, { ...nzAnswers, interests: ["birds", "birds"] }, null]) {
    const h = harness()
    const response = await h.plansPost(request({ id: planId, title, ...nzDetails, questionnaire: bad }))
    assert.equal(response.status, 400)
    assert.equal(h.queries.length, 0)
  }
  const h = harness()
  assert.equal((await h.plansPost(request({ id: planId, title, ...nzDetails, country: "colombia", regions: ["pacific"] }))).status, 400)
  assert.equal(h.queries.length, 0)
})

test("NZ questionnaire is preserved in the authorized owner inbox response", async () => {
  const h = harness({ rpcResult: [{ id: quoteId, plan_id: planId, status: "requested", plan_snapshot: { title, details: nzDetails } }] })
  const response = await h.adminQuotesGet()
  assert.equal(response.status, 200)
  assert.deepEqual((await response.json()).quotes[0].plan.questionnaire, nzAnswers)
})


const nzCatalogue = loader()("content/new-zealand-checklist.ts")
const nzBirdIds = nzCatalogue.selectableNzBirds.slice(0, 3).map(bird => bird.id)
test("bird targets survive owned save/edit, immutable submission and owner reading", async () => {
  const answers = { ...nzAnswers, birdIds: nzBirdIds }
  const birdDetails = { ...nzDetails, questionnaire: answers }
  const row = { ...planRow, details: birdDetails }
  const h = harness({ results: [{ data: row, error: null }, { data: row, error: null }, { data: row, error: null }], rpcResult: { ...quoteReceipt, plan_snapshot: { title, details: birdDetails } } })
  const fields = { title, ...birdDetails }
  const saved = await h.plansPost(request({ id: planId, ...fields }))
  assert.equal(saved.status, 200)
  assert.deepEqual((await saved.json()).plan.questionnaire.birdIds, nzBirdIds)
  const updated = await h.planPatch(request({ ...fields, expectedUpdatedAt: stamp }), planId)
  assert.deepEqual((await updated.json()).plan.questionnaire.birdIds, nzBirdIds)
  const sent = await h.quotePost(request({ expectedUpdatedAt: stamp, contactName: "Synthetic QA" }, quoteId), planId)
  assert.deepEqual((await sent.json()).plan.questionnaire.birdIds, nzBirdIds)
  assert.ok(nzBirdIds.every(id => !h.notices[0].join(" ").includes(id)))
  const owner = harness({ rpcResult: [{ id: quoteId, plan_id: planId, status: "requested", plan_snapshot: { title, details: birdDetails } }] })
  assert.deepEqual((await (await owner.adminQuotesGet()).json()).quotes[0].plan.questionnaire.birdIds, nzBirdIds)
})

test("invalid, duplicate and extinct targets fail before account writes", async () => {
  for (const birdIds of [[nzBirdIds[0], nzBirdIds[0]], ["nz-000000000000"], [nzCatalogue.newZealandChecklist.find(bird => bird.extinct).id]]) {
    const h = harness()
    assert.equal((await h.plansPost(request({ id: planId, title, ...nzDetails, questionnaire: { ...nzAnswers, birdIds } }))).status, 400)
    assert.equal(h.queries.length, 0)
  }
})
