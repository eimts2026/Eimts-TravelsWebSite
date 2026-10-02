"""Generate static map paths. Run from the project root with Python 3 and Node.

Roads: OSRM/FOSSGIS, serial requests <= 1/second, cached in the system temp dir.
Rail: shortest connected path over OSM railway ways (Kenya: 1435 mm SGR only).
Flights/boats: explicitly illustrative curves, never presented as surveyed paths.
No routing or geocoding API is called by a site visitor.
"""
import datetime
import heapq
import json
import math
import pathlib
import subprocess
import tempfile
import time
import urllib.parse
import urllib.request
import hashlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path(tempfile.gettempdir()) / "journey-path-cache"
CACHE.mkdir(exist_ok=True)
UA = {"User-Agent": "EmeraldIsleTravelRoutePreview/1.0"}
ROAD = "https://routing.openstreetmap.de/routed-car/route/v1/driving/"
RAIL_QUERIES = {
    "lk-rail": '[out:json][timeout:50];way["railway"="rail"](6.7,80.4,7.4,81.2);out geom;',
    "ke-rail": '[out:json][timeout:50];way["railway"="rail"]["gauge"="1435"](-4.3,37.1,-1.9,39.8);out geom;',
}
RAIL_ANCHORS = {
    "kandy": (7.2894112, 80.6322495),
    "ella": (6.8761470, 81.0474878),
    "nanu-oya": (6.9420013, 80.7438292),
    "mombasa": (-4.0214386, 39.5793699),
}


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as response:
        return json.load(response)


def distance(a, b):
    # Local equirectangular distance is sufficient for nearest-node/path weights.
    x = (b[1] - a[1]) * math.cos(math.radians((a[0] + b[0]) / 2))
    return math.hypot(b[0] - a[0], x) * 111195


def simplify(points, tolerance=0.000045):
    # Douglas-Peucker, ~5 m tolerance; preserves actual road bends and rail curves.
    keep = {0, len(points) - 1}
    pending = [(0, len(points) - 1)]
    while pending:
        first, last = pending.pop()
        a, b = points[first], points[last]
        dx, dy = b[0] - a[0], b[1] - a[1]
        length = dx * dx + dy * dy
        maximum, chosen = 0, None
        for index in range(first + 1, last):
            p = points[index]
            t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / length)) if length else 0
            delta = math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
            if delta > maximum:
                maximum, chosen = delta, index
        # Preserve intermediate source points on long, straight stretches too.
        if maximum <= tolerance and distance(a, b) > 2000 and last - first > 1:
            chosen = (first + last) // 2
            maximum = tolerance * 2
        if maximum > tolerance:
            keep.add(chosen)
            pending.extend([(first, chosen), (chosen, last)])
    return [[round(v, 5) for v in points[i]] for i in sorted(keep)]


last_request = 0


def road_path(a, b):
    global last_request
    coords = ";".join(f"{p[1]:.7f},{p[0]:.7f}" for p in (a, b))
    key = hashlib.sha256(coords.encode()).hexdigest()[:24]
    file = CACHE / (key + ".json")
    if file.exists():
        data = json.loads(file.read_text())
    else:
        time.sleep(max(0, 1.1 - (time.monotonic() - last_request)))
        last_request = time.monotonic()
        data = fetch(ROAD + coords + "?overview=full&geometries=geojson")
        if data.get("code") != "Ok":
            raise RuntimeError("No road path: " + coords + ": " + str(data.get("code")))
        file.write_text(json.dumps(data), encoding="utf-8")
    if max(p["distance"] for p in data["waypoints"]) > 6000:
        raise RuntimeError("Road access needs review (>6 km snap): " + coords)
    return {"mode": "route", "source": "OSRM / OpenStreetMap", "coordinates": simplify([p[::-1] for p in data["routes"][0]["geometry"]["coordinates"]])}


def rail_graph(key):
    file = CACHE / (key + ".json")
    if not file.exists():
        file.write_text(json.dumps(fetch("https://overpass-api.de/api/interpreter?" + urllib.parse.urlencode({"data": RAIL_QUERIES[key]}))))
    data = json.loads(file.read_text())
    points, graph = {}, {}
    for way in data["elements"]:
        if way["type"] != "way" or way.get("tags", {}).get("service") in ("siding", "spur", "yard"):
            continue
        for node, point in zip(way["nodes"], way["geometry"]):
            points[node] = (point["lat"], point["lon"])
        for a, b in zip(way["nodes"], way["nodes"][1:]):
            cost = distance(points[a], points[b])
            graph.setdefault(a, {})[b] = cost
            graph.setdefault(b, {})[a] = cost
    return points, graph


