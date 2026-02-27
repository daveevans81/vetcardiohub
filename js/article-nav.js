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

        <a href="../blog.html" class="nav-link-center">All Articles</a>

        <div class="nav-zone right">
            ${index < chronologicalPosts.length - 1 ? `
                <a href="/blog-posts/${chronologicalPosts[index+1].slug}" class="nav-button">
                    ${chronologicalPosts[index+1].title} →
                </a>` : ''}
        </div>
    `;
    navContainer.innerHTML = html;
}
})();