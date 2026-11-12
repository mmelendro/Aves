import { test, expect, declineOptionalCookies } from "./public-fixture"

test("map-first discovery defers the hidden photograph and expands to its original resolution", async ({ page }, info) => {
  test.skip(!["desktop", "phone-390"].includes(info.project.name), "Image delivery is checked on desktop and phone; layout uses the full matrix.")
  const images: string[] = []
  page.on("request", request => { if (request.resourceType() === "image") images.push(new URL(request.url()).pathname) })
  await page.goto("/")
  await declineOptionalCookies(page)
  const original = "/images/green-bearded-helmetcrest.png"
  const thumbnail = page.getByRole("button", { name: "View Green-bearded Helmetcrest in the bird guide", exact: true }).locator("img")
  await thumbnail.scrollIntoViewIfNeeded()
  await expect.poll(() => thumbnail.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  expect(await thumbnail.evaluate((image: HTMLImageElement) => new URL(image.currentSrc).pathname)).toMatch(/^\/images\/renditions\//)
  await expect(page.locator("[data-carousel-image] img")).toHaveCount(0)
  expect(images).not.toContain(original)
  await page.getByRole("button", { name: "Turn to the birds", exact: true }).click()
  const photograph = page.locator("[data-carousel-image] img")
  await expect.poll(() => photograph.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  expect(await photograph.evaluate((image: HTMLImageElement) => new URL(image.currentSrc).pathname)).toMatch(/^\/images\/renditions\//)
  await page.locator('button[data-kind="bird"][aria-label^="Expand "]').click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect.poll(() => photograph.evaluate((image: HTMLImageElement) => new URL(image.currentSrc).pathname)).toBe(original)
  await expect(photograph).toHaveAttribute("alt", "Green-bearded Helmetcrest")
  await page.keyboard.press("Escape")
})
