const CACHE_NAME = 'random-card-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/card.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});