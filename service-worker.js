const CACHE_NAME = "bola-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/nav.html",
  "/profile.html",
  "/sw_push.js",
  "/pages/team.html",
  "/pages/standing.html",
  "/pages/favourite.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/idb.js",
  "/js/db-controller.js",
  "/js/nav.js",
  "/js/api.js",
  "/icon/logo_48.png",
  "/icon/logo_96.png",
  "/icon/logo_192.png",
  "/icon/logo.png",
];

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});


self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});
