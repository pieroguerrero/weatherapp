import { dailyWeather } from "./scripts/Front/dailyWeather";
import { header } from "./scripts/Front/header";
import { mainCurrent } from "./scripts/Front/mainCurrent";
import "./styles.css";

header.onPageLoad();
mainCurrent.onPageLoad();
dailyWeather.onPageLoad();

//Magdalena Del Mar
header.initialLoad(-12.0923688, -77.0733086);
