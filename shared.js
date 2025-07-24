function updateCartNumber() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartNumberEls = document.querySelectorAll('.cart-number');

  cartNumberEls.forEach(el => {
    el.textContent = totalQuantity;
  });
}

// Run when DOM is fully loaded (safer than window.load)
document.addEventListener("DOMContentLoaded", () => {
  updateCartNumber(); // ✅ Make sure this runs on all pages
});

// Optional loader logic (only if you're using a page loader)
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.add("hide");
    setTimeout(() => loader.style.display = "none", 300);
  }
});
