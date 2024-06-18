
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const res=new URLSearchParams(search)
  return res.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
  const data = await response.json();
  // console.log(data);
 return data;
  }
  catch(error){
    console.log(error);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
//  console.log(adventures);
 const dataDiv= document.getElementById("data");
adventures.forEach((adventure) => {
  // console.log(adventure.name);
  const paraElement = document.createElement("p");
  paraElement.textContent =adventure.name;
  const{ id, name, costPerHead, category, image, duration}= adventure;
  let div = document.createElement("div");
  div.className = "col-6 col-lg-3 mb-3 ";
  div.innerHTML = `<a id="${id}" href="detail/?adventure=${id}">
                    <div class="activity-card">
                    <div class="category-banner">${category}</div>

                      <img class="" src="${image}" alt="Image of ${name} adventure">
                      
                      <div class="border w-100 px-2">
                      <div class="d-md-flex justify-content-between">
                      <h5>${name}</h5>
                      <p>₹ ${costPerHead}</p>
                      </div>

                      <div class="d-md-flex justify-content-between">
                      <h5>Duration</h5>
                      <p>${duration}</p>
                      </div>
                      </div>
                  

                      </div>  
                  </a>`;

  dataDiv.append(div);
});

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const res=list.filter((adventure)=> adventure.duration>=low && adventure.duration<high);
  
  return res;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  console.log(list,categoryList);
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  // console.log(res);
  const result=list.filter((adventure) => 
  categoryList.includes(adventure.category)
);
  
  return result;



}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  let filteredadventures=[];
  if(filters.duration!=="" && filters.category.length===0){
    // only category
    const arr=filters.duration.split("-");
    const low=parseInt(arr[0]);
    const high=parseInt(arr[1]);
    filteredadventures=filterByDuration(list,low,high);
  }
  else if(filters.duration=="" && filters.category.length>0){
    //only category
    filteredadventures=filterByCategory(list,filters.category);

  }
  else if(filters.duration!=="" && filters.category.length>0){
    //both
    const arr=filters.duration.split("-");
    const low=parseInt(arr[0]);
    const high=parseInt(arr[1]);
    const tempList=filterByDuration(list,low,high);
    filteredadventures=filterByCategory(tempList,filters.category);

  }
  else filteredadventures=list;
  
  return filteredadventures;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

const filters=JSON.parse(localStorage.getItem("filters"));
return filters;
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 
  const categoryArr= filters.category;
  const divEle=document.getElementById("category-list");
  categoryArr.map((value)=>{
    const categoryPill=document.createElement("div");
    categoryPill.className="category-filter"
    categoryPill.textContent=value;
    divEle.append(categoryPill);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};


