import { BL_dailyWeather } from "../Back/BL/BL_dailyWeather";
import svgSunrise from "../../images/sunrise.svg";
import svgSunset from "../../images/sunset.svg";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import svgMinTemp from "../../images/pressure-low.svg";
import svgMaxTemp from "../../images/pressure-high.svg";
import { BL_Helper } from "../Back/BL/BL_Helper";

const dailyWeather = (function () {
  const divContetTab2 = document.getElementById("div-tab-content-radio-2");
  const shadeLoading = document.getElementById("div-shade-loading");
  const tmpDailyForecastCopy = document.importNode(
    divContetTab2.querySelector("#tmp-7df-list"),
    true
  );
  /**
   *
   * @param {{
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getIconId: function(): string,
   * getDate: function(): Date,
   * getForecastTemp: function(): number,
   * getMaxTemp: function(): number,
   * getMinTemp: function(): number,
   * getLatitude: function(): number,
   * getLongitude: function(): number,
   * getUnits: function(): number,
   * getSunrise: function(): Date,
   * getSunset: function(): Date
   * }[]} arrObjDailyWeather
   */
  const render7DayForecastData = function (arrObjDailyWeather) {
    const ul7dfList = divContetTab2.querySelector("#ul-7df-list");
    ul7dfList.replaceChildren();

    const fragment = document.createDocumentFragment();

    arrObjDailyWeather.forEach((objDayForecast) => {
      const tmp7dfItem = document.importNode(
        tmpDailyForecastCopy,
        true
      ).content;

      const isoDate = parseISO(
        objDayForecast.getDate().toISOString().slice(0, -1)
      );

      tmp7dfItem.querySelector(".p-7df-item-dayname").textContent = format(
        isoDate,
        "EEE"
      );

      tmp7dfItem.querySelector(".p-7df-item-temperature").textContent =
        objDayForecast.getForecastTemp().toFixed(0).toString();
      //+BL_currentWeather.UNITS.SYMBOLS[objDayForecast.getUnits()];

      tmp7dfItem
        .querySelector(".img-7df-temp-max")
        .setAttribute("src", svgMaxTemp);
      tmp7dfItem
        .querySelector(".img-7df-temp-min")
        .setAttribute("src", svgMinTemp);

      tmp7dfItem.querySelector(".p-7df-item-temperature-max").textContent =
        objDayForecast.getMaxTemp().toFixed(0).toString();
      tmp7dfItem.querySelector(".p-7df-item-temperature-min").textContent =
        objDayForecast.getMinTemp().toFixed(0).toString();

      tmp7dfItem
        .querySelector(".img-24hf-item-weather-image")
        .setAttribute(
          "src",
          BL_Helper.WEATHER_CONDITIONS["str" + objDayForecast.getIconId()]
        );

      const isoSunriseDate = parseISO(
        objDayForecast.getSunrise().toISOString().slice(0, -1)
      );
      tmp7dfItem.querySelector(".p-7df-item-sunrise").textContent = format(
        isoSunriseDate,
        "h:mm aaaaa"
      );

      const isoSunsetDate = parseISO(
        objDayForecast.getSunset().toISOString().slice(0, -1)
      );
      tmp7dfItem.querySelector(".p-7df-item-sunset").textContent = format(
        isoSunsetDate,
        "h:mm aaaaa"
      );

      fragment.appendChild(tmp7dfItem);
    });

    ul7dfList.appendChild(fragment);
  };

  const loadImages = function () {
    const imgSunset = divContetTab2.querySelector(
      "#img-7df-header-sunset-image"
    );
    imgSunset.setAttribute("src", svgSunset);

    const imgSunrise = divContetTab2.querySelector(
      "#img-7df-header-sunrise-image"
    );
    imgSunrise.setAttribute("src", svgSunrise);
  };
  return {
    onPageLoad() {
      loadImages();
    },
    loadData(dblLatitude, dblLongitude, strUnits) {
      shadeLoading.classList.remove("hidden");

      const objBL_dailyWeather = BL_dailyWeather.create();
      objBL_dailyWeather
        .get7DaysForecast(dblLatitude, dblLongitude, strUnits)
        .then(function (response) {
          render7DayForecastData(response);
          shadeLoading.classList.add("hidden");
        });
    },
  };
})();

export { dailyWeather };
