import { test, expect, declineOptionalCookies } from "./public-fixture"
import type { Route } from "@playwright/test"

test("a failed landscape photograph retries the same credited source", async ({ page }, info) => {
  test.skip(!["desktop", "phone-390"].includes(info.project.name), "Failure recovery uses desktop and phone; regular reflow uses the complete matrix.")
  const failImages = (route: Route) => route.request().resourceType() === "image" ? route.abort() : route.fallback()
  await page.route("**/*", failImages)
  await page.goto("/australia/regions/new-south-wales")
  await declineOptionalCookies(page)
  const gallery = page.locator("#place-gallery")
  await expect(gallery.getByRole("button", { name: "Try Photograph Again", exact: true })).toBeVisible()
  const caption = await gallery.locator("h3").allTextContents()
  const alt = await gallery.locator('p[role="status"] + p').innerText()
  await page.unroute("**/*", failImages)
  await gallery.getByRole("button", { name: "Try Photograph Again", exact: true }).click()
  await expect.poll(() => gallery.locator("[data-place-image] img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await expect(gallery.getByRole("button", { name: "Try Photograph Again", exact: true })).toHaveCount(0)
  expect(await gallery.locator("h3").allTextContents()).toEqual(caption)
  await expect(gallery.locator("[data-place-image] img")).toHaveAttribute("alt", alt)
})
