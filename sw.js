/**
 * leave page
 * https://leavepage.appliberated.com/
 *
 * Copyright (c) 2017 Appliberated
 * Released under the MIT license
 * https://github.com/appliberated/LeavePage/blob/master/LICENSE
 */

"use strict";

var CACHE_NAME = "leavepage-cache-v1";
const URLS_TO_CACHE = [
    "/",
    "/index.html",
    "/css/main.css",
    "/js/main.js",
    "/assets/images/somewhere-in-time.jpg",
    "/assets/sounds/come-back-to-me.wav",
    "/assets/images/cursors/cursor-leave.svg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE).then(() => self.skipWaiting());
        })
    );
});

function deleteCaches (filter) {
    return caches.keys()
      .then(keys => filter ? keys.filter(filter) : keys)
      .then(keys => keys.map(key => caches.delete(key)))
      .then(deletions => Promise.all(deletions));
}

self.addEventListener("activate", event => {
    deleteCaches(name => name !== CACHE_NAME);
    return event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});