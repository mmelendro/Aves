/** Representative composites of the existing regional guide focus, not surveyed views. */
const terrain = {
  'escarpment': [[0,0],[26,-5],[43,-16],[61,-19],[100,-19],[111,-27],[148,-26],[167,-13],[202,-10],[229,-2],[260,0]],
  'sandstone-coast': [[0,0],[30,-3],[51,-9],[72,-11],[105,-11],[122,-25],[160,-25],[175,-9],[205,-7],[222,-3],[260,0]],
  'heath-headland': [[0,0],[35,-5],[56,-11],[91,-16],[125,-17],[152,-15],[178,-7],[203,-8],[224,-2],[260,0]],
  'wooded-ranges': [[0,0],[25,-5],[49,-17],[71,-22],[93,-15],[118,-31],[142,-23],[165,-13],[190,-18],[220,-7],[260,0]],
  'tablelands': [[0,0],[29,-9],[54,-23],[78,-26],[110,-24],[131,-28],[157,-21],[185,-23],[213,-10],[260,0]],
  'wooded-island': [[0,0],[26,-5],[48,-13],[68,-18],[91,-13],[117,-22],[141,-15],[168,-17],[196,-8],[221,-3],[260,0]],
  'woodland': [[0,0],[25,-3],[47,-7],[73,-5],[97,-12],[124,-7],[147,-10],[177,-4],[204,-7],[231,-2],[260,0]],
  'grassland': [[0,0],[29,-2],[57,-5],[83,-4],[111,-8],[138,-6],[170,-3],[202,-5],[232,-1],[260,0]],
  'floodplain': [[0,0],[30,-1],[63,-2],[96,-1],[129,-3],[160,-2],[192,-1],[225,-2],[260,0]],
  'dunes': [[0,0],[27,-2],[54,-7],[82,-5],[112,-12],[137,-8],[167,-4],[198,-9],[225,-5],[260,0]],
}

export const releasedAustraliaHeaders = {
  "/": {
    "terrain": "escarpment",
    "water": "ocean"
  },
  "/regions/queensland": {
    "terrain": "tablelands",
    "water": "lake"
  },
  "/regions/new-south-wales": {
    "terrain": "sandstone-coast",
    "water": "ocean"
  },
  "/regions/tasmania": {
    "terrain": "wooded-island",
    "water": "ocean"
  },
  "/regions/victoria": {
    "terrain": "grassland",
    "water": "wetland"
  },
  "/regions/south-australia": {
    "terrain": "dunes",
    "water": "lagoon"
  },
  "/regions/western-australia": {
    "terrain": "woodland",
    "water": "lake"
  },
  "/regions/northern-territory": {
    "terrain": "floodplain",
    "water": "wetland"
  },
  "/regions/australian-capital-territory": {
    "terrain": "wooded-ranges",
    "water": "river"
  },
  "/regions/jervis-bay-territory": {
    "terrain": "heath-headland",
    "water": "ocean"
  }
}

export function contextualHeaderGeometry({ width, wordCenter }, profile) {
  const w = Math.max(240, width), compact = w < 640, baseline = 108
  const s = Math.min(compact ? .64 : 1.2, Math.max(.45, (wordCenter - 4) / 124))
  const x = wordCenter - 124 * s
  const pt = (a,b) => `${(x+a*s).toFixed(2)} ${(baseline+b*s).toFixed(2)}`
  const points = terrain[profile.terrain]
  const end = x+260*s, span = Math.max(0,w-end)
  const q = (a,b) => `${(end+span*a).toFixed(2)} ${(baseline+b).toFixed(2)}`
  let continuation = ` C${q(.22,3)} ${q(.55,-2)} ${q(1,0)}`
  const water = [], ridges = []
  if (profile.water === 'river') {
    continuation = ` C${q(.18,8)} ${q(.3,-5)} ${q(.48,0)} S${q(.78,5)} ${q(1,0)}`
    water.push(`M${q(.26,7)} C${q(.41,0)} ${q(.48,9)} ${q(.66,6)}`)
  } else if (profile.water === 'wetland') {
    water.push(`M${q(.22,7)} Q${q(.34,5)} ${q(.46,7)} M${q(.63,10)} Q${q(.7,8)} ${q(.8,10)}`)
  } else if (['lake','lagoon'].includes(profile.water)) {
    water.push(`M${q(.2,7)} Q${q(.32,5)} ${q(.44,7)} M${q(.61,10)} Q${q(.71,8)} ${q(.82,10)}`)
  } else if (profile.water === 'ocean') {
    continuation = ` C${q(.22,3)} ${q(.4,0)} ${q(.52,-5)} C${q(.56,-8)} ${q(.58,-7)} ${q(.57,-4)} C${q(.64,3)} ${q(.82,2)} ${q(1,0)}`
    water.push(`M${q(.54,6)} Q${q(.67,1)} ${q(.8,6)}`)
  }
  const peaks = points.filter((p,i)=>i>0 && i<points.length-1 && p[1]<points[i-1][1] && p[1]<points[i+1][1])
  if (Math.min(...points.map(p=>p[1])) < -20) for (const [a,b] of peaks.slice(0,3)) {
    ridges.push(`M${pt(a,b)} L${pt(a-4,b+9)} L${pt(a+4,b+14)} L${pt(a-9,b+22)}`)
  }
  return { boundary: `M0 108 L${points.map(p=>pt(...p)).join(' L')}${continuation}`, ridges, water, whales: [], birds: [], baseline, compact }
}
