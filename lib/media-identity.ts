/** Programme identity follows its curated content, never the page underneath. */
const identities = {
  colombia: { country: "Colombia", bird: "Motmot", file: "aves-colombia-bird.png" },
  australia: { country: "Australia", bird: "Australian bird", file: "aves-australia-bird.png" },
  "new-zealand": { country: "New Zealand", bird: "Kea", file: "aves-new-zealand-bird.png" },
  global: { country: "AVES", bird: "AVES bird", file: "aves-global-bird.png" },
} as const
export function mediaIdentity(country: string) {
  return Object.hasOwn(identities, country) ? identities[country as keyof typeof identities] : identities.global
}
