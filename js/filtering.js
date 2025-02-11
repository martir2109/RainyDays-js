 //hamburger menu/ bi-list
 const hamMenu = document.querySelector('.bi-list');
 const offScreenMenu = document.querySelector('.off-screen-menu');

 hamMenu.addEventListener('click', () => {
   hamMenu.classList.toggle('active');
   offScreenMenu.classList.toggle('active');
 })


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

 //filtering dropdown
 const filterMenu = document.querySelector('.filter-container');
 const offScreenFilter = document.querySelector('.off-screen-filter');

 filterMenu.addEventListener('click', () => {
   filterMenu.classList.toggle('active');
   offScreenFilter.classList.toggle('active');
 })



// Function to filter products based on search input
function filterProductsBySearch(searchQuery) {
    const query = searchQuery.toLowerCase(); // Convert search query to lowercase

    const filteredProducts = allProducts.filter(product => {
        const titleMatch = product.title.toLowerCase().includes(query); // Check if title matches
        const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(query)); // Check if any tag matches
        const genderMatch = product.gender.toLowerCase().includes(query); // Check gender string

        return titleMatch || tagMatch || genderMatch; // Return true if any match found
    });

    displayProducts(filteredProducts); // Update UI with filtered products
}

  
  // Event Listener for the search bar
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
  
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchValue = searchInput.value.trim(); // Get user input
            filterProductsBySearch(searchValue); // Call function to filter products
        });
    }
  });
  