//hamburger menu / gender filtering
const hamMenu = document.querySelector(".list-container");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// AddEventListener for gender filtering
document.addEventListener("DOMContentLoaded", function () {
  const genderFilter = document.getElementById("genderFilter");

  if (genderFilter) {
    genderFilter.addEventListener("click", function (event) {
      const target = event.target.closest("li");
      if (target) {
        const selectedGender = target.getAttribute("data-value");

        // filter the products based on selectedGender
        filterProductsByGender(selectedGender);
      }
    });
  }
});

// Fetch products when the page loads
fetchProducts();

function filterProductsByGender(gender) {
  let filteredProducts;

  // Correct mappings based on API data
  const genderMap = {
    mens: "male",
    womens: "female",
    all: "all",
  };

  const mappedGender = genderMap[gender] || gender;

  if (mappedGender === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(
      (product) => product.gender.toLowerCase() === mappedGender
    );
  }

  displayProducts(filteredProducts);
}

// AddEventListner for color filtering
document.addEventListener("DOMContentLoaded", function () {
  const colorFilter = document.getElementById("color-filter");

  if (colorFilter) {
    colorFilter.addEventListener("click", function (event) {
      const target = event.target.closest("li");
      if (target) {
        const selectedColor = target.getAttribute("data-value");

        // filter products by color
        filterProductsByColor(selectedColor);
      }
    });
  }
});

function filterProductsByColor(color) {
  let filteredProducts;

  if (color === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(
      (product) => product.baseColor.toLowerCase() === color.toLowerCase()
    );
  }

  const productContainer = document.querySelector(".product-line");
  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = `<div class="no-product">No products found with the color "${color}"</div>`;
    return;
  }

  displayProducts(filteredProducts);
}

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

// AddEventListener for sorting
document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.getElementById("sortOptions");

  if (sortOptions) {
    sortOptions.addEventListener("click", function (event) {
      const target = event.target.closest("li");
      if (target) {
        const sortOrder = target.getAttribute("data-value");
        sortProducts(sortOrder);
      }
    });
  }
});

//filtering dropdown/ sort by
const filterMenu = document.querySelector(".filter-container");
const offScreenFilter = document.querySelector(".off-screen-filter");

filterMenu.addEventListener("click", () => {
  filterMenu.classList.toggle("active");
  offScreenFilter.classList.toggle("active");
});

//this allows the user to search using the tags, gender, color or product name
function filterProductsBySearch(searchQuery) {
  const query = searchQuery.toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(query);
    const tagMatch = product.tags.some((tag) =>
      tag.toLowerCase().includes(query)
    );
    const genderMatch = product.gender.toLowerCase().includes(query);
    const colorMatch = product.baseColor.toLowerCase().includes(query);

    return titleMatch || tagMatch || genderMatch || colorMatch;
  });

  const productContainer = document.querySelector(".product-line");
  productContainer.innerHTML = "";

  // Shows a "No products found" message when no products match the search input
  if (filteredProducts.length === 0) {
    productContainer.innerHTML =
      '<div class="no-product">No products found</div>';
    return;
  }

  displayProducts(filteredProducts);
}

// AddEventListener for the search bar
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-bar");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchValue = searchInput.value.trim();
      filterProductsBySearch(searchValue);
    });
  }
});
