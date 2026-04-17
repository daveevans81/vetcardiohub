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
            
            // --- Helper: The Original Visual Card Generator ---
            const renderNavCard = (post, label, direction, isCourse) => {
                if (!post) return `<div class="nav-card-placeholder"></div>`;
                const cardClass = isCourse ? 'course-card-nav' : 'blog-card-nav';
                
                return `
                    <a href="/blog-posts/${post.slug}" class="nav-card ${direction} ${cardClass}">
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

            // --- 2. Logic: Course Navigation ---
            let courseHTML = "";
            if (currentPost.series) {
                const seriesPosts = posts
                    .filter(p => p.series === currentPost.series)
                    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
                
                const sIndex = seriesPosts.findIndex(p => p.slug === current);
                const prevMod = sIndex > 0 ? seriesPosts[sIndex - 1] : null;
                const nextMod = sIndex < seriesPosts.length - 1 ? seriesPosts[sIndex + 1] : null;

                courseHTML = `
                    <div class="course-nav-header"><i class="fa-solid fa-graduation-cap"></i> ${currentPost.series} Course</div>
                    <div class="nav-visual-wrapper">
                        ${renderNavCard(prevMod, "← Previous Module", "prev", true)}
                        <div class="nav-central-hub"><span class="mod-count">Step ${currentPost.seriesOrder} of ${seriesPosts.length}</span></div>
                        ${renderNavCard(nextMod, "Next Module →", "next", true)}
                    </div>
                    <div class="nav-divider"><span>OR CONTINUE BROWSING ALL ARTICLES</span></div>
                `;
            }

            // --- 3. Logic: Standard Blog Navigation ---
            const chronologicalPosts = [...posts].reverse();
            const blogIndex = chronologicalPosts.findIndex(p => p.slug === current);
            const prevBlog = blogIndex > 0 ? chronologicalPosts[blogIndex - 1] : null;
            const nextBlog = blogIndex < chronologicalPosts.length - 1 ? chronologicalPosts[blogIndex + 1] : null;

            // --- 4. Inject HTML (Separate wrappers ensure they stack vertically) ---
            navContainer.innerHTML = `
                ${courseHTML}
                <div class="nav-visual-wrapper">
                    ${renderNavCard(prevBlog, "← Previous Article", "prev", false)}
                    <div class="nav-central-hub">
                        <a href="../blog.html" class="nav-link-center">All Articles</a>
                        <button id="share-btn" class="share-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-12-4 4-4 4 4m-4-4v12"/>
                            </svg> Share
                        </button>
                    </div>
                    ${renderNavCard(nextBlog, "Next Article →", "next", false)}
                </div>
            `;

            // --- 5. Share Logic ---
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', async () => {
                    if (navigator.share) {
                        try { await navigator.share({ title: document.title, url: window.location.href }); } 
                        catch (err) { console.log("Share failed"); }
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }
                });
            }
        }
    });
})();