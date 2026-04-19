// /js/blog-feed.js
(function() {
  const feedContainer = document.getElementById("blog-list");
  const dashboardContainer = document.getElementById("course-dashboard-container");
  const searchInput = document.getElementById("blog-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // --- 1. Calculate Category Counts ---
  const counts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    acc["all"] = (acc["all"] || 0) + 1;
    return acc;
  }, { all: 0 });

  // Update button text with counts (e.g., "Diagnosis 4")
  filterButtons.forEach(btn => {
    const cat = btn.getAttribute("data-category");
    const count = counts[cat] || 0;
    btn.innerHTML = `${cat.charAt(0).toUpperCase() + cat.slice(1)} <span class="count">${count}</span>`;
  });

  // --- 2. Main Render Function ---
  function renderPosts(postsToDisplay) {
    if (!feedContainer) return;

    // A. RENDER THE COURSE DASHBOARD (Top Section)
    // We always pull from the full 'posts' array so courses stay visible
    const coursePosts = posts.filter(p => p.category.toLowerCase() === 'courses');
    
    if (dashboardContainer) {
      if (coursePosts.length > 0) {
        dashboardContainer.innerHTML = `
            <div class="course-dashboard">
                <h4 class="filter-section-title">Active Courses</h4>
                <div class="course-grid">
                    ${coursePosts.map(course => `
                        <a href="blog-posts/${course.slug}" class="course-launch-card">
                            <span class="course-tag">FOUNDATION</span>
                            <span class="course-name">${course.title}</span>
                            <span class="course-action">Start Lesson 1 →</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
      } else {
        dashboardContainer.innerHTML = ''; // Hide if no courses exist
      }
    }

    // B. HANDLE NO SEARCH RESULTS (For the main list)
    if (postsToDisplay.length === 0) {
      feedContainer.innerHTML = `<p class="no-results">No articles found matching your search.</p>`;
      return;
    }

    // C. RENDER THE BLOG FEED (Bottom Section)
    const defaultImage = "/images/thumbnails/default-placeholder.jpg";

    feedContainer.innerHTML = postsToDisplay.map(post => {
      // Logic: If it's a course, we've already shown it in the dashboard, 
      // so we skip it in the chronological list to avoid clutter.
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

  // --- 3. Initial Render ---
  renderPosts(posts);

  // --- 4. Live Search Logic ---
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

  // --- 5. Category Filtering Logic ---
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      
      // Update UI
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