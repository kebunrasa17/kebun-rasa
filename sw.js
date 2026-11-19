var V="kebunrasa-v3",SHELL=["./","index.html","config.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL).catch(function(){})}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);
  if(/(^|\.)script\.google(usercontent)?\.com$/.test(u.hostname))return; /* data pesanan: jangan di-cache */
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){
    var net=fetch(r).then(function(res){
      if(res&&res.ok&&(u.origin===location.origin||/cdnjs|fonts\.g/.test(u.hostname))){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}
      return res}).catch(function(){return hit});
    return hit||net;
  }));
});
