// Products page specific functionality
let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 6;

// DOM elements specific to products page
const productGrid = document.getElementById('productGrid');
const productsCount = document.getElementById('productsCount');
const categoryFilter = document.getElementById('categoryFilter');
const prescriptionFilter = document.getElementById('prescriptionFilter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const clearFiltersBtn = document.getElementById('clearFilters');
const sortSelect = document.getElementById('sortSelect');
const pagination = document.getElementById('pagination');

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    if (productGrid) {
        setupProductsPageListeners();
        applyFilters();
    }
});

// Setup event listeners for products page
function setupProductsPageListeners() {
    // Filter event listeners
    categoryFilter.addEventListener('change', applyFilters);
    prescriptionFilter.addEventListener('change', applyFilters);
    minPriceInput.addEventListener('input', debounce(applyFilters, 500));
    maxPriceInput.addEventListener('input', debounce(applyFilters, 500));
    sortSelect.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Apply all filters
function applyFilters() {
    let filtered = [...products];
    
    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Prescription filter
    const prescriptionValue = prescriptionFilter.value;
    if (prescriptionValue !== '') {
        const requiresPrescription = prescriptionValue === 'true';
        filtered = filtered.filter(product => product.prescription === requiresPrescription);
    }
    
    // Price range filter
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort products
    const sortValue = sortSelect.value;
    filtered = sortProducts(filtered, sortValue);
    
    filteredProducts = filtered;
    currentPage = 1;
    displayProductsPage();
    updateProductsCount();
    createPagination();
}

// Sort products based on selected option
function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'category':
            return products.sort((a, b) => a.category.localeCompare(b.category));
        default:
            return products;
    }
}

// Display products for current page
function displayProductsPage() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createDetailedProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create detailed product card for products page
function createDetailedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const prescriptionBadge = product.prescription ? 
        '<span style="background: #ef4444; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; right: 10px;">Rx Required</span>' : '';
    
    const categoryBadge = getCategoryBadge(product.category);
    
    card.innerHTML = `
        <div style="position: relative;">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            ${prescriptionBadge}
            ${categoryBadge}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">
                <div><strong>Dosage:</strong> ${product.dosage}</div>
                <div><strong>Manufacturer:</strong> ${product.manufacturer}</div>
            </div>
            ${product.prescription ? '<div style="background: #fef3c7; color: #92400e; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem; margin-bottom: 1rem;"><i class="fas fa-prescription-bottle"></i> Prescription Required</div>' : ''}
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.prescription ? 'title="Prescription required - Please consult your doctor"' : ''}>
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn-view-details" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get category badge
function getCategoryBadge(category) {
    const badges = {
        'prescription': '<span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; left: 10px;">Prescription</span>',
        'otc': '<span style="background: #10b981; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; left: 10px;">OTC</span>',
        'supplements': '<span style="background: #f59e0b; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; left: 10px;">Supplement</span>',
        'medical-devices': '<span style="background: #8b5cf6; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; left: 10px;">Device</span>'
    };
    
    return badges[category] || '';
}

// Update products count display
function updateProductsCount() {
    const total = filteredProducts.length;
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, total);
    
    if (total === 0) {
        productsCount.textContent = 'No products found';
    } else {
        productsCount.textContent = `Showing ${startIndex}-${endIndex} of ${total} products`;
    }
}

// Create pagination
function createPagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    pagination.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => goToPage(i));
            pagination.appendChild(pageBtn);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0.5rem';
            ellipsis.style.color = '#64748b';
            pagination.appendChild(ellipsis);
        }
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    pagination.appendChild(nextBtn);
}

// Go to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayProductsPage();
    updateProductsCount();
    createPagination();
    
    // Scroll to top of products
    productGrid.scrollIntoView({ behavior: 'smooth' });
}

// Clear all filters
function clearAllFilters() {
    categoryFilter.value = '';
    prescriptionFilter.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    searchInput.value = '';
    sortSelect.value = 'name';
    
    applyFilters();
}

// Debounce function for input events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced product details view
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal for product details
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px 15px 0 0;">
            <button onclick="this.closest('.modal').remove()" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">×</button>
        </div>
        <div style="padding: 2rem;">
            <h2 style="color: #1e293b; margin-bottom: 1rem;">${product.name}</h2>
            <p style="color: #64748b; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
                <div><strong>Price:</strong> $${product.price}</div>
                <div><strong>Category:</strong> ${product.category.replace('-', ' ').toUpperCase()}</div>
                <div><strong>Dosage:</strong> ${product.dosage}</div>
                <div><strong>Manufacturer:</strong> ${product.manufacturer}</div>
            </div>
            
            ${product.prescription ? `
                <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; color: #92400e;">
                    <i class="fas fa-prescription-bottle" style="margin-right: 0.5rem;"></i>
                    <strong>Prescription Required:</strong> This medication requires a valid prescription from a licensed healthcare provider.
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="addToCart(${product.id}); this.closest('.modal').remove();" style="flex: 1; padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button onclick="this.closest('.modal').remove()" style="padding: 1rem 2rem; background: #e2e8f0; color: #64748b; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
