import { WeatherLocation_DA } from "../DA/WeatherLocation_DA";

const currentWeather_BL = (function () {
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
  };
})();

export { currentWeather_BL };
