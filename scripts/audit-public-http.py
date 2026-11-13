import urllib.request,urllib.error,urllib.parse,xml.etree.ElementTree as ET,concurrent.futures,json,gzip,argparse,sys
from html.parser import HTMLParser
from pathlib import Path
class Page(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.main=0;self.ids=[];self.anchors=[];self.images=[];self.canonical=[];self.title=False;self.titleText=''
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='title':self.title=True
  if t=='h1':self.h1+=1
  if t=='main':self.main+=1
  if 'id'in a:self.ids.append(a['id'])
  if t=='a':self.anchors.append(a)
  if t=='img':self.images.append(a)
  if t=='link'and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
 def handle_endtag(self,t):
  if t=='title':self.title=False
 def handle_data(self,s):
  if self.title:self.titleText+=s
parser=argparse.ArgumentParser(description='Read-only public-route regression audit; no accounts, cookies or writes.')
parser.add_argument('--base-url',default='https://aves.bio')
parser.add_argument('--check-budgets',action='store_true')
parser.add_argument('--output',default='public-http-audit.json')
args=parser.parse_args()
base=args.base_url.rstrip('/')
origin=urllib.parse.urlsplit(base)
if origin.scheme not in ('http','https') or origin.path or origin.query or origin.username:
 raise SystemExit('Supply an origin without a path, query or credentials')
class Redirects(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,request,fp,code,msg,headers,newurl):
  if urllib.parse.urlsplit(newurl).netloc!=origin.netloc:raise ValueError('Cross-origin redirect rejected')
  return super().redirect_request(request,fp,code,msg,headers,newurl)
opener=urllib.request.build_opener(Redirects())
root=ET.fromstring(opener.open(base+'/sitemap.xml',timeout=30).read())
paths=[urllib.parse.urlsplit(n.text).path+('?' + urllib.parse.urlsplit(n.text).query if urllib.parse.urlsplit(n.text).query else '') for n in root.findall('.//{*}loc') if urllib.parse.urlsplit(n.text).hostname=='aves.bio']
if any(p.startswith(('/account','/admin','/api','/auth','/dashboard','/shopping')) for p in paths):raise SystemExit('Private path unexpectedly included in public sitemap')
urls=[base+p for p in paths[:150]]
urls+=[base+'/species/reference?country='+c for c in ['colombia','australia','new-zealand']]
def check(url):
 try:
  with opener.open(urllib.request.Request(url,headers={'Accept-Encoding':'gzip'}),timeout=30)as r:
   raw=r.read();data=gzip.decompress(raw)if r.headers.get('Content-Encoding')=='gzip'else raw
   p=Page();p.feed(data.decode());ids=set(p.ids)
   return dict(url=url,status=r.status,title=p.titleText,h1=p.h1,main=p.main,bytes=len(data),transferBytes=len(raw),canonical=p.canonical,missingAlt=sum('alt'not in i for i in p.images),brokenLocalAnchors=[a['href']for a in p.anchors if a.get('href','').startswith('#')and a['href'][1:]not in ids],duplicateIds=len(p.ids)-len(ids),headers={k:r.headers.get(k)for k in ['Content-Security-Policy','X-Content-Type-Options','Referrer-Policy','Strict-Transport-Security','Cache-Control']})
 except Exception as e:return dict(url=url,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=8)as pool:results=list(pool.map(check,dict.fromkeys(urls)))
Path(args.output).write_text(json.dumps(results,indent=2))
print('routes',len(results),'errors',sum('error'in r for r in results));print(json.dumps([r for r in results if r.get('h1')!=1 or r.get('main')!=1 or r.get('missingAlt') or r.get('brokenLocalAnchors') or r.get('duplicateIds')],indent=2));print('largest',[(r['url'],r.get('bytes'))for r in sorted(results,key=lambda r:r.get('bytes',0),reverse=True)[:5]])

failed=[r for r in results if 'error'in r or r.get('h1')!=1 or r.get('main')!=1 or r.get('missingAlt') or r.get('brokenLocalAnchors') or r.get('duplicateIds')]
if args.check_budgets:
 budgets=json.loads(Path('content/performance-budgets.json').read_text()).get('decodedHtmlBytes',{})
 for route,limit in budgets.items():
  entry=next((r for r in results if urllib.parse.urlsplit(r['url']).path==route),None)
  if not entry or entry.get('bytes',limit+1)>limit:
   failed.append({'route':route,'budget':limit,'actual':entry.get('bytes') if entry else None})
   print('HTML budget exceeded',failed[-1])
sys.exit(bool(failed))
