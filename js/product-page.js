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
        // Fetch all products
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");  
        if (!response.ok) throw new Error("Failed to fetch products");

        // Parse the response data
        const data = await response.json();
        const allProducts = data.data || [];

        // Find the selected product by ID
        const product = allProducts.find(prod => prod.id === productId);

        if (!product) {
            throw new Error("Product not found");
        }

        console.log("Fetched Product:", product); // Debugging

        // This fetech the product details/ information: title, image, color, gender, price, descriptions and tags
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

    } catch (error) {
        console.error("Error fetching product:", error);

        //These messages display only id there is a error in fetching 
        document.getElementById("product-details").innerHTML = "Error fetching product details. Please try again later.";
        document.getElementById("description").textContent = "Error fetching description. Please try again later.";
        document.getElementById("color").textContent = "Error fetching color information. Please try again later.";
        document.getElementById("tags").textContent = "Error fetching tags. Please try again later.";
    }
}




