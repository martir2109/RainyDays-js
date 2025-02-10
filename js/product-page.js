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
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
  
        if (!response.ok) {
            throw new Error("Product not found");
        }
  
        const product = await response.json();
        console.log(product); // Log the product data to check the structure
  
        // Update the product page with the fetched product details
        const productTitle = document.getElementById("product-page-title");
        const productImage = document.getElementById("product-page-image");
        const productDetails = document.getElementById("product-details");
        const description = document.getElementById("description");
        const color = document.getElementById("color");
        const tags = document.getElementById("tags");
  
        if (productTitle && productImage && productDetails) {
            productTitle.textContent = product.title || "No title available";
            productImage.src = product.image?.url || "No image available";
            productDetails.innerHTML = `
                <p>Color: ${product.color || "No color information"}</p>
                <p>Price: ${product.price ? product.price + "$ inkl. Mva" : "Price not available"}</p>
                <p>Description: ${product.description || "No description available"}</p>
            `;
        } else {
            console.error("Product page elements not found.");
        }
  
        // Handle the product information section (Description, Color, Tags)
        if (description) {
            description.textContent = product.description || "Description not available";
        }
  
        if (color) {
            color.textContent = product.color || "Color information not available";
        }
  
        if (tags) {
            tags.textContent = product.tags && product.tags.length > 0 ? product.tags.join(", ") : "No tags available";
        }
  
    } catch (error) {
        console.error("Error fetching product:", error);
  
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
    }
  }
  
