/** Disposable native PostgreSQL + Supabase Auth + PostgREST. No production connection is accepted. */
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {createWriteStream} from 'node:fs'
import {resolve,join} from 'node:path'
import {pathToFileURL} from 'node:url'
import {randomBytes,randomUUID,createHmac,createHash} from 'node:crypto'
import {spawn,execFileSync} from 'node:child_process'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'

const repo = resolve(import.meta.dirname,'../..')
const qa = process.env.AVES_QA_ROOT
const runtime = process.env.AVES_QA_RUNTIME
assert(qa && runtime && process.env.NODE_EXTRA_CA_CERTS, 'Launch through run-native.py')
assert.equal(Number(process.versions.node.split('.')[0]),22,'Use Node 22, matching AVES')
const runtimeRequire = createRequire(join(runtime,'package.json'))
const {default:EmbeddedPostgres} = await import(pathToFileURL(runtimeRequire.resolve('embedded-postgres')))
const appRequire = createRequire(join(repo,'package.json'))
const {createServerClient} = appRequire('@supabase/ssr')
const ports = {postgres:54329,auth:54330,rest:54331,supabase:54321,smtp:54325,mail:54326,app:3003}
const appUrl = 'http://127.0.0.1:' + ports.app
const supabaseUrl = 'https://127.0.0.1:' + ports.supabase
const pubKey = 'sb_publishable_' + randomBytes(24).toString('base64url')
const serviceKey = 'sb_secret_' + randomBytes(32).toString('base64url')
const jwtSecret = randomBytes(48).toString('base64url')
const pgPassword = randomBytes(24).toString('hex')
const authPassword = randomBytes(24).toString('hex')
const restPassword = randomBytes(24).toString('hex')
const children = [], servers = [], findings = [], smtpMessages = [], appMessages = []
let phase = 'bootstrap', db, sql, mailFailure = false
const report = {scope:'isolated local native services; synthetic data only',testedAt:new Date().toISOString(),applicationRevision:execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim(),productionChanged:false,externalMailSent:false,findings,
  limitations:['No browser automation or physical phone run against this local stack','No hosted Google OAuth, provider redirect allowlist or real inbox delivery is verified','Fresh native PostgreSQL/Auth/PostgREST are representative services, not the hosted Supabase configuration','SMTP mail and Resend-compatible responses are captured locally; provider acceptance is simulated']}
report.harnessSha256=Object.fromEntries(await Promise.all(['native-runtime.mjs','native-flows.mjs','run-native.py'].map(async file=>[file,createHash('sha256').update(await readFile(join(repo,'tests/integration',file))).digest('hex')])))
// Fingerprint actual local source without reading ignored env/runtime data.
const sourceFiles=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:repo,encoding:'utf8'}).split('\0')
  .filter(file=>file && !file.startsWith('docs/') && /\.(?:ts|tsx|mjs|cjs|css|json|yaml|sql|py)$/.test(file)).sort()
