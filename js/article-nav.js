(function() {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof posts === "undefined") return;

        let current = window.location.pathname.split("/").pop();
        if (!current && window.location.pathname.includes('/blog-posts/')) {
            current = window.location.pathname.split("/").filter(Boolean).pop();
        }
        if (current && !current.endsWith(".html")) { current += ".html"; }

        const currentPost = posts.find(p => p.slug === current);
        const navContainer = document.getElementById("article-navigation");

        if (navContainer && currentPost) {
            const chronologicalPosts = [...posts].reverse();
            const blogIndex = chronologicalPosts.findIndex(p => p.slug === current);
            
            // 1. Setup Standard Blog Nav (Always visible)
            const prevBlog = blogIndex > 0 ? chronologicalPosts[blogIndex - 1] : null;
            const nextBlog = blogIndex < chronologicalPosts.length - 1 ? chronologicalPosts[blogIndex + 1] : null;

            // 2. Setup Course Nav (Only if series exists)
            let courseHTML = "";
            if (currentPost.series) {
                const seriesPosts = posts
                    .filter(p => p.series === currentPost.series)
                    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
                const sIndex = seriesPosts.findIndex(p => p.slug === current);
                
                const prevMod = sIndex > 0 ? seriesPosts[sIndex - 1] : null;
                const nextMod = sIndex < seriesPosts.length - 1 ? seriesPosts[sIndex + 1] : null;

                courseHTML = `
                    <div class="course-nav-header">
                        <i class="fa-solid fa-graduation-cap"></i> ${currentPost.series} Course
                    </div>
                    <div class="nav-visual-wrapper course-style">
                        ${renderNavCard(prevMod, "← Previous Module", "prev", true)}
                        <div class="nav-central-hub course-hub">
                            <span class="mod-count">Step ${currentPost.seriesOrder} of ${seriesPosts.length}</span>
                        </div>
                        ${renderNavCard(nextMod, "Next Module →", "next", true)}
                    </div>
                    <div class="nav-divider"><span>OR CONTINUE BROWSING ARTICLES</span></div>
                `;
            }

            // 3. Inject Combined HTML
            navContainer.innerHTML = `
                ${courseHTML}
                <div class="nav-visual-wrapper blog-style">
                    ${renderNavCard(prevBlog, "← Previous Article", "prev", false)}
                    <div class="nav-central-hub">
                        <a href="../blog.html" class="nav-link-center">Library</a>
                        <button id="share-btn" class="share-btn">Share</button>
                    </div>
                    ${renderNavCard(nextBlog, "Next Article →", "next", false)}
                </div>
            `;
            
            // Re-attach Share Event...
        }

        // 4. Enhanced Visual Card Generator
        function renderNavCard(post, label, direction, isCourse) {
            if (!post) return `<div class="nav-card-placeholder"></div>`;
            return `
                <a href="/blog-posts/${post.slug}" class="nav-card ${direction} ${isCourse ? 'course-card-nav' : 'blog-card-nav'}">
                    <div class="nav-card-label">${label}</div>
                    <h4 class="nav-card-title">${post.title}</h4>
                </a>
            `;
        }
    });
})();