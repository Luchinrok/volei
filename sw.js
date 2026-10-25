// Primer la xarxa; si no n'hi ha (pavelló sense cobertura), l'última còpia guardada.
const CACHE = 'volei-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // les pàgines d'entrar amb Google (/__/auth/) no es toquen
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/__/')) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
