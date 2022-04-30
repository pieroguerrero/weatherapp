import svgMinTemp from "../../images/pressure-low.svg";
import svgMaxTemp from "../../images/pressure-high.svg";

import svgThermometer from "../../images/thermometer.svg";
import svgHumidity from "../../images/humidity.svg";
import svgChanceRain from "../../images/chance-rain.svg";
import svgWindSpeed from "../../images/wind-speed.svg";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { currentWeather_BL } from "../Back/BL/currentWeather_BL";

const mainCurrent = (function () {
  const divContetTab1 = document.getElementById("div-tab-content-radio-1");

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
      currentWeather_BL.UNITS.SYMBOLS[objCurrentWeather.getUnits()];

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

    //img-today-summary-image
    //
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
    //loadSecondaryWidgets();
  };

  const load24HourForecast = function () {};
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
      load24HourForecast();
    },
  };
})();

export { mainCurrent };
