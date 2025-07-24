function updateCartNumber() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartNumberEls = document.querySelectorAll('.cart-number');

  cartNumberEls.forEach(el => {
    el.textContent = totalQuantity;
  });
}

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.add("hide");
    setTimeout(() => loader.style.display = "none", 300);
  }
});

