const CACHE_NAME = 'whiteboard-app-v1';
const urlsToCache = [
  '/utiliites/multiboard.html',
  '/utiliites/multiboard-192x192.png',
  '/utiliites/multiboard-512x512.png'
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
