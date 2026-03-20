// =========================================================================================================
// click headers to sort
// =========================================================================================================

if (document.querySelector("table")) {
  const headers = document.querySelectorAll(".inner-th");

  headers.forEach((header) => {
    const headerSpan = header.querySelector(".header-title");
    const upArrow = header.querySelector(".up-arrow");
    const downArrow = header.querySelector(".down-arrow");

    headerSpan.addEventListener("click", () => {
      if (upArrow.classList.contains("selected-arrow")) downArrow.click();
      else upArrow.click();
    });
  });
}
