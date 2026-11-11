#!/usr/bin/env python3
"""Generate georeferenced planning overlays, without tracing the Colombia artwork.

Offline only: shapely 2.1.2, pyshp 2.3.1. Inputs are the reviewed Natural Earth
50m country GeoJSON/admin1 ZIP. Fail on changed source hashes. Colombian areas
are explicitly authored editorial approximations, not extracted ecoregions.
Run from the repo root:
PYTHONPATH=/tmp/aves-map-gis python scripts/generate-geographic-planning-regions.py \
  --countries /tmp/aves-admin0.json --states /tmp/aves-admin1.zip
"""
import argparse, hashlib, io, json, zipfile
from pathlib import Path
import shapefile
from shapely.geometry import shape, mapping, Polygon, box
from shapely import set_precision, coverage_simplify, coverage_is_valid, line_merge
from shapely.ops import unary_union

parser=argparse.ArgumentParser()
parser.add_argument('--countries',required=True)
parser.add_argument('--states',required=True)
args=parser.parse_args()
expected={args.countries:'3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb',args.states:'61f79e6705e62a55d6bcf698394295a589af5e24a4b2684c6519dd35c1300bf6'}
for file,digest in expected.items():
    if hashlib.sha256(Path(file).read_bytes()).hexdigest()!=digest: raise ValueError(f'Unreviewed source: {file}')
source=json.loads(Path(args.countries).read_text())
country=lambda name:shape(next(f for f in source['features'] if f['properties']['ADMIN']==name)['geometry'])
focus=json.loads(Path('content/geographic-map-focus.json').read_text())
colombia=json.loads(Path('content/colombia-planning-geography.json').read_text())
colours=['#38bdf8','#a3e635','#fbbf24','#c4b5fd','#2dd4bf','#fb923c','#f472b6','#facc15','#67e8f9','#86efac','#d8b4fe']
outputs={}
def feature(id,name,geometry,kind,index,simplify=True):
    if not geometry.is_valid or geometry.is_empty or geometry.geom_type not in ('Polygon','MultiPolygon'):raise ValueError(id)
    # Preserve coastline detail but bound transfer size and avoid false precision.
    if simplify:geometry=geometry.simplify(.003,preserve_topology=True)
    return {'type':'Feature','properties':{'id':id,'name':name,'kind':kind,'colour':colours[index%len(colours)],'labelPoint':list(geometry.representative_point().coords[0])},'geometry':mapping(geometry)}
# One shared partition, not independently buffered/simplified region patches.
# Each cut assigns one side and leaves the other side to its neighbour. Fixed
# precision nodes every intersection identically before joint simplification.
grid=colombia['precisionDegrees']
co=set_precision(country('Colombia'),grid)
left,bottom,right,top=colombia['frame']
edges=colombia['edges']
def side(edge,direction):
    points=edges[edge]
    corners={'north':[(right,top),(left,top)],'south':[(right,bottom),(left,bottom)],'west':[(left,top),(left,bottom)],'east':[(right,top),(right,bottom)]}
    return set_precision(Polygon(points+corners[direction]),grid)
remaining=co
regions={}
def take(id,mask):
    global remaining
    regions[id]=remaining.intersection(mask)
    remaining=remaining.difference(mask)
# Broad north/south/east contexts enclose the adjoining Andean ribbons.
take('caribbean',side('caribbean-south','north'))
regions['sierra-nevada-de-santa-marta']=regions['caribbean'].intersection(set_precision(Polygon(colombia['sierraOutline']),grid))
regions['caribbean']=regions['caribbean'].difference(regions['sierra-nevada-de-santa-marta'])
take('amazonia',side('amazonia-north','south'))
take('llanos',side('andes-east','east'))
take('pacific',side('pacific-east','west'))
take('colombian-massif',side('massif-north','south'))
for id,edge in [('western-andes','western-andes-east'),('cauca-valley','cauca-east'),('central-andes','central-andes-east'),('magdalena-valley','magdalena-east')]:
    take(id,side(edge,'west'))
regions['eastern-andes']=remaining
ids=[area['id'] for area in colombia['areas']]
# Overlay cuts can retain zero-area line remnants at a shared corner.
def polygonal(g):
    if g.geom_type in ('Polygon','MultiPolygon'):return g
    return unary_union([polygonal(part) for part in g.geoms if part.area>0])
