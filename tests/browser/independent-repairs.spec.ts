import { test, expect, declineOptionalCookies } from "./public-fixture"

test.beforeEach(({},info)=>test.skip(!['desktop','phone-390'].includes(info.project.name),'Independent repairs on desktop and phone'))

test('scheduler opens on empty and valid enquiries without any submission',async({page})=>{
 let posts=0
 await page.route('**/api/inquiries',r=>{posts++;return r.fulfill({status:500,json:{error:'Unexpected request'}})})
 await page.goto('/browser-fixtures/public-enquiry-colombia');await declineOptionalCookies(page)
 for(const filled of [false,true]){
  if(filled){await page.getByRole('textbox',{name:'First name',exact:true}).fill('Synthetic');await page.getByRole('textbox',{name:'Last name',exact:true}).fill('Visitor');await page.getByRole('textbox',{name:/^Email address/i}).fill('synthetic@example.invalid')}
  await page.getByRole('button',{name:'Schedule Call',exact:true}).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0)
 }
 expect(posts).toBe(0)
})

test('hash history keeps two dirty editors and rejects leaving without losing them',async({page})=>{
 await page.goto('/browser-fixtures/unsaved-sections');await declineOptionalCookies(page)
 await page.getByLabel('Journal',{exact:true}).fill('Unsaved journal')
 await page.getByLabel('Records',{exact:true}).fill('Unsaved records')
 let prompts=0;page.on('dialog',async d=>{prompts++;await d.dismiss()})
 await page.getByRole('link',{name:'Journal section',exact:true}).click()
 await page.getByRole('link',{name:'Records section',exact:true}).click()
 await page.goBack();await expect(page).toHaveURL(/#journal$/)
 await page.goForward();await expect(page).toHaveURL(/#records$/)
 expect(prompts).toBe(0)
 await page.getByRole('link',{name:'Leave workspace',exact:true}).click()
 await expect(page).toHaveURL(/#records$/);expect(prompts).toBe(1)
 await expect(page.getByLabel('Journal',{exact:true})).toHaveValue('Unsaved journal')
 await expect(page.getByLabel('Records',{exact:true})).toHaveValue('Unsaved records')
})

for(const country of ['colombia','australia'])test(`${country} enquiry protects answers and clears protection after a stored receipt`,async({page})=>{
 let stored=false
 await page.route('**/api/inquiries',r=>r.fulfill({json:stored?{success:true,status:'stored',intent:'inquiry',country}:{success:true}}))
 await page.goto(`/browser-fixtures/public-enquiry-${country}`);await declineOptionalCookies(page)
 if(country==='colombia'){await page.getByRole('textbox',{name:'First name',exact:true}).fill('Synthetic');await page.getByRole('textbox',{name:'Last name',exact:true}).fill('Visitor')}
 else await page.getByRole('textbox',{name:/Your Name/}).fill('Synthetic Visitor')
 await page.getByRole('textbox',{name:/^Email address/i}).fill('synthetic@example.invalid')
 const message=country==='colombia'?page.getByPlaceholder(/specific birds/):page.getByLabel('Special Interests or Requests')
 await message.fill('Synthetic unsaved message')
 let prompts=0;page.on('dialog',async d=>{prompts++;await d.dismiss()})
 await page.evaluate(()=>{setTimeout(()=>location.reload(),0)});await expect.poll(()=>prompts).toBe(1);await expect(message).toHaveValue('Synthetic unsaved message')
 await page.locator('form button[type=submit]').click();await expect(page.getByRole('alert')).toBeVisible()
 stored=true;await page.locator('form button[type=submit]').click();await expect(page.getByRole('status').filter({hasText:/saved|successfully/i}).first()).toBeVisible()
 await page.reload();expect(prompts).toBe(1)
})

test('map expansion follows country and island changes and opens the map rather than the bird photo',async({page})=>{
 await page.goto('/');await declineOptionalCookies(page)
 await page.getByRole('button',{name:'Expand current map',exact:true}).click()
 let expanded=page.locator('dialog[data-aves-map][data-expanded]')
 await expect(expanded).toBeVisible();await expect(page.locator('dialog[data-expanded]:not([data-aves-map])')).toHaveCount(0)
 const surface=await expanded.locator('[data-map-surface]').boundingBox(),stage=await expanded.locator('[data-map-view]').boundingBox()
 expect(stage!.height).toBeGreaterThanOrEqual(surface!.height-2)
 await expanded.getByRole('button',{name:'Show New Zealand birds',exact:true}).click()
 await expanded.getByRole('combobox').filter({has:page.locator('option[value="south-island"]')}).selectOption('south-island')
 expanded=page.locator('dialog[data-aves-map][data-expanded]')
 await expect(expanded).toHaveAttribute('aria-label','South Island explorer map')
 await expect(expanded.getByRole('button',{name:'Close expanded South Island explorer map',exact:true})).toBeInViewport()
 await expanded.getByRole('button',{name:'Back to New Zealand',exact:true}).click()
 await expect(page.locator('dialog[data-aves-map][data-expanded]')).toHaveAttribute('aria-label','Destination explorer map')
 await page.keyboard.press('Escape');await expect(page.locator('dialog[data-aves-map][data-expanded]')).toHaveCount(0)
})

test('bird face fits its source image and keeps eBird and compact follow controls available',async({page})=>{
 await page.goto('/?explore=colombia');await declineOptionalCookies(page)
 await page.getByRole('button',{name:'Turn to the birds',exact:true}).click()
 const photo=page.locator('[data-carousel-image]:visible').first()
 await expect(photo.locator('img')).toBeVisible()
 const dimensions=await photo.evaluate(e=>{const box=e.getBoundingClientRect();return{width:box.width,height:box.height,aspect:getComputedStyle(e).getPropertyValue('--bird-photo-aspect')}})
 const [width,height]=dimensions.aspect.split('/').map(Number)
 expect(Math.abs(dimensions.width/dimensions.height-width/height)).toBeLessThan(.04)
 const follow=page.getByRole('button',{name:'Follow bird calls',exact:true});await expect(follow).toBeVisible();await expect(follow).toHaveText('')
 await page.getByRole('button',{name:'Species details & credits',exact:true}).click()
 await expect(page.getByRole('link',{name:'Explore on eBird',exact:true})).toHaveAttribute('href',/^https:\/\/ebird.org\/species\/[a-z0-9]+$/)
})
