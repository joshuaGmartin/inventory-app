import "./tableSort.js";
import "./eventListeners.js";

const searchBar = document.getElementById("searchTerm");

if (searchBar) {
  searchBar.focus();
  searchBar.setSelectionRange(0, searchBar.value.length);
}
