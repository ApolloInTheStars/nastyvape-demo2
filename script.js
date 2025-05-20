document.addEventListener('DOMContentLoaded', function() {
    // Age Verification Modal
    const ageModal = document.getElementById('ageVerificationModal');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');
    
    // Check if age verification has already been passed
    if (!localStorage.getItem('ageVerified')) {
        ageModal.style.display = 'flex';
    }
    
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageModal.style.display = 'none';
    });
    
    denyAgeBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        
        const diff = endOfWeek - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Quick View Modal
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productPrice = productCard.querySelector('.product-price').innerHTML;
            
            document.getElementById('quickViewTitle').textContent = productTitle;
            document.querySelector('.quick-view-details .product-rating').innerHTML = productRating;
            document.querySelector('.quick-view-details .product-price').innerHTML = productPrice;
            
            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Login/Register Modals
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const accountIcon = document.querySelector('.account-icon');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    accountIcon.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = 'var(--primary-color)';
            }, 1000);
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Here you would typically send this to your server
        console.log('Subscribed email:', email);
        
        // Show success message
        this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
        
        // Store in localStorage
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would validate and send to your server
        console.log('Login attempt:', email, password);
        
        // For demo purposes, just close the modal
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Register Form Submission
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const ageVerified = document.getElementById('registerAgeVerify').checked;
        const subscribe = document.getElementById('registerSubscribe').checked;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (!ageVerified) {
            alert('You must be 21 or older to register.');
            return;
        }
        
        // Here you would send this to your server
        console.log('Registration:', { name, email, password, subscribe });
        
        // Store user data in localStorage (for demo only - not secure for production)
        localStorage.setItem('user', JSON.stringify({
            name,
            email,
            subscribed: subscribe
        }));
        
        // For demo purposes, just close the modal
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Product Quick View Thumbnail Click
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('quickViewMainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            mainNav.style.display = '';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Data capture examples
    // Track product views
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart') && !e.target.classList.contains('quick-view')) {
                const productName = this.querySelector('h3').textContent;
                console.log('Product viewed:', productName);
                // Send this data to your analytics
            }
        });
    });
    
    // Track category clicks
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category clicked:', categoryName);
            // Send this data to your analytics
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (keep your existing age verification and other code) ...

    // Cart System
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const continueShopping = document.getElementById('continueShopping');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    
    // Checkout Modal
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutPayment = document.getElementById('checkoutPayment');
    const creditCardFields = document.getElementById('creditCardFields');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart modal
    function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartSubtotal.textContent = 'R0.00';
            cartTotal.textContent = 'R50.00';
            checkoutBtn.disabled = true;
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        const shipping = 50; // R50 flat shipping rate
        const total = subtotal + shipping;
        
        cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;
        cartTotal.textContent = `R${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    }
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.querySelector('img').getAttribute('src').split('/').pop().split('.')[0];
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('R', ''));
            const productImage = productCard.querySelector('img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update UI
            updateCartCount();
            
            // Animation
            this.textContent = 'Added!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = 'var(--primary-color)';
            }, 1000);
        });
    });
    
    // Open cart modal
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        updateCartModal();
        cartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Continue shopping
    continueShopping.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Proceed to checkout
    checkoutBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'flex';
    });
    
    // Handle cart item operations
    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;
        const productId = target.getAttribute('data-id');
        const cartItem = cart.find(item => item.id === productId);
        
        if (target.classList.contains('cart-item-remove')) {
            cart = cart.filter(item => item.id !== productId);
        } else if (target.classList.contains('minus')) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
        } else if (target.classList.contains('plus')) {
            cartItem.quantity += 1;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartModal();
        updateCartCount();
    });
    
    // Handle quantity input changes
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = e.target.getAttribute('data-id');
            const cartItem = cart.find(item => item.id === productId);
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity > 0) {
                cartItem.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartModal();
            updateCartCount();
        }
    });
    
    // Payment method toggle
    checkoutPayment.addEventListener('change', function() {
        if (this.value === 'credit') {
            creditCardFields.style.display = 'block';
        } else {
            creditCardFields.style.display = 'none';
        }
    });
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const order = {
            customer: {
                name: document.getElementById('checkoutName').value,
                email: document.getElementById('checkoutEmail').value,
                phone: document.getElementById('checkoutPhone').value,
                address: document.getElementById('checkoutAddress').value
            },
            payment: checkoutPayment.value,
            items: cart,
            total: parseFloat(cartTotal.textContent.replace('R', '')),
            date: new Date().toISOString()
        };
        
        // In a real app, you would send this to your server
        console.log('Order submitted:', order);
        
        // For demo purposes, we'll just show an alert and clear the cart
        alert('Thank you for your order! A confirmation has been sent to your email.');
        
        // Clear the cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Close modals
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Initialize cart count
    updateCartCount();
    
    // ... (keep your existing modal close handlers and other code) ...
});

// In your checkout form submission handler:
checkoutForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const order = {
        customer: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            address: document.getElementById('checkoutAddress').value
        },
        payment: checkoutPayment.value,
        items: cart,
        total: parseFloat(cartTotal.textContent.replace('R', '')),
        date: new Date().toISOString(),
        orderId: 'NASTY-' + Math.floor(Math.random() * 1000000)
    };

    try {
        // Send order to your backend
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Thank you for your order #${order.orderId}! A confirmation has been sent to ${order.customer.email}`);
            
            // Clear the cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Close modals
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            throw new Error('Failed to submit order');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your order. Please try again.');
    }
});

