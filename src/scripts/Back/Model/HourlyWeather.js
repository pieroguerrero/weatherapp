const HourlyWeather = (function () {
  const hourlyWeatherActions = {
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
    getTime() {
      return this.dtTime;
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
   * @param {Date} dtTime
   * @param {number} dblForecastTemp
   * @returns {{
   * getId: function(): number,
   * getLodationId: function(): number,
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getTime: function(): Date,
   * getForecastTemp: function(): number,
   * }}
   */
  const shapeHourlyWeather = function (
    intId,
    intLocationId,
    strSummaryId,
    strSummaryName,
    dtTime,
    dblForecastTemp
  ) {
    const objHW = Object.create(hourlyWeatherActions);

    objHW.intId = intId;
    objHW.intLocationId = intLocationId;
    objHW.strSummaryId = strSummaryId;
    objHW.strSummaryName = strSummaryName;
    objHW.dtTime = dtTime;
    objHW.dblForecastTemp = dblForecastTemp;

    return {
      getId: objHW.getId.bind(objHW),
      getLodationId: objHW.getLodationId.bind(objHW),
      getSummaryId: objHW.getSummaryId.bind(objHW),
      getSummaryName: objHW.getSummaryName.bind(objHW),
      getTime: objHW.getTime.bind(objHW),
      getForecastTemp: objHW.getForecastTemp.bind(objHW),
    };
  };
})();

export { HourlyWeather };
