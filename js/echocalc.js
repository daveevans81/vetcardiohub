document.addEventListener("DOMContentLoaded", function() {

// Only show if on mobile and not already in 'standalone' (app) mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile && !isStandalone) {
    document.getElementById('install-nudge').style.display = 'flex';
}

function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) and select 'Install app' or 'Add to Home Screen'.");
    }
}
});