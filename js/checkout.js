
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id === product.id);
  
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCartItems(); 
  });
  
  
  

// 🛍 Display Cart Items on Checkout Page
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items-container");
  
    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty</h2>";
        document.getElementById("cart-total").innerText = "0,- inkl mva";
        return;
    }
  
    let cartHTML = cart.map((product, index) => `
        <div class="product-cont">
            <div class="checkout-img-cont">
                <img src="${product.image.url}" alt="${product.title}" class="checkout-image">
            </div>
            <div class="product-info-check">
                <h2>${product.name}</h2>
                <p>Size: ${product.size || "N/A"}</p>
                <p>Amount: ${product.quantity}</p>
                <p class="checktout-price">Price: ${product.price * product.quantity},- inkl mva</p>
            </div>
            <div class="remove-cont">
                <button class="remove-item" onclick="removeItem(${index})">
                    Remove item <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join("");
  
    cartContainer.innerHTML = cartHTML;
    updateTotal();
  }
  
  // 🔥 Remove Item from Cart
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }
  
  // 💰 Update Total Price
  function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("cart-total").innerText = `${total},- inkl mva`;
  }
  
  // ✅ Clear Cart on Payment
  document.getElementById("pay-button").addEventListener("click", function () {
    localStorage.removeItem("cart");
    updateCartCount();
    displayCartItems();
  });
  
  
  
  
  