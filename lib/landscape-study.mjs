/** Native vector studies. Each profile declares water explicitly; inland scenes
 * cannot inherit surf, whales or a marine feeding flock from the NZ pilot.
 */
const terrain = {
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

const escape = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;')
export function profileSvg(profile, { compact = false } = {}) {
  const pts = terrain[profile.terrain]
  if (!pts) throw new Error(`Unknown terrain: ${profile.terrain}`)
  const y = 115, scale = compact ? .8 : 1
  const xy = ([x, h]) => `${12 + x * scale},${y + h * scale}`
  const land = `M0 ${y} L${pts.map(xy).join(' L')}`
  const water = profile.water
  let continuation = ' C330 116 390 113 450 115 S650 114 800 115'
  const detail = []
  if (water === 'ocean') {
    continuation = ' C330 118 410 117 480 115 C510 114 526 102 538 103 C545 104 543 109 537 107 C553 116 570 115 590 113 S650 120 680 115 S746 118 800 115'
    detail.push('M503 120 Q541 112 577 120 T648 121 M623 124 Q675 119 711 122')
  } else if (water === 'river') {
    continuation = ' C310 119 340 120 380 115 C420 110 445 110 479 114 C510 118 521 121 550 120 S660 112 800 115'
    detail.push('M383 122 C429 114 459 120 491 124 S561 128 592 123', 'M438 129 Q471 123 501 130')
  } else if (['lake','lagoon','wetland'].includes(water)) {
    continuation = ' C330 119 380 115 425 116 S510 115 560 116 S700 115 800 115'
    detail.push('M411 122 Q455 120 492 122 M514 126 Q552 124 587 126')
    if (water === 'wetland') detail.push('M385 116 l-2 -9 m2 9 l3 -6 M603 116 l1 -12 m-1 12 l-4 -7')
    if (water === 'lagoon') detail.push('M601 116 Q631 109 660 115')
  }
  // Sparse interior ridges follow the actual skyline's strongest peaks. They
  // express facets, not a second layer of land or a literal snowline.
  const peaks = pts.map((p,i)=>({p,i})).filter(({p,i})=>i>0 && i<pts.length-1 && p[1]<pts[i-1][1] && p[1]<pts[i+1][1]).slice(0,3)
  if (Math.min(...pts.map(p=>p[1])) < -20) for (const {p:[x,h]} of peaks) detail.push(`M${12+x*scale} ${y+h*scale} l${-4*scale} ${9*scale} l${8*scale} ${5*scale} l${-13*scale} ${8*scale}`)
  if (['rainforest','woodland','cloud-forest','wooded-island','forest-lake','tablelands'].includes(profile.terrain)) {
    detail.push('M38 112 Q42 99 47 108 Q52 98 57 108 Q62 101 68 111 M179 109 Q183 98 188 106 Q193 97 199 109')
  }
  const boundary = land + continuation
  const counts = { forest: 2, soaring: 2, wetland: 4, coastal: 6, terns: 7 }
  const n = compact ? Math.min(3, counts[profile.flock]) : counts[profile.flock]
  const birds = Array.from({length:n},(_,i)=>{
    const xs=[463,514,555,604,649,697,739], ys=[80,69,88,76,68,84,76]
    const s=profile.flock==='soaring'?5:3.7+(i%3)*.4
    const form=profile.flock==='wetland'?'M-1 0 Q-.5 -.55 0 0 Q.5 -.55 1 0 M0 0 l.26 .06':profile.flock==='forest'?'M-1 -.1 Q-.4 -.6 0 0 Q.5 -.35 1 -.1 M0 0 l.12 .3': 'M-1 -.15 Q-.5 -.35 0 0 Q.5 -.4 1 -.2 M0 0 l.05 .2 l.12 -.1'
    return `<path d="${form}" transform="translate(${xs[i]} ${ys[i]}) rotate(${[5,-8,18,-4,-23,8,-10][i]}) scale(${s})" stroke-width="${.7/s}"/>`
  }).join('')
  const whale = profile.whales && water==='ocean' ? '<path d="M588 114 Q606 104 620 111 Q619 106 616 106 Q623 106 626 113 M665 115 C670 107 651 108 651 100 Q664 105 672 101 Q681 99 684 105 Q687 100 697 102 L709 99 C710 109 690 107 689 115" stroke-width=".7"/>' : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 145" role="img" aria-label="${escape(profile.name)} landscape study"><rect width="800" height="145" fill="#ecfdf5"/><path d="${boundary} L800 0H0Z" fill="white"/><g fill="none" stroke="#047857" stroke-linecap="round" stroke-linejoin="round"><path d="${boundary}" stroke-width="1.35"/>${detail.map(d=>`<path d="${d}" stroke-width=".65"/>`).join('')}${whale}${birds}</g><text x="26" y="27" font-family="sans-serif" font-size="13" fill="#064e3b">${escape(profile.name)}</text></svg>`
}

export const terrainNames = Object.keys(terrain)

/** Asset IDs are distinct from existing map selection IDs. Unknown selections
 * fail closed: an inland/unknown place must never fall back to a coastal whale.
 */
export function selectLandscapeProfile(profiles, country, regionId, placeId) {
  const level = placeId ? 'place' : regionId ? 'region' : 'country'
  const selectionId = placeId || regionId || country
  return profiles.find(profile => profile.country === country && profile.level === level && profile.selectionId === selectionId)
}
