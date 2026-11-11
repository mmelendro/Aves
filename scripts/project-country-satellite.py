"""Reproject NASA reference imagery to reviewed existing country SVG fits.
Usage: python scripts/project-country-satellite.py <australia|new-zealand|colombia> <JPEG>
Fit recovered from hash-matching Natural Earth source vertices, not image alignment.
Australia max vertex residual 0.009 SVG units; NZ max residual 0.094 (rounded paths).
Pillow/numpy are offline tooling, not application dependencies.
"""
from pathlib import Path
import sys,json,hashlib
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]
country=sys.argv[1];src=Path(sys.argv[2]);im=np.asarray(Image.open(src).convert('RGB'))
configs={
 'australia':dict(size=[720,620],fit=[951.5453237085952,371.9127828770495,273.0269332854938],bbox=[110,-46,156,-8],projection='Spherical Albers, central meridian 134 E, origin 25 S, standard parallels 18 S and 36 S',geometrySha256='61f79e6705e62a55d6bcf698394295a589af5e24a4b2684c6519dd35c1300bf6',maxVertexResidual=.009),
 'new-zealand':dict(size=[560,640],fit=[1787.494797512577,-5101.6143113960325,-1092.8742967608048],bbox=[165,-48,180,-33],projection='Spherical Mercator, fitted to the existing main island SVG',geometrySha256='3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb',maxVertexResidual=.094),
}
if country=='colombia':
 g=json.loads((root/'content/colombia-geographic-map.json').read_text());configs[country]=dict(size=g['size'],fit=g['fit'],bbox=[-83,-6,-66,15],projection=g['projection'],geometrySha256=g['geometrySha256'],maxVertexResidual=.008)
c=configs[country];width,height=c['size'];scale,tx,ty=c['fit'];y,x=np.mgrid[:height*2,:width*2];px=((x+.5)/2-tx)/scale;py=(ty-(y+.5)/2)/scale
if country=='australia':
 p1,p2,p0,lon0=np.radians([-18,-36,-25,134]);n=(np.sin(p1)+np.sin(p2))/2;cc=np.cos(p1)**2+2*n*np.sin(p1);rho0=np.sqrt(cc-2*n*np.sin(p0))/n
 rho=np.sign(n)*np.sqrt(px*px+(rho0-py)**2);theta=np.arctan2(np.sign(n)*px,np.sign(n)*(rho0-py));lon=lon0+theta/n;lat=np.arcsin(np.clip((cc-(rho*n)**2)/(2*n),-1,1))
else:lon=px;lat=2*np.arctan(np.exp(py))-np.pi/2
lon=np.degrees(lon);lat=np.degrees(lat);west,south,east,north=c['bbox'];valid=(lon>=west)&(lon<=east)&(lat>=south)&(lat<=north)
u=np.clip(((lon-west)/(east-west)*im.shape[1]).astype(int),0,im.shape[1]-1);v=np.clip(((north-lat)/(north-south)*im.shape[0]).astype(int),0,im.shape[0]-1)
rgba=np.zeros((height*2,width*2,4),dtype=np.uint8);rgba[:,:,:3]=im[v,u];rgba[:,:,3]=valid*255
asset=f'/images/maps/{country}-satellite-2004.webp';out=root/('public'+asset);Image.fromarray(rgba).save(out,quality=82,method=6)
meta={**c,'publisher':'NASA Earth Observatory / GIBS','product':'Blue Marble Next Generation','year':2004,'reviewedAt':'2026-11-11','sourceUrl':'https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/','serviceUrl':'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi','serviceLayer':'BlueMarble_NextGeneration','sourceImageSize':[im.shape[1],im.shape[0]],'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'asset':asset,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'limitations':'Historical composite; overview only, not current conditions. Zoom adds no source detail. Country/island scope follows the existing generalised geometry.'}
(root/f'content/{country}-satellite-source.json').write_text(json.dumps(meta,indent=2)+'\n');print(country,out.stat().st_size)
