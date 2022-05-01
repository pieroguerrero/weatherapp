import { HourlyWeather_DA } from "../DA/HourlyWeather_DA";

const BL_hourlyWeather = (function () {
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
    try {
      const objResult = await objHourlyWeather_Data.getHourlyWeather(
        intLatitude,
        intLongitude,
        strUnits
      );

      return objResult.slice(1, 25);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    create() {
      return { get24HoursForecast };
    },
  };
})();

export { BL_hourlyWeather };
