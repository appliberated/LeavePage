self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("leavepage").then(cache => {
            return cache.addAll([
                "/",
                "/?b",
                "/?vb",
                "/?v",
                "/index.html",
                "/css/main.css",
                "/js/main.js",
                "/assets/images/somewhere-in-time.jpg",
                "/assets/sounds/come-back-to-me.wav",
                "/assets/images/cursors/cursor-leave.svg"
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});