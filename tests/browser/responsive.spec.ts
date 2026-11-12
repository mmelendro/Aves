import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const pages = ["/", "/new-zealand/south-island", "/new-zealand/north-island", "/australia/regions/new-south-wales", "/species/reference?country=colombia", "/resources", "/tours/adventure/sierra-nevada", "/account/sign-in"]
// Local public fixture only: never production sessions, writes or third-party requests.
test.beforeEach(async ({context}) => {
  await context.route("**/*", route => {
    const request=route.request(), url=new URL(request.url())
    return url.origin==="http://127.0.0.1:3100" && ["GET","HEAD"].includes(request.method()) ? route.continue() : route.abort()
  })
})
for(const path of pages) test(`public accessibility and reflow: ${path}`, async ({page}) => {
  await page.goto(path)
  await expect(page.locator("main")).toHaveCount(1)
  await expect(page.getByRole("heading",{level:1})).toHaveCount(1)
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
  const scan=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze()
  expect(scan.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,detail:n.failureSummary}))}))).toEqual([])
})
test('keyboard skip link reaches main and map dismissal restores focus',async({page})=>{
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip=page.getByRole('link',{name:'Skip to content'})
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  const consent=page.getByRole('button',{name:'Reject Non-Essential',exact:true})
  if(await consent.isVisible()) await consent.click()
  const enlarge=page.getByRole('button',{name:/^Enlarge Destination explorer map$/})
  await enlarge.click()
  const map=page.locator('dialog[data-aves-map][data-expanded]')
  await expect(map).toBeVisible()
  const box=await map.boundingBox(), viewport=page.viewportSize()!
  expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.width).toBeLessThanOrEqual(viewport.width)
  const close=map.getByRole('button',{name:/^Close expanded/})
  await expect(close).toBeInViewport()
  await page.keyboard.press('Escape')
  await expect(enlarge).toBeFocused()
})
test('mobile map canvas and return cue survive large text',async({page})=>{
  await page.goto('/')
  const map=page.locator('[data-map-surface]:visible').first()
  const box=await map.boundingBox()
  expect(box!.height).toBeGreaterThanOrEqual(220)
  if(page.viewportSize()!.width<624){
    const card=page.locator('[data-layout="guide"]').first()
    expect((await card.boundingBox())!.height).toBeLessThanOrEqual(840)
    await expect(page.getByRole('button',{name:'View Green-bearded Helmetcrest in the bird guide'})).toBeVisible()
  }
  await page.addStyleTag({content:'html { font-size: 200% !important; }'})
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1)
  await expect(page.getByRole('button',{name:'Turn to the birds'})).toBeVisible()
})

test('desktop accessibility audit covers every public sitemap route',async({page,request},info)=>{
  test.skip(info.project.name!=='desktop','Full catalogue scan runs once; representative journeys use every viewport.')
  test.setTimeout(10*60_000)
  const xml=await (await request.get('/sitemap.xml')).text()
  const routes=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>{
    const url=new URL(match[1].replaceAll('&amp;','&'))
    if(url.hostname!=='aves.bio'||/^\/(account|admin|api|auth|dashboard|shopping)(\/|$)/.test(url.pathname))throw Error('Unexpected private or external sitemap path')
    return url.pathname+url.search
  }))]
  expect(routes.length).toBeGreaterThanOrEqual(78)
  const findings=[]
  for(const path of routes){
    await page.goto(path)
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
    findings.push(...result.violations.map(v=>({path,id:v.id,impact:v.impact,targets:v.nodes.slice(0,10).map(n=>({target:n.target,detail:n.failureSummary}))})))
  }
  expect(findings).toEqual([])
})
