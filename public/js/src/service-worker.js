let
  PORT = 4500,
  root = `http://localhost:${PORT}`,
  cacheName = 'v1',
  cacheFiles = [
    `${root}/js/dist/bundle.js`,
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700',
    'https://fonts.googleapis.com/css?family=Roboto',
    'https://fonts.googleapis.com/css?family=Satisfy',
    `${root}/styles/styles.css`
  ]

self.addEventListener('install', e => {
  console.log('[ServiceWorker] installed!!')

  e.waitUntil(
    caches.open(cacheName)
      .then(c => {
        console.log('[ServiceWorker] Caching cacheFiles')
        return c.addAll(cacheFiles)
      })
      .catch(e => console.log(e) )
  )

})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] activated!!')

  e.waitUntil(
    caches.keys().then(async cacheNames => {
      return await cacheNames.map(async thisCacheName => {
        if (thisCacheName !== cacheName) {
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName)
          return caches.delete(thisCacheName)
        }
      })
    })

  )

})

self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] fetched!!')

  e.respondWith(

    caches.match(e.request)
      .then(response => {
        if (response) {
          console.log('[ServiceWorker] found in cache', e.request.url, response)
          return response
        }

        let requestClone = e.request.clone()

        fetch(requestClone)
          .then(response => response.json())
          .then(response => {
            if (!response) {
              console.log('[ServiceWorker] No response from fetch')
              return response
            }

            var responseClone = response.clone()

            caches.open(cacheName)
              .then(cache => {
                console.log('[ServiceWorker] New Data cached', e.request.url)
                cache.put(e.request, responseClone)
                return response
              })

          })
          .catch(err =>
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err)
          )

      })

  )

})
