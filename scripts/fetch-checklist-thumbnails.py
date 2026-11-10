# Produces candidates only. Review taxonomy, rendered image, rights and integrity
# before adding records to the production manifest. Never overwrites reviewed data.
import json,urllib.request,urllib.parse,concurrent.futures,re,html,time,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1];cache=Path('/tmp/aves-bird-image-cache');cache.mkdir(exist_ok=True)
UA='AVES media reference audit/1.0 (https://aves.bio)'
def request_json(base,q):
 key=hashlib.sha256((base+json.dumps(q,sort_keys=True)).encode()).hexdigest();f=cache/(key+'.json')
 if f.exists():return json.loads(f.read_text())
 u=base+'?'+urllib.parse.urlencode(q)
 with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA}),timeout=35) as r:p=json.load(r)
 f.write_text(json.dumps(p));return p
wiki='https://en.wikipedia.org/w/api.php';wikidata='https://www.wikidata.org/w/api.php'
birds=[b for b in json.load(open(root/'content/new-zealand-checklist.json'))['species'] if not b['extinct']]
pages={};mapping={};missing=[]
for start in range(0,len(birds),40):
 chunk=birds[start:start+40];q=request_json(wiki,{'action':'query','format':'json','redirects':'1','titles':'|'.join(b['scientificName'] for b in chunk),'prop':'pageimages|pageprops','piprop':'name','pilicense':'free'})['query']
 redirects={v['from']:v['to'] for k in ['normalized','redirects'] for v in q.get(k,[])};bytitle={p['title']:p for p in q['pages'].values()}
 for b in chunk:
  title=b['scientificName']
  for _ in range(6):
   if title in redirects:title=redirects[title]
   else:break
  p=bytitle.get(title,{})
  if p.get('pageimage') and p.get('pageprops',{}).get('wikibase_item'):pages[b['id']]=p
  else:missing.append({'id':b['id'],'reason':'No free article image','scientificName':b['scientificName']})
 print('article lookup',start+len(chunk),len(pages),flush=True)
entities={};ids=sorted({p['pageprops']['wikibase_item'] for p in pages.values()})
for start in range(0,len(ids),40):entities.update(request_json(wikidata,{'action':'wbgetentities','format':'json','ids':'|'.join(ids[start:start+40]),'props':'claims'})['entities'])
valid={}
for b in birds:
 p=pages.get(b['id'])
 if not p:continue
 claims=entities.get(p['pageprops']['wikibase_item'],{}).get('claims',{});names=[c.get('mainsnak',{}).get('datavalue',{}).get('value') for c in claims.get('P225',[])]
 if b['scientificName'] in names:valid[b['id']]=p
 else:missing.append({'id':b['id'],'reason':'Taxon name requires synonym review','scientificName':b['scientificName'],'matchedNames':names})
 print('taxon coverage',len(valid),'of',len(birds),flush=True) if b is birds[-1] else None
files=sorted({p['pageimage'] for p in valid.values()});metadata={}
for start in range(0,len(files),30):
 p=request_json(wiki,{'action':'query','format':'json','titles':'|'.join('File:'+f for f in files[start:start+30]),'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':'120'})['query']['pages']
 for v in p.values():metadata[v['title'].removeprefix('File:').replace('_',' ')]=v
 print('file metadata',start+len(files[start:start+30]),flush=True)
def clean(x):return html.unescape(re.sub('<[^>]+>','',str(x))).strip()
records=[]
for b in birds:
 p=valid.get(b['id'])
 if not p:continue
 v=metadata.get(p['pageimage'].replace('_',' '),{});info=(v.get('imageinfo') or [{}])[0];m=info.get('extmetadata',{});get=lambda k:clean(m.get(k,{}).get('value',''))
 lic=get('LicenseShortName');url=get('LicenseUrl');creator=get('Artist');source=info.get('descriptionurl','')
 allowed=(('creativecommons.org/licenses/by' in url and '-nc' not in url and '-nd' not in url) or ('creativecommons.org/publicdomain/' in url) or lic in ['Public domain','CC0'])
 if not allowed or not creator or v.get('imagerepository')!='shared' or 'commons.wikimedia.org/wiki/File:' not in source or not info.get('thumburl'):
  missing.append({'id':b['id'],'scientificName':b['scientificName'],'reason':'Rights/creator/source requires review','license':lic});continue
 thumb=info['thumburl'].split('?')[0]
 ext=Path(urllib.parse.urlparse(thumb).path).suffix.lower()
 if ext not in ['.jpg','.jpeg','.png','.webp']:missing.append({'id':b['id'],'reason':'Unsupported image format'});continue
 records.append({'id':b['id'],'scientificName':b['scientificName'],'commonName':b['commonName'],'asset':'/images/checklist/'+b['id']+ext,'downloadUrl':thumb,'creator':creator,'license':lic,'licenseUrl':url or source,'sourceUrl':source,'articleUrl':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(p['title'].replace(' ','_')),'wikidataId':p['pageprops']['wikibase_item'],'modifications':'120-pixel Wikimedia thumbnail, displayed cropped; original credit and licence retained.'})
out=root/'public/images/checklist';out.mkdir(parents=True,exist_ok=True)
def download(rec):
 f=root/'public'/rec['asset'].lstrip('/')
 try:
  if not f.exists():
   with urllib.request.urlopen(urllib.request.Request(rec['downloadUrl'],headers={'User-Agent':UA}),timeout=30) as r:data=r.read(600001)
   if len(data)>600000:raise ValueError('Thumbnail too large')
   from PIL import Image
   import io
   img=Image.open(io.BytesIO(data))
   from PIL import IptcImagePlugin
   metadata=' '.join(str(v) for v in img.getexif().values())+' '+str(IptcImagePlugin.getiptcinfo(img) or {})
   if re.search(r'(?:\b(?:ph|phone|tel|telephone|mobile)\b[^\n]{0,20}\d{2}|[\w.%-]+@[\w.-]+\.[A-Za-z]{2,}|\+\d[\d ()-]{7,}\d)',metadata,re.I) or 34853 in img.getexif():raise ValueError('Candidate requires contact/GPS metadata review')
   img.verify();f.write_bytes(data)
  return rec
 except Exception as e:return {'id':rec['id'],'reason':'Download failed','error':str(e)}
downloaded=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
 for i,record in enumerate(ex.map(download,records)):
  downloaded.append(record)
  if i%25==0:print('downloaded',i+1,'of',len(records),flush=True)
ok=[r for r in downloaded if 'asset' in r];missing.extend(r for r in downloaded if 'asset' not in r)
(root/'content/new-zealand-checklist-thumbnail-candidates.json').write_text(json.dumps({'retrieved':'2026-11-10','method':'Scientific-name article redirect, exact Wikidata P225 match, free Commons image metadata, explicit reusable licence and creator. Pending records are not silently assigned another taxon image.','images':ok,'pending':missing},ensure_ascii=False,indent=2)+'\n')
print('COMPLETE',len(ok),'images',len(missing),'pending',flush=True)
