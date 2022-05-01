import { DailyWeather } from "../Model/DailyWeather";

const DailyWeather_DA = (function () {
  /**
   *
   * @param {object} objWeatherAPI
   * @param {string} strUnits
   * @param {number} intLongitude
   * @param {number} intLatitude
   * @returns {{
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
   * }[]}
   */
  const formatDailyWeatherList = function (
    objWeatherAPI,
    strUnits,
    intLongitude,
    intLatitude
  ) {
    const intTimeZoneOffSet = Number(objWeatherAPI.timezone_offset);
    const arrWeatherList = objWeatherAPI.daily;

    const arrObjDailyWeather = arrWeatherList.map((objWeatherAPI) => {
      const objDailyWeather = DailyWeather.shapeDailyWeather(
        strUnits,
        objWeatherAPI.weather[0].icon,
        objWeatherAPI.weather[0].id,
        objWeatherAPI.weather[0].description,
        new Date((Number(objWeatherAPI.dt) + intTimeZoneOffSet) * 1000),
        Number(objWeatherAPI.temp.day),
        Number(objWeatherAPI.temp.min),
        Number(objWeatherAPI.temp.max),
        intLatitude,
        intLongitude,
        new Date((Number(objWeatherAPI.sunrise) + intTimeZoneOffSet) * 1000),
        new Date((Number(objWeatherAPI.sunset) + intTimeZoneOffSet) * 1000)
      );

      return objDailyWeather;
    });

    return arrObjDailyWeather;
  };

  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const getDailyWeather = async function (intLatitude, intLongitude, strUnits) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        intLatitude.toString() +
        "&lon=" +
        intLongitude.toString() +
        "&units=" +
        strUnits +
        "&appid=4fd71c9304891db4dfeb351a2901ae58" +
        "&exclude=minutely,hourly",
      { mode: "cors" }
    );

    const result = await response.json();

    return formatDailyWeatherList(result, strUnits, intLongitude, intLatitude);
  };

  return {
    create() {
      return { getDailyWeather };
    },
  };
})();

export { DailyWeather_DA };
