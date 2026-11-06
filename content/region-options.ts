// Shared by discovery, enquiries and saved trip plans.
export const regionOptions = [
  { id: "queensland", label: "Queensland", shortLabel: "Queensland" },
  { id: "new-south-wales", label: "New South Wales", shortLabel: "NSW" },
  { id: "tasmania", label: "Tasmania", shortLabel: "Tasmania" },
  { id: "victoria", label: "Victoria", shortLabel: "Victoria" },
  { id: "south-australia", label: "South Australia", shortLabel: "South Australia" },
  { id: "western-australia", label: "Western Australia", shortLabel: "Western Australia" },
  { id: "northern-territory", label: "Northern Territory", shortLabel: "Northern Territory" },
  { id: "australian-capital-territory", label: "Australian Capital Territory", shortLabel: "ACT" },
  { id: "jervis-bay-territory", label: "Jervis Bay Territory", shortLabel: "Jervis Bay" },
] as const

export const regionLabels: Record<string, string> = Object.fromEntries(regionOptions.map(region => [region.id, region.label]))
export function regionShortLabel(id: string) { return regionOptions.find(region => region.id === id)?.shortLabel || regionLabels[id] || id }
