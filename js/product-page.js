document.addEventListener('DOMContentLoaded', function () {
  const productId = new URLSearchParams(window.location.search).get('id');
  
  console.log("Product ID from URL:", productId);

  if (!productId) {
      console.error("Product ID is missing in the URL.");
      document.getElementById("product-details").innerHTML = "Product not found.";
  } else {
      fetchProductById(productId);
  }
});

async function fetchProductById(productId) {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const allProducts = data.data || [];
        const product = allProducts.find(prod => prod.id === productId);

        if (!product) {
            throw new Error("Product not found");
        }

        // Populate product details
        document.getElementById("product-page-title").textContent = product.title || "No title available";
        document.getElementById("product-page-image").src = product.image?.url || "../images/logo/rainydays-logo.png";
        document.getElementById("product-details").innerHTML = `
            <p>Color: ${product.baseColor || "No color information"}</p>
            <p>Gender: ${product.gender || "No gender information"}</p>
            <br/>
            <p>Price: ${product.price ? product.price + "$ inkl. Mva" : "Price not available"}</p>
        `;
        document.getElementById("description").textContent = product.description || "No description available";
        document.getElementById("tags").textContent = product.tags?.length ? product.tags.join(", ") : "No tags available";

        document.querySelector(".product-add-to-cart-button").addEventListener("click", function () {
            addToCart(product);
        });

    } catch (error) {
        console.error("Error fetching product:", error);
        document.getElementById("product-details").innerHTML = "Error fetching product details. Please try again later.";
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 

    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartCount(); 
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    const cartQtyElement = document.getElementById("cart-qty-count");
    if (cartQtyElement) {
        cartQtyElement.innerText = totalItems; 
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);




