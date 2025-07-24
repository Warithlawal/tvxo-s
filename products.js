import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupCategoryFilters();
});

function loadProducts() {
  const productsRef = collection(db, "products");

  getDocs(productsRef)
    .then(snapshot => {
      allProducts = []; // Reset
      snapshot.forEach(doc => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });
      displayProducts(allProducts); // Show all by default
    })
    .catch(error => console.error("Error loading products:", error));
}

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found for this category.</p>";
    return;
  }

  products.forEach(data => {
    const card = document.createElement('div');
    card.className = 'home-products-card';
    card.innerHTML = `
      <div class="home-products-image">
        <img src="${data.image}" class="main-image">
        <img src="${data.hoverImage}" class="hover-image">
      </div>
      <div class="home-products-details">
        <p class="home-products-name">${data.name}</p>
        <p class="home-products-price">₦${Number(data.price).toLocaleString()}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `product-page.html?id=${data.id}`;
    });
    container.appendChild(card);
  });
}
function setupCategoryFilters() {
  const categoryLinks = document.querySelectorAll(".category-list a");

  categoryLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.getAttribute("data-category");

      // Remove .active from all
      categoryLinks.forEach(l => l.classList.remove("active"));
      // Add to clicked
      link.classList.add("active");

      // Filter products
      if (category === "All") {
        displayProducts(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        displayProducts(filtered);
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleCategory");
  const categoryList = document.getElementById("categoryList");

  toggleBtn.addEventListener("click", () => {
   categoryList.classList.toggle("show");
  toggleBtn.classList.toggle("active");
  });
});


