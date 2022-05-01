import { BL_dailyWeather } from "../Back/BL/BL_dailyWeather";
import svgSunrise from "../../images/sunrise.svg";
import svgSunset from "../../images/sunset.svg";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { BL_currentWeather } from "../Back/BL/BL_currentWeather";

const dailyWeather = (function () {
  const divContetTab2 = document.getElementById("div-tab-content-radio-2");
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
        objDayForecast.getForecastTemp().toFixed(0).toString() +
        BL_currentWeather.UNITS.SYMBOLS[objDayForecast.getUnits()];

      //   tmp24hFItem
      //     .querySelector(".img-24hf-item-weather-image")
      //     .setAttribute(
      //       "src",
      //       BL_Helper.WEATHER_CONDITIONS["str" + objHourForecast.getIconId()]
      //     );

      //   const isoDate = parseISO(
      //     objHourForecast.getTime().toISOString().slice(0, -1)
      //   );
      //   tmp24hFItem.querySelector(".p-24hf-item-time").textContent = format(
      //     isoDate,
      //     "h aaa"
      //   );

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
      const objBL_dailyWeather = BL_dailyWeather.create();
      objBL_dailyWeather
        .get7DaysForecast(dblLatitude, dblLongitude, strUnits)
        .then(function (response) {
          render7DayForecastData(response);
        });
    },
  };
})();

export { dailyWeather };
