/** Representative composites of the existing regional guide focus, not surveyed views. */
export const terrain = {
  'three-cordilleras': [[0,0],[18,-3],[38,-15],[58,-37],[76,-19],[91,-9],[111,-29],[129,-12],[149,-8],[170,-32],[191,-14],[215,-5],[260,0]],
  'southern-alps': [[0,0],[27,-6],[46,-15],[64,-22],[84,-43],[102,-30],[123,-18],[139,-11],[164,-32],[180,-24],[203,-12],[234,-3],[260,0]],
  'high-andes': [[0,0],[32,-9],[53,-26],[75,-30],[88,-42],[100,-34],[121,-27],[144,-12],[170,-23],[197,-10],[226,-5],[260,0]],
  'isolated-massif': [[0,0],[30,-7],[50,-14],[72,-27],[94,-44],[108,-37],[121,-41],[139,-25],[160,-20],[188,-7],[223,-2],[260,0]],
  'paramo': [[0,0],[31,-11],[52,-17],[69,-26],[93,-32],[113,-25],[135,-29],[154,-17],[177,-22],[204,-10],[235,-3],[260,0]],
  'headwaters': [[0,0],[30,-12],[49,-25],[68,-31],[85,-42],[100,-39],[112,-27],[133,-22],[150,-30],[171,-21],[204,-9],[260,0]],
  'cloud-forest': [[0,0],[24,-7],[47,-13],[69,-26],[86,-24],[109,-37],[133,-21],[151,-24],[174,-12],[200,-18],[228,-6],[260,0]],
  'alpine-pass': [[0,0],[24,-13],[45,-31],[66,-42],[89,-23],[111,-12],[131,-8],[154,-26],[175,-38],[195,-25],[221,-9],[260,0]],
  'volcanic': [[0,0],[30,-3],[59,-12],[85,-38],[100,-39],[113,-32],[133,-14],[150,-8],[174,-31],[193,-14],[217,-6],[260,0]],
  'escarpment': [[0,0],[26,-5],[43,-16],[61,-19],[100,-19],[111,-27],[148,-26],[167,-13],[202,-10],[229,-2],[260,0]],
  'sandstone-coast': [[0,0],[30,-3],[51,-9],[72,-11],[105,-11],[122,-25],[160,-25],[175,-9],[205,-7],[222,-3],[260,0]],
  'heath-headland': [[0,0],[35,-5],[56,-11],[91,-16],[125,-17],[152,-15],[178,-7],[203,-8],[224,-2],[260,0]],
  'wooded-ranges': [[0,0],[25,-5],[49,-17],[71,-22],[93,-15],[118,-31],[142,-23],[165,-13],[190,-18],[220,-7],[260,0]],
  'valley': [[0,-18],[22,-27],[46,-36],[70,-22],[95,-6],[124,0],[158,-3],[182,-18],[209,-28],[232,-13],[260,0]],
  'long-valley': [[0,-10],[29,-24],[55,-29],[77,-18],[100,-4],[133,0],[170,-2],[196,-12],[222,-22],[244,-9],[260,0]],
  'forest-lake': [[0,0],[25,-8],[49,-23],[74,-34],[96,-22],[116,-13],[143,-4],[170,-19],[197,-30],[220,-14],[260,0]],
  'fiord': [[0,-2],[24,-27],[44,-43],[67,-38],[87,-21],[109,-5],[139,0],[170,-12],[192,-37],[210,-31],[232,-13],[260,0]],
  'tablelands': [[0,0],[29,-9],[54,-23],[78,-26],[110,-24],[131,-28],[157,-21],[185,-23],[213,-10],[260,0]],
  'wooded-island': [[0,0],[26,-5],[48,-13],[68,-18],[91,-13],[117,-22],[141,-15],[168,-17],[196,-8],[221,-3],[260,0]],
  'rainforest': [[0,0],[25,-2],[51,-8],[75,-5],[94,-11],[123,-8],[145,-13],[168,-7],[194,-8],[219,-3],[260,0]],
  'woodland': [[0,0],[25,-3],[47,-7],[73,-5],[97,-12],[124,-7],[147,-10],[177,-4],[204,-7],[231,-2],[260,0]],
  'dry-coast': [[0,0],[30,-2],[65,-7],[98,-4],[126,-9],[151,-5],[182,-6],[213,-2],[260,0]],
  'low-headland': [[0,0],[29,-3],[55,-9],[79,-15],[105,-12],[130,-7],[160,-11],[190,-5],[219,-2],[260,0]],
  'grassland': [[0,0],[29,-2],[57,-5],[83,-4],[111,-8],[138,-6],[170,-3],[202,-5],[232,-1],[260,0]],
  'savanna': [[0,0],[37,-2],[65,-3],[93,-1],[122,-4],[152,-3],[184,-2],[222,-1],[260,0]],
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
