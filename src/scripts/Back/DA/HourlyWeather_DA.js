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
   * }[]}
   */
  const formatHourlyWeatherList = function (
    objWeatherAPI,
    strUnits,
    intLongitude,
    intLatitude
  ) {
    const arrWeatherList = objWeatherAPI.list;

    const arrObjHourlyWeather = arrWeatherList.map((objWeatherAPI) => {
      const objHourlyWeather = HourlyWeather.shapeHourlyWeather(
        objWeatherAPI.weather.id,
        objWeatherAPI.weather.description,
        new Date(objWeatherAPI.dt),
        Number(objWeatherAPI.main.temp),
        objWeatherAPI.weather.icon,
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
   * @param {number} intQtty
   * @returns
   */
  const getHourlyWeather = async function (
    intLatitude,
    intLongitude,
    strUnits,
    intQtty
  ) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/hourly?lat=" +
        intLatitude.toString() +
        "&lon=" +
        intLongitude.toString() +
        "&units=" +
        strUnits +
        "&appid=4fd71c9304891db4dfeb351a2901ae58" +
        "&cnt=" +
        intQtty.toString(),
      { mode: "cors" }
    );

    const result = await response.json();

    return formatHourlyWeatherList(result, strUnits, intLongitude, intLatitude);
  };

  return { getHourlyWeather };
})();

export { HourlyWeather_DA };
