const CACHE_NAME = 'whiteboard-app-v2';
const urlsToCache = [
  '/utilities/multiboard.html',
  '/utilities/favicon.ico',
  '/utilities/multiboard-192x192.png',
  '/utilities/multiboard-512x512.png',
  'https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
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
          .then((response) => {
            if (response) {
              return response;
            }

            return fetch(event.request).then((fetchResponse) => {
              // Check if we received a valid response
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }

              // Clone the response as it's a stream and can only be consumed once
              const responseToCache = fetchResponse.clone();

              caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });

              return fetchResponse;
            });
          })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
        );
      })
  );
});