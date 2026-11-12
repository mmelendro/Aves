import {test,expect,declineOptionalCookies} from "./public-fixture"
test("reviewed Australian galleries keep their images, counts and map context aligned",async({page},info)=>{
 test.skip(!["desktop","phone-390"].includes(info.project.name),"Gallery journey on desktop and phone")
 await page.goto("/australia")
 await declineOptionalCookies(page)
 const gallery=page.locator("#place-gallery")
 for(const region of ["tasmania","south-australia","western-australia","northern-territory","australian-capital-territory"]){
  await gallery.getByLabel("Landscape region",{exact:true}).selectOption(region)
  await expect(gallery).toContainText("5 reviewed photographs in this regional collection.")
  const photo=gallery.locator("[data-place-image] img")
  await photo.scrollIntoViewIfNeeded()
  await expect.poll(()=>photo.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true)
  const alt=await photo.getAttribute("alt")
  await gallery.getByRole("button",{name:"Next landscape",exact:true}).click()
  await expect(photo).not.toHaveAttribute("alt",alt!)
  await expect(page).toHaveURL(new RegExp(`region=${region}`))
 }
 await gallery.getByLabel("Landscape region",{exact:true}).selectOption("jervis-bay-territory")
 await expect(gallery.getByRole("button",{name:"Return to available landscapes"})).toBeVisible()
 await expect(gallery.getByRole("link",{name:"Return to the map",exact:true})).toBeVisible()
})
