//product page

document.addEventListener('DOMContentLoaded', function () {
  const productId = new URLSearchParams(window.location.search).get('id');
  
  console.log("Product ID from URL:", productId);

  if (!productId) {
      console.error("Product ID is missing in the URL.");
      // Optionally, display a message to the user
      document.getElementById("product-details").innerHTML = "Product not found.";
  } else {
      fetchProductById(productId);
  }
});

async function fetchProductById(productId) {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");  // Fetch all products
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const allProducts = data.data || [];

        // 🔍 Find the selected product by ID
        const product = allProducts.find(prod => prod.id === productId);

        if (!product) {
            throw new Error("Product not found");
        }

        console.log("Fetched Product:", product); // Debugging

        // 🖼️ Update the product page with the fetched details
        document.getElementById("product-page-title").textContent = product.title || "No title available";
        document.getElementById("product-page-image").src = product.image?.url || "../images/logo/rainydays-logo.png";
        document.getElementById("product-details").innerHTML = `
            <p>Color: ${product.color || "No color information"}</p>
            <p>Price: ${product.price ? product.price + "$ inkl. Mva" : "Price not available"}</p>
            <p>Description: ${product.description || "No description available"}</p>
        `;

    } catch (error) {
        console.error("Error fetching product:", error);
        document.getElementById("product-details").innerHTML = "Error fetching product details. Please try again later.";
    }
}

        // Display error messages in the product-information-cont section
        const description = document.getElementById("description");
        const color = document.getElementById("color");
        const tags = document.getElementById("tags");
  
        if (description) {
            description.textContent = "Error fetching description. Please try again later.";
        }
  
        if (color) {
            color.textContent = "Error fetching color information. Please try again later.";
        }
  
        if (tags) {
            tags.textContent = "Error fetching tags. Please try again later.";
        }
  
        // Optionally, also display a general message in the product-details area
        const productDetails = document.getElementById("product-details");
        if (productDetails) {
            productDetails.innerHTML = "Error fetching product details. Please try again later.";
        }

  

