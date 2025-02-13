document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
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
            <div class="product-cont">
            <div class="checkout-img-cont">
                <img src="${product.image.url}" alt="${product.title}" class="checkout-image">
                </div>
                <div class="product-info-check">
                    <h3 class="product-title-check">${product.title}</h3>
                    <br/>
                    <p class="p-checkout">Price: ${product.price}$</p>
                    <p class="p-checkout">Quantity: <span class="quantity">${product.quantity}</span></p>
                    <div class="remove-cont">
                    <button class="remove-item" data-id="${product.id}">Remove item <i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    // Update total price
    cartTotalElement.textContent = `${total.toFixed(2)}$ inkl mva`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
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
