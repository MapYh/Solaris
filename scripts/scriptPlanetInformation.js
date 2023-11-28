/*
Used for Closing the current planetinformation 
page an going back to the start page.
*/
let closeThePage = document.querySelector(".information__close-x");
closeThePage.addEventListener("click", () => {
  location.href = "index.html";
});

/*--------Variables---------*/

let title = document.querySelector(".information__title");
let titleTwo = document.querySelector(".information__title-two");
let paragraph = document.querySelector(".information__paragraph");
let extraInformation = document.querySelector(".information__extra");
let extraInformationValue = document.querySelectorAll(
  ".information__extra__value"
);
let extraInformationtitle = document.querySelectorAll(
  ".information__extra__title"
);

console.log(extraInformationValue);
console.log(extraInformationtitle);

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
  console.log(data);
  return data;
}

async function getPlanetInformation() {
  getPlanetTitle();
  getPlanetTitleTwo();
  getPlanetDescription();
  getExtraPlanetInformation();
}

async function getPlanetTitle() {
  let data = await getsSkyBodiesArray();
  title.textContent = data.bodies[1].name;
  /* console.log(data.bodies[0].name); */
  return data;
}

async function getPlanetTitleTwo() {
  let data = await getsSkyBodiesArray();
  titleTwo.textContent = data.bodies[1].latinName;
  /* console.log(data.bodies[0].latinName); */
  return data;
}

async function getPlanetDescription() {
  let data = await getsSkyBodiesArray();
  paragraph.textContent = data.bodies[1].desc;
  /* console.log(data.bodies[0].latinName); */
  return data;
}

async function getExtraPlanetInformation() {
  let data = await getsSkyBodiesArray();

  for (let i = 0; i < 4; i++) {
    /* let title = document.createElement("h2"); */
    if (i === 0) {
      extraInformationtitle[i].textContent = `Omkrets`;
      extraInformationValue[i].textContent = data.bodies[i].circumference;
      console.log(data.bodies[0].circumference);
    } else if (i === 1) {
      extraInformationtitle[i].textContent = `Km från solen`;
      extraInformationValue[i].textContent = data.bodies[i].distance;
    } else if (i === 2) {
      extraInformationtitle[i].textContent = `Max temp`;
      extraInformationValue[i].textContent = data.bodies[i].temp.day;
    } else if (i === 3) {
      extraInformationtitle[i].textContent = `Min temp`;
      extraInformationValue[i].textContent = data.bodies[i].temp.night;
    } else if (i === 4) {
      extraInformationtitle[i].textContent = `Månar`;
      extraInformationValue[i].textContent = data.bodies[i].moons;
    }

    /* extraInformation.appendChild(title); */
  }
}
//km från solen, min och max temp, måne, och omkrets.
/*-------Function calls---------*/
getPlanetInformation();
