// sidebar.js
if (typeof posts !== "undefined") {
  const featured = posts.filter(p => p.featured);
  const container = document.getElementById("featured-posts");

  if (container) {
    container.innerHTML = `
      <section class="sidebar-card">
        <div class="sidebar-badge">Must Read</div>
        <h3>Start Here</h3>
        <ul>
          ${featured.map(p =>
            // Fixed the URL path here
            `<li>
              <a href="/blog-posts/${p.slug}">
                <span class="link-text">${p.title}</span>
                <span class="arrow">→</span>
              </a>
            </li>`
          ).join("")}
        </ul>
      </section>
    `;
  }
}