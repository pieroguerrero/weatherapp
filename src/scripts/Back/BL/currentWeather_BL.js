import { WeatherLocation_DA } from "../DA/WeatherLocation_DA";

const currentWeather_BL = (function () {
  const strVarColorDark = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--dark-color");
  const strVarColorClear = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--clear-color");

  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const getByGeoLocation = async function (
    intLatitude,
    intLongitude,
    strUnits
  ) {
    const objWeatherLocation_Data = WeatherLocation_DA.create();
    const objResult = await objWeatherLocation_Data.getWeatherByGeoLocation(
      intLatitude,
      intLongitude,
      strUnits
    );

    return objResult;
  };

  const getByCityName = async function (strCityName, strUnits) {
    const objWeatherLocation_Data = WeatherLocation_DA.create();
    const objResult = await objWeatherLocation_Data.getWeatherByCityName(
      strCityName,
      strUnits
    );

    return objResult;
  };

  /**
   *
   * @returns {boolean}
   */
  const isDay = function () {
    return true;
  };

  return {
    create() {
      return { getByGeoLocation, getByCityName };
    },
    UNITS: {
      Celsius: "metric",
      Fahrenheit: "imperial",
      Kelvin: "standard",
      SYMBOLS: {
        metric: "C°",
        imperial: "F°",
        standard: "K°",
      },
    },
    isDay,
    COLORS: {
      Clear() {
        return strVarColorClear;
      },
      Dark() {
        return strVarColorDark;
      },
    },
  };
})();

export { currentWeather_BL };
