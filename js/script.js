
fetch("https://v2.api.noroff.dev/rainy-days/b8b528fc-6c60-41f6-a5a9-9a8b27a9482a")
.then(response => response.json()) // Convert response to JSON
.then(data => console.log(data)) // Log the data to the console


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



function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("products-container");

  const productLink = document.createElement("a");
  productLink.href = `./html/product-page.html?id=${product.id}`;  // This line dynamically sets the link
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


// 🛒 Update Cart Count in Navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-qty-count").innerText = totalItems;
}

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

      if (productTitle && productImage && productDetails) {
          productTitle.textContent = product.title || "No title available";
          productImage.src = product.image?.url || "fallback-image.jpg"; // Use optional chaining
          productDetails.innerHTML = `
              <p>Color: ${product.color || "No color information"}</p>
              <p>Price: ${product.price ? product.price + "$ inkl. Mva" : "Price not available"}</p>
              <p>Description: ${product.description || "No description available"}</p>
          `;
      } else {
          console.error("Product page elements not found.");
      }
  } catch (error) {
      console.error("Error fetching product:", error);
      const productDetails = document.getElementById("product-details");
      if (productDetails) {
          productDetails.innerHTML = "Error fetching product details. Please try again later.";
      }
  }
}
