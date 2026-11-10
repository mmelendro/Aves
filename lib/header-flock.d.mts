export interface FlockProfile { name: string; scientificName: string; family: string; source: string }
export const birdFamilies: string[]
export function selectHeaderFlock(catalogue: Record<string,FlockProfile>,country: string,regionId?:string,placeId?:string): FlockProfile
export function headerFlockGeometry(input:{width:number;wordCenter:number;navLeft:number;navRight:number},family:string): {x:number;y:number;size:number;rotation:number}[]
export function birdOutline(family:string,pose?:number):string
