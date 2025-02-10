

// 🛒 Update Cart Count in Navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-qty-count").innerText = totalItems;
}

