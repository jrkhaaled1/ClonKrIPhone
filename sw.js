const BASE="/ClonKrIPhone/";
const CACHE="clonkr-ios-v1.1.0";
const SHELL=[BASE,BASE+"manifest.json",BASE+"icons/icon-192.png",BASE+"icons/icon-512.png",BASE+"icons/apple-touch-icon-180.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin||!u.pathname.startsWith(BASE))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match(BASE))));});