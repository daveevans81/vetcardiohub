// js/home-logic.js
(function() {
    if (typeof posts === "undefined") return;

    const cardContainer = document.getElementById("featured-cards-container");
    const homeSearch = document.getElementById("home-search");
    const searchResults = document.getElementById("home-search-results");

    // 1. Render Top 3 Featured Posts
    const featuredPosts = posts.filter(p => p.featured).slice(0, 3);

    if (cardContainer) {
cardContainer.innerHTML = featuredPosts.map(p => `
    <article class="bp-card">
        <div class="bp-card-thumb">
            <img src="${p.image || 'images/thumbnails/default-placeholder.jpg'}" alt="${p.title}">
        </div>
        <div class="bp-card-body">
            <div class="bp-card-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="bp-card-category">${p.category}</span>
                <span class="bp-card-readtime" style="font-size: 10px; color: #94a3b8; font-weight: 600;">
                    <i class="fa-regular fa-clock"></i> ${p.readTime || '5 min'}
                </span>
            </div>
            <a href="blog-posts/${p.slug}" class="bp-card-link">
                <h3 class="bp-card-title">${p.title}</h3>
            </a>
            <p class="bp-card-snippet">${p.snippet}</p>
        </div>
    </article>
`).join('');
    }

    // 2. Home Search Logic (Instant Overlay)
    if (homeSearch) {
        homeSearch.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            if (term.length < 2) {
                searchResults.style.display = "none";
                return;
            }

            const matches = posts.filter(p => 
                p.title.toLowerCase().includes(term) || 
                p.category.toLowerCase().includes(term)
            ).slice(0, 5);

            if (matches.length > 0) {
                searchResults.style.display = "block";
                searchResults.innerHTML = matches.map(p => `
                    <a href="blog-posts/${p.slug}" class="search-result-item">
                        <span class="res-title">${p.title}</span>
                        <span class="res-cat">${p.category}</span>
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = `<div class="search-no-results">No articles found.</div>`;
            }
        });

        // Hide results when clicking outside
        document.addEventListener("click", (e) => {
            if (!homeSearch.contains(e.target)) searchResults.style.display = "none";
        });

const trendingTags = document.querySelectorAll(".trend-tag");

trendingTags.forEach(tag => {
    tag.addEventListener("click", () => {
        const term = tag.getAttribute("data-term");
        
        // 1. Fill the search bar
        homeSearch.value = term;
        
        // 2. Manually trigger the 'input' event to show results
        homeSearch.dispatchEvent(new Event('input'));
        
        // 3. Focus the search bar for the user
        homeSearch.focus();
        });
    });

    }
})();