graphs = {}


def rail_paths(a, b, country):
    key = "lk-rail" if country == "Sri Lanka" else "ke-rail"
    if key not in graphs:
        graphs[key] = rail_graph(key)
    points, graph = graphs[key]
    start, finish = [min(graph, key=lambda n: distance(points[n], RAIL_ANCHORS.get(p["id"], (p["lat"], p["lng"])))) for p in (a, b)]
    costs, previous, queue = {start: 0}, {}, [(0, start)]
    while queue:
        cost, node = heapq.heappop(queue)
        if node == finish:
            break
        if cost > costs[node]:
            continue
        for neighbor, length in graph[node].items():
            new = cost + length
            if new < costs.get(neighbor, math.inf):
                costs[neighbor] = new
                previous[neighbor] = node
                heapq.heappush(queue, (new, neighbor))
    if finish not in costs:
        raise RuntimeError("Disconnected railway: " + a["id"] + " -> " + b["id"])
    path, node = [finish], finish
    while node != start:
        node = previous[node]
        path.append(node)
    coords = [points[n] for n in reversed(path)]
    paths = []
    if distance((a["lat"], a["lng"]), coords[0]) > 250:
        paths.append(road_path((a["lat"], a["lng"]), coords[0]))
    paths.append({"mode": "train", "source": "OpenStreetMap railway tracks", "coordinates": simplify(coords)})
    if distance(coords[-1], (b["lat"], b["lng"])) > 250:
        paths.append(road_path(coords[-1], (b["lat"], b["lng"])))
    return paths


def curve(a, b, mode):
    a, b = (a["lat"], a["lng"]), (b["lat"], b["lng"])
    dx, dy = b[0] - a[0], b[1] - a[1]
    bend = 0.15 if mode == "flight" else 0.06
    control = ((a[0] + b[0]) / 2 - dy * bend, (a[1] + b[1]) / 2 + dx * bend)
    points = []
    for i in range(49):
        t = i / 48
        points.append([round((1 - t)**2 * a[j] + 2 * (1 - t) * t * control[j] + t*t * b[j], 5) for j in (0, 1)])
    return {"mode": mode, "source": "Illustrative transfer arc", "coordinates": points}


def main():
    command = 'import {getJourneyRoute} from "./src/data/journey-routes.js"; import fs from "node:fs"; const trips=JSON.parse(fs.readFileSync("src/data/packages.json","utf8")); console.log(JSON.stringify(trips.map(t=>({slug:t.url.split("/").filter(Boolean).at(-1),country:t.country,...getJourneyRoute(t)}))));'
    manifest = json.loads(subprocess.check_output(["node", "--input-type=module", "-e", command], cwd=ROOT, text=True))
    generated, shared = {}, {}
    for route in manifest:
        for a, b in zip(route["stops"], route["stops"][1:]):
            key = (a["id"], b["id"], b["mode"])
            if b["mode"] == "route" and key not in shared:
                shared[key] = [road_path((a["lat"], a["lng"]), (b["lat"], b["lng"]))]
                print(" / ".join(key), len(shared[key][0]["coordinates"]), "points", flush=True)
    for route in manifest:
        legs = []
        for a, b in zip(route["stops"], route["stops"][1:]):
            key = (a["id"], b["id"], b["mode"])
            if key not in shared:
                if b["mode"] == "route":
                    paths = [road_path((a["lat"], a["lng"]), (b["lat"], b["lng"]))]
                elif b["mode"] == "train":
                    paths = rail_paths(a, b, route["country"])
                else:
                    paths = [curve(a, b, b["mode"])]
                shared[key] = paths
                print(" / ".join(key), sum(len(p["coordinates"]) for p in paths), "points", flush=True)
            legs.append({"from": a["id"], "to": b["id"], "mode": b["mode"], "paths": shared[key]})
        generated[route["slug"]] = {"version": 1, "generated": datetime.date.today().isoformat(), "legs": legs}
    target = ROOT / "public" / "maps" / "routes"
    target.mkdir(parents=True, exist_ok=True)
    for slug, data in generated.items():
        (target / (slug + ".json")).write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    print("Saved", len(generated), "package paths;", len(shared), "unique legs.")


if __name__ == "__main__":
    main()
