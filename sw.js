const version = 'mysite-v1::';

self.addEventListener('install', event => {
  console.log('worker: install event in progress');
  event.waitUntil(
    caches
      .open(version)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          '/main.css',
          'script.js'
        ]);
      })
      .then(() => console.log('worker install completed'))
  )
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }

              return caches.open(version).then(cache => {
                return fetch(event.request).then(response => {
                  return cache.put(event.request, response.clone())
                    .then(() => response);
                });
              });
            })
    )
  }
});
