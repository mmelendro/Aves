/**
 * Equal Earth forward projection, in radians out. Keep geography and label
 * anchors on this same projection: moving a label must never move a country.
 * Formula: Šavrič, Patterson & Jenny; constants also used by d3-geo.
 * https://raw.githubusercontent.com/d3/d3-geo/main/src/projection/equalEarth.js
 */
export function equalEarth(longitude, latitude) {
  const lambda = longitude * Math.PI / 180
  const phi = latitude * Math.PI / 180
  const m = Math.sqrt(3) / 2
  const l = Math.asin(m * Math.sin(phi))
  const l2 = l * l
  const l6 = l2 * l2 * l2
  return [
    lambda * Math.cos(l) / (m * (1.340264 - 3 * 0.081106 * l2 + l6 * (7 * 0.000893 + 9 * 0.003796 * l2))),
    l * (1.340264 - 0.081106 * l2 + l6 * (0.000893 + 0.003796 * l2)),
  ]
}

// One uniform scale preserves the projection's shape at every viewport size.
export function worldPoint(longitude, latitude) {
  const [x, y] = equalEarth(longitude, latitude)
  return [Number((500 + x * 176).toFixed(2)), Number((270 - y * 176).toFixed(2))]
}
