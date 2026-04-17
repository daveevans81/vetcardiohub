(function() {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof posts === "undefined") return;

        // 1. Identify Current Post
        let current = window.location.pathname.split("/").pop();
        if (!current && window.location.pathname.includes('/blog-posts/')) {
            current = window.location.pathname.split("/").filter(Boolean).pop();
        }
        if (current && !current.endsWith(".html")) { current += ".html"; }

        const currentPost = posts.find(p => p.slug === current);
        const navContainer = document.getElementById("article-navigation");

        if (navContainer && currentPost) {
            let prevPost, nextPost, prevLabel, nextLabel;

            // 2. COURSE LOGIC: If the post is part of a series
            if (currentPost.series) {
                const seriesPosts = posts
                    .filter(p => p.series === currentPost.series)
                    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

                const seriesIndex = seriesPosts.findIndex(p => p.slug === current);
                
                prevPost = seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : null;
                nextPost = seriesIndex < seriesPosts.length - 1 ? seriesPosts[seriesIndex + 1] : null;
                
                prevLabel = "← Previous Module";
                nextLabel = "Next Module →";
            } 
            // 3. BLOG LOGIC: Fallback to chronological if not in a series
            else {
                const chronologicalPosts = [...posts].reverse();
                const blogIndex = chronologicalPosts.findIndex(p => p.slug === current);
                
                prevPost = blogIndex > 0 ? chronologicalPosts[blogIndex - 1] : null;
                nextPost = blogIndex < chronologicalPosts.length - 1 ? chronologicalPosts[blogIndex + 1] : null;
                
                prevLabel = "← Previous Article";
                nextLabel = "Next Article →";
            }

            // 4. Visual Card Generator (Unchanged logic, uses our new dynamic labels)
            const renderNavCard = (post, label, direction) => {
                if (!post) return `<div class="nav-card-placeholder"></div>`;
                return `
                    <a href="/blog-posts/${post.slug}" class="nav-card ${direction}">
                        <div class="nav-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div class="nav-card-label" style="margin:0;">${label}</div>
                            <span class="nav-read-time" style="font-size: 10px; color: #94a3b8; font-weight: 600;">${post.readTime || '5 min read'}</span>
                        </div>
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

            // 5. Inject HTML
            navContainer.innerHTML = `
                <div class="nav-visual-wrapper">
                    ${renderNavCard(prevPost, prevLabel, "prev")}
                    
                    <div class="nav-central-hub">
                        <a href="../blog.html" class="nav-link-center">All Articles</a>
                        <button id="share-btn" class="share-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-12-4 4-4 4 4m-4-4v12"/>
                            </svg>
                            Share
                        </button>
                    </div>

                    ${renderNavCard(nextPost, nextLabel, "next")}
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