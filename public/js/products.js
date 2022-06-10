function assembleUrl(map) {
  let output = [];
  const data = Object.keys(map);
  for (const k of data) {
    output.push(`${k}=${map[k]}`);
  }
  return `?${output.join("&")}`;
}

function handleFilters(key, value, ignore) {
  // alert(ignore);
  if (ignore) return;
  let map = localStorage.getItem("query"),
    newUrl;
  if (map) {
    map = JSON.parse(map);
    let qs = window.location.search;
    const params = qs.replace("?", "");
    let elems = params.split("&");
    // console.log(elems);
    elems.forEach((each) => {
      if (each.includes("=")) {
        const kv = each.split("=");
        map[kv[0]] = kv[1];
      }
    });
    if (key == "bypass") {
      map.low = value.low;
      map.high = value.high;
    } else map[key] = value;
  } else {
    if (key == "bypass") {
      map = {};
      map.low = value.low;
      map.high = value.high;
    } else
      map = {
        [key]: value,
      };
  }
  localStorage.setItem("query", JSON.stringify(map));
  newUrl = assembleUrl(map);
  // alert(newUrl);
  if (key == "bypass") return newUrl;
  else window.open(newUrl, "_self");
}

function priceFilter(low, high) {
  // alert(`${low}-${high}`);
  const final = handleFilters("bypass", { low, high }, undefined);
  // alert(final);
  window.open(final, "_self");
}

function sortChanged() {
  handleFilters("sortBy", $("#products-filter-select").val());
}
function keywordChanged() {
  handleFilters("keyword", $("#products-search-inp").val());
}

function clearFilters() {
  localStorage.removeItem("query");
  window.open("products", "_self");
}
