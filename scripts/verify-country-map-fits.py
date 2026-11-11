"""Verify recovered country raster transforms against source geometry vertices.
Usage: python scripts/verify-country-map-fits.py <NE50 admin1 ZIP> <NE50 countries GeoJSON>
Offline tools: pyshp 2.3.1, numpy and scipy; none are application dependencies.
"""
import sys,json,re,io,zipfile,hashlib
import numpy as np
from scipy.spatial import cKDTree
import shapefile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
def paths(s):return np.array([[float(x),float(y)] for x,y in re.findall(r'([\d.-]+),([\d.-]+)',s)])
def fit(raw,svg):
 s=(svg[:,0].max()-svg[:,0].min())/(raw[:,0].max()-raw[:,0].min());tx=svg[:,0].min()-raw[:,0].min()*s;ty=svg[:,1].min()+raw[:,1].max()*s
 pred=np.column_stack([raw[:,0]*s+tx,ty-raw[:,1]*s]);dist=cKDTree(pred).query(svg)[0]
 assert dist.max()<.1, 'Projection no longer matches existing geometry'
 print('fit',s,tx,ty,'Y gap',np.ptp(pred[:,1])-np.ptp(svg[:,1]),'error',np.quantile(dist,[.5,.9,.99,1]).tolist());return [s,tx,ty]
assert hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest()=='61f79e6705e62a55d6bcf698394295a589af5e24a4b2684c6519dd35c1300bf6'
assert hashlib.sha256(Path(sys.argv[2]).read_bytes()).hexdigest()=='3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb'
z=zipfile.ZipFile(sys.argv[1]);stem='ne_50m_admin_1_states_provinces';r=shapefile.Reader(shp=io.BytesIO(z.read(stem+'.shp')),shx=io.BytesIO(z.read(stem+'.shx')),dbf=io.BytesIO(z.read(stem+'.dbf')))
points=np.array([p for sr in r.iterShapeRecords() if sr.record.as_dict()['adm0_a3']=='AUS' for p in sr.shape.points]);print('AUSpoints',len(points))
lon,lat=np.radians(points.T);n=(np.sin(np.radians(-18))+np.sin(np.radians(-36)))/2;c=np.cos(np.radians(-18))**2+2*n*np.sin(np.radians(-18));rho=np.sqrt(c-2*n*np.sin(lat))/n;rho0=np.sqrt(c-2*n*np.sin(np.radians(-25)))/n;theta=n*(lon-np.radians(134));raw=np.column_stack([rho*np.sin(theta),rho0-rho*np.cos(theta)])
s=(root/'content/global-australian-map.ts').read_text();states=json.loads(re.search(r'export const australiaMapStates:.*?= (\[.*\])',s).group(1));fit(raw,paths(''.join(st['path'] for st in states)))
geo=json.load(open(sys.argv[2]));feature=next(f for f in geo['features'] if f['properties']['ADM0_A3']=='NZL');polys=feature['geometry']['coordinates'];rings=[p[0] for p in polys if min(x for x,y in p[0])>=166 and max(x for x,y in p[0])<180 and min(y for x,y in p[0])>-48 and max(y for x,y in p[0])<-33];points=np.array([p for ring in rings for p in ring]);lon,lat=np.radians(points.T);raw=np.column_stack([lon,np.log(np.tan(np.pi/4+lat/2))]);nz=json.loads((root/'content/new-zealand-map.json').read_text());print('NZrings',len(rings),'old',[(i['id'],len(i['paths'])) for i in nz['islands']]);fit(raw,paths(''.join(p for i in nz['islands'] for p in i['paths'])))
