/*-------Click events---------*/
let theSun = document.querySelector(".thesun");
theSun.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("The sun");
});

let mercury = document.querySelector(".planets__mercury");
mercury.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("mercury");
});

let venus = document.querySelector(".planets__venus");
venus.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("venus");
});

let earth = document.querySelector(".planets__earth");
earth.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("earth");
});

let mars = document.querySelector(".planets__mars");
mars.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("mars");
});

let jupiter = document.querySelector(".planets__jupiter");
jupiter.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("jupiter");
});

let saturn = document.querySelector(".planets__saturn");
saturn.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("saturn");
});

let uranus = document.querySelector(".planets__uranus");
uranus.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("uranus");
});

let neptune = document.querySelector(".planets__neptune");
neptune.addEventListener("click", () => {
  location.href = "planetinformation.html";
  console.log("neptune");
});

/* /*-------Functions---------*/

/*Gets the api key*/
/* async function getKeys() {
  /*
  Created a function to avoid repeating code. 
  There would be a fetch to get the key 
  every time i need to use the api.
  */
/*   let basekeys = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: `post`,
    }
  );

  let keydata = await basekeys.json();
  return keydata.key;
}   */

/* async function getsSkyBodiesArray() {
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
} */

/* async function getPlanetInformation() {
  let data = await getsSkyBodiesArray();
  console.log(data.bodies[0].name);
}
 */

/*-------Function calls---------*/
/* getPlanetInformation();  */