geometries=[polygonal(regions[id]) for id in ids]
if not coverage_is_valid(geometries):raise ValueError('Colombia shared edges are not a valid coverage')
# Independent simplification would reopen cracks. This simplifies both sides of
# each shared edge together and retains the exact reviewed country perimeter.
geometries=list(coverage_simplify(geometries,colombia['simplifyDegrees'],simplify_boundary=False))
if not coverage_is_valid(geometries):raise ValueError('Simplification broke shared edges')
union=unary_union(geometries)
if co.symmetric_difference(union).area>1e-10:raise ValueError('Planning regions do not cover the country exactly')
for i,g in enumerate(geometries):
    for h in geometries[i+1:]:
        if g.intersection(h).area>1e-10:raise ValueError('Planning regions overlap')
outputs['colombia']=[feature(area['id'],area['name'],g,'approximate-planning-area',i,simplify=False) for i,(area,g) in enumerate(zip(colombia['areas'],geometries))]
# Render this mesh once. Shared edges must not become two differently coloured
# dashed strokes, which look like mismatched boundaries even when nodes agree.
colombia_mesh={'type':'Feature','properties':{'kind':'shared-planning-boundaries'},'geometry':mapping(line_merge(unary_union([g.boundary for g in geometries])))}
# Regional camera extents follow the complete new shapes, not old display boxes.
focus['colombia']['regions']={id:list(g.bounds) for id,g in zip(ids,geometries)}

archive=zipfile.ZipFile(args.states)
read=lambda ext:io.BytesIO(archive.read(next(n for n in archive.namelist() if n.endswith(ext))))
reader=shapefile.Reader(shp=read('.shp'),shx=read('.shx'),dbf=read('.dbf'))
ids={'Western Australia':'western-australia','Northern Territory':'northern-territory','South Australia':'south-australia','Queensland':'queensland','New South Wales':'new-south-wales','Victoria':'victoria','Tasmania':'tasmania','Australian Capital Territory':'australian-capital-territory','Jervis Bay Territory':'jervis-bay-territory'}
outputs['australia']=[]
for record in reader.iterShapeRecords():
    p=record.record.as_dict()
    if p.get('admin')=='Australia' and p.get('name') in ids:
        id=ids[p['name']]
        outputs['australia'].append(feature(id,p['name'],shape(record.shape.__geo_interface__),'generalised-state-or-territory',list(ids).index(p['name'])))
outputs['australia'].sort(key=lambda f:list(ids.values()).index(f['properties']['id']))

nz=country('New Zealand')
outputs['new-zealand']=[]
# The three main island groups follow the same Natural Earth source as the
# existing island selector. Nearby small polygons are assigned by camera extent.
groups=[('north-island','North Island'),('south-island','South Island'),('rakiura','Stewart Island / Rakiura')]
extents={id:box(*focus['new-zealand']['regions'][id]) for id,_ in groups}
seeds={id:max((p for p in nz.geoms if extent.covers(p.representative_point())),key=lambda p:p.area) for id,extent in extents.items()}
assigned={id:[] for id,_ in groups}
for polygon in nz.geoms:
    candidates=[id for id,extent in extents.items() if extent.covers(polygon.representative_point())]
    # Cook Strait camera boxes overlap: assign each small island only once,
    # to its closest main island, rather than copying it into both groups.
    if candidates:assigned[min(candidates,key=lambda id:polygon.distance(seeds[id]))].append(polygon)
for i,(id,name) in enumerate(groups):
    outputs['new-zealand'].append(feature(id,name,unary_union(assigned[id]),'generalised-main-island-group',i))

for id,features in outputs.items():
    provenance={'date':'2026-11-11','naturalEarthUrl':'https://www.naturalearthdata.com/','naturalEarthLicence':'Public domain','countrySha256':expected[args.countries],'stateSha256':expected[args.states],'limitations':'Generalised planning context, not bird ranges, current habitat, navigation or permission to enter.'}
    if id=='colombia':provenance.update({'creator':colombia['creator'],'limitations':colombia['limitations'],'contextSource':colombia['contextSource'],'contextSourceRole':colombia['contextSourceRole']})
    result={'type':'FeatureCollection','features':features,'provenance':provenance}
    if id=='colombia':
        result['boundaries']=colombia_mesh
        provenance['topology']='Shared-edge partition; complete country coverage; no area overlaps'
        provenance['countryOutline']=mapping(co)
    path=Path('content/geographic-planning-regions')/f'{id}.json'
    path.write_text(json.dumps(result,separators=(',',':'))+'\n')
    print(id,len(features),path.stat().st_size)

Path('content/geographic-map-focus.json').write_text(json.dumps(focus,indent=2)+'\n')
