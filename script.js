import { db } from './firebase.js';
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHomeProducts();
  loadHomepageMedia();
});

function loadHomeProducts() {
  const productsRef = collection(db, "products");
  const container = document.getElementById('home-products-container');

  getDocs(productsRef)
    .then(snapshot => {
      container.innerHTML = "";

      if (snapshot.empty) {
        container.innerHTML = "<p>No products available.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'home-products-card';
        card.innerHTML = `
          <div class="home-products-image">
            <img src="${data.image}" class="main-image" alt="${data.name}">
            <img src="${data.hoverImage}" class="hover-image" alt="Alternate view">
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
      container.innerHTML = "<p>Error loading products. Please try again later.</p>";
    });
}

async function loadHomepageMedia() {
  try {
    const mediaDoc = await getDoc(doc(db, "content", "homepageMedia"));
    if (mediaDoc.exists()) {
      const data = mediaDoc.data();
      const video = document.getElementById("videoSource");
      const image = document.getElementById("homeImage");

      if (data.videoUrl) video.src = data.videoUrl;
      if (data.imageUrl) image.src = data.imageUrl;

      document.getElementById("homeVideo").load();
    } else {
      console.warn("No homepage media found in Firestore.");
    }
  } catch (error) {
    console.error("Error loading homepage media:", error);
  }
}
