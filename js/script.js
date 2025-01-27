
//Hamburger menu for smaller screens
function myFunction() {
    var x = document.getElementById("topnavbar");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }

  //This is the loader to show the user that the application is loading
  // look at module 7 - user experience
  function showLoader() {
    const loader = document.querySelector('.loader');
    loader.hidden = false;
  }
  
  function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.hidden = true;
  }
  
  export default { show: showLoader, hide: hideLoader };

  import loader from './loader.js';
import { getPosts } from './api.js';
import { renderPosts } from './render.js';

async function app() {
  loader.show();
  const posts = await getPosts();
  renderPosts(posts);
  loader.hide();
}
    app();



//error handling
//UI functions

async function app() {
    loader.show();
    try {
      const posts = await getPosts();
      renderPosts(posts);
    } catch (error) {
      alert(error);
    } finally {
      loader.hide();
    }
  }
  
  app();

  