import { DailyWeather_DA } from "../DA/DailyWeather_DA";

const dailyWeather_BL = (function () {
  /**
   *
   * @param {number} intLatitude
   * @param {number} intLongitude
   * @param {string} strUnits
   * @returns
   */
  const get7DaysForecast = async function (
    intLatitude,
    intLongitude,
    strUnits
  ) {
    const objDaiyWeather_Data = DailyWeather_DA.create();
    try {
      const objResult = await objDaiyWeather_Data.getDailyWeather(
        intLatitude,
        intLongitude,
        strUnits
      );

      return objResult.slice(1, 7);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    create() {
      return { get7DaysForecast };
    },
  };
})();

export { dailyWeather_BL };
