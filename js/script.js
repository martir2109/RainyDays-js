
//Hamburger menu for smaller screens
function myFunction() {
    var x = document.getElementById("topnavbar");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }