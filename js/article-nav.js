(function() {
    // Wait for the page to be fully loaded before running
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof posts === "undefined") return;

        // 1. Create a chronological copy
        const chronologicalPosts = [...posts].reverse();
        
        // 2. Get current filename and ensure it has .html
        let current = window.location.pathname.split("/").pop();
        if (!current && window.location.pathname.includes('/blog-posts/')) {
            // Fallback for cases where URL ends in a slash
            current = window.location.pathname.split("/").filter(Boolean).pop();
        }
        if (current && !current.endsWith(".html")) {
            current += ".html";
        }

        const index = chronologicalPosts.findIndex(p => p.slug === current);
        const navContainer = document.getElementById("article-navigation");

        if (navContainer && index !== -1) {
            // 3. Build the zones
            const prevPost = index > 0 ? chronologicalPosts[index - 1] : null;
            const nextPost = index < chronologicalPosts.length - 1 ? chronologicalPosts[index + 1] : null;

            let html = `
                <div class="nav-zone left">
                    ${prevPost ? `
                        <a href="/blog-posts/${prevPost.slug}" class="nav-button">
                            ← ${prevPost.title}
                        </a>` : ''}
                </div>

                <div class="nav-hub">
                    <a href="../blog.html" class="nav-link-center">All Articles</a>
                    <button id="share-btn" class="share-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-12-4 4-4 4 4m-4-4v12"/>
                        </svg>
                        Share
                    </button>
                </div>

                <div class="nav-zone right">
                    ${nextPost ? `
                        <a href="/blog-posts/${nextPost.slug}" class="nav-button">
                            ${nextPost.title} →
                        </a>` : ''}
                </div>
            `;

            navContainer.innerHTML = html;

            // 4. Add the Share Functionality
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', async () => {
                    // Check if the browser actually supports the Share API
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: document.title,
                                url: window.location.href
                            });
                        } catch (err) {
                            // User cancelled or share failed
                            console.log("Share failed or cancelled");
                        }
                    } else {
                        // Fallback: Copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }
                });
            }
        }
    });
})();