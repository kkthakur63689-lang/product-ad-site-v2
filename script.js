// Products storage (works across all browsers!)
const PRODUCTS_KEY = 'marketplace-products-v2';

// Load products
function loadProducts() {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    
    // Show on main page
    if (document.getElementById('productsGrid')) {
        displayProducts(products);
    }
    
    return products;
}

// Display products
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center;padding:4rem;color:#666;">
                <i class="fas fa-box-open" style="font-size:4rem;"></i>
                <h2>No products yet</h2>
                <p>Click "Add Product" to start!</p>
                <a href="admin.html" class="admin-btn" style="display:inline-block;margin-top:1rem;padding:1rem 2rem;">➕ Add Product</a>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <h3 class="product-title">${product.title}</h3>
            <p style="color:#666;margin:1rem 0;">${product.description}</p>
            ${product.category ? `<span style="background:#667eea;color:white;padding:0.3rem 0.8rem;border-radius:20px;font-size:0.8rem;">${product.category}</span>` : ''}
            <div style="margin-top:1.5rem;">
                ${product.buyerLink ? `<a href="${product.buyerLink}" target="_blank" class="buy-btn" style="background:#48bb78;">🛒 Buy Now</a>` : ''}
                ${product.photos && product.photos.length ? `<button onclick="alert('📸 ${product.photos.length} photos available!')" class="buy-btn" style="background:#667eea;">Photos</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Save product
function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    products.unshift(product); // Add to top
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    
    // Show success
    alert(`✅ "${product.title}" added successfully!\n\n🔗 Share: ${window.location.origin}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Admin form
    const form = document.getElementById('productForm');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const buyerLink = document.getElementById('buyerLink').value;
            const category = document.getElementById('category').value;
            
            const product = {
                id: Date.now(),
                title,
                description,
                buyerLink,
                category,
                dateAdded: new Date().toLocaleString()
            };
            
            saveProduct(product);
            form.reset();
            window.location.href = 'index.html';
        };
    }
});
