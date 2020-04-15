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
const empContainer = document.getElementById("employees")
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;

// Fetch API
fetch(urlAPI)
    .then(response => response.json())
    .then(response => response.results)
    .then(response => {console.log(response); return response;})
    .then(displayEmployees)
    
    .catch(err => console.log('Looks like there was an error', err));



// Display 12 random employees with picture
function displayEmployees(employeeData) {

    employees = employeeData;

    // store employee Html
    let employeeHtml = "";
    
    //loop through each employee and create html
    employees.forEach((employee, index) => {

        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        // template literal
        employeeHtml += `
        <div class="employee-tile" data-index="${index}">
              <div class="info-wrapper">
                <img src="${picture.medium}" alt="portrait" />
                <div class="employees-text">
                  <h2>${name.first} ${name.last}</h2>
                  <span>${email}</span>
                  <span>${city}</span>
                </div>
              </div>
            </div>
        `;
         
    });

    empContainer.innerHTML = employeeHtml;
}




