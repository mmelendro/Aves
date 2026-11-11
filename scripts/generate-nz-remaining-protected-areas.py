#!/usr/bin/env python3
"""DOC North Island/Rakiura national park snapshot; Shapely 2.1.2 offline only.
Run from the repository: PYTHONPATH=/tmp/aves-map-gis python scripts/generate-nz-remaining-protected-areas.py SOURCE.json
The official GeoJSON conversion emits nested shells. Use the reviewed Esri JSON
instead and assign its counterclockwise holes to the smallest containing shell.
Reject invalid geometry; never fill holes through an automatic repair.
"""
import hashlib,json,sys
from pathlib import Path
from shapely.geometry import Polygon,MultiPolygon,shape,mapping,Point
ROOT=Path.cwd()
inputs=json.loads((ROOT/'content/new-zealand-protected-area-input.json').read_text())
b=Path(sys.argv[1]).read_bytes()
if hashlib.sha256(b).hexdigest()!=inputs['sha256']:raise ValueError('Unreviewed DOC input')
data=json.loads(b)
if data.get('exceededTransferLimit') or len(data['features'])!=4 or data['spatialReference']['wkid']!=4326:raise ValueError('Unexpected response')

def from_esri(rings):
    shells=[];holes=[]
    for ring in rings:
        if len(ring)<4 or ring[0]!=ring[-1]:raise ValueError('Invalid ring')
        clockwise=sum((b[0]-a[0])*(b[1]+a[1]) for a,b in zip(ring,ring[1:]))>0
        (shells if clockwise else holes).append(ring)
    ps=[Polygon(r) for r in shells];assigned=[[] for _ in ps]
    for hole in holes:
        p=Polygon(hole)
        owners=[i for i,shell in enumerate(ps) if shell.covers(p)]
        if not owners:raise ValueError('Orphan hole')
        assigned[min(owners,key=lambda i:ps[i].area)].append(hole)
    result=MultiPolygon([Polygon(r,h) for r,h in zip(shells,assigned)])
    if not result.is_valid:raise ValueError('Invalid assembled geometry')
    return result

def rounded(x):return [rounded(v) for v in x] if isinstance(x,(list,tuple)) else round(x,8)
def parts(g):
    ps=[g] if g.geom_type=='Polygon' else list(g.geoms)
    return len(ps),sum(len(p.interiors) for p in ps)
features=[];areas=[];checks=[]
for f in data['features']:
    p=f['attributes'];id=str(p['NaPALIS_ID'])
    if p['Type']!='NATIONAL_PARK' or id not in inputs['parks']:raise ValueError('Unreviewed park')
    editorial=inputs['parks'][id];g=from_esri(f['geometry']['rings']);tolerance=.0005
    while True:
        geo=mapping(g.simplify(tolerance,preserve_topology=True));geo['coordinates']=rounded(geo['coordinates']);candidate=shape(geo)
        change=g.symmetric_difference(candidate).area/g.area
        if candidate.is_valid and parts(g)==parts(candidate) and change<=.02:break
        tolerance/=2
        if tolerance<1e-9:raise ValueError('Cannot simplify '+id)
    label=rounded(list(candidate.representative_point().coords[0]))
    if not candidate.contains(Point(label)):raise ValueError('Invalid label')
    a={'id':id,'name':editorial['name'],'sourceName':p['Name'],'category':'National Park','sourceType':p['Type'],'legislationCode':p['Legislation'],'sourceUrl':editorial['url'],'island':editorial['island'],'labelPoint':label,'bounds':rounded(candidate.bounds)}
    areas.append(a);features.append({'type':'Feature','properties':a,'geometry':geo});checks.append({'id':id,'polygons':parts(g)[0],'holes':parts(g)[1],'toleranceDegrees':tolerance,'symmetricAreaChange':change})
provenance={
 'publisher':'Department of Conservation Te Papa Atawhai','sourceUrl':inputs['serviceUrl'],'sourceDate':'2026-11-12','reviewedAt':'2026-11-12','dateScope':'Retrieval date, not a new legal gazettal date. Service last edited 10 November 2026 UTC.',
 'licence':'CC BY 4.0','licenceUrl':'https://creativecommons.org/licenses/by/4.0/','licenceEvidence':inputs['serviceUrl'],
 'attribution':'Crown Copyright: Department of Conservation Te Papa Atawhai 2026. Selected and generalised by AVES.',
 'inputSha256':inputs['sha256'],'downloadUrl':inputs['downloadUrl'],'sourceCrs':'NZTM2000 / EPSG:2193; official service outSR=4326','outputCrs':'OGC:CRS84, longitude/latitude WGS84',
 'modifications':'Four selected NaPALIS units. Esri clockwise shells/counterclockwise holes reconstructed without repair. Topology-preserving simplification at at most 0.0005 degrees, 8-decimal coordinates, all islands/holes retained and at most 2% symmetric area change.',
 'limitations':'North Island and Rakiura national park pilot, not complete conservation-land coverage. Other reserves, marine areas, Te Urewera and offshore conservation islands omitted. South Island retains its separately reviewed existing nine-park/DOC layer. Boundaries do not establish current access, track conditions, bird occurrence or certification. Respect closures, permits and cultural guidance.'}
features.sort(key=lambda f:f['properties']['id']);areas.sort(key=lambda a:a['name'])
blob=(json.dumps({'type':'FeatureCollection','provenance':provenance,'features':features},ensure_ascii=False,separators=(',',':'))+'\n').encode();path='/data/new-zealand-north-rakiura-parks.geojson'
(ROOT/'public'/path.lstrip('/')).write_bytes(blob)
(ROOT/'content/new-zealand-protected-areas.json').write_text(json.dumps({**provenance,'count':4,'geometryPath':path,'geometrySha256':hashlib.sha256(blob).hexdigest(),'geometryChecks':checks,'areas':areas},ensure_ascii=False,indent=2)+'\n')
print(len(blob),'bytes;',checks)
