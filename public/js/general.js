if (window.location.search === "?sortBy=latest")
  localStorage.setItem("query", JSON.stringify({ sortBy: "latest" }));
function hideHamburger() {
  const list = $("#navbar-options")[0].classList;
  if (list.contains("leftNav") || list.contains("hidden")) {
    $("#navbar-options")[0].classList.remove("hidden");
    setTimeout(() => {
      $("#navbar-options")[0].classList.remove("leftNav");
      $("#navbar-options")[0].classList.add("rightNav");
    }, 300);
  } else {
    $("#navbar-options")[0].classList.remove("rightNav");
    $("#navbar-options")[0].classList.add("leftNav");
    setTimeout(() => {
      $("#navbar-options")[0].classList.add("hidden");
    }, 300);
  }
}
