(function() {
  const feedContainer = document.getElementById("blog-list");
  const searchInput = document.getElementById("blog-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // --- Calculate Counts ---
  const counts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, { all: 0 });

  filterButtons.forEach(btn => {
    const cat = btn.getAttribute("data-category");
    const count = counts[cat] || 0;
    btn.innerHTML = `${cat.charAt(0).toUpperCase() + cat.slice(1)} <span class="count">${count}</span>`;
  });

  function renderPosts(postsToDisplay) {
    if (!feedContainer) return;

    // --- 1. THE COURSE DASHBOARD SECTION ---
    // We filter from the original 'posts' so they are always available at the top
    const coursePosts = posts.filter(p => p.category.toLowerCase() === 'courses');
    
    let courseDashboardHtml = '';
    if (coursePosts.length > 0) {
        courseDashboardHtml = `
            <div class="course-dashboard">
                <h3 class="dashboard-title">Active Courses</h3>
                <div class="course-grid">
                    ${coursePosts.map(course => `
                        <a href="blog-posts/${course.slug}" class="course-launch-card">
                            <span class="course-tag">COURSE</span>
                            <span class="course-name">${course.title}</span>
                            <span class="course-action">Start Lesson 1 →</span>
                        </a>
                    `).join('')}
                </div>
                <hr class="dashboard-divider">
            </div>
        `;
    }

    // --- 2. HANDLE NO RESULTS ---
    if (postsToDisplay.length === 0) {
      feedContainer.innerHTML = courseDashboardHtml + `<p class="no-results">No articles found matching your search.</p>`;
      return;
    }

    const defaultImage = "/images/thumbnails/default-placeholder.jpg";

    // --- 3. RENDER FULL LIST (Dashboard + Articles) ---
    // Note how we combine courseDashboardHtml with the mapped postsToDisplay
    feedContainer.innerHTML = courseDashboardHtml + postsToDisplay.map(post => {
      // We skip rendering courses in the regular list to avoid duplicates
      if (post.category.toLowerCase() === 'courses') return '';

      const thumbnailToUse = post.image ? post.image : defaultImage;

      let audienceHtml = post.audience === 'both' 
        ? '<span class="badge audience-tag owner">OWNER</span><span class="badge audience-tag vet">VET</span>'
        : `<span class="badge audience-tag ${post.audience}">${post.audience.toUpperCase()}</span>`;

      return `
        <li class="${post.featured ? 'featured-item-highlight' : ''}">
          <div class="post-content-wrapper">
            <div class="post-text">
              <div class="meta">
                ${post.featured ? '<span class="badge featured-badge">★ Featured</span>' : ''}
                ${audienceHtml}
                <span class="badge date-badge">${post.date}</span>
                <span class="badge read-badge">
                    <i class="fa-regular fa-clock"></i> ${post.readTime || '5 min read'}
                </span>
              </div>
              <a href="blog-posts/${post.slug}" class="post-title">${post.title}</a>
              <p class="snippet">${post.snippet}</p>
              <div class="topic-footer">
                <span class="category-label">Category:</span>
                <span class="category-tag">${post.category}</span>
              </div>
            </div>
            ${thumbnailToUse ? `
              <div class="post-thumbnail">
                <img src="${thumbnailToUse}" alt="${post.title}" loading="lazy">
              </div>
            ` : ''}
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