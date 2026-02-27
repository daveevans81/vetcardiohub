// sidebar.js



if (typeof posts !== "undefined") {
const featured = posts.filter(p => p.featured);

const container = document.getElementById("featured-posts");

if (container) {
  container.innerHTML = `
    <section class="sidebar-card">
      <h3>Start Here</h3>
      <ul>
        ${featured.map(p =>
          `<li><a href="/${p.slug}">${p.title}</a></li>`
        ).join("")}
      </ul>
    </section>
  `;
}
}