document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    const messageElement = document.getElementById('newsletterMessage');
    
    // Simple validation
    if (!email.includes('@') || !email.includes('.')) {
        messageElement.textContent = 'Please enter a valid email address';
        messageElement.style.color = 'red';
        return;
    }

    // Send to server (you'll need to implement the server-side part)
    fetch('https://your-server.com/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageElement.textContent = 'Thank you for subscribing!';
            messageElement.style.color = 'green';
            document.getElementById('newsletterEmail').value = '';
        } else {
            messageElement.textContent = data.message || 'Subscription failed. Please try again.';
            messageElement.style.color = 'red';
        }
    })
    .catch(error => {
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.style.color = 'red';
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutFormContainer = document.getElementById('checkoutFormContainer');
    const checkoutForm = document.getElementById('checkoutForm');
    const continueShopping = document.getElementById('continueShopping');
    const closeModal = document.querySelector('.close-modal');
    const cartModal = document.getElementById('cartModal');
    
    // Show checkout form when checkout button is clicked
    checkoutBtn.addEventListener('click', function() {
        checkoutBtn.style.display = 'none';
        checkoutFormContainer.style.display = 'block';
    });
    
    // Continue shopping button
    continueShopping.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'none';
    });
    
    // Close modal button
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect order data
        const orderData = {
            customer: {
                name: document.getElementById('customerName').value,
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value,
                address: document.getElementById('deliveryAddress').value
            },
            items: getCartItems(),
            subtotal: document.getElementById('cartSubtotal').textContent,
            shipping: document.getElementById('cartShipping').textContent,
            total: document.getElementById('cartTotal').textContent,
            paymentProof: document.getElementById('paymentProof').files[0]
        };
        
        // Send order data
        sendOrderEmail(orderData);
    });
    
    // Get cart items from storage or wherever they're stored
    function getCartItems() {
        // This should be replaced with your actual cart items retrieval logic
        const cartItems = [];
        const itemElements = document.querySelectorAll('#cartItems .cart-item');
        
        itemElements.forEach(item => {
            cartItems.push({
                name: item.dataset.name,
                price: item.dataset.price,
                quantity: item.dataset.quantity
            });
        });
        
        return cartItems.length ? cartItems : [
            { name: 'Arctic White', price: 'R200', quantity: 2 },
            { name: 'Cherry Peach Lemon', price: 'R200', quantity: 1 }
        ];
    }
    
    // Send order data to server
    function sendOrderEmail(orderData) {
        // In a real implementation, this would send to your backend
        console.log('Order data:', orderData);
        
        // Here you would typically use fetch() to send to your backend
        /*
        fetch('/api/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showOrderSuccess();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
        */
        
        // For demo purposes, we'll just show success
        showOrderSuccess();
    }
    
    function showOrderSuccess() {
        alert('Order placed successfully! You and the customer will receive confirmation emails.');
        cartModal.style.display = 'none';
        // Clear cart or redirect as needed
    }
    
    // Open cart modal function (call this when cart icon is clicked)
    window.openCartModal = function() {
        cartModal.style.display = 'block';
        // Refresh cart items display here if needed
    };
});
