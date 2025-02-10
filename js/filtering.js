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