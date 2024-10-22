const homeProducts = [{
	id: 1,
    name: 'TVXO Motivated Red',
    image: 'images/Cap1.jpg',
    price: 60000
  },
  {
  	id: 2,
    name: 'TVXO Summercation',
    image: 'images/Beach-shop1.jpg',
    price: 60000
  },
  {
  	id: 3,
    name: 'TVXO Bennie',
    image: 'images/Bennie-brown1.jpg',
    price: 60000
  },
  {
  	id: 4,
    name: 'TVXO Crop-top',
    image: 'images/Crop-top1.jpg',
    price: 60000
  }];

let homeProductsHTML = '';

homeProducts.forEach((homeProducts) => {
	homeProductsHTML += `
		<div class="home-product-content">
			<div class="home-product-display">
				<img src="${homeProducts.image}">
			</div>
			<div class="product-details-spacing">
				<p>${homeProducts.name}</p>
				
			</div>
		</div>
	`;
})

document.querySelector('.js-homeProduct').innerHTML = homeProductsHTML;




let firstIndex = 0;

function automaticSlide() {
    setTimeout(automaticSlide, 2000);  // Corrected 'setTimeout'
    
    const img = document.querySelectorAll('.images');
    
    // Hide all images
    for (let pics = 0; pics < img.length; pics++) {
        img[pics].style.display = 'none';
    }
    
    // Increment the index
    firstIndex++;
    
    // Reset the index if it exceeds the number of images
    if (firstIndex > img.length) {
        firstIndex = 1;
    }
    
    // Display the current image
    img[firstIndex - 1].style.display = "block";
}

// Start the automatic slider
setTimeout(automaticSlide, 2000);


const menu = document.getElementById('menu'); // The menu container
const menuOpen = document.getElementById('menu_open'); // The bars icon
const menuClose = document.getElementById('menu_close'); // The close icon

// Add click event listener to the bars icon to show the menu
menuOpen.addEventListener('click', () => {
  menu.classList.toggle('show'); // Toggle the show class to open/close the menu
});

// Add click event listener to the close icon to hide the menu
menuClose.addEventListener('click', () => {
  menu.classList.remove('show'); // Remove the show class to hide the menu
});


const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider-content img'); // Targeting images correctly
const bottom = document.querySelector('.bottom');

let slideNumber = 1;
const length = images.length;

// Create navigation dots
for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    div.className = "button";
    bottom.appendChild(div);
}

const buttons = document.querySelectorAll('.button');
buttons[0].style.backgroundColor = 'black'; // First button is black by default

// Reset background color of all buttons
const resetBg = () => {
    buttons.forEach((button) => {
        button.style.backgroundColor = "transparent"; // Change to transparent or default state
    });
};

// Reset zoom for all images
const resetZoom = () => {
    images.forEach((img) => {
        img.classList.remove('zoom'); // Remove zoom class from all images
    });
};

// Auto-slide logic
const nextSlide = () => {
    if (slideNumber >= length) {
        getFirstSlide(); // Reset to the first slide if the slideNumber exceeds length
    } else {
        slider.style.transform = `translateX(-${slideNumber * 100}%)`; // Move to the next slide
        slideNumber++;
    }
};

// Move back to the first slide
const getFirstSlide = () => {
    slider.style.transform = `translateX(0px)`; // Reset transform
    slideNumber = 1;
};

// Change color of navigation dots and add zoom effect
const changeColor = () => {
    resetBg();
    resetZoom(); // Remove zoom from all images
    buttons[slideNumber - 1].style.backgroundColor = "black"; // Change current dot color to black
    images[slideNumber - 1].classList.add('zoom'); // Add zoom to the active image
};

// Auto-slide every 3 seconds
let autoSlideInterval = setInterval(() => {
    nextSlide();
    changeColor();
}, 3000);  // Change slide every 3 seconds


    updateCartNumber(); // Update the cart number when the page loads









