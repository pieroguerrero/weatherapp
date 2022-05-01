import svgMinTemp from "../../images/pressure-low.svg";
import svgMaxTemp from "../../images/pressure-high.svg";

import svgThermometer from "../../images/thermometer.svg";
import svgHumidity from "../../images/humidity.svg";
import svgChanceRain from "../../images/chance-rain.svg";
import svgWindSpeed from "../../images/wind-speed.svg";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { BL_currentWeather } from "../Back/BL/BL_currentWeather";
import { BL_Helper } from "../Back/BL/BL_Helper";
import { BL_hourlyWeather } from "../Back/BL/BL_hourlyWeather";

const mainCurrent = (function () {
  const divContetTab1 = document.getElementById("div-tab-content-radio-1");
  const shadeLoading = document.getElementById("div-shade-loading");
  const tmpHourlyForecastCopy = document.importNode(
    divContetTab1.querySelector("#tmp-24hf-list-item"),
    true
  );

  const loadImages = function () {
    const imgMinTemp = divContetTab1.querySelector("#img-today-min-temp");
    imgMinTemp.setAttribute("src", svgMinTemp);

    const imgMaxTemp = divContetTab1.querySelector("#img-today-max-temp");
    imgMaxTemp.setAttribute("src", svgMaxTemp);

    const imgFeelsLike = divContetTab1.querySelector("#img-today-feelslike");
    imgFeelsLike.setAttribute("src", svgThermometer);

    const imgHumidity = divContetTab1.querySelector("#img-today-humidity");
    imgHumidity.setAttribute("src", svgHumidity);

    const imgChanceRain = divContetTab1.querySelector(
      "#img-today-chanceofrain"
    );
    imgChanceRain.setAttribute("src", svgChanceRain);

    const imgWindSpeed = divContetTab1.querySelector("#img-today-windspeed");
    imgWindSpeed.setAttribute("src", svgWindSpeed);
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
  const loadMainWigets = function (objCurrentWeather) {
    const strMetrics =
      BL_currentWeather.UNITS.SYMBOLS[objCurrentWeather.getUnits()];

    const pTodayTemp = divContetTab1.querySelector("#p-today-temperature");
    pTodayTemp.textContent =
      objCurrentWeather.getCurrentTemp().toFixed(0).toString() + strMetrics;

    const pMaxTemp = divContetTab1.querySelector("#p-today-max-temp");
    pMaxTemp.textContent =
      objCurrentWeather.getMaxTemp().toFixed(0).toString() + strMetrics;

    const pMinTemp = divContetTab1.querySelector("#p-today-min-temp");
    pMinTemp.textContent =
      objCurrentWeather.getMinTemp().toFixed(0).toString() + strMetrics;

    const pSummaryDesc = divContetTab1.querySelector(
      "#p-today-summary-description"
    );
    pSummaryDesc.textContent = objCurrentWeather.getSummaryName();

    const imgTodayImage = divContetTab1.querySelector(
      "#img-today-summary-image"
    );
    imgTodayImage.setAttribute(
      "src",
      BL_Helper.WEATHER_CONDITIONS["str" + objCurrentWeather.getIconId()]
    );
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
  const loadSecondaryWidgets = function (objCurrentWeather) {
    const strMetrics =
      BL_currentWeather.UNITS.SYMBOLS[objCurrentWeather.getUnits()];

    const pFeelsLike = divContetTab1.querySelector(
      "#p-today-feelslike-temperature"
    );
    pFeelsLike.textContent =
      objCurrentWeather.getFeelsLikeTemp().toFixed(1) + " " + strMetrics;

    const pHumidity = divContetTab1.querySelector(
      "#p-today-humidity-temperature"
    );
    pHumidity.textContent = objCurrentWeather.getHumidity().toFixed(1) + " %";

    const pChanceRain = divContetTab1.querySelector(
      "#p-today-chanceofrain-temperature"
    );
    pChanceRain.textContent = objCurrentWeather.getRainPerc().toFixed(1) + " %";

    const pWindSpeed = divContetTab1.querySelector(
      "#p-today-windspeed-temperature"
    );
    pWindSpeed.textContent =
      (objCurrentWeather.getWindSpeed() * 3.6).toFixed(1) + " Km/h";
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
  const loadMainInfo = function (objCurrentWeather) {
    const pDateTime = divContetTab1.querySelector("#p-fetched-time");

    const isoDate = parseISO(
      objCurrentWeather.getDateTime().toISOString().slice(0, -1)
    );
    pDateTime.textContent = format(isoDate, "EEEE MMM d, h:mm aaa");

    loadMainWigets(objCurrentWeather);
    loadSecondaryWidgets(objCurrentWeather);
  };

  /**
   *
   * @param {{
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getTime: function(): Date,
   * getForecastTemp: function(): number,
   * getLatitude: function(): number,
   * getLongitude: function(): number,
   * getUnits: function(): number,
   * getIconId: function(): string
   * }[]} arr24HFList
   * @param {Date} dtMainDate
   */
  const render24HFList = function (arr24HFList, dtMainDate) {
    const ul24hfList = divContetTab1.querySelector("#ul-24hf-list");
    ul24hfList.replaceChildren();

    const fragment = document.createDocumentFragment();

    arr24HFList.forEach((objHourForecast) => {
      const tmp24hFItem = document.importNode(
        tmpHourlyForecastCopy,
        true
      ).content;

      const objHFDateTime = objHourForecast.getTime();

      let strTomorrow = "";
      if (objHFDateTime.getUTCFullYear() > dtMainDate.getUTCFullYear()) {
        strTomorrow = "(+1)";
      } else if (objHFDateTime.getUTCMonth() > dtMainDate.getUTCMonth()) {
        strTomorrow = "(+1)";
      } else if (objHFDateTime.getUTCDate() > dtMainDate.getUTCDate()) {
        strTomorrow = "(+1)";
      }

      tmp24hFItem.querySelector(".p-24hf-item-tomorrow").textContent =
        strTomorrow;
      objHourForecast.getTime;
      tmp24hFItem.querySelector(".p-24hf-item-temperature").textContent =
        objHourForecast.getForecastTemp().toFixed(0).toString() +
        BL_currentWeather.UNITS.SYMBOLS[objHourForecast.getUnits()];
      tmp24hFItem
        .querySelector(".img-24hf-item-weather-image")
        .setAttribute(
          "src",
          BL_Helper.WEATHER_CONDITIONS["str" + objHourForecast.getIconId()]
        );

      const isoDate = parseISO(
        objHourForecast.getTime().toISOString().slice(0, -1)
      );
      tmp24hFItem.querySelector(".p-24hf-item-time").textContent = format(
        isoDate,
        "h aaa"
      );

      fragment.appendChild(tmp24hFItem);
    });

    ul24hfList.appendChild(fragment);
  };

  /**
   *
   * @param {number} dblLatitude
   * @param {number} dblLongitude
   * @param {string} strUnits
   * @param {Date} dtMainDate
   */
  const load24HourForecast = function (
    dblLatitude,
    dblLongitude,
    strUnits,
    dtMainDate
  ) {
    const objBL_HourlyWeather = BL_hourlyWeather.create();
    const pro24HWList = objBL_HourlyWeather.get24HoursForecast(
      dblLatitude,
      dblLongitude,
      strUnits
    );

    pro24HWList.then(function (response) {
      render24HFList(response, dtMainDate);
      shadeLoading.classList.add("hidden");
    });
  };

  return {
    onPageLoad() {
      //loadEvents();
      loadImages();
    },
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
    loadData(objCurrentWeather) {
      loadMainInfo(objCurrentWeather);
      load24HourForecast(
        objCurrentWeather.getLatitude(),
        objCurrentWeather.getLongitude(),
        objCurrentWeather.getUnits(),
        //parseISO(objCurrentWeather.getDateTime().toISOString().slice(0, -1))
        objCurrentWeather.getDateTime()
      );
    },
  };
})();

export { mainCurrent };
