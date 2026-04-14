// sidebar.js
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    // 1. Safety Check
    if (typeof posts === "undefined") {
      console.error("Sidebar Error: 'posts' data not found.");
      return;
    }

    const container = document.getElementById("featured-posts");
    if (!container) return;

    // 2. Data Preparation
    const featured = posts.filter(p => p.featured);
    const pathParts = window.location.pathname.split("/");
    const currentFileName = pathParts[pathParts.length - 1] || "index.html";
    const cleanSlug = currentFileName.replace(".html", "");
    
    const currentPost = posts.find(p => p.slug.replace(".html", "") === cleanSlug);

    let relatedPosts = [];
    if (currentPost && currentPost.category) {
      relatedPosts = posts.filter(p => 
        p.category === currentPost.category && 
        p.slug !== currentPost.slug
      ).slice(0, 3);
    }

    // 3. Inject HTML Structure
    container.innerHTML = `
      <section class="sidebar-card">
        <div class="sidebar-badge">Resource Hub</div>
        <div class="search-container">
          <input type="text" id="sidebar-search" placeholder="Search heart topics..." />
          <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <h3 id="sidebar-title" class="sidebar-subheading">Must Read Articles</h3>
        <ul id="sidebar-list"></ul>
        <div id="sidebar-related-container" style="display: ${relatedPosts.length > 0 ? 'block' : 'none'};">
          <h3 class="sidebar-subheading related-divider">Related in ${currentPost?.category || ''}</h3>
          <ul id="sidebar-related-list" class="sidebar-thumb-list"></ul>
        </div>
      </section>
    `;

    // 4. UI References
    const sidebarList = document.getElementById('sidebar-list');
    const sidebarTitle = document.getElementById('sidebar-title');
    const searchInput = document.getElementById('sidebar-search');
    const relatedContainer = document.getElementById('sidebar-related-container');
    const sidebarRelatedList = document.getElementById('sidebar-related-list');

    // 5. Render Functions
    const renderMainList = (postsToDisplay, term = "") => {
      if (!sidebarList) return;
      sidebarList.innerHTML = postsToDisplay.map(p => {
        let title = p.title;
        let category = p.category || 'Article';
        if (term) {
          const regex = new RegExp(`(${term})`, 'gi');
          title = title.replace(regex, `<mark class="highlight">$1</mark>`);
          category = category.replace(regex, `<mark class="highlight">$1</mark>`);
        }
        const thumb = p.image || '/images/thumbnails/default-placeholder.jpg';
return `
  <li class="sidebar-main-item">
    <a href="/blog-posts/${p.slug}" class="sidebar-item-link">
      <div class="sidebar-item-thumb"><img src="${thumb}" alt=""></div>
      <div class="sidebar-item-info">
        <h4 class="sidebar-item-title">${title}</h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="sidebar-item-cat">${category}</span>
            <span style="font-size: 9px; color: #94a3b8;">${p.readTime || '5m'}</span>
        </div>
      </div>
    </a>
  </li>`;
      }).join("");
    };

    // 6. Initial Execution
    renderMainList(featured);

    if (relatedPosts.length > 0 && sidebarRelatedList) {
      sidebarRelatedList.innerHTML = relatedPosts.map(p => `
        <li>
          <a href="/blog-posts/${p.slug}" class="related-sidebar-item">
            <img src="${p.image || '/images/thumbnails/default-placeholder.jpg'}" alt="">
            <div class="related-sidebar-info">
              <h4>${p.title}</h4>
              <span class="related-sidebar-cat">${p.category}</span>
            </div>
          </a>
        </li>`).join("");
    }

    // 7. Search Listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        if (term === "") {
          sidebarTitle.innerText = "Must Read Articles";
          renderMainList(featured);
          if (relatedPosts.length > 0) relatedContainer.style.display = "block";
        } else {
          sidebarTitle.innerText = "Search Results";
          relatedContainer.style.display = "none"; 
          const matches = posts.filter(p => {
            const inTitle = p.title.toLowerCase().includes(term);
            const inCat = (p.category || "").toLowerCase().includes(term);
            return inTitle || inCat;
          }).slice(0, 6);
          
          if (matches.length > 0) {
            renderMainList(matches, term);
          } else {
            sidebarList.innerHTML = `<li class="no-results">No matches for "${term}"</li>`;
          }
        }
      });
    }
  }); // End of DOMContentLoaded
})(); // End of Anonymous Function