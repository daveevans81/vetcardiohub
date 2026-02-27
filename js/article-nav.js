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
        let html = `<div class="article-navigation-wrapper">`;

        // Previous Link
        if (index > 0) {
            html += `
                <a href="/blog-posts/${chronologicalPosts[index-1].slug}" class="nav-button">
                    ← ${chronologicalPosts[index-1].title}
                </a>`;
        } else {
            // If there's no previous post, show "Back to Blog" on the left
            html += `<a href="../blog.html" class="nav-button">← Back to Blog</a>`;
        }

        // Optional: Always show a "Back to List" in the middle for consistency
        if (index > 0) {
            html += `<a href="../blog.html" class="nav-button">All Articles</a>`;
        }

        // Next Link
        if (index < chronologicalPosts.length - 1) {
            html += `
                <a href="/blog-posts/${chronologicalPosts[index+1].slug}" class="nav-button">
                    ${chronologicalPosts[index+1].title} →
                </a>`;
        }

        html += `</div>`;
        navContainer.innerHTML = html;
    }
})();