import {test,expect,declineOptionalCookies} from './public-fixture'

for(const path of ['/', '/tours/adventure/sierra-nevada']) test(`map actions stay inside the canvas: ${path}`,async({page},info)=>{
 test.skip(!['phone-320','desktop','firefox'].includes(info.project.name),'Narrow phone and both desktop engines')
 await page.goto(path);await declineOptionalCookies(page)
 const map=page.locator('dialog[data-aves-map]:visible').first()
 const canvas=map.locator('.geographic-map-canvas')
 await expect(canvas).toHaveAttribute('data-map-camera',/.+/)
 const controls=map.locator('[data-map-controls]')
 const credits=map.locator('.map-source-note > summary')
 const placement=()=>map.evaluate(root=>{
  const canvas=root.querySelector('.geographic-map-canvas')!.getBoundingClientRect()
  const controls=root.querySelector('[data-map-controls]')!.getBoundingClientRect()
  const note=root.querySelector('.map-source-note > summary')!.getBoundingClientRect()
  return {inside:controls.top>=canvas.top&&controls.bottom<=canvas.bottom,clear:controls.bottom<=note.top||controls.top>=note.bottom||controls.right<=note.left||controls.left>=note.right}
 })
 await expect.poll(placement).toEqual({inside:true,clear:true})
 await credits.click()
 await expect(map.getByText(/Planning geography: Natural Earth/)).toBeVisible()
 await expect.poll(placement).toEqual({inside:true,clear:true})
 await controls.screenshot({path:`test-results/map-dock-${info.project.name}-${path==='/'?'home':'sierra'}.png`})
})
