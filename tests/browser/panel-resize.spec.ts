import {test,expect,declineOptionalCookies} from './public-fixture'
import AxeBuilder from '@axe-core/playwright'

test('map and bird panels resize by edges and keyboard, reset, and adapt to phones',async({page},info)=>{
 test.setTimeout(90000)
 test.skip(!['desktop','firefox'].includes(info.project.name),'Desktop pointer and keyboard resizing')
 await page.goto('/australia/regions/new-south-wales');await declineOptionalCookies(page)
 const guide=page.locator('[data-field-guide]').first()
 await guide.getByRole('button',{name:'Show map & birds together',exact:true}).click()
 const pair=guide.locator('[data-resizable="true"]')
 await expect(pair).toBeVisible()
 const choices=guide.getByRole('navigation',{name:'Choose a bird photograph'}).getByRole('button')
 await choices.nth(1).click()
 const selected=choices.nth(1)
 const canvas=await pair.locator('[data-map-surface]').first().elementHandle()
 const initial=(await pair.boundingBox())!
 const map=pair.locator('[data-resize-panel="map"][data-resize-edge="se"]')
 await map.focus();await map.press('Shift+ArrowDown')
 await expect.poll(async()=>Math.round((await pair.boundingBox())!.height)).toBe(Math.round(initial.height+40))
 const handles=await pair.locator('[data-resize-edge="e"]').all()
 let outer=handles[0]
 for(const h of handles)if((await h.boundingBox())!.x>(await outer.boundingBox())!.x)outer=h
 await outer.scrollIntoViewIfNeeded();const box=(await outer.boundingBox())!
 const dragY=Math.min(box.y+box.height-24,page.viewportSize()!.height-60)
 await page.mouse.move(box.x+box.width/2,dragY);await page.mouse.down();await page.mouse.move(box.x+box.width/2-80,dragY,{steps:5});await page.mouse.up()
 await expect.poll(async()=>Math.round((await pair.boundingBox())!.width)).toBe(Math.round(initial.width-80))
 await expect(selected).toHaveAttribute('aria-pressed','true')
 expect(await canvas!.evaluate(element=>element.isConnected)).toBe(true)
 const audit=await new AxeBuilder({page}).include('[data-resizable="true"]').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
 expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([])
 await pair.screenshot({path:`test-results/panel-resize-${info.project.name}.png`})
 await guide.getByRole('button',{name:'Reset layout',exact:true}).click()
 await expect.poll(async()=>Math.round((await pair.boundingBox())!.width)).toBe(Math.round(initial.width))
 await expect.poll(async()=>Math.round((await pair.boundingBox())!.height)).toBe(Math.round(initial.height))
 // Inner edges adapt the neighbouring panel without moving the workspace.
 const inner=pair.locator('[data-resize-edge="e"]').filter({visible:true})
 let left=inner.first()
 if((await inner.last().boundingBox())!.x<(await left.boundingBox())!.x)left=inner.last()
 await left.scrollIntoViewIfNeeded();const inside=(await left.boundingBox())!
 const divider=pair.getByRole('separator'),previous=await divider.getAttribute('aria-valuenow')
 const innerY=Math.min(inside.y+inside.height-24,page.viewportSize()!.height-60)
 await page.mouse.move(inside.x+inside.width/2,innerY);await page.mouse.down();await page.mouse.move(inside.x+inside.width/2+50,innerY,{steps:5})
 await expect(divider).not.toHaveAttribute('aria-valuenow',previous!)
 await page.keyboard.press('Escape');await page.mouse.up()
 await expect(divider).toHaveAttribute('aria-valuenow',previous!)
 await page.setViewportSize({width:390,height:844})
 await expect(guide.locator('[data-resize-edge]')).toHaveCount(0)
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
})
