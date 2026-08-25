/*
 * Shared App Store CTA wiring for the VetCardioHub native apps.
 *
 * Include on any page that links to the App Store. Two jobs:
 *
 *  1. Campaign attribution. `?src=youtube` on the page URL tags the App Store
 *     link so installs show up against that campaign in App Store Connect.
 *     The value is whitelisted so a stray or hostile parameter cannot inject
 *     an arbitrary campaign name into the analytics. Each page declares its
 *     own fallback with data-default-campaign on the script tag, so /app and
 *     the homepage report separately.
 *
 *  2. Android messaging. There is no Android build, so the platform note is
 *     rewritten to point those visitors at the browser version instead.
 *
 * Two apps ship from the same developer account, so the provider token is shared
 * but the app id is not. A page states which app it is advertising with
 * data-app-id on the script tag; omitting it keeps the VCH Vitals default, so
 * pages written before EchoCalc existed continue to work untouched.
 *
 * Elements opt in by attribute, so a page carrying neither is a no-op:
 *   [data-appstore]       — anchor(s) whose href should carry the campaign
 *   [data-platform-note]  — element whose text is replaced on Android
 *
 * The site header is a shared partial advertising VCH Vitals, which is the wrong
 * app on a vet-facing page. data-banner-cta on the script tag relabels and
 * repoints it. The header arrives asynchronously via load-partials.js, so this
 * waits for it rather than assuming it is already in the DOM.
 *
 * There are TWO header CTAs at different breakpoints — .banner-cta (desktop,
 * display:none below 768px) and .header-app-cta (mobile) — so both are swapped.
 * Override the pair with data-banner-cta-selector if the header markup changes.
 *
 * Load it deferred, or at the end of <body>, so those elements already exist.
 * The href in the markup is the un-tagged fallback and works without JS.
 */
(function () {
    var DEFAULT_APP_ID = '6791313344';   // VCH Vitals
    var PROVIDER_TOKEN  = '129166263';   // shared across the developer account

    // Incoming ?src values we accept. 'home' and 'app-page' double as the
    // per-page defaults, so an explicit ?src=home is valid too.
    var ALLOWED = [
        'youtube', 'clinic', 'email', 'social',
        'qr', 'instagram', 'links', 'home', 'app-page',
        'echocalc-web', 'echo-app', 'vets', 'conference'
    ];

    // document.currentScript is the script element during execution of a
    // classic script, deferred ones included. The query is a belt-and-braces
    // fallback in case this ever gets loaded as a module.
    var tag = document.currentScript ||
              document.querySelector('script[data-default-campaign]');
    var fallback = (tag && tag.getAttribute('data-default-campaign')) || 'web';
    var appId    = (tag && tag.getAttribute('data-app-id')) || DEFAULT_APP_ID;

    var src = new URLSearchParams(location.search).get('src');
    var campaign = ALLOWED.indexOf(src) !== -1 ? src : fallback;

    var url = 'https://apps.apple.com/app/apple-store/id' + appId +
              '?pt=' + PROVIDER_TOKEN +
              '&ct=' + encodeURIComponent(campaign) +
              '&mt=8';

    document.querySelectorAll('[data-appstore]').forEach(function (a) {
        a.href = url;
    });

    // Repoint the shared header CTA, if this page asked for it.
    var bannerLabel = tag && tag.getAttribute('data-banner-cta');
    if (bannerLabel) {
        var bannerIcon = (tag && tag.getAttribute('data-banner-cta-icon')) || '';

        var selector = (tag && tag.getAttribute('data-banner-cta-selector')) ||
                       '.banner-cta, .header-app-cta';

        var swapBannerCta = function () {
            var els = document.querySelectorAll(selector);
            if (!els.length) return false;
            els.forEach(function (el) {
                el.href = url;
                el.setAttribute('title', bannerLabel);
                // Rebuild the contents so the icon survives, with its class optionally changed.
                var icon = el.querySelector('i');
                el.textContent = '';
                if (icon) {
                    if (bannerIcon) icon.className = bannerIcon;
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' '));
                }
                el.appendChild(document.createTextNode(bannerLabel));
            });
            return true;
        };

        if (!swapBannerCta()) {
            // The header partial is fetched, so watch for it instead of polling.
            var observer = new MutationObserver(function () {
                if (swapBannerCta()) observer.disconnect();
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
            // Give up rather than observe forever if the partial never arrives.
            setTimeout(function () { observer.disconnect(); }, 10000);
        }
    }

    // No Android build for either app. Where a page provides a platform note,
    // point those visitors at the browser version rather than a dead end.
    if (/Android/.test(navigator.userAgent)) {
        var note = document.querySelector('[data-platform-note]');
        if (note) {
            note.textContent = 'There is no Android app yet — use the browser ' +
                'version, then use your browser menu to add it to your home screen.';
        }
    }
})();
