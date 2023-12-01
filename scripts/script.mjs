/*-------Variables---------*/
let closingx = document.querySelector(".information__close-x");
let title = document.querySelector(".information__title");
let planetLatinName = document.querySelector(".information__title-two");
let planetParagraph = document.querySelector(".information__paragraph");
let planetMoons = document.querySelector(".information__extra--moons");
let extraPlanetInformation = document.querySelectorAll(
  ".information__extra-value"
);

/*-------Click events---------*/

/*Click events for all the different planets and the closing x*/
let planets = document.querySelector(".planets");
let information = document.querySelector(".information");
information.style.display = "none";

let stars = document.querySelector(".stars");

let closeThePage = document.querySelector(".information__close-x");
closeThePage.addEventListener("click", () => {
  location.href = "index.html";
});

let theSun = document.querySelector(".thesun");
theSun.addEventListener("click", () => {
  getPlanetInformation(0);
});

let mercury = document.querySelector(".planets__mercury");
mercury.addEventListener("click", () => {
  getPlanetInformation(1);
});

let venus = document.querySelector(".planets__venus");
venus.addEventListener("click", () => {
  getPlanetInformation(2);
});

let earth = document.querySelector(".planets__earth");
earth.addEventListener("click", () => {
  getPlanetInformation(3);
});

let mars = document.querySelector(".planets__mars");
mars.addEventListener("click", () => {
  getPlanetInformation(4);
});

let jupiter = document.querySelector(".planets__jupiter");
jupiter.addEventListener("click", () => {
  getPlanetInformation(5);
});

let saturn = document.querySelector(".planets__saturn");
saturn.addEventListener("click", () => {
  getPlanetInformation(6);
});

let uranus = document.querySelector(".planets__uranus");
uranus.addEventListener("click", () => {
  getPlanetInformation(7);
});

let neptune = document.querySelector(".planets__neptune");
neptune.addEventListener("click", (e) => {
  getPlanetInformation(8);
});

/*-------Functions---------*/

/*Gets the api key*/
async function getKeys() {
  /*
  Created a function to avoid repeating code. 
  There would be a fetch to get the key 
  every time i need to use the api.
  */
  let basekeys = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: `post`,
    }
  );

  let keydata = await basekeys.json();
  return keydata.key;
}
/* Gets the array for all the planets, and calls getKeys function to get the api key. */
async function getsSkyBodiesArray() {
  /*Uses the getKeys function and g*/
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: `GET`,
      headers: {
        "x-zocom": `${await getKeys()}`,
      },
    }
  );

  let data = resp.json();

  return data;
}
/*Function to get the planet information, 
collecting all the different functions into one function.*/
async function getPlanetInformation(number) {
  placeClosingX();
  planets.style.display = "none";
  getPlanetTitle(number);
}
/*Function to fetch the bodies array and to add the title of the planet.
Also calls the next function to add all the relevant information to the page.*/
async function getPlanetTitle(number) {
  let data = await getsSkyBodiesArray();
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  title.textContent = data.bodies[number].name;
  getPlanetLatinName(number, data);
}
/*Gets the planets latin name. And calls the next function*/
async function getPlanetLatinName(number, data) {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  planetLatinName.textContent = data.bodies[number].latinName;
  getPlanetDescription(number, data);
}
/*Gets the planets description. And calls the next function*/
async function getPlanetDescription(number, data) {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  planetParagraph.textContent = data.bodies[number].desc;
  getExtraPlanetInformation(number, data);
}
/*Gets the planets extra information, ass, circumference, 
distance, temp in the day and temp in the night.*/
async function getExtraPlanetInformation(number, data) {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  console.log(data.bodies[number]);
  extraPlanetInformation[0].textContent = `${data.bodies[number].circumference} KM`;
  extraPlanetInformation[1].textContent = `${data.bodies[number].distance} KM`;
  extraPlanetInformation[2].textContent = `${data.bodies[number].temp.day}C`;
  extraPlanetInformation[3].textContent = `${data.bodies[number].temp.night}C`;

  getPlanetMoons(number, data);
}
/*Gets the planets moon names.*/
async function getPlanetMoons(number, data) {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/

  /*Takes the array of moons an creates a string for display purposes.*/
  let stringOfMoons = data.bodies[number].moons;
  planetMoons.textContent = stringOfMoons.join(`, `);
  /*Sets the display to block so that all the information can be loaded onto the page.*/
  information.style.display = "block";
  stars.style.background =
    "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png)";
  repeat;
}
/*Adds the closing x to the page.*/
function placeClosingX() {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  closingx.textContent = "X";
}
