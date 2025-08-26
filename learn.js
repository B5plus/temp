// Enhanced cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Show cart modal when cart icon is clicked
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            cartModal.style.display = 'block';
            displayCartItems();
        });
    }

    // Close cart modal
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Checkout button functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add some items before checkout.');
                return;
            }

            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

            let cartSummary = `CHECKOUT SUMMARY\n\n`;
            cartSummary += `Items in cart: ${itemCount}\n`;
            cartSummary += `Total amount: $${totalAmount.toFixed(2)}\n\n`;
            cartSummary += `ITEMS:\n`;

            cart.forEach(item => {
                cartSummary += `• ${item.name} - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
            });

            cartSummary += `\nProceed to payment?`;

            if (confirm(cartSummary)) {
                alert('Thank you for your order! You will be redirected to payment processing.');
                // Here you would typically redirect to a payment processor
                // For demo purposes, we'll clear the cart
                cart = [];
                updateCartUI();
                cartModal.style.display = 'none';
            }
        });
    }

    // Learn More button functionality
    const learnMoreBtn = document.querySelector('.btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
});