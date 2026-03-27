// Products storage
const PRODUCTS_KEY = 'marketplace-products-v3';

// Load products
function loadProducts() {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    
    if (document.getElementById('productsGrid')) {
        displayProducts(products);
    }
    
    return products;
}

// Display products WITH IMAGES
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center;padding:4rem;color:#666;">
                <i class="fas fa-box-open" style="font-size:4rem;"></i>
                <h2>No products yet</h2>
                <p>Add your first product!</p>
                <a href="admin.html" style="background:#667eea;color:white;padding:1rem 2rem;display:inline-block;margin-top:1rem;border-radius:25px;text-decoration:none;">➕ Add Product</a>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" style="background:white;border-radius:20px;padding:1.5rem;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            ${product.image ? `
                <img src="${product.image}" style="width:100%;height:200px;object-fit:cover;border-radius:15px;margin-bottom:1rem;" 
                     alt="${product.title}" onerror="this.style.display='none'">
            ` : `
                <div style="height:200px;background:linear-gradient(45deg,#667eea,#764ba2);border-radius:15px;display:flex;align-items:center;justify-content:center;color:white;font-size:2rem;">
                    📸
                </div>
            `}
            <h3 style="font-size:1.4rem;margin-bottom:0.5rem;">${product.title}</h3>
            <p style="color:#666;margin-bottom:1rem;">${product.description}</p>
            ${product.category ? `<span style="background:#667eea;color:white;padding:0.4rem 1rem;border-radius:20px;font-size:0.8rem;">${product.category}</span>` : ''}
            <div style="margin-top:1.5rem;gap:1rem;display:flex;flex-wrap:wrap;">
                ${product.buyerLink ? `<a href="${product.buyerLink}" target="_blank" style="background:#48bb78;color:white;padding:0.8rem 1.5rem;border-radius:25px;text-decoration:none;font-weight:bold;flex:1;">🛒 Buy Now</a>` : ''}
                ${product.photos ? `<button onclick="showPhotos('${product.id}')" style="background:#667eea;color:white;padding:0.8rem 1.5rem;border-radius:25px;border:none;cursor:pointer;flex:1;">📸 Photos</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Save product WITH image upload
function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    products.unshift(product);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    alert(`✅ "${product.title}" added!\n\n🔗 ${window.location.origin}`);
}

// Photo preview modal
function showPhotos(productId) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const product = products.find(p => p.id == productId);
    if (product && product.photos) {
        const photos = product.photos.join('\n');
        alert(`📸 Photos for ${product.title}:\n${photos}`);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Admin form with image upload
    const form = document.getElementById('productForm');
    if (form) {
        let imageUrl = '';
        
        // Image upload handler
        const photoInput = document.getElementById('photos');
        if (photoInput) {
            photoInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Show upload instructions
                    imageUrl = `📤 Upload to Imgur/TinyPNG then paste link`;
                    alert(`📤 Steps:\n1. Go to https://imgur.com/upload\n2. Drag image\n3. Copy "Direct Link"\n4. Paste in Image URL field`);
                }
            };
        }
        
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const product = {
                id: Date.now(),
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                buyerLink: document.getElementById('buyerLink').value,
                category: document.getElementById('category').value,
                image: document.getElementById('imageUrl')?.value || '',
                photos: document.getElementById('photosUrl')?.value ? 
                       document.getElementById('photosUrl').value.split('\n') : [],
                dateAdded: new Date().toLocaleString()
            };
            
            saveProduct(product);
            form.reset();
            window.location.href = 'index.html';
        };
    }
});
