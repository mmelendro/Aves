"""Project NASA's geographic reference raster into the existing Equal Earth SVG.
Offline preprocessing only. Source pixels are resampled, never invented as detail.
Usage: python scripts/project-world-satellite.py <downloaded GIBS JPEG>
"""
from pathlib import Path
import sys, hashlib, json
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]); image=np.asarray(Image.open(source).convert('RGB'))
y,x=np.mgrid[0:1144,0:2000]; xx=((x+.5)/2-500)/176; yy=(270-(y+.5)/2)/176
limit=np.pi/3
l=np.clip(yy/1.340264,-limit,limit)
for _ in range(12):
 l2=l*l;l6=l2*l2*l2
 value=l*(1.340264-.081106*l2+l6*(.000893+.003796*l2))
 derivative=1.340264-3*.081106*l2+l6*(7*.000893+9*.003796*l2)
 l=np.clip(l-(value-yy)/derivative,-limit,limit)
l2=l*l;l6=l2*l2*l2
lon=xx*(np.sqrt(3)/2)*(1.340264-3*.081106*l2+l6*(7*.000893+9*.003796*l2))/np.cos(l)
lat=np.arcsin(np.clip(np.sin(l)/(np.sqrt(3)/2),-1,1))
valid=(np.abs(lon)<=np.pi)&(np.abs(yy)<=1.317362759157413)
u=np.clip(((lon/np.pi+1)*.5*image.shape[1]).astype(int),0,image.shape[1]-1)
v=np.clip(((.5-lat/np.pi)*image.shape[0]).astype(int),0,image.shape[0]-1)
rgba=np.zeros((1144,2000,4),dtype=np.uint8);rgba[:,:,:3]=image[v,u];rgba[:,:,3]=valid*255
out=root/'public/images/maps/world-satellite-2004.webp';Image.fromarray(rgba).save(out,quality=82,method=6)
metadata={'publisher':'NASA Earth Observatory / GIBS','product':'Blue Marble Next Generation','year':2004,'sourceUrl':'https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/','retrieved':'2026-11-11','projection':'Equal Earth, matching scripts/equal-earth.mjs; x=500+176*x, y=270-176*y','viewBox':'0 0 1000 572','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'asset':'/images/maps/world-satellite-2004.webp','sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'limitations':'Historical global composite; overview only, not current conditions. Zooming adds no source detail. Source raster 2048 by 1024, nearest-neighbour resampling to existing projection.'}
(root/'content/world-satellite-source.json').write_text(json.dumps(metadata,indent=2)+'\n')
print(out.stat().st_size)
