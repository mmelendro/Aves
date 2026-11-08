"""Build an attributed, static LCDB overview; never called during page loads/builds.
Run from source: python scripts/generate-south-island-ecosystems.py --download
Requires pyproj and shapely for offline GIS processing, not website dependencies.
Raw downloaded snapshots stay outside Git in ../audit/map-data.
The PNG is categorical WMS data, not aerial imagery; exact legend colours become
coarse cells. No invented habitat boundaries or private wildlife locations.
"""
import argparse, collections, hashlib, json, math, struct, urllib.parse, urllib.request, zlib
from pathlib import Path
from pyproj import Transformer
from shapely.geometry import shape, box
from shapely.ops import transform, unary_union

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT.parent / "audit" / "map-data"
WMS = "https://maps.scinfo.org.nz/lcdb/wms"
NATURAL_EARTH = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson"
SOURCE = "https://lris.scinfo.org.nz/layer/123148-lcdb-v60-land-cover-database-version-60-mainland-new-zealand/"
WIDTH, HEIGHT = 480, 640
project = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True).transform
left, bottom = project(165.8, -47.1)
right, top = project(174.8, -40.0)
# Equal x/y ground resolution preserves Mercator shapes. Never stretch a raster
# to fit an unrelated outline; both are generated with this one affine transform.
centre_y = (bottom + top) / 2
pixel_size = (right - left) / WIDTH
bottom, top = centre_y - pixel_size * HEIGHT / 2, centre_y + pixel_size * HEIGHT / 2
bbox = [left, bottom, right, top]
params = dict(SERVICE="WMS", VERSION="1.1.1", REQUEST="GetMap", LAYERS="lcdb_lcdb6", STYLES="", SRS="EPSG:3857", BBOX=",".join(map(str, bbox)), WIDTH=WIDTH, HEIGHT=HEIGHT, FORMAT="image/png", TRANSPARENT="TRUE")
request_url = WMS + "?" + urllib.parse.urlencode(params)

# LCDB classes grouped as land-cover proxies, not full ecosystem classifications.
# RGB values checked against Manaaki Whenua's official lcdb_lcdb6 WMS legend.
GROUPS = {
 "forest": {"classes": [50, 52, 54, 58, 69], "colours": [(112,92,0), (140,121,34), (168,153,79), (212,205,174), (40,70,0)]},
 "mountains": {"classes": [15, 43, 55], "colours": [(171,205,102), (230,230,140), (184,171,106)]},
 "freshwater": {"classes": [20, 21, 45], "colours": [(190,232,255), (194,255,214)]},
}

def read_rgba_png(blob):
 """Decode the official non-interlaced RGBA8 categorical raster, losslessly.
 Reject changed formats rather than silently misclassifying new source data.
 """
 if blob[:8] != b"\x89PNG\r\n\x1a\n": raise ValueError("Not a PNG")
 pos, data = 8, bytearray()
 while pos < len(blob):
  length = struct.unpack(">I", blob[pos:pos+4])[0]
  kind, chunk = blob[pos+4:pos+8], blob[pos+8:pos+8+length]
  if kind == b"IHDR":
   w,h,depth,colour,compression,filtering,interlace = struct.unpack(">IIBBBBB", chunk)
   if (w,h,depth,colour,compression,filtering,interlace) != (WIDTH,HEIGHT,8,6,0,0,0): raise ValueError("Unexpected WMS raster format")
  if kind == b"IDAT": data.extend(chunk)
  pos += length + 12
 raw, previous, rows = zlib.decompress(data), bytearray(WIDTH*4), []
 stride = WIDTH * 4
 if len(raw) != (stride+1)*HEIGHT: raise ValueError("Unexpected decoded raster size")
 for y in range(HEIGHT):
  mode = raw[y*(stride+1)]; row = bytearray(raw[y*(stride+1)+1:(y+1)*(stride+1)])
  if mode > 4: raise ValueError("Invalid PNG filter")
  for i in range(stride):
   a,b,c = row[i-4] if i>=4 else 0, previous[i], previous[i-4] if i>=4 else 0
   if mode == 1: prediction = a
   elif mode == 2: prediction = b
   elif mode == 3: prediction = (a+b)//2
   elif mode == 4:
    p=a+b-c; distances=[abs(p-a),abs(p-b),abs(p-c)]
    prediction=[a,b,c][distances.index(min(distances))]
   else: prediction=0
   row[i]=(row[i]+prediction)&255
  rows.append(row); previous=row
 return rows

def svg_path(geometry):
 """Even-odd rings preserve holes. Coordinates are pixels in the common frame."""
 polygons = [geometry] if geometry.geom_type == "Polygon" else list(geometry.geoms)
 commands=[]
 for poly in polygons:
  for ring in [poly.exterior, *poly.interiors]:
   coords=list(ring.coords)
   commands.append("M"+"L".join(f"{x:.1f},{y:.1f}" for x,y in coords)+"Z")
 return "".join(commands)

