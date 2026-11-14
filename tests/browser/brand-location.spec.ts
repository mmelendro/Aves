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
  await reject.scrollIntoViewIfNeeded()
  const hit=await reject.evaluate(element=>{const box=element.getBoundingClientRect(),x=box.x+box.width/2,y=box.y+box.height/2,target=document.elementFromPoint(x,y);return {correct:target===element||element.contains(target),target:target?.textContent,box:box.toJSON(),viewport:{width:innerWidth,height:innerHeight,scale:visualViewport?.scale,top:visualViewport?.offsetTop},scroll:scrollY}})
  expect(hit,JSON.stringify(hit)).toMatchObject({correct:true})
  console.info('Phone consent hit test:',JSON.stringify(hit))
  const overflow=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,leaves:[...document.querySelectorAll('body *')].filter(e=>e.children.length===0&&e.getBoundingClientRect().right>320.5).slice(0,30).map(e=>({tag:e.tagName,class:e.getAttribute('class'),text:e.textContent?.slice(0,90),rect:e.getBoundingClientRect().toJSON()}))}))
  if(overflow.scroll>320){
   console.info('Overflow owners:',JSON.stringify(await page.evaluate(()=>{
    const elements=[...document.querySelectorAll<HTMLElement>('header,footer,[data-field-guide],[data-explorer-content],[data-cookie-banner]')]
    const probes=elements.map(e=>{const before=e.style.display;e.style.display='none';const width=document.documentElement.scrollWidth;e.style.display=before;return {tag:e.tagName,class:e.className,width}})
    const boxes=[...document.querySelectorAll<HTMLElement>('body *')].filter(e=>e instanceof HTMLElement&&e.getBoundingClientRect().right>320.5).slice(0,45).map(e=>({tag:e.tagName,class:e.className,rect:e.getBoundingClientRect().toJSON(),overflow:getComputedStyle(e).overflow,minWidth:getComputedStyle(e).minWidth}))
    return {probes,boxes}
   })))
  }
  expect(overflow,JSON.stringify(overflow)).toMatchObject({scroll:320})
  await reject.tap()
  await expect(page.locator('[data-cookie-banner]')).toHaveCount(0)
 }else{
  await declineOptionalCookies(page)
 }
 const header=page.getByRole('banner').first()
 await expect(header.getByRole('link',{name:'AVES Sierra Nevada de Santa Marta home',exact:true})).toBeVisible()
 await expect(header.getByRole('link',{name:'Back to Colombia',exact:true})).toHaveAttribute('href','/colombia')
 await expect(header.getByRole('link',{name:'AVES home',exact:true})).toHaveAttribute('href','/')
 await expect(page.getByRole('link',{name:'Explore the Colombia bird list',exact:true})).toHaveAttribute('href','/species/reference?country=colombia')
 await expect(page.getByRole('link',{name:'Reviewed birds in Sierra Nevada de Santa Marta',exact:true})).toHaveAttribute('href','/species/reference?country=colombia&region=sierra-nevada-de-santa-marta')
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
 await header.screenshot({path:`test-results/region-brand-${info.project.name}.png`,animations:'disabled'})
})
