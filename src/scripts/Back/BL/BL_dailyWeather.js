import { DailyWeather_DA } from "../DA/DailyWeather_DA";

const BL_dailyWeather = (function () {
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

      return objResult.slice(1, 8);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    create() {
      return { get7DaysForecast };
    },
  };
})();

export { BL_dailyWeather };
