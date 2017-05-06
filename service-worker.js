var CACHE_NAME = 'bitrate'
var urlsToCache = [
  '/',
  'index.html',
  'scripts.js',
  'styles.css',
  'images/icon-192x192.png',
  'images/icon-256x256.png',
  'images/icon-384x384.png',
  'images/icon-512x512.png'
]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})
