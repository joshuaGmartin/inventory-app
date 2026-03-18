const thTitle = document.getElementById("table-header-title");
const thReleaseYear = document.getElementById("table-header-release-year");
const thDirector = document.getElementById("table-header-director");
const thGenre = document.getElementById("table-header-genre");

const params = new URLSearchParams(window.location.search);

const sort = params.get("sort");
const order = params.get("order");
const path = window.location.pathname;

// sanitize inputs
if (path === "/films") {
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
