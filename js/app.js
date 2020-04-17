
// API FETCH SETUP
//_________________________

//Variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
// Get the modal
const modal = document.getElementById("employee-info-modal");

// Get the tiles that opens the modal
const tiles = document.getElementsByClassName("employee-tile")[0];

// Get the <span> element that closes the modal
const closeButton = document.querySelector(".close");

//employee container
const empContainer = document.getElementById("employees");


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
        <div class="employee-tile card" data-index="${index}">
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
};

function displayModal(index) {

  //use object destructuring to make template literal cleaner
  let { name, dob, phone, email, location: { city, street, state, country, postcode}, picture} = employees[index];
  
  let date = new Date(dob.date);

  const modalHtml = `
  <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${picture.large}" alt="profile-pic" />
        <h2>${name.first} ${name.last}</h2>
        <p>${email}</p>
        <p>${city}</p>
        <hr>
        <p>${phone}</p>
        <p>${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
  `;
  modal.style.display = "block";
  modal.innerHTML = modalHtml;


}

// MODAL SETUP & Event
//___________________________


empContainer.addEventListener('click', event => {
  if (event.target !== empContainer) {

    // select the card element based on its proximity to actual element clicked
    const card = event.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

// When the user clicks on (x), close the modal
closeButton.addEventListener('click', event => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    }
};


