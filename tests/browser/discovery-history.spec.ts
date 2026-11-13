import { test, expect, declineOptionalCookies } from "./public-fixture"

test("country and region history restores selection, copy and return paths", async ({ page }) => {
  test.setTimeout(90_000)
  await page.goto("/")
  await declineOptionalCookies(page)
  const title = await page.title()
  const heading = await page.getByRole("heading", { level: 1 }).getAttribute("aria-label")
  const choices = page.getByRole("group", { name: "Choose a country to preview", exact: true })
  const selected = (scope: string) => page.locator(`[data-explorer-content="${scope}"]`)
  for (const [country, id, region, label] of [
    ["Colombia", "colombia", "eastern-andes", "Eastern Andes"],
    ["Australia", "australia", "new-south-wales", "New South Wales"],
    ["New Zealand", "new-zealand", "north-island", "North Island"],
  ]) {
    await choices.getByRole("button", { name: country, exact: true }).click()
    await expect(selected(`${id}:`)).toBeVisible()
    const mapName = country === "Colombia" ? "Choose a Colombian planning region" : country === "Australia" ? "Australian states and territories" : "New Zealand main islands"
    await expect(page.getByRole("group", { name: mapName, exact: true })).toBeVisible()
    await page.locator("#homepage-region").selectOption(region)
    await expect(selected(`${id}:${region}`)).toContainText(label)
    await expect(page.getByLabel("Landscape region", { exact: true })).toHaveCount(0)
    await expect(selected(`${id}:${region}`).getByRole("link", { name: /Explore/ })).toHaveAttribute("href", new RegExp(region))
    await expect(selected(`${id}:${region}`).getByRole("link", { name: /Discuss your/ })).toHaveCount(0)
    await expect(page.getByRole("button", { name: `Back to ${country}`, exact: true })).toBeVisible()
  }
  await page.reload()
  await expect(selected("new-zealand:north-island")).toContainText("North Island")
  await expect(page.locator("#homepage-region")).toHaveValue("north-island")
  await page.goBack()
  await expect(selected("new-zealand:")).toBeVisible()
  await page.goBack()
  await expect(selected("australia:new-south-wales")).toContainText("New South Wales")
  await page.goForward()
  await expect(selected("new-zealand:")).toBeVisible()
  await page.goForward()
  await expect(selected("new-zealand:north-island")).toContainText("North Island")
  await expect(page).toHaveTitle(title)
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(heading!)
  await page.getByRole("button", { name: "Back to world", exact: true }).click()
  await expect(page.locator("[data-explorer-content]")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Choose your next destination", exact: true })).toBeVisible()
})

for (const path of ["/colombia", "/australia/regions/new-south-wales", "/new-zealand/north-island"]) {
  test(`mounted page survives a different-country deep link: ${path}`, async ({ page }, info) => {
    test.skip(!["desktop", "phone-390"].includes(info.project.name), "Cross-country journey uses all projects; each page shell also uses desktop and phone.")
    await page.goto(path)
    await declineOptionalCookies(page)
    await page.getByRole("group", { name: "Choose a country to preview", exact: true }).getByRole("button", { name: "Australia", exact: true }).click()
    await page.locator("#homepage-region").selectOption("tasmania")
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Tasmania")
    const heading = await page.getByRole("heading", { level: 1 }).innerText()
    const title = `${heading} | AVES`
    await expect(page).toHaveTitle(title)
    await page.reload()
    await expect(page.locator('[data-explorer-content="australia:tasmania"]')).toContainText("Tasmania")
    await expect(page).toHaveURL(new RegExp(`${path.replaceAll("/", "\\/")}\\?explore=australia&region=tasmania`))
    await expect(page).toHaveTitle(title)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading)
    await page.goBack()
    await expect(page.locator('[data-explorer-content="australia:"]')).toBeVisible()
    await page.goForward()
    await expect(page.locator("#homepage-region")).toHaveValue("tasmania")
    await page.getByLabel("Landscape region", { exact: true }).selectOption("queensland")
    await expect(page.locator("#homepage-region")).toHaveValue("queensland")
    await expect(page.locator('[data-explorer-content="australia:queensland"]')).toContainText("Queensland")
  })
}