def main():
 args=argparse.ArgumentParser(); args.add_argument("--download", action="store_true"); options=args.parse_args()
 CACHE.mkdir(parents=True,exist_ok=True)
 if options.download:
  for filename,url in [("south-island-lcdb6.png",request_url),("ne_50m_admin_0_countries.geojson",NATURAL_EARTH)]:
   CACHE.joinpath(filename).write_bytes(urllib.request.urlopen(url,timeout=90).read())
  CACHE.joinpath("south-island-lcdb6-request.json").write_text(json.dumps(dict(url=request_url,bbox=bbox,width=WIDTH,height=HEIGHT),indent=2))
 request=json.loads(CACHE.joinpath("south-island-lcdb6-request.json").read_text())
 if request["url"] != request_url: raise ValueError("Cached raster uses a different projection/extent; rerun --download")
 raw_geo=CACHE.joinpath("ne_50m_admin_0_countries.geojson").read_bytes()
 expected=json.loads(ROOT.joinpath("content/new-zealand-map.json").read_text())["source"]["sha256"]
 if hashlib.sha256(raw_geo).hexdigest()!=expected: raise ValueError("Coastline source changed; review before regenerating")
 country=next(f for f in json.loads(raw_geo)["features"] if f["properties"].get("ADM0_A3")=="NZL")
 # Largest NZ polygon is South Island. Assert its bounds to reject another island.
 island=max(shape(country["geometry"]).geoms,key=lambda p:p.area)
 if not (166<island.bounds[0]<167 and -47<island.bounds[1]<-46 and 174<island.bounds[2]<175): raise ValueError("Unexpected South Island outline")
 projected=transform(project,island)
 outline=transform(lambda x,y:((x-left)/pixel_size,(top-y)/pixel_size),projected)
 blob=CACHE.joinpath("south-island-lcdb6.png").read_bytes(); rows=read_rgba_png(blob)
 # Account conservatively for WMS antialiasing. Compare against the FULL
 # official legend, so pasture/exotic forest never become native vegetation
 # simply because we omitted their classes from the visitor-facing layers.
 palette=[(156,156,156),(104,133,120),(168,0,0),(112,68,137),(255,255,115),(202,122,245),(171,205,102),(156,186,156),(219,212,255),(190,232,255),(214,245,232),(255,211,127),(230,152,0),(190,255,140),(163,212,0),(230,230,140),(210,210,90),(194,255,214),(222,245,222),(122,245,202),(112,92,0),(125,105,15),(140,121,34),(168,153,79),(184,171,106),(196,187,137),(212,205,174),(191,205,174),(212,194,122),(161,173,97),(71,127,0),(40,70,0),(56,168,0),(68,137,137),(0,0,0)]
 lookup={colour:key for key,group in GROUPS.items() for colour in group["colours"]}
 classified={}
 def classify(colour):
  if colour is None: return None
  if colour not in classified:
   nearest=min(palette,key=lambda p:sum((a-b)**2 for a,b in zip(p,colour)))
   distance=sum((a-b)**2 for a,b in zip(nearest,colour))
   classified[colour]=lookup.get(nearest) if distance<=24**2 else None
  return classified[colour]
 cells={key:[] for key in GROUPS}; counts=collections.Counter()
 # Horizontal runs greatly reduce union work without changing raster boundaries.
 for y,row in enumerate(rows):
  start=0; last=None
  for x in range(WIDTH+1):
   colour=tuple(row[x*4:x*4+3]) if x<WIDTH and row[x*4+3]>=128 else None
   key=classify(colour)
   if key!=last:
    if last: cells[last].append(box(start,y,x,y+1)); counts[last]+=x-start
    start=x; last=key
 layers=[]
 for key,group in GROUPS.items():
  if not cells[key]: raise ValueError(f"No pixels classified for {key}")
  geometry=unary_union(cells[key]).intersection(outline).simplify(0.65,preserve_topology=True)
  if geometry.geom_type not in ["Polygon","MultiPolygon"]: raise ValueError("Unexpected geometry")
  layers.append(dict(id=key,classes=group["classes"],path=svg_path(geometry),areaPixels=round(geometry.area),sourcePixels=counts[key]))
 result=dict(viewBox=f"0 0 {WIDTH} {HEIGHT}",projection="EPSG:3857 (Spherical Mercator), north up; shared raster/coastline transform",bbox=bbox,pixelSizeMetres=round(pixel_size),outline=svg_path(outline),layers=layers,
 source=dict(title="Manaaki Whenua — LCDB v6.0",url=SOURCE,wms=WMS,requestUrl=request_url,layer="lcdb_lcdb6",imagery="2023/24",checked="2026-11-09",licence="CC BY 3.0 NZ (WMS service)",licenceUrl="https://creativecommons.org/licenses/by/3.0/nz/",sha256=hashlib.sha256(blob).hexdigest(),coastlineUrl="https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/",coastlineSha256=expected),
 method="Official WMS legend colours classified within RGB distance 24 and grouped into land-cover proxies at roughly 2 km raster resolution, clipped to Natural Earth South Island coastline and simplified by 0.65 pixels. Other cover is neutral. Coast uses the public-domain coastline only; marine habitat extent is not mapped. Not for navigation or species locations.")
 output=ROOT/"content/south-island-ecosystem-map.json"; output.write_text(json.dumps(result,separators=(",",":"))+"\n",encoding="utf-8")
 print(json.dumps(dict(bytes=output.stat().st_size,pixelSizeMetres=result["pixelSizeMetres"],layers=[dict(id=l["id"],areaPixels=l["areaPixels"]) for l in layers])))
if __name__ == "__main__": main()
