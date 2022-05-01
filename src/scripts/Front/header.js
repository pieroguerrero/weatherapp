import { BL_currentWeather } from "../Back/BL/BL_currentWeather";
import { dailyWeather } from "./dailyWeather";
import { mainCurrent } from "./mainCurrent";
import svgDarkBg from "../../images/dark-bg.jpg";

const header = (function () {
  const header = document.querySelector("header");
  const spanEnterIndicator = header.querySelector("#span-search-enter");
  const shadeLoading = document.getElementById("div-shade-loading");

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
    //header.querySelector("#input-search-location").focus();

    //test
    //const root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
    //root.classList.add("dark");
  };

  const changeMetrics = function () {
    if (this.textContent.includes("C")) {
      this.textContent = "F°";
      mainUnits = BL_currentWeather.UNITS.Fahrenheit;
    } else {
      this.textContent = "C°";
      mainUnits = BL_currentWeather.UNITS.Celsius;
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

  /**
   *
   * @param {Date} dtCurrentDate
   * @param {Date} dtSunrise
   * @param {Date} dtSunset
   */
  const setBackground = function (dtCurrentDate, dtSunrise, dtSunset) {
    const root = document.getElementsByTagName("html")[0];

    if (
      dtCurrentDate.toISOString() < dtSunset.toISOString() &&
      dtCurrentDate.toISOString() > dtSunrise.toISOString()
    ) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
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
   *getWindSpeed(): number,
   * getSunrise(): Date,
   * getSunset(): Date}} objCurrentWeather
   */
  const renderCurrentWeather = function (objCurrentWeather) {
    onCloseSearchBox();

    const radio1 = document.getElementById("radio-1");
    if (!radio1.checked) {
      radio1.checked = true;
      document
        .getElementById("div-tab-content-radio-1")
        .classList.remove("hidden");
      document
        .getElementById("div-tab-content-radio-2")
        .classList.add("hidden");
    }

    const pLocationTitle = header.querySelector("#p-location-title");
    pLocationTitle.textContent =
      objCurrentWeather.getCity() + ", " + objCurrentWeather.getCountry();

    //renderButtons();
    setBackground(
      objCurrentWeather.getDateTime(),
      objCurrentWeather.getSunrise(),
      objCurrentWeather.getSunset()
    );
    mainCurrent.loadData(objCurrentWeather);
  };

  const getWeatherContentByGeolocation = function (dblLat, dblLong, strUnits) {
    shadeLoading.classList.remove("hidden");

    const objCurrentWeather_BL = BL_currentWeather.create();
    objCurrentWeather_BL
      .getByGeoLocation(dblLat, dblLong, strUnits)
      .then(function (response) {
        mainLatitude = response.getLatitude();
        mainLongitude = response.getLongitude();
        renderCurrentWeather(response);
        //shadeLoading.classList.add("hidden");
      });
  };

  const getWeatherContentByCityName = function (strCityName, strUnits) {
    shadeLoading.classList.remove("hidden");

    const objCurrentWeather_BL = BL_currentWeather.create();
    objCurrentWeather_BL
      .getByCityName(strCityName, strUnits)
      .then(function (response) {
        mainLatitude = response.getLatitude();
        mainLongitude = response.getLongitude();
        renderCurrentWeather(response);

        header.querySelector("#input-search-location").value = "";
        //shadeLoading.classList.add("hidden");
      })
      .catch(function (error) {
        alert(
          "We coudn't find the City you entered. Please try entering the name without special characters."
        );

        header.querySelector("#input-search-location").value = "";
        shadeLoading.classList.add("hidden");

        console.log(error);
      });
  };

  const onChangeInputSearch = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      mainLatitude = position.coords.latitude;
      mainLongitude = position.coords.longitude;

      getWeatherContentByGeolocation(mainLatitude, mainLongitude, mainUnits);
    });
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
    btnSearchBox.onkeyup = onKeyUpInputSearch.bind(onkeyup);

    const btnCurrentLocation = header.querySelector(
      "#button-option-current-location"
    );
    btnCurrentLocation.onclick = onChangeInputSearch.bind(btnCurrentLocation);

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

    tabRadioThis.classList.remove("hidden");
    tabRadioTheOther.classList.add("hidden");

    if (this.id === "radio-1") {
      //carga main current weather
      getWeatherContentByGeolocation(
        Number(mainLatitude),
        Number(mainLongitude),
        mainUnits
      );
    } else if (this.id === "radio-2") {
      //carga forecast 7 days
      dailyWeather.loadData(
        Number(mainLatitude),
        Number(mainLongitude),
        mainUnits
      );
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
      //mainUnits = BL_currentWeather.UNITS.Celsius;
      //loadBackgrounds();
      loadEvents();
    },
    initialLoad(dblLatitude, dblLongitude) {
      mainUnits = BL_currentWeather.UNITS.Celsius;
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
