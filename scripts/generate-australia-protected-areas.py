#!/usr/bin/env python3
"""Offline CAPAD pilot. Shapely 2.1.2, no runtime GIS or external feature calls.

Download the exact URLs in content/australia-protected-area-inputs.json into one
folder. Run PYTHONPATH=/tmp/aves-map-gis python scripts/generate-australia-protected-areas.py FOLDER
Hashes reject changed upstream snapshots. Re-review before updating the inputs.
"""
import collections, hashlib, json, sys
from pathlib import Path
from shapely import union_all
from shapely.geometry import shape, mapping

root=Path(__file__).resolve().parents[1]
inputs=json.loads((root/'content/australia-protected-area-inputs.json').read_text())
features=[]
for source in inputs['sources']:
    raw=(Path(sys.argv[1])/source['filename']).read_bytes()
    if hashlib.sha256(raw).hexdigest()!=source['sha256']:raise ValueError('Unreviewed CAPAD response')
    data=json.loads(raw)
    if data.get('exceededTransferLimit') or data.get('type')!='FeatureCollection':raise ValueError('Incomplete source')
    features+=data['features']
groups=collections.defaultdict(list)
for feature in features:
    p=feature['properties']
    if p['PA_ID'] in inputs['omitIds']:continue
    if p['TYPE_ABBR'] not in ('NP','NPC') or p['NRS_PA']!='Y' or p['ENVIRON'] not in ('T','B'):raise ValueError('Unexpected source category')
    if not shape(feature['geometry']).is_valid:raise ValueError('Invalid source geometry')
    groups[p['PA_ID']].append(feature)

def rounded(v):
    return [rounded(x) for x in v] if isinstance(v,(list,tuple)) else round(v,8)
def rings(g):
    parts=[g] if g.geom_type=='Polygon' else list(g.geoms)
    return len(parts),sum(len(p.interiors) for p in parts)

derived=[];areas=[];checks=[]
for id,fs in sorted(groups.items()):
    p=fs[0]['properties']
    for f in fs:
        if any(f['properties'][k]!=p[k] for k in ('NAME','TYPE','STATE','NRS_PA','IUCN','AUTHORITY','GOVERNANCE')):raise ValueError('Inconsistent park attributes')
    # CAPAD parcels are dissolved by permanent PA_ID, never by name. Namadgi and
    # South Bruny contain multiple source parcels, including repeated PA_PID.
    g=union_all([shape(f['geometry']) for f in fs])
    if not g.is_valid or g.is_empty or g.geom_type not in ('Polygon','MultiPolygon'):raise ValueError(id)
    tolerance=.0005
    while True:
        geometry=mapping(g.simplify(tolerance,preserve_topology=True));geometry['coordinates']=rounded(geometry['coordinates']);simple=shape(geometry)
        error=g.symmetric_difference(simple).area/g.area
        if simple.is_valid and rings(simple)==rings(g) and error<=.02:break
        tolerance/=2
        if tolerance<1e-9:raise ValueError('Cannot generalise '+id)
    label=rounded(list(simple.representative_point().coords[0]))
    if not simple.contains(shape({'type':'Point','coordinates':label})):raise ValueError('Label outside park')
    sourceUrl='https://gis.environment.gov.au/gispubmap/rest/services/ogc_services/CAPAD/FeatureServer/0/query?where=PA_ID%3D%27'+id+'%27&outFields=*&returnGeometry=false&f=pjson'
    a={'id':id,'name':p['NAME'],'category':p['TYPE'],'sourceUrl':sourceUrl,'state':p['STATE'],'iucn':p['IUCN'],'authority':p['AUTHORITY'],'governance':p['GOVERNANCE'],'environment':p['ENVIRON'],'status':p['NRS_PA'],'labelPoint':label,'bounds':rounded(simple.bounds)}
    areas.append(a);derived.append({'type':'Feature','properties':a,'geometry':geometry})
    checks.append({'id':id,'sourceParcels':len(fs),'polygons':rings(g)[0],'holes':rings(g)[1],'toleranceDegrees':tolerance,'symmetricAreaChange':error})
if len(areas)!=13 or len(set(a['state'] for a in areas))!=9:raise ValueError('Pilot scope changed')
provenance={
 'publisher':'Australian Government Department of Climate Change, Energy, the Environment and Water',
 'sourceUrl':'https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024','sourceDate':'2024-06-30','reviewedAt':'2026-11-12',
 'licence':'CC BY 4.0','licenceUrl':'https://creativecommons.org/licenses/by/4.0/',
 'licenceEvidence':'https://www.dcceew.gov.au/sites/default/files/documents/capad-2024-tech-spec.pdf',
 'attribution':'Collaborative Australian Protected Areas Database (CAPAD) 2024, Commonwealth of Australia 2025. Australian Government DCCEEW. Selected and generalised by AVES.',
 'sourceCrs':'GDA94 / EPSG:4283, transformed by official ArcGIS service outSR=4326','outputCrs':'OGC:CRS84, longitude/latitude WGS84',
 'modifications':'13 selected NP/NPC records, NRS_PA=Y, environment T/B. Parcels dissolved by PA_ID. Topology-preserving simplification at at most 0.0005 degrees, rounded to 8 decimals, islands and holes retained, symmetric area change at most 2%.',
 'limitations':'Selected pilot, not national coverage. Other national parks, separate marine parks, interim areas, Indigenous Protected Areas and other reserve categories are omitted. T/B park records retain their coastal geometry. Boundaries are not entrances, current access permissions, bird occurrence or certification. Check current closures, permits and cultural restrictions with park managers.',
 'inputSources':inputs['sources'],'omittedSourceIds':inputs['omitIds'],'omissionReason':inputs['omissionReason']}
path='/data/australia-national-parks-pilot.geojson'
blob=(json.dumps({'type':'FeatureCollection','provenance':provenance,'features':derived},ensure_ascii=False,separators=(',',':'))+'\n').encode()
(root/'public'/path.lstrip('/')).write_bytes(blob)
manifest={**provenance,'geometryPath':path,'geometrySha256':hashlib.sha256(blob).hexdigest(),'count':len(areas),'geometryChecks':checks,'areas':sorted(areas,key=lambda a:a['name'].casefold())}
(root/'content/australia-protected-areas.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'{len(areas)} parks; {len(blob)} bytes; every union island/hole retained')
