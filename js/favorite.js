document.addEventListener("DOMContentLoaded", function () {
    displayFavoriteProducts();
});

function displayFavoriteProducts() {
    const favoritesContainer = document.querySelector(".item-cont"); // Ensure this class matches the HTML
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesContainer.innerHTML = ""; // Clear existing items

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites added yet.</p>";
        return;
    }

    favorites.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("fav-item");

        // Product Image
        const productImage = document.createElement("img");
        productImage.src = product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg";
        productImage.alt = `Image of ${product.title}`;
        productImage.classList.add("fav-image");

        // Trash Button to Remove from Favorites
        const trashButton = document.createElement("div");
        trashButton.classList.add("trash-button");
        trashButton.innerHTML = '<i class="bi bi-trash"></i>';
        trashButton.addEventListener("click", function () {
            removeFromFavorites(product.id);
        });

        // Add-to-Cart Button
        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart-button");
        addToCartBtn.textContent = "Add to cart";
        addToCartBtn.addEventListener("click", function () {
            addToCart(product);
        });

        // Container for Buttons
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("add-and-trash-container");
        actionContainer.appendChild(addToCartBtn);
        actionContainer.appendChild(trashButton);

        productElement.appendChild(productImage);
        productElement.appendChild(actionContainer);
        favoritesContainer.appendChild(productElement);
    });
}

function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(product => product.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavoriteProducts(); // Refresh the page after removing an item
}
