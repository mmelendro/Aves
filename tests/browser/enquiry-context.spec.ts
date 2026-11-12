import { test, expect, declineOptionalCookies } from "./public-fixture"

test("public enquiry keeps its country, region and supported intent", async ({ page }, info) => {
  test.skip(!["desktop", "phone-390"].includes(info.project.name), "Contact context uses desktop and phone; public accessibility uses the full matrix.")
  await page.goto("/contact?country=colombia&region=sierra-nevada-de-santa-marta&tour=vision#inquiry")
  await declineOptionalCookies(page)
  await expect(page.getByRole("checkbox", { name: /Vision Tours/ })).toBeChecked()
  await expect(page.getByRole("checkbox", { name: /Sierra Nevada de Santa Marta/ })).toBeChecked()
  await expect(page.locator("#inquiry")).toBeVisible()
  await page.goto("/contact?country=australia&region=tasmania#inquiry")
  await expect(page.getByRole("combobox", { name: "Preferred Australian Region", exact: true })).toHaveValue("Tasmania")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Australian")
  await expect(page.getByRole("main")).toHaveCount(1)
  await page.goto("/contact?country=australia&region=tasmania&intent=waitlist#inquiry")
  await expect(page.getByRole("heading", { name: "Be Part of Our Australian Beginning", exact: true })).toBeVisible()
  await page.goto("/contact?country=new-zealand&region=north-island#inquiry")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ask About New Zealand")
  await expect(page.getByText("Your selected place: North Island · New Zealand", { exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByText("Your selected place: North Island · New Zealand", { exact: true })).toBeVisible()
  // No submit action: every request is read-only, and no inquiry is sent.
})
