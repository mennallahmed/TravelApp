# TravelApp
Travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

## Node.js and express
The server is set up using ```express``` and Node is used to install all the dependencies with ```npm```.

## Webpack
This project uses Webpack as the build tool. The configuration can be found on the repository. There are different setups for production and development environments.

## APIS
The [Geonames](http://www.geonames.org/export/web-services.html) API used to get city coordinates.
The [Current Weather](https://www.weatherbit.io/api/weather-current) API used to get the current weather forecast.
The [Weather Forecast API](https://www.weatherbit.io/api/weather-forecast-16-day) API used to get future weather forecast.
The [Pixabay](https://pixabay.com/api/docs/) API used to display an image of the location entered.

## Jest
The code is tested using [Jest](https://jestjs.io/). Find in directory "__test__".
Note that the server should not be busy.
`cd` into your new folder and run:
- ```npm run test```

## Service Workers
Using Google [Workbox](https://developers.google.com/web/tools/workbox) for "Offline Functionality".

## Extend Options
Add end date and display length of trip.
Integrate the REST Countries API to pull in data for the country being visited.
Allow user to Print their trip and/or export to PDF.

## Get Up and Running

`cd` into your new folder and run:
- ```npm install```
- ```npm run build-dev``` to start the webpack dev server
- ```npm run build-prod``` to generate a dist folder for prod
- ```npm start``` to run the Express server on port 8081
