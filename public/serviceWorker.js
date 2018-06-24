let
  cacheName = 'v1',
  PORT = 4500,
  root = `http://localhost:${PORT}`,
  cacheFiles = [
    `${root}/js/bundle.js`,
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700',
    `${root}/styles/styles.css`,
  ]

/**
 * When SW is installed, we add cacheFiles to cache
 */
self.addEventListener('install', e => {
  console.log('ServiceWorker Installed!!')

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching cache files!!')
        return cache.addAll(cacheFiles)
      })
  )
})

/**
 * When SW is activated, we look for any old cache with cacheName, if there is any, we delete it.
 */
self.addEventListener('activate', e => {
  console.log('ServiceWorker activated!!')

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(thisCacheName => {
        if (thisCacheName !== cacheName) {
          console.log('Removing cached files from', thisCacheName)
          return caches.delete(thisCacheName)
        }
      }))
    })
  )

})

/**
 * When SW is ready to fetch,
 * First we check if any request already has a response in cache, we move on, else
 * we go ahead and fetch reponse of other requests and put them in cache.
 * This mechanism is suitable for offline-first apps.
 * Open browser and goto http://localhost:4500, Third party data will be present as expected.
 * No turn off internet connection, you'll see magic.
 */
self.addEventListener('fetch', e => {

  e.respondWith(
    caches.open(cacheName).then(cache => {

      return cache.match(e.request)
        .then(response => {
          if (response) {
            console.log('Found in cache', e.request.url)
            return response
          }

          let responseClone = response.clone()

          fetch(e.request)
            .then(response => {
              cache.put(e.request, responseClone)
              return response
            })
            .catch(e =>
              console.log('No response from fetch', e)
            )
        })
        .catch(err =>
          console.log('Error Fetching & Caching New Data', err)
        )
    })
  )

})
