import {test,expect,declineOptionalCookies} from './public-fixture'
const plan='a13b0801-1c6d-41d4-94da-12e3adeebf13'
test('a reviewed route saves, reopens, preserves conflict edits and reloads the saved days',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'Synthetic private route on desktop and phone')
 let revision=0,data={version:1,routes:[] as Array<{input:{days:number}}>},conflict=false
 await page.route(`**/api/account/plans/${plan}/itineraries`,async route=>{
  if(route.request().method()==='GET')return route.fulfill({json:{revision,data}})
  const body=route.request().postDataJSON();if(conflict)return route.fulfill({status:409,json:{error:'This saved itinerary changed in another tab. Keep your edits before refreshing the saved route.'}})
  expect(body.expectedRevision).toBe(revision);data=body.data;revision++;return route.fulfill({json:{revision,data}})
 })
 await page.goto('/new-zealand/north-island#trip-planner');await declineOptionalCookies(page)
 await page.getByRole('button',{name:'Suggest my itineraries',exact:true}).click()
 await expect(page.getByRole('button',{name:'Update my suggestions',exact:true})).toBeVisible()
 await page.goto('/browser-fixtures/itinerary-editor')
 await page.getByText(/Review editable copy from this tab/).click();await page.getByRole('button',{name:'Save reviewed editable copy',exact:true}).click()
 await expect(page.getByRole('status').filter({hasText:'Your editable itinerary is saved privately.'})).toBeVisible();expect(data.routes[0].input.days).toBe(5)
 await page.getByRole('button',{name:'Edit saved itinerary',exact:true}).click()
 await page.getByRole('spinbutton',{name:'Number of days',exact:true}).fill('6');await page.getByRole('button',{name:'Update my suggestions',exact:true}).click()
 conflict=true;await page.getByRole('button',{name:'Save editable itinerary',exact:true}).click()
 await expect(page.getByText(/This saved itinerary changed in another tab/)).toBeVisible();await expect(page.getByRole('spinbutton',{name:'Number of days',exact:true})).toHaveValue('6')
 conflict=false;await page.getByRole('button',{name:'Save editable itinerary',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Your editable itinerary is saved privately.'})).toBeVisible();expect(data.routes[0].input.days).toBe(6)
 await page.reload();await page.getByRole('button',{name:'Edit saved itinerary',exact:true}).click();await expect(page.getByRole('spinbutton',{name:'Number of days',exact:true})).toHaveValue('6')
})
test('selected wishes and same-trip photo links remain desired until an explicit album save',async({page},info)=>{
 test.skip(!['desktop','phone-390'].includes(info.project.name),'Synthetic album connection on desktop and phone')
 const entry='b13b0801-1c6d-41d4-94da-12e3adeebf13',photo='c13b0801-1c6d-41d4-94da-12e3adeebf13',wish={id:'nz-123456789abc',name:'Synthetic tūī',scientificName:'Prosthemadera novaeseelandiae'}
 let revision=0,data={version:1,birds:[] as Array<Record<string,unknown>>},writes=0
 await page.route(`**/api/account/plans/${plan}/album`,async route=>{if(route.request().method()==='GET')return route.fulfill({json:{revision,data,species:[wish],wishes:[wish],unmatchedWishCount:0}});const body=route.request().postDataJSON();expect(body.expectedRevision).toBe(revision);data=body.data;revision++;writes++;return route.fulfill({json:{revision,data}})})
 await page.route(`**/api/account/plans/${plan}/album/links`,route=>route.fulfill({json:{entries:[{id:entry,title:'Synthetic forest walk'}],photos:[{id:photo,entryId:entry,caption:'Synthetic owner photo',creator:'Synthetic owner'}]}}))
 await page.goto('/browser-fixtures/bird-album-nz');await declineOptionalCookies(page)
 await page.getByText('Add saved bird wishes to this album',{exact:true}).click();await page.getByRole('checkbox',{name:'Synthetic tūī',exact:true}).check();await page.getByRole('button',{name:'Add selected wishes as desired',exact:true}).click();expect(writes).toBe(0)
 await page.getByRole('button',{name:'Choose existing journal and photos',exact:true}).click();await page.getByLabel('Linked journal entry',{exact:true}).selectOption(entry);await page.getByLabel('Linked photo',{exact:true}).selectOption(photo)
 await expect(page.getByText('Creator recorded when linked: Synthetic owner',{exact:true})).toBeVisible();await expect(page.getByRole('article')).toContainText('Desired');expect(writes).toBe(0)
 await page.getByRole('button',{name:'Save bird album',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'Your private bird album is saved.'})).toBeVisible();expect(writes).toBe(1);expect(data.birds[0].state).toBe('desired');expect(data.birds[0].date).toBe('');expect(data.birds[0].photoCredit).toBe('Synthetic owner');expect(data.birds[0]).not.toHaveProperty('verified')
 await page.reload();await expect(page.getByRole('article')).toContainText('Desired');await expect(page.getByText('Creator recorded when linked: Synthetic owner',{exact:true})).toBeVisible()
})
test('private collection keeps distinct trip references and shows honest missing-image states',async({page},info)=>{
 test.skip(info.project.name!=='desktop','Synthetic cross-trip collection')
 const second='b13b0801-1c6d-41d4-94da-12e3adeebf13',record='c13b0801-1c6d-41d4-94da-12e3adeebf13'
 await page.route('**/api/account/collection?**',route=>route.fulfill({json:{generatedAt:'2026-11-13T00:00:00Z',scope:'Synthetic owned trips',plansIncluded:2,olderTripsExcluded:false,total:1,matched:1,offset:0,limit:24,catalogues:[{countryId:'colombia',name:'Synthetic national reference',reviewed:'2026-11-13',scope:'Synthetic catalogue, not a regional sighting list',total:100,desired:1,observed:1,sources:[]}],items:[{key:'colombia:synthetic',country:'colombia',speciesId:'co-synthetic',commonName:'Synthetic warbler',scientificName:'Testus birdus',currentCatalogue:true,desired:true,observed:true,references:[{planId:plan,title:'First synthetic trip',recordId:record,state:'desired',date:'',regionId:''},{planId:second,title:'Second synthetic trip',recordId:record,state:'observed',date:'2026-11-13',regionId:''}],ownerPhoto:null,referenceImage:null}]}}))
 await page.goto('/browser-fixtures/bird-collection');await declineOptionalCookies(page)
 await expect(page.getByRole('heading',{name:'Synthetic warbler',exact:true})).toBeVisible();await expect(page.getByText('No collection image available yet',{exact:true})).toBeVisible();await page.getByText('Linked trip records (2)',{exact:true}).click();await expect(page.getByRole('link',{name:'First synthetic trip',exact:true})).toHaveAttribute('href',`/account/trips/${plan}`);await expect(page.getByRole('link',{name:'Second synthetic trip',exact:true})).toHaveAttribute('href',`/account/trips/${second}`);await expect(page.getByRole('progressbar')).toHaveAttribute('value','1')
})
