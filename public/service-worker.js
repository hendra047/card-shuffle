const CACHE_NAME = 'random-card-v2';
const urlsToCache = [
    './',
    './index.html',
    './draw.html',
    './manifest.json',

    // CSS
    './src/css/main.css',
    './src/css/draw.css',

    // JS
    './src/js/main.js',
    './src/js/draw.js',

    // Fonts
    './src/fonts/mouse-memoirs/MouseMemoirs-Regular.ttf',
    './src/fonts/outfit/Outfit-VariableFont-wght.ttf',
    './src/fonts/paytone-one/PaytoneOne-Regular.ttf',
    './src/fonts/riffic/RifficFree-Bold.ttf',

    // Images
    './assets/card.png',
    './assets/icon.png',
    './assets/img/refuned-11.png',
    './assets/img/title-black.png',
    './assets/img/title-white.png'
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