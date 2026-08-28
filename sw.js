/* Кэш интерфейса — приложение открывается без сети.
   v5: обновлён защищённый клиент; настройки и справочник
   берутся из сети, когда она есть. */

const CACHE = 'zam-v8';
const SHELL = ['./', 'index.html', 'otchet.html', 'sotrudniki.html', 'manifest.json'];
const FRESH = ['config.js', 'objects.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.concat(FRESH)))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (e.request.method !== 'GET') return;
  if (url.indexOf('script.google.com') > -1 || url.indexOf('telegram.org') > -1) return;

  if (FRESH.some(f => url.indexOf(f) > -1)) {
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
