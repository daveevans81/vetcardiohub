(function() {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof posts === "undefined") return;

        // 1. Logic: Same as before to ensure chronological order and slug matching
        const chronologicalPosts = [...posts].reverse();
        
        let current = window.location.pathname.split("/").pop();
        if (!current && window.location.pathname.includes('/blog-posts/')) {
            current = window.location.pathname.split("/").filter(Boolean).pop();
        }
        if (current && !current.endsWith(".html")) {
            current += ".html";
        }

        const index = chronologicalPosts.findIndex(p => p.slug === current);
        const navContainer = document.getElementById("article-navigation");

        if (navContainer && index !== -1) {
            const prevPost = index > 0 ? chronologicalPosts[index - 1] : null;
            const nextPost = index < chronologicalPosts.length - 1 ? chronologicalPosts[index + 1] : null;

            // 2. The NEW Visual Card Generator
            const renderNavCard = (post, label, direction) => {
                if (!post) return `<div class="nav-card-placeholder"></div>`;
                
                return `
                    <a href="/blog-posts/${post.slug}" class="nav-card ${direction}">
                        <div class="nav-card-label">${label}</div>
                        <div class="nav-card-body">
                            <img src="${post.image || '/images/thumbnails/default-placeholder.jpg'}" class="nav-card-thumb" alt="">
                            <div class="nav-card-info">
                                <h4 class="nav-card-title">${post.title}</h4>
                                <p class="nav-card-snippet">${post.snippet ? post.snippet.substring(0, 65) + '...' : ''}</p>
                            </div>
                        </div>
                    </a>
                `;
            };

            // 3. Updated HTML Structure
            navContainer.innerHTML = `
                <div class="nav-visual-wrapper">
                    ${renderNavCard(prevPost, "← Previous Article", "prev")}
                    
                    <div class="nav-central-hub">
                        <a href="../blog.html" class="nav-link-center">All Articles</a>
                        <button id="share-btn" class="share-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-12-4 4-4 4 4m-4-4v12"/>
                            </svg>
                            Share
                        </button>
                    </div>

                    ${renderNavCard(nextPost, "Next Article →", "next")}
                </div>
            `;

            // 4. Keep your Share API logic exactly as it was
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', async () => {
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: document.title,
                                url: window.location.href
                            });
                        } catch (err) { console.log("Share failed"); }
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }
                });
            }
        }
    });
})();