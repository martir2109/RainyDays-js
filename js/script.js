fetch("https://v2.api.noroff.dev/rainy-days")
.then(response => response.json()) // Convert response to JSON

// Global variable to store all fetched products
let allProducts = [];

// Select the product-line container
const productLine = document.querySelector(".product-line");

// Fetch all products from the API
async function fetchProducts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
          throw new Error("Failed to fetch products")};

        const data = await response.json();
        allProducts = data.data || []; // Store all products globally

        // Filter out empty objects or null values
        allProducts = allProducts.filter(product => product && product.title);

        // Display all products initially
        displayProducts(allProducts);

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to display products
function displayProducts(products) {
    // Clear the current product list
    productLine.innerHTML = "";

    // Append only valid products
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productLine.appendChild(productElement);
    });
}




function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  const productLink = document.createElement("a");
  productLink.href = `../html/product-page.html?id=${product.id}`;
  productLink.title = product.title;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
  productImage.style.backgroundImage = `url(${product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"})`;
  productImage.style.backgroundSize = "cover";
  productImage.style.backgroundPosition = "center";
  productImage.style.aspectRatio = "1 / 1"; //makes the container square

  imageContainer.appendChild(productImage);
  productLink.appendChild(imageContainer);
  productContainer.appendChild(productLink);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info-index");

  const title = document.createElement("h3");
  title.textContent = product.title;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${product.gender}`;

  const price = document.createElement("p");
  price.textContent = `${product.price}$ inkl. Mva`;

  productInfo.appendChild(title);
  productInfo.appendChild(gender);
  productInfo.appendChild(price);

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("add-and-favorite-container");

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart-button");
  addToCartBtn.textContent = "Add to cart";

  // Create favorite button
  const favoriteButton = document.createElement("div");
  favoriteButton.classList.add("favorite-button");
  favoriteButton.innerHTML = '<i class="bi bi-heart favorite"></i>';

  // Check if the product is already a favorite
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.some(fav => fav.id === product.id)) {
      favoriteButton.classList.add("favorited"); // Change appearance if already favorited
  }

  // Add event listener to favorite button
  favoriteButton.addEventListener("click", function () {
      toggleFavorite(product, favoriteButton);
  });

  actionContainer.appendChild(addToCartBtn);
  actionContainer.appendChild(favoriteButton);

  productContainer.appendChild(productInfo);
  productContainer.appendChild(actionContainer);

  // ✅ Add Event Listener to Add Product to Cart
  addToCartBtn.addEventListener("click", function () {
      addToCart(product);
  });

  return productContainer;
}



function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve current cart
    const productExists = cart.some(item => item.id === product.id);
    
    if (productExists) {
        cart = cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart to localStorage
    updateCartCount();  // Update cart count
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();  // Ensure cart count is updated when the page is loaded
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById("cart-qty-count").innerText = totalItems;
}





function toggleFavorite(product, buttonElement) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const productIndex = favorites.findIndex(fav => fav.id === product.id);
  const icon = buttonElement.querySelector("i"); // Get the heart icon inside the button

  if (productIndex === -1) {
      // Add to favorites
      favorites.push(product);
      buttonElement.classList.add("favorited");
      icon.classList.remove("bi-heart"); // Remove outlined heart
      icon.classList.add("bi-heart-fill"); // Add filled heart
  } else {
      // Remove from favorites
      favorites.splice(productIndex, 1);
      buttonElement.classList.remove("favorited");
      icon.classList.remove("bi-heart-fill"); // Remove filled heart
      icon.classList.add("bi-heart"); // Add outlined heart
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}



