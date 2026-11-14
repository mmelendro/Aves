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
 await expect(results.getByRole('link',{name:'GBIF / IUCN status snapshot'})).toBeVisible()
 await expect(results.getByText(/checked \d{4}-\d{2}-\d{2}/).first()).toBeVisible()
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await page.goto('/species/reference?country=colombia&q=Nothocercus+julius')
 await expect(results.getByRole('heading',{level:2})).toHaveText('1 bird to discover')
 await expect(page.locator('#inventory-results').getByText('Global conservation: Status not verified',{exact:true})).toBeVisible()
 await expect(page.getByRole('heading',{name:'Tawny-breasted Tinamou',exact:true})).toBeVisible()
})
