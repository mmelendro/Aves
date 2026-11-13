import {test,expect,declineOptionalCookies} from './public-fixture'

for(const path of ['/','/colombia','/regions/sierra-nevada-de-santa-marta','/australia/regions/new-south-wales']){
 test(`background changes preserve the geographic camera: ${path}`,async({page},info)=>{
  test.skip(!['desktop','firefox','phone-320'].includes(info.project.name),'Representative keyboard and mobile viewports')
  await page.goto(path);await declineOptionalCookies(page)
  const turn=page.getByRole('button',{name:'Turn to the map',exact:true}).first()
  if(await turn.isVisible())await turn.click()
  const map=page.locator('dialog[data-aves-map]:visible').first()
  const canvas=map.locator('.geographic-map-canvas')
  await expect(canvas).toHaveAttribute('data-map-camera',/.+/)
  const element=await canvas.elementHandle()
  const initial=await canvas.getAttribute('data-map-camera')
  await map.getByRole('button',{name:/^Zoom .* in$/}).first().click()
  await expect(canvas).not.toHaveAttribute('data-map-camera',initial!)
  await expect(canvas).toHaveAttribute('data-map-moving','false')
  await canvas.focus();await canvas.press('ArrowRight')
  // Read the camera only after the engine completes the keyboard pan.
  await expect(canvas).toHaveAttribute('data-map-moving','false')
  const camera=await canvas.getAttribute('data-map-camera')
  const size=await canvas.evaluate(node=>({width:node.clientWidth,height:node.clientHeight}))
  const region=map.getByRole('combobox',{name:'Map region',exact:true})
  const selected=await region.count()?await region.inputValue():null
  for(const label of ['Satellite','Planning map','Roads & cities','Topographic','Planning map']){
   await map.getByRole('button',{name:'Map layers',exact:true}).click()
   await map.getByRole('radio',{name:label,exact:true}).check()
   await page.keyboard.press('Escape')
   await expect(canvas).toHaveAttribute('data-map-camera',camera!)
   expect(await element!.evaluate(node=>node.isConnected)).toBe(true)
   expect(await canvas.evaluate(node=>({width:node.clientWidth,height:node.clientHeight}))).toEqual(size)
   if(selected!==null)await expect(region).toHaveValue(selected)
  }
  // Fullscreen changes the viewport, but must retain the centre and ground scale.
  await map.getByRole('button',{name:/^Enlarge /}).click()
  await expect(map).toHaveAttribute('data-expanded')
  await expect.poll(async()=>JSON.parse((await canvas.getAttribute('data-map-camera'))!).size).not.toEqual(JSON.parse(camera!).size)
  const expanded=JSON.parse((await canvas.getAttribute('data-map-camera'))!)
  if(info.project.name==='desktop'&&path==='/colombia'){
   await map.screenshot({path:'test-results/camera-expanded-colombia.png'})
  }
  expect(expanded.zoom).toBe(JSON.parse(camera!).zoom)
  expanded.centre.forEach((value:number,index:number)=>expect(value).toBeCloseTo(JSON.parse(camera!).centre[index],6))
  await map.getByRole('button',{name:'Satellite map',exact:true}).click()
  await expect(canvas).toHaveAttribute('data-map-camera',JSON.stringify(expanded))
  await map.getByRole('button',{name:'Satellite map',exact:true}).click()
  await expect(canvas).toHaveAttribute('data-map-camera',JSON.stringify(expanded))
  await map.getByRole('button',{name:/^Close expanded /}).click()
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
  await canvas.screenshot({path:`test-results/camera-${info.project.name}-${path.replaceAll('/','_')}.png`})
 })
}

test('a newly selected region keeps its framing across background changes',async({page},info)=>{
 test.skip(!['desktop','firefox','phone-320'].includes(info.project.name),'Representative selection journeys')
 await page.goto('/colombia');await declineOptionalCookies(page)
 const turn=page.getByRole('button',{name:'Turn to the map',exact:true}).first()
 if(await turn.isVisible())await turn.click()
 const map=page.locator('dialog[data-aves-map]:visible').first()
 const region=map.getByRole('combobox',{name:'Map region',exact:true})
 await region.selectOption('sierra-nevada-de-santa-marta')
 await expect(region).toHaveValue('sierra-nevada-de-santa-marta')
 const returnToMap=map.getByRole('button',{name:'Return to map',exact:true})
 if(await returnToMap.isVisible())await returnToMap.click()
 const canvas=map.locator('.geographic-map-canvas')
 await expect(canvas).toBeVisible()
 await expect(canvas).toHaveAttribute('data-map-moving','false')
 const camera=(await canvas.getAttribute('data-map-camera'))!
 const view=JSON.parse(camera)
 expect(view.zoom).toBeGreaterThan(3)
 expect(view.centre[0]).toBeGreaterThan(9);expect(view.centre[0]).toBeLessThan(12)
 expect(view.centre[1]).toBeGreaterThan(-75);expect(view.centre[1]).toBeLessThan(-72)
 for(let i=0;i<2;i++){
  await map.getByRole('button',{name:'Satellite map',exact:true}).click()
  await expect(canvas).toHaveAttribute('data-map-camera',camera)
  await expect(region).toHaveValue('sierra-nevada-de-santa-marta')
 }
})
