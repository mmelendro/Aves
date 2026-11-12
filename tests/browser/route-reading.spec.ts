import {test, expect, declineOptionalCookies} from "./public-fixture"

test("route reading keeps historical accounts separate and opens a conservation reference on the map", async ({page}, info) => {
  test.skip(!["desktop", "phone-390"].includes(info.project.name), "Reading and map handoff on desktop and phone")
  await page.goto("/new-zealand/north-island")
  await declineOptionalCookies(page)
  const reading = page.getByRole("region", {name: "Route sources and conservation references", exact: true})
  await expect(reading).toContainText("Oscar Thomas")
  await expect(reading).toContainText("Published 2021-04-21. Historical account.")
  await expect(reading.getByRole("link", {name: /Tiritiri Matangi, Official route reference/})).toHaveAttribute("href", /doc\.govt\.nz/)

  await page.goto("/new-zealand/south-island")
  await expect(reading).toContainText("Sarah Mankelow")
  await expect(reading).toContainText("Published 2011-06-22. Historical account.")
  await reading.getByText("Conservation directory · South Island pilot", {exact: true}).click()
  await reading.getByRole("link", {name: /Show public reference on map.*Orokonui Ecosanctuary/}).click()
  const selected = page.getByRole("region", {name: "Selected public place", exact: true})
  await expect(selected.getByRole("status")).toHaveText("Orokonui Ecosanctuary")
  await expect(page).toHaveURL(/#south-island-bird-map$/)
  await expect(page.getByRole("button", {name: "Preview public place: Orokonui Ecosanctuary", exact: true})).toHaveAttribute("aria-pressed", "true")
})
