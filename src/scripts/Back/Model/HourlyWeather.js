const HourlyWeather = (function () {
  const hourlyWeatherActions = {
    getIconId() {
      return this.strIconId;
    },
    getSummaryId() {
      return this.strSummaryId;
    },
    getSummaryName() {
      return this.strSummaryName;
    },
    getUnits() {
      return this.strUnits;
    },
    getTime() {
      return this.dtTime;
    },
    getForecastTemp() {
      return this.dblForecastTemp;
    },
    getLatitude() {
      return this.dblLatitude;
    },
    getLongitude() {
      return this.dblLongitude;
    },
  };

  /**
   *
   * @param {string} strIconId
   * @param {string} strSummaryId
   * @param {string} strSummaryName
   * @param {string} strUnits
   * @param {Date} dtTime
   * @param {number} dblForecastTemp
   * @param {number} dblLongitude
   * @param {number} dblLatitude;
   * @returns {{
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getTime: function(): Date,
   * getForecastTemp: function(): number,
   * getLatitude: function(): number,
   * getLongitude: function(): number,
   * getUnits: function(): number,
   * getIconId: function(): string,
   * }}
   */
  const shapeHourlyWeather = function (
    strSummaryId,
    strSummaryName,
    dtTime,
    dblForecastTemp,
    strIconId,
    dblLatitude,
    dblLongitude,
    strUnits
  ) {
    const objHW = Object.create(hourlyWeatherActions);

    objHW.dblLatitude = dblLatitude;
    objHW.dblLongitude = dblLongitude;
    objHW.strSummaryId = strSummaryId;
    objHW.strSummaryName = strSummaryName;
    objHW.dtTime = dtTime;
    objHW.dblForecastTemp = dblForecastTemp;
    objHW.strIconId = strIconId;
    objHW.strUnits = strUnits;

    return {
      getLatitude: objHW.getLatitude.bind(objHW),
      getLongitude: objHW.getLongitude.bind(objHW),
      getSummaryId: objHW.getSummaryId.bind(objHW),
      getSummaryName: objHW.getSummaryName.bind(objHW),
      getTime: objHW.getTime.bind(objHW),
      getForecastTemp: objHW.getForecastTemp.bind(objHW),
      getUnits: objHW.getUnits.bind(objHW),
      getIconId: objHW.getIconId.bind(objHW),
    };
  };

  return { shapeHourlyWeather };
})();

export { HourlyWeather };
