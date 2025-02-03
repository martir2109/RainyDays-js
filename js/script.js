


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



// Select the product-line container
const productLine = document.querySelector(".product-line");

// Fetch all products from the API
async function fetchProducts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        let products = data.data || []; // Ensure products is an array

        // Filter out empty objects or null values
        products = products.filter(product => product && product.title);

        console.log("Final product count:", products.length); // Debugging

        // Clear any existing content
        productLine.innerHTML = "";

        // Append only valid products
        products.forEach((product) => {
            const productElement = createProductElement(product);
            productLine.appendChild(productElement);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
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
    productImage.style.height = "450px"; // Set height dynamically

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

    // Append elements to product info container
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

// Call the function to fetch and display products
fetchProducts();

  