import { currentWeather_BL } from "./scripts/Back/BL/currentWeather_BL";
import { hourlyWeather_BL } from "./scripts/Back/BL/hourlyWeather_BL";
import { header } from "./scripts/Front/header";
import "./styles.css";

const objCurrentWeather_BL = currentWeather_BL.create();

let intLatitude, intLongitude;

objCurrentWeather_BL
  .getByCityName("lima", objCurrentWeather_BL.UNITS.Celsius)
  .then(function (responseCurrent) {
    console.log("Feels Like:", responseCurrent.getFeelsLikeTemp().toString());
    console.log("Rain Percentage:", responseCurrent.getRainPerc());
    console.log("Country Code:", responseCurrent.getCountry());
    console.log(
      "Current Time UTC:",
      responseCurrent.getDateTime().toUTCString()
    );
    console.log(responseCurrent);

    intLatitude = responseCurrent.getLatitude();
    intLongitude = responseCurrent.getLongitude();

    const objHourlyWeather_BL = hourlyWeather_BL.create();
    objHourlyWeather_BL
      .get24HoursForecast(
        intLatitude,
        intLongitude,
        objCurrentWeather_BL.UNITS.Celsius
      )
      .then(function (responseHourly) {
        for (let i = 0; i < responseHourly.length; i++) {
          const objHourlyWeather = responseHourly[i];

          console.log("#:", i);
          console.log("Summary Name:", objHourlyWeather.getSummaryName());
          console.log("Country Code:", objHourlyWeather.getUnits());
          console.log(
            "Current Time UTC:",
            objHourlyWeather.getTime().toUTCString()
          );
        }
      });
  });

header.onPageLoad(1, 1);
