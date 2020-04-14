// MODAL SETUP
//___________________________

// Get the modal
const modal = document.getElementById("employee-info-modal");

// Get the tiles that opens the modal
const tiles = document.getElementsByClassName("employee-tile")[0];

// Get the <span> element that closes the modal
const closeButton = document.getElementsByClassName("close")[0];



// When the user clicks the button, check for other input field filled out
tiles.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    }
}


// API FETCH SETUP
//_________________________

//Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;

fetch(urlAPI)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(response => console.log(response[0].))
    .catch(err => console.log(err))




