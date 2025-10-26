// Service Worker básico para evitar congelamiento
const CACHE_NAME = 'caribbean-basic-v1';

// Instalar service worker
self.addEventListener('install', function(event) {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

// Activar service worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker activado');
  event.waitUntil(self.clients.claim());
});

// Interceptar requests solo para recursos críticos
self.addEventListener('fetch', function(event) {
  // Solo cachear CSS y JS para evitar congelamiento
  if (event.request.url.includes('.css') || event.request.url.includes('.js')) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});
