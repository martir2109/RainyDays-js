// Store all the fetched products globally
let allProducts = [];

// Selects the product-line container
const productLine = document.querySelector(".product-line");

// Fetch all products from the API with error handling
async function fetchProducts() {
  const errorMessageDiv = document.getElementById("error-message");

  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    allProducts = data.data || [];

    allProducts = allProducts.filter((product) => product && product.title);

    if (allProducts.length === 0) {
      errorMessageDiv.style.display = "block";
      errorMessageDiv.textContent = "No products available.";
    } else {
      errorMessageDiv.style.display = "none";
      errorMessageDiv.textContent = "";
      displayProducts(allProducts);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent =
      "Something went wrong while loading products. Please try again.";
  }
}

// Display products
function displayProducts(products) {
  productLine.innerHTML = "";

  products.forEach((product) => {
    const productElement = createProductElement(product);
    productLine.appendChild(productElement);
  });
}

//Product card
function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  const productLink = document.createElement("a");
  productLink.href = `product-page/index.html?id=${product.id}`;
  productLink.title = product.title;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
  productImage.style.backgroundImage = `url(${
    product.image.url ||
    "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"
  })`;
  productImage.style.backgroundSize = "cover";
  productImage.style.backgroundPosition = "center";
  productImage.style.aspectRatio = "1 / 1";

  imageContainer.appendChild(productImage);
  productLink.appendChild(imageContainer);
  productContainer.appendChild(productLink);

  //display the product information
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info-index");

  const title = document.createElement("h3");
  title.textContent = product.title;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${product.gender}`;

  const price = document.createElement("p");
  price.textContent = `${product.price}$ incl. Taxes`;

  productInfo.appendChild(title);
  productInfo.appendChild(gender);
  productInfo.appendChild(price);

  //Buttons - add to card and favorites
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
  if (favorites.some((fav) => fav.id === product.id)) {
    favoriteButton.classList.add("favorited");
  }

  // AddEventListener to favorite button
  favoriteButton.addEventListener("click", function () {
    toggleFavorite(product, favoriteButton);
  });

  actionContainer.appendChild(addToCartBtn);
  actionContainer.appendChild(favoriteButton);

  productContainer.appendChild(productInfo);
  productContainer.appendChild(actionContainer);

  // AddEventListener to Add Product to Cart
  addToCartBtn.addEventListener("click", function () {
    addToCart(product);
  });

  return productContainer;
}

//Handling the cart storage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productExists = cart.some((item) => item.id === product.id);

  if (productExists) {
    cart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

//update the cart count in navbar
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cart-qty-count").innerText = totalItems;
}

//Toggle favorite - favorited or not favorited
function toggleFavorite(product, buttonElement) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const productIndex = favorites.findIndex((fav) => fav.id === product.id);
  const icon = buttonElement.querySelector("i");

  if (productIndex === -1) {
    // Add to favorites
    favorites.push(product);
    buttonElement.classList.add("favorited");
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
  } else {
    // Remove from favorites
    favorites.splice(productIndex, 1);
    buttonElement.classList.remove("favorited");
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
