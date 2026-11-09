"""Regenerate the small place-card map offline from the checked-in OSM extract.

The public data snapshot is ODbL, not live road/access information. We only draw
selected roads/rivers and two public place points, with no invented topography.
Run from any directory: python scripts/generate-arthurs-pass-map.py
"""
from pathlib import Path
import hashlib
import json
import math

root = Path(__file__).resolve().parents[1]
raw = (root / "content/arthurs-pass-osm-source.json").read_bytes()
osm = json.loads(raw)
radius, lon, lat = 6378137, 171.56, -42.928
centre_x = radius * math.radians(lon)
centre_y = radius * math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))
ground_resolution = 20
resolution = ground_resolution / math.cos(math.radians(lat))
left, top = centre_x - 240 * resolution, centre_y + 180 * resolution


def point(lon, lat):
    return [(radius * math.radians(lon) - left) / resolution,
            (top - radius * math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))) / resolution]


paths, markers = [], []
for element in osm["elements"]:
    tags = element.get("tags", {})
    if element["type"] == "way":
        coords = [point(p["lon"], p["lat"]) for p in element["geometry"]]
        paths.append({"id": element["id"], "name": tags.get("name", ""),
                      "kind": "road" if "highway" in tags else "river",
                      "d": "M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in coords)})
    elif tags.get("place") == "village" or tags.get("name") == "Arthur's Pass":
        markers.append({"id": element["id"], "name": "Arthur’s Pass village" if tags.get("place") else "Arthur’s Pass · saddle",
                        "lon": element["lon"], "lat": element["lat"], "xy": point(element["lon"], element["lat"])})

result = {"title": "Arthur’s Pass local overview", "projection": "EPSG:3857", "viewBox": "0 0 480 360",
          "referenceLatitude": lat, "groundMetresPerPixelAtCentre": ground_resolution,
          "boundsMetres": [left, top - 360 * resolution, left + 480 * resolution, top],
          "paths": paths, "markers": markers,
          "source": {"title": "OpenStreetMap contributors", "url": "https://www.openstreetmap.org/copyright",
                     "licence": "ODbL 1.0", "checked": "2026-11-09", "timestamp": osm["osm3s"]["timestamp_osm_base"],
                     "rawSha256": hashlib.sha256(raw).hexdigest()},
          "limits": "Selected roads, rivers and public village/pass points only; no tracks, terrain, park boundaries, live access or wildlife locations. Approximate scale at centre latitude."}
(root / "content/arthurs-pass-map.json").write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print("Generated attributed local map.")
