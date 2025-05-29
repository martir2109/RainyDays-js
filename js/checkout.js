loadCartItems();
checkCartAndUpdatePayButton();

// Add event listener to the Pay button
const payButton = document.getElementById("pay-button");
if (payButton) {
  payButton.addEventListener("click", function () {
    // Empty the cart when the pay button has been clicked
    clearCart();
  });
}

//load cart items
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalElement = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  //if the cart is empty show this message
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.textContent = "0,- incl. Taxes";
    return;
  }

  let total = 0;

  cart.forEach((product) => {
    //div created for each product in the checkout
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const itemTotalPrice = product.price * product.quantity;
    total += itemTotalPrice;

    //for each of the products, HTML is created dynamically
    itemElement.innerHTML = `
            <div class="product-cont">
                <div class="checkout-img-cont">
                    <img src="${product.image.url}" alt="${product.title}" class="checkout-image">
                </div>
                <div class="product-info-check">
                    <h3 class="product-title-check">${product.title}</h3>
                    <br/>
                    <br/>
                    <p class="p-checkout">Price: ${product.price}$</p>
                    <br/>

                    <div class="quantity-controls">
                     <p class="p-checkout">Quantity: 
                        <i class="bi bi-file-minus decrease-qty" data-id="${product.id}"></i>
                        <span class="quantity" data-id="${product.id}">${product.quantity}</span>
                        <i class="bi bi-file-plus increase-qty" data-id="${product.id}"></i>
                        </p>
                    </div>

                    <div class="remove-cont">
                        <button class="remove-item" data-id="${product.id}">Remove item <i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        `;

    cartItemsContainer.appendChild(itemElement);
  });

  //updates the cart total with only 2 decimal places
  cartTotalElement.textContent = `${total.toFixed(2)}$ incl. Taxes`;

  //AddEventListener for increase quanity +
  document.querySelectorAll(".increase-qty").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartQuantity(button.dataset.id, 1);
    });
  });

  //AddEventListener for decrease quanity -
  document.querySelectorAll(".decrease-qty").forEach((button) => {
    button.addEventListener("click", function () {
      updateCartQuantity(this.dataset.id, -1);
    });
  });

  //AddEventListener for remove item
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      removeFromCart(this.dataset.id);
    });
  });
}

//update the cart quantity
function updateCartQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map((item) => {
    if (item.id === productId) {
      let newQuantity = item.quantity + change;
      if (newQuantity < 1) return item;
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
}

// Function to check if the cart is empty
function checkCartAndUpdatePayButton() {
  const payButton = document.getElementById("pay-button");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // If the cart is empty, disable the Pay button
  if (cart.length === 0) {
    payButton.disabled = true;
  } else {
    payButton.disabled = false;
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
  checkCartAndUpdatePayButton();
}

// Clear all items from the cart
function clearCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Saves the cart data temporarily for order confirmation
  sessionStorage.setItem("order", JSON.stringify(cart));

  // Clear the cart
  localStorage.removeItem("cart");

  loadCartItems();
  checkCartAndUpdatePayButton();

  // Redirect to the confirmation page
  window.location.href = "confirmation/index.html";
}
