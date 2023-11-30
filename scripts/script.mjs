/*-------Click events---------*/

let planets = document.querySelector(".planets");
let information = document.querySelector(".information");
information.style.display = "none";

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

let closingx = document.querySelector(".information__close-x");
let title = document.querySelector(".information__title");
let titleTwo = document.querySelector(".information__title-two");
let paragraph = document.querySelector(".information__paragraph");
let moons = document.querySelector(".information__extra--moons");
let extraInformationtitle = document.querySelectorAll(
  ".information__extra__title"
);
let extraInformationValue = document.querySelectorAll(
  ".information__extra__value"
);

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

async function getsSkyBodiesArray() {
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: `GET`,
      headers: {
        "x-zocom": `${await getKeys()}`,
      },
    }
  );

  let data = await resp.json();

  return data;
}

async function getPlanetInformation(number) {
  planets.style.display = "none";
  information.style.display = "block";
  await getPlanetTitle(number);
  await getPlanetLatinName(number);
  await getPlanetDescription(number);
  await getExtraPlanetInformation(number);
  getPlanetMoons(number);
  placeClosingX();
}

async function getPlanetTitle(number) {
  let data = await getsSkyBodiesArray();
  title.textContent = data.bodies[number].name;
  return data;
}

async function getPlanetLatinName(number) {
  let data = await getsSkyBodiesArray();
  titleTwo.textContent = data.bodies[number].latinName;
  return data;
}

async function getPlanetDescription(number) {
  let data = await getsSkyBodiesArray();
  paragraph.textContent = data.bodies[number].desc;
}

async function getExtraPlanetInformation(number) {
  let data = await getsSkyBodiesArray();

  extraInformationtitle[0].textContent = `OMKRETS`;
  extraInformationValue[0].textContent = data.bodies[number].circumference;

  extraInformationtitle[1].textContent = `KM FRÅN SOLEN`;
  extraInformationValue[1].textContent = data.bodies[number].distance;

  extraInformationtitle[2].textContent = `MAX TEMPERATUR`;
  extraInformationValue[2].textContent = data.bodies[number].temp.day;

  extraInformationtitle[3].textContent = `MIN TEMPERATUR`;
  extraInformationValue[3].textContent = data.bodies[number].temp.night;

  extraInformationtitle[4].textContent = `MÅNAR`;
}

async function getPlanetMoons(number) {
  let data = await getsSkyBodiesArray();
  let stringOfMoons = data.bodies[number].moons;
  moons.textContent = stringOfMoons.join(`, `);
}

function placeClosingX() {
  closingx.textContent = "X";
}
