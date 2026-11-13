import {test,expect,declineOptionalCookies} from './public-fixture'

test('regional identity retains a country return link and fits a narrow header',async({page},info)=>{
 test.setTimeout(90000)
 test.skip(!['desktop','phone-320'].includes(info.project.name),'Regional header on desktop and narrow phone')
 await page.goto('/regions/sierra-nevada-de-santa-marta')
 const accept=page.getByRole('button',{name:'Accept All Cookies',exact:true}),reject=page.getByRole('button',{name:'Reject Non-Essential',exact:true})
 await expect(reject).toBeVisible()
 if(info.project.name==='phone-320'){
  const a=(await accept.boundingBox())!,r=(await reject.boundingBox())!
  expect(r.y).toBeGreaterThanOrEqual(a.y+a.height)
  expect(r.height).toBeGreaterThanOrEqual(44)
 }
 await declineOptionalCookies(page)
 const header=page.getByRole('banner').first()
 await expect(header.getByRole('link',{name:'AVES Sierra Nevada de Santa Marta home',exact:true})).toBeVisible()
 await expect(header.getByRole('link',{name:'Back to Colombia',exact:true})).toHaveAttribute('href','/colombia')
 await expect(header.getByRole('link',{name:'AVES home',exact:true})).toHaveAttribute('href','/')
 await expect(page.getByRole('link',{name:'Explore the Colombia bird list',exact:true})).toHaveAttribute('href','/species/reference?country=colombia')
 await expect(page.getByRole('link',{name:'Reviewed birds in Sierra Nevada de Santa Marta',exact:true})).toHaveAttribute('href','/species/reference?country=colombia&region=sierra-nevada-de-santa-marta')
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await header.screenshot({path:`test-results/region-brand-${info.project.name}.png`,animations:'disabled'})
})
