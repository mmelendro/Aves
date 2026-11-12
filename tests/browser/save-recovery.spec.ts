import { test, expect, declineOptionalCookies } from "./public-fixture"

test("a lost save receipt preserves answers and an unchanged retry uses the same key", async ({page}, info) => {
  test.skip(!["desktop", "phone-390"].includes(info.project.name), "Synthetic form journey on desktop and phone")
  const attempts: {key: string | undefined; body: Record<string, unknown>}[] = []
  // Fulfil locally before the public fixture's network deny rule. No request reaches an API.
  await page.route("**/api/account/plans", async route => {
    const body = route.request().postDataJSON()
    attempts.push({key: route.request().headers()["idempotency-key"], body})
    if (attempts.length === 1) return route.fulfill({status: 503, json: {error: "Synthetic lost receipt. Keep your answers and retry."}})
    await route.fulfill({json: {plan: {...body, status: "draft", updatedAt: "2026-11-13T00:00:00Z"}}})
  })
  await page.goto("/browser-fixtures/trip-editor")
  await declineOptionalCookies(page)
  await page.getByLabel("Give Your Plan a Name", {exact: false}).fill("Synthetic North Island plan")
  await page.getByLabel("Your Interests and Ideas", {exact: true}).fill("Synthetic notes retained after failure")
  await page.getByRole("button", {name: "Save My Draft", exact: true}).click()
  await expect(page.locator("form").getByRole("alert")).toContainText("Keep your answers")
  await expect(page.getByLabel("Your Interests and Ideas", {exact: true})).toHaveValue("Synthetic notes retained after failure")
  await expect(page.getByRole("heading", {name: "Confirmed synthetic draft"})).toHaveCount(0)
  await page.getByRole("button", {name: "Save My Draft", exact: true}).click()
  await expect(page.getByRole("heading", {name: "Confirmed synthetic draft"})).toBeVisible()
  expect(attempts).toHaveLength(2)
  expect(attempts[0].key).toBeTruthy()
  expect(attempts[1]).toEqual(attempts[0])
})

