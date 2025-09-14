const products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 799.99,
                description: "Premium quality wireless headphones with noise cancellation.",
                image: "images/headset.jpg"


            },
            {
                id: 2,
                name: "Smart Watch",
                price: 1999.99,
                description: "Feature-rich smartwatch with health tracking and notifications.",
                image: "images/smartwatch.jpg"
            },
            {
                id: 3,
                name: "Laptop Stand",
                price: 449.99, 
                description: "Ergonomic laptop stand for better posture and productivity.",
                image: "images/stand.jpg"
            },
            {
                id: 4,
                name: "Wireless Mouse",
                price: 329.99,
                description: "Precision wireless mouse with ergonomic design.",
                image: "images/mouse.jpg"
            },
            {
                id: 5,
                name: "USB-C Hub",
                price: 149.99,
                description: "Multi-port USB-C hub for all your connectivity needs.",
                image: "images/usb.jpg"
            },
            {
                id: 6,
                name: "Phone Case",
                price: 319.99,
                description: "Protective phone case with premium materials and design.",
                image: "images/phonecase.jpg"
            }
        ];

        // Cart data
        let cart = [];

        // DOM elements
        const productsGrid = document.getElementById('productsGrid');
        const cartModal = document.getElementById('cartModal');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');

        // Initialize the app
        function init() {
            renderProducts();
            updateCartUI();
        }

        // Render products
        function renderProducts() {
            productsGrid.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
  ${product.emoji ? product.emoji : `<img src="${product.image}" alt="${product.name}" />`}
</div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">₹${product.price.toFixed(2)}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
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
            showAddToCartAnimation();
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Update item quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartUI();
                }
            }
        }

        // Update cart UI
        function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div> 
        `;
    } else {
        const cartHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>Qty: ${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItems.innerHTML = `
            ${cartHTML}
            <div class="cart-total">
                <div class="total-amount">Total: ₹${total.toFixed(2)}</div>
                <button class="checkout-btn" onclick="checkout()">
                    Proceed to Checkout
                </button>
            </div>
        `;
    }
}



        // Toggle cart modal
        function toggleCart() {
            cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
        }

        // Checkout function
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your purchase! Total: ₹${total.toFixed(2)}`);
            
            // Clear cart
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Add to cart animation
        function showAddToCartAnimation() {
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }

        // Initialize the application when DOM is loaded

        document.addEventListener('DOMContentLoaded', init);
