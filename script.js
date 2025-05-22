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
    // --- Age Verification Modal ---
    const ageModal = document.getElementById('ageVerificationModal');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');

    // Check if age verification has already been passed
    if (!localStorage.getItem('ageVerified')) {
        if (ageModal) { // Ensure modal exists before trying to display it
            ageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    }

    if (confirmAgeBtn) {
        confirmAgeBtn.addEventListener('click', function() {
            localStorage.setItem('ageVerified', 'true');
            if (ageModal) ageModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    if (denyAgeBtn) {
        denyAgeBtn.addEventListener('click', function() {
            window.location.href = 'https://www.google.com';
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // --- Countdown Timer ---
    function updateCountdown() {
        const now = new Date();
        const endOfWeek = new Date();
        // Set end of week to Sunday (day 0) at 23:59:59.999
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);

        const diff = endOfWeek - now;

        // Ensure diff is not negative (if past Sunday)
        if (diff < 0) {
            // If the countdown has passed, set it for the next week
            endOfWeek.setDate(endOfWeek.getDate() + 7);
            const newDiff = endOfWeek - now;
            updateCountdownDisplay(newDiff);
        } else {
            updateCountdownDisplay(diff);
        }
    }

    function updateCountdownDisplay(diff) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Check if elements exist before updating
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    // Only set interval if countdown elements are present
    if (document.getElementById('days')) {
        setInterval(updateCountdown, 1000);
    }

    // --- Quick View Modal ---
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewMainImage = document.getElementById('quickViewMainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');

    if (quickViewBtns.length > 0 && quickViewModal) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                // Use optional chaining for safer access if elements might be missing
                const productTitle = productCard?.querySelector('h3')?.textContent || 'N/A';
                const productRating = productCard?.querySelector('.product-rating')?.innerHTML || '';
                const productPrice = productCard?.querySelector('.product-price')?.innerHTML || '';
                const productImageSrc = productCard?.querySelector('.product-image')?.src || ''; // Assuming you have a product image class

                document.getElementById('quickViewTitle').textContent = productTitle;
                document.querySelector('.quick-view-details .product-rating').innerHTML = productRating;
                document.querySelector('.quick-view-details .product-price').innerHTML = productPrice;
                if (quickViewMainImage) quickViewMainImage.src = productImageSrc; // Set main image

                quickViewModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Product Quick View Thumbnail Click
    if (thumbnails.length > 0 && quickViewMainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                quickViewMainImage.src = this.src;
            });
        });
    }

    // --- Login/Register Modals ---
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const accountIcon = document.querySelector('.account-icon');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeModalBtns = document.querySelectorAll('.close-modal'); // Defined once here

    if (accountIcon && loginModal) {
        accountIcon.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    if (showRegister && loginModal && registerModal) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
    }

    if (showLogin && loginModal && registerModal) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }

    // --- Close Modals (Generic) ---
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the closest parent with the class 'modal'
            const modalToClose = this.closest('.modal');
            if (modalToClose) {
                modalToClose.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        // Check if the clicked element is a modal background
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Cart System ---
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping'); // This was declared but not used in calculation. Keeping for potential future use.
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const continueShopping = document.getElementById('continueShopping');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count'); // This was also declared earlier. Consolidated.

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart once

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;
    }

    // Update cart modal display
    function updateCartModal() {
        if (!cartItemsContainer) return; // Exit if container doesn't exist

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            if (cartSubtotal) cartSubtotal.textContent = 'R0.00';
            if (cartTotal) cartTotal.textContent = 'R50.00'; // Assuming a base shipping for empty cart
            if (checkoutBtn) checkoutBtn.disabled = true;
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
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const shipping = 50; // R50 flat shipping rate
        const total = subtotal + shipping;

        if (cartSubtotal) cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `R${total.toFixed(2)}`;
        if (checkoutBtn) checkoutBtn.disabled = false;
    }

    // Add to cart functionality (Revised to use the `cart` array)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            // Ensure you have a way to get a unique ID for the product.
            // Using image src as ID is not ideal, consider data-id attributes on product cards.
            const productId = productCard.getAttribute('data-product-id') || productCard.querySelector('img').src.split('/').pop().split('.')[0];
            const productName = productCard.querySelector('h3').textContent;
            // Ensure productPrice correctly parses from .current-price or .product-price
            const priceElement = productCard.querySelector('.current-price') || productCard.querySelector('.product-price');
            const productPrice = parseFloat(priceElement?.textContent.replace('R', '')) || 0;
            const productImage = productCard.querySelector('img').src;

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

            localStorage.setItem('cart', JSON.stringify(cart));
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
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            updateCartModal();
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Continue shopping (from cart modal)
    if (continueShopping && cartModal) {
        continueShopping.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Proceed to checkout (from cart modal)
    if (checkoutBtn && cartModal && document.getElementById('checkoutModal')) {
        checkoutBtn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            document.getElementById('checkoutModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Handle cart item operations (remove, quantity change)
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            const target = e.target;
            const productId = target.getAttribute('data-id');

            if (!productId) return; // Not a cart item operation

            const cartItemIndex = cart.findIndex(item => item.id === productId);

            if (cartItemIndex === -1) return; // Item not found in cart

            if (target.classList.contains('cart-item-remove')) {
                cart.splice(cartItemIndex, 1); // Remove item
            } else if (target.classList.contains('minus')) {
                if (cart[cartItemIndex].quantity > 1) {
                    cart[cartItemIndex].quantity -= 1;
                } else {
                    cart.splice(cartItemIndex, 1); // Remove if quantity becomes 0
                }
            } else if (target.classList.contains('plus')) {
                cart[cartItemIndex].quantity += 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartModal();
            updateCartCount();
        });
    }

    // Payment method toggle in checkout
    const checkoutPayment = document.getElementById('checkoutPayment');
    const creditCardFields = document.getElementById('creditCardFields');

    if (checkoutPayment && creditCardFields) {
        checkoutPayment.addEventListener('change', function() {
            if (this.value === 'credit') {
                creditCardFields.style.display = 'block';
            } else {
                creditCardFields.style.display = 'none';
            }
        });
    }

    // --- Checkout Form Submission ---
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutModal = document.getElementById('checkoutModal'); // Ensure this is consistently defined

    if (checkoutForm && checkoutModal) {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const order = {
                customer: {
                    name: document.getElementById('checkoutName')?.value,
                    email: document.getElementById('checkoutEmail')?.value,
                    phone: document.getElementById('checkoutPhone')?.value,
                    address: document.getElementById('checkoutAddress')?.value
                },
                payment: checkoutPayment?.value,
                items: cart,
                total: parseFloat(cartTotal?.textContent.replace('R', '')) || 0,
                date: new Date().toISOString(),
                orderId: 'NASTY-' + Math.floor(Math.random() * 1000000)
            };

            try {
                // This 'fetch' call is for demonstration. You MUST replace
                // 'https://your-server.com/api/orders' with your actual backend endpoint.
                const response = await fetch('https://your-server.com/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order)
                });

                if (response.ok) {
                    // const result = await response.json(); // If your server returns data
                    alert(`Thank you for your order #${order.orderId}! A confirmation has been sent to ${order.customer.email}`);

                    // Clear the cart
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    updateCartModal(); // Refresh cart display to show it's empty

                    // Close modals
                    checkoutModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    this.reset(); // Clear form fields
                } else {
                    const errorData = await response.json(); // Try to get error message from server
                    throw new Error(errorData.message || 'Failed to submit order');
                }
            } catch (error) {
                console.error('Error submitting order:', error);
                alert('There was an error processing your order: ' + error.message + '. Please try again.');
            }
        });
    }

    // --- Newsletter Form Submission ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmailInput = document.getElementById('newsletterEmail');
    const newsletterMessageElement = document.getElementById('newsletterMessage');

    if (newsletterForm && newsletterEmailInput && newsletterMessageElement) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = newsletterEmailInput.value;

            // Simple client-side validation
            if (!email.includes('@') || !email.includes('.')) {
                newsletterMessageElement.textContent = 'Please enter a valid email address';
                newsletterMessageElement.style.color = 'red';
                return;
            }

            // This 'fetch' call is for demonstration. You MUST replace
            // 'https://your-server.com/subscribe' with your actual backend endpoint.
            try {
                const response = await fetch('https://your-server.com/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    newsletterMessageElement.textContent = 'Thank you for subscribing!';
                    newsletterMessageElement.style.color = 'green';
                    newsletterEmailInput.value = ''; // Clear input field
                    // Store in localStorage
                    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                    if (!subscribers.includes(email)) { // Prevent duplicates
                        subscribers.push(email);
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                    }
                } else {
                    newsletterMessageElement.textContent = data.message || 'Subscription failed. Please try again.';
                    newsletterMessageElement.style.color = 'red';
                }
            } catch (error) {
                newsletterMessageElement.textContent = 'An error occurred. Please try again later.';
                newsletterMessageElement.style.color = 'red';
                console.error('Error subscribing:', error);
            }
        });
    }


    // --- Login Form Submission ---
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    if (loginForm && loginEmailInput && loginPasswordInput && loginModal) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            // Here you would typically send this to your server for authentication
            console.log('Login attempt:', email, password);

            // For demo purposes, just close the modal
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            loginForm.reset(); // Clear form fields
            alert('Login attempted (demo).'); // Indicate something happened
        });
    }

    // --- Register Form Submission ---
    const registerForm = document.getElementById('registerForm');
    const registerNameInput = document.getElementById('registerName');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const registerConfirmPasswordInput = document.getElementById('registerConfirmPassword');
    const registerAgeVerifyCheckbox = document.getElementById('registerAgeVerify');
    const registerSubscribeCheckbox = document.getElementById('registerSubscribe');

    if (registerForm && registerModal) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = registerNameInput?.value;
            const email = registerEmailInput?.value;
            const password = registerPasswordInput?.value;
            const confirmPassword = registerConfirmPasswordInput?.value;
            const ageVerified = registerAgeVerifyCheckbox?.checked;
            const subscribe = registerSubscribeCheckbox?.checked;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!ageVerified) {
                alert('You must be 21 or older to register.');
                return;
            }

            // Here you would send this to your server for user registration
            console.log('Registration:', { name, email, password, subscribe });

            // Store user data in localStorage (for demo only - NOT SECURE FOR PRODUCTION)
            localStorage.setItem('user', JSON.stringify({
                name,
                email,
                subscribed: subscribe
            }));

            // For demo purposes, just close the modal
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            registerForm.reset(); // Clear form fields
            alert('Registration successful (demo)!'); // Indicate something happened
        });
    }

    // --- Responsive adjustments ---
    function handleResize() {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.style.display = ''; // Reset display for larger screens
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on load to set initial state

    // --- Data capture examples (Analytics) ---
    // Track product views
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Ensure click is not on 'add to cart' or 'quick view' buttons within the card
            if (!e.target.classList.contains('add-to-cart') && !e.target.classList.contains('quick-view')) {
                const productName = this.querySelector('h3')?.textContent;
                console.log('Product viewed:', productName);
                // Send this data to your analytics platform (e.g., Google Analytics, custom logging)
                // analytics.track('Product View', { productName: productName });
            }
        });
    });

    // Track category clicks
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3')?.textContent;
            console.log('Category clicked:', categoryName);
            // Send this data to your analytics platform
            // analytics.track('Category Click', { categoryName: categoryName });
        });
    });

    // Initialize cart count on page load
    updateCartCount();
    updateCartModal(); // Also update cart display if it's meant to be visible on load (e.g., if cart modal is initially shown, though typically it's hidden)
});