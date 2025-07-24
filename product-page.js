import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// DOM elements
const nameEl = document.getElementById('productName');
const priceEl = document.getElementById('productPrice');
const mainImageEl = document.getElementById('mainImage');
const hoverImageEl = document.getElementById('hoverImage');
const sizeListEl = document.getElementById('sizeList');
const decreaseBtn = document.querySelector('.decrease');
const increaseBtn = document.querySelector('.increase');
const countEl = document.querySelector('.count');
const addToCartBtn = document.querySelector('.product-btn');

let quantity = 1;

function updateCount() {
  countEl.textContent = quantity;
  decreaseBtn.classList.toggle('disabled', quantity === 1);
}

async function loadProduct() {
  if (!productId) {
    nameEl.textContent = "Product not found.";
    return;
  }

  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data();

      nameEl.textContent = product.name;
      priceEl.textContent = `₦${product.price.toLocaleString()}`;
      mainImageEl.src = product.image;
      hoverImageEl.src = product.hoverImage || product.image;

      if (product.sizes && Array.isArray(product.sizes)) {
        sizeListEl.innerHTML = '';
        product.sizes.forEach(size => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#">${size}</a>`;
          sizeListEl.appendChild(li);
        });
      }

    } else {
      nameEl.textContent = "Product not found.";
    }

  } catch (err) {
    console.error("Failed to load product:", err);
    nameEl.textContent = "Error loading product.";
  }
}

loadProduct();
updateCount();

// Size selector
sizeListEl.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    sizeListEl.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// Quantity controls
increaseBtn.addEventListener('click', () => {
  quantity++;
  updateCount();
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    updateCount();
  }
});

addToCartBtn.addEventListener('click', () => {
  const selectedSize = document.querySelector('.sizes-btn a.active')?.textContent;
  if (!selectedSize) {
    showNotification("Please select a size.");
    return;
  }

  const cartItem = {
    id: productId,
    name: nameEl.textContent,
    price: parseInt(priceEl.textContent.replace(/[^0-9]/g, '')),
    image: mainImageEl.src,
    size: selectedSize,
    quantity: quantity
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification("Product added to cart");
  updateCartNumber();
});

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hidden");
  }, 2500);
}


