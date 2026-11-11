"""Create the geographic Colombia reference alongside the editorial artwork.
Usage: python scripts/generate-colombia-geographic-map.py <NE50 countries GeoJSON>
Natural Earth public domain; retain all polygons/rings and use one Mercator fit.
"""
import json,math,hashlib,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1];raw=Path(sys.argv[1]).read_bytes();digest=hashlib.sha256(raw).hexdigest()
assert digest=='3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb','Review changed geography before regeneration'
f=next(f for f in json.loads(raw)['features'] if f['properties']['ADM0_A3']=='COL');polys=f['geometry']['coordinates'] if f['geometry']['type']=='MultiPolygon' else [f['geometry']['coordinates']]
def xy(p):
 lon,lat=p;return math.radians(lon),math.log(math.tan(math.pi/4+math.radians(lat)/2))
points=[xy(p) for poly in polys for ring in poly for p in ring];xs,ys=zip(*points);scale=min(586/(max(xs)-min(xs)),754/(max(ys)-min(ys)));tx=317-scale*(max(xs)+min(xs))/2;ty=401+scale*(max(ys)+min(ys))/2
paths=[''.join('M'+'L'.join(f'{tx+scale*xy(p)[0]:.2f},{ty-scale*xy(p)[1]:.2f}' for p in ring)+'Z' for ring in poly) for poly in polys]
d=dict(viewBox='0 0 634 802',size=[634,802],fit=[scale,tx,ty],paths=paths,projection='Spherical Mercator, north up, uniform fit; all Colombian polygons in the pinned Natural Earth country source',sourceUrl='https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/',geometrySha256=digest,scope='Generalised country overview, not editorial planning-region boundaries, property entrances or current access.')
(root/'content/colombia-geographic-map.json').write_text(json.dumps(d,indent=2)+'\n')
