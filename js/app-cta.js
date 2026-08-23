/*
 * Shared App Store CTA wiring for the VCH Vitals native app.
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
 * Elements opt in by attribute, so a page carrying neither is a no-op:
 *   [data-appstore]       — anchor(s) whose href should carry the campaign
 *   [data-platform-note]  — element whose text is replaced on Android
 *
 * Load it deferred, or at the end of <body>, so those elements already exist.
 * The href in the markup is the un-tagged fallback and works without JS.
 */
(function () {
    var APP_ID = '6791313344';
    var PROVIDER_TOKEN = '129166263';

    // Incoming ?src values we accept. 'home' and 'app-page' double as the
    // per-page defaults, so an explicit ?src=home is valid too.
    var ALLOWED = [
        'youtube', 'clinic', 'email', 'social',
        'qr', 'instagram', 'home', 'app-page'
    ];

    // document.currentScript is the script element during execution of a
    // classic script, deferred ones included. The query is a belt-and-braces
    // fallback in case this ever gets loaded as a module.
    var tag = document.currentScript ||
              document.querySelector('script[data-default-campaign]');
    var fallback = (tag && tag.getAttribute('data-default-campaign')) || 'web';

    var src = new URLSearchParams(location.search).get('src');
    var campaign = ALLOWED.indexOf(src) !== -1 ? src : fallback;

    var url = 'https://apps.apple.com/app/apple-store/id' + APP_ID +
              '?pt=' + PROVIDER_TOKEN +
              '&ct=' + encodeURIComponent(campaign) +
              '&mt=8';

    document.querySelectorAll('[data-appstore]').forEach(function (a) {
        a.href = url;
    });

    // No Android build yet. The browser version adds to the home screen and
    // counts breaths offline, so send them there rather than to a dead end.
    if (/Android/.test(navigator.userAgent)) {
        var note = document.querySelector('[data-platform-note]');
        if (note) {
            note.textContent = 'There is no Android app yet — use the browser ' +
                'version, then use your browser menu to add it to your home screen.';
        }
    }
})();
