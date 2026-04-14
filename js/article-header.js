// js/article-header.js
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeof posts === "undefined") return;

        const path = window.location.pathname.split("/").pop() || "index.html";
        const post = posts.find(p => p.slug === path || p.slug === path + ".html");

        const header = document.querySelector("header");
        if (!header || !post) return;

header.innerHTML = `
    <div class="header-meta-top">
        <span class="header-cat">${post.category}</span>
        <span class="header-read-time"><i class="fa-regular fa-clock"></i> ${post.readTime || '5 min read'}</span>
    </div>
    
    <h1>${post.title}</h1>
    ${post.subtitle ? `<p class="subtitle"><strong>${post.subtitle}</strong></p>` : ''}

    <div class="header-auth-block">
        <div class="author-info">
            <p class="author">
                <strong>Author:</strong> 
                <a href="${post.authorLink || '../about.html#daveevans'}">
                    ${post.author || 'Dave Evans'} 
                    <span class="qualifications">${post.authorRole || 'MA VetMB PgC(SADI) PgC(SAC) MRCVS'}</span>
                </a>
            </p>
        </div>
        <div class="date-block">
            <p class="published"><strong>Published:</strong> ${post.date}</p>
            <p class="published"><strong>Reviewed:</strong> ${post.reviewed || post.date}</p>
        </div>
    </div>
`;
}); // End of DOMContentLoaded listener
})();