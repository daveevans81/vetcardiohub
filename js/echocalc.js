document.addEventListener("DOMContentLoaded", function() {
    // Check if the user has previously dismissed the nudge this session
    const isDismissed = sessionStorage.getItem('nudgeDismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && !isStandalone && !isDismissed) {
        const nudge = document.getElementById('install-nudge');
        if (nudge) nudge.style.display = 'flex';
    }
});

// MOVE THESE OUTSIDE so the HTML buttons can find them
function showInstructions() {
    const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (isiOS) {
        alert("To save: Tap the 'Share' icon (square with arrow) at the bottom of Safari and select 'Add to Home Screen'.");
    } else {
        alert("To save: Tap the three dots (⋮) in Chrome and select 'Install app' or 'Add to Home Screen'.");
    }
}

function dismissNudge() {
    document.getElementById('install-nudge').style.display = 'none';
    // Optional: Keep it hidden for the rest of the session so it's not annoying
    sessionStorage.setItem('nudgeDismissed', 'true');
}