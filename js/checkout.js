document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();  // Load cart items when checkout page loads
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotalElement = document.getElementById("cart-total");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear the container before displaying
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.textContent = "0,- inkl mva";
        return;
    }

    let total = 0;

    cart.forEach(product => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        // Calculate total price
        const itemTotalPrice = product.price * product.quantity;
        total += itemTotalPrice;

        itemElement.innerHTML = `
            <div class="cart-item-content">
                <img src="${product.image.url}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.title}</h3>
                    <p>Price: ${product.price}$</p>
                    <p>Quantity: <span class="quantity">${product.quantity}</span></p>
                    <button class="remove-item-btn" data-id="${product.id}">Remove</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    // Update total price
    cartTotalElement.textContent = `${total}$ inkl mva`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(this.dataset.id);
        });
    });
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId); // Remove the item
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    loadCartItems(); // Reload the cart
}
