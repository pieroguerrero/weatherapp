import { currentWeather_BL } from "../Back/BL/currentWeather_BL";
import { mainCurrent } from "./mainCurrent";

const header = (function () {
  const header = document.querySelector("header");
  const spanEnterIndicator = header.querySelector("#span-search-enter");

  let mainUnits, mainLatitude, mainLongitude;

  const widths = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875,
    0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125,
    0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875,
    0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625,
    0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625,
    0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875,
    0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875,
    0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875,
    0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5,
    0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625,
    0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
    0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5,
    0.3546875, 0.259375, 0.353125, 0.5890625,
  ];
  const avg = 0.5279276315789471;

  const measureText = function (str, fontSize) {
    return (
      Array.from(str).reduce(
        (acc, cur) => acc + (widths[cur.charCodeAt(0)] ?? avg),
        0
      ) * fontSize
    );
  };

  const onClickOpenSearch = function () {
    this.classList.add("hidden");
    header.querySelector("#p-location-title").classList.add("hidden");
    header.querySelector("#div-searchbox").classList.remove("hidden");

    //test
    //const root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
    //root.classList.add("dark");
  };

  const changeMetrics = function () {
    if (this.textContent.includes("C")) {
      this.textContent = "F°";
      mainUnits = currentWeather_BL.UNITS.Fahrenheit;
    } else {
      this.textContent = "C°";
      mainUnits = currentWeather_BL.UNITS.Celsius;
    }

    getWeatherContentByGeolocation(
      Number(mainLatitude),
      Number(mainLongitude),
      mainUnits
    );
  };

  const loadButtons = function () {
    const btnOpenSearch = header.querySelector("#button-search-open");
    btnOpenSearch.onclick = onClickOpenSearch.bind(btnOpenSearch);

    const btnChangeMetrics = header.querySelector("#button-change-metrics");
    btnChangeMetrics.onclick = changeMetrics.bind(btnChangeMetrics);
  };

  const renderButtons = function () {
    //const btnSearchOpen = header.querySelector("#button-search-open");
    //const svgSearchPath = btnSearchOpen.children[0].children[0];
    // svgSearchPath.setAttribute(
    //   "fill",
    //   currentWeather_BL.isDay()
    //     ? currentWeather_BL.COLORS.Clear()
    //     : currentWeather_BL.COLORS.Dar()
    // );
    // btnSearchOpen.style.backgroundColor = currentWeather_BL.isDay()
    //   ? currentWeather_BL.COLORS.Dark()
    //   : currentWeather_BL.COLORS.Clear();
    // const btnChangeMetrics = header.querySelector("#button-change-metrics");
    // btnChangeMetrics.style.color = currentWeather_BL.isDay()
    //   ? currentWeather_BL.COLORS.Clear()
    //   : currentWeather_BL.COLORS.Dark();
    // btnChangeMetrics.style.backgroundColor = currentWeather_BL.isDay()
    //   ? currentWeather_BL.COLORS.Dark()
    //   : currentWeather_BL.COLORS.Clear();
  };

  /**
   *
   * @param {{getIconId(): string;
   *getCity(): string,
   *getCountry(): string,
   * getLatitude(): number,
   *getLongitude(): number,
   * getDateTime(): Date,
   * getUnits(): string,
   * getCurrentTemp(): number,
   * getSummaryId(): string,
   * getSummaryName(): string,
   * getMaxTemp(): number,
   * getMinTemp(): number,
   * getFeelsLikeTemp(): number,
   * getHumidity(): number,
   * getRainPerc(): number,
   *getWindSpeed(): number;}} objCurrentWeather
   */
  const renderCurrentWeather = function (objCurrentWeather) {
    onCloseSearchBox();

    const pLocationTitle = header.querySelector("#p-location-title");
    pLocationTitle.textContent =
      objCurrentWeather.getCity() + ", " + objCurrentWeather.getCountry();
    pLocationTitle.style.color = currentWeather_BL.isDay()
      ? currentWeather_BL.COLORS.Dark()
      : currentWeather_BL.COLORS.Clear();

    renderButtons();
    //TODO: render the main part to show the weather
    mainCurrent.loadData(objCurrentWeather);
  };

  const getWeatherContentByGeolocation = function (dblLat, dblLong, strUnits) {
    const objCurrentWeather_BL = currentWeather_BL.create();
    objCurrentWeather_BL
      .getByGeoLocation(dblLat, dblLong, strUnits)
      .then(function (response) {
        renderCurrentWeather(response);
      });
  };

  const getWeatherContentByCityName = function (strCityName, strUnits) {
    const objCurrentWeather_BL = currentWeather_BL.create();
    objCurrentWeather_BL
      .getByCityName(strCityName, strUnits)
      .then(function (response) {
        mainLatitude = response.getLatitude().toFixed(2);
        mainLongitude = response.getLongitude().toFixed(2);
        renderCurrentWeather(response);
      });
  };

  const onChangeInputSearch = function () {
    if (this.value.includes("current location")) {
      navigator.geolocation.getCurrentPosition(function (position) {
        mainLatitude = position.coords.latitude.toFixed(2);
        mainLongitude = position.coords.longitude.toFixed(2);

        getWeatherContentByGeolocation(
          Number(mainLatitude),
          Number(mainLongitude),
          mainUnits
        );
      });
    }
  };

  const onCloseSearchBox = function () {
    header.querySelector("#p-location-title").classList.remove("hidden");
    header.querySelector("#button-search-open").classList.remove("hidden");
    header.querySelector("#div-searchbox").classList.add("hidden");
  };

  const onKeyUpInputSearch = function (e) {
    if (e.key === "Enter") {
      getWeatherContentByCityName(e.target.value, mainUnits);
    } else {
      spanEnterIndicator.style.left =
        (measureText(e.target.value, 16) + 54).toString() + "px";
    }
  };

  const loadSearchBox = function () {
    const btnSearchBox = header.querySelector("#input-search-location");
    btnSearchBox.onchange = onChangeInputSearch.bind(btnSearchBox);
    btnSearchBox.onkeyup = onKeyUpInputSearch.bind(onkeyup);

    const btnSearchBoxClose = header.querySelector(
      "#button-header-search-close"
    );
    btnSearchBoxClose.onclick = onCloseSearchBox.bind(btnSearchBoxClose);
  };

  const toggleRadioTabs = function (radioTheOther) {
    const tabRadioThis = document.getElementById("div-tab-content-" + this.id);
    const tabRadioTheOther = document.getElementById(
      "div-tab-content-" + radioTheOther.id
    );

    if (this.checked) {
      tabRadioThis.classList.remove("hidden");
      tabRadioTheOther.classList.add("hidden");
    } else {
      tabRadioThis.classList.add("hidden");
      tabRadioTheOther.classList.remove("hidden");
    }
  };

  const loadTabControl = function () {
    const radioToday = document.getElementById("radio-1");
    const radio7Day = document.getElementById("radio-2");

    radioToday.onchange = toggleRadioTabs.bind(radioToday, radio7Day);
    radio7Day.onchange = toggleRadioTabs.bind(radio7Day, radioToday);
  };

  const loadEvents = function () {
    loadButtons();
    loadSearchBox();
    loadTabControl();
  };

  return {
    onPageLoad() {
      mainUnits = currentWeather_BL.UNITS.Celsius;
      loadEvents();
    },
    initialLoad(dblLatitude, dblLongitude) {
      mainUnits = currentWeather_BL.UNITS.Celsius;
      mainLatitude = dblLatitude;
      mainLongitude = dblLongitude;
      getWeatherContentByGeolocation(
        Number(mainLatitude),
        Number(mainLongitude),
        mainUnits
      );
    },
  };
})();

export { header };
