import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", loadHomeProducts);

function loadHomeProducts() {
  const productsRef = collection(db, "products");

  getDocs(productsRef)
    .then(snapshot => {
      const container = document.getElementById('home-products-container');
      container.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
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
          window.location.href = `product-page.html?id=${doc.id}`;
        });
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
}


