
async function loadPartial(id, url) {
const response = await fetch(url);
const data = await response.text();
document.getElementById(id).innerHTML = data;
}

loadPartial("site-header", "/partials/header.html");
loadPartial("site-footer", "/partials/footer.html");

