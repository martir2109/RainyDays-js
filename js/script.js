//fetching the API endpoint for rainy days - get all products
    fetch("https://v2.api.noroff.dev/rainy-days")
        .then(response => response.json()) // Convert response to JSON
        .then(data => console.log(data)) // Log the data to the console

//fetching the API endpoint for rainy days - one product using its id
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

