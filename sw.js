const CACHE_NAME = 'ritsunavi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://unpkg.com/lucide@latest](https://unpkg.com/lucide@latest)'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
