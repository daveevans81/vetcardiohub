// sw.js — VetCardioHub offline shell
// Bump CACHE_VERSION on every deployment that changes any listed file.
const CACHE_VERSION = 'vch-v1.303';

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
    '/apple-touch-icon.png',
    '/echocalc.html',
    '/js/echo-breeds.js',
    '/js/echocalc.js',
    '/js/global-head.js',
    '/js/vendor/mathjax/tex-mml-chtml.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_VERSION).then(c =>
            Promise.allSettled(APP_SHELL.map(url => c.add(url)))
        )
    );
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
    if (url.origin !== self.location.origin) return;

    // ── App shell: HTML + first-party JS/CSS ──────────────────────────────
    // Network-first so every deploy reaches users immediately; the cached
    // copy is only served when offline.
    const isAppShell =
        e.request.mode === 'navigate' ||
        url.pathname.endsWith('.html') ||
        url.pathname === '/styles.css' ||
        (url.pathname.startsWith('/js/') && !url.pathname.startsWith('/js/vendor/'));

    if (isAppShell) {
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

    // ── Everything else: pinned vendor libs, fonts, icons ────────────────
    // Cache-first — these files only change when you bump CACHE_VERSION.
    e.respondWith(
        caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
            if (res.ok) {
                const copy = res.clone();
                caches.open(CACHE_VERSION).then(c => c.put(e.request, copy));
            }
            return res;
        }))
    );
});

