import { test as base, expect, type Page } from "@playwright/test"

// Every journey owns a fresh browser context. Only the local public build can
// receive requests, and these tests never submit a form or contact a provider.
export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route("**/*", route => {
      const request = route.request()
      return new URL(request.url()).origin === "http://127.0.0.1:3100" && ["GET", "HEAD"].includes(request.method())
        ? route.continue() : route.abort()
    })
    await use(context)
  },
})
export { expect }

export async function declineOptionalCookies(page: Page) {
  const decline = page.getByRole("button", { name: "Reject Non-Essential", exact: true })
  await expect(decline).toBeVisible()
  await decline.click()
}
