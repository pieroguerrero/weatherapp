const header = (function () {
  const header = document.querySelector("header");

  const onClickOpenSearch = function () {
    this.classList.add("hidden");
    header.querySelector("#p-location-title").classList.add("hidden");
    header.querySelector("#div-searchbox").classList.remove("hidden");
  };

  const loadButtons = function () {
    const btnOpenSearch = header.querySelector("#button-search-open");
    btnOpenSearch.onclick = onClickOpenSearch.bind(btnOpenSearch);
  };

  const onChangeInputSearch = function () {
    alert("onChangeInputSearch: " + this.value);
  };

  const onKeyUpInputSearch = function (e) {
    //alert("onKeyUpInputSearch: " + e.key);
    console.log("onKeyUpInputSearch: " + e.key);

    span - input - enter;
  };

  const loadSearchBox = function () {
    const btnSearchBox = header.querySelector("#input-search-location");
    btnSearchBox.onchange = onChangeInputSearch.bind(btnSearchBox);
    btnSearchBox.onkeyup = onKeyUpInputSearch.bind(onkeyup);
  };

  return {
    onPageLoad(dblLatitude, dblLongitude) {
      loadButtons();
      loadSearchBox();
    },
  };
})();

export { header };
