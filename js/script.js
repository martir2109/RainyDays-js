  
  const options = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFydGluZV9LYXJsc2VuIiwiZW1haWwiOiJNYXJrYXIwMDYzN0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczODM1NjkxMH0.4fqEMpZTHhv2pA4aLyasyZMQGGW7W8nhD-Mj1u9BX2A',
      'X-Noroff-API-Key': '43e0be43-50b7-4b30-8b0c-dda5369d906e'
    }
  };

//fetching the API endpoint for rainy days
    fetch("https://v2.api.noroff.dev/rainy-days")
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

