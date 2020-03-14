//varaibales
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//Generate Random Users
getRandomUser();
getRandomUser();
getRandomUser();

//console.log(data);

//fetch random user and add money value
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000)
  };

  addData(newUser);
}

// Add newUser to data array
function addData(obj) {
  data.push(obj);

  // Call updateDOM function
  updateDOM();
}

// Update the DOM
function updateDOM(providedData = data) {
  // Clear Main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  //loop through data array
  providedData.forEach(item => {
    // Create a div element
    const element = document.createElement("div");

    //   Add a class to the div element
    element.classList.add("person");

    // insert user data into the person div
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    // add the new html to the DOM
    main.appendChild(element);
  });
}

// Double Money fubnction
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Format number as money
function formatMoney(number) {
  return "€" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Add EventListners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
