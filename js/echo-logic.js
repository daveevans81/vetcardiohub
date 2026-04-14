// js/echo-logic.js
(function() {
    const echoFeed = document.getElementById("echo-feed");
    const filterBtns = document.querySelectorAll(".echo-filter-btn");

function renderEchoPortal() {
    // 1. Filter for Echo AND Vets
    const echoPosts = posts.filter(p => p.category === "Echocardiography" && p.audience === "vet");

    // 2. Sort by Series Order (if applicable)
    echoPosts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

    echoFeed.innerHTML = echoPosts.map(post => `
        <div class="echo-module">
            <div class="echo-module-header">
                <span class="level-badge ${post.level.toLowerCase()}">${post.level}</span>
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
            renderEchoPosts(btn.getAttribute('data-group'));
        });
    });

    renderEchoPosts(); // Initial load
})();