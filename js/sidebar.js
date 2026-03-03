// sidebar.js
(function() {
  if (typeof posts === "undefined") return;

  const container = document.getElementById("featured-posts");
  if (!container) return;


  // 1. Get the current filename (e.g., "post18.html")
let currentSlug = window.location.pathname.split("/").pop();

// Handle cases where the URL might end in a slash or be empty
if (!currentSlug || currentSlug === "") {
    currentSlug = "index.html"; 
}

// 2. Find the post in your data
const currentPost = posts.find(p => p.slug === currentSlug);

// DEBUG LOG: Open your browser console (F12) to see if this is working
console.log("Current Filename:", currentSlug);
console.log("Found Post Data:", currentPost);

// 3. Filter for Related (Same category, but NOT the current post)
let relatedPosts = [];
if (currentPost) {
    relatedPosts = posts.filter(p => 
        p.category === currentPost.category && 
        p.slug !== currentPost.slug
    ).slice(0, 3);
}


  // 2. Inject HTML Structure
  container.innerHTML = `
    <section class="sidebar-card">
      <div class="sidebar-badge">Resource Hub</div>
      
      <div class="search-container">
        <input type="text" id="sidebar-search" placeholder="Search heart topics..." />
        <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <h3 id="sidebar-title" class="sidebar-subheading">Must Read Articles</h3>
      <ul id="sidebar-list" class="sidebar-link-list"></ul>

      <div id="sidebar-related-container" style="${relatedPosts.length > 0 ? 'display:block' : 'display:none'}">
        <h3 class="sidebar-subheading related-divider">Related in ${currentPost?.category || ''}</h3>
        <ul id="sidebar-related-list" class="sidebar-thumb-list"></ul>
      </div>
    </section>
  `;

  const sidebarList = document.getElementById('sidebar-list');
  const sidebarTitle = document.getElementById('sidebar-title');
  const searchInput = document.getElementById('sidebar-search');
  const relatedContainer = document.getElementById('sidebar-related-container');
  const sidebarRelatedList = document.getElementById('sidebar-related-list');

  // 3. Render Functions
  const renderMainList = (postsToDisplay, term = "") => {
    sidebarList.innerHTML = postsToDisplay.map(p => {
      let title = p.title;
      if (term) {
        const regex = new RegExp(`(${term})`, 'gi');
        title = title.replace(regex, `<mark class="highlight">$1</mark>`);
      }
      return `
        <li class="featured-item">
          <a href="/blog-posts/${p.slug}">
            <span class="link-text">${title}</span>
            <span class="arrow">→</span>
          </a>
        </li>`;
    }).join("");
  };

  const renderRelatedList = () => {
    if (relatedPosts.length === 0) return;
    sidebarRelatedList.innerHTML = relatedPosts.map(p => `
      <li>
        <a href="/blog-posts/${p.slug}" class="related-sidebar-item">
          <img src="${p.image || '/images/thumbnails/default-placeholder.jpg'}" alt="">
          <div class="related-sidebar-info">
            <h4>${p.title}</h4>
            <span class="related-sidebar-cat">${p.category}</span>
          </div>
        </a>
      </li>
    `).join("");
  };

  // 4. Initial Execution
  renderMainList(featured);
  renderRelatedList();

  // 5. Search Event Listener
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    
    if (term === "") {
      sidebarTitle.innerText = "Must Read Articles";
      renderMainList(featured);
      if (relatedPosts.length > 0) relatedContainer.style.display = "block";
    } else {
      sidebarTitle.innerText = "Search Results";
      relatedContainer.style.display = "none"; // Hide related while searching
      
      const matches = posts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
      ).slice(0, 6);
      
      if (matches.length > 0) {
        renderMainList(matches, term);
      } else {
        sidebarList.innerHTML = `<li class="no-results">No matches found...</li>`;
      }
    }
  });
})();