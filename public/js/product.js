function prodChangeThumbnail(idx, url) {
  $("#prod-img").fadeOut();
  $("#prod-img").fadeIn();
  setTimeout(() => {
    $(".prod-img")[0].src = url;
  }, 400);
  const list = $(".prod-imgs").toArray();
  list.forEach((elem) => {
    elem.classList.remove("active");
  });
  list[idx].classList.add("active");
}

function selectedProp(prop, index, value) {
  $(`#${prop}`).val(index);
  //   alert(prop);
  //   alert(index);
  //   console.log($(`#${prop}`).val());
  alert(`Selected ${prop}: ${value}`);
}
