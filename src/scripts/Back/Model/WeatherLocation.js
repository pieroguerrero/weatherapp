const WeatherLocation = (function () {
  /**
   *
   * @param {string} strCity
   * @param {string} strCountry
   * @param {number} dblLatitude
   * @param {number} dblLongitude
   * @param {Date} dtDateTime
   * @param {string} strUnits
   * @param {number} dblCurrentTemp
   * @param {string} strSummaryId
   * @param {string} strSummaryName
   * @param {number} dblMaxTemp
   * @param {number} dblMinTemp
   * @param {number} dblFeelsLikeTemp
   * @param {number} dblHumidity
   * @param {number} dblRainPerc
   * @param {number} dblWindSpeed
   * @param {string}strIconId
   * @param {Date} dtSunrise
   * @param {Date} dtSunset
   * @returns
   */
  const shapeWeatherLocation = function (
    //dblId,
    strCity,
    strCountry,
    dblLatitude,
    dblLongitude,
    dtDateTime,
    strUnits,
    dblCurrentTemp,
    strSummaryId,
    strSummaryName,
    dblMaxTemp,
    dblMinTemp,
    dblFeelsLikeTemp,
    dblHumidity,
    dblRainPerc,
    dblWindSpeed,
    strIconId,
    dtSunrise,
    dtSunset
  ) {
    const objWL = {
      //dblId: dblId,
      strCity: strCity,
      strCountry: strCountry,
      dblLatitude: dblLatitude,
      dblLongitude: dblLongitude,
      dtDateTime: dtDateTime,
      strUnits: strUnits,
      dblCurrentTemp: dblCurrentTemp,
      strSummaryId: strSummaryId,
      strSummaryName: strSummaryName,
      dblMaxTemp: dblMaxTemp,
      dblMinTemp: dblMinTemp,
      dblFeelsLikeTemp: dblFeelsLikeTemp,
      dblHumidity: dblHumidity,
      dblRainPerc: dblRainPerc,
      dblWindSpeed: dblWindSpeed,
      strIconId: strIconId,
      dtSunrise: dtSunrise,
      dtSunset: dtSunset,
    };

    return {
      getIconId() {
        return objWL.strIconId;
      },
      getCity() {
        return objWL.strCity;
      },
      getCountry() {
        return objWL.strCountry;
      },
      getLatitude() {
        return objWL.dblLatitude;
      },
      getLongitude() {
        return objWL.dblLongitude;
      },
      getDateTime() {
        return objWL.dtDateTime;
      },
      getUnits() {
        return objWL.strUnits;
      },
      getCurrentTemp() {
        return objWL.dblCurrentTemp;
      },
      getSummaryId() {
        return objWL.strSummaryId;
      },
      getSummaryName() {
        return objWL.strSummaryName;
      },
      getMaxTemp() {
        return objWL.dblMaxTemp;
      },
      getMinTemp() {
        return objWL.dblMinTemp;
      },
      getFeelsLikeTemp() {
        return objWL.dblFeelsLikeTemp;
      },
      getHumidity() {
        return objWL.dblHumidity;
      },
      getRainPerc() {
        return objWL.dblRainPerc;
      },
      getWindSpeed() {
        return objWL.dblWindSpeed;
      },
      getSunrise() {
        return objWL.dtSunrise;
      },
      getSunset() {
        return objWL.dtSunset;
      },
    };
  };

  return { shapeWeatherLocation };
})();

export { WeatherLocation };
