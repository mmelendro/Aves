"""Trace the existing AVES planning-region artwork, not new official boundaries.
Pinned source pixels + marker colours keep each point in its original named area.
Requires Pillow, numpy, scipy and shapely for offline asset preparation only.
"""
from pathlib import Path
import hashlib,json,re
import numpy as np
from PIL import Image
from shapely.geometry import box,Point
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'public/images/birding-regions-colombia-final.png'
im=Image.open(source).convert('RGBA');raw=np.asarray(im)
text=(ROOT/'content/colombia-map-markers.ts').read_text()
markers=[dict(name=n,x=float(x)*im.width/100,y=float(y)*im.height/100) for n,x,y in re.findall(r'name: "([^"]+)", x: ([\d.]+), y: ([\d.]+)',text)]
colours=[]
for marker in markers:
 colour=tuple(raw[round(marker['y']),round(marker['x']),:3].tolist())
 if colour not in colours:colours.append(colour)
# Antialias pixels belong to their nearest original palette colour; transparency
# remains outside. No geographic coordinates or external borders are invented.
rgb=raw[:,:,:3].astype(np.int32)
nearest=np.argmin(np.sum((rgb[:,:,None,:]-np.array(colours)[None,None,:,:])**2,axis=3),axis=2)
nearest[raw[:,:,3]<128]=-1
regions=[]
for colour_id,colour in enumerate(colours):
 cells=[]
 for y,row in enumerate(nearest):
  line=np.r_[False,row==colour_id,False].astype(np.int8);edges=np.flatnonzero(np.diff(line))
  cells.extend(box(int(a),y,int(b),y+1) for a,b in zip(edges[::2],edges[1::2]))
 geometry=unary_union(cells)
 polygons=[geometry] if geometry.geom_type=='Polygon' else list(geometry.geoms)
 candidates=[m for m in markers if tuple(raw[round(m['y']),round(m['x']),:3])==colour]
 groups={m['name']:[] for m in candidates}
 for poly in polygons:
  # Sierra Nevada and Colombian Massif share a source colour but are separate
  # components. Assign by the actual marker/component, never by colour alone.
  owner=min(candidates,key=lambda m:poly.distance(Point(m['x'],m['y'])))
  groups[owner['name']].append(poly)
 for marker in candidates:
  original=unary_union(groups[marker['name']]);point=Point(marker['x'],marker['y'])
  if not original.covers(point):raise ValueError('Marker outside original region: '+marker['name'])
  shape=original.simplify(.8,preserve_topology=True)
  if not shape.covers(point):raise ValueError('Smoothing moves border across marker: '+marker['name'])
  polygons=[shape] if shape.geom_type=='Polygon' else list(shape.geoms)
  path=''.join('M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in ring.coords)+'Z' for poly in polygons for ring in [poly.exterior,*poly.interiors])
  regions.append(dict(name=marker['name'],path=path,marker=marker,markerInsideOriginal=True,markerInsideSmoothed=True))
regions.sort(key=lambda r:next(i for i,m in enumerate(markers) if m['name']==r['name']))
output=dict(viewBox=f'0 0 {im.width} {im.height}',source=dict(path=str(source.relative_to(ROOT)),sha256=hashlib.sha256(source.read_bytes()).hexdigest(),description='Existing AVES planning-region artwork; not official administrative/ecological boundaries',smoothingTolerancePixels=.8),regions=regions)
(ROOT/'content/colombia-planning-boundaries.json').write_text(json.dumps(output,separators=(',',':'))+'\n')
print(f'Traced {len(regions)} areas; all 11 marker centres remain inside their matching original and smoothed region.')
