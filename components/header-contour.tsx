/** Decorative continuation of the existing logo landscape. The enclosing header
 * row supplies the inline-size container; the wordmark itself never stretches.
 * Fixed-size flock marks avoid distorting birds on wide or narrow screens.
 */
export function HeaderContour() {
  return <span aria-hidden="true" className="pointer-events-none absolute right-px bottom-0 h-6 translate-x-full text-emerald-600" style={{ width: "max(0px, calc(100cqw - 100%))" }}>
    <svg focusable="false" viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none" className="h-full w-full">
      <path d="M0 28 C70 28 88 25 145 28 S230 31 290 28 S390 25 455 28 S565 31 630 28 S745 25 815 28 S930 30 1000 28" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity=".65" />
      <path d="M0 34 C48 34 66 32 105 34 S172 36 215 34" stroke="currentColor" strokeWidth=".8" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity=".3" />
    </svg>
    <svg focusable="false" viewBox="0 0 64 18" fill="none" className="absolute bottom-[7px] left-[42%] hidden h-[13px] w-[48px] md:block">
      <path d="M2 8 Q8 3 13 11 Q17 4 24 5 M28 3 Q33 0 38 7 Q43 1 49 2 M46 12 Q51 8 55 15 Q58 10 62 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />
    </svg>
  </span>
}
