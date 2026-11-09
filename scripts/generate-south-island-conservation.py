"""Prepare DOC's attributed public land snapshot in the existing Mercator frame.
Raw API downloads stay outside Git in ../audit/map-layers. National parks remain
separate from other public conservation land. No parcel implies visitor access.
Run with the GIS Python environment; requires shapely. Source snapshots are fetched
using the DOC public FeatureServer query API, outSR=3857, maxAllowableOffset=500.
"""
import json,re,hashlib
from pathlib import Path
from shapely.geometry import Polygon
from shapely.ops import unary_union,transform
ROOT=Path(__file__).resolve().parents[1]
cache=ROOT.parent/'audit/map-layers'
m=json.loads((ROOT/'content/south-island-ecosystem-map.json').read_text());bbox=m['bbox'];res=(bbox[2]-bbox[0])/480
rings=[[(float(x),float(y)) for x,y in re.findall(r'([\d.-]+),([\d.-]+)',r)] for r in m['outline'].split('M') if r]
outline=Polygon(rings[0],rings[1:]); outline_projected=transform(lambda x,y:(bbox[0]+x*res,bbox[3]-y*res),outline)
raw=(cache/'doc-south-island-features.json').read_bytes();data=json.loads(raw)
def geometry(rings):
 polys=[Polygon(r) for r in rings if len(r)>3]
 if not polys:return Polygon()
 def signed(poly):
  r=list(poly.exterior.coords);return sum(x1*y2-x2*y1 for (x1,y1),(x2,y2) in zip(r,r[1:]))
 sign=1 if signed(max(polys,key=lambda p:p.area))>0 else -1
 exteriors=[p for p in polys if signed(p)*sign>0];holes=[p for p in polys if signed(p)*sign<0]
 result=unary_union([p.buffer(0) for p in exteriors])
 if holes:result=result.difference(unary_union([p.buffer(0) for p in holes]))
 return result
lands=[];parks=[];kept=0
for feature in data['features']:
 if not feature.get('geometry'):continue
 geo=geometry(feature['geometry']['rings']).intersection(outline_projected)
 if geo.is_empty:continue
 kept+=1
 geo=transform(lambda x,y:((x-bbox[0])/res,(bbox[3]-y)/res),geo).simplify(.65,preserve_topology=True)
 lands.append(geo)
 if feature['attributes']['Type']=='NATIONAL_PARK':parks.append((feature['attributes']['Name'],geo))
def path(geo):
 if geo.geom_type=='Polygon':polys=[geo]
 elif geo.geom_type in ['MultiPolygon','GeometryCollection']:polys=[p for p in geo.geoms if p.geom_type=='Polygon']
 else:return ''
 return ''.join('M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in ring.coords)+'Z' for poly in polys for ring in [poly.exterior,*poly.interiors])
source=dict(name='DOC Public Conservation Land',url='https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0',licence='CC BY 4.0',licenceUrl='https://creativecommons.org/licenses/by/4.0/',retrieved='2026-11-09',copyright='Crown Copyright: Department of Conservation Te Papa Atawhai 2026',inputFeatures=len(data['features']),visibleFeatures=kept,generalisationMetres=2000,snapshotSha256=hashlib.sha256(raw).hexdigest())
output=dict(viewBox=m['viewBox'],bbox=bbox,source=source,conservationPath=path(unary_union(lands).simplify(.65,preserve_topology=True)),parks=[dict(id=re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),name=name,path=path(geo),point=[round(geo.representative_point().x,2),round(geo.representative_point().y,2)]) for name,geo in parks])
assert len(parks)==9,[name for name,_ in parks]
(ROOT/'content/south-island-conservation-layers.json').write_text(json.dumps(output,separators=(',',':'))+'\n')
(ROOT/'content/south-island-layer-catalogue.json').write_text(json.dumps(dict(source=source,parks=[{k:v for k,v in park.items() if k!='path'} for park in output['parks']]),separators=(',',':'))+'\n')
print('Generated',kept,'visible records and',len(parks),'South Island national parks. Output chars',len(json.dumps(output)))
