// /js/blog-feed.js
(function() {
  const feedContainer = document.getElementById("blog-list");
  const searchInput = document.getElementById("blog-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

// --- NEW: Calculate Counts ---
  const counts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, { all: 0 });

  // Update the button text to show counts
  filterButtons.forEach(btn => {
    const cat = btn.getAttribute("data-category");
    const count = counts[cat] || 0;
    
    // This looks for a span inside the button, or creates one
    btn.innerHTML = `${cat.charAt(0).toUpperCase() + cat.slice(1)} <span class="count">${count}</span>`;
  });

  function renderPosts(postsToDisplay) {
    if (!feedContainer) return;

    if (postsToDisplay.length === 0) {
      feedContainer.innerHTML = `<p class="no-results">No articles found matching your search.</p>`;
      return;
    }

feedContainer.innerHTML = postsToDisplay.map(post => {
  // Logic to handle "both" by showing two badges
  let audienceHtml = '';
  if (post.audience === 'both') {
    audienceHtml = `
      <span class="badge audience-tag owner">OWNER</span>
      <span class="badge audience-tag vet">VET</span>`;
  } else {
    audienceHtml = `<span class="badge audience-tag ${post.audience}">${post.audience.toUpperCase()}</span>`;
  }

  return `
    <li class="${post.featured ? 'featured-item-highlight' : ''}">
      <div class="meta">
        ${post.featured ? '<span class="badge featured-badge">★ Featured</span>' : ''}
        ${audienceHtml}
        <span class="badge date-badge">${post.date}</span>
      </div>
      
      <a href="blog-posts/${post.slug}" class="post-title">${post.title}</a>
      
      <p class="snippet">${post.snippet}</p>
      
      <div class="topic-footer">
        <span class="category-label">Category:</span>
        <span class="category-tag">${post.category}</span>
      </div>
    </li>
  `;
}).join("");
  }

  // Initial Render
  renderPosts(posts);

  // Live Search Logic
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = posts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.snippet.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
      renderPosts(filtered);
    });
  }

  // Category Filtering Logic
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      
      // Update active button UI
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (category === "all") {
        renderPosts(posts);
      } else {
        const filtered = posts.filter(p => p.category === category);
        renderPosts(filtered);
      }
    });
  });
})();
