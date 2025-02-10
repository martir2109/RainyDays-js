
// Global variable to store all fetched products
let allProducts = [];

// Select the product-line container
const productLine = document.querySelector(".product-line");

// Fetch all products from the API
async function fetchProducts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        allProducts = data.data || []; // Store all products globally

        // Filter out empty objects or null values
        allProducts = allProducts.filter(product => product && product.title);

        console.log("Final product count:", allProducts.length); // Debugging

        // Display all products initially
        displayProducts(allProducts);

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to display products
function displayProducts(products) {
    // Clear the current product list
    productLine.innerHTML = "";

    // Append only valid products
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productLine.appendChild(productElement);
    });
}

function filterProductsByGender(gender) {
  let filteredProducts;

  // Correct mappings based on API data
  const genderMap = {
      "mens": "male",
      "womens": "female",
      "all": "all"
  };

  const mappedGender = genderMap[gender] || gender; // Map gender or fallback

  if (mappedGender === "all") {
      filteredProducts = allProducts;
  } else {
      filteredProducts = allProducts.filter(product => 
          product.gender.toLowerCase() === mappedGender
      );
  }

  console.log("Filtered Products:", filteredProducts); // Debugging
  displayProducts(filteredProducts); // Update UI with filtered products
}



function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  const productLink = document.createElement("a");
  productLink.href = `./html/product-page.html?id=${product.id}`; 
  productLink.title = product.title;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");
  productImage.style.backgroundImage = `url(${product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"})`;
  productImage.style.backgroundSize = "cover";
  productImage.style.backgroundPosition = "center";
  productImage.style.height = "450px"; 

  imageContainer.appendChild(productImage);
  productLink.appendChild(imageContainer);
  productContainer.appendChild(productLink);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info-index");

  const title = document.createElement("h3");
  title.textContent = product.title;

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${product.gender}`;

  const price = document.createElement("p");
  price.textContent = `${product.price}$ inkl. Mva`;

  productInfo.appendChild(title);
  productInfo.appendChild(gender);
  productInfo.appendChild(price);

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("add-and-favorite-container");

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart-button");
  addToCartBtn.textContent = "Add to cart";

  const favoriteButton = document.createElement("div");
  favoriteButton.classList.add("favorite-button");
  favoriteButton.innerHTML = '<i class="bi bi-heart favorite"></i>'; 

  actionContainer.appendChild(addToCartBtn);
  actionContainer.appendChild(favoriteButton);

  productContainer.appendChild(productInfo);
  productContainer.appendChild(actionContainer);

  // ✅ Add Event Listener to Add Product to Cart
  addToCartBtn.addEventListener("click", function () {
      addToCart(product);
  });

  return productContainer;
}



// Event Listener for gender filtering
document.addEventListener("DOMContentLoaded", function () {
    const genderFilter = document.getElementById("genderFilter");

    if (genderFilter) {
        genderFilter.addEventListener("click", function (event) {
            const target = event.target.closest("li"); // Ensure only `li` elements are targeted
            if (target) {
                const selectedGender = target.getAttribute("data-value");
                console.log("Selected gender:", selectedGender);

                // Now, filter the products based on selectedGender
                filterProductsByGender(selectedGender);
            }
        });
    }
});

// Fetch products when the page loads
fetchProducts();


  
  // Function to sort products from low to high and high to low when clicked
function sortProducts(order) {
  let sortedProducts = [...allProducts]; 

  if (order === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price); 
  } else if (order === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price); 
  }

  displayProducts(sortedProducts); 
}

// Event Listener for sorting
document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.getElementById("sortOptions");

  if (sortOptions) {
      sortOptions.addEventListener("click", function (event) {
          const target = event.target.closest("li"); 
          if (target) {
              const sortOrder = target.getAttribute("data-value");
              console.log("Sorting by:", sortOrder);
              sortProducts(sortOrder);
          }
      });
  }
});
