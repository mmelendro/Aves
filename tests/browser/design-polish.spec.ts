import { test, expect, declineOptionalCookies } from "./public-fixture";
const plan = "a13b0801-1c6d-41d4-94da-12e3adeebf13";
test("ten long private briefs stay collapsed with one clear workspace entry each", async ({
  page,
}, info) => {
  test.skip(
    !["desktop", "phone-390"].includes(info.project.name),
    "Dashboard reflow on desktop and phone",
  );
  const notes = "Synthetic private notes. ".repeat(2000);
  await page.route("**/api/account/plans", (r) =>
    r.fulfill({
      json: {
        plans: Array.from({ length: 10 }, (_, i) => ({
          id: `a13b0801-1c6d-41d4-94da-12e3adeebf0${i}`,
          country: "new-zealand",
          title: `Synthetic trip ${i + 1}`,
          regions: ["north-island"],
          travelWhen: "Flexible",
          partySize: "2 people",
          message: notes,
          status: "draft",
          updatedAt: "2026-11-13T00:00:00Z",
        })),
      },
    }),
  );
  await page.route("**/api/account/proposals", (r) =>
    r.fulfill({ json: { proposals: [] } }),
  );
  await page.goto("/browser-fixtures/trip-dashboard");
  await declineOptionalCookies(page);
  await expect(
    page.getByRole("link", { name: "Open trip workspace", exact: true }),
  ).toHaveCount(10);
  await expect(
    page.getByText(notes, { exact: true }).first(),
  ).not.toBeVisible();
  await page
    .getByText("Review brief and notes", { exact: true })
    .first()
    .click();
  await expect(page.getByText(notes, { exact: true }).first()).toBeVisible();
  expect(
    await page
      .getByText(notes, { exact: true })
      .first()
      .evaluate((e) => e.getBoundingClientRect().height),
  ).toBeLessThanOrEqual(320);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("one-day editing preserves changes through day navigation and tab recovery", async ({
  page,
}, info) => {
  test.skip(
    !["desktop", "phone-390"].includes(info.project.name),
    "Planner stages on desktop and phone",
  );
  await page.goto("/new-zealand/north-island#trip-planner");
  await declineOptionalCookies(page);
  await page
    .getByRole("button", { name: "Suggest my itineraries", exact: true })
    .click();
  await expect(
    page.getByRole("article", { name: "Itinerary day 1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("article", { name: "Itinerary day 2", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Next day", exact: true }).click();
  await page
    .getByRole("article", { name: "Itinerary day 2", exact: true })
    .getByRole("combobox", { name: "Birding or nature outing", exact: true })
    .selectOption("");
  await page.getByRole("button", { name: "Previous day", exact: true }).click();
  await page.getByRole("button", { name: "Next day", exact: true }).click();
  await expect(
    page
      .getByRole("article", { name: "Itinerary day 2", exact: true })
      .getByRole("combobox", { name: "Birding or nature outing", exact: true }),
  ).toHaveValue("");
  await page.reload();
  await expect(
    page.getByRole("region", { name: "Recovered draft", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Day to edit", exact: true })
    .selectOption("1");
  await expect(
    page
      .getByRole("article", { name: "Itinerary day 2", exact: true })
      .getByRole("combobox", { name: "Birding or nature outing", exact: true }),
  ).toHaveValue("");
  page.once("dialog", (d) => d.dismiss());
  await page
    .getByRole("button", { name: "Start a new route", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your 5 day draft", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all days", exact: true })
    .click();
  await expect(
    page.getByRole("article", { name: /Itinerary day/ }),
  ).toHaveCount(5);
});
function collection(country = "colombia", image = false) {
  return {
    generatedAt: "2026-11-13T00:00:00Z",
    scope: "Synthetic owner records",
    plansIncluded: 1,
    olderTripsExcluded: false,
    total: 1,
    matched: 1,
    offset: 0,
    limit: 24,
    catalogues: [],
    items: [
      {
        key: `${country}:test`,
        country,
        speciesId: "test",
        commonName: `Synthetic ${country} bird`,
        scientificName: "Testus birdus",
        currentCatalogue: true,
        desired: true,
        observed: false,
        references: [
          {
            planId: plan,
            title: "Synthetic trip",
            recordId: plan,
            state: "desired",
            date: "",
            regionId: "",
          },
        ],
        ownerPhoto: null,
        referenceImage: image
          ? {
              src: "/images/reference-test.webp",
              kind: "Reference photograph",
              creator: "Synthetic creator",
              license: "CC BY 4.0",
              sourceUrl: "https://example.org/source",
              licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
              location: "Synthetic location",
              modifications: "Synthetic test fixture",
            }
          : null,
      },
    ],
  };
}
test("collection filters hide previous results and recover from malformed and expired receipts", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Controlled delayed private receipt",
  );
  let release: (() => void) | undefined,
    mode = "valid";
  await page.route("**/api/account/collection?**", async (r) => {
    const q = new URL(r.request().url()).searchParams;
    if (mode === "expired")
      return r.fulfill({
        status: 401,
        json: { error: "Please sign in again." },
      });
    if (q.get("q")) return r.fulfill({ json: { malformed: true } });
    if (q.get("country") === "australia")
      await new Promise<void>((resolve) => {
        release = resolve;
      });
    return r.fulfill({ json: collection(q.get("country") || "colombia") });
  });
  await page.goto("/browser-fixtures/bird-collection");
  await declineOptionalCookies(page);
  await expect(
    page.getByRole("heading", { name: "Synthetic colombia bird", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Country", exact: true })
    .selectOption("australia");
  await expect(
    page.getByRole("heading", { name: "Synthetic colombia bird", exact: true }),
  ).toHaveCount(0);
  await expect.poll(() => Boolean(release)).toBe(true);
  release!();
  await expect(
    page.getByRole("heading", {
      name: "Synthetic australia bird",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Find a bird", exact: true })
    .fill("malformed");
  await expect(page.getByRole("region", {name:"Your private bird collection", exact:true}).getByRole("alert")).toHaveText(
    "The saved result could not be confirmed. Keep your edits and retry.",
  );
  await expect(
    page.getByRole("heading", {
      name: "Synthetic australia bird",
      exact: true,
    }),
  ).toHaveCount(0);
  mode = "expired";
  await page
    .getByRole("button", { name: "Refresh collection", exact: true })
    .click();
  await expect(
    page.getByRole("link", {
      name: "Sign in to reopen your collection",
      exact: true,
    }),
  ).toBeVisible();
});
test("a failed licensed reference photo retries without losing its attribution", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Synthetic reference image recovery",
  );
  let fail = true;
  await page.route("**/api/account/collection?**", (r) =>
    r.fulfill({ json: collection("colombia", true) }),
  );
  await page.route("**/images/reference-test.webp", (r) =>
    fail
      ? r.fulfill({ status: 404, body: "" })
      : r.fulfill({
          contentType: "image/png",
          body: Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
            "base64",
          ),
        }),
  );
  await page.goto("/browser-fixtures/bird-collection");
  await declineOptionalCookies(page);
  await expect(
    page.getByRole("button", { name: "Retry reference image", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/Synthetic creator/)).toBeVisible();
  fail = false;
  await page
    .getByRole("button", { name: "Retry reference image", exact: true })
    .click();
  await expect
    .poll(() =>
      page
        .getByRole("img", {
          name: "Reference photograph: Synthetic colombia bird",
          exact: true,
        })
        .evaluate((e: HTMLImageElement) => e.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(page.getByText(/Synthetic creator/)).toBeVisible();
});
test("country tree entries, desktop search and Australian tour links stay accessible", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop", "Public navigation structure");
  await page.goto("/site-map");
  await declineOptionalCookies(page);
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Search", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand all", exact: true }).click();
  for (const country of ["Colombia", "Australia", "New Zealand"])
    await expect(
      page.getByRole("link", {
        name: `${country} national bird inventory`,
        exact: true,
      }),
    ).toBeVisible();
  await page.goto("/australia/tours");
  expect(await page.locator("a button,button a").count()).toBe(0);
});
test("credit pagination keeps recording anchors and complete image-source access", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "Server-paginated credit directory",
  );
  await page.goto("/credits");
  await declineOptionalCookies(page);
  await expect(
    page.getByRole("link", { name: "Next checklist credits", exact: true }),
  ).toBeVisible();
  const anchors = await page.locator('[id^="audio-"]').count();
  expect(anchors).toBeGreaterThan(0);
  await page
    .getByRole("link", { name: "Next checklist credits", exact: true })
    .click();
  await expect(page).toHaveURL(/checklist=2/);
  expect(await page.locator('[id^="audio-"]').count()).toBe(anchors);
  await expect(
    page.getByRole("link", { name: "Previous checklist credits", exact: true }),
  ).toBeVisible();
  await page.getByText(/Find all .* checklist image credits/).click();
  const link = page.locator('a[href*="?entry="]').last();
  const href = await link.getAttribute("href");
  await link.click();
  await expect(page).toHaveURL(
    new RegExp(
      "entry=" + new URL(href!, "https://aves.bio").searchParams.get("entry"),
    ),
  );
  await expect(
    page
      .getByRole("link", { name: "Original image and source", exact: true })
      .first(),
  ).toBeVisible();
});

test('a legacy world gallery bookmark still opens its exact reviewed photograph',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'World gallery bookmark compatibility');
 await page.goto('/?explore=colombia&region=central-andes&place=nevado-del-ruiz#place-gallery');await declineOptionalCookies(page);
 await expect(page.locator('#place-gallery').getByRole('heading',{name:'Nevado del Ruiz',exact:true})).toBeVisible();
 await page.reload();await expect(page.locator('#place-gallery').getByRole('heading',{name:'Nevado del Ruiz',exact:true})).toBeVisible();
});
