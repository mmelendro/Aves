"""Prepare a small, attributed public visitor-place pilot, not wildlife locations.

Uses the previously downloaded official DOC snapshot and Natural Earth 5.1.2
populated places. Run with the GIS environment (shapely, pyproj, pyshp).
Raw source files stay outside Git; public derivatives include input checksums.
"""
import hashlib, io, json, zipfile
from pathlib import Path
import shapefile
from pyproj import Transformer
from shapely.geometry import Polygon
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT.parent / 'audit/map-layers'
doc_bytes = (CACHE / 'doc-south-island-features.json').read_bytes()
doc = json.loads(doc_bytes)
inverse = Transformer.from_crs(3857, 4326, always_xy=True)

def reference(names):
    polygons = [Polygon(r).buffer(0) for f in doc['features']
                if f['attributes']['Name'] in names for r in f['geometry']['rings']]
    point = unary_union(polygons).representative_point()
    lon, lat = inverse.transform(point.x, point.y)
    return dict(longitude=round(lon, 5), latitude=round(lat, 5))

points = [
    dict(id='orokonui', name='Orokonui Ecosanctuary', categories=['nature', 'projects', 'businesses'],
         **reference(['Orokonui Scenic Reserve']),
         description='Conservation sanctuary near Dunedin with public visitor information and guided experiences. This marker represents the reserve area, not its entrance or a bird location.',
         url='https://orokonui.nz/visit/', coordinateSource='DOC Public Conservation Land',
         precision='Approximate reserve reference', checked='2026-11-09'),
    dict(id='abel-tasman-eco-tours', name='Abel Tasman Eco Tours', categories=['businesses'],
         longitude=172.898462, latitude=-40.979632,
         description='Nature-tour operator departing from Mārahau. The operator describes support for local conservation projects. This is an approximate departure-area reference, not an office or confirmed meeting point. Check arrangements with the operator.',
         url='https://www.abeltasmanecotours.co.nz/contact/',
         coordinateSource='Mārahau area shown on the operator contact map',
         precision='Approximate Mārahau departure area', checked='2026-11-09'),
    dict(id='arrowtown-chinese-settlement', name='Arrowtown Chinese Settlement', categories=['heritage'],
         **reference(['Arrowtown Chinese Settlement Historic Reserve (Pt)', 'Arrowtown Chinese Settlement (Pt)']),
         description='A publicly interpreted historic settlement, partly restored after archaeological excavation. Follow DOC visitor guidance and stay on public paths.',
         url='https://www.doc.govt.nz/chinese-settlement?region=otago', coordinateSource='DOC Public Conservation Land',
         precision='Approximate public heritage area', checked='2026-11-09'),
    dict(id='lake-rotoiti', name='Lake Rotoiti · Nelson Lakes', categories=['nature'],
         longitude=172.844331, latitude=-41.811469,
         description='Forest and lake landscape reference for planning a nature outing. Check DOC for current tracks, access and biosecurity guidance. No sightings are promised.',
         url='https://www.doc.govt.nz/parks-and-recreation/places-to-go/nelson-tasman/places/nelson-lakes-national-park/',
         coordinateSource='Existing AVES credited landscape reference',
         precision='Public landscape reference', checked='2026-11-09'),
]

city_bytes = (CACHE / 'ne_10m_populated_places_simple.zip').read_bytes()
archive = zipfile.ZipFile(io.BytesIO(city_bytes))
base = next(n[:-4] for n in archive.namelist() if n.endswith('.shp'))
reader = shapefile.Reader(**{ext: io.BytesIO(archive.read(base+'.'+ext)) for ext in ['shp', 'shx', 'dbf']}, encoding='utf-8')
fields = [f[0] for f in reader.fields[1:]]
for record in reader.iterShapeRecords():
    a = dict(zip(fields, record.record))
    if a['adm0name'] != 'New Zealand' or a['name'] not in ['Nelson', 'Blenheim', 'Christchurch', 'Queenstown', 'Dunedin', 'Invercargill']:
        continue
    lon, lat = record.shape.points[0]
    points.append(dict(id=a['name'].lower(), name=a['name'], categories=['towns'],
        longitude=lon, latitude=lat, description='Selected city or town for geographic context. This is a settlement reference, not an airport, driving route or travel-time estimate.',
        url='https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/',
        coordinateSource='Natural Earth populated places 5.1.2, public domain', precision='Generalised settlement centre', checked='2026-11-09'))
assert len(points) == 10
for point in points:
    point['evidenceUrl'] = {'orokonui':'https://orokonui.nz/visit/', 'abel-tasman-eco-tours':'https://www.abeltasmanecotours.co.nz/conservation-projects/'}.get(point['id'], '')
output = dict(coverage='Curated pilot, not a complete directory. Public reference points only; no nesting or restricted cultural locations. Listings do not imply an AVES partnership, certification, booking or permission to enter.',
    sources=[dict(name='DOC Public Conservation Land', licence='CC BY 4.0', copyright='Crown Copyright: Department of Conservation Te Papa Atawhai 2026', url='https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0', sha256=hashlib.sha256(doc_bytes).hexdigest()),
             dict(name='Natural Earth populated places 5.1.2', licence='Public domain', url='https://www.naturalearthdata.com/about/terms-of-use/', sha256=hashlib.sha256(city_bytes).hexdigest())], points=points)
(ROOT/'content/south-island-public-places.json').write_text(json.dumps(output, ensure_ascii=False, indent=2)+'\n')
print('Generated', len(points), 'public visitor-place and settlement references.')
