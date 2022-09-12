
# Weather App
> Get accurate weather forecast every day. 
> Live demo [_here_](https://pieroguerrero.github.io/weatherapp/).

## Table of Contents
* [General Info](#general-information)
* [Technologies and Techniques used](#technologies-and-techniques-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
- Current, Daily and Hourly weather information provided by a fully responsive Web App powered by [Open Weather](https://openweathermap.org/).

## Technologies and Techniques used
### Planning and Design:
- The planning was done with the [User Story Mapping](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story-mapping/) technique.
- The Wireframes that ispired this Web were created with Figma and can be found [here](https://www.figma.com/proto/PEKgppGBc75x91QNM0rSnE/WeatherApp?node-id=709%3A11729&scaling=min-zoom&page-id=702%3A11540&starting-point-node-id=709%3A11729):

<p align="center"><BR> <img src="https://user-images.githubusercontent.com/26049605/189367731-1ec93ce9-4e56-4517-962e-2e3a7b9cbedf.png" width="250px" height="auto" alt="todoist UI" title="Click to enlarge"> </p>


### Front-end:
- Vanilla Javascript.
- Internal application state managed 100% with [Clousures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
- CSS design with [Tailwind CSS](https://tailwindcss.com/). 
- The web app is 100% responsive.

### Back-end:
- This web app consumes APIs provided by [OpenWeather.com](https://openweathermap.org/).
- The APIs consumption was implemented with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- Since it provides online information, an owned back-end is not planned so far.

### Testing:
- Manual testing was done with 100% coverage.
- While testing, the project was run using the Chrome's Development Tools "Fast 3G" and "No Caching" options. So the app is ready for slow internet connections.

## Features

- View current average weather ✔
- View next 24 hours forecast weather ✔
- View next 7 days forecast weather ✔
- Search weather by location name ✔
- Get current GPS location weather ✔
- Transform temperature units From and TO C° and F° ✔
- Show Humidity(%), Changes of Rain(%), Wind Speed(Km/h) and Feels Like(C°) information ✔
- Location stored on Local Storage for future usages ✔

## Screenshots
Click an image to enlarge.

| Dashboard 1 | Dashboard 1 responsive | Dashboard 2 |
| ------------ | -------------- | ------------- |
| <img src="https://user-images.githubusercontent.com/26049605/189377040-22dac376-4787-4041-9152-b3735654cdcd.png" width="370px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">   | <img src="https://user-images.githubusercontent.com/26049605/189377750-3bc91486-81eb-45e0-a761-9b1faafd70d4.png" width="200px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">     | <img src="https://user-images.githubusercontent.com/26049605/189377466-66ba3ba7-5282-45bd-8711-9be33404981c.png" width="370px" height="auto" alt="Editing Task" title="Click to enlarge">    |

## Setup
Clone this project by doing:
```
$ git clone https://github.com/pieroguerrero/weatherapp.git
```
Then go to the folder you cloned the code and execute:
```
$ npm install
```
**WARNING:** If you are going to use other libraries to achieve other purposes be carefull and remove the caret (^) prefix that the dependency versions have.

## Project Status
Project is: _completed_
V1.0

## Room for Improvement
There are always room for improvement, in this project so far the thinkgs that can be improved are:
- Migrate to a Javascript framework in order to (1) increase the maintainability for future changes and (2) improve the internal state management.
- Implement automated Unit Testing.
