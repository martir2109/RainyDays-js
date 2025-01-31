
//Hamburger menu for smaller screens
function myFunction() {
    var x = document.getElementById("topnavbar");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");  // FIXED: Now selects the correct icon
    const dropdownMenu = document.getElementById("dropdown-menu");  // FIXED: Now selects the correct menu

    menuIcon.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents immediate closing
        dropdownMenu.classList.toggle("active"); // Toggle menu visibility
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("active");
        }
    });
});



  //fetching the API endpoint 
  fetch("https://v2.api.noroff.dev/rainy-days")
  .then(response => response.json()) // Convert response to JSON
  .then(data => console.log(data)) // Log the data to the console
