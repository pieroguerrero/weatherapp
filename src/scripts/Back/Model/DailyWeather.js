const DailyWeather = (function () {
  const dailyWeatherActions = {
    getIconId() {
      return this.strIconId;
    },
    getLatitude() {
      return this.dblLatitude;
    },
    getLongitude() {
      return this.dblLongitude;
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
    getUnits() {
      return this.strUnits;
    },
    getMaxTemp() {
      return this.dblForecastTemp;
    },
    getMinTemp() {
      return this.dblForecastTemp;
    },
  };

  /**
   *
   * @param {number} dblLongitude
   * @param {number} dblLatitude
   * @param {string} strSummaryId
   * @param {string} strSummaryName
   * @param {Date} dtDate
   * @param {number} dblForecastTemp
   * @param {number} dblMaxTemp
   * @param {number} dblMinTemp
   * @param {string} strIconId
   * @param {string} strUnits
   * @returns {{
   * getSummaryId: function(): number,
   * getSummaryName: function(): string,
   * getIconId: function(): string,
   * getDate: function(): Date,
   * getForecastTemp: function(): number,
   * getMaxTemp: function(): number,
   * getMinTemp: function(): number,
   * getLatitude: function(): number,
   * getLongitude: function(): number,
   * getUnits: function(): number
   * }}
   */
  const shapeDailyWeather = function (
    strUnits,
    strIconId,
    strSummaryId,
    strSummaryName,
    dtDate,
    dblForecastTemp,
    dblMinTemp,
    dblMaxTemp,
    dblLatitude,
    dblLongitude
  ) {
    const objHW = Object.create(dailyWeatherActions);

    objHW.strUnits = strUnits;
    objHW.strIconId = strIconId;
    objHW.dblMinTemp = dblMinTemp;
    objHW.dblMaxTemp = dblMaxTemp;
    objHW.dblLatitude = dblLatitude;
    objHW.dblLongitude = dblLongitude;
    objHW.strSummaryId = strSummaryId;
    objHW.strSummaryName = strSummaryName;
    objHW.dtDate = dtDate;
    objHW.dblForecastTemp = dblForecastTemp;

    return {
      getUnits: objHW.getUnits.bind(objHW),
      getIconId: objHW.getIconId.bind(objHW),
      getLatitude: objHW.getLatitude.bind(objHW),
      getLongitude: objHW.getLongitude.bind(objHW),
      getSummaryId: objHW.getSummaryId.bind(objHW),
      getSummaryName: objHW.getSummaryName.bind(objHW),
      getDate: objHW.getDate.bind(objHW),
      getForecastTemp: objHW.getForecastTemp.bind(objHW),
      getMaxTemp: objHW.getMaxTemp.bind(objHW),
      getMinTemp: objHW.getMinTemp.bind(objHW),
    };
  };

  return { shapeDailyWeather };
})();

export { DailyWeather };
