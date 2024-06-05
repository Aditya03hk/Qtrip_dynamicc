import config from "../conf/index.js";

async function init() {

  
  console.log(`${config.backendEndpoint}/cities`);


  // console.log(config.backendEndpoint + "/cities");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}


//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + "/cities");
  const data = await response.json();
 return data;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div = document.createElement("div");
  div.className = "col-6 col-lg-3 mb-3 ";
  div.innerHTML = `<a id="${id}" href="pages/adventures/?city=${id}">
                    <div class="tile">
                      <img class="img-responsive" src="${image}" alt="Image of ${id} city">
                      <div class="tile-text text-white text-center">
                        <h4>${city}</h4>
                        <p>${description}</p>
                      </div>
                      </div>  
                  </a>`;

  let data = document.getElementById("data");
  data.append(div);
}

export { init, fetchCities, addCityToDOM };
