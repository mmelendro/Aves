const {test}=require('node:test')
const assert=require('node:assert/strict')
const {readFileSync,existsSync}=require('node:fs')
const loader=require('./helpers/load-ts.cjs')
const read=file=>readFileSync(file,'utf8')

test('one local application owns all public and legacy backend routes',async()=>{
 const config=(await import('../next.config.mjs')).default
 assert.equal(config.basePath,undefined)
 for(const route of await config.rewrites())assert.ok(route.destination.startsWith('/')&&!route.destination.startsWith('//'),route.source)
 assert.doesNotMatch(read('middleware.ts'),/https:\/\/aves-australia|127\.0\.0\.1:3000/)
 for(const path of ['app/page.tsx','app/colombia/page.tsx','app/new-zealand/page.tsx','app/australia/page.tsx','app/account/page.tsx','app/api/account/plans/route.ts'])assert.ok(existsSync(path),path)
})
test('the human directory and XML sitemap contain the exact same unique public pages',()=>{
 const load=loader(),{publicNavigationPaths,publicNavigationGroups}=load('lib/public-navigation.ts')
 const paths=publicNavigationGroups.flatMap(group=>group.pages.map(page=>page.href))
 assert.equal(new Set(paths).size,paths.length)
 assert.deepEqual([...paths].sort(),[...publicNavigationPaths].sort())
 for(const path of paths)assert.doesNotMatch(path,/\/(?:api|auth|admin|account)(?:\/|$)/)
 assert.match(read('app/site-map/page.tsx'),/publicNavigationGroups as publicPageGroups/)
})
test('Australian route context resolves the regional bird before client selection exists',()=>{
 const {brandContext}=loader()('lib/brand-context.ts')
 assert.deepEqual(brandContext('/australia/regions/new-south-wales'),{country:'australia',regionId:'new-south-wales'})
 assert.deepEqual(brandContext('/australia'),{country:'australia',regionId:undefined})
})
test('one media provider and the actual shared explorer replace the copied public snapshot',()=>{
 const layout=read('app/layout.tsx')
 assert.equal((layout.match(/<AvesMediaProvider\s/g)||[]).length,1)
 assert.match(read('features/australia/components/australia-unified-explorer.tsx'),/@\/components\/destination-explorer-page/)
 assert.ok(!existsSync('components/public-explorer'))
 assert.ok(!existsSync('app/page-metadata.tsx'))
})
test('read-only preview cannot consult hosted account identity or owner AI providers',async()=>{
 let calls=0
 const load=loader({env:{VERCEL_ENV:'preview'},mocks:{'@/lib/supabase/server':{createClient(){calls++;throw Error('unexpected provider')}}}})
 await assert.rejects(load('lib/account-auth.ts').requireAccountUser(),error=>error.status===503)
 assert.equal(calls,0)
 assert.match(read('lib/ai-proposal-handlers.ts'),/if\(isReadOnlyPreview\(\)\)throw/)
})
test('all private response paths retain no-store and existing browser security headers',async()=>{
 const config=(await import('../next.config.mjs')).default
 const headers=await config.headers()
 for(const name of ['X-Content-Type-Options','X-Frame-Options','Content-Security-Policy'])assert.ok(headers[0].headers.some(row=>row.key===name))
 for(const path of ['/account/:path*','/admin/:path*','/api/:path*','/australia/api/:path*'])assert.ok(headers.find(row=>row.source===path).headers.some(row=>row.key==='Cache-Control'&&row.value.includes('no-store')))
})

 test('preview GETs cannot refresh shared sessions or consume the legacy cookie bridge',async()=>{
  const {NextRequest}=require('next/server');let calls=0
  const load=loader({env:{VERCEL_ENV:'preview'},mocks:{'@supabase/ssr':{createServerClient(){calls++;throw Error('provider')}},'@/lib/supabase/session-migration':{migrateLegacySessionCookies(){calls++;throw Error('migration')}}}})
  for(const path of ['/account','/auth/callback','/api/account/plans','/australia/account'])await load('middleware.ts').middleware(new NextRequest('https://preview.example.test'+path))
  const response=await load('app/auth/session/route.ts').GET(new NextRequest('https://preview.example.test/australia/auth/session'))
  assert.equal(response.status,303);assert.equal(response.cookies.getAll().length,0);assert.equal(calls,0)
 })
