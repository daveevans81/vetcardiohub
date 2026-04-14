// js/echo-logic.js
(function() {
    const echoFeed = document.getElementById("echo-feed");
    const filterBtns = document.querySelectorAll(".echo-filter-btn");

    function renderEchoPortal(groupFilter = "all") {
        if (!echoFeed) return;

        let echoPosts = posts.filter(p => p.category === "Echocardiography" && p.audience === "vet");

        if (groupFilter !== "all") {
            echoPosts = echoPosts.filter(p => p.group === groupFilter);
        }

        echoPosts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

        echoFeed.innerHTML = echoPosts.map(post => `
            <article class="echo-card">
                <div class="echo-card-image">
                    <img src="${post.image || '/images/thumbnails/default-placeholder.jpg'}" alt="${post.title}">
                    <div class="echo-card-level ${post.level ? post.level.toLowerCase() : 'beginner'}">${post.level || 'Beginner'}</div>
                </div>
                <div class="echo-card-content">
                    <div class="echo-card-meta">
                        <span class="echo-series">${post.series || 'Echo Module'}</span>
                        <span class="echo-date">${post.date}</span>
                    </div>
                    <a href="blog-posts/${post.slug}" class="echo-card-link">
                        <h3 class="echo-card-title">
                            ${post.seriesOrder ? `<span class="order-num">${post.seriesOrder}</span>` : ''}
                            ${post.title}
                        </h3>
                    </a>
                    <p class="echo-card-subtitle">${post.subtitle || ''}</p>
                    <p class="echo-card-snippet">${post.snippet ? post.snippet.substring(0, 100) + '...' : ''}</p>
                    <div class="echo-card-footer">
                        <span class="echo-technique"><i class="fa-solid fa-probe"></i> ${post.technique || 'General Echo'}</span>
                        <span class="echo-time"><i class="fa-regular fa-clock"></i> ${post.readTime || '5m'}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEchoPortal(btn.getAttribute('data-group'));
        });
    });

    renderEchoPortal(); 
})();