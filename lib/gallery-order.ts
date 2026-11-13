import type {GalleryPhoto} from "./place-gallery"
/** Small ordering logic, separated from the server's complete credited catalogue. */
export function orderGalleryPhotos(collection:readonly GalleryPhoto[],regionId=""):GalleryPhoto[]{
 const photos=collection.filter(p=>!regionId||p.regionId===regionId),groups=new Map<string,GalleryPhoto[]>();
 for(const photo of photos){const key=regionId?photo.placeId:photo.regionId;groups.set(key,[...(groups.get(key)??[]),photo])}
 if(!regionId)for(const [region,group]of groups){const places=[...new Set(group.map(p=>p.placeId))],ordered=places.map(place=>group.find(p=>p.placeId===place)!);groups.set(region,[...ordered,...group.filter(p=>!ordered.includes(p))].slice(0,2))}
 const ordered:GalleryPhoto[]=[];for(let i=0;i<Math.max(0,...[...groups.values()].map(g=>g.length));i++)for(const group of groups.values())if(group[i])ordered.push(group[i]);return ordered
}