const sourceHashes=await Promise.all([...new Set(sourceFiles)].map(async file=>file+'\0'+createHash('sha256').update(await readFile(join(repo,file))).digest('hex')))
report.applicationSourceFingerprint=createHash('sha256').update(sourceHashes.join('\n')).digest('hex')
report.applicationWorkingTreeDirty=Boolean(execFileSync('git',['status','--porcelain'],{cwd:repo,encoding:'utf8'}).trim())
const pause = ms => new Promise(done=>setTimeout(done,ms))
const jwt = role => {
  const header = Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url')
  const claims = Buffer.from(JSON.stringify({role,iss:supabaseUrl+'/auth/v1',iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600})).toString('base64url')
  const input = header+'.'+claims
  return input+'.'+createHmac('sha256',jwtSecret).update(input).digest('base64url')
}
const anonJwt=jwt('anon'), serviceJwt=jwt('service_role')
async function check(name,run) { phase=name; await run(); findings.push({check:name,passed:true}); console.log('PASS '+name) }
async function listen(server,port) {
  await new Promise((ok,no)=>{server.once('error',no);server.listen(port,'127.0.0.1',ok)})
  servers.push(server)
}
function launch(name,command,args,env={}) {
  const log=createWriteStream(join(qa,name+'.log'),{mode:0o600})
  const child=spawn(command,args,{cwd:repo,env:{...process.env,...env},stdio:['ignore','pipe','pipe']})
  child.stdout.pipe(log);child.stderr.pipe(log);children.push(child)
  return child
}
async function waitHttp(url,child) {
  for(let i=0;i<150;i++) {
    if(child?.exitCode!==null && child?.exitCode!==undefined) throw Error('Service exited: '+child.exitCode)
    try {const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(2000)});await response.arrayBuffer();if(response.status<500)return} catch {}
    await pause(100)
  }
  throw Error('Service did not become ready')
}
class CookieJar {
  items=[]
  getAll(url=appUrl) {
    const path=new URL(url).pathname
    return this.items.filter(x=>path.startsWith(x.path) && (x.path.endsWith('/') || path.length===x.path.length || path[x.path.length]==='/')).map(({name,value})=>({name,value}))
  }
  setAll(cookies) {
    for(const {name,value,options={}} of cookies) {
      const path=options.path||'/'
      this.items=this.items.filter(x=>!(x.name===name&&x.path===path))
      if(options.maxAge!==0 && value!=='')this.items.push({name,value,path,secure:Boolean(options.secure)})
    }
  }
  receive(response) {
    this.setAll(response.headers.getSetCookie().map(line=>{
      const [pair,...parts]=line.split(';'),equal=pair.indexOf('=')
      const options={}
      for(const part of parts){const [key,value]=part.trim().split('=');if(key.toLowerCase()==='path')options.path=value;if(key.toLowerCase()==='max-age')options.maxAge=Number(value);if(key.toLowerCase()==='secure')options.secure=true}
      return {name:pair.slice(0,equal),value:pair.slice(equal+1),options}
    }))
  }
}
function authClient(jar,{legacy=false}={}) {
  return createServerClient(supabaseUrl,pubKey,{cookieOptions:{name:legacy?'aves-au-auth':'aves-auth',path:legacy?'/australia':'/',sameSite:'lax',secure:false},cookies:{getAll:()=>jar.getAll(legacy?appUrl+'/australia':appUrl),setAll:values=>jar.setAll(values)}})
}
async function request(path,{jar,method='GET',body,headers={},follow=false}={}) {
  let url=path.startsWith('http')?path:appUrl+path
  let options={method,headers:{...headers},redirect:'manual',signal:AbortSignal.timeout(30000)}
  if(body!==undefined){options.body=JSON.stringify(body);options.headers['Content-Type']='application/json';options.headers.Origin??=appUrl}
  for(let i=0;i<12;i++){
    assert([new URL(appUrl).origin,new URL(supabaseUrl).origin].includes(new URL(url).origin),'Refused off-target request')
    if(jar)options.headers.Cookie=jar.getAll(url).map(x=>x.name+'='+x.value).join('; ')
    const response=await fetch(url,options);if(jar)jar.receive(response)
    if(follow&&[301,302,303,307,308].includes(response.status)){
      await response.arrayBuffer();url=new URL(response.headers.get('location'),url).href;options={method:'GET',headers:{},redirect:'manual',signal:AbortSignal.timeout(30000)};continue
    }
    const text=await response.text();let data;try{data=JSON.parse(text)}catch{}
    return {status:response.status,headers:response.headers,data,text,url}
  }
  throw Error('Redirect loop')
}
function mailLink(message) {
  const decoded=message.raw.replace(/=\r?\n/g,'').replace(/=([A-Fa-f0-9]{2})/g,(_,code)=>String.fromCharCode(parseInt(code,16)))
  const links=[...decoded.matchAll(/href=["']([^"']+)["']/g)].map(x=>x[1].replaceAll('&amp;','&'))
  const link=links.find(x=>x.startsWith(supabaseUrl+'/auth/v1/verify'))
  assert(link,'Auth email contains a local verification link')
  return link
}
async function waitMail(after,to) {
  for(let i=0;i<50;i++){const mail=smtpMessages.slice(after).find(x=>x.to.some(address=>address.includes(to)));if(mail)return mail;await pause(100)}
  throw Error('No captured Auth email')
}
async function signup(email,{legacy=false,confirm=true}={}) {
  const jar=new CookieJar(), client=authClient(jar,{legacy}),password='AVES-local-fixture-'+randomBytes(16).toString('hex')
  const before=smtpMessages.length
  const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:appUrl+'/australia/auth/callback?next=%2Faccount'}})
  assert.equal(error,null,error?.message);assert(data.user?.id);assert.equal(data.session,null,'Confirmation is required')
  const fixture={email,password,id:data.user.id,jar,client}
  if(confirm){const mail=await waitMail(before,email);const result=await request(mailLink(mail),{jar,follow:true});assert.equal(new URL(result.url).pathname,'/account');assert.equal(result.status,200);assert(jar.items.some(x=>/^aves-auth(?:\.\d+)?$/.test(x.name)))}
  return fixture
}

