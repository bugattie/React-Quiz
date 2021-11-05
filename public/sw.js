const CACHE_NAME = "offline-cache";
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/main.chunk.js",
  "/bg.jpg",
  "/sockjs-node",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png",
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache open");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
