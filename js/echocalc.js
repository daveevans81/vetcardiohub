document.addEventListener("DOMContentLoaded", function() {
    const isDismissed = sessionStorage.getItem('nudgeDismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    // 1. Detect if it's an iPhone/iPad
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    
    // 2. Check if it's specifically Safari (Chrome/other iOS browsers will fail this)
    const isSafari = isiOS && 
                     navigator.userAgent.includes("Safari") && 
                     !navigator.userAgent.includes("CriOS") && 
                     !navigator.userAgent.includes("FxiOS");

    // 3. Logic for Android (which supports A2HS in Chrome)
    const isAndroidChrome = /Android/i.test(navigator.userAgent) && navigator.userAgent.includes("Chrome");

    // Show only if it's Safari (iOS) or Chrome (Android), and not already installed/dismissed
    if ((isSafari || isAndroidChrome) && !isStandalone && !isDismissed) {
        const nudge = document.getElementById('install-nudge');
        if (nudge) nudge.style.display = 'flex';
    }
});

function dismissNudge() {
    const nudge = document.getElementById('install-nudge');
    if (nudge) {
        nudge.style.display = 'none';
        sessionStorage.setItem('nudgeDismissed', 'true');
    }
}

function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
}