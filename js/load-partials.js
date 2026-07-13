async function loadPartial(id, url) {
    const element = document.getElementById(id);
    
    // Safety check: If the ID doesn't exist on this specific page, just skip it and move on.
    if (!element) return; 

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error(`Failed to load partial: ${url}`, error);
    }
}

// Load your standard layout
loadPartial("site-header", "/partials/header.html");
loadPartial("site-footer", "/partials/footer.html");

// Load the glossary (will safely do nothing if 'glossary-container' isn't on the page)
loadPartial("glossary-container", "/partials/glossary.html");

loadPartial("terms-content",   "/partials/partials-terms.html");
loadPartial("privacy-content", "/partials/partials-privacy.html");
