import {test,expect,declineOptionalCookies} from './public-fixture'

test('national album keeps complete results, source-backed status and keyboard card details',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'Inventory discovery on desktop and phone')
 await page.goto('/species/reference?country=new-zealand&q=Nestor+notabilis')
 await declineOptionalCookies(page)
 const results=page.locator('#inventory-results')
 await expect(results.getByRole('heading',{level:2})).toHaveText('1 bird to discover')
 await expect(results.getByText('Global conservation: Endangered',{exact:true})).toBeVisible()
 const reveal=results.locator('summary').filter({hasText:'Turn the card · meet this bird'})
 await reveal.focus();await page.keyboard.press('Enter')
 await results.locator('summary').filter({hasText:'Sources & status'}).click()
 await expect(results.getByRole('link',{name:'GBIF / IUCN status snapshot'})).toBeVisible()
 await expect(results.getByText(/checked \d{4}-\d{2}-\d{2}/).first()).toBeVisible()
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await page.goto('/species/reference?country=colombia&q=Nothocercus+julius')
 await expect(results.getByRole('heading',{level:2})).toHaveText('1 bird to discover')
 // Scope to the accessible result card: streamed HTML can briefly retain a hidden copy.
 const tinamou=results.getByRole('listitem').filter({has:page.getByRole('heading',{name:'Tawny-breasted Tinamou',exact:true})})
 await expect(tinamou).toHaveCount(1)
 await expect(tinamou.getByText('Global conservation: Status not verified',{exact:true})).toBeVisible()
 await expect(tinamou.getByRole('heading',{name:'Tawny-breasted Tinamou',exact:true})).toBeVisible()
})


test('bird album scrolls cards without changing filters or losing later pages',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'Carousel on desktop and touch phone')
 await page.goto('/species/reference?country=new-zealand');await declineOptionalCookies(page)
 const rail=page.getByRole('region',{name:'Bird album',exact:true})
 const first=rail.getByRole('listitem').first()
 const url=page.url()
 await expect(first).toBeVisible()
 await page.getByRole('button',{name:'Next Bird album',exact:true}).click()
 await expect.poll(()=>rail.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0)
 expect(page.url()).toBe(url)
 await expect(page.getByRole('navigation',{name:'Species result pages'}).getByRole('link',{name:'Next birds'})).toBeVisible()
 await rail.screenshot({path:`test-results/album-rail-${info.project.name}.png`})
})
