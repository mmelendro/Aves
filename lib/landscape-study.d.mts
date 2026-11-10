export function profileSvg(profile: { name: string; terrain: string; water: string; flock: string; whales: boolean }, options?: { compact?: boolean }): string
export const terrainNames: string[]
export function selectLandscapeProfile<T extends { country: string; level: string; selectionId: string }>(profiles: T[], country: string, regionId?: string, placeId?: string): T | undefined
