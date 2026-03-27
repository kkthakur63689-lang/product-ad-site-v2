// Load products on index.html
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) return;
    
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <h3 class="product-title">${p.title}</h3>
            <p>${p.description}</p>
            ${p.buyerLink ? `<div class="product-links">
                <a href="${p.buyerLink}" target="_blank">🛒 Buy Now</a>
            </div>` : ''}
        </div>
    `).join('');
}
