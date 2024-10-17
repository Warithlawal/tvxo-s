document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromUrl();
    const selectedProduct = allProducts.find(product => product.id === productId);

    if (selectedProduct) {
        updateProductPage(selectedProduct);

        // Initialize quantity
        const quantityElem = document.getElementById('quantity');
        let quantity = parseInt(quantityElem.textContent, 10); // Initialize quantity based on the element's text content
        const unitPrice = selectedProduct.price; // Assuming price is available on the selected product

        const increaseButton = document.querySelector('.add'); // "+" button
        const decreaseButton = document.querySelector('.sub'); // "-" button

        // Function to update price based on quantity
        const updatePrice = () => {
            const totalPrice = unitPrice * quantity;
            document.getElementById('product-price').textContent = `₦${totalPrice.toLocaleString()}`; // Update displayed price
        };

        // Event listener for increase button
        if (increaseButton) {
            increaseButton.addEventListener('click', () => {
                quantity += 1;  // Increase quantity
                quantityElem.textContent = quantity;  // Update the displayed quantity
                updatePrice();  // Update the price based on new quantity
            });
        }

        // Event listener for decrease button
        if (decreaseButton) {
            decreaseButton.addEventListener('click', () => {
                if (quantity > 1) {  // Ensure quantity doesn't go below 1
                    quantity -= 1;  // Decrease quantity
                    quantityElem.textContent = quantity;  // Update the displayed quantity
                    updatePrice();  // Update the price based on new quantity
                }
            });
        }

        // Attach event listener to "Add to Cart" button
        const addToCartButton = document.getElementById('add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                // Pass the quantity to the addToCart function
                addToCart(selectedProduct, quantity);
            });
        }
    } else {
        console.error('Product not found!');
    }
});

// Function to get the product ID from the URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Function to update the product page with selected product details
function updateProductPage(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `₦${product.price.toLocaleString()}`;
    document.getElementById('main-product-img').src = product.image1;

    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = '';
    const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = product.name;
        imgElement.addEventListener('click', () => {
            document.getElementById('main-product-img').src = image;
        });
        thumbnailContainer.appendChild(imgElement);
    });
}

// Function to add the selected product to the cart
function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If the product exists, increase its quantity by the amount added
        existingProduct.quantity += quantity;
    } else {
        // If the product does not exist, add it to the cart with the specified quantity
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image1, // Use the main image for the cart
            quantity: quantity,
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show message in the DOM
    displayCartMessage('Item added to cart successfully!');
}

// Function to display the message
function displayCartMessage(message) {
    const messageElem = document.getElementById('cart-message');
    messageElem.textContent = message;   // Set the message text
    messageElem.style.display = 'block'; // Show the message
    
    // Optional: Hide the message after 3 seconds
    setTimeout(() => {
        messageElem.style.display = 'none';
    }, 3000);

    updateCartNumber(); // Update cart number in the header or wherever displayed
}
