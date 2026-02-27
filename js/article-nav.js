// /js/article-nav.js
(function() {
    if (typeof posts === "undefined") return;

    // Create a chronological copy
    const chronologicalPosts = [...posts].reverse();
    
    // Get current filename
    let current = window.location.pathname.split("/").pop();
    if (!current.endsWith(".html")) {
        current += ".html";
    }

 const index = chronologicalPosts.findIndex(p => p.slug === current);
const navContainer = document.getElementById("article-navigation");

if (navContainer && index !== -1) {
 let html = `
    <div class="nav-zone left">
        ${index > 0 ? `
            <a href="/blog-posts/${chronologicalPosts[index-1].slug}" class="nav-button">
                ← ${chronologicalPosts[index-1].title}
            </a>` : ''}
    </div>

    <div class="nav-hub">
        <a href="../blog.html" class="nav-link-center">All Articles</a>
        <button id="share-btn" class="share-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-12-4 4-4 4 4m-4-4v12"/></svg>
            Share
        </button>
    </div>

    <div class="nav-zone right">
        ${index < chronologicalPosts.length - 1 ? `
            <a href="/blog-posts/${chronologicalPosts[index+1].slug}" class="nav-button">
                ${chronologicalPosts[index+1].title} →
            </a>` : ''}
    </div>
`;

navContainer.innerHTML = html;

// Add the Share Functionality
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: document.title,
                url: window.location.href
            });
        } catch (err) {
            // Fallback for browsers that don't support Web Share
            alert("Copy this link to share: " + window.location.href);
        }
    });
}
})();