import {test,expect,declineOptionalCookies} from './public-fixture'

test('hydrated homepage fits narrow screens with doubled text',async({page},info)=>{
 test.skip(!['phone-320','desktop','firefox'].includes(info.project.name),'Phone and desktop text reflow')
 await page.goto('/');await declineOptionalCookies(page)
 await page.evaluate(()=>document.fonts.ready)
 await page.addStyleTag({content:'html {font-size:200% !important}'})
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await expect(page.getByRole('link',{name:'AVES home',exact:true}).first()).toBeVisible()
 await page.screenshot({path:`test-results/enlarged-home-${info.project.name}.png`})
})
