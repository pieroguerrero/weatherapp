import { WeatherLocation } from "../Model/WeatherLocation";

const WeatherLocation_DA = (function () {
  const formatWeatherObject = function (objWeatherAPI, strUnits) {
    const objWeatherLocation = WeatherLocation.shapeWeatherLocation(
      objWeatherAPI.name,
      objWeatherAPI.sys.country,
      Number(objWeatherAPI.coord.lat),
      Number(objWeatherAPI.coord.lon),
      new Date(
        (Number(objWeatherAPI.dt) + Number(objWeatherAPI.timezone)) * 1000
      ),
      strUnits,
      Number(objWeatherAPI.main.temp),
      objWeatherAPI.weather.id,
      objWeatherAPI.weather.description,
      Number(objWeatherAPI.main.temp_max),
      Number(objWeatherAPI.main.temp_min),
      Number(objWeatherAPI.main.feels_like),
      Number(objWeatherAPI.main.humidity),
      Number(objWeatherAPI.rain["1h"]),
      Number(objWeatherAPI.wind.speed),
      objWeatherAPI.weather.icon
    );

    return objWeatherLocation;
  };

  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const getWeatherByGeoLocation = async function (
    intLatitude,
    intLongitude,
    strUnits
  ) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        intLatitude.toString() +
        "&lon=" +
        intLongitude.toString() +
        "&units=" +
        strUnits +
        "&appid=4fd71c9304891db4dfeb351a2901ae58",
      { mode: "cors" }
    );

    const result = await response.json();

    return formatWeatherObject(result, strUnits);
  };

  /**
   *
   * @param {string} strCityName
   * @param {string} strUnits
   * @returns
   */
  const getWeatherByCityName = async function (strCityName, strUnits) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        strCityName.toString() +
        "&units=" +
        strUnits +
        "&appid=4fd71c9304891db4dfeb351a2901ae58",
      { mode: "cors" }
    );

    const result = await response.json();

    return formatWeatherObject(result, strUnits);
  };

  return {
    create() {
      return { getWeatherByGeoLocation, getWeatherByCityName };
    },
  };
})();

export { WeatherLocation_DA };
