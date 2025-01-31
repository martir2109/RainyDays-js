
//Hamburger menu for smaller screens
function myFunction() {
    var x = document.getElementById("topnavbar");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }

//hamburger menu/ bi-list
  const hamMenu = document.querySelector('.bi-list');
  const offScreenMenu = document.querySelector('.off-screen-menu');

  hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
  })

  //fetching the API endpoint for rainy days
  fetch("https://v2.api.noroff.dev/rainy-days")
  .then(response => response.json()) // Convert response to JSON
  .then(data => console.log(data)) // Log the data to the console
