


  //hamburger menu/ bi-list
  const hamMenu = document.querySelector('.bi-list');
  const offScreenMenu = document.querySelector('.off-screen-menu');

  hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
  })


  //filtering dropdown
  const filterMenu = document.querySelector('.filter-container');
  const offScreenFilter = document.querySelector('.off-screen-filter');

  filterMenu.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
    offScreenFilter.classList.toggle('active');
  })



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




// Function to create a product element
function createProductElement(product) {
    // Create the main product container
    const productContainer = document.createElement("div");
    productContainer.classList.add("products-container");

    // Create product link
    const productLink = document.createElement("a");
    productLink.href = `./html/product-page.html?id=${product.id}`;
    productLink.title = product.title;

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    // Create product image div
    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    productImage.style.backgroundImage = `url(${product.image.url || "https://static.noroff.dev/api/rainy-days/9-thunderbolt-jacket.jpg"})`;
    productImage.style.backgroundSize = "cover";
    productImage.style.backgroundPosition = "center";
    productImage.style.height = "450px"; 

    // Append image div inside image container
    imageContainer.appendChild(productImage);
    productLink.appendChild(imageContainer);
    productContainer.appendChild(productLink);

    // Create product info section
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info-index");

    const title = document.createElement("h2");
    title.textContent = product.title;

    const gender = document.createElement("p");
    gender.textContent = `Gender: ${product.gender}`;

    const price = document.createElement("p");
    price.textContent = `${product.price}$ inkl. Mva`;

    // Append elements to product infox container
    productInfo.appendChild(title);
    productInfo.appendChild(gender);
    productInfo.appendChild(price);

    // Create add-to-cart and favorite button container
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("add-and-favorite-container");

    // Add to cart button
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart-button");
    addToCartBtn.textContent = "Add to cart";

    // Favorite button
    const favoriteButton = document.createElement("div");
    favoriteButton.classList.add("favorite-button");
    favoriteButton.innerHTML = '<i class="bi bi-heart favorite"></i>'; 

    // Append buttons to container
    actionContainer.appendChild(addToCartBtn);
    actionContainer.appendChild(favoriteButton);

    // Append everything to product container
    productContainer.appendChild(productInfo);
    productContainer.appendChild(actionContainer);

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


  
  //fetching the API endpoint for rainy days - get all products
    fetch("https://v2.api.noroff.dev/rainy-days")
        .then(response => response.json()) // Convert response to JSON
        .then(data => console.log(data)) // Log the data to the console