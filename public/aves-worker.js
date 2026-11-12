/* Public fallback only. No trip page, API, media file or visited response is cached. */
const CACHE="aves-public-information-v1";
const PUBLIC=new Set(["/","/colombia","/australia","/new-zealand","/new-zealand/north-island","/new-zealand/south-island","/search","/preferences","/species/reference"]);
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add("/offline.html"))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("aves-public-information-")&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener("fetch",event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=="GET"||request.mode!=="navigate"||url.origin!==self.location.origin||!PUBLIC.has(url.pathname))return;
 event.respondWith(fetch(request).catch(()=>caches.match("/offline.html").then(response=>response||new Response("You are offline. Reconnect to open AVES.",{status:503,headers:{"Content-Type":"text/plain"}}))));
});
