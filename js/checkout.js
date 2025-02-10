document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-items-container');  // Assume you have a container for cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart data from localStorage

    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    // Loop through the cart and display each product
    cart.forEach(product => {
        const productElement = createCartProductElement(product);
        cartContainer.appendChild(productElement);
    });
});

// Function to create a cart product element
function createCartProductElement(product) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("cart-product");

    const productImage = document.createElement("div");
    productImage.classList.add("cart-product-image");
    productImage.style.backgroundImage = `url(${product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"})`;
    productImage.style.backgroundSize = "cover";
    productImage.style.backgroundPosition = "center";
    productImage.style.height = "100px"; // Or any preferred height

    const productInfo = document.createElement("div");
    productInfo.classList.add("cart-product-info");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `${product.price}$ inkl. Mva`;

    productInfo.appendChild(title);
    productInfo.appendChild(price);

    // Optionally, you could add a "remove" button to remove items from the cart
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        removeProductFromCart(product.id);
    });

    productContainer.appendChild(productImage);
    productContainer.appendChild(productInfo);
    productContainer.appendChild(removeButton);

    return productContainer;
}

// Function to remove a product from the cart
function removeProductFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId); // Remove product by id
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage

    location.reload(); // Refresh the page to update the displayed cart
}
