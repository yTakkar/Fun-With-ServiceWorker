let
  cacheName = 'v1',
  root = 'http://localhost:4500',
  cacheFiles = [
    `${root}/js/bundle.js`,
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700',
    `${root}/styles/styles.css`,
    // 'https://api.nasa.gov/planetary/apod?api_key=6lhKe8THkB2ny0LTI4gSKopkMVmFvkiUCjSjl2Cn',
    // 'https://jsonplaceholder.typicode.com/photos',
    // 'https://api.github.com/users/yTakkar/repos'
  ]

/**
 * We do initial caching here.
 * When all the files are cached, SW is installed.
 * This event is activated when user navigates to the page.
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
 * This event is activated when new SW takes control.
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
 * First we check if any request already has a response in cache, if there is we return the response,
 * else we go ahead and fetch reponse of other requests and put them in cache.
 * This mechanism is suitable for offline-first apps.
 * Open browser and goto http://localhost:4500, Third party data will be present as expected.
 * No turn off internet connection, you'll see magic.
 * This event is activated when page is refreshed.
 */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) return response

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        let fetchRequest = event.request.clone()

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          let responseToCache = response.clone()

          caches.open(cacheName)
            .then(cache => {
              cache.put(event.request, responseToCache)
            })

          return response
        })
      })
  )
})
