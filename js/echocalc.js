document.addEventListener("DOMContentLoaded", function() {
    const isDismissed = sessionStorage.getItem('nudgeDismissed');
    
    // 1. Is it an Apple device?
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    
    // 2. Is it specifically the Safari Browser? 
    // Chrome on iOS (CriOS) does not support 'standalone' in its navigator object properties the same way.
    // Also, Safari is the only one where 'ApplePaySession' exists usually.
    const isSafari = isiOS && /Safari/i.test(navigator.userAgent) && !/CriOS/i.test(navigator.userAgent) && !/EdgiOS/i.test(navigator.userAgent);

    // 3. Is it Android Chrome?
    const isAndroidChrome = /Android/i.test(navigator.userAgent) && /Chrome/i.test(navigator.userAgent);

    // 4. Are we already in app mode?
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    // DEBUG: Uncomment the line below if you want to see what your phone is reporting
     console.log("iOS:", isiOS, "Safari:", isSafari, "Standalone:", isStandalone);

    if ((isSafari || isAndroidChrome) && !isStandalone && !isDismissed) {
        const nudge = document.getElementById('install-nudge');
        if (nudge) nudge.style.display = 'flex';
    }
});