import {test,expect,declineOptionalCookies} from './public-fixture'
import accountCopy from '../../content/account-ui-es.json'
const plan='a13b0801-1c6d-41d4-94da-12e3adeebf13'
test('Spanish plan controls preserve private text and stored option values',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'Synthetic English and Spanish form acceptance')
 let writes=0
 await page.route('**/api/account/plans',async route=>{writes++;const body=route.request().postDataJSON();expect(body.title).toBe('Cancel');expect(body.message).toBe('Save My Draft');expect(body.country).toBe('new-zealand');expect(body.partySize).toBe('2 people');return route.fulfill({json:{plan:{...body,status:'draft',updatedAt:'2026-11-13T12:00:00Z'}}})})
 await page.goto('/browser-fixtures/trip-editor');await declineOptionalCookies(page)
 await page.getByLabel('Give Your Plan a Name *',{exact:true}).fill('Cancel');await page.getByLabel('Your Interests and Ideas',{exact:true}).fill('Save My Draft');await page.getByLabel('Group Size',{exact:true}).selectOption('2 people')
 await page.getByRole('button',{name:'Cambiar a español',exact:true}).click();await expect(page.getByRole('button',{name:'Switch to English',exact:true})).toBeVisible()
 await expect(page.getByLabel(accountCopy['Give Your Plan a Name *'],{exact:true})).toHaveValue('Cancel');await expect(page.getByLabel(accountCopy['Your Interests and Ideas'],{exact:true})).toHaveValue('Save My Draft');await expect(page.getByLabel(accountCopy['Group Size'],{exact:true})).toHaveValue('2 people');expect(writes).toBe(0)
 page.once('dialog',dialog=>dialog.dismiss());await page.getByRole('button',{name:accountCopy['Cancel'],exact:true}).click();await expect(page.getByLabel(accountCopy['Your Interests and Ideas'],{exact:true})).toHaveValue('Save My Draft')
 await page.getByRole('button',{name:accountCopy['Save My Draft'],exact:true}).click();await expect(page.getByRole('heading',{name:'Confirmed synthetic draft',exact:true})).toBeVisible();expect(writes).toBe(1)
})
test('removed pack choices disappear before download and draft deletion needs explicit confirmation',async({page},info)=>{
 test.skip(info.project.name!=='desktop','One synthetic deletion and selection flow')
 let deleted=0,downloaded=0
 await page.route(`**/api/account/plans/${plan}`,async route=>{expect(route.request().method()).toBe('DELETE');expect(route.request().postDataJSON()).toEqual({expectedUpdatedAt:'2026-11-13T00:00:00Z'});deleted++;return route.fulfill({json:{success:true}})})
 await page.route(`**/api/account/plans/${plan}/pack`,async route=>{expect(route.request().postDataJSON().preparationIds).toEqual([]);downloaded++;return route.fulfill({headers:{'content-type':'text/html','content-disposition':'attachment; filename="aves-private-trip-pack.html"'},body:'<!doctype html><title>Synthetic</title>'})})
 await page.goto('/browser-fixtures/trip-tools');await declineOptionalCookies(page);await page.getByText('Download a practical trip pack',{exact:true}).click();await page.getByLabel('Synthetic preparation',{exact:true}).check();await page.getByRole('button',{name:'Remove synthetic preparation',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Unavailable items were removed'})).toBeVisible();const file=page.waitForEvent('download');await page.getByRole('button',{name:'Download selected trip pack',exact:true}).click();await file;expect(downloaded).toBe(1)
 await page.getByRole('button',{name:'Delete unused draft',exact:true}).click();expect(deleted).toBe(0);await page.getByRole('button',{name:'Keep draft',exact:true}).click();expect(deleted).toBe(0);await page.getByRole('button',{name:'Delete unused draft',exact:true}).click();await page.getByRole('button',{name:'Permanently delete this draft',exact:true}).click();await expect(page.getByText('Deleted synthetic draft',{exact:true})).toBeVisible();expect(deleted).toBe(1)
})
test('tour ideas have no fixed prices and article cross page fragments resolve',async({page},info)=>{
 test.skip(info.project.name!=='desktop','Public claim and fragment acceptance')
 await page.goto('/tours');await declineOptionalCookies(page);await expect(page.getByRole('main')).not.toContainText(/\$[\d,]+|Carbon Neutral/);const selector=page.getByRole('button',{name:'Adventure',exact:true});await expect(selector).toHaveAttribute('aria-pressed','true');await selector.press('Enter');await expect(selector).toHaveAttribute('aria-pressed','false');await expect(page.getByRole('table')).toHaveAccessibleName(/Proposed trip styles/)
 await page.goto('/blog/sierra-nevada-indigenous-birding');await expect(page.getByRole('main').locator('a[href^="/team#"],a[href^="/about/partners#"]').first()).toBeAttached();const links=await page.getByRole('main').locator('a[href^="/team#"],a[href^="/about/partners#"]').evaluateAll(nodes=>[...new Set(nodes.map(node=>(node as HTMLAnchorElement).getAttribute('href')!))]);expect(links.length).toBeGreaterThan(1);for(const href of links){await page.goto(href);await expect(page.getByRole('main').locator('#'+href.split('#')[1])).toBeVisible()}
})
