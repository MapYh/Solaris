/*-------Variables---------*/
/*For the information about the planet.*/
let planetTitle = document.querySelector(".information__title");
let planetLatinName = document.querySelector(".information__title-two");
let planetParagraph = document.querySelector(".information__paragraph");
let planetMoons = document.querySelector(".information__extra--moons");
let extraPlanetInformation = document.querySelectorAll(
  ".information__extra-value"
);
/*For the rings on the information page.*/
let planetInfoPage = document.querySelector(".innerring");
let planetInfoPageOuterRing = document.querySelector(".outer");

/*For the stars in the background of the information page*/
let starsInBackground = document.querySelector(".stars");

/*The planet div used to hold all the created planets.*/
let planets = document.querySelector(".planets");

/*Used to show the planet information page.*/
let information = document.querySelector(".information");
information.style.display = "none";

/*Class names to be used in the creation of the planet divs.*/
let planetClassNames = [
  "thesun",
  "planets__mercury",
  "planets__venus",
  "planets__earth",
  "planets__mars",
  "planets__jupiter",
  "planets__combined-saturn",
  "planets__uranus",
  "planets__neptune",
];

/*Different colors for the planet on the information page.*/
let planetColors = [
  "#ffd029",
  "#7a91a7",
  "#e7cdcd",
  "#428ed4",
  "#ef5f5f",
  "#e29468",
  "#c7aa72",
  "#c9d4f1",
  "#7a91a7",
];

/*-------Functions---------*/

/*Creates the neccesary elements. 
They need to be created before all the other functions, 
because the other functions use these elements.*/
createPlanetElements();

/*Function to create the planet elements.*/
function createPlanetElements() {
  /*Creating the elements for the different planets.*/
  for (let i = 0; i < planetClassNames.length; i++) {
    let tempElement = document.createElement("div");
    tempElement.classList.add(planetClassNames[i]);

    if (i === 6) {
      /*Adding the ring to saturn*/
      let tempElementSaturn = document.createElement("div");
      let tempElementSaturnRing = document.createElement("div");
      tempElementSaturnRing.classList.add("planets__saturn__ring");
      tempElementSaturn.classList.add("planets__saturn");
      tempElement.append(tempElementSaturn);
      tempElement.append(tempElementSaturnRing);
    }
    /*Appending to the main planets div*/
    planets.append(tempElement);
  }
  /* addClickEvents(); */
}
/*Function to get the planet information, 
collecting all the different functions into one function.*/
async function getPlanetInformation(number) {
  placeClosingX();
  planets.style.display = "none";
  createPlanetInformation(number);
}

/*Function to fetch the bodies array and to add the information about the planet like, name, name in latin, 
text paragraph, and circumference, distance from sun, temperature at night and in the day.
Also calls the next function to add all the relevant information to the page.*/
async function createPlanetInformation(number) {
  /*Gets the body array*/
  let data = await getsSkyBodiesArray();
  /*Adds title, latin name, describition of planet.*/
  planetTitle.textContent = data.bodies[number].name;
  planetLatinName.textContent = data.bodies[number].latinName;

  planetParagraph.textContent = data.bodies[number].desc;

  /*extra info like circumnference, distance from the sun, temp during they day and night.*/
  extraPlanetInformation[0].textContent = `${data.bodies[number].circumference} KM`;
  extraPlanetInformation[1].textContent = `${data.bodies[number].distance} KM`;
  extraPlanetInformation[2].textContent = `${data.bodies[number].temp.day}C`;
  extraPlanetInformation[3].textContent = `${data.bodies[number].temp.night}C`;

  getPlanetForInfoPage(number, data);
}

/*Gets the api key*/
async function getKeys() {
  /*
  Created a function to avoid repeating code. 
  There would be a fetch to get the key 
  every time i need to use the api.
  */
  try {
    let basekeys = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: `post`,
      }
    );

    let keydata = await basekeys.json();
    return keydata.key;
  } catch {
    console.log("Could not get API key.");
  }
}
/* Gets the array for all the planets, and calls getKeys function to get the api key. */
async function getsSkyBodiesArray() {
  /*Uses the getKeys function and g*/
  try {
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
  } catch {
    console.log("Could not fetch API bodies.");
  }
}

/*Get the planets color for the info page display. And calls the next function*/
function getPlanetForInfoPage(number, data) {
  planetInfoPageOuterRing.style.display = "block";
  /*Color for the planet that was clicked on.*/
  planetInfoPage.style.background = planetColors[number];

  /*Positioning for the outer ring.*/
  planetInfoPageOuterRing.style.left = "-600px";
  planetInfoPageOuterRing.style.top = "220px";
  planetInfoPageOuterRing.style.width = "900px";
  planetInfoPageOuterRing.style.height = "900px";
  getPlanetMoons(number, data);
}

/*Gets the planets moon names.*/
function getPlanetMoons(number, data) {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/

  /*Takes the array of moons an creates a string for display purposes.*/
  let stringOfMoons = data.bodies[number].moons;
  if (!(stringOfMoons.length === 0)) {
    planetMoons.textContent = stringOfMoons.join(`, `);
  } else {
    planetMoons.innerHTML = "Den här planeten har ingen måne.";
  }

  /*Sets the display to block so that all the information can be loaded onto the page.*/
  information.style.display = "block";
  createStars();
}
/*Adds the closing x to the page.*/
function placeClosingX() {
  /*The reson for dividing up the code in different functions is so that it is easier to understad what every 
  function does, and to find possible errors.*/
  closeThePage.textContent = "x";
}

//Creates all the background stars.
function createStars() {
  for (let i = 0; i < 200; i++) {
    /*  Creating the element for each star. */
    const star = document.createElement("div");
    /* Adding styling for each star. */
    star.className = "star-template";

    /* Adding random positoning to the star. */
    star.style.left = `${Math.floor(Math.random() * 100)}%`;
    star.style.top = `${Math.floor(Math.random() * 100)}%`;

    /*  adding random size to the star. */
    star.style.width = `${Math.floor(Math.random() * 10)}px`;
    star.style.height = `${Math.floor(Math.random() * 10)}px`;

    /* Random animation delay to the star. */
    star.style.animationDelay = `${Math.floor(Math.random() * 10)}s`;

    starsInBackground.appendChild(star);
  }
}

/*-------Click events---------*/

/*Click events for all the different planets and the closing x*/

/* To change pages when clicking on the x in information page. */
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
neptune.addEventListener("click", () => {
  getPlanetInformation(8);
});
/*-------------------------------------------------------*/
