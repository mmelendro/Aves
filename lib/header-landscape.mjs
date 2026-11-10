/** Decorative alpine/coastal composite, not a surveyed view or sighting claim.
 * CSS-pixel coordinates keep wildlife proportions stable through reflow.
 */
export function newZealandHeaderGeometry({ width, wordCenter, navLeft, navRight }) {
  const w = Math.max(240, width), compact = w < 640
  const s = Math.min(compact ? .64 : 1.2, Math.max(.45, (wordCenter - 4) / 124))
  const x = wordCenter - 124 * s, baseline = 108
  const point = (a, b) => `${(x + a * s).toFixed(2)} ${(baseline + b * s).toFixed(2)}`
  const mountain = `M0 108 L${point(0, 0)} L${point(18, -3)} L${point(34, -9)} L${point(47, -12)} L${point(58, -21)} L${point(68, -24)} L${point(84, -39)} L${point(95, -31)} L${point(109, -23)} L${point(122, -18)} L${point(138, -11)} L${point(148, -16)} L${point(164, -29)} L${point(176, -23)} L${point(188, -22)} L${point(205, -11)} L${point(227, -4)} L${point(250, 0)}`
  const ridges = [
    `M${point(84, -39)} L${point(81, -31)} L${point(88, -28)} L${point(78, -21)} L${point(75, -14)} M${point(88, -28)} L${point(98, -22)} L${point(115, -15)}`,
    `M${point(58, -21)} L${point(68, -19)} L${point(78, -21)} M${point(47, -12)} L${point(63, -15)} L${point(75, -14)} L${point(89, -8)}`,
    `M${point(164, -29)} L${point(161, -23)} L${point(169, -20)} L${point(163, -13)} M${point(169, -20)} L${point(182, -14)} L${point(199, -9)}`,
  ]
  const seaStart = x + 250 * s
  const a = Math.max(seaStart + 10, Math.min(w * .66, navLeft + 20))
  const space = Math.max(42, Math.min(w - 16, navRight) - a), u = Math.min(1, space / 290)
  const p = (i, j) => `${(a + i * u).toFixed(2)} ${(baseline + j * u).toFixed(2)}`
  const boundary = `${mountain} C${seaStart + 36} 110 ${a - 24} 112 ${p(0, 0)} C${p(18, -1)} ${p(32, -13)} ${p(44, -12)} C${p(50, -12)} ${p(52, -9)} ${p(48, -8)} C${p(43, -9)} ${p(48, -5)} ${p(58, -3)} C${p(72, 2)} ${p(80, -5)} ${p(96, -5)} C${p(112, -5)} ${p(118, 2)} ${p(136, 2)} C${p(145, 2)} ${p(148, -1)} ${p(151, -1)} C${p(166, 1)} ${p(173, -2)} ${p(185, -1)} C${p(213, 3)} ${w - 22} 108 ${w} 108`
  const water = [
    `M${p(17, 4)} C${p(38, -2)} ${p(48, 1)} ${p(68, 5)} S${p(109, 8)} ${p(126, 6)}`,
    `M${p(80, 8)} C${p(110, 4)} ${p(130, 8)} ${p(151, 8)} M${p(177, 6)} Q${p(206, 2)} ${p(237, 5)}`,
    `M${p(39, -8)} q${2*u} ${-3*u} ${4*u} 0 m${u} ${-u} q${3*u} ${-3*u} ${4*u} ${u}`,
  ]
  const whales = [
    `M${p(79, -2)} Q${p(92, -10)} ${p(105, -5)} Q${p(105, -9)} ${p(102, -10)} Q${p(109, -10)} ${p(111, -4)} Q${p(119, -1)} ${p(126, 1)}`,
    `M${p(151, -1)} C${p(152, -6)} ${p(137, -7)} ${p(138, -14)} Q${p(147, -11)} ${p(152, -12)} Q${p(158, -12)} ${p(159, -8)} Q${p(161, -12)} ${p(168, -12)} L${p(179, -14)} C${p(179, -7)} ${p(163, -5)} ${p(164, -1)}`,
  ]
  const birdStart = Math.max(seaStart + 6, navLeft), birdEnd = Math.max(birdStart + 28, Math.min(w - 16, navRight))
  const poses = compact
    ? [[.13, 79, 3.8, -9], [.47, 73, 3.3, 2], [.64, 88, 4.3, 21], [.89, 81, 3.8, -24]]
    : [[.05, 79, 4, 9], [.21, 69, 3.7, -3], [.32, 88, 4.6, 17], [.41, 76, 3.6, 3], [.53, 67, 3.4, -7], [.63, 85, 4.2, -4], [.74, 76, 4.4, -27], [.84, 88, 4.4, -18], [.95, 72, 3.5, 6]]
  const birds = poses.map(([fraction, y, size, rotation]) => ({ x: birdStart + (birdEnd - birdStart) * fraction, y, size, rotation }))
  return { boundary, ridges, water, whales, birds, baseline, compact }
}
