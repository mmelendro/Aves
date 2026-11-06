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

function harness({ results = [], rpcResult = quoteReceipt, authStatus, notificationError, user = {} } = {}) {
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
  assert.deepEqual((await response.json()).plan, { id: planId, ...values, status: "draft", updatedAt: stamp })
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
  assert.match(h.notices[0][4], /https:\/\/aves.bio\/australia\/account/)
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
