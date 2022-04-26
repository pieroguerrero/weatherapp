import { DailyWeather } from "../Model/DailyWeather";

const DailyWeather_DA = (function () {
  const formatDailyWeatherList = function (
    objWeatherAPI,
    strUnits,
    intLongitude,
    intLatitude
  ) {
    const arrWeatherList = objWeatherAPI.list;

    const arrObjDailyWeather = arrWeatherList.map((objWeatherAPI) => {
      const objDailyWeather = DailyWeather.shapeDailyWeather(
        strUnits,
        objWeatherAPI.weather.icon,
        objWeatherAPI.weather.id,
        objWeatherAPI.weather.description,
        new Date(objWeatherAPI.dt),
        Number(objWeatherAPI.temp.day),
        Number(objWeatherAPI.temp.min),
        Number(objWeatherAPI.temp.max),
        intLatitude,
        intLongitude
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
   * @param {number} intQtty
   * @returns
   */
  const getDailyWeather = async function (
    intLatitude,
    intLongitude,
    strUnits,
    intQtty
  ) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/daily?lat=" +
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

    return formatDailyWeatherList(result, strUnits, intLongitude, intLatitude);
  };

  return { getDailyWeather };
})();

export { DailyWeather_DA };
