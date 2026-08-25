const BASE="/ClonKrIphone/";
const CACHE_NAME="clonkr-pwa-v1.0.0-github-pages";
const SHELL=[
  BASE,
  BASE+"index.html",
  BASE+"manifest.json",
  BASE+"ClonKR_Animated_Splash_Final.html",
  BASE+"icons/icon-32.png",
  BASE+"icons/apple-touch-icon-180.png",
  BASE+"icons/icon-192.png",
  BASE+"icons/icon-512.png"
];
self.addEventListener("install",e=>e.waitUntil(
  caches.open(CACHE_NAME)
    .then(c=>c.addAll(SHELL))
    .then(()=>self.skipWaiting())
));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin || !u.pathname.startsWith(BASE)) return;
  e.respondWith(
    caches.match(e.request).then(cached=>cached || fetch(e.request).then(r=>{
      const cp=r.clone();
      caches.open(CACHE_NAME).then(c=>c.put(e.request,cp));
      return r;
    }).catch(()=>caches.match(BASE+"index.html")))
  );
});
