// Function to retrieve cart data from localStorage and display it on the cart page
const updateCartPage = () => {
  const cartContainer = document.querySelector('.cart-cover');
  if (!cartContainer) {
    console.error("Cart container not found!");
    return;
  }

  const subtotalElem = document.querySelector('.subtotal-price');
  if (!subtotalElem) {
    console.error("Subtotal element not found!");
    return;
  }

  // Retrieve cart data from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Clear the current cart HTML
  cartContainer.innerHTML = '';

  let subtotal = 0;

  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <p>No product in cart. <a href="products.html">Go to Products</a></p>
      </div>
    `;
    subtotalElem.textContent = '#0.00'; // Set subtotal to zero
    return; // Stop further execution since the cart is empty
  }

  // Loop through the cart items and create HTML for each
  cart.forEach(item => {
    const cartItemHTML = `
      <div class="cart-container-2" data-id="${item.id}">
        <div class="productandquantity">
          <div class="cart-product">
            <div class="cart-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-content">
              <p>${item.name}</p>
              <p>#${item.price.toFixed(2)}</p>
              <p>Size: ${item.size}</p>
            </div>
          </div>

          <div class="quantity-container-cart">
            <div class="quantity-flex">
              <span class="decrease" data-id="${item.id}">-</span>
              <span class="middle">${item.quantity}</span>
              <span class="increase" data-id="${item.id}">+</span>
            </div>
            <i class="fa-light fa-trash-can remove" data-id="${item.id}"></i>
          </div>
        </div>

        <div class="cart-total align-right">
          <p>#${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <hr>
    `;

    cartContainer.innerHTML += cartItemHTML;

    // Add item's total price to subtotal
    subtotal += item.price * item.quantity;
  });

  // Update the subtotal amount
  subtotalElem.textContent = `#${subtotal.toFixed(2)}`;

  // Update the cart number
  updateCartNumber();

  // Re-attach event listeners
  attachEventListeners();
};


// Function to update the cart number in the UI
const updateCartNumber = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartNumberElem = document.querySelector('.cart-number'); // Make sure you have this element in your HTML

    if (!cartNumberElem) {
        console.error("Cart number element not found!");
        return;
    }

    // Calculate total number of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart number in the UI, set to zero if the cart is empty
    cartNumberElem.textContent = totalItems > 0 ? totalItems : '0';
};


// Function to attach event listeners
const attachEventListeners = () => {
  const increaseButtons = document.querySelectorAll('.increase');
  const decreaseButtons = document.querySelectorAll('.decrease');
  const removeButtons = document.querySelectorAll('.remove');

  console.log("Attaching event listeners");

  // Remove existing listeners (if any) to avoid multiple triggers
  increaseButtons.forEach(button => {
    button.removeEventListener('click', increaseQuantity);
    button.addEventListener('click', increaseQuantity);
  });

  decreaseButtons.forEach(button => {
    button.removeEventListener('click', decreaseQuantity);
    button.addEventListener('click', decreaseQuantity);
  });

  removeButtons.forEach(button => {
    button.removeEventListener('click', removeProduct);
    button.addEventListener('click', removeProduct);
  });
};

// Logic for increasing/decreasing quantity and updating cart
const increaseQuantity = (e) => {
  const productId = e.target.dataset.id;
  console.log('Increase button clicked, ID:', productId);
  updateCartQuantity(productId, 1);

};

const decreaseQuantity = (e) => {
  const productId = e.target.dataset.id;
  console.log('Decrease button clicked, ID:', productId);
  updateCartQuantity(productId, -1);
};

// Function to update quantity and prevent it from dropping below 1
const updateCartQuantity = (productId, change) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Ensure both productId and cartItem.id are compared as strings
  const cartItem = cart.find(item => String(item.id) === String(productId));

  // Log the productId from the button and the cart item's id
  console.log('Product ID:', productId, 'Cart Item ID:', cartItem ? cartItem.id : 'Not found');

  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity < 1) cartItem.quantity = 1;  // Prevent going below 1
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPage();
  } else {
    console.error("Cart item not found for productId:", productId);
  }
};


// Remove product from cart
const removeProduct = (e) => {
  const productId = e.target.dataset.id;
  console.log('Remove button clicked, ID:', productId);
  removeFromCart(productId);
};

// Function to remove the product entirely from the cart
const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Remove the product by comparing both as strings
  cart = cart.filter(item => String(item.id) !== String(productId));

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart page to reflect the changes
  updateCartPage();

  updateCartNumber();
};


// Attach event listeners only when the cart page is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Check if current page has cart container
  if (document.querySelector('.cart-cover')) {
    updateCartPage();
  }
});