try {
  await check('matching PostgreSQL 17.11 starts without Docker',async()=>{
    // These fixtures use no hosted project. The HTTP helper separately rejects
    // every off-target origin, including during callback redirects.
    assert(!resolve(qa).startsWith(repo+'/') && !resolve(runtime).startsWith(repo+'/'),'Use disposable fixture directories outside the checkout')
    assert.equal(new URL(appUrl).hostname,'127.0.0.1')
    assert.equal(new URL(supabaseUrl).hostname,'127.0.0.1')
    db=new EmbeddedPostgres({databaseDir:join(qa,'postgres'),port:ports.postgres,user:'postgres',password:pgPassword,persistent:false,autoRehydrateSymlinks:true,postgresFlags:['-c','unix_socket_directories=','-c','listen_addresses=127.0.0.1'],onLog:()=>{},onError:()=>{}})
    await db.initialise();await db.start();sql=db.getPgClient();await sql.connect()
    const version=(await sql.query('show server_version')).rows[0].server_version;assert(version.startsWith('17.11'));report.postgres=version
    await sql.query("CREATE ROLE anon NOLOGIN NOINHERIT; CREATE ROLE authenticated NOLOGIN NOINHERIT; CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS; CREATE ROLE supabase_admin NOLOGIN NOINHERIT;")
    await sql.query("CREATE ROLE supabase_auth_admin LOGIN NOINHERIT CREATEROLE PASSWORD '"+authPassword+"'; CREATE SCHEMA auth AUTHORIZATION supabase_auth_admin; ALTER ROLE supabase_auth_admin SET search_path=auth;")
    await sql.query("CREATE ROLE authenticator LOGIN NOINHERIT PASSWORD '"+restPassword+"'; GRANT anon,authenticated,service_role TO authenticator; GRANT USAGE ON SCHEMA public TO anon,authenticated,service_role;")
  })
  await check('Auth SMTP restricts fixture recipients and application mail is captured without forwarding',async()=>{
    const smtp=net.createServer(socket=>{
      socket.setEncoding('utf8');socket.write('220 AVES local QA\r\n');let buffer='',data=false,lines=[],to=[]
      socket.on('data',chunk=>{buffer+=chunk;let end;while((end=buffer.indexOf('\n'))>=0){const line=buffer.slice(0,end).replace(/\r$/,'');buffer=buffer.slice(end+1)
        if(data){if(line==='.') {smtpMessages.push({to:[...to],raw:lines.join('\r\n')});data=false;lines=[];socket.write('250 Captured locally\r\n')}else lines.push(line);continue}
        if(/^(EHLO|HELO)/i.test(line))socket.write('250-AVES-local\r\n250-8BITMIME\r\n250 SIZE 1048576\r\n')
        else if(/^MAIL FROM/i.test(line)){to=[];socket.write('250 OK\r\n')}
        else if(/^RCPT TO/i.test(line)){if(!/@example\.(test|invalid)>?$/i.test(line))socket.write('550 Fixture recipients only\r\n');else{to.push(line);socket.write('250 OK\r\n')}}
        else if(/^DATA$/i.test(line)){data=true;socket.write('354 End with dot\r\n')}
        else if(/^QUIT$/i.test(line)){socket.end('221 Bye\r\n')}
        else socket.write('250 OK\r\n')
      }})
    });await listen(smtp,ports.smtp)
    // The existing quote workflow has a fixed owner recipient. Capture that
    // envelope locally as well; this server has no forwarding/delivery code.
    const mail=http.createServer(async(req,res)=>{let raw='';for await(const chunk of req)raw+=chunk;const payload=JSON.parse(raw||'{}');const recipients=[payload.to].flat();res.setHeader('Content-Type','application/json');if(!recipients.every(x=>/@example\.(test|invalid)$/.test(x)||x==='mmelendro@gmail.com')){res.writeHead(400);return res.end('{"message":"Unexpected test recipient"}')}appMessages.push({payload,idempotencyKey:req.headers['idempotency-key']});if(mailFailure){res.writeHead(500);res.end(JSON.stringify({name:'application_error',message:'Local fixture failure'}))}else res.end(JSON.stringify({id:randomUUID()}))});await listen(mail,ports.mail)
  })
  await check('real Supabase Auth migrates its isolated schema and starts',async()=>{
    const environment={
      DATABASE_URL:'postgresql://supabase_auth_admin:'+authPassword+'@127.0.0.1:'+ports.postgres+'/postgres?sslmode=disable',
      GOTRUE_DB_DRIVER:'postgres',DB_NAMESPACE:'auth',GOTRUE_DB_NAMESPACE:'auth',GOTRUE_DB_MIGRATIONS_PATH:join(runtime,'bin/migrations'),
      GOTRUE_API_HOST:'127.0.0.1',GOTRUE_API_PORT:String(ports.auth),PORT:String(ports.auth),
      API_EXTERNAL_URL:supabaseUrl+'/auth/v1',GOTRUE_SITE_URL:appUrl,GOTRUE_URI_ALLOW_LIST:appUrl+'/**',
      GOTRUE_JWT_SECRET:jwtSecret,GOTRUE_JWT_ISSUER:supabaseUrl+'/auth/v1',GOTRUE_JWT_AUD:'authenticated',GOTRUE_JWT_EXP:'3600',GOTRUE_JWT_ADMIN_ROLES:'service_role,supabase_admin',GOTRUE_JWT_DEFAULT_GROUP_NAME:'authenticated',
      GOTRUE_DISABLE_SIGNUP:'false',GOTRUE_EXTERNAL_EMAIL_ENABLED:'true',GOTRUE_MAILER_AUTOCONFIRM:'false',
      GOTRUE_SMTP_HOST:'127.0.0.1',GOTRUE_SMTP_PORT:String(ports.smtp),GOTRUE_SMTP_USER:'',GOTRUE_SMTP_PASS:'',GOTRUE_SMTP_ADMIN_EMAIL:'noreply@example.test',GOTRUE_SMTP_SENDER_NAME:'AVES Local QA',GOTRUE_SMTP_MAX_FREQUENCY:'0s',GOTRUE_RATE_LIMIT_EMAIL_SENT:'1000',
      GOTRUE_MAILER_URLPATHS_CONFIRMATION:'/auth/v1/verify',GOTRUE_MAILER_URLPATHS_RECOVERY:'/auth/v1/verify',GOTRUE_LOG_LEVEL:'warn',
    }
    const migration=launch('auth-migrate',join(runtime,'bin/auth'),['migrate'],environment)
    const exit=await new Promise(ok=>migration.once('exit',ok))
    if(exit!==0) throw Error('Auth schema migration failed: '+(await readFile(join(qa,'auth-migrate.log'),'utf8')).slice(-1500).replaceAll(authPassword,'[redacted]').replaceAll(jwtSecret,'[redacted]'))
    assert((await sql.query("select to_regclass('auth.users') is not null as ready")).rows[0].ready)
    // Supabase's PostgreSQL image supplies this schema usage. Native GoTrue
    // creates uid()/jwt() but does not install the platform role grants.
    await sql.query('GRANT USAGE ON SCHEMA auth TO anon,authenticated,service_role')
    const auth=launch('auth',join(runtime,'bin/auth'),['serve'],environment)
    await waitHttp('http://127.0.0.1:'+ports.auth+'/health',auth)
    report.auth='2.197.0'
  })
  const migrations=['20261104210527_australia_contact_storage.sql','20261104222434_australia_client_trips_quotes.sql','20261106105909_australia_draft_quota_and_default_privileges.sql','20261106105919_australia_client_quote_column_privileges.sql','20261106114144_shared_country_plans_and_contacts.sql','20261106203926_extensible_destination_catalogue.sql','20261108023556_new_zealand_private_planning_brief.sql','20261108030916_nz_private_bird_wishlist.sql','20261108192239_private_trip_budget_preferences.sql']
  await check('only the nine maintained application migrations apply to the fresh database',async()=>{
    const tables=(await sql.query("select tablename from pg_tables where schemaname='public'")).rows;assert.equal(tables.length,0)
    for(const file of migrations)await sql.query(await readFile(join(repo,'supabase/migrations',file),'utf8'))
    report.applicationMigrations=migrations
  })
  await check('real PostgREST and the local TLS API gateway start with separate client and service roles',async()=>{
    const rest=launch('postgrest',join(runtime,'bin/postgrest'),[],{PGRST_DB_URI:'postgresql://authenticator:'+restPassword+'@127.0.0.1:'+ports.postgres+'/postgres',PGRST_DB_SCHEMAS:'public',PGRST_DB_ANON_ROLE:'anon',PGRST_JWT_SECRET:jwtSecret,PGRST_SERVER_HOST:'127.0.0.1',PGRST_SERVER_PORT:String(ports.rest),PGRST_DB_POOL:'3',PGRST_LOG_LEVEL:'error'});await waitHttp('http://127.0.0.1:'+ports.rest+'/',rest)
    const gateway=https.createServer({key:await readFile(join(qa,'key.pem')),cert:await readFile(join(qa,'certificate.pem'))},(req,res)=>{
      const isAuth=req.url.startsWith('/auth/v1/'),isRest=req.url.startsWith('/rest/v1/')
      if(!isAuth&&!isRest){res.writeHead(404);return res.end()}
      const headers={...req.headers},key=headers.apikey
      if(key===pubKey){if(!headers.authorization||headers.authorization==='Bearer '+pubKey)headers.authorization='Bearer '+anonJwt}
      else if(key===serviceKey)headers.authorization='Bearer '+serviceJwt
      else if(!isAuth||!/^\/auth\/v1\/(verify|callback|authorize|health)(?:[/?]|$)/.test(req.url)){res.writeHead(401);return res.end('{"error":"Test API key required"}')}
      const path=req.url.slice(isAuth?'/auth/v1'.length:'/rest/v1'.length)||'/'
      const upstream=http.request({hostname:'127.0.0.1',port:isAuth?ports.auth:ports.rest,path,method:req.method,headers},response=>{res.writeHead(response.statusCode,response.headers);response.pipe(res)})
      upstream.on('error',()=>{res.writeHead(502);res.end()});req.pipe(upstream)
    });await listen(gateway,ports.supabase);report.postgrest='16.5'
  })
  await check('the AVES application starts against local-only services',async()=>{
    const environment={NODE_ENV:'development',VERCEL_ENV:'development',NEXT_PUBLIC_SITE_URL:appUrl,NEXT_PUBLIC_SUPABASE_URL:supabaseUrl,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:pubKey,SUPABASE_URL:supabaseUrl,SUPABASE_SECRET_KEY:serviceKey,AVES_OAUTH_PROVIDERS:'',RESEND_API_KEY:'re_local_fixture_only',RESEND_BASE_URL:'http://127.0.0.1:'+ports.mail,CONTACT_EMAIL:'owner@example.test',CONTACT_FROM:'AVES QA <noreply@example.test>'}
    const required=(await readFile(join(repo,'.env.example'),'utf8')).split('\n').filter(x=>/^[A-Z_]+=/.test(x)).map(x=>x.split('=')[0]);assert(required.every(key=>key in environment),'Every configured key is supplied by the isolated fixture')
    const app=launch('next',process.execPath,[join(repo,'node_modules/next/dist/bin/next'),'dev','--hostname','127.0.0.1','--port',String(ports.app)],environment);await waitHttp(appUrl+'/account/sign-in',app)
  })
  const ctx={check,assert,sql,request,signup,authClient,CookieJar,appUrl,supabaseUrl,pubKey,smtpMessages,appMessages,waitMail,mailLink,randomUUID,pause,setMailFailure:value=>{mailFailure=value}}
  const {runFlows}=await import('./native-flows.mjs');await runFlows(ctx)
  report.passed=true
} catch(error) {
  report.passed=false;report.failure={phase,message:String(error.message).replace(/(?:sb_(?:secret|publishable)_[A-Za-z0-9_-]+|eyJ[A-Za-z0-9_.-]+|postgresql:\/\/[^\s]+)/g,'[redacted]')}
  console.error('FAIL '+phase+': '+report.failure.message)
  console.error(String(error.stack).split('\n').filter(line=>line.trim().startsWith('at ')).slice(0,4).join('\n'))
  for (const name of ['next','postgrest']) {
    const log=await readFile(join(qa,name+'.log'),'utf8').catch(()=>'')
    console.error(name+' diagnostics: '+log.slice(-2000).replaceAll(pubKey,'[redacted]').replaceAll(serviceKey,'[redacted]').replaceAll(jwtSecret,'[redacted]').replace(/eyJ[A-Za-z0-9_.-]+/g,'[redacted]').replace(/([?&](?:code|token|token_hash)=)[^&\s]+/g,'$1[redacted]'))
  }
} finally {
  for(const child of children.reverse())child.kill('SIGTERM')
  await pause(150)
  for(const child of children)if(child.exitCode===null)child.kill('SIGKILL')
  await Promise.all(servers.map(server=>new Promise(ok=>{server.close(ok);server.closeAllConnections?.()})))
  if(sql)await sql.end().catch(()=>{})
  if(db)await db.stop().catch(()=>{})
  report.nativeServicesStopped=true
  await mkdir(resolve(process.env.AVES_QA_REPORT,'..'),{recursive:true})
  await writeFile(process.env.AVES_QA_REPORT,JSON.stringify(report,null,2)+'\n')
  console.log(JSON.stringify({passed:report.passed,checks:findings.length,productionChanged:false,externalMailSent:false}))
}
if(!report.passed)process.exitCode=1
