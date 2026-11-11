#!/usr/bin/env python3
"""Offline RUNAP snapshot to bounded web geometry. Never downloads unreviewed updates.

GDAL 3.10.3, Shapely 2.1.2. Run from the repository root with the reviewed ZIP:
PYTHONPATH=/tmp/aves-map-gis python scripts/generate-colombia-protected-areas.py ARCHIVE.zip
The public derived dataset and catalogue retain CC BY-SA 4.0 terms separately
from application code. Original records and their management categories are kept.
"""
import collections, hashlib, json, subprocess, sys, tempfile
from pathlib import Path
from shapely.geometry import shape, mapping

archive=Path(sys.argv[1]).resolve()
digest='90f39221a5161561299429f917acf51763d232f5716eaafc80ae05f520b5a4cd'
if hashlib.sha256(archive.read_bytes()).hexdigest()!=digest:raise ValueError('Unreviewed RUNAP archive')
categories=['Parque Nacional Natural','Reserva Natural','Área Natural Única','Vía Parque','Santuario de Fauna y Flora','Santuario de Flora','Reservas Forestales Protectoras Nacionales','Distritos Nacionales de Manejo Integrado']
where='ap_categor IN ('+','.join("'"+c+"'" for c in categories)+')'
with tempfile.TemporaryDirectory(prefix='aves-runap-') as folder:
    raw=Path(folder)/'national.geojson'
    # Use the archive PRJ (MAGNA-SIRGAS), not the per-record wkid field, which
    # describes an area-calculation origin rather than these coordinate values.
    subprocess.run(['ogr2ogr','-f','GeoJSON','-t_srs','EPSG:4326','-select','ap_id,ap_nombre,ap_categor,url,condicion','-where',where,str(raw),f'/vsizip/{archive}/runap.shp'],check=True)
    source=json.loads(raw.read_text())

def rings(g):
    polygons=[g] if g.geom_type=='Polygon' else g.geoms
    return len(list(polygons)),sum(len(p.interiors) for p in polygons)

def rounded(value):
    if isinstance(value,(list,tuple)):return [rounded(x) for x in value]
    return round(value,8)

features=[];catalogue=[];omitted=[];stats=[]
for f in source['features']:
    p=f['properties']
    if p['condicion'] not in ('REGISTRADA','INSCRITA'):
        omitted.append({'id':str(p['ap_id']),'name':p['ap_nombre'],'status':p['condicion']});continue
    g=shape(f['geometry'])
    if not g.is_valid or g.is_empty:raise ValueError(p['ap_nombre'])
    tolerance=.0005
    # Small/narrow reserves need finer detail. Preserve every hole and island,
    # cap symmetric area change at 2%, then validate the rounded web geometry.
    while True:
        candidate=g.simplify(tolerance,preserve_topology=True)
        geometry=mapping(candidate);geometry['coordinates']=rounded(geometry['coordinates'])
        simple=shape(geometry)
        if simple.is_valid and rings(simple)==rings(g) and g.symmetric_difference(simple).area/g.area<=.02:break
        tolerance/=2
        if tolerance<1e-9:raise ValueError('Unable to generalise '+p['ap_nombre'])
    id=str(p['ap_id']);url=p['url']
    if url!=f'https://runap.parquesnacionales.gov.co/area-protegida/{id}':raise ValueError('Unexpected record link')
    properties={'id':id,'name':p['ap_nombre'],'category':p['ap_categor'],'sourceUrl':url,'status':p['condicion'],'labelPoint':rounded(list(simple.representative_point().coords[0]))}
    features.append({'type':'Feature','properties':properties,'geometry':geometry})
    catalogue.append({**properties,'bounds':rounded(simple.bounds)})
    stats.append({'id':id,'polygons':rings(g)[0],'holes':rings(g)[1],'toleranceDegrees':tolerance})
features.sort(key=lambda f:int(f['properties']['id']));catalogue.sort(key=lambda p:p['name'].casefold())
if len(features)!=109 or len({f['properties']['id'] for f in features})!=109:raise ValueError('Snapshot scope changed')
provenance={
 'publisher':'Parques Nacionales Naturales de Colombia / RUNAP','sourceUrl':'https://runap.parquesnacionales.gov.co/cifras',
 'downloadUrl':'https://storage.googleapis.com/pnn_geodatabase/runap/latest.zip','sourceDate':'2026-11-06','reviewedAt':'2026-11-11',
 'inputSha256':digest,'licence':'CC BY-SA 4.0','licenceUrl':'https://creativecommons.org/licenses/by-sa/4.0/',
 'licenceEvidence':'https://geonetwork.parquesnacionales.gov.co/geonetwork/srv/api/records/0fdd10cc-8a87-428d-816e-020e8c639a85/formatters/xsl-view',
 'licenceAnnouncement':'https://www.parquesnacionales.gov.co/sala-prensa/boletines/datos-espaciales-de-parques-nacionales-adoptan-cc-by-sa-4-0/',
 'sourceCrs':'MAGNA-SIRGAS / EPSG:4686 (archive PRJ)','outputCrs':'OGC:CRS84, longitude/latitude WGS84 via GDAL 3.10.3',
 'modifications':'National categories selected; 15 CONSTRUCCION records omitted. Transformed to WGS84; simplified at at most 0.0005 degrees with adaptive detail, every island/hole retained, symmetric area change at most 2%, coordinates rounded to 8 decimals. Fields minimised; label points and catalogue bounds added.',
 'limitations':'109 national records with INSCRITA/REGISTRADA source status. Regional/private areas and 15 provisional source records omitted. Generalised boundaries, not surveying, entrances, routes, current access, habitat or bird occurrence. Marine areas retained; country overview may not show all outlying areas.',
 'attribution':'Derived by AVES from Parques Nacionales Naturales de Colombia / RUNAP, 6 November 2026. Modified geometry and derived catalogue licensed CC BY-SA 4.0.',
}
result={'type':'FeatureCollection','features':features,'provenance':provenance}
path=Path('public/data/colombia-national-protected-areas.geojson');path.parent.mkdir(exist_ok=True)
path.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
manifest={**provenance,'geometryPath':'/data/colombia-national-protected-areas.geojson','geometrySha256':hashlib.sha256(path.read_bytes()).hexdigest(),'count':len(features),'nationalSourceCount':len(source['features']),'categories':dict(sorted(collections.Counter(f['properties']['category'] for f in features).items())),'omittedProvisional':omitted,'geometryChecks':stats,'areas':catalogue}
Path('content/colombia-protected-areas.json').write_text(json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps({'features':len(features),'bytes':path.stat().st_size,'sourceNationalRecords':len(source['features']),'omittedProvisional':len(omitted)}))
