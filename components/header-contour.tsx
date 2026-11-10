/** The header ends in a landscape silhouette. Transparent space below the
 * white shape reveals the actual page background rather than a coloured strip.
 * Decoration never receives input or changes the logo/navigation geometry.
 */
export function HeaderContour() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[52px] h-10 text-emerald-600">
    <svg focusable="false" viewBox="0 0 1440 40" preserveAspectRatio="none" className="h-full w-full" fill="none">
      <path d="M0 0 H1440 V27 C1370 33 1320 20 1250 26 S1130 35 1055 27 S920 21 850 27 S710 34 650 26 L610 19 L582 23 L550 11 L529 20 L502 15 L465 29 L420 25 L391 16 L371 22 L342 8 L322 18 L300 12 L267 28 L225 24 L200 30 L169 19 L145 27 L117 14 L90 26 L60 21 L30 30 L0 26 Z" fill="white" fillOpacity=".98" />
      <path d="M0 26 L30 30 L60 21 L90 26 L117 14 L145 27 L169 19 L200 30 L225 24 L267 28 L300 12 L322 18 L342 8 L371 22 L391 16 L420 25 L465 29 L502 15 L529 20 L550 11 L582 23 L610 19 L650 26 C710 34 780 34 850 27 S980 19 1055 27 S1180 34 1250 26 S1370 33 1440 27" stroke="currentColor" strokeWidth=".8" vectorEffect="non-scaling-stroke" opacity=".45" />
    </svg>
    <svg focusable="false" viewBox="0 0 64 18" fill="none" className="absolute left-[68%] top-2 hidden h-[13px] w-12 md:block">
      <path d="M2 8 Q8 3 13 11 Q17 4 24 5 M28 3 Q33 0 38 7 Q43 1 49 2 M46 12 Q51 8 55 15 Q58 10 62 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".65" />
    </svg>
  </span>
}
