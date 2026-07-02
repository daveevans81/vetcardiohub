// sw.js — VetCardioHub offline shell
// Bump CACHE_VERSION on every deployment that changes any listed file.
const CACHE_VERSION = 'vch-v1';

const APP_SHELL = [
    '/health-tracker.html',
    '/styles.css',
    '/js/rr-logic.js',
    '/js/med-data.js',
    '/js/glossary-data.js',
    '/js/glossary-logic.js',
    '/js/load-partials.js',
    '/partials/partials-terms.html',
    '/partials/partials-privacy.html',
    '/js/vendor/chart.umd.min.js',
    '/js/vendor/chartjs-plugin-annotation.min.js',
    '/js/vendor/chartjs-plugin-zoom.min.js',
    '/js/vendor/chartjs-adapter-date-fns.bundle.min.js',
    '/js/vendor/jspdf.umd.min.js',
    '/js/vendor/jspdf.plugin.autotable.min.js',
    '/js/vendor/alpine-collapse.min.js',
    '/js/vendor/alpine.min.js',
    '/css/fontawesome/all.min.css',
    '/manifestrr.json',
    '/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    if (url.origin !== self.location.origin) return;   // leave any残 cross-origin requests alone

    // HTML: network-first so users always get app updates, cache fallback offline
    if (e.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    const copy = res.clone();
                    caches.open(CACHE_VERSION).then(c => c.put(e.request, copy));
                    return res;
                })
                .catch(() => caches.match(e.request))
        );
        return;
    }

    // Everything else (JS/CSS/fonts/icons): cache-first, populate on miss
    e.respondWith(
        caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(e.request, copy));
            return res;
        }))
    );
});