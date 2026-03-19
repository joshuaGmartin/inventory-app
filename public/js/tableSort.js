const params = new URLSearchParams(window.location.search);
const sort = params.get("sort");
const order = params.get("order");
const path = window.location.pathname;

// sanitize inputs for paths
// =========================================================================================================
// /films
// =========================================================================================================
if (path === "/films") {
  const thTitle = document.getElementById("table-header-title");
  const thReleaseYear = document.getElementById("table-header-release-year");
  const thDirector = document.getElementById("table-header-director");
  const thGenre = document.getElementById("table-header-genre");

  if (sort) {
    const allowedSorts = ["title", "release_year", "dir_name", "genre_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // set container for selected up/down arrow
  let sortElement;
  switch (sort) {
    case "title":
      sortElement = thTitle;
      break;
    case "release_year":
      sortElement = thReleaseYear;
      break;
    case "dir_name":
      sortElement = thDirector;
      break;
    case "genre_name":
      sortElement = thGenre;
      break;
  }

  // select arrow
  if (order === "asc")
    sortElement.querySelector(".up-arrow").classList.add("selected-arrow");
  if (order === "desc")
    sortElement.querySelector(".down-arrow").classList.add("selected-arrow");
}

// =========================================================================================================
// /directors
// =========================================================================================================
if (path === "/directors") {
  const thDirector = document.getElementById("table-header-director");
  const thEducation = document.getElementById("table-header-education");
  const thOscars = document.getElementById("table-header-oscars");

  if (sort) {
    const allowedSorts = ["dir_name", "school", "dir_oscars"];
    if (!allowedSorts.includes(sort)) sort = "dir_name";
  } else sort = "dir_name";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // set container for selected up/down arrow
  let sortElement;
  switch (sort) {
    case "dir_name":
      sortElement = thDirector;
      break;
    case "school":
      sortElement = thEducation;
      break;
    case "dir_oscars":
      sortElement = thOscars;
      break;
  }

  // select arrow
  if (order === "asc")
    sortElement.querySelector(".up-arrow").classList.add("selected-arrow");
  if (order === "desc")
    sortElement.querySelector(".down-arrow").classList.add("selected-arrow");
}

// =========================================================================================================
// /directors/films
// =========================================================================================================
if (path === "/directors/films") {
  const thTitle = document.getElementById("table-header-title");
  const thReleaseYear = document.getElementById("table-header-release-year");
  const thGenre = document.getElementById("table-header-genre");

  if (sort) {
    const allowedSorts = ["title", "release_year", "genre_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // set container for selected up/down arrow
  let sortElement;
  switch (sort) {
    case "title":
      sortElement = thTitle;
      break;
    case "release_year":
      sortElement = thReleaseYear;
      break;
    case "genre_name":
      sortElement = thGenre;
      break;
  }

  // select arrow
  if (order === "asc")
    sortElement.querySelector(".up-arrow").classList.add("selected-arrow");
  if (order === "desc")
    sortElement.querySelector(".down-arrow").classList.add("selected-arrow");
}

// =========================================================================================================
// /genres
// =========================================================================================================
if (path === "/genres") {
  const gTitle = document.getElementById("table-header-genre");

  if (sort) {
    const allowedSorts = ["genre_name"];
    if (!allowedSorts.includes(sort)) sort = "genre_name";
  } else sort = "genre_name";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // set container for selected up/down arrow
  let sortElement;
  switch (sort) {
    case "genre_name":
      sortElement = gTitle;
      break;
  }

  // select arrow
  if (order === "asc")
    sortElement.querySelector(".up-arrow").classList.add("selected-arrow");
  if (order === "desc")
    sortElement.querySelector(".down-arrow").classList.add("selected-arrow");
}

// =========================================================================================================
// /genres/films
// =========================================================================================================
if (path === "/genres/films") {
  const thTitle = document.getElementById("table-header-title");
  const thReleaseYear = document.getElementById("table-header-release-year");
  const thDirector = document.getElementById("table-header-director");

  if (sort) {
    const allowedSorts = ["title", "release_year", "dir_name"];
    if (!allowedSorts.includes(sort)) sort = "title";
  } else sort = "title";

  if (order) {
    const allowedOrders = ["asc", "desc"];
    if (!allowedOrders.includes(order.toLowerCase())) order = "asc";
  } else order = "asc";

  // set container for selected up/down arrow
  let sortElement;
  switch (sort) {
    case "title":
      sortElement = thTitle;
      break;
    case "release_year":
      sortElement = thReleaseYear;
      break;
    case "dir_name":
      sortElement = thDirector;
      break;
  }

  // select arrow
  if (order === "asc")
    sortElement.querySelector(".up-arrow").classList.add("selected-arrow");
  if (order === "desc")
    sortElement.querySelector(".down-arrow").classList.add("selected-arrow");
}
