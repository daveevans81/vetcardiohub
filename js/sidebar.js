// sidebar.js
if (typeof posts !== "undefined") {
  const featured = posts.filter(p => p.featured);
  const container = document.getElementById("featured-posts");

  if (container) {
    container.innerHTML = `
      <section class="sidebar-card">
        <div class="sidebar-badge">Resource Hub</div>
        <h3 id="sidebar-title">Must Read Articles:</h3>
        
        <div class="search-container">
          <input type="text" id="sidebar-search" placeholder="Search heart topics..." />
          <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <ul id="sidebar-list"></ul>
      </section>
    `;

    const sidebarList = document.getElementById('sidebar-list');
    const sidebarTitle = document.getElementById('sidebar-title');
    const searchInput = document.getElementById('sidebar-search');

    // Function to render list with optional highlighting
    const renderList = (postsToDisplay, term = "") => {
      sidebarList.innerHTML = postsToDisplay.map(p => {
        let displayTitle = p.title;
        
        // If there's a search term, highlight it
        if (term) {
          const regex = new RegExp(`(${term})`, 'gi');
          displayTitle = p.title.replace(regex, `<mark class="highlight">$1</mark>`);
        }

        return `
          <li class="featured-item">
            <a href="/blog-posts/${p.slug}">
              <span class="link-text">${displayTitle}</span>
              <span class="arrow">→</span>
            </a>
          </li>
        `;
      }).join("");
    };

    renderList(featured);

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      
      if (term === "") {
        sidebarTitle.innerText = "Start Here";
        renderList(featured);
      } else {
        sidebarTitle.innerText = "Search Results";
        const matches = posts.filter(p => 
          p.title.toLowerCase().includes(term)
        ).slice(0, 8);
        
        if (matches.length > 0) {
          renderList(matches, term);
        } else {
          sidebarList.innerHTML = `<li style="padding: 12px; color: #64748b; font-size: 14px;">No results found...</li>`;
        }
      }
    });
  }
}