const DailyWeather = (function () {
  const dailyWeatherActions = {
    getId() {
      return this.intId;
    },
    getLodationId() {
      return this.intLocationId;
    },
    getSummaryId() {
      return this.strSummaryId;
    },
    getSummaryName() {
      return this.strSummaryName;
    },
    getDate() {
      return this.dtDate;
    },
    getForecastTemp() {
      return this.dblForecastTemp;
    },
  };

  /**
   *
   * @param {number} intId
   * @param {number} intLocationId
   * @param {string} strSummaryId
   * @param {string} strSummaryName
   * @param {Date} dtDate
   * @param {number} dblForecastTemp
   * @returns {{
   * getId: function(): number,
   * getLodationId: function(): number,
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getDate: function(): Date,
   * getForecastTemp: function(): number,
   * }}
   */
  const shapeDailyWeather = function (
    intId,
    intLocationId,
    strSummaryId,
    strSummaryName,
    dtDate,
    dblForecastTemp
  ) {
    const objHW = Object.create(dailyWeatherActions);

    objHW.intId = intId;
    objHW.intLocationId = intLocationId;
    objHW.strSummaryId = strSummaryId;
    objHW.strSummaryName = strSummaryName;
    objHW.dtDate = dtDate;
    objHW.dblForecastTemp = dblForecastTemp;

    return {
      getId: objHW.getId.bind(objHW),
      getLodationId: objHW.getLodationId.bind(objHW),
      getSummaryId: objHW.getSummaryId.bind(objHW),
      getSummaryName: objHW.getSummaryName.bind(objHW),
      getDate: objHW.getDate.bind(objHW),
      getForecastTemp: objHW.getForecastTemp.bind(objHW),
    };
  };

  return { shapeDailyWeather };
})();

export { DailyWeather };
