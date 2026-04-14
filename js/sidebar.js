// sidebar.js
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    if (typeof posts === "undefined") return;

    const container = document.getElementById("featured-posts");
    if (!container) return;

    // 1. Data Prep
    const pathParts = window.location.pathname.split("/");
    const currentFileName = pathParts[pathParts.length - 1] || "index.html";
    const cleanSlug = currentFileName.replace(".html", "");
    const currentPost = posts.find(p => p.slug.replace(".html", "") === cleanSlug);
    const isSeries = currentPost && currentPost.series;
    
    let displayPosts = isSeries ? posts.filter(p => p.series === currentPost.series).sort((a,b) => (a.seriesOrder || 0)-(b.seriesOrder || 0)) : posts.filter(p => p.featured).slice(0, 5);
    let listTitle = isSeries ? currentPost.series : "Must Read Articles";
    let sidebarBadge = isSeries ? "Course Modules" : "Resource Hub";
    let relatedPosts = (currentPost && !isSeries) ? posts.filter(p => p.category === currentPost.category && p.slug !== currentPost.slug).slice(0, 3) : [];

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
        ${isSeries ? `<div class="series-progress-container"><div class="progress-text">Series Progress: ${Math.round((currentPost.seriesOrder / displayPosts.length) * 100)}%</div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${(currentPost.seriesOrder / displayPosts.length) * 100}%"></div></div></div>` : ''}
        <div id="sidebar-related-container" style="display: ${relatedPosts.length > 0 ? 'block' : 'none'};"><h3 class="sidebar-subheading related-divider">Related in ${currentPost?.category || ''}</h3><ul id="sidebar-related-list" class="sidebar-thumb-list"></ul></div>
      </section>

      <section class="sidebar-card newsletter-card">
        <div class="sidebar-badge">Stay Updated</div>
        <div id="newsletter-status">
            <h3>Cardiac Insights</h3>
            <p class="newsletter-sub">Clinical updates for Vets and guides for Owners.</p>
            
            <form id="sidebar-brevo-form">
              <input type="email" name="EMAIL" placeholder="Email Address" required class="newsletter-input" />

              <div class="segment-selector">
                <label class="segment-option">
                  <input type="radio" name="SEGMENT" value="vet"> <span>Vet</span>
                </label>
                <label class="segment-option">
                  <input type="radio" name="SEGMENT" value="owner" checked> <span>Owner</span>
                </label>
              </div>

              <div class="gdpr-box">
                <label class="gdpr-label">
                  <input type="checkbox" name="OPT_IN" value="1" required>
                  <span>I agree to receive cardiac updates.</span>
                </label>
              </div>

              <input type="text" name="email_address_check" value="" style="display:none !important;">
              <input type="hidden" name="locale" value="en">

              <button type="submit" class="btn-newsletter" id="sub-btn">Subscribe</button>
            </form>
        </div>
      </section>
    `;

    // 3. UI References
    const sidebarList = document.getElementById('sidebar-list');
    const sidebarTitle = document.getElementById('sidebar-title');
    const searchInput = document.getElementById('sidebar-search');
    const relatedContainer = document.getElementById('sidebar-related-container');
    const sidebarRelatedList = document.getElementById('sidebar-related-list');

    // 4. Render Function
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

    // 5. Related Posts Logic
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

    // 7. NEW: Brevo Form Submission Logic (Inside the listener)
    const form = document.getElementById('sidebar-brevo-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const btn = document.getElementById('sub-btn');
            const statusBox = document.getElementById('newsletter-status');
            btn.innerText = "Sending...";
            btn.disabled = true;

            const formData = new FormData(form);
            
            fetch("https://0c4998da.sibforms.com/serve/MUIFAENr5i33tSrO5Jn-UyOjX28DQfxonP35cKdnRS-z6sbjqVOFldL8RU_6Q1rAAANPwuayLOw8aNfsbpCSsK-JkoROdVR6mmbp8csGmVryMIPA768fd22yojbs4uk6VaGucfJhY_3yiXLTI6NM1xdWXBVv4_a0M4YGF0L54m0jjE93GCCP405kHigikSGibACx_o05b28gkXr4", {
                method: "POST",
                body: formData,
                mode: 'no-cors' 
            }).then(() => {
                statusBox.innerHTML = `
                    <div style="text-align: center; padding: 20px 0;">
                        <i class="fa-solid fa-circle-check" style="color: #22c55e; font-size: 40px; margin-bottom: 15px;"></i>
                        <h3 style="margin-bottom: 10px;">Check your Inbox!</h3>
                        <p style="font-size: 13px; color: #64748b;">We've sent a confirmation link to your email. Please click it to finish signing up.</p>
                    </div>
                `;
            }).catch(() => {
                btn.innerText = "Error. Try again?";
                btn.disabled = false;
            });
        });
    }
  }); // End of DOMContentLoaded
})();