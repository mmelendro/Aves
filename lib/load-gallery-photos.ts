import type { GalleryPhoto } from "@/lib/place-gallery"
const loaders:Record<string,()=>Promise<{default:GalleryPhoto[]}>>={
 colombia:()=>import("@/content/gallery-colombia.json"),
 australia:()=>import("@/content/gallery-australia.json"),
 "new-zealand":()=>import("@/content/gallery-new-zealand.json"),
}
/** Import only the explicitly selected country's reviewed gallery. */
export async function loadGalleryPhotos(country:string){const load=loaders[country];return load ? (await load()).default : []}
