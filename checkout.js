function formatPrice(n) {
  return n.toLocaleString();
}

const deliveryFees = {
  Lekki: 3000,
  Ikeja: 2000,
  Ajah: 3500,
  Surulere: 2500,
};

function loadCheckoutSummary() {
  const summaryContainer = document.getElementById("summaryItems");
  const totalEl = document.getElementById("grandTotal");
  const deliveryFeeEl = document.getElementById("deliveryFeeDisplay");
  const subtotalEl = document.getElementById("subtotalDisplay");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    if (subtotalEl) subtotalEl.textContent = "0";
    if (deliveryFeeEl) deliveryFeeEl.textContent = "0";
    return;
  }

  summaryContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const itemHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="details">
        <p><strong>${item.name}</strong></p>
        <p>Size: ${item.size}</p>
        <p>Qty: ${item.quantity}</p>
        <p>Price: ₦${formatPrice(item.price * item.quantity)}</p>
      </div>
    `;

    subtotal += item.price * item.quantity;
    itemDiv.innerHTML = itemHTML;
    summaryContainer.appendChild(itemDiv);
  });

  // Show initial subtotal before area selection
  if (subtotalEl) subtotalEl.textContent = `₦${formatPrice(subtotal)}`;

  const selectedArea = document.getElementById("deliveryArea")?.value;
  const deliveryFee = deliveryFees[selectedArea] || 0;

  if (deliveryFeeEl) {
    deliveryFeeEl.textContent = deliveryFee ? `₦${formatPrice(deliveryFee)}` : "-";
  }

  totalEl.textContent = `₦${formatPrice(subtotal + deliveryFee)}`;
}

// When area changes, recalculate total
const areaSelect = document.getElementById("deliveryArea");
if (areaSelect) {
  areaSelect.addEventListener("change", loadCheckoutSummary);
}

window.addEventListener("DOMContentLoaded", loadCheckoutSummary);

