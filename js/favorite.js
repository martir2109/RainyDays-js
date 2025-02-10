document.addEventListener('DOMContentLoaded', function () {
    const favoritesContainer = document.querySelector('.item-cont');  // Container where we’ll display favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];  // Retrieve favorites from localStorage

    // If no favorites, display a message
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>Your favorites list is empty!</p>";
        return;
    }

    // Loop through the favorites and display them
    favorites.forEach(product => {
        const favoriteElement = createFavoriteElement(product);
        favoritesContainer.appendChild(favoriteElement);
    });
});

// Function to create an element for a favorite product
function createFavoriteElement(product) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("fav-item");

    const productImage = document.createElement("img");
    productImage.classList.add("fav-image");
    productImage.src = product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg";  // Fallback image
    productImage.alt = product.title;

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("add-and-trash-container");

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.textContent = "Add to cart";

    const trashButton = document.createElement("div");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="bi bi-trash"></i>';

    actionContainer.appendChild(addToCartButton);
    actionContainer.appendChild(trashButton);

    productContainer.appendChild(productImage);
    productContainer.appendChild(actionContainer);

    // Event listener for removing from favorites
    trashButton.addEventListener("click", function () {
        removeFromFavorites(product.id);  // Remove product from favorites by ID
    });

    // Event listener for adding the product to the cart
    addToCartButton.addEventListener("click", function () {
        addToCart(product);  // Add to cart functionality (you already have this implemented)
    });

    return productContainer;
}

// Function to remove a product from favorites
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(product => product.id !== productId);  // Remove the product from the favorites list
    localStorage.setItem('favorites', JSON.stringify(favorites));  // Update localStorage with new favorites

    location.reload();  // Refresh the page to update the favorites list
}

function createProductElement(product) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("products-container");

    const productLink = document.createElement("a");
    productLink.href = `./html/product-page.html?id=${product.id}`; 
    productLink.title = product.title;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    productImage.style.backgroundImage = `url(${product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"})`;
    productImage.style.backgroundSize = "cover";
    productImage.style.backgroundPosition = "center";
    productImage.style.height = "450px"; 

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

    const favoriteButton = document.createElement("div");
    favoriteButton.classList.add("favorite-button");
    favoriteButton.innerHTML = '<i class="bi bi-heart favorite"></i>';

    // Add Event Listener to favorite button
    favoriteButton.addEventListener("click", function () {
        addToFavorites(product);  // Add the product to favorites
    });

    actionContainer.appendChild(addToCartBtn);
    actionContainer.appendChild(favoriteButton);

    productContainer.appendChild(productInfo);
    productContainer.appendChild(actionContainer);

    // ✅ Add Event Listener to Add Product to Cart
    addToCartBtn.addEventListener("click", function () {
        addToCart(product);  // Add product to cart when clicked
    });

    return productContainer;
}
