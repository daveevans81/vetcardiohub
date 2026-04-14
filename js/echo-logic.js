// js/echo-logic.js
(function() {
    const echoFeed = document.getElementById("echo-feed");
    const filterBtns = document.querySelectorAll(".echo-filter-btn");

    // Unified function name: renderEchoPortal
    function renderEchoPortal(groupFilter = "all") {
        if (!echoFeed) return;

        // 1. Filter for Echo AND Vets
        let echoPosts = posts.filter(p => p.category === "Echocardiography" && p.audience === "vet");

        // 2. Filter by Group (Foundations, Diagnosis, etc.) if a specific group is selected
        if (groupFilter !== "all") {
            echoPosts = echoPosts.filter(p => p.group === groupFilter);
        }

        // 3. Sort by Series Order
        echoPosts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

        // 4. Render to HTML
        echoFeed.innerHTML = echoPosts.map(post => `
            <div class="echo-module">
                <div class="echo-module-header">
                    <span class="level-badge ${post.level ? post.level.toLowerCase() : 'beginner'}">${post.level || 'Beginner'}</span>
                    ${post.series ? `<span class="series-name">${post.series}</span>` : ''}
                </div>
                <a href="blog-posts/${post.slug}" class="echo-module-link">
                    <h3>${post.seriesOrder ? `${post.seriesOrder}. ` : ''}${post.title}</h3>
                </a>
                <div class="technique-tag"><i class="fa-solid fa-probe"></i> ${post.technique || 'General Echo'}</div>
            </div>
        `).join('');
    }

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Calling the CORRECTED function name here
            const group = btn.getAttribute('data-group');
            renderEchoPortal(group);
        });
    });

    // Initial load - calling the CORRECTED function name
    renderEchoPortal(); 
})();