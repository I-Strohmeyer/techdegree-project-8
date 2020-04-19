// API FETCH SETUP
//_________________________

//Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
// Get the modal
const modal = document.getElementById("employee-info-modal");
const modalDetails = document.getElementById("employee-details");
const closeButton = document.getElementById("close");

// Keep track of which modal is currently open (default is the first)
let currentModalIndex = 0;

//employee container
const empContainer = document.getElementById("employees");


// Fetch API
fetch(urlAPI)
  .then(response => response.json())
  .then(response => response.results)
  .then(response => { console.log(response); return response; })
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
                  <h2 class="searchable">${name.first} ${name.last}</h2>
                  <span>${email}</span>
                  <span>${city}</span>
                </div>
              </div>
            </div>
        `;

  });

  empContainer.innerHTML = employeeHtml;
};

// MODAL SETUP & Event
//___________________________

// When the user clicks on (x), close the modal
closeButton.addEventListener('click', () => {
  modal.style.display = "none";
});

empContainer.addEventListener('click', event => {
  if (event.target !== empContainer) {

    // select the card element based on its proximity to actual element clicked
    const card = event.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// shows modalcontent when pevious/next button is clicked
modal.addEventListener('click', event => {
  const previous = document.getElementById('previous');
  if (event.target.tagName === 'BUTTON') {
    if (event.target === previous) {

      if (currentModalIndex <= 0)
        currentModalIndex = employees.length - 1;
      else
        currentModalIndex = currentModalIndex - 1;

    }
    else {

      if (currentModalIndex == employees.length - 1)
        currentModalIndex = 0;
      else
        currentModalIndex = currentModalIndex + 1;

    }
    console.log(currentModalIndex);
    setModalContent(currentModalIndex);
  }
});

// SHOWING THE MODAL
//___________________________

function setModalContent(index) {
  currentModalIndex = parseInt(index, 10);

  //use object destructuring to make template literal cleaner
  let { name, dob, phone, email, location: { city, street, state, country, postcode }, picture } = employees[index];

  let date = new Date(dob.date);

  //modal html
  const modalHtml = `
        <img src="${picture.large}" alt="profile-pic" />
        <h2 class="modal-name">${name.first} ${name.last}</h2>
        <p>${email}</p>
        <p>${city}</p>
        <hr>
        <p>${phone}</p>
        <p>${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}</p>
  `;

  modalDetails.innerHTML = modalHtml;
}

function displayModal(index) {
  setModalContent(index);
  modal.style.display = "block";
}

// SHOWING THE MODAL
//___________________________

/*function searchEmployees() {
  //variables
  let input = document.getElementById('search');
  let searchCriteria = input.value.toLowerCase();
  
  let tiles = document.getElementsByClassName("employee-tile");

  //loop through employees
  let nameValue;
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    nameValue = tile.getElementsByClassName("searchable")[0].innerText.toLowerCase();
    if( nameValue.indexOf(searchCriteria) > -1 ) {
      tile.style.display = "block";
    } else {
      tile.style.display = "none";
    }
  }

};*/

function searchEmployees() {
  //variables
  let input = document.getElementById('search');
  let searchCriteria = input.value.toLowerCase();
  let tiles = document.getElementsByClassName("employee-tile");

  //loop through employees
  let nameValue, firstName, lastName;
  for (let i = 0; i < employees.length; i++) {
    nameValue = employees[i].name;
    firstName = nameValue.first.toString().toLowerCase();
    lastName = nameValue.last.toString().toLowerCase();

    if (firstName.indexOf(searchCriteria) == 0 || lastName.indexOf(searchCriteria) == 0) {
      tiles[i].style.display = "block";
    } else {
      tiles[i].style.display = "none";
    }
  }

};