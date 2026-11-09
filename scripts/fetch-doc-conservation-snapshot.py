# Fetch a cached DOC public-land snapshot. Uses the documented query API.
# No key or private visitor data. Run before the conservation generator.
import json,urllib.request,urllib.parse,concurrent.futures
from pathlib import Path
base='https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0/query'
ROOT=Path(__file__).resolve().parents[1]
cache=ROOT.parent/'audit/map-layers';cache.mkdir(parents=True,exist_ok=True)
def query(params):
 request=urllib.request.Request(base,data=urllib.parse.urlencode({'f':'json',**params}).encode(),headers={'Content-Type':'application/x-www-form-urlencoded'})
 with urllib.request.urlopen(request,timeout=45) as r: out=json.load(r)
 if 'error' in out: raise ValueError(out['error'])
 return out
ids=query(dict(where='1=1',geometry='165.8,-47.4,174.8,-40',geometryType='esriGeometryEnvelope',inSR=4326,spatialRel='esriSpatialRelIntersects',returnIdsOnly='true'))['objectIds']
ids=sorted(ids)
chunks=[ids[i:i+500] for i in range(0,len(ids),500)]
def batch(pair):
 i,chunk=pair
 path=cache/f'doc-south-island-page-{i}.json'
 if path.exists():return json.loads(path.read_text())
 data=query(dict(objectIds=','.join(map(str,chunk)),outFields='OBJECTID,Name,Type,Legislation',outSR=3857,maxAllowableOffset=500,returnGeometry='true'))
 if data.get('exceededTransferLimit'):raise ValueError('Truncated DOC response')
 path.write_text(json.dumps(data));return data
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 pages=list(pool.map(batch,enumerate(chunks)))
features=[f for p in pages for f in p['features']]
assert len(features)==len(ids),(len(features),len(ids))
cache.joinpath('doc-south-island-features.json').write_text(json.dumps({'features':features,'source':base,'ids':ids}))
from collections import Counter
print(json.dumps({'records':len(features),'types':Counter(f['attributes']['Type'] for f in features)},indent=2))
