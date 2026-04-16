// sidebar.js
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    if (typeof posts === "undefined") return;

    const container = document.getElementById("featured-posts");
    if (!container) return;

    // 1. Data Preparation & Series Identification
    const pathParts = window.location.pathname.split("/");
    const currentFileName = pathParts[pathParts.length - 1] || "index.html";
    const cleanSlug = currentFileName.replace(".html", "");
    const currentPost = posts.find(p => p.slug.replace(".html", "") === cleanSlug);
    const isSeries = currentPost && currentPost.series;
    
    let displayPosts = [];
    let listTitle = "Must Read Articles";
    let sidebarBadge = "Resource Hub";

    if (isSeries) {
      displayPosts = posts
        .filter(p => p.series === currentPost.series)
        .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
      listTitle = currentPost.series;
      sidebarBadge = "Course Modules";
    } else {
      displayPosts = posts.filter(p => p.featured).slice(0, 5);
    }

    let relatedPosts = [];
    if (currentPost && currentPost.category && !isSeries) {
      relatedPosts = posts.filter(p => 
        p.category === currentPost.category && 
        p.slug !== currentPost.slug
      ).slice(0, 3);
    }

    // 2. Inject HTML Structure
    container.innerHTML = `
      <section class="sidebar-card">
        <div class="sidebar-badge">${sidebarBadge}</div>
        
        <div class="search-container">
          <input type="text" id="sidebar-search" placeholder="Search heart topics..." />
          <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <h3 id="sidebar-title" class="sidebar-subheading">${listTitle}</h3>
        <ul id="sidebar-list"></ul>

        ${isSeries ? `
          <div class="series-progress-container">
            <div class="progress-text">Series Progress: ${Math.round((currentPost.seriesOrder / displayPosts.length) * 100)}%</div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${(currentPost.seriesOrder / displayPosts.length) * 100}%"></div>
            </div>
          </div>
        ` : ''}

        <div id="sidebar-related-container" style="display: ${relatedPosts.length > 0 ? 'block' : 'none'};">
          <h3 class="sidebar-subheading related-divider">Related in ${currentPost?.category || ''}</h3>
          <ul id="sidebar-related-list" class="sidebar-thumb-list"></ul>
        </div>
      </section>

      <section class="sidebar-card newsletter-card" style="text-align: center;">
        <div class="sidebar-badge">Newsletter</div>
        <i class="fa-regular fa-envelope-open" style="font-size: 2rem; color: #2563eb; margin: 15px 0;"></i>
        <h3>Cardiac Insights</h3>
        <p class="newsletter-sub">Join our community for clinical updates, echo resources, and pet owner guides.</p>
        
        <a href="/emailsignup.html" class="btn-newsletter" style="text-decoration: none; display: block;">
          Subscribe for Updates
        </a>
      </section>

<section class="sidebar-card support-card" style="margin-top: 24px; background: #fffaf0; border: 1px solid #fbd38d; text-align: center;">
    <div class="sidebar-badge" style="background: #ed8936;">Support the Hub</div>
    <div style="padding: 15px 10px;">
        <i class="fa-solid fa-heart-pulse" style="font-size: 1.8rem; color: #ed8936; margin-bottom: 10px;"></i>
        <h3 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 5px;">Support Our Mission</h3>
        <p style="font-size: 11px; color: #64748b; line-height: 1.4; margin-bottom: 15px;">
            Help keep this clinical resource open-access for everyone.
        </p>
        
        <div class="support-tiers" style="display: flex; flex-direction: column; gap: 8px;">
            <a href="https://paypal.me/vetcardiohub/2" target="_blank" class="btn-support-tier">
                <span>☕</span> <strong>£2</strong> <small>Buy a Coffee</small>
            </a>
            <a href="https://paypal.me/vetcardiohub/5" target="_blank" class="btn-support-tier">
                <span>📚</span> <strong>£5</strong> <small>Support a Module</small>
            </a>
            <a href="https://paypal.me/vetcardiohub" target="_blank" class="btn-support-tier choose-own">
                Choose your own amount
            </a>
        </div>
    </div>
  </section>

    `;



    // 3. UI References
    const sidebarList = document.getElementById('sidebar-list');
    const sidebarTitle = document.getElementById('sidebar-title');
    const searchInput = document.getElementById('sidebar-search');
    const relatedContainer = document.getElementById('sidebar-related-container');
    const sidebarRelatedList = document.getElementById('sidebar-related-list');

    // 4. Render Function for the Post List
    const renderMainList = (postsToDisplay, term = "") => {
      if (!sidebarList) return;
      sidebarList.innerHTML = postsToDisplay.map(p => {
        const isCurrentPage = p.slug.replace(".html", "") === cleanSlug;
        let title = p.title;
        let category = p.category || 'Article';
        if (term) {
          const regex = new RegExp(`(${term})`, 'gi');
          title = title.replace(regex, `<mark class="highlight">$1</mark>`);
          category = category.replace(regex, `<mark class="highlight">$1</mark>`);
        }
        const thumb = p.image || '/images/thumbnails/default-placeholder.jpg';
        return `
          <li class="sidebar-main-item ${isCurrentPage ? 'active-module' : ''}">
            <a href="/blog-posts/${p.slug}" class="sidebar-item-link">
              <div class="sidebar-item-thumb">
                ${isSeries && isCurrentPage ? `<div class="active-play-icon"><i class="fa-solid fa-play"></i></div>` : ''}
                <img src="${thumb}" alt="" style="${isSeries && isCurrentPage ? 'opacity: 0.3' : ''}">
              </div>
              <div class="sidebar-item-info">
                <h4 class="sidebar-item-title">${title}</h4>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="sidebar-item-cat">${isSeries ? 'Module ' + p.seriesOrder : category}</span>
                    <span style="font-size: 9px; color: #94a3b8;">${p.readTime || '5m'}</span>
                </div>
              </div>
            </a>
          </li>`;
      }).join("");
    };

    renderMainList(displayPosts);

    // 5. Populate Related List
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

    // 6. Search Event Listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const progressEl = document.querySelector('.series-progress-container');
        if (term === "") {
          sidebarTitle.innerText = listTitle;
          renderMainList(displayPosts);
          if (progressEl) progressEl.style.display = "block";
          if (relatedPosts.length > 0) relatedContainer.style.display = "block";
        } else {
          sidebarTitle.innerText = "Search Results";
          if (progressEl) progressEl.style.display = "none";
          relatedContainer.style.display = "none"; 
          const matches = posts.filter(p => {
            const inTitle = p.title.toLowerCase().includes(term);
            const inCat = (p.category || "").toLowerCase().includes(term);
            return inTitle || inCat;
          }).slice(0, 6);
          if (matches.length > 0) { renderMainList(matches, term); }
          else { sidebarList.innerHTML = `<li class="no-results">No matches for "${term}"</li>`; }
        }
      });
    }
  });
})();