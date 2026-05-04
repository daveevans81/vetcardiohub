// global-head.js
(function() {
    // 1. Load Cloudflare Web Analytics (Cookie-less)

    var cfScript = document.createElement('script');
    cfScript.src = "https://static.cloudflareinsights.com/beacon.min.js";
    cfScript.setAttribute('data-cf-beacon', '{"token": "eda0a6a0d6f8492984c7311cbe3198c0"}');
    cfScript.defer = true;
    document.head.appendChild(cfScript);

    // 2. You can add other "startup" scripts here later 
    // (e.g., a theme switcher, a tiny custom tracker, etc.)
    // console.log("Global scripts loaded");
})();