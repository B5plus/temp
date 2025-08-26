// Sample product data
const products = [
    {
        id: 1,
        name: "Amoxicillin 500mg",
        category: "prescription",
        price: 24.99,
        description: "Broad-spectrum antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: true,
        dosage: "500mg capsules",
        manufacturer: "PharmaCorp"
    },
    {
        id: 2,
        name: "Ibuprofen 200mg",
        category: "otc",
        price: 12.99,
        description: "Pain reliever and anti-inflammatory medication",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "200mg tablets",
        manufacturer: "PharmaCorp"
    },
    {
        id: 3,
        name: "Vitamin D3 1000 IU",
        category: "supplements",
        price: 18.99,
        description: "Essential vitamin for bone health and immune support",
        image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "1000 IU softgels",
        manufacturer: "PharmaCorp"
    },
    {
        id: 4,
        name: "Digital Thermometer",
        category: "medical-devices",
        price: 29.99,
        description: "Accurate digital thermometer for temperature monitoring",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "N/A",
        manufacturer: "PharmaCorp"
    },
    {
        id: 5,
        name: "Lisinopril 10mg",
        category: "prescription",
        price: 32.99,
        description: "ACE inhibitor for high blood pressure treatment",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: true,
        dosage: "10mg tablets",
        manufacturer: "PharmaCorp"
    },
    {
        id: 6,
        name: "Acetaminophen 500mg",
        category: "otc",
        price: 9.99,
        description: "Pain reliever and fever reducer",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "500mg tablets",
        manufacturer: "PharmaCorp"
    },
    {
        id: 7,
        name: "Omega-3 Fish Oil",
        category: "supplements",
        price: 25.99,
        description: "High-quality omega-3 fatty acids for heart health",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "1000mg softgels",
        manufacturer: "PharmaCorp"
    },
    {
        id: 8,
        name: "Blood Pressure Monitor",
        category: "medical-devices",
        price: 89.99,
        description: "Automatic blood pressure monitor with large display",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prescription: false,
        dosage: "N/A",
        manufacturer: "PharmaCorp"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.getElementById('searchInput');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartUI();
});

// Display products in the grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const prescriptionBadge = product.prescription ? 
        '<span style="background: #ef4444; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; position: absolute; top: 10px; right: 10px;">Rx Required</span>' : '';
    
    card.innerHTML = `
        <div style="position: relative;">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            ${prescriptionBadge}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 0.5rem;">
                <strong>Dosage:</strong> ${product.dosage}
            </div>
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
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

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    displayCartItems();
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Display cart items in modal
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="margin: 0 0.5rem;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" style="margin-left: 1rem; color: #ef4444; background: none; border: none; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        displayCartItems();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'block';
        displayCartItems();
    });
    
    document.querySelector('.close-cart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
    
    // Category filtering
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filteredProducts = products.filter(product => product.category === category);
            displayProducts(filteredProducts);
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only prevent default for anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For external links (.html files), let them navigate normally
        });
    });
    
    // Hero buttons
    document.querySelector('.btn-primary').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
}

// View product details (placeholder function)
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    alert(`Product Details:\n\nName: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}\nDosage: ${product.dosage}\nManufacturer: ${product.manufacturer}\nPrescription Required: ${product.prescription ? 'Yes' : 'No'}`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
