// /js/blog-feed.js
(function() {
  const feedContainer = document.getElementById("blog-list");
  const dashboardContainer = document.getElementById("course-dashboard-container");
  const searchInput = document.getElementById("blog-search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (typeof posts === 'undefined') return;

  // --- 1. Render Function ---
  function renderPosts(postsToDisplay) {
    if (!feedContainer) return;

    // A. FIND UNIQUE SERIES (DASHBOARD LOGIC)
    // We look for all unique 'series' names and find the lesson 1 for each
    const seriesLessons = posts.reduce((acc, post) => {
      if (post.series) {
        // If we haven't found this series yet, or this is Lesson 1, store it
        if (!acc[post.series] || post.seriesOrder === 1) {
          acc[post.series] = post;
        }
      }
      return acc;
    }, {});

    const uniqueSeries = Object.values(seriesLessons);
    console.log("Unique Series found:", uniqueSeries.length);

    if (dashboardContainer) {
      if (uniqueSeries.length > 0) {
        dashboardContainer.innerHTML = `
            <div class="course-dashboard">
                <h4 class="filter-section-title">Clinical Series & Courses</h4>
                <div class="course-grid">
                    ${uniqueSeries.map(course => `
                        <a href="blog-posts/${course.slug}" class="course-launch-card">
                            <span class="course-tag">SERIES</span>
                            <span class="course-name">${course.series}</span>
                            <span class="course-action">Start from Lesson 1 →</span>
                        </a>
                    `).join('')}
                </div>
                <hr class="dashboard-divider">
            </div>
        `;
      } else {
        dashboardContainer.innerHTML = ''; 
      }
    }

    // B. RENDER MAIN FEED
    if (postsToDisplay.length === 0) {
      feedContainer.innerHTML = `<p class="no-results">No articles found.</p>`;
      return;
    }

    const defaultImage = "/images/thumbnails/default-placeholder.jpg";

    feedContainer.innerHTML = postsToDisplay.map(post => {
      const thumbnailToUse = post.image || defaultImage;
      const audience = post.audience || 'vet';

      let audienceHtml = audience === 'both' 
        ? '<span class="badge audience-tag owner">OWNER</span><span class="badge audience-tag vet">VET</span>'
        : `<span class="badge audience-tag ${audience}">${audience.toUpperCase()}</span>`;

      return `
        <li class="${post.featured ? 'featured-item-highlight' : ''}">
          <div class="post-content-wrapper">
            <div class="post-text">
              <div class="meta">
                ${post.featured ? '<span class="badge featured-badge">★ Featured</span>' : ''}
                ${audienceHtml}
                <span class="badge date-badge">${post.date}</span>
                ${post.series ? `<span class="badge series-badge">${post.series} #${post.seriesOrder}</span>` : ''}
              </div>
              <a href="blog-posts/${post.slug}" class="post-title">${post.title}</a>
              <p class="snippet">${post.snippet}</p>
            </div>
            <div class="post-thumbnail">
                <img src="${thumbnailToUse}" alt="${post.title}" loading="lazy">
            </div>
          </div>
        </li>
      `;
    }).join("");
  }

  // --- 2. Initial Render & Event Listeners ---
  renderPosts(posts);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = posts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.snippet.toLowerCase().includes(term)
      );
      renderPosts(filtered);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtered = category === "all" ? posts : posts.filter(p => p.category === category);
      renderPosts(filtered);
    });
  });
})();