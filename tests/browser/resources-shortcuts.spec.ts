import {test, expect, declineOptionalCookies} from "./public-fixture"
test("resource shortcuts select the intended panel, including when another panel was active", async ({page}, info) => {
 test.skip(!["desktop","phone-390"].includes(info.project.name), "Shortcut journey on desktop and phone")
 await page.goto("/resources")
 await declineOptionalCookies(page)
 await page.getByRole("button",{name:"15+ Expert Podcasts"}).click()
 await expect(page.getByRole("tab",{name:/Learn/})).toHaveAttribute("aria-selected","true")
 await page.getByRole("button",{name:"4 Official Trails"}).click()
 await expect(page.getByRole("tab",{name:/Plan/})).toHaveAttribute("aria-selected","true")
 await page.getByRole("button",{name:"7+ Video Guides"}).click()
 await expect(page.getByRole("tab",{name:/Guides/})).toHaveAttribute("aria-selected","true")
})
