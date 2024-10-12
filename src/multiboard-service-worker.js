const CACHE_NAME = 'whiteboard-app-v1';
const urlsToCache = [
  '/utilities/multiboard.html',
  '/utilities/multiboard-192x192.png',
  '/utilities/multiboard-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
