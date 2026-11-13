import {test,expect,declineOptionalCookies} from './public-fixture'

test('regional identity retains a country return link and fits a narrow header',async({page},info)=>{
 test.skip(!['desktop','phone-320'].includes(info.project.name),'Regional header on desktop and narrow phone')
 await page.goto('/regions/sierra-nevada-de-santa-marta');await declineOptionalCookies(page)
 const header=page.getByRole('banner').first()
 await expect(header.getByRole('link',{name:'AVES Sierra Nevada de Santa Marta home',exact:true})).toBeVisible()
 await expect(header.getByRole('link',{name:'Back to Colombia',exact:true})).toHaveAttribute('href','/colombia')
 await expect(header.getByRole('link',{name:'AVES home',exact:true})).toHaveAttribute('href','/')
 await expect(page.getByRole('link',{name:'Explore the Colombia bird list',exact:true})).toHaveAttribute('href','/species/reference?country=colombia')
 await expect(page.getByRole('link',{name:'Reviewed birds in Sierra Nevada de Santa Marta',exact:true})).toHaveAttribute('href','/species/reference?country=colombia&region=sierra-nevada-de-santa-marta')
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await header.screenshot({path:`test-results/region-brand-${info.project.name}.png`})
})
