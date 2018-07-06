let
  cacheName = 'v1',
  root = 'http://localhost:4500',
  cacheFiles = [
    `${root}/js/bundle.js`,
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700',
    `${root}/styles/styles.css`,
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
 * Open browser and goto http://localhost:4500, Third party data will be present as expected.
 * No turn off internet connection, you'll see magic.
 * This event is activated when page is refreshed.
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
    })
  )
})

/**
 * First we check if any request already has a response in cache, if there is we return the response,
 * else we go ahead and fetch reponse of other requests and put them in cache.
 *
 * NOTE: This mechanism doesn't update new response because it checks if request is in the cache,
 * if there is, it return the response.
 */
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         // Cache hit - return response
//         if (response) return response
//         let fetchRequest = event.request.clone()

//         return fetch(fetchRequest).then(response => {
//           // Check if we received a valid response
//           if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response
//           }

//           let responseToCache = response.clone()

//           caches.open(cacheName)
//             .then(cache => {
//               cache.put(event.request, responseToCache)
//             })

//           return response
//         })
//       })
//   )
// })
