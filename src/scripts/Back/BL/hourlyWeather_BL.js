import { HourlyWeather_DA } from "../DA/HourlyWeather_DA";
import { HourlyWeather } from "../Model/HourlyWeather";

const hourlyWeather_BL = (function () {
  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const get24HoursForecast = async function (
    intLatitude,
    intLongitude,
    strUnits
  ) {
    const objHourlyWeather_Data = HourlyWeather_DA.create();
    const objResult = await objHourlyWeather_Data.getHourlyWeather(
      intLatitude,
      intLongitude,
      strUnits
    );

    return objResult;
  };
})();

export { hourlyWeather_BL };
