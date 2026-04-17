// owners.js

document.addEventListener("DOMContentLoaded", function() {
    if (typeof posts === "undefined") return;
    const hubContainer = document.getElementById("owner-hub-featured");
    if (!hubContainer) return;

    // The logic: filter by featured AND by owner audience
// Define the slugs you've already hard-coded on the page
    const permanentSlugs = ["post19.html", "post18.html"];

    const featuredPosts = posts
        .filter(p => p.featured) 
        .filter(p => p.audience === "owner" || p.audience === "both")
        // This line checks if the post slug is NOT in your permanent list
        .filter(p => !permanentSlugs.includes(p.slug)) 
        .slice(0, 4);

    if (featuredPosts.length > 0) {
        hubContainer.innerHTML = featuredPosts.map(p => `
            <a href="/blog-posts/${p.slug}" class="blog-mini-card">
                <div class="blog-mini-img">
                    <img src="${p.image || '/images/thumbnails/default-placeholder.jpg'}" alt="${p.title}">
                </div>
                <div class="blog-mini-content">
                    <span class="blog-badge">${p.category || 'Article'}</span>
                    <h3>${p.title}</h3>
                    <p>${p.snippet || 'Read our latest insights on pet heart health.'}</p>
                </div>
            </a>
        `).join("");
    } else {
        hubContainer.innerHTML = `<p style="color: #94a3b8;">New guides coming soon.</p>`;
    }
});