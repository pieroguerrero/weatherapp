import { HourlyWeather } from "../Model/HourlyWeather";

const HourlyWeather_DA = (function () {
  /**
   *
   * @param {object} objWeatherAPI
   * @param {string} strUnits
   * @param {number} intLongitude
   * @param {number} intLatitude
   * @returns {{
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getTime: function(): Date,
   * getForecastTemp: function(): number,
   * getLatitude: function(): number,
   * getLongitude: function(): number,
   * getUnits: function(): number,
   * getIconId: function(): string,
   * }[]}
   */
  const formatHourlyWeatherList = function (
    objWeatherAPI,
    strUnits,
    intLongitude,
    intLatitude
  ) {
    const intTimeZoneOffSet = Number(objWeatherAPI.timezone_offset);
    const arrWeatherList = objWeatherAPI.hourly;

    const arrObjHourlyWeather = arrWeatherList.map((objWeatherAPI) => {
      const objHourlyWeather = HourlyWeather.shapeHourlyWeather(
        objWeatherAPI.weather[0].id,
        objWeatherAPI.weather[0].description,
        new Date((Number(objWeatherAPI.dt) + intTimeZoneOffSet) * 1000),

        Number(objWeatherAPI.temp),
        objWeatherAPI.weather[0].icon,
        intLatitude,
        intLongitude,
        strUnits
      );

      return objHourlyWeather;
    });

    return arrObjHourlyWeather;
  };
  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const getHourlyWeather = async function (
    intLatitude,
    intLongitude,
    strUnits
  ) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        intLatitude.toString() +
        "&lon=" +
        intLongitude.toString() +
        "&units=" +
        strUnits +
        "&appid=4fd71c9304891db4dfeb351a2901ae58" +
        "&exclude=minutely,daily",
      { mode: "cors" }
    );

    const result = await response.json();

    return formatHourlyWeatherList(result, strUnits, intLongitude, intLatitude);
  };

  return {
    create() {
      return { getHourlyWeather };
    },
  };
})();

export { HourlyWeather_DA };
