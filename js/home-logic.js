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
            <div class="card">
                <div class="card-image">
                    <img src="${p.image || 'images/thumbnails/default-placeholder.jpg'}" alt="">
                </div>
                <div class="card-content">
                    <span class="card-cat">${p.category}</span>
                    <a href="blog-posts/${p.slug}"><h3>${p.title}</h3></a>
                    <p>${p.snippet}</p>
                </div>
            </div>
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
    }
})();